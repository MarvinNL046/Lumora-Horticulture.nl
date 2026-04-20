import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { getShipment, trackingUrl } from '@/lib/myparcel';

// MyParcel status codes:
//   1-2  = created / pending
//   3    = label printed (ready to ship)
//   4-7  = in transit (handed to carrier, at sorting, out for delivery)
//   8    = at pickup point
//   11+  = delivered
// https://developer.myparcel.nl/api-reference/11.appendix.html#shipment-statuses
function mapStatus(code: number, source: 'label' | 'status'): {
  shipment_status: string;
  shipped: boolean;
  delivered: boolean;
} {
  if (code >= 11) return { shipment_status: 'delivered', shipped: true, delivered: true };
  if (code >= 4) return { shipment_status: 'shipped', shipped: true, delivered: false };
  if (code >= 3) return { shipment_status: 'label_printed', shipped: false, delivered: false };
  return {
    shipment_status: source === 'label' ? 'label_printed' : 'pending',
    shipped: false,
    delivered: false,
  };
}

// Shared handler for MyParcel's two webhook types. Both send the same shape:
//   { data: { hooks: [{ shipment_id, status?, barcode? }, ...] } }
// The "label_created" hook fires once per shipment when the label is printed;
// "status_change" fires on every transition after that.
export async function handleMyParcelWebhook(
  request: NextRequest,
  source: 'label' | 'status',
): Promise<NextResponse> {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      data?: { hooks?: Array<{ shipment_id: number | string; status?: number; barcode?: string }> };
    };
    const events = body.data?.hooks ?? [];
    if (events.length === 0) {
      return NextResponse.json({ success: true, processed: 0, source });
    }

    let processed = 0;
    for (const evt of events) {
      const shipmentIdStr = String(evt.shipment_id);
      const order = await convex.query(api.orders.getByShipmentId, { shipment_id: shipmentIdStr });
      if (!order) {
        console.warn(`MyParcel ${source}-webhook: no order for shipment ${shipmentIdStr}`);
        continue;
      }

      // Push payload often omits barcode on early events; fetch the full
      // shipment so tracking URL is backfilled as soon as a label exists.
      let barcode = evt.barcode;
      let statusCode = evt.status;
      if (!barcode || statusCode == null) {
        try {
          const detail = await getShipment(shipmentIdStr);
          barcode = barcode || detail.barcode;
          statusCode = statusCode ?? detail.status;
        } catch (e) {
          console.warn(`MyParcel ${source}-webhook: getShipment failed, using event data:`, e);
        }
      }

      const mapped = mapStatus(statusCode ?? 0, source);
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

      await convex.mutation(api.orders.update, {
        id: order._id,
        shipment_status: mapped.shipment_status,
        tracking_code: barcode || undefined,
        tracking_url: tUrl,
        status: mapped.delivered ? 'completed' : mapped.shipped ? 'shipped' : order.status,
        shipped_at: mapped.shipped && !order.shipped_at ? Date.now() : undefined,
        delivered_at: mapped.delivered && !order.delivered_at ? Date.now() : undefined,
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
