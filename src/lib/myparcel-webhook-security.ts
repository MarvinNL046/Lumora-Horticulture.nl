import { createHash, timingSafeEqual } from 'node:crypto';

export type MyParcelWebhookSource = 'label' | 'status';

export const MAX_MYPARCEL_WEBHOOK_BODY_BYTES = 64 * 1024;
const MAX_HOOKS_PER_REQUEST = 100;

const EXPECTED_HOOK: Record<MyParcelWebhookSource, string> = {
  label: 'shipment_label_created',
  status: 'shipment_status_change',
};

const KNOWN_SHIPMENT_STATUSES = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  30, 31, 32, 33, 34, 35, 36, 37, 38,
]);

export interface NormalisedMyParcelEvent {
  shipmentId: string;
  statusCode?: number;
  pdfUrl?: string;
  labelOk?: boolean;
}

export type MyParcelWebhookAuthResult =
  | { ok: true }
  | {
      ok: false;
      reason: 'misconfigured' | 'unauthorized' | 'unsupported_media_type';
    };

export class MyParcelWebhookValidationError extends Error {
  constructor() {
    super('Invalid MyParcel webhook payload');
    this.name = 'MyParcelWebhookValidationError';
  }
}

function constantTimeEqual(left: string, right: string): boolean {
  // Hashing first keeps both buffers the same length. This avoids making the
  // secret length observable through an early return before timingSafeEqual.
  const leftDigest = createHash('sha256').update(left, 'utf8').digest();
  const rightDigest = createHash('sha256').update(right, 'utf8').digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isPositiveInteger(value: unknown): value is number {
  return Number.isSafeInteger(value) && Number(value) > 0;
}

function isSafeOptionalString(value: unknown, maxLength: number): boolean {
  return (
    value === undefined ||
    (typeof value === 'string' && value.length <= maxLength && !/[\u0000-\u001f\u007f]/.test(value))
  );
}

export function isKnownMyParcelShipmentStatus(value: unknown): value is number {
  return Number.isSafeInteger(value) && KNOWN_SHIPMENT_STATUSES.has(Number(value));
}

export function isTrustedMyParcelPdfUrl(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > 512) return false;

  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname === 'api.myparcel.nl' &&
      url.port === '' &&
      url.username === '' &&
      url.password === '' &&
      url.search === '' &&
      url.hash === '' &&
      /^\/pdfs\/[a-zA-Z0-9_-]{20,200}$/.test(url.pathname)
    );
  } catch {
    return false;
  }
}

/**
 * Verify the headers MyParcel documents for webhook deliveries. The optional
 * Lumora secret is an additional layer and never replaces MyParcel's own
 * authorization header. MyParcel lowercases callback URLs, so URL tokens used
 * in production should be generated as lowercase hex.
 */
export function authenticateMyParcelWebhook(input: {
  headers: Pick<Headers, 'get'>;
  requestUrl: string;
  source: MyParcelWebhookSource;
  apiKey: string | undefined;
  webhookSecret?: string;
  expectedHookId?: string;
}): MyParcelWebhookAuthResult {
  const { headers, requestUrl, source, apiKey, webhookSecret, expectedHookId } = input;

  if (!apiKey) return { ok: false, reason: 'misconfigured' };
  if (webhookSecret !== undefined && webhookSecret.length < 32) {
    return { ok: false, reason: 'misconfigured' };
  }

  const providedAuthorization = headers.get('x-myparcel-authorization') ?? '';
  const expectedAuthorization = Buffer.from(apiKey, 'utf8').toString('base64');
  if (!constantTimeEqual(providedAuthorization, expectedAuthorization)) {
    return { ok: false, reason: 'unauthorized' };
  }

  const providedHook = headers.get('x-myparcel-hook') ?? '';
  if (!constantTimeEqual(providedHook, EXPECTED_HOOK[source])) {
    return { ok: false, reason: 'unauthorized' };
  }

  const hookId = headers.get('x-myparcel-hookid') ?? '';
  if (!/^[a-zA-Z0-9_-]{16,128}$/.test(hookId)) {
    return { ok: false, reason: 'unauthorized' };
  }
  if (expectedHookId && !constantTimeEqual(hookId, expectedHookId)) {
    return { ok: false, reason: 'unauthorized' };
  }

  const userAgent = headers.get('user-agent') ?? '';
  if (!userAgent.startsWith('MyParcel/Webhook-Notifier')) {
    return { ok: false, reason: 'unauthorized' };
  }

  if (webhookSecret !== undefined) {
    let queryTokens: string[] = [];
    try {
      queryTokens = new URL(requestUrl).searchParams.getAll('token');
    } catch {
      return { ok: false, reason: 'unauthorized' };
    }

    const headerSecret = headers.get('x-lumora-webhook-secret');
    const providedSecret = headerSecret ?? (queryTokens.length === 1 ? queryTokens[0] : '');
    if (!constantTimeEqual(providedSecret, webhookSecret)) {
      return { ok: false, reason: 'unauthorized' };
    }
  }

  const mediaType = (headers.get('content-type') ?? '')
    .split(';', 1)[0]
    .trim()
    .toLowerCase();
  if (mediaType !== 'application/json') {
    return { ok: false, reason: 'unsupported_media_type' };
  }

  return { ok: true };
}

