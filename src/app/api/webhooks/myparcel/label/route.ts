import { NextRequest } from 'next/server';
import { handleMyParcelWebhook } from '../_handler';

export const dynamic = 'force-dynamic';

// POST /api/webhooks/myparcel/label
// Fires once per shipment when MyParcel prints the label — this is the moment
// a PostNL barcode becomes available, so the tracking URL can be persisted
// and surfaced on /account/orders.
export async function POST(request: NextRequest) {
  return handleMyParcelWebhook(request, 'label');
}
