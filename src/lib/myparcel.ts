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
  carrier?: 'postnl' | 'dpd' | 'dhl' | 'dhlforyou' | 'ups';
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
  carrier?: 'postnl' | 'dpd' | 'dhl' | 'dhlforyou' | 'ups';
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

export type MyParcelCarrier = 'postnl' | 'dpd' | 'dhl' | 'dhlforyou' | 'ups';

/** Current MyParcel carrier IDs (legacy IDs 6-8 must not be used). */
export function carrierIdForShipment(
  carrier: MyParcelCarrier,
  country: 'NL' | 'BE' | 'DE',
): number {
  switch (carrier) {
    case 'postnl':
      return 1;
    case 'dpd':
      return 4;
    case 'dhlforyou':
      return 9;
    case 'dhl':
      // DHL For You is the domestic product; Parcel Connect is the European
      // product represented by the generic "DHL" choice for BE/DE.
      return country === 'NL' ? 9 : 10;
    case 'ups':
      // The storefront offers generic UPS, so use Standard rather than the
      // more expensive Express Saver product (carrier 13).
      return 12;
  }
}

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
    carrier: 'postnl' | 'dpd' | 'dhl' | 'dhlforyou' | 'ups';
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
          carrier: carrierIdForShipment(delivery.carrier, recipient.cc),
          ...(isPickup && delivery.pickup
            ? {
                pickup: {
                  cc: recipient.cc,
                  postal_code: delivery.pickup.postalCode.replace(/\s/g, ''),
                  city: delivery.pickup.city,
                  street: delivery.pickup.street,
                  number: delivery.pickup.number,
                  location_name: delivery.pickup.locationName,
                  // location_code + retail_network_id are required for BE;
                  // NL pickups identify by location_name + address only.
                  ...(recipient.cc === 'BE'
                    ? {
                        location_code: delivery.pickup.locationCode,
                        retail_network_id: delivery.pickup.retailNetworkId ?? 'LD-01',
                      }
                    : {}),
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
  reference_identifier?: string;
  barcode?: string;
  tracktrace?: string;
  status?: number;
  // MyParcel returns many more fields; we only surface what the UI uses.
}

export interface TrackTraceDetail {
  shipment_id: number;
  link_consumer_portal?: string;
  link_tracktrace?: string;
}

const COMMON_TRACKING_HOSTS = ['myparcel.me', 'myparcel.nl'] as const;
const CARRIER_TRACKING_HOSTS: Record<MyParcelCarrier, readonly string[]> = {
  postnl: ['postnl.nl'],
  dpd: ['dpd.com', 'dpd.nl', 'dpd.de', 'dpd.be'],
  dhl: [
    'dhl.com',
    'dhl.nl',
    'dhl.de',
    'dhl.be',
    'dhlparcel.nl',
    'dhlparcel.de',
    'dhlparcel.be',
  ],
  dhlforyou: [
    'dhl.com',
    'dhl.nl',
    'dhl.de',
    'dhl.be',
    'dhlparcel.nl',
    'dhlparcel.de',
    'dhlparcel.be',
  ],
  ups: ['ups.com'],
};

function isAllowedTrackingHost(hostname: string, carrier: MyParcelCarrier): boolean {
  const allowedHosts = [
    ...COMMON_TRACKING_HOSTS,
    ...CARRIER_TRACKING_HOSTS[carrier],
  ];
  return allowedHosts.some(
    (allowedHost) =>
      hostname === allowedHost || hostname.endsWith(`.${allowedHost}`),
  );
}

function validatedTrackingUrl(
  value: unknown,
  carrier: MyParcelCarrier,
): string | undefined {
  if (typeof value !== 'string' || value.length < 10 || value.length > 2_048) {
    return undefined;
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      (url.port && url.port !== '443') ||
      !isAllowedTrackingHost(hostname, carrier)
    ) {
      return undefined;
    }
    return url.toString();
  } catch {
    return undefined;
  }
}

/** Select a provider-authenticated consumer URL, never an arbitrary webhook URL. */
export function trackingUrlFromTrackTrace(
  trackTrace: TrackTraceDetail,
  carrier: MyParcelCarrier,
): string | undefined {
  return (
    validatedTrackingUrl(trackTrace.link_consumer_portal, carrier) ??
    validatedTrackingUrl(trackTrace.link_tracktrace, carrier)
  );
}

/**
 * Fetch authoritative Track & Trace data for exactly one shipment.
 * An empty/404 response means the carrier has not published tracking yet.
 */
export async function getTrackTrace(
  shipmentId: number | string,
): Promise<TrackTraceDetail | null> {
  const rawId = String(shipmentId);
  if (!/^\d{1,20}$/.test(rawId)) {
    throw new Error('Invalid MyParcel tracktrace shipment id');
  }
  const expectedId = Number(rawId);
  if (!Number.isSafeInteger(expectedId) || expectedId < 1) {
    throw new Error('Invalid MyParcel tracktrace shipment id');
  }

  const res = await fetch(`${BASE}/tracktraces/${expectedId}`, {
    headers: {
      Authorization: authHeader(),
      'User-Agent': UA,
      Accept: 'application/json;charset=utf-8',
    },
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `MyParcel GET /tracktraces/${expectedId} → ${res.status}: ${text.slice(0, 300)}`,
    );
  }

  const json = (await res.json()) as {
    data?: { tracktraces?: TrackTraceDetail[] };
  };
  const trackTraces = json.data?.tracktraces;
  if (!Array.isArray(trackTraces)) {
    throw new Error('MyParcel tracktrace response has an invalid shape');
  }
  const matching = trackTraces.find(
    (trackTrace) => trackTrace?.shipment_id === expectedId,
  );
  if (!matching && trackTraces.length > 0) {
    throw new Error('MyParcel tracktrace shipment identity mismatch');
  }
  return matching ?? null;
}

/**
 * Reconcile an earlier shipment create whose response was lost.
 *
 * `reference_identifier` is the immutable order reference that we also send
 * when creating a shipment. Always perform this lookup before POST /shipments
 * so retrying a paid-order effect cannot create a second parcel.
 */
export async function findShipmentByReference(
  referenceIdentifier: string,
): Promise<ShipmentDetail | null> {
  const reference = referenceIdentifier.trim();
  if (!reference || reference.length > 200) {
    throw new Error('Invalid MyParcel shipment reference');
  }

  const query = new URLSearchParams({
    reference_identifier: reference,
    size: '30',
  });
  const json = await call<{
    data?: {
      shipments?: ShipmentDetail[];
      search_results?: {
        shipments?: ShipmentDetail[];
      };
    };
  }>(`/shipments?${query.toString()}`);
  const shipments =
    json.data?.shipments ?? json.data?.search_results?.shipments ?? [];

  return (
    shipments.find(
      (shipment) => shipment.reference_identifier === reference,
    ) ?? null
  );
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
