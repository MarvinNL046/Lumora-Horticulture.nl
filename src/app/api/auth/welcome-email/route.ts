import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * The former browser-triggered endpoint allowed every signed-in user to send
 * the welcome/admin email pair repeatedly. Welcome mail must originate from a
 * trusted signup event with an atomic one-shot claim, so this legacy route is
 * intentionally retired until that flow exists.
 */
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Gone' },
    {
      status: 410,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    },
  );
}
