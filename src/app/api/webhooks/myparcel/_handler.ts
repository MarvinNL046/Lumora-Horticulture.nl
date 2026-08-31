import { NextRequest, NextResponse } from 'next/server';
import { convex, convexServerAuth } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import {
  getShipment,
  getTrackTrace,
  trackingUrl,
  trackingUrlFromTrackTrace,
  type MyParcelCarrier,
} from '@/lib/myparcel';
import { resend, EMAIL_FROM, EMAIL_REPLY_TO, EMAIL_NOTIFICATION_TO } from '@/lib/resend';
import { render } from '@react-email/components';
import { ShippedEmail } from '@/emails/ShippedEmail';
import {
  authenticateMyParcelWebhook,
  isKnownMyParcelShipmentStatus,
  MAX_MYPARCEL_WEBHOOK_BODY_BYTES,
  MyParcelWebhookValidationError,
  parseMyParcelWebhookEvents,
} from '@/lib/myparcel-webhook-security';
import React from 'react';

const CARRIER_LABEL: Record<string, string> = {
  postnl: 'PostNL',
  dpd: 'DPD',
  dhl: 'DHL',
  dhlforyou: 'DHL for You',
  ups: 'UPS',
};

const SHIPPED_SUBJECT: Record<'nl' | 'en' | 'de', (n: string) => string> = {
  nl: (n) => `Je pakket ${n} is onderweg — Lumora Horticulture`,
  en: (n) => `Your parcel ${n} is on its way — Lumora Horticulture`,
  de: (n) => `Dein Paket ${n} ist unterwegs — Lumora Horticulture`,
};

// Authoritative status-code table (MyParcel API v2, data-types.html):
//   1-2   pending (concept / registered)
//   3-6   enroute (handed to carrier / sorting / distribution / customs)
//   7     delivered at recipient
//   8     ready for pickup
//   9     delivered — package picked up
//   10-11 return shipment flow
//   12/14/15/18  "printed" states (letter / digital stamp / external / untracked)
//   16/17 expired / cancelled
//   19    delivered at agreed location
function mapStatusCode(code: number): {
  shipment_status: string;
  shipped: boolean;
  delivered: boolean;
} {
  if (code === 7 || code === 9 || code === 19) {
    return { shipment_status: 'delivered', shipped: true, delivered: true };
  }
  if (code === 8) {
    // Awaiting pickup by customer — parcel has arrived, order is effectively
    // "delivered to pickup point" but not yet in the customer's hands.
    return { shipment_status: 'ready_for_pickup', shipped: true, delivered: false };
  }
  if (code >= 3 && code <= 6) {
    return { shipment_status: 'shipped', shipped: true, delivered: false };
  }
  if (code === 12 || code === 14 || code === 15 || code === 18) {
    return { shipment_status: 'label_printed', shipped: false, delivered: false };
  }
  if (code === 16) return { shipment_status: 'expired', shipped: false, delivered: false };
  if (code === 17) return { shipment_status: 'cancelled', shipped: false, delivered: false };
  return { shipment_status: 'pending', shipped: false, delivered: false };
}

async function readLimitedBody(request: NextRequest): Promise<string> {
  const contentLength = request.headers.get('content-length');
  if (
    contentLength &&
    (!/^\d+$/.test(contentLength) || Number(contentLength) > MAX_MYPARCEL_WEBHOOK_BODY_BYTES)
  ) {
    throw new MyParcelWebhookValidationError();
  }

  if (!request.body) throw new MyParcelWebhookValidationError();

  const reader = request.body.getReader();
  const chunks: Buffer[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_MYPARCEL_WEBHOOK_BODY_BYTES) {
      await reader.cancel().catch(() => undefined);
      throw new MyParcelWebhookValidationError();
    }
    chunks.push(Buffer.from(value));
  }

  return Buffer.concat(chunks).toString('utf8');
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function carrierFromPreference(value: unknown): MyParcelCarrier {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return 'postnl';
  const carrier = String((value as Record<string, unknown>).carrier || '').toLowerCase();
  return (
    ['postnl', 'dpd', 'dhl', 'dhlforyou', 'ups'] as const
  ).includes(carrier as MyParcelCarrier)
    ? (carrier as MyParcelCarrier)
    : 'postnl';
}

