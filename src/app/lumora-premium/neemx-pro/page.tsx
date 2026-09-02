import type { Metadata } from 'next'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import { ProductDetail } from '../_components/ProductDetail'
import { neemx } from '../_data/products'

const title = 'NeemXPRO | Plantaardig olieconcentraat voor bladverzorging'
const description = 'Hooggeconcentreerde botanische olieblend voor gelijkmatige bladverzorging. Goed te verdelen in water en verkrijgbaar in 10, 30 en 50 ml.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/lumora-premium/neemx-pro' },
  openGraph: {
    title,
    description,
    url: '/lumora-premium/neemx-pro',
    type: 'website',
    images: [{
      url: neemx.usageImage ?? neemx.mainImage,
      alt: 'NeemXPRO plantaardig olieconcentraat in 10, 30 en 50 ml',
    }],
  },
}

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'NeemXPRO',
  description,
  image: [neemx.mainImage, neemx.secondaryImage, neemx.tertiaryImage, neemx.usageImage]
    .filter((image): image is string => Boolean(image))
    .map((image) => `https://lumorahorticulture.nl${image}`),
  url: 'https://lumorahorticulture.nl/lumora-premium/neemx-pro',
  brand: { '@type': 'Brand', name: 'Lumora Horticulture' },
  category: 'Plantaardig olieconcentraat voor bladverzorging',
  offers: neemx.variants.map((variant) => ({
    '@type': 'Offer',
    name: `NeemXPRO ${variant.label}`,
    sku: variant.id,
    price: variant.price.toFixed(2),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    url: 'https://lumorahorticulture.nl/lumora-premium/neemx-pro',
  })),
}

export default function NeemXProPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd) }} />
      <ProductDetail product={neemx} />
    </>
  )
}
