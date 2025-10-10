import { unstable_setRequestLocale } from 'next-intl/server'
import SteenwolVastzettenClient from './SteenwolVastzettenClient'
import { generatePageMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Hoe Zet je Steenwol Vast? | Praktische Gids | Lumora',
      description: 'Leer hoe je steenwol pluggen correct vastzet in je teeltsysteem. Praktische tips voor bevestiging, plaatsing en optimale groeiresultaten.',
      keywords: ['steenwol vastzetten', 'steenwol bevestigen', 'steenwol plaatsen', 'teeltsysteem', 'hydrocultuur', 'kweektips']
    },
    en: {
      title: 'How to Secure Rockwool? | Practical Guide | Lumora',
      description: 'Learn how to properly secure rockwool plugs in your growing system. Practical tips for mounting, placement and optimal growing results.',
      keywords: ['secure rockwool', 'mount rockwool', 'place rockwool', 'growing system', 'hydroponics', 'growing tips']
    },
    de: {
      title: 'Wie Befestigt Man Steinwolle? | Praktischer Leitfaden | Lumora',
      description: 'Lernen Sie, wie Sie Steinwolle-Stecklinge richtig in Ihrem Anbausystem befestigen. Praktische Tipps für Montage, Platzierung und optimale Ergebnisse.',
      keywords: ['steinwolle befestigen', 'steinwolle montieren', 'steinwolle platzieren', 'anbausystem', 'hydrokultur']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = { nl: '/steenwol-vastzetten/', en: '/securing-rockwool/', de: '/steinwolle-befestigen/' }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/steenwol-vastzetten/'
  })
}

export default async function SteenwolVastzettenPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  return <SteenwolVastzettenClient t={messages} locale={params.locale} />
}
