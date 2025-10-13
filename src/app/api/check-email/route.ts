import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email exists in orders
    const existingOrders = await db
      .select({
        customer_name: orders.customer_name,
        customer_phone: orders.customer_phone,
        created_at: orders.created_at,
      })
      .from(orders)
      .where(eq(orders.customer_email, email))
      .orderBy(desc(orders.created_at))
      .limit(1);

    if (existingOrders.length > 0) {
      const mostRecentOrder = existingOrders[0];

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
