import { randomUUID } from 'node:crypto';
import React from 'react';
import { render } from '@react-email/components';
import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/../convex/_generated/api';
import type { Doc, Id } from '@/../convex/_generated/dataModel';
import { AdminNotificationEmail } from '@/emails/AdminNotification';
import { OrderConfirmationEmail } from '@/emails/OrderConfirmation';
import { RecoverySuccessNotification } from '@/emails/RecoverySuccessNotification';
import { convex, convexServerAuth } from '@/lib/convex';
import { sendCapiEvent } from '@/lib/meta-capi';
import { getPaymentStatus } from '@/lib/mollie';
import {
  MollieWebhookRequestError,
  isMollieStatus,
  parseMollieAmountCents,
  readMolliePaymentMetadata,
  readMollieWebhookPaymentId,
  type MollieStatus,
} from '@/lib/mollie-webhook-security';
import {
  createShipment,
  findShipmentByReference,
  getShipment,
  getTrackTrace,
  splitStreetNumber,
  trackingUrl,
  trackingUrlFromTrackTrace,
  type CreateShipmentInput,
  type MyParcelCarrier,
} from '@/lib/myparcel';
import {
  EMAIL_FROM,
  EMAIL_NOTIFICATION_TO,
  EMAIL_REPLY_TO,
  assertResendConfigured,
  resend,
} from '@/lib/resend';
import { consumeDistributedRateLimit } from '@/lib/distributed-rate-limit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

const EFFECT_LEASE_MS = 10 * 60 * 1_000;
const WEBHOOK_RATE_LIMIT = 600;
const WEBHOOK_RATE_WINDOW_MS = 10 * 60 * 1_000;
const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  Pragma: 'no-cache',
};

type EffectType =
  | 'customer_confirmation'
  | 'admin_notification'
  | 'recovery_notification'
  | 'myparcel_shipment'
  | 'meta_purchase';
type OrderItemWithProduct = {
  order_item: Doc<'orderItems'>;
  product: Doc<'products'> | null;
};
type EffectContext = {
  order: Doc<'orders'>;
  items: OrderItemWithProduct[];
};
type EffectOutcome = {
  kind: 'succeeded' | 'already_succeeded' | 'busy' | 'failed';
  retryable?: boolean;
};

class PermanentEffectError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermanentEffectError';
  }
}

function json(body: Record<string, unknown>, status = 200): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: NO_STORE_HEADERS,
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function stringField(
  record: Record<string, unknown>,
  ...keys: string[]
): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }
  return '';
}

function providerObservedAt(payment: { paidAt?: string | null }, status: MollieStatus): number {
  if (status === 'paid' && typeof payment.paidAt === 'string') {
    const paidAt = Date.parse(payment.paidAt);
    if (Number.isFinite(paidAt) && paidAt > 0) return paidAt;
  }
  return Date.now();
}

function formatDutchDate(timestamp: number, includeTime = false): string {
  return new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(includeTime
      ? ({ hour: '2-digit', minute: '2-digit' } as const)
      : {}),
    timeZone: 'Europe/Amsterdam',
  }).format(new Date(timestamp));
}

function normalizeAddress(value: unknown): {
  street: string;
  postalCode: string;
  city: string;
  country: string;
} {
  const address = isRecord(value) ? value : {};
  return {
    street: stringField(address, 'street'),
    postalCode: stringField(address, 'postalCode', 'postal_code'),
    city: stringField(address, 'city'),
    country: stringField(address, 'country') || 'Nederland',
  };
}

function productDetails(items: OrderItemWithProduct[]) {
  return items.map(({ order_item: item, product }) => ({
    name: product?.name || `Product ${item.product_id}`,
    quantity: item.quantity,
    price: item.price_at_purchase,
    total: item.quantity * item.price_at_purchase,
  }));
}

function priceSummary(order: Doc<'orders'>, items: OrderItemWithProduct[]) {
  const subtotalCents = items.reduce(
    (sum, { order_item: item }) =>
      sum + Math.round(item.price_at_purchase * 100) * item.quantity,
    0,
  );
  const totalCents = Math.round(order.total_amount * 100);
  return {
    subtotal: subtotalCents / 100,
    discount: Math.max(0, subtotalCents - totalCents) / 100,
    totalAmount: totalCents / 100,
  };
}

