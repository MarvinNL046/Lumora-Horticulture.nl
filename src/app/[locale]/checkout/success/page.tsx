'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import CheckoutStatusScreen from '@/components/CheckoutStatusScreen'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'

type OrderStatus = 'loading' | 'success' | 'pending' | 'failed'

type PublicOrder = {
  order_number?: string
  payment_status?: string
}

export default function CheckoutSuccessPage() {
  const params = useParams()
  const locale = params?.locale === 'en' || params?.locale === 'de' ? params.locale : 'nl'
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(orderId ? 'loading' : 'failed')
  const [orderData, setOrderData] = useState<PublicOrder | null>(null)

  useEffect(() => {
    if (!orderId) return

    const controller = new AbortController()

    fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Order status could not be loaded')
        return response.json() as Promise<{ success?: boolean; order?: PublicOrder }>
      })
      .then((data) => {
        if (!data.success || !data.order) {
          setOrderStatus('failed')
          return
        }

        setOrderData(data.order)
        if (data.order.payment_status === 'paid') setOrderStatus('success')
        else if (data.order.payment_status === 'pending') setOrderStatus('pending')
        else setOrderStatus('failed')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        console.error('Failed to fetch order data:', error)
        setOrderStatus('failed')
      })

    return () => controller.abort()
  }, [orderId])

  return (
    <StoreShell>
      <CheckoutStatusScreen kind={orderStatus} orderNumber={orderData?.order_number} locale={locale} />
    </StoreShell>
  )
}
