import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { getPaymentStatus } from '@/lib/mollie';
import { resend, EMAIL_FROM, EMAIL_REPLY_TO, EMAIL_NOTIFICATION_TO } from '@/lib/resend';
import { render } from '@react-email/components';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { AdminNotificationEmail } from '@/emails/AdminNotification';
import { RecoverySuccessNotification } from '@/emails/RecoverySuccessNotification';
import { trackServerSideConversion } from '@/lib/google-ads';
import { sendCapiEvent } from '@/lib/meta-capi';
import { createShipment, splitStreetNumber, getShipment, trackingUrl } from '@/lib/myparcel';
import React from 'react';

export const dynamic = 'force-dynamic';
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
      // Auto-label via MyParcel — non-blocking so email flow always runs even
      // if the shipping API is flapping or the delivery_preference is absent.
      try {
        if (!order.shipment_id && process.env.MYPARCEL_API_KEY) {
          const shipping = order.shipping_address as any;
          const prefRaw = (order as any).delivery_preference as any;
          const cc = String(shipping?.country || 'NL').slice(0, 2).toUpperCase() as 'NL' | 'BE' | 'DE';

          // Fall back to today + standard delivery if picker was skipped. That
          // still creates a draft MyParcel shipment the shop owner can review
          // before franking, rather than losing the order silently.
          const delivery = prefRaw
            ? {
                kind: (prefRaw.kind ?? 'home') as 'home' | 'pickup',
                carrier: (prefRaw.carrier ?? 'postnl') as 'postnl' | 'dpd' | 'dhl' | 'dhlforyou',
                date: (prefRaw.date ?? '') as string,
                timeType: (prefRaw.time_type ?? prefRaw.timeType ?? 2) as 1 | 2 | 3,
                pickup: prefRaw.pickup
                  ? {
                      locationName: prefRaw.pickup.locationName ?? prefRaw.pickup.location_name ?? '',
                      locationCode: prefRaw.pickup.locationCode ?? prefRaw.pickup.location_code ?? '',
                      street: prefRaw.pickup.street ?? '',
                      number: prefRaw.pickup.number ?? '',
                      postalCode: prefRaw.pickup.postalCode ?? prefRaw.pickup.postal_code ?? '',
                      city: prefRaw.pickup.city ?? '',
                      retailNetworkId: prefRaw.pickup.retailNetworkId ?? prefRaw.pickup.retail_network_id,
                    }
                  : undefined,
              }
            : { kind: 'home' as const, carrier: 'postnl' as const, date: '', timeType: 2 as const };

          const rawStreet = String(shipping?.street || '');
          const rawNumber = shipping?.houseNumber ?? shipping?.number ?? shipping?.house_number;
          const split = rawNumber ? { street: rawStreet, number: String(rawNumber), suffix: undefined } : splitStreetNumber(rawStreet);

          const shipment = await createShipment({
            orderNumber: orderNumber || String(order._id),
            recipient: {
              cc,
              postalCode: String(shipping?.postalCode || shipping?.postal_code || ''),
              city: String(shipping?.city || ''),
              street: split.street,
              number: split.number,
              numberSuffix: split.suffix,
              person: order.customer_name || order.customer_email,
              phone: order.customer_phone || undefined,
              email: order.customer_email,
            },
            delivery,
          });

          // Fetch barcode in a follow-up call. If MyParcel hasn't assigned one
          // yet (label not printed), we save shipment_id now and let the
          // status webhook backfill tracking once the label exists.
          let trackUrl: string | undefined;
          let trackCode: string | undefined;
          try {
            const detail = await getShipment(shipment.id);
            if (detail.barcode) {
              trackCode = detail.barcode;
              trackUrl = trackingUrl(
                detail.barcode,
                String(shipping?.postalCode || shipping?.postal_code || ''),
                cc,
                (order.locale as 'nl' | 'en' | 'de') || 'nl',
              );
            }
          } catch (e) {
            console.warn('MyParcel getShipment after create (barcode not ready yet):', e);
          }

          await convex.mutation(api.orders.update, {
            id: order._id,
            shipment_id: String(shipment.id),
            tracking_code: trackCode,
            tracking_url: trackUrl,
            shipment_status: 'created',
          });
          console.log(`MyParcel shipment ${shipment.id} created for order ${order._id}`);
        }
      } catch (shipErr) {
        console.error('MyParcel auto-label failed (non-blocking):', shipErr);
      }

      // Track conversie voor Google Ads (server-side backup)
      trackServerSideConversion(
        order.order_number || order._id,
        order.total_amount,
        paymentId,
        order.customer_email
      );

      // Meta Conversions API — Purchase event (dedup via event_id = order._id)
      try {
        const shipping = order.shipping_address as any;
        const [firstName, ...rest] = (order.customer_name || '').split(' ');
        const lastName = rest.join(' ') || undefined;
        await sendCapiEvent({
          eventName: 'Purchase',
          eventId: `purchase_${order._id}`,
          eventSourceUrl: process.env.NEXT_PUBLIC_BASE_URL
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/conversion?order_id=${order._id}`
            : undefined,
          userData: {
            email: order.customer_email,
            phone: order.customer_phone || undefined,
            firstName: firstName || undefined,
            lastName,
            city: shipping?.city,
            zip: shipping?.postal_code || shipping?.postalCode,
            country: (shipping?.country || 'nl').slice(0, 2).toLowerCase(),
          },
          customData: {
            currency: 'EUR',
            value: order.total_amount,
            order_id: order.order_number || order._id,
            transaction_id: paymentId,
          },
        });
      } catch (err) {
        console.error('Meta CAPI Purchase failed (non-blocking):', err);
      }
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
            customerName: order.customer_name || '',
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
          from: EMAIL_FROM,
          replyTo: EMAIL_REPLY_TO,
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
            customerName: order.customer_name || '',
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
          from: EMAIL_FROM,
          replyTo: EMAIL_REPLY_TO,
          to: EMAIL_NOTIFICATION_TO,
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
              customerName: order.customer_name || '',
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
            from: EMAIL_FROM,
            replyTo: EMAIL_REPLY_TO,
            to: EMAIL_NOTIFICATION_TO,
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
