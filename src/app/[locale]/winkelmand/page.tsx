import type { Metadata } from 'next'
import { CartPage } from '@/app/lumora-premium/_components/CartPage'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'
import { resolveStorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveStorefrontLocale((await params).locale)
  return { title: locale === 'en' ? 'Cart' : locale === 'de' ? 'Warenkorb' : 'Winkelmand', robots: { index: false, follow: false } }
}

export default async function WinkelmandPage({ params }: Props) {
  const { locale } = await params
  const resolvedLocale = resolveStorefrontLocale(locale)

  return (
    <StoreShell>
      <CartPage locale={resolvedLocale} />
    </StoreShell>
  )
}
