import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../convex/_generated/api';
import { stackServerApp } from '@/stack/server';

export const dynamic = 'force-dynamic';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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
      user_id: userId,
      customer_email,
      customer_name,
      cart_data,
      total_amount: parseFloat(total_amount.toString()),
      locale: locale || 'nl',
    });

    return NextResponse.json({
      success: true,
      message: 'Cart saved',
      cart_id: cartId,
    });
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
