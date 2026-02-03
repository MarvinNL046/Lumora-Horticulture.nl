import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems, products } from '@/db/schema';
import { getPaymentStatus } from '@/lib/mollie';
import { eq, sql } from 'drizzle-orm';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { AdminNotificationEmail } from '@/emails/AdminNotification';
import { RecoverySuccessNotification } from '@/emails/RecoverySuccessNotification';
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
    let orderNumber = order.order_number; // Bestaande order nummer (null als nog niet toegewezen)

    if (payment.status === 'paid') {
      orderStatus = 'processing';
      paymentStatus = 'paid';

      // Genereer order nummer alleen bij eerste succesvolle betaling
      if (!orderNumber) {
        const now = new Date();
        const year = now.getFullYear();

        // Haal laatste order van dit jaar op om nummer te bepalen
        const lastOrder = await db
          .select()
          .from(orders)
          .where(sql`EXTRACT(YEAR FROM ${orders.created_at}) = ${year} AND ${orders.order_number} IS NOT NULL`)
          .orderBy(sql`${orders.created_at} DESC`)
          .limit(1);

        let orderCounter = 1;
        if (lastOrder && lastOrder.length > 0 && lastOrder[0].order_number) {
          // Extract counter from last order number (ORD-2025-0001 -> 0001)
          const lastNumber = parseInt(lastOrder[0].order_number.split('-').pop() || '0', 10);
          orderCounter = lastNumber + 1;
        }

        orderNumber = `ORD-${year}-${String(orderCounter).padStart(4, '0')}`;
      }
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
        order_number: orderNumber, // Wordt alleen gezet bij succesvolle betaling
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

        // Check if this is a recovery payment and send special notification
        const metadata = payment.metadata as { recovery?: boolean; order_id?: string } | null;
        const recoveryAttempts = parseInt(order.recovery_attempts?.toString() || '0');

        if (metadata?.recovery || recoveryAttempts > 0) {
          console.log('🎉 This is a recovered payment! Sending recovery success notification...');

          const recoveryEmailHtml = await render(
            React.createElement(RecoverySuccessNotification, {
              orderNumber: orderNumber || order.id,
              orderId: order.id,
              customerName: order.customer_name,
              customerEmail: order.customer_email,
              totalAmount: totalAmount,
              recoveryAttempts: recoveryAttempts,
              originalCreatedAt: new Date(order.created_at!).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
              paidAt: new Date().toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
            })
          );

          await resend.emails.send({
            from: 'Lumora Recovery System <info@lumorahorticulture.com>',
            replyTo: 'info@lumorahorticulture.com',
            to: 'info@lumorahorticulture.com',
            subject: `🎉 Recovery succesvol! ${orderNumber || order.id} - €${totalAmount.toFixed(2)} teruggewonnen`,
            html: recoveryEmailHtml,
          });

          console.log('Recovery success notification sent');
        }
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
