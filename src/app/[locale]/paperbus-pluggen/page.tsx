import { unstable_setRequestLocale } from 'next-intl/server'
import PaperbusPluggenClient from './PaperbusPluggenClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Generate metadata for Paperbus Pluggen SEO landing page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Paperbus Pluggen - Duurzame Kweekoplossing | Lumora Horticulture',
      description: 'Ontdek paperbus pluggen: 100% biologisch afbreekbaar, duurzaam en perfect voor professionele kwekerijen. FP 12+ technologie voor optimale wortelontwikkeling en geen transplantatieschok.',
      keywords: ['paperbus pluggen', 'paper plug', 'biologisch afbreekbaar', 'duurzaam', 'propagatie pluggen', 'kweekmateriaal', 'glastuinbouw', 'transplantatieschok', 'wortelontwikkeling', 'fp 12+']
    },
    en: {
      title: 'Paper Pot Plugs - Sustainable Growing Solution | Lumora Horticulture',
      description: 'Discover paper pot plugs: 100% biodegradable, sustainable and perfect for professional nurseries. FP 12+ technology for optimal root development and no transplant shock.',
      keywords: ['paper pot plugs', 'paper plug', 'biodegradable', 'sustainable', 'propagation plugs', 'cultivation media', 'greenhouse', 'transplant shock', 'root development', 'fp 12+']
    },
    de: {
      title: 'Papiertopf Stecker - Nachhaltige Anbaulösung | Lumora Horticulture',
      description: 'Entdecken Sie Papiertopf-Stecker: 100% biologisch abbaubar, nachhaltig und perfekt für professionelle Gärtnereien. FP 12+ Technologie für optimale Wurzelentwicklung ohne Transplantationsschock.',
      keywords: ['papiertopf stecker', 'papier stecker', 'biologisch abbaubar', 'nachhaltig', 'anzucht plugs', 'anbaumedium', 'gewächshaus', 'transplantationsschock', 'wurzelentwicklung', 'fp 12+']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/paperbus-pluggen/',
    en: '/paper-pot-plugs/',
    de: '/papiertopf-stecker/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/paperbus-pluggen/'
  })
}

// SEO Landing page for Paperbus Pluggen
export default async function PaperbusPluggenPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  const t = messages

  return (
    <PaperbusPluggenClient t={t} locale={params.locale} />
  )
}
