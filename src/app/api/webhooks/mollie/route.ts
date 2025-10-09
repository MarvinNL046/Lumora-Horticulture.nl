import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems, products } from '@/db/schema';
import { getPaymentStatus } from '@/lib/mollie';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { AdminNotificationEmail } from '@/emails/AdminNotification';
import { trackServerSideConversion } from '@/lib/google-ads';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * POST /api/webhooks/mollie
 * Mollie webhook voor betaling updates
 */
export async function POST(request: NextRequest) {
  try {
    // Mollie stuurt form-data, niet JSON
    const formData = await request.formData();
    const paymentId = formData.get('id') as string;

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          error: 'No payment ID provided',
        },
        { status: 400 }
      );
    }

    // Haal betaling status op van Mollie
    const payment = await getPaymentStatus(paymentId);

    // Zoek de order op basis van payment ID
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.payment_id, paymentId))
      .limit(1);

    if (!order) {
      console.error(`Order not found for payment ${paymentId}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found',
        },
        { status: 404 }
      );
    }

    // Update order status op basis van payment status
    let orderStatus = order.status;
    let paymentStatus: string = payment.status;

    if (payment.status === 'paid') {
      orderStatus = 'processing';
      paymentStatus = 'paid';
    } else if (payment.status === 'failed') {
      orderStatus = 'cancelled';
      paymentStatus = 'failed';
    } else if (payment.status === 'canceled') {
      orderStatus = 'cancelled';
      paymentStatus = 'cancelled';
    } else if (payment.status === 'expired') {
      orderStatus = 'cancelled';
      paymentStatus = 'expired';
    }

    // Update order in database
    await db
      .update(orders)
      .set({
        status: orderStatus,
        payment_status: paymentStatus,
        updated_at: new Date(),
      })
      .where(eq(orders.id, order.id));

    console.log(`Order ${order.id} updated: ${orderStatus} / ${paymentStatus}`);

    // Verzend emails alleen bij succesvolle betaling
    if (payment.status === 'paid') {
      // Track conversie voor Google Ads (server-side backup)
      trackServerSideConversion(
        order.order_number || order.id,
        parseFloat(order.total_amount),
        paymentId,
        order.customer_email
      );
      try {
        console.log(`Processing emails for paid order ${order.id}`);

        // Haal order items op
        const items = await db
          .select()
          .from(orderItems)
          .leftJoin(products, eq(orderItems.product_id, products.id))
          .where(eq(orderItems.order_id, order.id));

        console.log(`Found ${items.length} order items`);

        // Parse shipping address
        const shipping_address = order.shipping_address as any;
        const shippingAddressObj = {
          street: shipping_address.street || '',
          postalCode: shipping_address.postalCode || shipping_address.postal_code || '',
          city: shipping_address.city || '',
          country: shipping_address.country || 'Nederland',
        };

        // Bereken prijzen
        const productDetails = items.map((item) => ({
          name: item.products?.name || 'Unknown Product',
          quantity: parseInt(item.order_items.quantity),
          price: parseFloat(item.order_items.price_at_purchase),
          total: parseInt(item.order_items.quantity) * parseFloat(item.order_items.price_at_purchase),
        }));

        const totalAmount = parseFloat(order.total_amount);

        // Bereken subtotaal en korting op basis van base price uit products tabel
        const subtotalWithoutDiscount = items.reduce((sum, item) => {
          const basePrice = item.products ? parseFloat(item.products.price) : parseFloat(item.order_items.price_at_purchase);
          return sum + (basePrice * parseInt(item.order_items.quantity));
        }, 0);

        const subtotal = subtotalWithoutDiscount;
        const discount = subtotal - totalAmount;

        // Verzend klant bevestigingsmail
        const customerEmailHtml = await render(
          React.createElement(OrderConfirmationEmail, {
            orderNumber: order.order_number || order.id,
            customerName: order.customer_name,
            orderDate: new Date().toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            items: productDetails,
            subtotal,
            discount,
            totalAmount,
            shippingAddress: shippingAddressObj,
          })
        );

        await resend.emails.send({
          from: 'Lumora Horticulture <info@lumorahorticulture.com>',
          replyTo: 'info@lumorahorticulture.com',
          to: order.customer_email,
          subject: `Bevestiging bestelling ${order.order_number || order.id} - Lumora Horticulture`,
          html: customerEmailHtml,
        });

        console.log(`Customer email sent to ${order.customer_email}`);

        // Parse billing address
        const billing_address = order.billing_address as any;
        const billingAddressObj =
          billing_address && billing_address.street !== shippingAddressObj.street
            ? {
                street: billing_address.street || '',
                postalCode: billing_address.postalCode || billing_address.postal_code || '',
                city: billing_address.city || '',
                country: billing_address.country || 'Nederland',
              }
            : undefined;

        // Verzend admin notificatie
        const adminEmailHtml = await render(
          React.createElement(AdminNotificationEmail, {
            orderNumber: order.order_number || order.id,
            orderDate: new Date().toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            customerName: order.customer_name,
            customerEmail: order.customer_email,
            customerPhone: order.customer_phone || 'Niet opgegeven',
            items: productDetails,
            subtotal,
            discount,
            totalAmount,
            shippingAddress: shippingAddressObj,
            billingAddress: billingAddressObj,
            paymentId: paymentId,
          })
        );

        await resend.emails.send({
          from: 'Lumora Webshop <info@lumorahorticulture.com>',
          replyTo: 'info@lumorahorticulture.com',
          to: 'info@lumorahorticulture.com',
          subject: `🔔 Nieuwe bestelling ${order.order_number || order.id} - €${totalAmount.toFixed(2)}`,
          html: adminEmailHtml,
        });

        console.log('Admin email sent');
      } catch (emailError) {
        console.error('Failed to send emails:', emailError);
        // Don't fail the webhook if email fails
      }
    }

    return NextResponse.json({
      success: true,
      order_id: order.id,
      status: orderStatus,
      payment_status: paymentStatus,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Webhook processing failed',
      },
      { status: 500 }
    );
  }
}
