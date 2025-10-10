import { unstable_setRequestLocale } from 'next-intl/server'
import VoordelenNadelenClient from './VoordelenNadelenClient'
import { generatePageMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Voor- en Nadelen van Steenwol | Lumora Horticulture',
      description: 'Ontdek alle voordelen en nadelen van steenwol als teeltsubstraat. Uitstekende waterretentie, pH-stabiliteit en meer. Lees hier de complete gids.',
      keywords: ['voordelen steenwol', 'nadelen steenwol', 'steenwol eigenschappen', 'teeltsubstraat', 'hydrocultuur', 'kweekmateriaal']
    },
    en: {
      title: 'Pros and Cons of Rockwool | Lumora Horticulture',
      description: 'Discover all advantages and disadvantages of rockwool as growing substrate. Excellent water retention, pH stability and more.',
      keywords: ['rockwool advantages', 'rockwool disadvantages', 'rockwool properties', 'growing substrate', 'hydroponics']
    },
    de: {
      title: 'Vor- und Nachteile von Steinwolle | Lumora Horticulture',
      description: 'Entdecken Sie alle Vor- und Nachteile von Steinwolle als Anbausubstrat. Hervorragende Wasserspeicherung, pH-Stabilität und mehr.',
      keywords: ['steinwolle vorteile', 'steinwolle nachteile', 'steinwolle eigenschaften', 'anbausubstrat', 'hydrokultur']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = { nl: '/voordelen-nadelen-steenwol/', en: '/rockwool-pros-cons/', de: '/steinwolle-vor-nachteile/' }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/voordelen-nadelen-steenwol/'
  })
}

export default async function VoordelenNadelenPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  return <VoordelenNadelenClient t={messages} locale={params.locale} />
}
