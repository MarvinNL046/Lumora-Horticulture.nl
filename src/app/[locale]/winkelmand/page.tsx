import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CartPage } from '@/app/lumora-premium/_components/CartPage'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'

type Props = {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Winkelmand',
  description: 'Controleer uw huidige bestelling bij Lumora Horticulture.',
  robots: { index: false, follow: false },
}

export default async function WinkelmandPage({ params }: Props) {
  const { locale } = await params
  if (locale !== 'nl') notFound()

  return (
    <StoreShell>
      <CartPage />
    </StoreShell>
  )
}
