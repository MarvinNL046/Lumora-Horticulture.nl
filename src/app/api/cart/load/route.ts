import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../convex/_generated/api';
import { stackServerApp } from '@/stack/server';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Force dynamic rendering for this route (uses cookies for auth)
export const dynamic = 'force-dynamic';

/**
 * GET /api/cart/load
 * Load cart data for logged-in user
 */
export async function GET(request: NextRequest) {
  try {
    // Check if user is logged in
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'User not authenticated',
        },
        { status: 401 }
      );
    }

    // Get the most recent non-recovered cart for this user
    const cart = await convex.query(api.abandonedCarts.load, {
      user_id: user.id,
    });

    if (cart) {
      return NextResponse.json({
        success: true,
        cart: cart.cart_data,
        cart_id: cart._id,
      });
    }

    // No cart found
    return NextResponse.json({
      success: true,
      cart: [],
      cart_id: null,
    });
  } catch (error) {
    console.error('Cart load error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load cart',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
