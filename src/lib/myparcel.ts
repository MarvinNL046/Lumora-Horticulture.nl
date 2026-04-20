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
