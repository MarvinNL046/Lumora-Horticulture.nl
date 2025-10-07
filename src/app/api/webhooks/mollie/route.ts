import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { getPaymentStatus } from '@/lib/mollie';
import { eq } from 'drizzle-orm';

/**
 * POST /api/webhooks/mollie
 * Mollie webhook voor betaling updates
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const paymentId = body.id;

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          error: 'No payment ID provided',
        },
        { status: 400 }
      );
    }

    // Haal betaling status op van Mollie
    const payment = await getPaymentStatus(paymentId);

    // Zoek de order op basis van payment ID
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.payment_id, paymentId))
      .limit(1);

    if (!order) {
      console.error(`Order not found for payment ${paymentId}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found',
        },
        { status: 404 }
      );
    }

    // Update order status op basis van payment status
    let orderStatus = order.status;
    let paymentStatus: string = payment.status;

    if (payment.status === 'paid') {
      orderStatus = 'processing';
      paymentStatus = 'paid';
    } else if (payment.status === 'failed') {
      orderStatus = 'cancelled';
      paymentStatus = 'failed';
    } else if (payment.status === 'canceled') {
      orderStatus = 'cancelled';
      paymentStatus = 'cancelled';
    } else if (payment.status === 'expired') {
      orderStatus = 'cancelled';
      paymentStatus = 'expired';
    }

    // Update order in database
    await db
      .update(orders)
      .set({
        status: orderStatus,
        payment_status: paymentStatus,
        updated_at: new Date(),
      })
      .where(eq(orders.id, order.id));

    console.log(`Order ${order.id} updated: ${orderStatus} / ${paymentStatus}`);

    return NextResponse.json({
      success: true,
      order_id: order.id,
      status: orderStatus,
      payment_status: paymentStatus,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Webhook processing failed',
      },
      { status: 500 }
    );
  }
}
