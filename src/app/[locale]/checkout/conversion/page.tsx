'use client'

import { useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { localizePathForLocale } from '@/lib/url-localizations'
import CheckoutStatusScreen from '@/components/CheckoutStatusScreen'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'

export default function ConversionTrackingPage() {
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = params?.locale === 'en' || params?.locale === 'de' ? params.locale : 'nl'
  const router = useRouter()
  const orderId = searchParams.get('order_id')

  useEffect(() => {
    if (!orderId) {
      router.replace(localizePathForLocale('/products', locale))
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
          router.replace(localizePathForLocale('/products', locale))
          return
        }

        router.replace(`${localizePathForLocale('/checkout/success', locale)}?order_id=${encodeURIComponent(orderId)}`)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        console.error('Failed to fetch order data:', error)
        router.replace(localizePathForLocale('/products', locale))
      })

    return () => controller.abort()
  }, [locale, orderId, router])

  return (
    <StoreShell>
      <CheckoutStatusScreen kind="loading" locale={locale} />
    </StoreShell>
  )
}
