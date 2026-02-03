import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { createPayment } from '@/lib/mollie';
import { eq } from 'drizzle-orm';

/**
 * POST /api/orders/[id]/retry-payment
 * Generate a new payment link for an existing order with expired/failed payment
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Find the order
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Only allow retry for orders with failed/expired/cancelled payments
    const allowedStatuses = ['expired', 'failed', 'cancelled', 'pending'];
    if (!allowedStatuses.includes(order.payment_status || '')) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot retry payment for order with status: ${order.payment_status}`,
        },
        { status: 400 }
      );
    }

    // Don't allow retry for already paid orders
    if (order.payment_status === 'paid') {
      return NextResponse.json(
        { success: false, error: 'Order is already paid' },
        { status: 400 }
      );
    }

    // Create new Mollie payment
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lumorahorticulture.nl';
    const payment = await createPayment({
      amount: parseFloat(order.total_amount),
      description: `Bestelling ${order.id}`,
      redirectUrl: `${baseUrl}/checkout/conversion?order_id=${order.id}`,
      webhookUrl: `${baseUrl}/api/webhooks/mollie`,
      metadata: {
        order_id: order.id,
        retry: true, // Mark as a retry payment
      },
    });

    // Update order with new payment ID and reset status
    await db
      .update(orders)
      .set({
        payment_id: payment.id,
        payment_status: 'pending',
        status: 'pending',
        updated_at: new Date(),
      })
      .where(eq(orders.id, orderId));

    console.log(`✅ New payment created for order ${orderId}: ${payment.id}`);

    return NextResponse.json({
      success: true,
      order_id: orderId,
      payment_id: payment.id,
      payment_url: payment.getCheckoutUrl(),
    });
  } catch (error) {
    console.error('Retry payment error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create new payment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/orders/[id]/retry-payment
 * Get order details for retry page
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Only return limited info for security
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        customer_name: order.customer_name,
        total_amount: order.total_amount,
        status: order.status,
        payment_status: order.payment_status,
        can_retry: ['expired', 'failed', 'cancelled', 'pending'].includes(order.payment_status || ''),
      },
    });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get order' },
      { status: 500 }
    );
  }
}
