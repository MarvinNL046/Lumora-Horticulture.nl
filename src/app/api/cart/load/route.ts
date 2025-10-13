import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { abandonedCarts } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { stackServerApp } from '@/stack/server';

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
    const userCart = await db
      .select()
      .from(abandonedCarts)
      .where(
        and(
          eq(abandonedCarts.user_id, user.id),
          eq(abandonedCarts.recovered, false)
        )
      )
      .orderBy(desc(abandonedCarts.created_at))
      .limit(1);

    if (userCart && userCart.length > 0) {
      return NextResponse.json({
        success: true,
        cart: userCart[0].cart_data,
        cart_id: userCart[0].id,
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
