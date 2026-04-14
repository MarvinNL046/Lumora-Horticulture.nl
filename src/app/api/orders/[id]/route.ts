import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { Id } from '@/../convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

/**
 * GET /api/orders/[id]
 * Haal order gegevens op (voor conversie tracking)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order ID is required',
        },
        { status: 400 }
      );
    }

    // Zoek order op basis van ID
    const order = await convex.query(api.orders.getById, {
      id: orderId as Id<"orders">,
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order not found',
        },
        { status: 404 }
      );
    }

    // Return alleen de data die nodig is voor conversie tracking
    return NextResponse.json({
      success: true,
      order: {
        id: order._id,
        order_number: order.order_number,
        total_amount: order.total_amount,
        payment_id: order.payment_id,
        payment_status: order.payment_status,
        status: order.status,
      },
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch order',
      },
      { status: 500 }
    );
  }
}