const PERMANENT_RESEND_ERRORS = new Set([
  'invalid_idempotency_key',
  'validation_error',
  'invalid_attachment',
  'invalid_parameter',
  'missing_required_field',
]);

function throwResendError(error: {
  name: string;
  message: string;
  statusCode: number | null;
}): never {
  const message = `Resend ${error.name} (${error.statusCode ?? 'unknown'}): ${error.message}`;
  if (PERMANENT_RESEND_ERRORS.has(error.name)) {
    throw new PermanentEffectError(message);
  }
  throw new Error(message);
}

function effectIdempotencyKey(type: EffectType, effectId: Id<'orderEffects'>): string {
  return `lumora-${type}-${effectId}`;
}

async function sendCustomerConfirmation(
  context: EffectContext,
  effectId: Id<'orderEffects'>,
): Promise<string> {
  assertResendConfigured();
  const { order, items } = context;
  const details = productDetails(items);
  const summary = priceSummary(order, items);
  const orderNumber = order.order_number || String(order._id);
  const html = await render(
    React.createElement(OrderConfirmationEmail, {
      orderNumber,
      customerName: order.customer_name || '',
      orderDate: formatDutchDate(order.paid_at ?? order.updated_at),
      items: details,
      ...summary,
      shippingAddress: normalizeAddress(order.shipping_address),
    }),
  );
  const response = await resend.emails.send(
    {
      from: EMAIL_FROM,
      replyTo: EMAIL_REPLY_TO,
      to: order.customer_email,
      subject: `Bevestiging bestelling ${orderNumber} - Lumora Horticulture`,
      html,
    },
    { idempotencyKey: effectIdempotencyKey('customer_confirmation', effectId) },
  );
  if (response.error) throwResendError(response.error);
  return response.data.id;
}

function normalizeDeliveryPreference(
  value: unknown,
  country: 'NL' | 'BE' | 'DE',
): CreateShipmentInput['delivery'] {
  const preference = isRecord(value) ? value : {};
  const kind = preference.kind === 'pickup' ? 'pickup' : 'home';
  const carrier = carrierFromPreference(preference);
  const rawTimeType = preference.time_type ?? preference.timeType;
  const timeType =
    rawTimeType === 1 || rawTimeType === 2 || rawTimeType === 3
      ? rawTimeType
      : 2;
  const date = stringField(preference, 'date');

  if (kind !== 'pickup') {
    return { kind, carrier, date, timeType };
  }

  const rawPickup = preference.pickup;
  if (!isRecord(rawPickup)) {
    throw new PermanentEffectError('Pickup delivery is missing its location');
  }
  const pickup = {
    locationName: stringField(rawPickup, 'locationName', 'location_name'),
    locationCode: stringField(rawPickup, 'locationCode', 'location_code'),
    street: stringField(rawPickup, 'street'),
    number: stringField(rawPickup, 'number'),
    postalCode: stringField(rawPickup, 'postalCode', 'postal_code'),
    city: stringField(rawPickup, 'city'),
    retailNetworkId:
      stringField(rawPickup, 'retailNetworkId', 'retail_network_id') || undefined,
  };
  if (
    !pickup.locationName ||
    !pickup.street ||
    !pickup.number ||
    !pickup.postalCode ||
    !pickup.city ||
    (country === 'BE' && !pickup.locationCode)
  ) {
    throw new PermanentEffectError('Pickup delivery contains incomplete location data');
  }

  return { kind, carrier, date, timeType, pickup };
}

function carrierFromPreference(value: unknown): MyParcelCarrier {
  const preference = isRecord(value) ? value : {};
  const carrier = stringField(preference, 'carrier').toLowerCase();
  return (
    ['postnl', 'dpd', 'dhl', 'dhlforyou', 'ups'] as const
  ).includes(carrier as MyParcelCarrier)
    ? (carrier as MyParcelCarrier)
    : 'postnl';
}

function countryCode(value: string): 'NL' | 'BE' | 'DE' {
  const country = value.trim().toUpperCase();
  if (country === 'BE' || country.startsWith('BEL')) return 'BE';
  if (country === 'DE' || country.startsWith('DUIT') || country.startsWith('GER')) {
    return 'DE';
  }
  return 'NL';
}

