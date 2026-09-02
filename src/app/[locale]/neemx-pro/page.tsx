import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/app/lumora-premium/_components/ProductDetail'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'
import { neemx } from '@/app/lumora-premium/_data/products'
import { generatePageMetadata } from '@/lib/metadata'
import { serializeJsonLd } from '@/lib/safe-json-ld'

type Props = {
  params: Promise<{ locale: string }>
}

const title = 'NEEMX PRO plantaardig olieconcentraat'
const description = 'Premium plantaardig olieconcentraat voor bladverzorging, verkrijgbaar in 10, 30 en 50 ml. Ook leverbaar vanaf 1 liter en in grotere volumes op aanvraag.'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (locale !== 'nl') {
    return { robots: { index: false, follow: false } }
  }

  return generatePageMetadata({
    title,
    description,
    locale,
    path: '/neemx-pro',
    keywords: [
      'NEEMX PRO',
      'plantaardig olieconcentraat',
      'botanische olieblend',
      'bladverzorging',
      'plantaardige olie voor planten',
    ],
    ogImage: neemx.usageImage ?? neemx.mainImage,
    availableLocales: ['nl'],
  })
}

const productGroupJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProductGroup',
  name: 'NEEMX PRO',
  description,
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
    name: `NEEMX PRO ${variant.label}`,
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
  if (locale !== 'nl') notFound()

  return (
    <StoreShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productGroupJsonLd) }}
      />
      <ProductDetail product={neemx} />
    </StoreShell>
  )
}
