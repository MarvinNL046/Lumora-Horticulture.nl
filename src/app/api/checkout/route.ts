import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems, products } from '@/db/schema';
import { createPayment } from '@/lib/mollie';
import { eq } from 'drizzle-orm';
import { calculateDiscountedPrice, calculateTotalPrice } from '@/lib/volume-discount';

/**
 * POST /api/checkout
 * Maak een nieuwe bestelling en start Mollie betaling
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      customer_email,
      customer_name,
      customer_phone,
      shipping_address,
      billing_address,
      items, // Array of { product_id, quantity }
    } = body;

    // Validatie
    if (!customer_email || !customer_name || !shipping_address || !items || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Bereken totaal bedrag met staffelkorting
    let totalAmount = 0;
    const productDetails = [];

    for (const item of items) {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, item.product_id))
        .limit(1);

      if (!product || product.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: `Product ${item.product_id} not found`,
          },
          { status: 404 }
        );
      }

      const basePrice = parseFloat(product[0].price);
      const quantity = item.quantity;

      // Bereken korting op basis van aantal
      const discountedPrice = calculateDiscountedPrice(basePrice, quantity);
      const itemTotal = calculateTotalPrice(basePrice, quantity);

      totalAmount += itemTotal;
      productDetails.push({
        product_id: item.product_id,
        quantity: quantity,
        price: discountedPrice, // Prijs PER STUK na korting
        basePrice: basePrice, // Originele prijs
        name: product[0].name,
      });
    }

    // Maak bestelling aan
    const [order] = await db
      .insert(orders)
      .values({
        customer_email,
        customer_name,
        customer_phone,
        shipping_address,
        billing_address: billing_address || shipping_address,
        total_amount: totalAmount.toString(),
        status: 'pending',
        payment_status: 'pending',
      })
      .returning();

    // Voeg order items toe
    for (const item of productDetails) {
      await db.insert(orderItems).values({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity.toString(),
        price_at_purchase: item.price.toString(),
      });
    }

    // Maak Mollie betaling aan
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const payment = await createPayment({
      amount: totalAmount,
      description: `Bestelling ${order.id}`,
      redirectUrl: `${baseUrl}/checkout/success?order_id=${order.id}`,
      webhookUrl: `${baseUrl}/api/webhooks/mollie`,
      metadata: {
        order_id: order.id,
      },
    });

    // Update order met payment ID
    await db
      .update(orders)
      .set({ payment_id: payment.id })
      .where(eq(orders.id, order.id));

    return NextResponse.json({
      success: true,
      order_id: order.id,
      payment_url: payment.getCheckoutUrl(),
      total_amount: totalAmount,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Checkout failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
