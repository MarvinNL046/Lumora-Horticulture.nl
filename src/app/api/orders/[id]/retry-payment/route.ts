import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';
import { createPayment } from '@/lib/mollie';

export const dynamic = 'force-dynamic';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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
    const order = await convex.query(api.orders.getById, {
      id: orderId as Id<"orders">,
    });

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
      amount: order.total_amount,
      description: `Bestelling ${order._id}`,
      redirectUrl: `${baseUrl}/checkout/conversion?order_id=${order._id}`,
      webhookUrl: `${baseUrl}/api/webhooks/mollie`,
      metadata: {
        order_id: order._id,
        retry: true, // Mark as a retry payment
      },
    });

    // Update order with new payment ID and reset status
    await convex.mutation(api.orders.update, {
      id: orderId as Id<"orders">,
      payment_id: payment.id,
      payment_status: 'pending',
      status: 'pending',
    });

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

    const order = await convex.query(api.orders.getById, {
      id: orderId as Id<"orders">,
    });

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
        id: order._id,
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
