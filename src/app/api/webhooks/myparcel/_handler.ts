import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { getShipment, trackingUrl } from '@/lib/myparcel';
import { resend, EMAIL_FROM, EMAIL_REPLY_TO, EMAIL_NOTIFICATION_TO } from '@/lib/resend';
import { render } from '@react-email/components';
import { ShippedEmail } from '@/emails/ShippedEmail';
import React from 'react';

const CARRIER_LABEL: Record<string, string> = {
  postnl: 'PostNL',
  dpd: 'DPD',
  dhl: 'DHL',
  dhlforyou: 'DHL for You',
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

// MyParcel's two webhooks have DIFFERENT payload shapes (per their docs):
//
//   shipment_status_change:
//     { data: { hooks: [{ shipment_id, status (number), barcode, ... }] } }
//
//   shipment_label_created:
//     { data: { hooks: [{ status ("success"|"failed"), shipment_ids: [int],
//                         printer_identifier, pdf }] } }
//
// We normalise both into a flat list of {shipmentId, statusCode?, barcode?, pdfUrl?}.
interface NormalisedEvent {
  shipmentId: string;
  statusCode?: number;
  barcode?: string;
  pdfUrl?: string;
  labelOk?: boolean;
}

function normaliseEvents(source: 'label' | 'status', body: any): NormalisedEvent[] {
  const hooks: any[] = body?.data?.hooks ?? [];
  const out: NormalisedEvent[] = [];
  for (const h of hooks) {
    if (source === 'status') {
      if (h.shipment_id != null) {
        out.push({
          shipmentId: String(h.shipment_id),
          statusCode: typeof h.status === 'number' ? h.status : undefined,
          barcode: typeof h.barcode === 'string' ? h.barcode : undefined,
        });
      }
      continue;
    }
    // label-created: expand shipment_ids array, status is a string literal.
    const ids: Array<number | string> = Array.isArray(h.shipment_ids) ? h.shipment_ids : [];
    const ok = h.status === 'success';
    for (const id of ids) {
      out.push({
        shipmentId: String(id),
        pdfUrl: typeof h.pdf === 'string' ? h.pdf : undefined,
        labelOk: ok,
      });
    }
  }
  return out;
}

export async function handleMyParcelWebhook(
  request: NextRequest,
  source: 'label' | 'status',
): Promise<NextResponse> {
  try {
    const body = await request.json().catch(() => ({}));
    const events = normaliseEvents(source, body);
    if (events.length === 0) {
      return NextResponse.json({ success: true, processed: 0, source });
    }

    let processed = 0;
    for (const evt of events) {
      const order = await convex.query(api.orders.getByShipmentId, { shipment_id: evt.shipmentId });
      if (!order) {
        console.warn(`MyParcel ${source}-webhook: no order for shipment ${evt.shipmentId}`);
        continue;
      }

      // Always pull fresh shipment detail — label-created events don't include
      // barcode, status-change events sometimes drop it on early transitions.
      let barcode = evt.barcode;
      let statusCode = evt.statusCode;
      try {
        const detail = await getShipment(evt.shipmentId);
        barcode = barcode || detail.barcode;
        if (statusCode == null && typeof detail.status === 'number') statusCode = detail.status;
      } catch (e) {
        console.warn(`MyParcel ${source}-webhook: getShipment failed, using event data:`, e);
      }

      // For label_created without a status code, treat the event itself as
      // "label printed" (MyParcel's internal status for printed shipments).
      const effectiveStatus =
        statusCode ?? (source === 'label' && evt.labelOk ? 12 : 0);
      const mapped = mapStatusCode(effectiveStatus);

      const shipping = order.shipping_address as any;
      const cc = (String(shipping?.country || 'NL').slice(0, 2).toUpperCase() as 'NL' | 'BE' | 'DE');
      const tUrl = barcode
        ? trackingUrl(
            barcode,
            String(shipping?.postalCode || shipping?.postal_code || ''),
            cc,
            (order.locale as 'nl' | 'en' | 'de') || 'nl',
          )
        : undefined;

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
          const pref = (order as any).delivery_preference as any;
          const emailLocale = ((order as any).locale as 'nl' | 'en' | 'de') || 'nl';
          const carrierKey = String(pref?.carrier || 'postnl');
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
          await resend.emails.send({
            from: EMAIL_FROM,
            replyTo: EMAIL_REPLY_TO,
            to: order.customer_email,
            subject: SHIPPED_SUBJECT[emailLocale](order.order_number || String(order._id)),
            html,
          });
          shippedEmailSentAt = Date.now();
          console.log(`Shipped email sent to ${order.customer_email} for order ${order._id}`);
        } catch (mailErr) {
          console.error(`${source}-webhook: shipped email failed (non-blocking):`, mailErr);
        }
      }

      // On label-created: forward the label PDF link to the shop owner so they
      // can print without logging into the MyParcel portal.
      if (source === 'label' && evt.pdfUrl && evt.labelOk) {
        try {
          await resend.emails.send({
            from: EMAIL_FROM,
            replyTo: EMAIL_REPLY_TO,
            to: EMAIL_NOTIFICATION_TO,
            subject: `🏷️ Verzendlabel klaar — ${order.order_number || order._id}`,
            html: `<p>Verzendlabel voor order <strong>${order.order_number || order._id}</strong> is aangemaakt.</p>
<p><a href="${evt.pdfUrl}">Label PDF openen →</a></p>
<p>Klant: ${order.customer_name || ''} (${order.customer_email})<br/>
Tracking: ${barcode || '—'}</p>`,
          });
        } catch (e) {
          console.error('Label-PDF admin notification failed (non-blocking):', e);
        }
      }

      await convex.mutation(api.orders.update, {
        id: order._id,
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

    return NextResponse.json({ success: true, processed, source });
  } catch (error) {
    console.error(`MyParcel ${source}-webhook error:`, error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'unknown', source },
      { status: 500 },
    );
  }
}
