import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { calculateCartItemTotal } from './cart-pricing';
import {
  calculatePaperbusPromotion,
  PAPERBUS_PROMO_PRICE,
  PAPERBUS_PROMO_QUANTITY,
} from './paperbus-promo';

describe('Stekpluggen 3 voor 180 promotion', () => {
  it('prices three boxes of either eligible size at 180 euro', () => {
    for (const [slug, price] of [
      ['paper-plug-tray-84', 84],
      ['paper-plug-tray-104', 80],
    ] as const) {
      const result = calculatePaperbusPromotion(slug, price, PAPERBUS_PROMO_QUANTITY);
      assert.equal(result.eligible, true);
      assert.equal(result.total, PAPERBUS_PROMO_PRICE);
      assert.equal(calculateCartItemTotal(slug, price, 3), 180);
    }
  });

  it('keeps one or two boxes at the regular price', () => {
    assert.equal(calculateCartItemTotal('paper-plug-tray-84', 84, 1), 84);
    assert.equal(calculateCartItemTotal('paper-plug-tray-84', 84, 2), 168);
  });

  it('repeats the bundle for each complete group of three', () => {
    assert.equal(calculateCartItemTotal('paper-plug-tray-84', 84, 4), 264);
    assert.equal(calculateCartItemTotal('paper-plug-tray-104', 80, 6), 360);
  });

  it('does not apply to unrelated products', () => {
    assert.equal(calculateCartItemTotal('transportdoos-vouwdoos', 62.5, 3), 187.5);
  });
});

