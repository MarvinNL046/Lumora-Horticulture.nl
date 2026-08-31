import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  InvalidRequestBodyError,
  readLimitedJson,
  RequestBodyTooLargeError,
} from './limited-json';

describe('limited JSON reader', () => {
  it('parses a body within the byte limit', async () => {
    const request = new Request('https://example.test', {
      method: 'POST',
      body: JSON.stringify({ ok: true }),
    });
    assert.deepEqual(await readLimitedJson(request, 100), { ok: true });
  });

  it('rejects declared and streamed oversized bodies', async () => {
    const declared = new Request('https://example.test', {
      method: 'POST',
      headers: { 'content-length': '101' },
      body: '{}',
    });
    await assert.rejects(readLimitedJson(declared, 100), RequestBodyTooLargeError);

    const streamed = new Request('https://example.test', {
      method: 'POST',
      body: JSON.stringify({ value: 'x'.repeat(100) }),
    });
    await assert.rejects(readLimitedJson(streamed, 50), RequestBodyTooLargeError);
  });

  it('rejects malformed JSON', async () => {
    const request = new Request('https://example.test', { method: 'POST', body: '{' });
    await assert.rejects(readLimitedJson(request, 100), InvalidRequestBodyError);
  });
});
