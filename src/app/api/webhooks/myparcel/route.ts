import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { getShipment, trackingUrl } from '@/lib/myparcel';

export const dynamic = 'force-dynamic';

// MyParcel status codes: 3 = label generated, 4/5/6/7 = in transit,
// 8 = at pickup point, 11/12 = delivered.
// https://developer.myparcel.nl/api-reference/11.appendix.html#shipment-statuses
function mapStatus(code: number): { status: string; shipped: boolean; delivered: boolean } {
  if (code >= 11) return { status: 'delivered', shipped: true, delivered: true };
  if (code >= 4) return { status: 'shipped', shipped: true, delivered: false };
  if (code >= 3) return { status: 'label_printed', shipped: false, delivered: false };
  return { status: 'pending', shipped: false, delivered: false };
}

/**
 * POST /api/webhooks/myparcel
 * Receives MyParcel shipment-status push events. Register in the portal under
 * Shopinstellingen → Webhooks, event: "shipment_status_change".
 * Payload shape: { data: { hooks: [{ shipment_id, status, barcode? }] } }.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      data?: { hooks?: Array<{ shipment_id: number | string; status?: number; barcode?: string }> };
    };
    const events = body.data?.hooks ?? [];
    if (events.length === 0) {
      return NextResponse.json({ success: true, processed: 0 });
    }

    let processed = 0;
    for (const evt of events) {
      const shipmentIdStr = String(evt.shipment_id);
      const order = await convex.query(api.orders.getByShipmentId, { shipment_id: shipmentIdStr });
      if (!order) {
        console.warn(`MyParcel webhook: no order for shipment ${shipmentIdStr}`);
        continue;
      }

      // The push payload often omits barcode on early events; fetch the full
      // shipment so we can backfill tracking URL the moment a label prints.
      let barcode = evt.barcode;
      let statusCode = evt.status;
      if (!barcode || statusCode == null) {
        try {
          const detail = await getShipment(shipmentIdStr);
          barcode = barcode || detail.barcode;
          statusCode = statusCode ?? detail.status;
        } catch (e) {
          console.warn('MyParcel webhook: getShipment failed, using event data only:', e);
        }
      }

      const mapped = mapStatus(statusCode ?? 0);
      const shipping = order.shipping_address as any;
      const tUrl = barcode
        ? trackingUrl(
            barcode,
            String(shipping?.postalCode || shipping?.postal_code || ''),
            (String(shipping?.country || 'NL').slice(0, 2).toUpperCase() as 'NL' | 'BE' | 'DE'),
            (order.locale as 'nl' | 'en' | 'de') || 'nl',
          )
        : undefined;

      await convex.mutation(api.orders.update, {
        id: order._id,
        shipment_status: mapped.status,
        tracking_code: barcode || undefined,
        tracking_url: tUrl,
        status: mapped.delivered ? 'completed' : mapped.shipped ? 'shipped' : order.status,
        shipped_at: mapped.shipped && !order.shipped_at ? Date.now() : undefined,
        delivered_at: mapped.delivered && !order.delivered_at ? Date.now() : undefined,
      });
      processed++;
    }

    return NextResponse.json({ success: true, processed });
  } catch (error) {
    console.error('MyParcel webhook error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'unknown' },
      { status: 500 },
    );
  }
}
