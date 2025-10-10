import { unstable_setRequestLocale } from 'next-intl/server'
import SteenwolPluggenClient from './SteenwolPluggenClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Generate metadata for Steenwol Pluggen SEO landing page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Steenwol Pluggen - Hydrocultuur Kweekoplossing | Lumora Horticulture',
      description: 'Professionele steenwol pluggen voor hydrocultuur en glastuinbouw. FP 12+ technologie voor optimale wateropname, wortelontwikkeling en schimmelwerende bescherming.',
      keywords: ['steenwol pluggen', 'rockwool plugs', 'hydrocultuur', 'glastuinbouw', 'propagatie', 'wortelontwikkeling', 'fp 12+', 'kweekmateriaal', 'professionele teelt', 'wateropname']
    },
    en: {
      title: 'Rockwool Plugs - Hydroponic Growing Solution | Lumora Horticulture',
      description: 'Professional rockwool plugs for hydroponics and greenhouse cultivation. FP 12+ technology for optimal water absorption, root development and fungal protection.',
      keywords: ['rockwool plugs', 'hydroponics', 'greenhouse cultivation', 'propagation', 'root development', 'fp 12+', 'growing media', 'professional cultivation', 'water absorption']
    },
    de: {
      title: 'Steinwolle Stecklinge - Hydrokultur Anbaulösung | Lumora Horticulture',
      description: 'Professionelle Steinwolle-Stecklinge für Hydrokultur und Gewächshausanbau. FP 12+ Technologie für optimale Wasseraufnahme, Wurzelentwicklung und Pilzschutz.',
      keywords: ['steinwolle stecklinge', 'hydrokultur', 'gewächshausanbau', 'vermehrung', 'wurzelentwicklung', 'fp 12+', 'anzuchtmedium', 'professioneller anbau', 'wasseraufnahme']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/steenwol-pluggen/',
    en: '/rockwool-plugs/',
    de: '/steinwolle-stecklinge/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/steenwol-pluggen/'
  })
}

// SEO Landing page for Steenwol Pluggen
export default async function SteenwolPluggenPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  const t = messages

  return (
    <SteenwolPluggenClient t={t} locale={params.locale} />
  )
}
