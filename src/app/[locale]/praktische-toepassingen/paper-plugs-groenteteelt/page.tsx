import { unstable_setRequestLocale } from 'next-intl/server'
import PaperPlugsGroenteteeltClient from './PageClient'
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
      title: 'Paper Plug Trays voor Groenteteelt: Tomaten, Paprika, Komkommer | Lumora',
      description: 'Professionele groenteteelt met paper plug trays. Optimale celgroottes voor tomaten, paprika, komkommer en aubergine. 30% hogere opbrengst, minder uitval. Bestel direct.',
      keywords: [
        'paper plugs groenteteelt',
        'tomaten kweken paper plugs',
        'paprika propagatie',
        'komkommer kweektrays',
        'groenteteelt professioneel',
        'glastuinbouw groenten',
        'zaailingen tomaten',
        'paprika plantjes kweken',
        'biologische groenteteelt',
        'duurzame groentekweek'
      ]
    },
    en: {
      title: 'Paper Plug Trays for Vegetable Growing: Tomatoes, Peppers, Cucumber | Lumora',
      description: 'Professional vegetable cultivation with paper plug trays. Optimal cell sizes for tomatoes, peppers, cucumber and eggplant. 30% higher yield, less failure. Order direct.',
      keywords: [
        'paper plugs vegetables',
        'growing tomatoes paper plugs',
        'pepper propagation',
        'cucumber growing trays',
        'professional vegetable growing',
        'greenhouse vegetables',
        'tomato seedlings',
        'pepper plant propagation',
        'organic vegetable growing',
        'sustainable vegetable cultivation'
      ]
    },
    de: {
      title: 'Paper Plug Trays für Gemüseanbau: Tomaten, Paprika, Gurken | Lumora',
      description: 'Professioneller Gemüseanbau mit Paper Plug Trays. Optimale Zellgrößen für Tomaten, Paprika, Gurken und Auberginen. 30% höherer Ertrag, weniger Ausfall. Direkt bestellen.',
      keywords: [
        'paper plugs gemüseanbau',
        'tomaten züchten paper plugs',
        'paprika vermehrung',
        'gurken anzuchtschalen',
        'professioneller gemüseanbau',
        'gewächshaus gemüse',
        'tomaten setzlinge',
        'paprika pflanzen züchten',
        'biologischer gemüseanbau',
        'nachhaltiger gemüseanbau'
      ]
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/toepassingen/paper-plugs-groenteteelt',
    en: '/seo/applications/paper-plugs-vegetables',
    de: '/seo/anwendungen/paper-plugs-gemueseanbau'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || localePaths.nl
  })
}

// SEO Landing page - Pillar 2, Subpillar 2.1
export default async function PaperPlugsGroenteteeltPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  return <PaperPlugsGroenteteeltClient locale={params.locale} />
}
