import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import type { Id } from '@/../convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

/**
 * GET /api/cart/recover/[id]
 * Recover cart contents from an abandoned-cart record (used by reminder emails).
 * The id is a Convex document id — unguessable and acts as a one-time recovery token.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cart = await convex.query(api.abandonedCarts.getById, {
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
      customer_email: cart.customer_email,
      customer_name: cart.customer_name ?? null,
    });
  } catch (error) {
    console.error('Cart recover error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to recover cart',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
