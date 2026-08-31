import { NextRequest, NextResponse } from 'next/server';
import { convex, convexServerAuth } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import type { Id } from '@/../convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

/**
 * GET /api/cart/recover/[id]
 * Recover cart contents from an abandoned-cart record (used by reminder emails).
 * The response intentionally contains no customer PII. The cart id is only a
 * locator; it is not treated as proof that the caller may read an email/name.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cart = await convex.query(api.abandonedCarts.getById, {
      ...convexServerAuth(),
      id: params.id as Id<'abandonedCarts'>,
    });

    if (!cart) {
      return NextResponse.json(
        { success: false, error: 'Cart not found' },
        { status: 404 }
      );
    }

    if (cart.recovered) {
      return NextResponse.json(
        { success: false, error: 'Cart already recovered', recovered: true },
        { status: 410 }
      );
    }

    return NextResponse.json({
      success: true,
      cart: cart.cart_data,
    }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    console.error('Cart recover error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to recover cart',
      },
      { status: 500 }
    );
  }
}
