import { unstable_setRequestLocale } from 'next-intl/server'
import PaperbusLandingClient from './PaperbusLandingClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Generate metadata for Paperbus Steenwol Pluggen SEO landing page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Paperbus Steenwol Pluggen - FP 12+ Kwaliteit | Lumora Horticulture',
      description: 'Professionele paperbus steenwol pluggen met FP 12+ technologie. Schimmelwerend, milieuvriendelijk en 12+ maanden stabiliteit. Ideaal voor glastuinbouw en kwekerijen.',
      keywords: ['paperbus steenwol pluggen', 'steenwol pluggen', 'paperbus pluggen', 'fp 12+', 'schimmelwerend', 'milieuvriendelijk', 'glastuinbouw', 'kwekerij', 'transplantatieschok', 'wortelontwikkeling']
    },
    en: {
      title: 'Paper Pot Rockwool Plugs - FP 12+ Quality | Lumora Horticulture',
      description: 'Professional paper pot rockwool plugs with FP 12+ technology. Fungicide protection, eco-friendly and 12+ months stability. Perfect for greenhouse cultivation and nurseries.',
      keywords: ['paper pot rockwool plugs', 'rockwool plugs', 'paper pot plugs', 'fp 12+', 'fungicide', 'eco-friendly', 'greenhouse', 'nursery', 'transplant shock', 'root development']
    },
    de: {
      title: 'Papiertopf Steinwollstecker - FP 12+ Qualität | Lumora Horticulture',
      description: 'Professionelle Papiertopf-Steinwollstecker mit FP 12+ Technologie. Pilzschutz, umweltfreundlich und 12+ Monate Stabilität. Ideal für Gewächshäuser und Gärtnereien.',
      keywords: ['papiertopf steinwollstecker', 'steinwollstecker', 'papiertopf stecker', 'fp 12+', 'pilzschutz', 'umweltfreundlich', 'gewächshaus', 'gärtnerei', 'transplantationsschock', 'wurzelentwicklung']
    }
  }
  
  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/paperbus-steenwol-pluggen/',
    en: '/paper-pot-rockwool-plugs/',
    de: '/papiertopf-steinwollstecker/'
  }
  
  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/paperbus-steenwol-pluggen/'
  })
}

// SEO Landing page for Paperbus Steenwol Pluggen
export default async function PaperbusLandingPage({ params }: { params: { locale: string } }) {
  // This is needed for internationalization to work properly
  unstable_setRequestLocale(params.locale)
  
  // Load messages manually for static export
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  
  // Pull translations from the messages
  const t = messages

  return (
    <PaperbusLandingClient t={t} locale={params.locale} />
  )
}