import type { Metadata } from 'next'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import { ProductDetail } from '../_components/ProductDetail'
import { neemx } from '../_data/products'

const title = 'NEEMX PRO | Plantaardig olieconcentraat voor bladverzorging'
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
    images: [{ url: neemx.mainImage, alt: 'NEEMX PRO plantaardig olieconcentraat voor bladverzorging' }],
  },
}

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'NEEMX PRO',
  description,
  image: `https://lumorahorticulture.nl${neemx.mainImage}`,
  url: 'https://lumorahorticulture.nl/lumora-premium/neemx-pro',
  brand: { '@type': 'Brand', name: 'Lumora Horticulture' },
  category: 'Plantaardig olieconcentraat voor bladverzorging',
  offers: neemx.variants.map((variant) => ({
    '@type': 'Offer',
    name: `NEEMX PRO ${variant.label}`,
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
