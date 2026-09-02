import assert from 'node:assert/strict';
import test from 'node:test';
import {
  InvalidCanonicalBaseUrlError,
  parseCanonicalBaseUrl,
  parseTrustedVercelPreviewBaseUrl,
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

test('accepts only this project\'s clean Vercel Preview host', () => {
  assert.equal(
    parseTrustedVercelPreviewBaseUrl(
      'lumorahorticulture-l2q5nl9f4-marvinnl046s-projects.vercel.app',
    ),
    'https://lumorahorticulture-l2q5nl9f4-marvinnl046s-projects.vercel.app',
  );

  for (const candidate of [
    undefined,
    '',
    'https://lumorahorticulture-l2q5nl9f4-marvinnl046s-projects.vercel.app',
    'lumorahorticulture-l2q5nl9f4-elsewhere.vercel.app',
    'evil-lumorahorticulture-l2q5nl9f4-marvinnl046s-projects.vercel.app',
    'lumorahorticulture-l2q5nl9f4-marvinnl046s-projects.vercel.app.evil.example',
  ]) {
    assert.throws(
      () => parseTrustedVercelPreviewBaseUrl(candidate),
      InvalidCanonicalBaseUrlError,
    );
  }
});
