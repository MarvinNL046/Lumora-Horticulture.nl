import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email exists in orders (returns most recent order by email)
    const mostRecentOrder = await convex.query(api.orders.getByEmail, {
      customer_email: email,
    });

    if (mostRecentOrder) {
      return NextResponse.json({
        success: true,
        exists: true,
        order_data: {
          customer_name: mostRecentOrder.customer_name,
          customer_phone: mostRecentOrder.customer_phone,
        },
      });
    }

    return NextResponse.json({
      success: true,
      exists: false,
    });
  } catch (error) {
    console.error('Error checking email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check email' },
      { status: 500 }
    );
  }
}
