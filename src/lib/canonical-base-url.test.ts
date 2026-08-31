import assert from 'node:assert/strict';
import test from 'node:test';
import {
  InvalidCanonicalBaseUrlError,
  parseCanonicalBaseUrl,
} from './canonical-base-url';

test('accepts a trusted clean HTTPS origin', () => {
  assert.equal(
    parseCanonicalBaseUrl('https://lumorahorticulture.nl'),
    'https://lumorahorticulture.nl',
  );
});

test('rejects missing, third-party and non-HTTPS production origins', () => {
  for (const candidate of [
    undefined,
    '',
    'http://lumorahorticulture.nl',
    'https://www.lumorahorticulture.nl',
    'https://lumorahorticulture.com',
    'https://lumorahorticulture.de',
    'https://evil.example',
    'https://lumorahorticulture.nl/path',
    'https://user:pass@lumorahorticulture.nl',
  ]) {
    assert.throws(
      () => parseCanonicalBaseUrl(candidate),
      InvalidCanonicalBaseUrlError,
    );
  }
});

test('allows localhost only when explicitly requested', () => {
  assert.throws(() => parseCanonicalBaseUrl('http://localhost:3000'));
  assert.equal(
    parseCanonicalBaseUrl('http://localhost:3000', { allowLocalhost: true }),
    'http://localhost:3000',
  );
});