function deliveryPreferenceForEmail(value: unknown) {
  if (!isRecord(value)) return null;
  const kind: 'pickup' | 'home' = value.kind === 'pickup' ? 'pickup' : 'home';
  const pickupValue = isRecord(value.pickup) ? value.pickup : null;
  return {
    kind,
    carrier: stringField(value, 'carrier') || 'postnl',
    date: stringField(value, 'date') || null,
    timeStart: stringField(value, 'timeStart', 'time_start') || null,
    timeEnd: stringField(value, 'timeEnd', 'time_end') || null,
    label: stringField(value, 'label'),
    pickup: pickupValue
      ? {
          locationName: stringField(pickupValue, 'locationName', 'location_name'),
          street: stringField(pickupValue, 'street'),
          number: stringField(pickupValue, 'number'),
          postalCode: stringField(pickupValue, 'postalCode', 'postal_code'),
          city: stringField(pickupValue, 'city'),
        }
      : null,
  };
}

async function sendAdminNotification(
  context: EffectContext,
  effectId: Id<'orderEffects'>,
): Promise<string> {
  assertResendConfigured();
  const { order, items } = context;
  const summary = priceSummary(order, items);
  const shippingAddress = normalizeAddress(order.shipping_address);
  const billingAddress = normalizeAddress(order.billing_address);
  const orderNumber = order.order_number || String(order._id);
  const html = await render(
    React.createElement(AdminNotificationEmail, {
      orderNumber,
      orderDate: formatDutchDate(order.paid_at ?? order.updated_at),
      customerName: order.customer_name || '',
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone || 'Niet opgegeven',
      items: productDetails(items),
      ...summary,
      shippingAddress,
      billingAddress:
        billingAddress.street && billingAddress.street !== shippingAddress.street
          ? billingAddress
          : undefined,
      paymentId: order.payment_id,
      deliveryPreference: deliveryPreferenceForEmail(order.delivery_preference),
    }),
  );
  const response = await resend.emails.send(
    {
      from: EMAIL_FROM,
      replyTo: EMAIL_REPLY_TO,
      to: EMAIL_NOTIFICATION_TO,
      subject: `🔔 Nieuwe bestelling ${orderNumber} - €${summary.totalAmount.toFixed(2)}`,
      html,
    },
    { idempotencyKey: effectIdempotencyKey('admin_notification', effectId) },
  );
  if (response.error) throwResendError(response.error);
  return response.data.id;
}

async function sendRecoveryNotification(
  context: EffectContext,
  effectId: Id<'orderEffects'>,
): Promise<string> {
  const { order } = context;
  const recoveryAttempts = order.recovery_attempts ?? 0;
  if (recoveryAttempts < 1) return 'not-applicable';
  assertResendConfigured();

  const orderNumber = order.order_number || String(order._id);
  const html = await render(
    React.createElement(RecoverySuccessNotification, {
      orderNumber,
      orderId: String(order._id),
      customerName: order.customer_name || '',
      customerEmail: order.customer_email,
      totalAmount: order.total_amount,
      recoveryAttempts,
      originalCreatedAt: formatDutchDate(order.created_at, true),
      paidAt: formatDutchDate(order.paid_at ?? order.updated_at, true),
    }),
  );
  const response = await resend.emails.send(
    {
      from: EMAIL_FROM,
      replyTo: EMAIL_REPLY_TO,
      to: EMAIL_NOTIFICATION_TO,
      subject: `🎉 Recovery succesvol! ${orderNumber} - €${order.total_amount.toFixed(2)} teruggewonnen`,
      html,
    },
    { idempotencyKey: effectIdempotencyKey('recovery_notification', effectId) },
  );
  if (response.error) throwResendError(response.error);
  return response.data.id;
}

