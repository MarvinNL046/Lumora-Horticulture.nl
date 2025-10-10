import { unstable_setRequestLocale } from 'next-intl/server'
import StekpluggenClient from './StekpluggenClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Generate metadata for Stekpluggen SEO landing page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Stekpluggen - Professionele Propagatie Oplossing | Lumora Horticulture',
      description: 'Professionele stekpluggen voor optimale beworteling en vermeerdering. FP 12+ technologie voor sterke wortelontwikkeling, schimmelwerende bescherming en geen transplantatieschok.',
      keywords: ['stekpluggen', 'propagatie pluggen', 'stekken', 'beworteling', 'vermeerdering', 'wortelontwikkeling', 'fp 12+', 'kweekmateriaal', 'glastuinbouw', 'professionele teelt']
    },
    en: {
      title: 'Cutting Plugs - Professional Propagation Solution | Lumora Horticulture',
      description: 'Professional cutting plugs for optimal rooting and propagation. FP 12+ technology for strong root development, fungal protection and no transplant shock.',
      keywords: ['cutting plugs', 'propagation plugs', 'cuttings', 'rooting', 'propagation', 'root development', 'fp 12+', 'growing media', 'greenhouse', 'professional cultivation']
    },
    de: {
      title: 'Stecklingsplugs - Professionelle Vermehrungslösung | Lumora Horticulture',
      description: 'Professionelle Stecklingsplugs für optimale Bewurzelung und Vermehrung. FP 12+ Technologie für starke Wurzelentwicklung, Pilzschutz und keinen Transplantationsschock.',
      keywords: ['stecklingsplugs', 'vermehrungsplugs', 'stecklinge', 'bewurzelung', 'vermehrung', 'wurzelentwicklung', 'fp 12+', 'anzuchtmedium', 'gewächshaus', 'professioneller anbau']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/stekpluggen/',
    en: '/cutting-plugs/',
    de: '/stecklingsplugs/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/stekpluggen/'
  })
}

// SEO Landing page for Stekpluggen
export default async function StekpluggenPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  const t = messages

  return (
    <StekpluggenClient t={t} locale={params.locale} />
  )
}