function countryCode(value: unknown): 'NL' | 'BE' | 'DE' {
  const country = String(value || '').trim().toUpperCase();
  if (country === 'BE' || country.startsWith('BEL')) return 'BE';
  if (country === 'DE' || country.startsWith('DUIT') || country.startsWith('GER')) {
    return 'DE';
  }
  return 'NL';
}

export async function handleMyParcelWebhook(
  request: NextRequest,
  source: 'label' | 'status',
): Promise<NextResponse> {
  const authentication = authenticateMyParcelWebhook({
    headers: request.headers,
    requestUrl: request.url,
    source,
    apiKey: process.env.MYPARCEL_API_KEY,
    webhookSecret: process.env.MYPARCEL_WEBHOOK_SECRET,
    expectedHookId:
      source === 'label'
        ? process.env.MYPARCEL_LABEL_HOOK_ID
        : process.env.MYPARCEL_STATUS_HOOK_ID,
  });

  if (!authentication.ok) {
    const status =
      authentication.reason === 'misconfigured'
        ? 503
        : authentication.reason === 'unsupported_media_type'
          ? 415
          : 401;
    const error =
      status === 503 ? 'Service unavailable' : status === 401 ? 'Unauthorized' : 'Invalid request';
    return NextResponse.json(
      { success: false, error },
      { status, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  let events: ReturnType<typeof parseMyParcelWebhookEvents>;
  try {
    const rawBody = await readLimitedBody(request);
    events = parseMyParcelWebhookEvents(source, rawBody);
  } catch (error) {
    if (error instanceof MyParcelWebhookValidationError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } },
      );
    }
    console.error(`MyParcel ${source}-webhook body read failed`);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    let processed = 0;
    for (const evt of events) {
      // A failed asynchronous label creation contains no usable label. Ack it
      // without changing an order; MyParcel may send a later successful hook.
      if (source === 'label' && !evt.labelOk) continue;

      const order = await convex.query(api.orders.getByShipmentId, {
        shipment_id: evt.shipmentId,
        ...convexServerAuth(),
      });
      if (!order) {
        console.warn(`MyParcel ${source}-webhook: no order for shipment ${evt.shipmentId}`);
        continue;
      }

      // The notification is only a signal. Always re-fetch the shipment with
      // our authenticated API client and never mutate from event status/barcode.
      const detail = await getShipment(evt.shipmentId);
      if (String(detail.id) !== evt.shipmentId) {
        throw new Error('MyParcel shipment identity mismatch');
      }

      const detailStatus = isKnownMyParcelShipmentStatus(detail.status)
        ? detail.status
        : undefined;
      if (source === 'status' && detailStatus === undefined) {
        throw new Error('MyParcel returned an invalid shipment status');
      }

      // A successful label event can arrive just before GET /shipments moves
      // from registered (2) to a printed state. The authenticated API lookup
      // still proves that the shipment belongs to this MyParcel account.
      const effectiveStatus =
        source === 'label' && (detailStatus === undefined || detailStatus <= 2)
          ? 12
          : detailStatus!;
      const mapped = mapStatusCode(effectiveStatus);
      const barcode =
        typeof detail.barcode === 'string' &&
        detail.barcode.length <= 128 &&
        !/[\u0000-\u001f\u007f]/.test(detail.barcode)
          ? detail.barcode
          : undefined;

      const shipping = order.shipping_address as any;
      const pref = (order as any).delivery_preference as any;
      const carrierKey = carrierFromPreference(pref);
      const cc = countryCode(shipping?.country);
      const trackTrace = await getTrackTrace(evt.shipmentId);
      const providerTrackingUrl = trackTrace
        ? trackingUrlFromTrackTrace(trackTrace, carrierKey)
        : undefined;
      const tUrl = providerTrackingUrl ?? (
        carrierKey === 'postnl' && barcode
          ? trackingUrl(
              barcode,
              String(shipping?.postalCode || shipping?.postal_code || ''),
              cc,
              (order.locale as 'nl' | 'en' | 'de') || 'nl',
            )
          : undefined
      );
      if (mapped.shipped && !tUrl) {
        throw new Error('MyParcel carrier tracking URL is not available yet');
      }

      // Shipped email fires ONCE, as soon as the parcel is physically moving
      // (status 3+). We don't send it at "label_printed" because the courier
      // sometimes takes a day to pick up; customers would see a tracking URL
      // that says "not yet in transit" and think we misled them.
      const shouldSendShippedEmail =
        tUrl &&
        mapped.shipped &&
        !(order as any).shipped_email_sent_at;

      let shippedEmailSentAt: number | undefined;
      if (shouldSendShippedEmail) {
        try {
          const emailLocale = ((order as any).locale as 'nl' | 'en' | 'de') || 'nl';
          const html = await render(
            React.createElement(ShippedEmail, {
              orderNumber: order.order_number || String(order._id),
              customerName: order.customer_name || '',
              trackingUrl: tUrl!,
              trackingCode: barcode || undefined,
              carrier: CARRIER_LABEL[carrierKey] || carrierKey.toUpperCase(),
              pickup:
                pref?.kind === 'pickup' && pref?.pickup
                  ? {
                      locationName: pref.pickup.locationName ?? pref.pickup.location_name ?? '',
                      street: pref.pickup.street ?? '',
                      number: pref.pickup.number ?? '',
                      postalCode: pref.pickup.postalCode ?? pref.pickup.postal_code ?? '',
                      city: pref.pickup.city ?? '',
                    }
                  : null,
              locale: emailLocale,
            }),
          );
          const sendResult = await resend.emails.send(
            {
              from: EMAIL_FROM,
              replyTo: EMAIL_REPLY_TO,
              to: order.customer_email,
              subject: SHIPPED_SUBJECT[emailLocale](order.order_number || String(order._id)),
              html,
            },
            { idempotencyKey: `myparcel-shipped-${order._id}` },
          );
          if (sendResult.error) {
            throw new Error(
              `Resend ${sendResult.error.name}: ${sendResult.error.message}`,
            );
          }
          if (!sendResult.data?.id) throw new Error('Resend returned no shipped-email id');
          shippedEmailSentAt = Date.now();
          console.log(`Shipped email sent for order ${order._id}`);
        } catch (mailErr) {
          console.error(`${source}-webhook: shipped email failed:`, mailErr);
          throw mailErr;
        }
      }

      // On label-created: forward the label PDF link to the shop owner so they
      // can print without logging into the MyParcel portal.
      const labelAlreadyHandled = ['label_printed', 'shipped', 'ready_for_pickup', 'delivered']
        .includes(String((order as any).shipment_status || ''));
      if (source === 'label' && evt.pdfUrl && evt.labelOk && !labelAlreadyHandled) {
        try {
          const safeOrderNumber = escapeHtml(order.order_number || order._id);
          const safePdfUrl = escapeHtml(evt.pdfUrl);
          const sendResult = await resend.emails.send(
            {
              from: EMAIL_FROM,
              replyTo: EMAIL_REPLY_TO,
              to: EMAIL_NOTIFICATION_TO,
              subject: `🏷️ Verzendlabel klaar — ${order.order_number || order._id}`,
              html: `<p>Verzendlabel voor order <strong>${safeOrderNumber}</strong> is aangemaakt.</p>
<p><a href="${safePdfUrl}">Label PDF openen →</a></p>
<p>Klant: ${escapeHtml(order.customer_name)} (${escapeHtml(order.customer_email)})<br/>
Tracking: ${escapeHtml(barcode || '—')}</p>`,
            },
            { idempotencyKey: `myparcel-label-${evt.shipmentId}` },
          );
          if (sendResult.error) {
            throw new Error(
              `Resend ${sendResult.error.name}: ${sendResult.error.message}`,
            );
          }
          if (!sendResult.data?.id) throw new Error('Resend returned no label-email id');
        } catch (e) {
          console.error('Label-PDF admin notification failed:', e);
          throw e;
        }
      }

      await convex.mutation(api.orders.update, {
        id: order._id,
        ...convexServerAuth(),
        shipment_status: mapped.shipment_status,
        tracking_code: barcode || undefined,
        tracking_url: tUrl,
        status: mapped.delivered ? 'completed' : mapped.shipped ? 'shipped' : order.status,
        shipped_at: mapped.shipped && !order.shipped_at ? Date.now() : undefined,
        delivered_at: mapped.delivered && !order.delivered_at ? Date.now() : undefined,
        shipped_email_sent_at: shippedEmailSentAt,
      });
      processed++;
    }

    return NextResponse.json(
      { success: true, processed },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    console.error(`MyParcel ${source}-webhook processing failed`);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
