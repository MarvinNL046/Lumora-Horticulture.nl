import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { convex, convexServerAuth } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { createPayment } from '@/lib/mollie';
import { centsToEuroAmount } from '@/lib/money';
import {
  InvalidRequestBodyError,
  readLimitedJson,
  RequestBodyTooLargeError,
} from '@/lib/limited-json';
import { calculateDiscountedPrice } from '@/lib/volume-discount';
import { stackServerApp } from '@/stack/server';
import { isHiddenProductSlug } from '@/lib/hidden-products';
import {
  NEEMX_PROMO_COOKIE_NAME,
  NEEMX_PROMO_CODE,
  isPromoCookieActive,
  calculateNeemxPromoDiscount,
} from '@/lib/neemx-promo';
import { getCanonicalBaseUrl } from '@/lib/canonical-base-url';

export const dynamic = 'force-dynamic';

const MAX_CHECKOUT_BODY_BYTES = 64_000;
const MAX_CHECKOUT_ITEMS = 20;

type CheckoutAddress = {
  street: string;
  city: string;
  postal_code: string;
  country: 'NL' | 'BE' | 'DE';
};

function normaliseAddress(value: unknown): CheckoutAddress | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const address = value as Record<string, unknown>;
  const street = typeof address.street === 'string' ? address.street.trim() : '';
  const city = typeof address.city === 'string' ? address.city.trim() : '';
  const postalCodeValue = address.postal_code ?? address.postalCode;
  const postalCode = typeof postalCodeValue === 'string' ? postalCodeValue.trim() : '';
  const country = typeof address.country === 'string' ? address.country.toUpperCase() : '';

  if (
    street.length < 2 ||
    street.length > 200 ||
    city.length < 2 ||
    city.length > 100 ||
    postalCode.length < 3 ||
    postalCode.length > 20 ||
    (country !== 'NL' && country !== 'BE' && country !== 'DE')
  ) {
    return null;
  }

  return { street, city, postal_code: postalCode, country };
}

function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * POST /api/checkout
 * Maak een nieuwe bestelling en start Mollie betaling
 */
