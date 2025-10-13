import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { abandonedCarts } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { stackServerApp } from '@/stack/server';

/**
 * POST /api/cart/save
 * Save or update abandoned cart data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { customer_email, customer_name, cart_data, total_amount, locale } = body;

    // Validatie
    if (!customer_email || !cart_data || cart_data.length === 0 || !total_amount) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Check if user is logged in
    let userId = null;
    try {
      const user = await stackServerApp.getUser();
      if (user) {
        userId = user.id;
      }
    } catch (error) {
      // User is not logged in - continue without user_id
      console.log('Guest cart save - no user logged in');
    }

    // Check if there's already an abandoned cart for this email (not recovered)
    const existingCart = await db
      .select()
      .from(abandonedCarts)
      .where(
        and(
          eq(abandonedCarts.customer_email, customer_email),
          eq(abandonedCarts.recovered, false)
        )
      )
      .limit(1);

    if (existingCart && existingCart.length > 0) {
      // Update existing cart
      await db
        .update(abandonedCarts)
        .set({
          user_id: userId, // Update user_id if user logged in
          customer_name: customer_name || existingCart[0].customer_name,
          cart_data,
          total_amount: total_amount.toString(),
          locale: locale || existingCart[0].locale,
          created_at: sql`NOW()`, // Reset created_at to current time
          reminded_at: null, // Reset reminder status
        })
        .where(eq(abandonedCarts.id, existingCart[0].id));

      return NextResponse.json({
        success: true,
        message: 'Cart updated',
        cart_id: existingCart[0].id,
      });
    } else {
      // Create new abandoned cart entry
      const [cart] = await db
        .insert(abandonedCarts)
        .values({
          user_id: userId, // Link to logged in user
          customer_email,
          customer_name,
          cart_data,
          total_amount: total_amount.toString(),
          locale: locale || 'nl',
        })
        .returning();

      return NextResponse.json({
        success: true,
        message: 'Cart saved',
        cart_id: cart.id,
      });
    }
  } catch (error) {
    console.error('Cart save error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save cart',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
