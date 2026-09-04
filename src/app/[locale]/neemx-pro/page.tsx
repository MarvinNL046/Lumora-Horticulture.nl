import type { Metadata } from 'next'
import { connection } from 'next/server'
import { productGroupSchema } from '@/lib/storefront-product-seo'
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

export default async function NeemXProPage({ params }: Props) {
  // Variant query parameters must be reflected in the server-rendered purchase block.
  await connection()
  const { locale } = await params
  const resolvedLocale = resolveStorefrontLocale(locale)
  const { neemx: localizedNeemx } = getLocalizedProducts(resolvedLocale)

  return (
    <StoreShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productGroupSchema(localizedNeemx, resolvedLocale)) }}
      />
      <ProductDetail product={localizedNeemx} locale={resolvedLocale} />
    </StoreShell>
  )
}
