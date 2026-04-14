import crypto from 'node:crypto';

/**
 * Meta Conversions API (server-side event tracking)
 *
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api
 *
 * Required env vars:
 *   META_CAPI_ACCESS_TOKEN   - long-lived access token from Events Manager
 *   META_PIXEL_ID            - dataset/pixel id (default: 1537235201740065)
 *   META_CAPI_TEST_EVENT_CODE (optional) - to test events in Events Manager
 */

const GRAPH_API_VERSION = 'v21.0';
// Both datasets receive server-side events so either can be used in Ads Manager
// campaigns. Browser pixel also inits both (see src/components/MetaPixel.tsx).
const DEFAULT_PIXEL_IDS = ['1537235201740065', '2680887955624246'];

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export interface CapiUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  zip?: string;
  country?: string; // ISO 3166-1 alpha-2 (e.g. 'nl')
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbp?: string; // _fbp cookie
  fbc?: string; // _fbc cookie
}

export interface CapiEvent {
  eventName:
    | 'Purchase'
    | 'InitiateCheckout'
    | 'AddToCart'
    | 'ViewContent'
    | 'Lead'
    | 'CompleteRegistration'
    | 'Subscribe';
  eventId?: string;
  eventTime?: number; // unix seconds
  eventSourceUrl?: string;
  actionSource?: 'website' | 'email' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other';
  userData: CapiUserData;
  customData?: Record<string, unknown>;
}

function buildUserData(u: CapiUserData) {
  const out: Record<string, unknown> = {};
  if (u.email) out.em = [sha256(u.email)];
  if (u.phone) out.ph = [sha256(normalizePhone(u.phone))];
  if (u.firstName) out.fn = [sha256(u.firstName)];
  if (u.lastName) out.ln = [sha256(u.lastName)];
  if (u.city) out.ct = [sha256(u.city)];
  if (u.zip) out.zp = [sha256(u.zip)];
  if (u.country) out.country = [sha256(u.country)];
  if (u.clientIpAddress) out.client_ip_address = u.clientIpAddress;
  if (u.clientUserAgent) out.client_user_agent = u.clientUserAgent;
  if (u.fbp) out.fbp = u.fbp;
  if (u.fbc) out.fbc = u.fbc;
  return out;
}

export async function sendCapiEvent(event: CapiEvent): Promise<void> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) {
    console.warn('META_CAPI_ACCESS_TOKEN not set — skipping CAPI event', event.eventName);
    return;
  }

  // Support comma-separated list in META_PIXEL_ID; fall back to defaults.
  const pixelIds = (process.env.META_PIXEL_ID || DEFAULT_PIXEL_IDS.join(','))
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        event_source_url: event.eventSourceUrl,
        action_source: event.actionSource ?? 'website',
        user_data: buildUserData(event.userData),
        custom_data: event.customData,
      },
    ],
  };
  if (testEventCode) payload.test_event_code = testEventCode;

  await Promise.all(
    pixelIds.map(async (pixelId) => {
      const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`;
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          cache: 'no-store',
        });
        if (!res.ok) {
          const text = await res.text();
          console.error(`CAPI ${event.eventName} → ${pixelId} failed (${res.status}):`, text);
          return;
        }
        const json = await res.json();
        console.log(`CAPI ${event.eventName} → ${pixelId}:`, json);
      } catch (err) {
        console.error(`CAPI ${event.eventName} → ${pixelId} error:`, err);
      }
    })
  );
}
