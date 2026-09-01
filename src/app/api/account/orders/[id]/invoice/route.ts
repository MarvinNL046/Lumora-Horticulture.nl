import { NextResponse } from 'next/server'
import { api } from '@/../convex/_generated/api'
import type { Id } from '@/../convex/_generated/dataModel'
import { convex, convexServerAuth } from '@/lib/convex'
import { createInvoicePdf } from '@/lib/invoice-pdf'
import { stackServerApp } from '@/stack/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isPaidOrder(status: string, paymentStatus?: string): boolean {
  return paymentStatus === 'paid' || ['paid', 'processing', 'shipped', 'completed'].includes(status)
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const user = await stackServerApp.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Log eerst in om deze factuur te downloaden.' }, { status: 401 })
  }

  const { id } = await context.params
  let order
  try {
    order = await convex.query(api.orders.getById, {
      ...convexServerAuth(),
      id: id as Id<'orders'>,
    })
  } catch {
    return NextResponse.json({ error: 'Factuur niet gevonden.' }, { status: 404 })
  }

  if (!order) {
    return NextResponse.json({ error: 'Factuur niet gevonden.' }, { status: 404 })
  }

  const verifiedEmail = user.primaryEmailVerified ? user.primaryEmail?.trim().toLowerCase() : undefined
  const ownsOrder = order.user_id === user.id || (
    Boolean(verifiedEmail) && verifiedEmail === order.customer_email.trim().toLowerCase()
  )
  if (!ownsOrder) {
    return NextResponse.json({ error: 'Geen toegang tot deze factuur.' }, { status: 403 })
  }
  if (!isPaidOrder(order.status, order.payment_status)) {
    return NextResponse.json({ error: 'De factuur is beschikbaar zodra de betaling is ontvangen.' }, { status: 409 })
  }

  const rows = await convex.query(api.orderItems.getByOrderWithProducts, {
    ...convexServerAuth(),
    order_id: order._id,
  })
  const pdf = await createInvoicePdf(
    { ...order, _id: String(order._id) },
    rows.map(({ order_item, product }) => ({
      quantity: order_item.quantity,
      price_at_purchase: order_item.price_at_purchase,
      product_name: product?.name || 'Lumora product',
    })),
  )
  const invoiceNumber = (order.order_number || String(order._id).slice(0, 10)).replace(/[^A-Za-z0-9_-]/g, '-')

  return new Response(Buffer.from(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="factuur-${invoiceNumber}.pdf"`,
      'Cache-Control': 'private, no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
