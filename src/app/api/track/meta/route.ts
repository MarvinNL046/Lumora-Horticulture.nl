import { NextRequest, NextResponse } from 'next/server';
import { sendCapiEvent, type CapiEvent, type CapiUserData } from '@/lib/meta-capi';

export const runtime = 'nodejs';

// Only whitelisted upper-funnel events accepted from client — Purchase goes through
// the Mollie webhook server-side (see src/app/api/webhooks/mollie/route.ts).
const ALLOWED: CapiEvent['eventName'][] = [
  'ViewContent',
  'AddToCart',
  'InitiateCheckout',
  'Lead',
  'CompleteRegistration',
  'Subscribe',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventName, eventId, customData, userData, eventSourceUrl } = body ?? {};

    if (!eventName || !ALLOWED.includes(eventName)) {
      return NextResponse.json({ error: 'invalid eventName' }, { status: 400 });
    }

    // Enrich with request-side signals for match quality
    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const clientIp = forwardedFor.split(',')[0]?.trim() || undefined;
    const userAgent = req.headers.get('user-agent') || undefined;

    const mergedUserData: CapiUserData = {
      ...(userData || {}),
      clientIpAddress: clientIp || userData?.clientIpAddress,
      clientUserAgent: userAgent || userData?.clientUserAgent,
    };

    await sendCapiEvent({
      eventName,
      eventId,
      eventSourceUrl: eventSourceUrl || req.headers.get('referer') || undefined,
      actionSource: 'website',
      userData: mergedUserData,
      customData: customData || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Meta CAPI mirror endpoint error:', err);
    return NextResponse.json({ error: 'internal error' }, { status: 500 });
  }
}
