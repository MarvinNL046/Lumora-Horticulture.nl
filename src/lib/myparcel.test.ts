import assert from 'node:assert/strict';
import test from 'node:test';
import {
  carrierIdForShipment,
  findShipmentByReference,
  getTrackTrace,
  trackingUrlFromTrackTrace,
} from './myparcel';

test('maps storefront carriers to current MyParcel carrier IDs', () => {
  assert.equal(carrierIdForShipment('postnl', 'NL'), 1);
  assert.equal(carrierIdForShipment('dpd', 'NL'), 4);
  assert.equal(carrierIdForShipment('dhlforyou', 'NL'), 9);
  assert.equal(carrierIdForShipment('dhl', 'NL'), 9);
  assert.equal(carrierIdForShipment('dhl', 'BE'), 10);
  assert.equal(carrierIdForShipment('dhl', 'DE'), 10);
  assert.equal(carrierIdForShipment('ups', 'DE'), 12);
});

test('reconciles shipments from both supported MyParcel list response shapes', async () => {
  const originalFetch = globalThis.fetch;
  const originalApiKey = process.env.MYPARCEL_API_KEY;
  const requestedUrls: string[] = [];
  const responses = [
    {
      data: {
        search_results: {
          shipments: [
            { id: 40, reference_identifier: 'ORD-OTHER' },
            { id: 41, reference_identifier: 'ORD-2026-0041' },
          ],
        },
      },
    },
    {
      data: {
        shipments: [{ id: 42, reference_identifier: 'ORD-2026-0042' }],
      },
    },
  ];

  process.env.MYPARCEL_API_KEY = 'test-api-key';
  globalThis.fetch = (async (input: string | URL | Request) => {
    requestedUrls.push(String(input));
    const body = responses.shift();
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }) as typeof fetch;

  try {
    assert.equal((await findShipmentByReference('ORD-2026-0041'))?.id, 41);
    assert.equal((await findShipmentByReference('ORD-2026-0042'))?.id, 42);
    assert.match(requestedUrls[0], /reference_identifier=ORD-2026-0041/);
    assert.match(requestedUrls[1], /reference_identifier=ORD-2026-0042/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalApiKey === undefined) delete process.env.MYPARCEL_API_KEY;
    else process.env.MYPARCEL_API_KEY = originalApiKey;
  }
});

test('selects only HTTPS MyParcel or matching-carrier tracking links', () => {
  assert.equal(
    trackingUrlFromTrackTrace(
      {
        shipment_id: 41,
        link_consumer_portal: 'https://shop.myparcel.me/track-trace/ABC',
        link_tracktrace: 'https://tracking.dpd.de/status/parcel/ABC',
      },
      'dpd',
    ),
    'https://shop.myparcel.me/track-trace/ABC',
  );
  assert.equal(
    trackingUrlFromTrackTrace(
      {
        shipment_id: 41,
        link_consumer_portal: 'https://dpd.com.evil.example/steal',
        link_tracktrace: 'https://tracking.dpd.de/status/parcel/ABC',
      },
      'dpd',
    ),
    'https://tracking.dpd.de/status/parcel/ABC',
  );
  assert.equal(
    trackingUrlFromTrackTrace(
      { shipment_id: 41, link_tracktrace: 'https://www.ups.com/track/ABC' },
      'dpd',
    ),
    undefined,
  );
  for (const unsafe of [
    'http://shop.myparcel.me/track/ABC',
    'https://attacker@shop.myparcel.me/track/ABC',
    'https://shop.myparcel.me:8443/track/ABC',
  ]) {
    assert.equal(
      trackingUrlFromTrackTrace(
        { shipment_id: 41, link_consumer_portal: unsafe },
        'postnl',
      ),
      undefined,
    );
  }
});

test('fetches tracktrace data and rejects a mismatched shipment identity', async () => {
  const originalFetch = globalThis.fetch;
  const originalApiKey = process.env.MYPARCEL_API_KEY;
  const requestedUrls: string[] = [];
  const responses = [
    {
      data: {
        tracktraces: [
          {
            shipment_id: 41,
            link_consumer_portal: 'https://shop.myparcel.me/track/ABC',
          },
        ],
      },
    },
    {
      data: {
        tracktraces: [{ shipment_id: 999, link_tracktrace: 'https://postnl.nl/track' }],
      },
    },
  ];

  process.env.MYPARCEL_API_KEY = 'test-api-key';
  globalThis.fetch = (async (input: string | URL | Request) => {
    requestedUrls.push(String(input));
    const body = responses.shift();
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }) as typeof fetch;

  try {
    assert.equal((await getTrackTrace(41))?.shipment_id, 41);
    assert.match(requestedUrls[0], /\/tracktraces\/41$/);
    await assert.rejects(getTrackTrace(42), /identity mismatch/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalApiKey === undefined) delete process.env.MYPARCEL_API_KEY;
    else process.env.MYPARCEL_API_KEY = originalApiKey;
  }
});
