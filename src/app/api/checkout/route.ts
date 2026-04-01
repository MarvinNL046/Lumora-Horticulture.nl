import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { createPayment } from '@/lib/mollie';
import { calculateDiscountedPrice, calculateTotalPrice } from '@/lib/volume-discount';
import { stackServerApp } from '@/stack/server';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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
      recovery_cart_id, // Optional: ID of abandoned cart being recovered
      locale = 'nl', // Locale for recovery emails (nl, en, de)
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

    // Check if user is logged in (optional - guest checkout blijft mogelijk)
    let userId: string | undefined = undefined;
    try {
      const user = await stackServerApp.getUser();
      if (user) {
        userId = user.id;
      }
    } catch (error) {
      // User is not logged in - continue with guest checkout
      console.log('Guest checkout - no user logged in');
    }

    // Bereken totaal bedrag met staffelkorting
    let totalAmount = 0;
    const productDetails = [];

    for (const item of items) {
      const product = await convex.query(api.products.getById, {
        id: item.product_id as Id<"products">,
      });

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            error: `Product ${item.product_id} not found`,
          },
          { status: 404 }
        );
      }

      const basePrice = product.price;
      const quantity = item.quantity;

      // Bereken korting op basis van aantal
      const discountedPrice = calculateDiscountedPrice(basePrice, quantity);
      const itemTotal = calculateTotalPrice(basePrice, quantity);

      totalAmount += itemTotal;
      productDetails.push({
        product_id: item.product_id as Id<"products">,
        quantity: quantity,
        price: discountedPrice, // Prijs PER STUK na korting
        basePrice: basePrice, // Originele prijs
        name: product.name,
      });
    }

    // Order nummer wordt pas toegewezen na succesvolle betaling (in webhook)
    // Dit voorkomt dat verlaten betalingen order nummers 'verbruiken'

    // Maak bestelling aan zonder order_number
    const orderId = await convex.mutation(api.orders.create, {
      user_id: userId,
      customer_email,
      customer_name,
      customer_phone,
      shipping_address,
      billing_address: billing_address || shipping_address,
      total_amount: totalAmount,
      status: 'pending',
      payment_status: 'pending',
      locale,
    });

    // Voeg order items toe
    await convex.mutation(api.orderItems.createMany, {
      items: productDetails.map((item) => ({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      })),
    });

    // Maak Mollie betaling aan
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const payment = await createPayment({
      amount: totalAmount,
      description: `Bestelling ${orderId}`,
      redirectUrl: `${baseUrl}/checkout/conversion?order_id=${orderId}`,
      webhookUrl: `${baseUrl}/api/webhooks/mollie`,
      metadata: {
        order_id: orderId,
      },
    });

    // Update order met payment ID
    await convex.mutation(api.orders.update, {
      id: orderId,
      payment_id: payment.id,
    });

    // Mark abandoned cart(s) as recovered for this email
    try {
      await convex.mutation(api.abandonedCarts.markRecoveredByEmail, {
        customer_email,
        recovery_order_id: orderId,
      });
      console.log(`✅ Abandoned carts for ${customer_email} marked as recovered`);
    } catch (error) {
      console.error('Failed to mark cart as recovered:', error);
      // Don't fail the checkout if this fails
    }

    // Emails worden verzonden via de Mollie webhook na succesvolle betaling

    return NextResponse.json({
      success: true,
      order_id: orderId,
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
