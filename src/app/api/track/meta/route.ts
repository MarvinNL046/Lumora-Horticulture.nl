import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Browser-supplied CAPI events cannot be trusted: they can poison attribution,
 * forward arbitrary personal data and consume provider quota. Upper-funnel
 * events remain client-side; paid Purchase is emitted only by the verified
 * Mollie webhook. A future server mirror needs a first-party event model and a
 * distributed abuse limiter before this route can return.
 */
export async function POST() {
  return NextResponse.json(
    { error: 'Gone' },
    {
      status: 410,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    },
  );
}
