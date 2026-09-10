'use client'

import { useEffect, useState } from 'react'
import { stekplugPromoDeadline } from '@/lib/stekplug-promo-deadline'
import type { StorefrontLocale } from './storefront-localization'

export function PromoDeadline({ locale = 'nl' }: { locale?: StorefrontLocale }) {
  // Render the fixed date until hydration so cached HTML never shows an old countdown.
  const [now, setNow] = useState<Date>()

  useEffect(() => {
    const refresh = () => setNow(new Date())
    const initial = window.setTimeout(refresh, 0)
    const timer = window.setInterval(refresh, 1_000)
    return () => {
      window.clearTimeout(initial)
      window.clearInterval(timer)
    }
  }, [])

  return <small>{stekplugPromoDeadline(locale, now)}</small>
}
