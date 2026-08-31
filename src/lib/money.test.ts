import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { centsToEuroAmount, parseEuroAmountToCents } from './money';

describe('money helpers', () => {
  it('parses Mollie EUR amounts without floating-point comparison', () => {
    assert.equal(parseEuroAmountToCents('0.01'), 1);
    assert.equal(parseEuroAmountToCents('84.00'), 8400);
    assert.equal(parseEuroAmountToCents('1234.56'), 123456);
  });

  it('rejects malformed, zero, negative and over-precise amounts', () => {
    for (const value of ['0.00', '-1.00', '1', '1.0', '1.001', '01.00', 'NaN', 1.23]) {
      assert.equal(parseEuroAmountToCents(value), null);
    }
  });

  it('converts validated cents for provider calls', () => {
    assert.equal(centsToEuroAmount(8400), 84);
    assert.throws(() => centsToEuroAmount(0));
    assert.throws(() => centsToEuroAmount(1.5));
  });
});
