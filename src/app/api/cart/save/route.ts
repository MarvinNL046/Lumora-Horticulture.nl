import { NextRequest, NextResponse } from 'next/server';
import { convex, convexServerAuth } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import type { Id } from '@/../convex/_generated/dataModel';
import { stackServerApp } from '@/stack/server';
import { isHiddenProductSlug } from '@/lib/hidden-products';
import { calculateTotalPrice } from '@/lib/volume-discount';
import {
  InvalidRequestBodyError,
  readLimitedJson,
  RequestBodyTooLargeError,
} from '@/lib/limited-json';
import { consumeDistributedRateLimit } from '@/lib/distributed-rate-limit';

export const dynamic = 'force-dynamic';

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_SAVES_PER_WINDOW = 8;
const MAX_BODY_BYTES = 50_000;

function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * POST /api/cart/save
 * Save or update abandoned cart data
 */
export async function POST(request: NextRequest) {
  try {
    // Guest carts are keyed by an unverified email in the legacy data model.
    // Disable capture by default so attackers cannot overwrite another
    // person's cart or prepare unsolicited recovery messages.
    if (process.env.ABANDONED_CART_CAPTURE_ENABLED !== 'true') {
      return NextResponse.json(
        { success: false, disabled: true },
        {
          status: 202,
          headers: { 'Cache-Control': 'no-store, max-age=0' },
        },
      );
    }

    const rateLimit = await consumeDistributedRateLimit(
      request.headers,
      'cart-save',
      MAX_SAVES_PER_WINDOW,
      RATE_LIMIT_WINDOW_MS,
    );
    if (rateLimit.kind === 'unavailable') {
      return NextResponse.json(
        { success: false, error: 'Cart protection is unavailable' },
        {
          status: 503,
          headers: {
            'Cache-Control': 'no-store, max-age=0',
            'Retry-After': String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }
    if (rateLimit.kind === 'limited') {
      return NextResponse.json(
        { success: false, error: 'Too many cart updates' },
        {
          status: 429,
          headers: {
            'Cache-Control': 'no-store, max-age=0',
            'Retry-After': String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    const body = await readLimitedJson(request, MAX_BODY_BYTES) as Record<string, unknown>;

    const { customer_email, customer_name, cart_data, locale } = body;
    const normalizedEmail = typeof customer_email === 'string'
      ? customer_email.trim().toLowerCase()
      : '';

    if (
      !isValidEmail(normalizedEmail) ||
      !Array.isArray(cart_data) ||
      cart_data.length === 0 ||
      cart_data.length > 20
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Only product ids and quantities are accepted from the browser. Names,
    // prices, slugs and images are rebuilt from trusted catalog data so an
    // attacker cannot inject HTML or arbitrary content into recovery emails.
    const quantities = new Map<string, number>();
    for (const item of cart_data as Array<{ product_id?: unknown; quantity?: unknown }>) {
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
        return NextResponse.json({ success: false, error: 'Invalid cart item' }, { status: 400 });
      }

      const nextQuantity = (quantities.get(item.product_id) ?? 0) + item.quantity;
      if (nextQuantity > 100) {
        return NextResponse.json({ success: false, error: 'Invalid cart quantity' }, { status: 400 });
      }
      quantities.set(item.product_id, nextQuantity);
    }

    const canonicalCart = [];
    let canonicalTotal = 0;
    for (const [productId, quantity] of Array.from(quantities.entries())) {
      const product = await convex.query(api.products.getById, {
        id: productId as Id<'products'>,
      });
      if (!product || isHiddenProductSlug(product.slug)) {
        return NextResponse.json({ success: false, error: 'Product not available' }, { status: 400 });
      }

      canonicalCart.push({
        product_id: product._id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity,
        image_url: product.image_url ?? '',
      });
      canonicalTotal += calculateTotalPrice(product.price, quantity);
    }

    // Check if user is logged in
    let userId: string | undefined = undefined;
    try {
      const user = await stackServerApp.getUser();
      if (user) {
        userId = user.id;
      }
    } catch (error) {
      // User is not logged in - continue without user_id
      console.log('Guest cart save - no user logged in');
    }

    // Save or update cart (Convex mutation handles upsert logic)
    const cartId = await convex.mutation(api.abandonedCarts.save, {
      ...convexServerAuth(),
      user_id: userId,
      customer_email: normalizedEmail,
      customer_name:
        typeof customer_name === 'string' && customer_name.trim()
          ? customer_name.trim().slice(0, 100)
          : undefined,
      cart_data: canonicalCart,
      total_amount: Math.round(canonicalTotal * 100) / 100,
      locale: locale === 'en' || locale === 'de' ? locale : 'nl',
    });

    return NextResponse.json({
      success: true,
      message: 'Cart saved',
      cart_id: cartId,
    }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 });
    }
    if (error instanceof InvalidRequestBodyError) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
    console.error('Cart save error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save cart',
      },
      { status: 500 }
    );
  }
}
