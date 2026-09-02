import type { Metadata } from 'next'
import { PremiumCheckout } from '@/app/lumora-premium/_components/PremiumCheckout'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'
import { resolveStorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveStorefrontLocale((await params).locale)
  return { title: locale === 'en' ? 'Secure checkout' : locale === 'de' ? 'Sicher bezahlen' : 'Veilig afrekenen', robots: { index: false, follow: false } }
}

export default async function AfrekenenPage({ params }: Props) {
  const { locale } = await params
  const resolvedLocale = resolveStorefrontLocale(locale)

  return (
    <StoreShell>
      <PremiumCheckout locale={resolvedLocale} />
    </StoreShell>
  )
}
