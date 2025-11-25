import { unstable_setRequestLocale } from 'next-intl/server'
import WatZijnPaperPlugTraysClient from './PageClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for all locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Wat zijn Paper Plug Trays? Complete Gids voor Professionele Kwekers | Lumora',
      description: 'Ontdek wat paper plug trays zijn en waarom professionele kwekers ze gebruiken. FP 12+ technologie, biologisch afbreekbaar, optimale wortelontwikkeling. Bestel direct van de fabrikant.',
      keywords: [
        'paper plug trays',
        'paperbus pluggen',
        'wat zijn paper plugs',
        'professionele propagatie',
        'kweekmateriaal glastuinbouw',
        'fp 12+ technologie',
        'biologisch afbreekbare trays',
        'wortelontwikkeling',
        'transplantatieschok voorkomen',
        'duurzame kweek oplossingen'
      ]
    },
    en: {
      title: 'What are Paper Plug Trays? Complete Guide for Professional Growers | Lumora',
      description: 'Discover what paper plug trays are and why professional growers use them. FP 12+ technology, biodegradable, optimal root development. Order direct from manufacturer.',
      keywords: [
        'paper plug trays',
        'what are paper plugs',
        'professional propagation',
        'greenhouse growing materials',
        'fp 12+ technology',
        'biodegradable trays',
        'root development',
        'prevent transplant shock',
        'sustainable growing solutions'
      ]
    },
    de: {
      title: 'Was sind Paper Plug Trays? Vollständiger Leitfaden für Profis | Lumora',
      description: 'Erfahren Sie, was Paper Plug Trays sind und warum professionelle Züchter sie verwenden. FP 12+ Technologie, biologisch abbaubar, optimale Wurzelentwicklung. Direkt vom Hersteller bestellen.',
      keywords: [
        'paper plug trays',
        'was sind paper plugs',
        'professionelle vermehrung',
        'gewächshaus anbaumaterialien',
        'fp 12+ technologie',
        'biologisch abbaubare trays',
        'wurzelentwicklung',
        'transplantationsschock vermeiden',
        'nachhaltige anbaulösungen'
      ]
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/propagatie-technologie/wat-zijn-paper-plug-trays',
    en: '/seo/propagation-technology/what-are-paper-plug-trays',
    de: '/seo/vermehrungstechnologie/was-sind-paper-plug-trays'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || localePaths.nl
  })
}

// SEO Landing page - Pillar 1, Subpillar 1
export default async function WatZijnPaperPlugTraysPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  return <WatZijnPaperPlugTraysClient locale={params.locale} />
}
