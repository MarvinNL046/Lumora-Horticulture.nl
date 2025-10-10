import { unstable_setRequestLocale } from 'next-intl/server'
import SteenwolVsRockwoolClient from './SteenwolVsRockwoolClient'
import { generatePageMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Is Steenwol Hetzelfde als ROCKWOOL? | Lumora Horticulture',
      description: 'Ontdek het verschil tussen steenwol en ROCKWOOL. Wat is het verschil tussen het materiaal en het merk? Alle informatie over steenwol pluggen voor professionele teelt.',
      keywords: ['steenwol', 'rockwool', 'verschil steenwol rockwool', 'steenwol merk', 'teeltmateriaal', 'kweekpluggen', 'hydrocultuur', 'glastuinbouw']
    },
    en: {
      title: 'Is Rockwool the Same as Stone Wool? | Lumora Horticulture',
      description: 'Discover the difference between rockwool and stone wool. What is the difference between the material and the brand? All information about rockwool plugs for professional cultivation.',
      keywords: ['rockwool', 'stone wool', 'rockwool difference', 'growing media', 'cultivation plugs', 'hydroponics', 'greenhouse']
    },
    de: {
      title: 'Ist Steinwolle das Gleiche wie ROCKWOOL? | Lumora Horticulture',
      description: 'Entdecken Sie den Unterschied zwischen Steinwolle und ROCKWOOL. Was ist der Unterschied zwischen dem Material und der Marke? Alle Informationen über Steinwolle-Stecklinge.',
      keywords: ['steinwolle', 'rockwool', 'unterschied steinwolle', 'anzuchtmedium', 'hydrokultur', 'gewächshaus']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/steenwol-vs-rockwool/',
    en: '/rockwool-vs-stone-wool/',
    de: '/steinwolle-vs-rockwool/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/steenwol-vs-rockwool/'
  })
}

export default async function SteenwolVsRockwoolPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default

  return <SteenwolVsRockwoolClient t={messages} locale={params.locale} />
}
