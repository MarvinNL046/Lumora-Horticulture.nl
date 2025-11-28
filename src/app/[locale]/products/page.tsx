import { unstable_setRequestLocale } from 'next-intl/server'
import ProductsClient from './ProductsClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// CTR-optimized metadata for products page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Producten | Paper Plug Trays 84 & 104 | FP 12+ Kwaliteit',
      description: 'Bekijk ons complete B2B assortiment: Paper Plug Tray 84/104, transportdozen en inlegvellen. ✓ FP 12+ technologie ✓ Gratis verzending ✓ B2B prijzen ✓ Direct van fabrikant.',
      keywords: ['paper plug tray 84', 'paper plug tray 104', 'paperbus steenwol pluggen', 'ellepot fp 12+', 'kweektrays B2B', 'transportdozen tuinbouw', 'professionele kweektrays']
    },
    en: {
      title: 'Products | Paper Plug Trays 84 & 104 | FP 12+ Quality',
      description: 'View our complete B2B range: Paper Plug Tray 84/104, transport boxes and insert sheets. ✓ FP 12+ technology ✓ Free shipping ✓ B2B prices ✓ Direct from manufacturer.',
      keywords: ['paper plug tray 84', 'paper plug tray 104', 'paper plug rockwool', 'ellepot fp 12+', 'growing trays B2B', 'transport boxes horticulture', 'professional growing trays']
    },
    de: {
      title: 'Produkte | Paper Plug Trays 84 & 104 | FP 12+ Qualitat',
      description: 'Sehen Sie unser komplettes B2B-Sortiment: Paper Plug Tray 84/104, Transportboxen und Einlegeblatter. ✓ FP 12+ Technologie ✓ Kostenloser Versand ✓ B2B-Preise ✓ Direkt vom Hersteller.',
      keywords: ['paper plug tray 84', 'paper plug tray 104', 'Papier-Plug Steinwolle', 'Ellepot FP 12+', 'Anzuchtschalen B2B', 'Transportboxen Gartenbau', 'professionelle Anzuchtschalen']
    }
  }
  
  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/producten/',
    en: '/products/',
    de: '/produkte/'
  }
  
  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/producten/'
  })
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
