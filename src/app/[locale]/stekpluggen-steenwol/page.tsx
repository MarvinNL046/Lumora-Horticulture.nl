import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/app/lumora-premium/_components/ProductDetail'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'
import { paperbus } from '@/app/lumora-premium/_data/products'
import { generatePageMetadata } from '@/lib/metadata'
import { serializeJsonLd } from '@/lib/safe-json-ld'

type Props = {
  params: Promise<{ locale: string }>
}

const title = 'Stekpluggen Steenwol 84 & 104'
const description = 'Professionele stekpluggen van steenwol met Ellepot FP 12+ papertechnologie. Vergelijk 84 en 104 cellen per tray en bestel per complete doos met gratis verzending.'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  if (locale !== 'nl') {
    return { robots: { index: false, follow: false } }
  }

  return generatePageMetadata({
    title,
    description,
    locale,
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
    availableLocales: ['nl'],
  })
}

const productGroupJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProductGroup',
  name: title,
  description,
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
  if (locale !== 'nl') notFound()

  return (
    <StoreShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productGroupJsonLd) }}
      />
      <ProductDetail product={paperbus} />
    </StoreShell>
  )
}
