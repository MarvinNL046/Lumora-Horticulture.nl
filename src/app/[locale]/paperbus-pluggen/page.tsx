import { unstable_setRequestLocale } from 'next-intl/server'
import PaperbusPluggenClient from './PaperbusPluggenClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// CTR-optimized metadata for Paperbus Pluggen SEO landing page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Paperbus Pluggen | 100% Biologisch Afbreekbaar | Gratis Verzending',
      description: 'Duurzame paperbus pluggen met FP 12+ technologie. ✓ 100% biologisch afbreekbaar ✓ Geen transplantatieschok ✓ Gratis verzending NL/BE/DE ✓ Op voorraad. Bestel direct bij Lumora.',
      keywords: ['paperbus pluggen', 'paperbus pluggen kopen', 'paper plug', 'biologisch afbreekbaar', 'duurzaam', 'propagatie pluggen', 'kweekmateriaal', 'glastuinbouw', 'fp 12+']
    },
    en: {
      title: 'Paper Pot Plugs | 100% Biodegradable | Free Shipping',
      description: 'Sustainable paper pot plugs with FP 12+ technology. ✓ 100% biodegradable ✓ No transplant shock ✓ Free shipping NL/BE/DE ✓ In stock. Order directly from Lumora.',
      keywords: ['paper pot plugs', 'buy paper pot plugs', 'paper plug', 'biodegradable', 'sustainable', 'propagation plugs', 'cultivation media', 'greenhouse', 'fp 12+']
    },
    de: {
      title: 'Papiertopf Plugs | 100% Biologisch Abbaubar | Kostenloser Versand',
      description: 'Nachhaltige Papiertopf-Plugs mit FP 12+ Technologie. ✓ 100% biologisch abbaubar ✓ Kein Transplantationsschock ✓ Kostenloser Versand NL/BE/DE ✓ Auf Lager. Direkt bei Lumora bestellen.',
      keywords: ['papiertopf plugs', 'papiertopf plugs kaufen', 'papier plugs', 'biologisch abbaubar', 'nachhaltig', 'anzucht plugs', 'anbaumedium', 'gewachshaus', 'fp 12+']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/paperbus-pluggen/',
    en: '/paper-pot-plugs/',
    de: '/papiertopf-stecker/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/paperbus-pluggen/'
  })
}

// SEO Landing page for Paperbus Pluggen
export default async function PaperbusPluggenPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  const t = messages

  return (
    <PaperbusPluggenClient t={t} locale={params.locale} />
  )
}
