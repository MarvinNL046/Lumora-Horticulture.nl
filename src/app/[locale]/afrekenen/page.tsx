import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PremiumCheckout } from '@/app/lumora-premium/_components/PremiumCheckout'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'

type Props = {
  params: Promise<{ locale: string }>
}

export const metadata: Metadata = {
  title: 'Veilig afrekenen',
  description: 'Rond uw bestelling veilig af bij Lumora Horticulture.',
  robots: { index: false, follow: false },
}

export default async function AfrekenenPage({ params }: Props) {
  const { locale } = await params
  if (locale !== 'nl') notFound()

  return (
    <StoreShell>
      <PremiumCheckout />
    </StoreShell>
  )
}
