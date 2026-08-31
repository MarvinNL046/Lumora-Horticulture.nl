import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import {
  createPaymentRetryToken,
  PaymentRetryConfigurationError,
  PaymentRetryTokenError,
  verifyPaymentRetryToken,
} from './payment-retry-token';

const ORIGINAL_SECRET = process.env.PAYMENT_RETRY_SECRET;
const TEST_SECRET = 'test-payment-retry-secret-that-is-long-enough-1234';

afterEach(() => {
  if (ORIGINAL_SECRET === undefined) {
    delete process.env.PAYMENT_RETRY_SECRET;
  } else {
    process.env.PAYMENT_RETRY_SECRET = ORIGINAL_SECRET;
  }
});

describe('payment retry tokens', () => {
  it('round-trips a valid, purpose-bound token', () => {
    process.env.PAYMENT_RETRY_SECRET = TEST_SECRET;
    const token = createPaymentRetryToken(
      { orderId: 'order_abc123', locale: 'de' },
      { nowSeconds: 1_800_000_000, lifetimeSeconds: 600, jti: 'request_abc123' },
    );

    assert.deepEqual(verifyPaymentRetryToken(token, { nowSeconds: 1_800_000_300 }), {
      v: 1,
      purpose: 'payment-retry',
      orderId: 'order_abc123',
      locale: 'de',
      iat: 1_800_000_000,
      exp: 1_800_000_600,
      jti: 'request_abc123',
    });
  });

  it('rejects a tampered payload', () => {
    process.env.PAYMENT_RETRY_SECRET = TEST_SECRET;
    const token = createPaymentRetryToken(
      { orderId: 'order_abc123', locale: 'nl' },
      { nowSeconds: 1_800_000_000, lifetimeSeconds: 600, jti: 'request_abc123' },
    );
    const [payload, signature] = token.split('.');
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    decoded.orderId = 'order_attacker';
    const tamperedPayload = Buffer.from(JSON.stringify(decoded), 'utf8').toString('base64url');

    assert.throws(
      () => verifyPaymentRetryToken(`${tamperedPayload}.${signature}`, { nowSeconds: 1_800_000_300 }),
      PaymentRetryTokenError,
    );
  });

  it('rejects an expired token', () => {
    process.env.PAYMENT_RETRY_SECRET = TEST_SECRET;
    const token = createPaymentRetryToken(
      { orderId: 'order_abc123', locale: 'en' },
      { nowSeconds: 1_800_000_000, lifetimeSeconds: 60, jti: 'request_abc123' },
    );

    assert.throws(
      () => verifyPaymentRetryToken(token, { nowSeconds: 1_800_000_061 }),
      PaymentRetryTokenError,
    );
  });

  it('rejects malformed tokens and invalid identifiers', () => {
    process.env.PAYMENT_RETRY_SECRET = TEST_SECRET;

    assert.throws(() => verifyPaymentRetryToken('not-a-token'), PaymentRetryTokenError);
    assert.throws(
      () => createPaymentRetryToken({ orderId: '../orders', locale: 'nl' }),
      PaymentRetryTokenError,
    );
  });

  it('fails closed when the secret is missing or weak', () => {
    delete process.env.PAYMENT_RETRY_SECRET;
    assert.throws(
      () => createPaymentRetryToken({ orderId: 'order_abc123', locale: 'nl' }),
      PaymentRetryConfigurationError,
    );

    process.env.PAYMENT_RETRY_SECRET = 'too-short';
    assert.throws(
      () => verifyPaymentRetryToken('anything'),
      PaymentRetryConfigurationError,
    );
  });
});
