import { unstable_setRequestLocale } from 'next-intl/server'
import EllepotFlyerClient from './EllepotFlyerClient'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

export default function EllepotFlyerPage({ params }: { params: { locale: string } }) {
  // This is needed for internationalization to work properly
  unstable_setRequestLocale(params.locale)
  
  return <EllepotFlyerClient />
}