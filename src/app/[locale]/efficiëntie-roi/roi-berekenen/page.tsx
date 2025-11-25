import { unstable_setRequestLocale } from 'next-intl/server'
import RoiBerekenenClient from './PageClient'
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
      title: 'ROI Berekenen Paper Plug Trays: Wanneer Betaalt Investering Zich Terug? | Lumora',
      description: 'Bereken de ROI voor paper plug trays: break-even binnen 6-8 maanden, 40% arbeidsbesparing, 30% minder uitval. Complete kosten-baten analyse voor professionele kwekers.',
      keywords: [
        'roi berekenen paper plugs',
        'return on investment kwekerij',
        'kosten-baten analyse paper trays',
        'investering paper plug trays',
        'break-even berekening',
        'tco total cost ownership',
        'kostenbesparende kweekoplossingen',
        'paper plugs rendement',
        'professionele kwekerij roi',
        'glastuinbouw investering'
      ]
    },
    en: {
      title: 'Calculate ROI Paper Plug Trays: When Does Investment Pay Off? | Lumora',
      description: 'Calculate ROI for paper plug trays: break-even within 6-8 months, 40% labor savings, 30% less failure. Complete cost-benefit analysis for professional growers.',
      keywords: [
        'calculate roi paper plugs',
        'return on investment nursery',
        'cost-benefit analysis paper trays',
        'paper plug tray investment',
        'break-even calculation',
        'tco total cost ownership',
        'cost-saving growing solutions',
        'paper plugs profitability',
        'professional nursery roi',
        'greenhouse investment'
      ]
    },
    de: {
      title: 'ROI Berechnen Paper Plug Trays: Wann Amortisiert Sich Investition? | Lumora',
      description: 'ROI für Paper Plug Trays berechnen: Break-even innerhalb 6-8 Monaten, 40% Arbeitsersparnis, 30% weniger Ausfall. Vollständige Kosten-Nutzen-Analyse für professionelle Züchter.',
      keywords: [
        'roi berechnen paper plugs',
        'return on investment gärtnerei',
        'kosten-nutzen-analyse paper trays',
        'investition paper plug trays',
        'break-even berechnung',
        'tco gesamtbetriebskosten',
        'kostensparende anbaulösungen',
        'paper plugs rentabilität',
        'professionelle gärtnerei roi',
        'gewächshaus investition'
      ]
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/efficiëntie-roi/roi-berekenen',
    en: '/seo/efficiency-roi/calculate-roi',
    de: '/seo/effizienz-roi/roi-berechnen'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || localePaths.nl
  })
}

// SEO Landing page - Pillar 3, Subpillar 1
export default async function RoiBerekenenPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  return <RoiBerekenenClient locale={params.locale} />
}
