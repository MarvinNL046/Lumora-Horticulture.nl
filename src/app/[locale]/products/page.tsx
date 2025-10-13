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

// Generate metadata for products page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Paperbus Steenwol Pluggen & Professionele Kweektrays',
      description: 'Bekijk ons B2B assortiment paperbus steenwol pluggen: Ellepot FP 12+ PAPER PLUG TRAY 84/104, transportdozen en inlegvellen. Direct van de fabrikant. Groothandel prijzen voor professionele kwekers.',
      keywords: ['paperbus steenwol pluggen', 'ellepot paper plugs', 'kweektrays', 'steenwol pluggen', 'paper plug tray', 'transportdozen tuinbouw', 'inlegvellen', 'transplant trays']
    },
    en: {
      title: 'Paper Plug Rockwool & Professional Growing Trays',
      description: 'View our B2B range paper plug rockwool: Ellepot FP 12+ PAPER PLUG TRAY 84/104, transport boxes and insert sheets. Direct from manufacturer. Wholesale prices for professional growers.',
      keywords: ['paper plug rockwool', 'ellepot paper plugs', 'growing trays', 'rockwool plugs', 'paper plug tray', 'transport boxes horticulture', 'insert sheets', 'transplant trays']
    },
    de: {
      title: 'Papier-Plug Steinwolle & Professionelle Anzuchtschalen',
      description: 'Sehen Sie unser B2B-Sortiment Papier-Plug Steinwolle: Ellepot FP 12+ PAPER PLUG TRAY 84/104, Transportboxen und Einlegeblätter. Direkt vom Hersteller. Großhandelspreise für professionelle Züchter.',
      keywords: ['Papier-Plug Steinwolle', 'Ellepot Paper Plugs', 'Anzuchtschalen', 'Steinwollstecker', 'Paper Plug Tray', 'Transportboxen Gartenbau', 'Einlegeblätter', 'Transplant Trays']
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
