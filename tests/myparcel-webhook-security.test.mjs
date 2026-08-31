import assert from 'node:assert/strict';
import test from 'node:test';

import {
  authenticateMyParcelWebhook,
  isTrustedMyParcelPdfUrl,
  MAX_MYPARCEL_WEBHOOK_BODY_BYTES,
  MyParcelWebhookValidationError,
  parseMyParcelWebhookEvents,
} from '../src/lib/myparcel-webhook-security.ts';

const API_KEY = 'lumora-test-api-key';
const HOOK_ID = 'a'.repeat(40);
const EXTRA_SECRET = 'b'.repeat(48);

function headersFor(source, overrides = {}) {
  return new Headers({
    'content-type': 'application/json; charset=utf-8',
    'user-agent': 'MyParcel/Webhook-Notifier',
    'x-myparcel-authorization': Buffer.from(API_KEY, 'utf8').toString('base64'),
    'x-myparcel-hook':
      source === 'status' ? 'shipment_status_change' : 'shipment_label_created',
    'x-myparcel-hookid': HOOK_ID,
    ...overrides,
  });
}

test('accepts the documented MyParcel headers and optional second secret', () => {
  assert.deepEqual(
    authenticateMyParcelWebhook({
      headers: headersFor('status'),
      requestUrl: 'https://lumorahorticulture.nl/api/webhooks/myparcel/status',
      source: 'status',
      apiKey: API_KEY,
      expectedHookId: HOOK_ID,
    }),
    { ok: true },
  );

  assert.deepEqual(
    authenticateMyParcelWebhook({
      headers: headersFor('label'),
      requestUrl: `https://lumorahorticulture.nl/api/webhooks/myparcel/label?token=${EXTRA_SECRET}`,
      source: 'label',
      apiKey: API_KEY,
      webhookSecret: EXTRA_SECRET,
    }),
    { ok: true },
  );

  assert.deepEqual(
    authenticateMyParcelWebhook({
      headers: headersFor('label', { 'x-lumora-webhook-secret': EXTRA_SECRET }),
      requestUrl: 'https://lumorahorticulture.nl/api/webhooks/myparcel/label',
      source: 'label',
      apiKey: API_KEY,
      webhookSecret: EXTRA_SECRET,
    }),
    { ok: true },
  );
});

test('rejects forged authorization, mismatched hooks and invalid provider identity', () => {
  const cases = [
    headersFor('status', { 'x-myparcel-authorization': 'forged' }),
    headersFor('status', { 'x-myparcel-hook': 'shipment_label_created' }),
    headersFor('status', { 'x-myparcel-hookid': 'short' }),
    headersFor('status', { 'user-agent': 'curl/8.0' }),
  ];

  for (const headers of cases) {
    assert.deepEqual(
      authenticateMyParcelWebhook({
        headers,
        requestUrl: 'https://lumorahorticulture.nl/api/webhooks/myparcel/status',
        source: 'status',
        apiKey: API_KEY,
      }),
      { ok: false, reason: 'unauthorized' },
    );
  }
});

test('fails closed for weak configuration and non-JSON requests', () => {
  assert.deepEqual(
    authenticateMyParcelWebhook({
      headers: headersFor('status'),
      requestUrl: 'https://lumorahorticulture.nl/api/webhooks/myparcel/status?token=short',
      source: 'status',
      apiKey: API_KEY,
      webhookSecret: 'short',
    }),
    { ok: false, reason: 'misconfigured' },
  );

  assert.deepEqual(
    authenticateMyParcelWebhook({
      headers: headersFor('status', { 'content-type': 'text/plain' }),
      requestUrl: 'https://lumorahorticulture.nl/api/webhooks/myparcel/status',
      source: 'status',
      apiKey: API_KEY,
    }),
    { ok: false, reason: 'unsupported_media_type' },
  );
});

test('parses status hooks strictly and removes duplicate shipment events', () => {
  const event = {
    shipment_id: 25482412,
    account_id: 7003,
    shop_id: 1897,
    status: 3,
    barcode: '3SMYPA749883621',
    shipment_reference_identifier: 'LH-1001',
  };
  const events = parseMyParcelWebhookEvents(
    'status',
    JSON.stringify({ data: { hooks: [event, event] } }),
  );

  assert.deepEqual(events, [{ shipmentId: '25482412', statusCode: 3 }]);
});

test('rejects unknown statuses, non-integer ids and oversized bodies', () => {
  const invalidBodies = [
    { data: { hooks: [{ shipment_id: '12', account_id: 1, shop_id: 1, status: 3 }] } },
    { data: { hooks: [{ shipment_id: 12, account_id: 1, shop_id: 1, status: 999 }] } },
    { data: { hooks: [] } },
  ];

  for (const body of invalidBodies) {
    assert.throws(
      () => parseMyParcelWebhookEvents('status', JSON.stringify(body)),
      MyParcelWebhookValidationError,
    );
  }

  assert.throws(
    () => parseMyParcelWebhookEvents('status', 'x'.repeat(MAX_MYPARCEL_WEBHOOK_BODY_BYTES + 1)),
    MyParcelWebhookValidationError,
  );
});

test('only accepts label PDFs on MyParcel HTTPS URLs', () => {
  const pdf = 'https://api.myparcel.nl/pdfs/f569bc5a247fcec09d6a8cba16ff7629ca8062f3';
  assert.equal(isTrustedMyParcelPdfUrl(pdf), true);
  assert.equal(
    isTrustedMyParcelPdfUrl('https://api.myparcel.nl.attacker.example/pdfs/f569bc5a247fcec09d6a8cba16ff7629ca8062f3'),
    false,
  );

  assert.deepEqual(
    parseMyParcelWebhookEvents(
      'label',
      JSON.stringify({
        data: {
          hooks: [{ status: 'success', shipment_ids: [15001826], printer_identifier: 'p1', pdf }],
        },
      }),
    ),
    [{ shipmentId: '15001826', labelOk: true, pdfUrl: pdf }],
  );

  assert.throws(
    () =>
      parseMyParcelWebhookEvents(
        'label',
        JSON.stringify({
          data: {
            hooks: [
              {
                status: 'success',
                shipment_ids: [15001826],
                pdf: 'https://attacker.example/label.pdf',
              },
            ],
          },
        }),
      ),
    MyParcelWebhookValidationError,
  );
});
