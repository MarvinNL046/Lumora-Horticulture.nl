import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const TOKEN_VERSION = 1 as const;
const TOKEN_PURPOSE = 'payment-retry' as const;
const MINIMUM_SECRET_LENGTH = 32;
const MAXIMUM_TOKEN_LENGTH = 2048;
const MAXIMUM_LIFETIME_SECONDS = 7 * 24 * 60 * 60;
const CLOCK_SKEW_SECONDS = 5 * 60;

export const PAYMENT_RETRY_TOKEN_TTL_SECONDS = MAXIMUM_LIFETIME_SECONDS;

export type PaymentRetryLocale = 'nl' | 'en' | 'de';

export interface PaymentRetryTokenPayload {
  v: typeof TOKEN_VERSION;
  purpose: typeof TOKEN_PURPOSE;
  orderId: string;
  locale: PaymentRetryLocale;
  iat: number;
  exp: number;
  jti: string;
}

interface PurposeBoundTokenPayload {
  v: typeof TOKEN_VERSION;
  purpose: string;
  iat: number;
  exp: number;
  jti: string;
}

export class PaymentRetryConfigurationError extends Error {
  constructor() {
    super('PAYMENT_RETRY_SECRET must be configured with at least 32 characters');
    this.name = 'PaymentRetryConfigurationError';
  }
}

export class PaymentRetryTokenError extends Error {
  constructor() {
    super('Invalid or expired payment retry token');
    this.name = 'PaymentRetryTokenError';
  }
}

function paymentRetrySecret(): string {
  const secret = process.env.PAYMENT_RETRY_SECRET;

  if (!secret || secret.length < MINIMUM_SECRET_LENGTH) {
    throw new PaymentRetryConfigurationError();
  }

  return secret;
}

export function assertPaymentRetryConfiguration(): void {
  void paymentRetrySecret();
}

function isLocale(value: unknown): value is PaymentRetryLocale {
  return value === 'nl' || value === 'en' || value === 'de';
}

function isSafeIdentifier(value: unknown, maximumLength: number): value is string {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length <= maximumLength &&
    /^[A-Za-z0-9_-]+$/.test(value)
  );
}

function signatureFor(encodedPayload: string): Buffer {
  return createHmac('sha256', paymentRetrySecret()).update(encodedPayload).digest();
}

function signPurposeBoundPayload(payload: PurposeBoundTokenPayload): string {
  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = signatureFor(encodedPayload).toString('base64url');

  return `${encodedPayload}.${signature}`;
}

function verifyPurposeBoundPayload(
  token: string,
  expectedPurpose: string,
  nowSeconds: number,
): PurposeBoundTokenPayload & Record<string, unknown> {
  // Read and validate configuration before parsing attacker-controlled input.
  // A missing production secret must never degrade into a public lookup flow.
  assertPaymentRetryConfiguration();

  if (!token || token.length > MAXIMUM_TOKEN_LENGTH || !Number.isSafeInteger(nowSeconds)) {
    throw new PaymentRetryTokenError();
  }

  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new PaymentRetryTokenError();
  }

  const [encodedPayload, encodedSignature] = parts;
  let suppliedSignature: Buffer;

  try {
    suppliedSignature = Buffer.from(encodedSignature, 'base64url');
  } catch {
    throw new PaymentRetryTokenError();
  }

  const expectedSignature = signatureFor(encodedPayload);
  if (
    suppliedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(suppliedSignature, expectedSignature)
  ) {
    throw new PaymentRetryTokenError();
  }

  let payload: unknown;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
  } catch {
    throw new PaymentRetryTokenError();
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new PaymentRetryTokenError();
  }

  const candidate = payload as Partial<PurposeBoundTokenPayload> & Record<string, unknown>;
  if (
    candidate.v !== TOKEN_VERSION ||
    candidate.purpose !== expectedPurpose ||
    !isSafeIdentifier(candidate.jti, 128) ||
    !Number.isSafeInteger(candidate.iat) ||
    !Number.isSafeInteger(candidate.exp) ||
    (candidate.iat as number) > nowSeconds + CLOCK_SKEW_SECONDS ||
    (candidate.exp as number) <= nowSeconds ||
    (candidate.exp as number) <= (candidate.iat as number) ||
    (candidate.exp as number) - (candidate.iat as number) > MAXIMUM_LIFETIME_SECONDS
  ) {
    throw new PaymentRetryTokenError();
  }

  return candidate as PurposeBoundTokenPayload & Record<string, unknown>;
}

export function createPaymentRetryToken(
  input: { orderId: string; locale: PaymentRetryLocale },
  options: { nowSeconds?: number; lifetimeSeconds?: number; jti?: string } = {},
): string {
  if (!isSafeIdentifier(input.orderId, 128)) {
    throw new PaymentRetryTokenError();
  }

  const nowSeconds = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  const lifetimeSeconds = options.lifetimeSeconds ?? PAYMENT_RETRY_TOKEN_TTL_SECONDS;
  const jti = options.jti ?? randomBytes(16).toString('base64url');

  if (
    !Number.isSafeInteger(nowSeconds) ||
    !Number.isSafeInteger(lifetimeSeconds) ||
    lifetimeSeconds <= 0 ||
    lifetimeSeconds > MAXIMUM_LIFETIME_SECONDS ||
    !isSafeIdentifier(jti, 128)
  ) {
    throw new PaymentRetryTokenError();
  }

  const payload: PaymentRetryTokenPayload = {
    v: TOKEN_VERSION,
    purpose: TOKEN_PURPOSE,
    orderId: input.orderId,
    locale: input.locale,
    iat: nowSeconds,
    exp: nowSeconds + lifetimeSeconds,
    jti,
  };
  return signPurposeBoundPayload(payload);
}

export function verifyPaymentRetryToken(
  token: string,
  options: { nowSeconds?: number } = {},
): PaymentRetryTokenPayload {
  const nowSeconds = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  const candidate = verifyPurposeBoundPayload(token, TOKEN_PURPOSE, nowSeconds);

  if (
    !isSafeIdentifier(candidate.orderId, 128) ||
    !isLocale(candidate.locale)
  ) {
    throw new PaymentRetryTokenError();
  }

  return {
    v: TOKEN_VERSION,
    purpose: TOKEN_PURPOSE,
    orderId: candidate.orderId,
    locale: candidate.locale,
    iat: candidate.iat,
    exp: candidate.exp,
    jti: candidate.jti,
  };
}
