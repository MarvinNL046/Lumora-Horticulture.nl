import AboutClient from './AboutClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Generate metadata for about page
export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const metadata = {
    nl: {
      title: 'Over Ons - Directe Fabrikant van Steenwol Pluggen',
      description: 'Lumora Horticulture: eigen productie van steenwol pluggen en kweektrays. B2B specialist voor professionele kwekers. Direct van de fabrikant, Europese kwaliteit.',
      keywords: ['over lumora horticulture', 'steenwol pluggen fabrikant', 'eigen productie', 'B2B tuinbouw leverancier', 'directe fabrikant']
    },
    en: {
      title: 'About Lumora Horticulture',
      description: 'Meet Lumora Horticulture, specialist in professional Paper Plug Trays and targeted botanical plant care for growers and plant enthusiasts.',
      keywords: ['about lumora horticulture', 'paper plug trays', 'horticulture supplier', 'botanical plant care']
    },
    de: {
      title: 'Über Lumora Horticulture',
      description: 'Lernen Sie Lumora Horticulture kennen, Spezialist für professionelle Paper Plug Trays und gezielte botanische Pflanzenpflege.',
      keywords: ['über lumora horticulture', 'Paper Plug Trays', 'Gartenbau Lieferant', 'botanische Pflanzenpflege']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/over-ons/',
    en: '/about/',
    de: '/uber-uns/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/over-ons/'
  })
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  // This is needed for internationalization to work properly

  // Load messages manually for static export
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default

  // Pull about translations from the messages
  const t = messages.about || {}

  return (
    <AboutClient t={t} locale={params.locale} />
  )
}
