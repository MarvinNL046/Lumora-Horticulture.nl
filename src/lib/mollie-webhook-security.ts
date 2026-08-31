export const MOLLIE_WEBHOOK_MAX_BODY_BYTES = 4_096;

const MOLLIE_STATUSES = [
  'open',
  'pending',
  'authorized',
  'paid',
  'failed',
  'canceled',
  'expired',
] as const;

export type MollieStatus = (typeof MOLLIE_STATUSES)[number];

export class MollieWebhookRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'MollieWebhookRequestError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isConvexIdentifier(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length >= 10 &&
    value.length <= 128 &&
    /^[A-Za-z0-9]+$/.test(value)
  );
}

async function readUrlEncodedBody(
  request: Request,
  maximumBytes: number,
): Promise<URLSearchParams> {
  if (!Number.isSafeInteger(maximumBytes) || maximumBytes < 1) {
    throw new Error('Invalid request body limit');
  }

  const mediaType = request.headers
    .get('content-type')
    ?.split(';', 1)[0]
    .trim()
    .toLowerCase();
  if (mediaType !== 'application/x-www-form-urlencoded') {
    throw new MollieWebhookRequestError('Unsupported content type', 415);
  }

  const contentLength = request.headers.get('content-length');
  if (contentLength) {
    if (!/^\d+$/.test(contentLength)) {
      throw new MollieWebhookRequestError('Invalid content length', 400);
    }
    if (Number(contentLength) > maximumBytes) {
      throw new MollieWebhookRequestError('Payload too large', 413);
    }
  }

  if (!request.body) {
    throw new MollieWebhookRequestError('Missing request body', 400);
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let body = '';
  let bytesRead = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesRead += value.byteLength;
      if (bytesRead > maximumBytes) {
        await reader.cancel().catch(() => undefined);
        throw new MollieWebhookRequestError('Payload too large', 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } catch (error) {
    if (error instanceof MollieWebhookRequestError) throw error;
    throw new MollieWebhookRequestError('Invalid request encoding', 400);
  }

  return new URLSearchParams(body);
}

export async function readMollieWebhookPaymentId(
  request: Request,
  maximumBytes = MOLLIE_WEBHOOK_MAX_BODY_BYTES,
): Promise<string> {
  const params = await readUrlEncodedBody(request, maximumBytes);
  const keys = Array.from(params.keys());
  const paymentIds = params.getAll('id');

  if (keys.some((key) => key !== 'id') || paymentIds.length !== 1) {
    throw new MollieWebhookRequestError('Invalid webhook payload', 400);
  }

  const paymentId = paymentIds[0];
  if (!/^tr_[A-Za-z0-9]{6,64}$/.test(paymentId)) {
    throw new MollieWebhookRequestError('Invalid payment id', 400);
  }

  return paymentId;
}

export function parseMollieAmountCents(value: unknown): number {
  if (typeof value !== 'string' || !/^\d{1,13}\.\d{2}$/.test(value)) {
    throw new MollieWebhookRequestError('Invalid provider amount', 409);
  }

  const [euros, cents] = value.split('.');
  const amountCents = Number(euros) * 100 + Number(cents);
  if (!Number.isSafeInteger(amountCents) || amountCents < 1) {
    throw new MollieWebhookRequestError('Invalid provider amount', 409);
  }
  return amountCents;
}

export function isMollieStatus(value: unknown): value is MollieStatus {
  return (
    typeof value === 'string' &&
    (MOLLIE_STATUSES as readonly string[]).includes(value)
  );
}

export function readMolliePaymentMetadata(metadataValue: unknown): {
  orderId: string;
  attemptId?: string;
} {
  if (!isRecord(metadataValue) || !isConvexIdentifier(metadataValue.order_id)) {
    throw new MollieWebhookRequestError('Invalid payment metadata', 409);
  }

  const hasAttemptId = Object.prototype.hasOwnProperty.call(
    metadataValue,
    'payment_attempt_id',
  );
  if (hasAttemptId && !isConvexIdentifier(metadataValue.payment_attempt_id)) {
    throw new MollieWebhookRequestError('Invalid payment metadata', 409);
  }

  return {
    orderId: metadataValue.order_id,
    attemptId: hasAttemptId ? (metadataValue.payment_attempt_id as string) : undefined,
  };
}
