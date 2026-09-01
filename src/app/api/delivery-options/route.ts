import { NextResponse } from 'next/server';
import { getDeliveryOptions, getPickupPoints } from '@/lib/myparcel';
import { consumeDistributedRateLimit } from '@/lib/distributed-rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CARRIERS = ['postnl', 'dpd', 'dhl', 'dhlforyou', 'ups'] as const;
const COUNTRIES = ['NL', 'BE', 'DE'] as const;
type Carrier = (typeof CARRIERS)[number];
type Country = (typeof COUNTRIES)[number];
const carrierSet = new Set<string>(CARRIERS);
const countrySet = new Set<string>(COUNTRIES);
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

// Combined endpoint: returns delivery slots + pickup points in one call so
// the checkout picker can render both panels from a single request.
// Validates postcode format server-side to avoid MyParcel's unhelpful error
// messages when the client sends junk while the user's still typing.
export async function GET(req: Request) {
  if (process.env.MYPARCEL_DELIVERY_OPTIONS_ENABLED !== 'true') {
    return NextResponse.json(
      { error: 'Delivery options are temporarily unavailable' },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store, max-age=0', 'Retry-After': '60' },
      },
    );
  }

  const rateLimit = await consumeDistributedRateLimit(
    req.headers,
    'delivery-options',
    MAX_REQUESTS_PER_WINDOW,
    WINDOW_MS,
  );
  if (rateLimit.kind === 'unavailable') {
    return NextResponse.json(
      { error: 'Delivery options are temporarily unavailable' },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Retry-After': String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }
  if (rateLimit.kind === 'limited') {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.retryAfterSeconds),
          'Cache-Control': 'no-store, max-age=0',
        },
      },
    );
  }

  const url = new URL(req.url);
  const postalCode = url.searchParams.get('postal_code')?.trim() ?? '';
  const houseNumber = url.searchParams.get('number')?.trim() ?? '';
  const countryValue = (url.searchParams.get('cc') ?? 'NL').toUpperCase();
  const carrierValue = (url.searchParams.get('carrier') ?? 'postnl').toLowerCase();

  if (!countrySet.has(countryValue) || !carrierSet.has(carrierValue)) {
    return NextResponse.json({ error: 'Invalid delivery parameters' }, { status: 400 });
  }
  const cc = countryValue as Country;
  const carrier = carrierValue as Carrier;

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
    const [delivery, rawPickups] = await Promise.all([
      getDeliveryOptions({ postalCode, houseNumber, countryCode: cc, carrier }),
      getPickupPoints({ postalCode, houseNumber, countryCode: cc, carrier }).catch(() => []),
    ]);

    // MyParcel's pickup schema is unstable. We've now seen three variants:
    //   1. flat with `location_name` as a string
    //   2. address fields nested under `address`
    //   3. metadata (the real name + location_code + retail_network_id +
    //      lat/lng/opening_hours) nested INSIDE the `location_name` field
    //      as an object — top-level `location_code` is then empty
    // Detect (3) and unwrap, otherwise fall back to (1)/(2). Without this
    // the DeliveryPicker renders an object as a React child → error #31.
    const pickups = (rawPickups as any[]).map((p) => {
      const nested =
        p && typeof p.location_name === 'object' && p.location_name !== null
          ? p.location_name
          : null;
      const addr = (p && p.address) || {};
      const street = p.street ?? addr.street ?? '';
      const number = p.number ?? addr.number ?? '';
      const number_suffix = p.number_suffix ?? addr.number_suffix ?? '';
      const postal_code = p.postal_code ?? addr.postal_code ?? '';
      const city = p.city ?? addr.city ?? '';
      const name =
        nested?.location_name ??
        (typeof p.location_name === 'string' ? p.location_name : '') ??
        p.location ??
        p.name ??
        '';
      const distRaw = p.distance ?? p.distance_m ?? nested?.distance ?? 0;
      const distance = typeof distRaw === 'number'
        ? distRaw
        : Number(String(distRaw).replace(/[^\d.]/g, '')) || 0;
      return {
        location_code: p.location_code || nested?.location_code || p.id || '',
        location_name: typeof name === 'string' ? name : '',
        street,
        number: String(number) + (number_suffix ? number_suffix : ''),
        postal_code,
        city,
        distance,
        retail_network_id: p.retail_network_id ?? nested?.retail_network_id,
      };
    });

    return NextResponse.json(
      { delivery, pickups },
      // Cache for 10 min at the edge; cutoff times shift slowly but 10 min is
      // fine for a checkout page that users rarely sit on longer than that.
      { headers: { 'cache-control': 's-maxage=600, stale-while-revalidate=1800' } },
    );
  } catch {
    // Provider errors can include the requested address and must not be echoed
    // to the browser or copied verbatim into logs.
    console.error('[delivery-options] provider request failed');
    return NextResponse.json(
      { error: 'Delivery options are temporarily unavailable' },
      { status: 502, headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  }
}
