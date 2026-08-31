/** External effects that currently have a real, verifiable delivery path. */
export const PAID_ORDER_EFFECT_TYPES = [
  'customer_confirmation',
  'admin_notification',
  'recovery_notification',
  'myparcel_shipment',
  'meta_purchase',
] as const;

export type PaidOrderEffectType = (typeof PAID_ORDER_EFFECT_TYPES)[number];