async function createOrReconcileShipment(context: EffectContext): Promise<string> {
  // Creating a shipment changes external MyParcel state. Keep fulfilment
  // fail-closed independently from checkout so a payment staging run cannot
  // accidentally register a real label.
  if (process.env.MYPARCEL_SHIPMENTS_ENABLED !== 'true') {
    throw new Error('MyParcel shipment creation is disabled');
  }

  if (!process.env.MYPARCEL_API_KEY) {
    throw new Error('MYPARCEL_API_KEY is not configured');
  }

  const { order } = context;
  const shipping = normalizeAddress(order.shipping_address);
  const cc = countryCode(shipping.country);
  const explicitNumber = isRecord(order.shipping_address)
    ? stringField(order.shipping_address, 'houseNumber', 'house_number', 'number')
    : '';
  const split = explicitNumber
    ? { street: shipping.street, number: explicitNumber, suffix: undefined }
    : splitStreetNumber(shipping.street);
  if (!split.street || !split.number || !shipping.postalCode || !shipping.city) {
    throw new PermanentEffectError('Order contains an incomplete shipping address');
  }

  const reference = order.order_number || String(order._id);
  let shipmentId = order.shipment_id || '';

  if (!shipmentId) {
    const existing = await findShipmentByReference(reference);
    if (existing) {
      shipmentId = String(existing.id);
    } else {
      const created = await createShipment({
        orderNumber: reference,
        recipient: {
          cc,
          postalCode: shipping.postalCode,
          city: shipping.city,
          street: split.street,
          number: split.number,
          numberSuffix: split.suffix,
          person: order.customer_name || order.customer_email,
          phone: order.customer_phone || undefined,
          email: order.customer_email,
        },
        delivery: normalizeDeliveryPreference(order.delivery_preference, cc),
      });
      shipmentId = String(created.id);
    }

    // Persist the identity before asking for optional barcode details. If the
    // next call fails, a retry reconciles this exact shipment instead of POSTing
    // another one.
    await convex.mutation(api.orders.update, {
      ...convexServerAuth(),
      id: order._id,
      shipment_id: shipmentId,
      shipment_status: 'created',
    });
  }

  const detail = await getShipment(shipmentId);
  if (String(detail.id) !== shipmentId) {
    throw new Error('MyParcel returned a mismatched shipment identity');
  }

  const barcode =
    typeof detail.barcode === 'string' &&
    detail.barcode.length <= 128 &&
    !/[\u0000-\u001f\u007f]/.test(detail.barcode)
      ? detail.barcode
      : undefined;
  const carrier = carrierFromPreference(order.delivery_preference);
  const trackTrace = await getTrackTrace(shipmentId);
  const providerTrackingUrl = trackTrace
    ? trackingUrlFromTrackTrace(trackTrace, carrier)
    : undefined;
  const customerTrackingUrl = providerTrackingUrl ?? (
    carrier === 'postnl' && barcode
      ? trackingUrl(
          barcode,
          shipping.postalCode,
          cc,
          order.locale === 'en' || order.locale === 'de' ? order.locale : 'nl',
        )
      : undefined
  );
  if (barcode || customerTrackingUrl) {
    await convex.mutation(api.orders.update, {
      ...convexServerAuth(),
      id: order._id,
      shipment_id: shipmentId,
      tracking_code: barcode,
      tracking_url: customerTrackingUrl,
    });
  }

  return shipmentId;
}

async function sendMetaPurchase(context: EffectContext): Promise<string> {
  if (!process.env.META_CAPI_ACCESS_TOKEN) {
    throw new Error('META_CAPI_ACCESS_TOKEN is not configured');
  }

  const { order } = context;
  const shipping = normalizeAddress(order.shipping_address);
  const [firstName, ...lastNameParts] = (order.customer_name || '').split(/\s+/);
  const eventId = `purchase_${order._id}`;
  const localePrefix = order.locale === 'en' || order.locale === 'de'
    ? `/${order.locale}`
    : '';
  await sendCapiEvent(
    {
      eventName: 'Purchase',
      eventId,
      eventTime: Math.floor((order.paid_at ?? order.updated_at) / 1_000),
      eventSourceUrl: `https://lumorahorticulture.nl${localePrefix}/checkout/conversion`,
      actionSource: 'website',
      userData: {
        email: order.customer_email,
        phone: order.customer_phone || undefined,
        firstName: firstName || undefined,
        lastName: lastNameParts.join(' ') || undefined,
        city: shipping.city || undefined,
        zip: shipping.postalCode || undefined,
        country: countryCode(shipping.country).toLowerCase(),
      },
      customData: {
        currency: 'EUR',
        value: order.total_amount,
        order_id: order.order_number || String(order._id),
        transaction_id: eventId,
      },
    },
    { throwOnError: true },
  );
  return eventId;
}

