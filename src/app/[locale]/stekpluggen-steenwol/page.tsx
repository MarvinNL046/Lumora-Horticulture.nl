import type { Metadata } from 'next'
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
  nl: { title: 'Stekpluggen Steenwol 84 & 104', description: 'Professionele stekpluggen van steenwol met Ellepot FP 12+ papertechnologie. Vergelijk 84 en 104 cellen per tray en bestel per complete doos met gratis verzending.' },
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

const productGroupJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProductGroup',
  name: metadataCopy.nl.title,
  description: metadataCopy.nl.description,
  url: 'https://lumorahorticulture.nl/stekpluggen-steenwol',
  image: [paperbus.mainImage, paperbus.secondaryImage, paperbus.tertiaryImage]
    .filter((image): image is string => Boolean(image))
    .map((image) => `https://lumorahorticulture.nl${image}`),
  brand: { '@type': 'Brand', name: 'Lumora Horticulture' },
  category: 'Stekpluggen van steenwol',
  productGroupID: 'stekpluggen-steenwol',
  variesBy: 'https://schema.org/size',
  hasVariant: paperbus.variants.map((variant) => ({
    '@type': 'Product',
    name: variant.label,
    sku: variant.slug,
    size: `${variant.cellsPerTray} cellen`,
    description: variant.description,
    offers: {
      '@type': 'Offer',
      price: variant.price.toFixed(2),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: 'https://lumorahorticulture.nl/stekpluggen-steenwol',
    },
  })),
}

export default async function StekpluggenSteenwolPage({ params }: Props) {
  const { locale } = await params
  const resolvedLocale = resolveStorefrontLocale(locale)
  const { paperbus: localizedPaperbus } = getLocalizedProducts(resolvedLocale)

  return (
    <StoreShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productGroupJsonLd) }}
      />
      <ProductDetail product={localizedPaperbus} locale={resolvedLocale} />
    </StoreShell>
  )
}
