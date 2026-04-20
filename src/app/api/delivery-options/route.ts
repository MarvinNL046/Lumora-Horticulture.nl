import { NextResponse } from 'next/server';
import { getDeliveryOptions, getPickupPoints } from '@/lib/myparcel';

export const runtime = 'nodejs';

// Combined endpoint: returns delivery slots + pickup points in one call so
// the checkout picker can render both panels from a single request.
// Validates postcode format server-side to avoid MyParcel's unhelpful error
// messages when the client sends junk while the user's still typing.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const postalCode = url.searchParams.get('postal_code')?.trim() ?? '';
  const houseNumber = url.searchParams.get('number')?.trim() ?? '';
  const cc = (url.searchParams.get('cc') ?? 'NL').toUpperCase() as 'NL' | 'BE' | 'DE';
  const carrier = (url.searchParams.get('carrier') ?? 'postnl') as 'postnl' | 'dpd' | 'dhl' | 'dhlforyou';

  // Basic input sanity
  const isValidNL = cc === 'NL' && /^[0-9]{4}\s?[A-Za-z]{2}$/.test(postalCode);
  const isValidBE = cc === 'BE' && /^[0-9]{4}$/.test(postalCode);
  const isValidDE = cc === 'DE' && /^[0-9]{5}$/.test(postalCode);
  if (!isValidNL && !isValidBE && !isValidDE) {
    return NextResponse.json({ error: 'Invalid postal_code for country' }, { status: 400 });
  }
  if (!houseNumber || !/^\d+[a-zA-Z]?$/.test(houseNumber)) {
    return NextResponse.json({ error: 'Invalid house number' }, { status: 400 });
  }

  try {
    // Fire both in parallel — MyParcel allows concurrent requests per key.
    const [delivery, pickups] = await Promise.all([
      getDeliveryOptions({ postalCode, houseNumber, countryCode: cc, carrier }),
      getPickupPoints({ postalCode, houseNumber, countryCode: cc, carrier }).catch(() => []),
    ]);
    return NextResponse.json(
      { delivery, pickups },
      // Cache for 10 min at the edge; cutoff times shift slowly but 10 min is
      // fine for a checkout page that users rarely sit on longer than that.
      { headers: { 'cache-control': 's-maxage=600, stale-while-revalidate=1800' } },
    );
  } catch (err) {
    console.error('[delivery-options]', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
