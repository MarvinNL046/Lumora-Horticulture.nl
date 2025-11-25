import { unstable_setRequestLocale } from 'next-intl/server'
import FP12TechnologieClient from './PageClient'
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
      title: 'FP 12+ Technologie: 12 Maanden Stabiliteit voor Professionele Kweek | Lumora',
      description: 'Ontdek hoe FP 12+ technologie 12 maanden structurele stabiliteit garandeert in paper plug trays. Gepatenteerde vezelbescherming voor betrouwbare professionele propagatie zonder giftige chemicaliën.',
      keywords: [
        'fp 12+ technologie',
        'fiber protection 12+',
        'stabiele paper plugs',
        'duurzame kweektrays',
        'paper plug stabiliteit',
        'biologisch afbreekbaar stabiel',
        'lange houdbaarheid paper trays',
        'professionele propagatie technologie',
        'natuurlijke vezelbescherming',
        'betrouwbare kweekoplossing'
      ]
    },
    en: {
      title: 'FP 12+ Technology: 12 Months Stability for Professional Growing | Lumora',
      description: 'Discover how FP 12+ technology guarantees 12 months structural stability in paper plug trays. Patented fiber protection for reliable professional propagation without toxic chemicals.',
      keywords: [
        'fp 12+ technology',
        'fiber protection 12+',
        'stable paper plugs',
        'durable growing trays',
        'paper plug stability',
        'biodegradable stable',
        'long shelf life paper trays',
        'professional propagation technology',
        'natural fiber protection',
        'reliable growing solution'
      ]
    },
    de: {
      title: 'FP 12+ Technologie: 12 Monate Stabilität für professionellen Anbau | Lumora',
      description: 'Entdecken Sie, wie FP 12+ Technologie 12 Monate strukturelle Stabilität in Paper Plug Trays garantiert. Patentierter Faserschutz für zuverlässige professionelle Vermehrung ohne giftige Chemikalien.',
      keywords: [
        'fp 12+ technologie',
        'faserschutz 12+',
        'stabile paper plugs',
        'langlebige anzuchtschalen',
        'paper plug stabilität',
        'biologisch abbaubar stabil',
        'lange haltbarkeit paper trays',
        'professionelle vermehrungstechnologie',
        'natürlicher faserschutz',
        'zuverlässige anbaulösung'
      ]
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/propagatie-technologie/fp-12-technologie',
    en: '/seo/propagation-technology/fp-12-technology',
    de: '/seo/vermehrungstechnologie/fp-12-technologie'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || localePaths.nl
  })
}

// SEO Landing page - Pillar 1, Subpillar 2
export default async function FP12TechnologiePage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  return <FP12TechnologieClient locale={params.locale} />
}
