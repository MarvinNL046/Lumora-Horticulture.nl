/**
 * MyParcel API client — server-side only.
 *
 * Auth: Basic header with base64(api_key + ':'). Some endpoints omit the
 * trailing colon; MyParcel accepts both. We pass the key as-is (no colon)
 * because that's the form their own docs demo.
 *
 * https://developer.myparcel.nl/api-reference/
 */

const BASE = 'https://api.myparcel.nl';
const UA = 'Lumora-Horticulture/1.0 (+https://lumorahorticulture.nl)';

function apiKey(): string {
  const k = process.env.MYPARCEL_API_KEY;
  if (!k) throw new Error('MYPARCEL_API_KEY not configured');
  return k;
}

function authHeader(): string {
  return `basic ${Buffer.from(apiKey()).toString('base64')}`;
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: authHeader(),
      'User-Agent': UA,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    // Delivery options change throughout the day (cutoff times drift).
    // Short TTL so a user returning to checkout 15 min later sees fresh slots.
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MyParcel ${path} → ${res.status}: ${text.slice(0, 300)}`);
  }
  return (await res.json()) as T;
}

// Time slot type codes: 1 = morning, 2 = standard daytime, 3 = evening.
export type DeliveryTimeType = 1 | 2 | 3;

export interface DeliveryTime {
  start: string;    // "08:00:00"
  end: string;      // "12:00:00"
  type: DeliveryTimeType;
  price_comment: 'morning' | 'standard' | 'avond' | 'saturday';
  price: { currency: 'EUR'; amount: number }; // cents
  comment?: string;
}

export interface DeliveryDate {
  date: string;     // "YYYY-MM-DD"
  time: DeliveryTime[];
}

export interface DeliveryOptionsResponse {
  data: { delivery: DeliveryDate[] };
}

export async function getDeliveryOptions(params: {
  postalCode: string;
  houseNumber: string;
  countryCode?: 'NL' | 'BE' | 'DE';
  carrier?: 'postnl' | 'dpd' | 'dhl' | 'dhlforyou';
}): Promise<DeliveryDate[]> {
  const qs = new URLSearchParams({
    platform: 'myparcel',
    cc: params.countryCode ?? 'NL',
    postal_code: params.postalCode.replace(/\s/g, ''),
    number: params.houseNumber,
    carrier: params.carrier ?? 'postnl',
    monday_delivery: '1',
  });
  const json = await call<DeliveryOptionsResponse>(`/delivery_options?${qs}`);
  return json.data.delivery;
}

export interface DropOffPoint {
  location_code: string;
  location_name: string;
  city: string;
  postal_code: string;
  street: string;
  number: string;
  distance: number; // meters
  available_days: number[];
  cut_off_time: string;
  carrier: string;
  reference?: string;
  retail_network_id?: string;
  opening_hours?: Record<string, Array<{ start: string; end: string }>>;
}

export interface PickupPointsResponse {
  data: { pickup_locations: DropOffPoint[] };
}

// Returns PostNL / DPD / DHL pickup points sorted by proximity.
export async function getPickupPoints(params: {
  postalCode: string;
  houseNumber: string;
  countryCode?: 'NL' | 'BE' | 'DE';
  carrier?: 'postnl' | 'dpd' | 'dhl' | 'dhlforyou';
}): Promise<DropOffPoint[]> {
  const qs = new URLSearchParams({
    platform: 'myparcel',
    cc: params.countryCode ?? 'NL',
    postal_code: params.postalCode.replace(/\s/g, ''),
    number: params.houseNumber,
    carrier: params.carrier ?? 'postnl',
  });
  const json = await call<PickupPointsResponse>(`/pickup_locations?${qs}`);
  return json.data.pickup_locations;
}

// ─── Shipments ─────────────────────────────────────────────
// MyParcel expects a vendor-specific content-type on this endpoint.
const SHIPMENT_CT = 'application/vnd.shipment+json;version=1.1;charset=utf-8';

const CARRIER_ID: Record<'postnl' | 'dpd' | 'dhl' | 'dhlforyou', number> = {
  postnl: 1,
  dpd: 3,
  dhl: 8,
  dhlforyou: 8,
};

export interface CreateShipmentInput {
  orderNumber: string;             // reference_identifier + label_description
  recipient: {
    cc: 'NL' | 'BE' | 'DE';
    postalCode: string;
    city: string;
    street: string;
    number: string;
    numberSuffix?: string;
    person: string;
    phone?: string;
    email: string;
  };
  delivery: {
    kind: 'home' | 'pickup';
    carrier: 'postnl' | 'dpd' | 'dhl' | 'dhlforyou';
    date: string;       // YYYY-MM-DD
    timeType: 1 | 2 | 3;
    pickup?: {
      locationName: string;
      locationCode: string;
      street: string;
      number: string;
      postalCode: string;
      city: string;
      retailNetworkId?: string;
    };
  };
}

export interface CreatedShipment {
  id: number;
  reference_identifier?: string;
}

// Splits the Dutch "Straat 12 bis" form into street + number when a shop only
// stores a combined string. House number is the first run of digits.
export function splitStreetNumber(combined: string): { street: string; number: string; suffix?: string } {
  const m = combined.trim().match(/^(.+?)\s+(\d+)\s*([A-Za-z0-9\-\s/]*)$/);
  if (!m) return { street: combined, number: '' };
  const suffix = (m[3] || '').trim();
  return { street: m[1].trim(), number: m[2], suffix: suffix || undefined };
}

export async function createShipment(input: CreateShipmentInput): Promise<CreatedShipment> {
  const { recipient, delivery } = input;

  const isPickup = delivery.kind === 'pickup';
  const deliveryType = isPickup ? 4 : delivery.timeType;

  const body = {
    data: {
      shipments: [
        {
          reference_identifier: input.orderNumber,
          recipient: {
            cc: recipient.cc,
            postal_code: recipient.postalCode.replace(/\s/g, ''),
            city: recipient.city,
            street: recipient.street,
            number: recipient.number,
            number_suffix: recipient.numberSuffix ?? '',
            person: recipient.person,
            phone: recipient.phone ?? '',
            email: recipient.email,
          },
          options: {
            package_type: 1,
            label_description: input.orderNumber,
            delivery_type: deliveryType,
            delivery_date: delivery.date || undefined,
            only_recipient: 0,
            signature: 0,
            return: 0,
            large_format: 0,
          },
          carrier: CARRIER_ID[delivery.carrier],
          ...(isPickup && delivery.pickup
            ? {
                pickup: {
                  cc: recipient.cc,
                  postal_code: delivery.pickup.postalCode.replace(/\s/g, ''),
                  city: delivery.pickup.city,
                  street: delivery.pickup.street,
                  number: delivery.pickup.number,
                  location_code: delivery.pickup.locationCode,
                  location: delivery.pickup.locationName,
                  retail_network_id: delivery.pickup.retailNetworkId ?? 'PNPNL-01',
                },
              }
            : {}),
        },
      ],
    },
  };

  const res = await fetch(`${BASE}/shipments`, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'User-Agent': UA,
      'Content-Type': SHIPMENT_CT,
      Accept: SHIPMENT_CT,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MyParcel /shipments → ${res.status}: ${text.slice(0, 500)}`);
  }
  const json = (await res.json()) as { data: { ids: CreatedShipment[] } };
  const first = json.data?.ids?.[0];
  if (!first?.id) throw new Error('MyParcel /shipments: missing shipment id in response');
  return first;
}

