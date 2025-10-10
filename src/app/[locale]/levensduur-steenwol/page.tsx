import { unstable_setRequestLocale } from 'next-intl/server'
import LevensduurSteenwolClient from './LevensduurSteenwolClient'
import { generatePageMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Levensduur van Steenwol | Hoe Lang Gaat Het Mee? | Lumora',
      description: 'Wat is de levensduur van steenwol pluggen? Hoe lang kun je ze gebruiken? Alles over duurzaamheid, hergebruik en onderhoud van steenwol.',
      keywords: ['levensduur steenwol', 'steenwol hergebruiken', 'duurzaamheid steenwol', 'steenwol onderhoud', 'fp 12+']
    },
    en: {
      title: 'Lifespan of Rockwool | How Long Does It Last? | Lumora',
      description: 'What is the lifespan of rockwool plugs? How long can you use them? Everything about durability, reuse and maintenance of rockwool.',
      keywords: ['rockwool lifespan', 'reuse rockwool', 'rockwool durability', 'rockwool maintenance', 'fp 12+']
    },
    de: {
      title: 'Lebensdauer von Steinwolle | Wie Lange Hält Sie? | Lumora',
      description: 'Was ist die Lebensdauer von Steinwolle-Stecklingen? Wie lange können Sie sie verwenden? Alles über Haltbarkeit, Wiederverwendung und Wartung.',
      keywords: ['steinwolle lebensdauer', 'steinwolle wiederverwenden', 'steinwolle haltbarkeit', 'fp 12+']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = { nl: '/levensduur-steenwol/', en: '/rockwool-lifespan/', de: '/steinwolle-lebensdauer/' }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/levensduur-steenwol/'
  })
}

export default async function LevensduurSteenwolPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  return <LevensduurSteenwolClient t={messages} locale={params.locale} />
}
