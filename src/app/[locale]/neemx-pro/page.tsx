import type { Metadata } from 'next'
import { ProductDetail } from '@/app/lumora-premium/_components/ProductDetail'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'
import { neemx } from '@/app/lumora-premium/_data/products'
import { generatePageMetadata } from '@/lib/metadata'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import { resolveStorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'
import { getLocalizedProducts } from '@/app/lumora-premium/_data/storefront-content'

type Props = {
  params: Promise<{ locale: string }>
}

const metadataCopy = {
  nl: { title: 'NeemXPRO plantaardig olieconcentraat', description: 'Premium plantaardig olieconcentraat voor bladverzorging, verkrijgbaar in 10, 30 en 50 ml. Ook leverbaar vanaf 1 liter en in grotere volumes op aanvraag.' },
  en: { title: 'NeemXPRO plant-based oil concentrate', description: 'Premium plant-based oil concentrate for leaf care, available in 10, 30 and 50 ml. Also available from 1 litre and in larger volumes on request.' },
  de: { title: 'NeemXPRO pflanzliches Ölkonzentrat', description: 'Hochwertiges pflanzliches Ölkonzentrat zur Blattpflege, erhältlich in 10, 30 und 50 ml. Auf Anfrage auch ab 1 Liter und in größeren Mengen lieferbar.' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const resolvedLocale = resolveStorefrontLocale(locale)
  const copy = metadataCopy[resolvedLocale]

  return generatePageMetadata({
    title: copy.title,
    description: copy.description,
    locale: resolvedLocale,
    path: '/neemx-pro',
    keywords: [
      'NeemXPRO',
      'plantaardig olieconcentraat',
      'botanische olieblend',
      'bladverzorging',
      'plantaardige olie voor planten',
    ],
    ogImage: neemx.usageImage ?? neemx.mainImage,
    availableLocales: ['nl', 'en', 'de'],
  })
}

const productGroupJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProductGroup',
  name: 'NeemXPRO',
  description: metadataCopy.nl.description,
  url: 'https://lumorahorticulture.nl/neemx-pro',
  image: [neemx.mainImage, neemx.secondaryImage, neemx.tertiaryImage, neemx.usageImage]
    .filter((image): image is string => Boolean(image))
    .map((image) => `https://lumorahorticulture.nl${image}`),
  brand: { '@type': 'Brand', name: 'Lumora Horticulture' },
  category: 'Plantaardig olieconcentraat voor bladverzorging',
  productGroupID: 'neemx-pro',
  variesBy: 'https://schema.org/size',
  hasVariant: neemx.variants.map((variant) => ({
    '@type': 'Product',
    name: `NeemXPRO ${variant.label}`,
    sku: variant.slug,
    size: variant.label,
    offers: {
      '@type': 'Offer',
      price: variant.price.toFixed(2),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: 'https://lumorahorticulture.nl/neemx-pro',
    },
  })),
}

export default async function NeemXProPage({ params }: Props) {
  const { locale } = await params
  const resolvedLocale = resolveStorefrontLocale(locale)
  const { neemx: localizedNeemx } = getLocalizedProducts(resolvedLocale)

  return (
    <StoreShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productGroupJsonLd) }}
      />
      <ProductDetail product={localizedNeemx} locale={resolvedLocale} />
    </StoreShell>
  )
}
