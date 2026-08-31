import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  MollieWebhookRequestError,
  isMollieStatus,
  parseMollieAmountCents,
  readMolliePaymentMetadata,
  readMollieWebhookPaymentId,
} from './mollie-webhook-security';

function webhookRequest(body: string, headers: Record<string, string> = {}): Request {
  return new Request('https://lumorahorticulture.nl/api/webhooks/mollie', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      ...headers,
    },
    body,
  });
}

async function rejectsWithStatus(promise: Promise<unknown>, status: number) {
  await assert.rejects(
    promise,
    (error: unknown) =>
      error instanceof MollieWebhookRequestError && error.status === status,
  );
}

describe('Mollie webhook security', () => {
  it('accepts one urlencoded Mollie payment id', async () => {
    assert.equal(
      await readMollieWebhookPaymentId(webhookRequest('id=tr_WDqYK6vllg')),
      'tr_WDqYK6vllg',
    );
  });

  it('rejects the wrong media type, duplicate ids, and extra fields', async () => {
    await rejectsWithStatus(
      readMollieWebhookPaymentId(
        webhookRequest('{"id":"tr_WDqYK6vllg"}', { 'content-type': 'application/json' }),
      ),
      415,
    );
    await rejectsWithStatus(
      readMollieWebhookPaymentId(webhookRequest('id=tr_WDqYK6vllg&id=tr_7UhSN1zuXS')),
      400,
    );
    await rejectsWithStatus(
      readMollieWebhookPaymentId(webhookRequest('id=tr_WDqYK6vllg&order_id=forged')),
      400,
    );
  });

  it('enforces declared and streamed body limits', async () => {
    await rejectsWithStatus(
      readMollieWebhookPaymentId(
        webhookRequest('id=tr_WDqYK6vllg', { 'content-length': '4097' }),
      ),
      413,
    );
    await rejectsWithStatus(
      readMollieWebhookPaymentId(webhookRequest(`id=tr_${'a'.repeat(5_000)}`)),
      413,
    );
  });

  it('parses exact EUR decimals into integer cents', () => {
    assert.equal(parseMollieAmountCents('123.45'), 12_345);
    for (const invalid of ['0.00', '1', '1.2', '1,20', '-1.00', '1.001']) {
      assert.throws(() => parseMollieAmountCents(invalid), MollieWebhookRequestError);
    }
  });

  it('requires order metadata and only allows a missing attempt id for legacy', () => {
    const orderId = 'k57abcdefghijklmnopqrstuvwx12345';
    const attemptId = 'm97abcdefghijklmnopqrstuvwx12345';
    assert.deepEqual(readMolliePaymentMetadata({ order_id: orderId }), {
      orderId,
      attemptId: undefined,
    });
    assert.deepEqual(
      readMolliePaymentMetadata({
        order_id: orderId,
        payment_attempt_id: attemptId,
      }),
      { orderId, attemptId },
    );
    assert.throws(
      () => readMolliePaymentMetadata({ order_id: orderId, payment_attempt_id: '' }),
      MollieWebhookRequestError,
    );
  });

  it('only accepts statuses supported by the atomic transition', () => {
    assert.equal(isMollieStatus('paid'), true);
    assert.equal(isMollieStatus('refunded'), false);
  });
});
