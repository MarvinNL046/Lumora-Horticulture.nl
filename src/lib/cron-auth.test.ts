import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { isAuthorizedCronRequest } from './cron-auth';

const original = process.env.CRON_SECRET;

afterEach(() => {
  if (original === undefined) delete process.env.CRON_SECRET;
  else process.env.CRON_SECRET = original;
});

describe('cron authorization', () => {
  it('accepts only the exact bearer secret', () => {
    process.env.CRON_SECRET = 'cron-secret-with-at-least-thirty-two-characters';
    assert.equal(
      isAuthorizedCronRequest(`Bearer ${process.env.CRON_SECRET}`),
      true,
    );
    assert.equal(isAuthorizedCronRequest('Bearer wrong'), false);
  });

  it('fails closed when configuration is missing or weak', () => {
    delete process.env.CRON_SECRET;
    assert.equal(isAuthorizedCronRequest('Bearer undefined'), false);
    process.env.CRON_SECRET = 'too-short';
    assert.equal(isAuthorizedCronRequest('Bearer too-short'), false);
  });
});