export interface ShipmentDetail {
  id: number;
  barcode?: string;
  tracktrace?: string;
  status?: number;
  // MyParcel returns many more fields; we only surface what the UI uses.
}

// Status codes above 3 mean a label has been printed; above 8 means delivered.
// See https://developer.myparcel.nl/api-reference/04.shipments.html
export async function getShipment(id: number | string): Promise<ShipmentDetail> {
  const res = await fetch(`${BASE}/shipments/${id}`, {
    headers: {
      Authorization: authHeader(),
      'User-Agent': UA,
      Accept: SHIPMENT_CT,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MyParcel GET /shipments/${id} → ${res.status}: ${text.slice(0, 300)}`);
  }
  const json = (await res.json()) as { data: { shipments: ShipmentDetail[] } };
  const s = json.data?.shipments?.[0];
  if (!s) throw new Error(`MyParcel GET /shipments/${id}: empty response`);
  return s;
}

// Consumer-facing tracking URL (language suffix keeps non-NL emails readable).
export function trackingUrl(
  barcode: string,
  postalCode: string,
  countryCode: 'NL' | 'BE' | 'DE' = 'NL',
  locale: 'nl' | 'en' | 'de' = 'nl',
): string {
  const lang = locale === 'de' ? 'de-DE' : locale === 'en' ? 'en-GB' : 'nl-NL';
  const pc = postalCode.replace(/\s/g, '').toUpperCase();
  return `https://postnl.nl/tracktrace/?B=${encodeURIComponent(barcode)}&P=${encodeURIComponent(pc)}&D=${countryCode}&T=C&L=${lang}`;
}
