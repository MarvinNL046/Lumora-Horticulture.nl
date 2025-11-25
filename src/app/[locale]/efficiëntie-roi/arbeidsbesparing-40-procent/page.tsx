import { unstable_setRequestLocale } from 'next-intl/server'
import ArbeidsbesparingClient from './PageClient'
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
      title: '40% Arbeidsbesparing met Paper Plug Trays: Efficiëntere Kwekerij | Lumora',
      description: 'Bespaar 40% arbeidstijd met paper plug trays: geen uitpotten nodig, 450-600 planten/uur transplantatie, €15.000-25.000 lagere arbeidskosten per jaar. Complete workflow analyse.',
      keywords: [
        '40 procent arbeidsbesparing',
        'arbeidsbesparing kwekerij',
        'efficiëntie glastuinbouw',
        'productiviteit paper plugs',
        'arbeidskosten reduceren',
        'workflow optimalisatie kweek',
        'transplantatie efficiëntie',
        'minder personeel nodig',
        'arbeidsintensiteit verlagen',
        'time-motion study kwekerij'
      ]
    },
    en: {
      title: '40% Labor Savings with Paper Plug Trays: More Efficient Nursery | Lumora',
      description: 'Save 40% labor time with paper plug trays: no depotting needed, 450-600 plants/hour transplanting, €15,000-25,000 lower labor costs per year. Complete workflow analysis.',
      keywords: [
        '40 percent labor savings',
        'labor savings nursery',
        'greenhouse efficiency',
        'paper plugs productivity',
        'reduce labor costs',
        'workflow optimization growing',
        'transplanting efficiency',
        'less staff needed',
        'reduce labor intensity',
        'time-motion study nursery'
      ]
    },
    de: {
      title: '40% Arbeitsersparnis mit Paper Plug Trays: Effizientere Gärtnerei | Lumora',
      description: '40% Arbeitszeit sparen mit Paper Plug Trays: kein Austopfen nötig, 450-600 Pflanzen/Stunde Umpflanzen, €15.000-25.000 niedrigere Arbeitskosten pro Jahr. Vollständige Workflow-Analyse.',
      keywords: [
        '40 prozent arbeitsersparnis',
        'arbeitsersparnis gärtnerei',
        'gewächshaus effizienz',
        'paper plugs produktivität',
        'arbeitskosten reduzieren',
        'workflow optimierung anbau',
        'umpflanz effizienz',
        'weniger personal benötigt',
        'arbeitsintensität senken',
        'zeit-bewegungs-studie gärtnerei'
      ]
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/efficiëntie-roi/arbeidsbesparing-40-procent',
    en: '/seo/efficiency-roi/labor-savings-40-percent',
    de: '/seo/effizienz-roi/arbeitsersparnis-40-prozent'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || localePaths.nl
  })
}

// SEO Landing page - Pillar 3, Subpillar 2
export default async function ArbeidsbesparingPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  return <ArbeidsbesparingClient locale={params.locale} />
}
