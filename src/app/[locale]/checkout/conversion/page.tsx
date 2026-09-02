'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import CheckoutStatusScreen from '@/components/CheckoutStatusScreen'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'

export default function ConversionTrackingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('order_id')

  useEffect(() => {
    if (!orderId) {
      router.replace('/producten')
      return
    }

    const controller = new AbortController()

    fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error('Order status could not be loaded')
        return response.json()
      })
      .then((data: { success?: boolean; order?: unknown }) => {
        if (!data.success || !data.order) {
          router.replace('/producten')
          return
        }

        router.replace(`/checkout/success?order_id=${encodeURIComponent(orderId)}`)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        console.error('Failed to fetch order data:', error)
        router.replace('/producten')
      })

    return () => controller.abort()
  }, [orderId, router])

  return (
    <StoreShell>
      <CheckoutStatusScreen kind="loading" />
    </StoreShell>
  )
}