async function executeEffect(
  type: EffectType,
  context: EffectContext,
  effectId: Id<'orderEffects'>,
): Promise<string> {
  switch (type) {
    case 'customer_confirmation':
      return await sendCustomerConfirmation(context, effectId);
    case 'admin_notification':
      return await sendAdminNotification(context, effectId);
    case 'recovery_notification':
      return await sendRecoveryNotification(context, effectId);
    case 'myparcel_shipment':
      return await createOrReconcileShipment(context);
    case 'meta_purchase':
      return await sendMetaPurchase(context);
    default: {
      const exhaustive: never = type;
      throw new PermanentEffectError(`Unknown effect type: ${exhaustive}`);
    }
  }
}

function safeErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : 'Unknown effect error';
  return message.replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, 900);
}

async function processOneEffect(
  summary: {
    effect_id: Id<'orderEffects'>;
    type: EffectType;
    status: 'pending' | 'processing' | 'succeeded' | 'failed';
  },
  context: EffectContext,
): Promise<EffectOutcome> {
  if (summary.status === 'succeeded') return { kind: 'already_succeeded' };

  const claimToken = randomUUID();
  let claim;
  try {
    claim = await convex.mutation(api.orderEffects.claimEffect, {
      ...convexServerAuth(),
      effect_id: summary.effect_id,
      claim_token: claimToken,
      lease_ms: EFFECT_LEASE_MS,
    });
  } catch (error) {
    console.error(`Could not claim paid-order effect ${summary.type}:`, safeErrorMessage(error));
    return { kind: 'failed', retryable: true };
  }

  if (claim.kind === 'succeeded') return { kind: 'already_succeeded' };
  if (claim.kind === 'busy') {
    // A processing lease needs another Mollie delivery after it expires if
    // its current worker dies. A known failed row can be permanently blocked
    // by the ledger and should not create an endless webhook retry storm.
    return { kind: 'busy', retryable: summary.status !== 'failed' };
  }
  if (
    claim.effect.order_id !== context.order._id ||
    claim.effect.type !== summary.type
  ) {
    await convex.mutation(api.orderEffects.failEffect, {
      ...convexServerAuth(),
      effect_id: summary.effect_id,
      claim_token: claimToken,
      error: 'Claimed effect identity mismatch',
      retryable: false,
    }).catch(() => undefined);
    return { kind: 'failed', retryable: false };
  }

  try {
    const providerReference = await executeEffect(
      summary.type,
      context,
      summary.effect_id,
    );
    const completed = await convex.mutation(api.orderEffects.completeEffect, {
      ...convexServerAuth(),
      effect_id: summary.effect_id,
      claim_token: claimToken,
      provider_reference: providerReference,
    });
    if (!completed) {
      throw new Error('Effect completion lease was lost');
    }
    return { kind: 'succeeded' };
  } catch (error) {
    const retryable = !(error instanceof PermanentEffectError);
    const message = safeErrorMessage(error);
    console.error(`Paid-order effect ${summary.type} failed:`, message);
    await convex.mutation(api.orderEffects.failEffect, {
      ...convexServerAuth(),
      effect_id: summary.effect_id,
      claim_token: claimToken,
      error: message,
      retryable,
    }).catch((ledgerError) => {
      console.error(
        `Could not record failure for paid-order effect ${summary.type}:`,
        safeErrorMessage(ledgerError),
      );
    });
    return { kind: 'failed', retryable };
  }
}

async function processPaidOrderEffects(orderId: Id<'orders'>): Promise<EffectOutcome[]> {
  const auth = convexServerAuth();
  const effects = await convex.query(api.orderEffects.listForOrder, {
    ...auth,
    order_id: orderId,
  });
  if (effects.length === 0) return [];

  const [order, items] = await Promise.all([
    convex.query(api.orders.getById, { ...auth, id: orderId }),
    convex.query(api.orderItems.getByOrderWithProducts, {
      ...auth,
      order_id: orderId,
    }),
  ]);
  if (!order) throw new Error('Paid order disappeared before effects ran');

  const context: EffectContext = { order, items };
  // Pre-release rows may still contain google_purchase. Leave them pending and
  // unclaimed until a real Google delivery implementation exists; never record
  // a logging placeholder as a successful conversion.
  const deliverableEffects = effects.filter(
    (effect): effect is (typeof effects)[number] & { type: EffectType } =>
      effect.type !== 'google_purchase',
  );
  return await Promise.all(
    deliverableEffects.map((effect) => processOneEffect(effect, context)),
  );
}

