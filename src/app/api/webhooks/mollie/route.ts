import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { getPaymentStatus } from '@/lib/mollie';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { AdminNotificationEmail } from '@/emails/AdminNotification';
import { RecoverySuccessNotification } from '@/emails/RecoverySuccessNotification';
import { trackServerSideConversion } from '@/lib/google-ads';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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
    const order = await convex.query(api.orders.getByPaymentId, {
      payment_id: paymentId,
    });

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
        const ordersThisYear = await convex.query(api.orders.listWithOrderNumber, { year });

        let orderCounter = 1;
        if (ordersThisYear.length > 0 && ordersThisYear[0].order_number) {
          // Extract counter from last order number (ORD-2025-0001 -> 0001)
          const lastNumber = parseInt(ordersThisYear[0].order_number.split('-').pop() || '0', 10);
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
    await convex.mutation(api.orders.update, {
      id: order._id,
      order_number: orderNumber || undefined,
      status: orderStatus,
      payment_status: paymentStatus,
    });

    console.log(`Order ${order._id} updated: ${orderStatus} / ${paymentStatus}`);

    // Verzend emails alleen bij succesvolle betaling
    if (payment.status === 'paid') {
      // Track conversie voor Google Ads (server-side backup)
      trackServerSideConversion(
        order.order_number || order._id,
        order.total_amount,
        paymentId,
        order.customer_email
      );
      try {
        console.log(`Processing emails for paid order ${order._id}`);

        // Haal order items op met product details
        const itemsWithProducts = await convex.query(api.orderItems.getByOrderWithProducts, {
          order_id: order._id,
        });

        console.log(`Found ${itemsWithProducts.length} order items`);

        // Parse shipping address
        const shipping_address = order.shipping_address as any;
        const shippingAddressObj = {
          street: shipping_address.street || '',
          postalCode: shipping_address.postalCode || shipping_address.postal_code || '',
          city: shipping_address.city || '',
          country: shipping_address.country || 'Nederland',
        };

        // Bereken prijzen
        const productDetails = itemsWithProducts.map((item) => ({
          name: item.product?.name || 'Unknown Product',
          quantity: item.order_item.quantity,
          price: item.order_item.price_at_purchase,
          total: item.order_item.quantity * item.order_item.price_at_purchase,
        }));

        const totalAmount = order.total_amount;

        // Bereken subtotaal en korting op basis van base price uit products tabel
        const subtotalWithoutDiscount = itemsWithProducts.reduce((sum, item) => {
          const basePrice = item.product ? item.product.price : item.order_item.price_at_purchase;
          return sum + (basePrice * item.order_item.quantity);
        }, 0);

        const subtotal = subtotalWithoutDiscount;
        const discount = subtotal - totalAmount;

        // Verzend klant bevestigingsmail
        const customerEmailHtml = await render(
          React.createElement(OrderConfirmationEmail, {
            orderNumber: order.order_number || order._id,
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
          subject: `Bevestiging bestelling ${order.order_number || order._id} - Lumora Horticulture`,
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
            orderNumber: order.order_number || order._id,
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
          subject: `🔔 Nieuwe bestelling ${order.order_number || order._id} - €${totalAmount.toFixed(2)}`,
          html: adminEmailHtml,
        });

        console.log('Admin email sent');

        // Check if this is a recovery payment and send special notification
        const metadata = payment.metadata as { recovery?: boolean; order_id?: string } | null;
        const recoveryAttempts = order.recovery_attempts ?? 0;

        if (metadata?.recovery || recoveryAttempts > 0) {
          console.log('🎉 This is a recovered payment! Sending recovery success notification...');

          const recoveryEmailHtml = await render(
            React.createElement(RecoverySuccessNotification, {
              orderNumber: orderNumber || order._id,
              orderId: order._id,
              customerName: order.customer_name,
              customerEmail: order.customer_email,
              totalAmount: totalAmount,
              recoveryAttempts: recoveryAttempts,
              originalCreatedAt: new Date(order.created_at).toLocaleDateString('nl-NL', {
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
            subject: `🎉 Recovery succesvol! ${orderNumber || order._id} - €${totalAmount.toFixed(2)} teruggewonnen`,
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
      order_id: order._id,
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
