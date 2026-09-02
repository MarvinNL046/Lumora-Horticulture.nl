import type {Metadata} from 'next'
import type {ReactNode} from 'react'

type CheckoutLayoutProps = {
  children: ReactNode
  params: Promise<{locale: string}>
}

export async function generateMetadata({params}: CheckoutLayoutProps): Promise<Metadata> {
  const {locale} = await params

  const title = locale === 'de'
    ? 'Bestellstatus | Lumora Horticulture'
    : locale === 'en'
      ? 'Order status | Lumora Horticulture'
      : 'Bestelstatus | Lumora Horticulture'

  return {
    title,
    robots: {index: false, follow: false},
  }
}

export default function CheckoutLayout({children}: CheckoutLayoutProps) {
  return children
}
