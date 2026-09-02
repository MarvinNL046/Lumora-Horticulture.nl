import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/metadata'
import { StorefrontHomePage } from '@/app/lumora-premium/page'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'
import { localizeStorefrontRoutes, resolveStorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'
import { publicStorefrontRoutes } from '@/app/lumora-premium/_data/routes'

const validLocales = ['nl', 'en', 'de'];

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// CTR-optimized metadata for homepage
export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const metadata = {
    nl: {
      title: 'Stekpluggen Steenwol & NeemXPRO',
      description: 'Professionele stekpluggen van steenwol voor zaaien en stekken, plus NeemXPRO voor botanische bladverzorging. Gratis verzending binnen Nederland, België en Duitsland.',
      keywords: ['stekpluggen', 'stekpluggen steenwol', 'steenwol pluggen', 'paper plug tray 84', 'paper plug tray 104', 'NeemXPRO', 'bladverzorging']
    },
    en: {
      title: 'Paper Plug Trays & NeemXPRO',
      description: 'Professional Paper Plug Trays 84 and 104 for sowing and cuttings, plus NeemXPRO for botanical leaf care. Free shipping within the Netherlands, Belgium and Germany.',
      keywords: ['paper plug trays', 'paper plug tray 84', 'paper plug tray 104', 'NeemXPRO', 'botanical leaf care']
    },
    de: {
      title: 'Paper Plug Trays & NeemXPRO',
      description: 'Professionelle Paper Plug Trays für Aussaat und Stecklinge sowie NeemXPRO zur botanischen Blattpflege. Kostenloser Versand in die Niederlande, nach Belgien und Deutschland.',
      keywords: ['Paper Plug Trays', 'Paper Plug Tray 84', 'Paper Plug Tray 104', 'NeemXPRO', 'botanische Blattpflege']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: '/'
  })
}

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  // Validate locale - return 404 for invalid locales (bot requests, etc.)
  if (!validLocales.includes(params.locale)) {
    notFound();
  }

  const locale = resolveStorefrontLocale(params.locale)
  return (
    <StoreShell>
      <StorefrontHomePage locale={locale} routes={localizeStorefrontRoutes(publicStorefrontRoutes, locale)} />
    </StoreShell>
  )
}
