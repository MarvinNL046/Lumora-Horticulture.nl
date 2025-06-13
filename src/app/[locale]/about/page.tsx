import { unstable_setRequestLocale } from 'next-intl/server'
import AboutClient from './AboutClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Generate metadata for about page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Over Ons - Directe Fabrikant van Steenwol Pluggen',
      description: 'Lumora Horticulture: eigen productie van steenwol pluggen en kweektrays. B2B specialist voor professionele kwekers. Direct van de fabrikant, Europese kwaliteit.',
      keywords: ['over lumora horticulture', 'steenwol pluggen fabrikant', 'eigen productie', 'B2B tuinbouw leverancier', 'directe fabrikant']
    },
    en: {
      title: 'About Us - Direct Manufacturer of Rockwool Plugs',
      description: 'Lumora Horticulture: own production of rockwool plugs and growing trays. B2B specialist for professional growers. Direct from manufacturer, European quality.',
      keywords: ['about lumora horticulture', 'rockwool plugs manufacturer', 'own production', 'B2B horticulture supplier', 'direct manufacturer']
    },
    de: {
      title: 'Über Uns - Direkter Hersteller von Steinwollsteckern',
      description: 'Lumora Horticulture: eigene Produktion von Steinwollsteckern und Anzuchtschalen. B2B-Spezialist für professionelle Züchter. Direkt vom Hersteller, europäische Qualität.',
      keywords: ['über lumora horticulture', 'steinwollstecker hersteller', 'eigene produktion', 'B2B gartenbau lieferant', 'direkter hersteller']
    }
  }
  
  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/over-ons/',
    en: '/about/',
    de: '/uber-uns/'
  }
  
  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/over-ons/'
  })
}

export default async function AboutPage({ params }: { params: { locale: string } }) {
  // This is needed for internationalization to work properly
  unstable_setRequestLocale(params.locale)
  
  // Load messages manually for static export
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  
  // Pull about translations from the messages
  const t = messages.about || {}

  return (
    <AboutClient t={t} locale={params.locale} />
  )
}