export function parseMyParcelWebhookEvents(
  source: MyParcelWebhookSource,
  rawBody: string,
): NormalisedMyParcelEvent[] {
  if (
    rawBody.length === 0 ||
    Buffer.byteLength(rawBody, 'utf8') > MAX_MYPARCEL_WEBHOOK_BODY_BYTES
  ) {
    throw new MyParcelWebhookValidationError();
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    throw new MyParcelWebhookValidationError();
  }

  if (!isRecord(body) || !isRecord(body.data) || !Array.isArray(body.data.hooks)) {
    throw new MyParcelWebhookValidationError();
  }

  const hooks = body.data.hooks;
  if (hooks.length === 0 || hooks.length > MAX_HOOKS_PER_REQUEST) {
    throw new MyParcelWebhookValidationError();
  }

  const events: NormalisedMyParcelEvent[] = [];
  const seenShipmentIds = new Set<string>();

  for (const hook of hooks) {
    if (!isRecord(hook)) throw new MyParcelWebhookValidationError();

    if (source === 'status') {
      if (
        !isPositiveInteger(hook.shipment_id) ||
        !isPositiveInteger(hook.account_id) ||
        !isPositiveInteger(hook.shop_id) ||
        !isKnownMyParcelShipmentStatus(hook.status) ||
        !isSafeOptionalString(hook.barcode, 128) ||
        !isSafeOptionalString(hook.shipment_reference_identifier, 255) ||
        !isSafeOptionalString(hook.order_id, 64)
      ) {
        throw new MyParcelWebhookValidationError();
      }

      const shipmentId = String(hook.shipment_id);
      if (!seenShipmentIds.has(shipmentId)) {
        seenShipmentIds.add(shipmentId);
        events.push({ shipmentId, statusCode: hook.status });
      }
      continue;
    }

    if (
      (hook.status !== 'success' && hook.status !== 'failed') ||
      !Array.isArray(hook.shipment_ids) ||
      hook.shipment_ids.length === 0 ||
      !isSafeOptionalString(hook.printer_identifier, 255)
    ) {
      throw new MyParcelWebhookValidationError();
    }

    const labelOk = hook.status === 'success';
    if (labelOk && !isTrustedMyParcelPdfUrl(hook.pdf)) {
      throw new MyParcelWebhookValidationError();
    }
    if (!labelOk && hook.pdf !== undefined && hook.pdf !== '') {
      throw new MyParcelWebhookValidationError();
    }

    for (const id of hook.shipment_ids) {
      if (!isPositiveInteger(id)) throw new MyParcelWebhookValidationError();
      const shipmentId = String(id);
      if (seenShipmentIds.has(shipmentId)) continue;
      seenShipmentIds.add(shipmentId);
      events.push({
        shipmentId,
        labelOk,
        pdfUrl: labelOk ? String(hook.pdf) : undefined,
      });
      if (events.length > MAX_HOOKS_PER_REQUEST) {
        throw new MyParcelWebhookValidationError();
      }
    }
  }

  return events;
}
