import { unstable_setRequestLocale } from 'next-intl/server'
import EllepotClient from './EllepotClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Generate metadata for Ellepot FP 12+ page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Ellepot FP 12+ Papier - Milieuvriendelijke Verpakking voor Paperbus Steenwol Pluggen',
      description: 'Onze paperbus steenwol pluggen zijn verpakt met Ellepot FP 12+ papier. 12+ maanden afbraaktijd, schimmelwerend, en optimale wortelontwikkeling zonder transplantatieschok.',
      keywords: ['ellepot fp 12+', 'paperbus steenwol pluggen', 'steenwolpluggen', 'paperbus pluggen', 'milieuvriendelijk', 'schimmelwerend', 'transplantatieschok']
    },
    en: {
      title: 'Ellepot FP 12+ Paper - Eco-Friendly Wrapping for Paper Pot Rockwool Plugs',
      description: 'Our paper pot rockwool plugs are wrapped with Ellepot FP 12+ paper. 12+ months degradation time, fungicide protection, and optimal root development without transplant shock.',
      keywords: ['ellepot fp 12+', 'paper pot rockwool plugs', 'rockwool plugs', 'paper pot plugs', 'eco-friendly', 'fungicide', 'transplant shock']
    },
    de: {
      title: 'Ellepot FP 12+ Papier - Umweltfreundliche Umhüllung für Papiertopf-Steinwollstecker',
      description: 'Unsere Papiertopf-Steinwollstecker sind mit Ellepot FP 12+ Papier umhüllt. 12+ Monate Abbauzeit, pilzhemmend und optimale Wurzelentwicklung ohne Transplantationsschock.',
      keywords: ['ellepot fp 12+', 'papiertopf steinwollstecker', 'steinwollstecker', 'papier topf stecker', 'umweltfreundlich', 'pilzhemmend', 'transplantationsschock']
    }
  }
  
  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/producten/ellepot-fp12/',
    en: '/products/ellepot-fp12/',
    de: '/produkte/ellepot-fp12/'
  }
  
  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/producten/ellepot-fp12/'
  })
}

// Ellepot FP 12+ product page
export default async function EllepotPage({ params }: { params: { locale: string } }) {
  // This is needed for internationalization to work properly
  unstable_setRequestLocale(params.locale)
  
  // Load messages manually for static export
  const messages = (await import(`../../../../messages/${params.locale}/common.json`)).default
  
  // Pull translations from the messages
  const t = messages

  return (
    <EllepotClient t={t} locale={params.locale} />
  )
}