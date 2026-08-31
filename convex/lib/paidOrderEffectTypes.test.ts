import assert from 'node:assert/strict';
import test from 'node:test';
import { PAID_ORDER_EFFECT_TYPES } from './paidOrderEffectTypes';

test('paid orders queue only effects with a real delivery implementation', () => {
  assert.deepEqual(PAID_ORDER_EFFECT_TYPES, [
    'customer_confirmation',
    'admin_notification',
    'recovery_notification',
    'myparcel_shipment',
    'meta_purchase',
  ]);
  assert.equal(
    (PAID_ORDER_EFFECT_TYPES as readonly string[]).includes('google_purchase'),
    false,
  );
});
