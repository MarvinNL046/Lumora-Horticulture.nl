import { unstable_setRequestLocale } from 'next-intl/server'
import BiologischAfbreekbaarClient from './PageClient'
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
      title: 'Biologisch Afbreekbare Kweekoplossingen: De Toekomst van Duurzame Teelt | Lumora',
      description: 'Ontdek biologisch afbreekbare paper plug trays voor duurzame professionele teelt. 100% composteerbaar, EU-gecertificeerd, circulaire economie. Geen plastic afval, optimale wortelontwikkeling.',
      keywords: [
        'biologisch afbreekbaar',
        'biodegradable growing',
        'duurzame kweekoplossingen',
        'composteerbare trays',
        'circulaire economie tuinbouw',
        'plastic vrij kweken',
        'eco-friendly propagatie',
        'sustainable horticulture',
        'green growing solutions',
        'milieuvriendelijk kweken'
      ]
    },
    en: {
      title: 'Biodegradable Growing Solutions: The Future of Sustainable Cultivation | Lumora',
      description: 'Discover biodegradable paper plug trays for sustainable professional growing. 100% compostable, EU-certified, circular economy. No plastic waste, optimal root development.',
      keywords: [
        'biodegradable',
        'biodegradable growing',
        'sustainable growing solutions',
        'compostable trays',
        'circular economy horticulture',
        'plastic-free growing',
        'eco-friendly propagation',
        'sustainable horticulture',
        'green growing solutions',
        'environmentally friendly growing'
      ]
    },
    de: {
      title: 'Biologisch abbaubare Anbaulösungen: Die Zukunft des nachhaltigen Anbaus | Lumora',
      description: 'Entdecken Sie biologisch abbaubare Paper Plug Trays für nachhaltigen professionellen Anbau. 100% kompostierbar, EU-zertifiziert, Kreislaufwirtschaft. Kein Kunststoffabfall, optimale Wurzelentwicklung.',
      keywords: [
        'biologisch abbaubar',
        'biologisch abbaubarer anbau',
        'nachhaltige anbaulösungen',
        'kompostierbare trays',
        'kreislaufwirtschaft gartenbau',
        'plastikfreier anbau',
        'umweltfreundliche vermehrung',
        'nachhaltiger gartenbau',
        'grüne anbaulösungen',
        'umweltfreundlicher anbau'
      ]
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/propagatie-technologie/biologisch-afbreekbaar',
    en: '/seo/propagation-technology/biodegradable-solutions',
    de: '/seo/vermehrungstechnologie/biologisch-abbaubar'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || localePaths.nl
  })
}

// SEO Landing page - Pillar 1, Subpillar 3
export default async function BiologischAfbreekbaarPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  return <BiologischAfbreekbaarClient locale={params.locale} />
}
