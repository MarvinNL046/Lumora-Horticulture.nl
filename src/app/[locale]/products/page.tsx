import { generatePageMetadata } from '@/lib/metadata'
import { StorefrontProductsPage } from '@/app/lumora-premium/producten/page'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'
import { localizeStorefrontRoutes, resolveStorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'
import { publicStorefrontRoutes } from '@/app/lumora-premium/_data/routes'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// CTR-optimized metadata for products page
export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const metadata = {
    nl: {
      title: 'Stekpluggen Steenwol & NeemX Pro',
      description: 'Vergelijk Stekpluggen Steenwol 84 en 104 met exacte tray- en doosinhoud, of kies NeemX Pro voor botanische bladverzorging.',
      keywords: ['stekpluggen', 'stekpluggen steenwol', 'paper plug tray 84', 'paper plug tray 104', 'NeemX Pro', 'botanische bladverzorging']
    },
    en: {
      title: 'Paper Plug Trays & NeemX Pro',
      description: 'Compare Paper Plug Tray 84 and 104 with exact tray and box contents, or choose NeemX Pro for botanical leaf care.',
      keywords: ['paper plug tray 84', 'paper plug tray 104', 'rockwool cutting plugs', 'ellepot fp 12+', 'NeemX Pro', 'botanical leaf care']
    },
    de: {
      title: 'Paper Plug Trays & NeemX Pro',
      description: 'Vergleichen Sie Paper Plug Tray 84 und 104 mit genauen Anzuchtplatten- und Kartoninhalten oder wählen Sie NeemX Pro zur botanischen Blattpflege.',
      keywords: ['paper plug tray 84', 'paper plug tray 104', 'Steinwoll-Stecklingsplugs', 'Ellepot FP 12+', 'NeemX Pro', 'botanische Blattpflege']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/producten/',
    en: '/products/',
    de: '/produkte/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/producten/'
  })
}

// Product page component with modern styling
export default async function ProductsPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  const locale = resolveStorefrontLocale(params.locale)
  return (
    <StoreShell>
      <StorefrontProductsPage locale={locale} routes={localizeStorefrontRoutes(publicStorefrontRoutes, locale)} />
    </StoreShell>
  )
}