/**
 * Mollie does not sign webhook bodies. The submitted payment id is therefore
 * only a notification hint: all trusted status, amount and metadata comes from
 * the authenticated Mollie API response below.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const rateLimit = await consumeDistributedRateLimit(
      request.headers,
      'webhook:mollie',
      WEBHOOK_RATE_LIMIT,
      WEBHOOK_RATE_WINDOW_MS,
    );
    if (rateLimit.kind === 'unavailable') {
      return NextResponse.json(
        { success: false, error: 'Webhook protection is unavailable' },
        {
          status: 503,
          headers: {
            ...NO_STORE_HEADERS,
            'Retry-After': String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }
    if (rateLimit.kind === 'limited') {
      return NextResponse.json(
        { success: false, error: 'Too many webhook requests' },
        {
          status: 429,
          headers: {
            ...NO_STORE_HEADERS,
            'Retry-After': String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    const requestedPaymentId = await readMollieWebhookPaymentId(request);
    let payment;
    try {
      payment = await getPaymentStatus(requestedPaymentId);
    } catch (error) {
      if (
        error !== null &&
        typeof error === 'object' &&
        'statusCode' in error &&
        error.statusCode === 404
      ) {
        // Unknown IDs reveal nothing and must not create a retry storm.
        return json({ success: true, ignored: true });
      }
      throw error;
    }

    if (payment.id !== requestedPaymentId) {
      throw new MollieWebhookRequestError('Provider payment identity mismatch', 409);
    }
    if (!isMollieStatus(payment.status)) {
      throw new MollieWebhookRequestError('Unsupported provider status', 409);
    }
    if (payment.amount?.currency !== 'EUR') {
      throw new MollieWebhookRequestError('Unsupported provider currency', 409);
    }

    const amountCents = parseMollieAmountCents(payment.amount.value);
    const metadata = readMolliePaymentMetadata(payment.metadata);
    const transition = await convex.mutation(api.paymentAttempts.applyMollieStatus, {
      ...convexServerAuth(),
      provider_payment_id: payment.id,
      provider_status: payment.status,
      amount_cents: amountCents,
      currency: 'EUR',
      metadata_order_id: metadata.orderId as Id<'orders'>,
      metadata_attempt_id: metadata.attemptId as Id<'paymentAttempts'> | undefined,
      observed_at: providerObservedAt(payment, payment.status),
    });

    if (transition.kind === 'rejected') {
      console.error('Rejected Mollie payment transition:', transition.reason);
      // A provider-authenticated but permanently unbindable transition cannot
      // be repaired by replaying this same notification.
      return json({ success: true, ignored: true });
    }

    // Run/resume the outbox on every recognized webhook. This makes a later
    // duplicate notification repair effects whose first external call failed.
    const outcomes = await processPaidOrderEffects(transition.order_id);
    const retryableFailures = outcomes.filter(
      (outcome) =>
        (outcome.kind === 'failed' || outcome.kind === 'busy') &&
        outcome.retryable,
    ).length;
    const permanentFailures = outcomes.filter(
      (outcome) =>
        (outcome.kind === 'failed' || outcome.kind === 'busy') &&
        !outcome.retryable,
    ).length;

    if (retryableFailures > 0) {
      return json(
        {
          success: false,
          error: 'Paid-order effects require retry',
          transition: transition.kind,
          retryable_effect_failures: retryableFailures,
        },
        500,
      );
    }

    return json({
      success: true,
      transition: transition.kind,
      payment_status: payment.status,
      effects_processed: outcomes.filter((outcome) => outcome.kind === 'succeeded').length,
      permanent_effect_failures: permanentFailures,
    });
  } catch (error) {
    if (error instanceof MollieWebhookRequestError) {
      return json({ success: false, error: error.message }, error.status);
    }
    console.error('Mollie webhook processing failed:', safeErrorMessage(error));
    return json({ success: false, error: 'Webhook processing failed' }, 500);
  }
}
