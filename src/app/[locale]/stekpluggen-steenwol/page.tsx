import type { Metadata } from 'next'
import { connection } from 'next/server'
import { productGroupSchema } from '@/lib/storefront-product-seo'
import { PlugComparison } from '@/app/lumora-premium/_components/PlugComparison'
import { ProductDetail } from '@/app/lumora-premium/_components/ProductDetail'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'
import { paperbus } from '@/app/lumora-premium/_data/products'
import { generatePageMetadata } from '@/lib/metadata'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import { resolveStorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'
import { getLocalizedProducts } from '@/app/lumora-premium/_data/storefront-content'

type Props = {
  params: Promise<{ locale: string }>
}

const metadataCopy = {
  nl: { title: 'Steenwol Stekpluggen Kopen | 84 & 104', description: 'Bestel steenwol stekpluggen met Ellepot FP 12+ papierwikkel. Vergelijk 84 en 104 cellen per tray en de doosinhoud. Gratis verzending naar NL, BE en DE.' },
  en: { title: 'Paper Plug Trays 84 & 104', description: 'Professional Paper Plug Trays with Ellepot FP 12+ technology. Compare 84 and 104 cells per tray and order complete boxes with free shipping.' },
  de: { title: 'Paper Plug Trays 84 & 104', description: 'Professionelle Paper Plug Trays mit Ellepot FP 12+ Technologie. Vergleichen Sie 84 und 104 Zellen pro Anzuchtplatte und bestellen Sie komplette Kartons versandkostenfrei.' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const resolvedLocale = resolveStorefrontLocale(locale)
  const copy = metadataCopy[resolvedLocale]

  return generatePageMetadata({
    title: copy.title,
    description: copy.description,
    locale: resolvedLocale,
    path: '/stekpluggen-steenwol',
    keywords: [
      'stekpluggen',
      'stekpluggen steenwol',
      'steenwol pluggen',
      'Paper Plug Tray 84',
      'Paper Plug Tray 104',
      'Ellepot FP 12+',
    ],
    ogImage: paperbus.mainImage,
    availableLocales: ['nl', 'en', 'de'],
  })
}

export default async function StekpluggenSteenwolPage({ params }: Props) {
  // Variant query parameters must be reflected in the server-rendered purchase block.
  await connection()
  const { locale } = await params
  const resolvedLocale = resolveStorefrontLocale(locale)
  const { paperbus: localizedPaperbus } = getLocalizedProducts(resolvedLocale)

  return (
    <StoreShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productGroupSchema(localizedPaperbus, resolvedLocale)) }}
      />
      <ProductDetail product={localizedPaperbus} locale={resolvedLocale}>
        <PlugComparison product={localizedPaperbus} locale={resolvedLocale} />
      </ProductDetail>
    </StoreShell>
  )
}