export async function POST(request: NextRequest) {
  try {
    // The public endpoint creates durable orders and provider payments. Keep
    // it fail-closed until a distributed rate limit/bot rule is active.
    if (process.env.CHECKOUT_ENABLED !== 'true') {
      return NextResponse.json(
        { success: false, error: 'Checkout is temporarily unavailable' },
        {
          status: 503,
          headers: { 'Cache-Control': 'no-store, max-age=0', 'Retry-After': '60' },
        },
      );
    }

    const mediaType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
    if (mediaType !== 'application/json') {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 415 });
    }

    // Validate redirects/webhook origin before creating an order or reserving
    // a payment. Production must never fall back to localhost.
    const baseUrl = getCanonicalBaseUrl();

    const body = await readLimitedJson(request, MAX_CHECKOUT_BODY_BYTES) as Record<string, unknown>;
    const customer_email =
      typeof body.customer_email === 'string' ? body.customer_email.trim().toLowerCase() : '';
    const customer_name =
      typeof body.customer_name === 'string' ? body.customer_name.trim() : '';
    const customer_phone =
      typeof body.customer_phone === 'string' && body.customer_phone.trim()
        ? body.customer_phone.trim()
        : undefined;
    const shipping_address = normaliseAddress(body.shipping_address);
    const billing_address = body.billing_address == null
      ? null
      : normaliseAddress(body.billing_address);
    const items = body.items;
    const locale = body.locale === 'en' || body.locale === 'de' ? body.locale : 'nl';
    const delivery_preference = body.delivery_preference;
    const checkoutRequestKey =
      typeof body.checkout_request_key === 'string' ? body.checkout_request_key : '';

    // Validatie
    if (
      !isValidEmail(customer_email) ||
      customer_name.length < 2 ||
      customer_name.length > 100 ||
      (customer_phone != null && customer_phone.length > 40) ||
      !shipping_address ||
      (body.billing_address != null && !billing_address) ||
      !/^[A-Za-z0-9_-]{32,128}$/.test(checkoutRequestKey) ||
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > MAX_CHECKOUT_ITEMS
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Reject malformed rows and merge duplicate products before pricing. This
    // keeps discounts, order lines and the idempotency payload canonical.
    const quantities = new Map<string, number>();
    for (const item of items as Array<{ product_id?: unknown; quantity?: unknown }>) {
      if (
        typeof item?.product_id !== 'string' ||
        item.product_id.length === 0 ||
        item.product_id.length > 128 ||
        !/^[a-z0-9]+$/i.test(item.product_id) ||
        typeof item.quantity !== 'number' ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 100
      ) {
        return NextResponse.json(
          { success: false, error: 'Invalid cart', code: 'INVALID_CART' },
          { status: 400 },
        );
      }

      const combinedQuantity = (quantities.get(item.product_id) ?? 0) + item.quantity;
      if (combinedQuantity > 100) {
        return NextResponse.json(
          { success: false, error: 'Invalid cart', code: 'INVALID_CART' },
          { status: 400 },
        );
      }
      quantities.set(item.product_id, combinedQuantity);
    }
    const validItems = Array.from(quantities, ([product_id, quantity]) => ({
      product_id,
      quantity,
    }));

    // Check if user is logged in (optional - guest checkout blijft mogelijk)
    let userId: string | undefined = undefined;
    try {
      const user = await stackServerApp.getUser();
      if (user) {
        userId = user.id;
      }
    } catch (error) {
      // User is not logged in - continue with guest checkout
      console.log('Guest checkout - no user logged in');
    }

    // Bereken totaal bedrag met staffelkorting
    let totalAmountCents = 0;
    const productDetails = [];

    for (const item of validItems) {
      const product = await convex.query(api.products.getById, {
        id: item.product_id as Id<"products">,
      });

      if (!product || isHiddenProductSlug(product.slug)) {
        return NextResponse.json(
          {
            success: false,
            error: `Product ${item.product_id} not available`,
          },
          { status: 404 }
        );
      }

      const basePrice = product.price;
      const quantity = item.quantity;

      // Bereken korting op basis van aantal
      const discountedPrice = calculateDiscountedPrice(basePrice, quantity);
      const unitPriceCents = Math.round(discountedPrice * 100);
      const itemTotalCents = unitPriceCents * quantity;

      totalAmountCents += itemTotalCents;
      productDetails.push({
        product_id: item.product_id as Id<"products">,
        quantity: quantity,
        price: unitPriceCents / 100, // Prijs PER STUK na korting
        unitPriceCents,
        basePrice: basePrice, // Originele prijs
        name: product.name,
        slug: product.slug,
      });
    }

    // ─── 2+1 GRATIS promo (FB landing) ─────────────────────────────────
    // Only applied when the hidden cookie is set AND the cart contains
    // ≥3 NEEMX items. Discount = price of the cheapest individual bottle.
    let promoMetadata: { promoCode: string; promoDiscount: number; freeItemSlug: string } | null = null;
    let promoDiscountCents = 0;
    const promoCookie = cookies().get(NEEMX_PROMO_COOKIE_NAME)?.value;
    if (isPromoCookieActive(promoCookie)) {
      const promo = calculateNeemxPromoDiscount(
        productDetails.map((p) => ({
          slug: p.slug,
          unitPrice: p.basePrice,
          quantity: p.quantity,
        }))
      );
      if (promo.eligible && promo.freeItemSlug) {
        promoDiscountCents = Math.round(promo.discount * 100);
        totalAmountCents = Math.max(0, totalAmountCents - promoDiscountCents);
        promoMetadata = {
          promoCode: NEEMX_PROMO_CODE,
          promoDiscount: promoDiscountCents / 100,
          freeItemSlug: promo.freeItemSlug,
        };
        console.log(`✅ NEEMX 2+1 promo applied: -€${promo.discount.toFixed(2)} (${promo.freeItemSlug})`);
      }
    }

    // Order nummer wordt pas toegewezen na succesvolle betaling (in webhook)
    // Dit voorkomt dat verlaten betalingen order nummers 'verbruiken'

    // The order and all order items are created atomically. Replaying the same
    // client-owned request key returns that exact order instead of creating a
    // second order and Mollie payment.
    const checkoutOrder = await convex.mutation(api.orders.createCheckoutIdempotent, {
      ...convexServerAuth(),
      request_key: checkoutRequestKey,
      order: {
        user_id: userId,
        customer_email,
        customer_name,
        customer_phone,
        shipping_address,
        billing_address: billing_address ?? shipping_address,
        total_amount_cents: totalAmountCents,
        discount_cents: promoDiscountCents,
        locale,
        delivery_preference: delivery_preference ?? undefined,
        metadata: promoMetadata ?? undefined,
      },
      items: productDetails.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price_cents: item.unitPriceCents,
      })),
    });
    const orderId = checkoutOrder.order_id;
    const persistedOrder = await convex.query(api.orders.getById, {
      ...convexServerAuth(),
      id: orderId,
    });
    if (!persistedOrder) throw new Error('Checkout order could not be loaded');

    // Reserve an immutable payment attempt before calling Mollie. Every
    // provider payment remains addressable, including late webhooks after a
    // later retry has become the order's current payment.
    const attempt = await convex.mutation(api.paymentAttempts.reserveAttempt, {
      ...convexServerAuth(),
      order_id: orderId,
      kind: 'checkout',
      request_key: `checkout:${orderId}`,
    });

    if (attempt.kind !== 'reserved' && attempt.kind !== 'reusable') {
      return NextResponse.json(
        { success: false, error: 'Payment is already being prepared' },
        { status: attempt.kind === 'already_paid' ? 409 : 503 }
      );
    }

    if (attempt.kind === 'reusable') {
      return NextResponse.json({
        success: true,
        order_id: orderId,
        payment_url: attempt.checkout_url,
        total_amount: persistedOrder.total_amount,
      }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
    }

    const safeLocale = locale === 'en' || locale === 'de' ? locale : 'nl';
    const localePrefix = safeLocale === 'nl' ? '' : `/${safeLocale}`;
    let paymentUrl: string;

    try {
      const payment = await createPayment({
        amount: centsToEuroAmount(attempt.amount_cents),
        description: `Bestelling ${orderId}`,
        redirectUrl: `${baseUrl}${localePrefix}/checkout/conversion?order_id=${encodeURIComponent(orderId)}`,
        webhookUrl: `${baseUrl}/api/webhooks/mollie`,
        metadata: {
          order_id: orderId,
          payment_attempt_id: attempt.attempt_id,
          kind: 'checkout',
        },
        idempotencyKey: `lumora-${attempt.attempt_id}`,
      });

      const checkoutUrl = payment.getCheckoutUrl();
      if (!checkoutUrl) throw new Error('Mollie returned no checkout URL');

      const attached = await convex.mutation(api.paymentAttempts.attachProviderPayment, {
        ...convexServerAuth(),
        attempt_id: attempt.attempt_id,
        provider_payment_id: payment.id,
        checkout_url: checkoutUrl,
        provider_status:
          payment.status === 'pending' || payment.status === 'authorized'
            ? payment.status
            : 'open',
      });
      paymentUrl = attached.checkout_url;
    } catch (error) {
      await convex.mutation(api.paymentAttempts.failAttemptCreation, {
        ...convexServerAuth(),
        attempt_id: attempt.attempt_id,
        reason: 'Mollie payment creation or attachment failed',
      }).catch(() => undefined);
      throw error;
    }

    // Mark abandoned cart(s) as recovered for this email
    try {
      await convex.mutation(api.abandonedCarts.markRecoveredByEmail, {
        ...convexServerAuth(),
        customer_email: persistedOrder.customer_email,
        recovery_order_id: orderId,
      });
      console.log(`Abandoned cart recovery linked to order ${orderId}`);
    } catch (error) {
      console.error(`Failed to link abandoned cart recovery for order ${orderId}`);
      // Don't fail the checkout if this fails
    }

    // Emails worden verzonden via de Mollie webhook na succesvolle betaling

    return NextResponse.json({
      success: true,
      order_id: orderId,
      payment_url: paymentUrl,
      total_amount: persistedOrder.total_amount,
    }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 });
    }
    if (error instanceof InvalidRequestBodyError) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
    console.error('Checkout request failed');
    return NextResponse.json(
      {
        success: false,
        error: 'Checkout failed',
      },
      { status: 500 }
    );
  }
}
