import { unstable_setRequestLocale } from 'next-intl/server'
import ProductsClient from './ProductsClient'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Product page component with modern styling
export default async function ProductsPage({ params }: { params: { locale: string } }) {
  // This is needed for internationalization to work properly
  unstable_setRequestLocale(params.locale)
  
  // Load messages manually for static export
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  
  // Pull products translations from the messages
  const t = messages.products

  return (
    <ProductsClient t={t} locale={params.locale} />
  )
}
