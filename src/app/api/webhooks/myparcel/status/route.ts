import { NextRequest } from 'next/server';
import { handleMyParcelWebhook } from '../_handler';

export const dynamic = 'force-dynamic';

// POST /api/webhooks/myparcel/status
// Fires on every shipment status transition (handed to carrier, at sorting,
// out for delivery, delivered). Advances the order through shipped → completed.
export async function POST(request: NextRequest) {
  return handleMyParcelWebhook(request, 'status');
}
