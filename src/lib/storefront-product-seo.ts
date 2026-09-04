import type { ProductFamily } from '@/app/lumora-premium/_data/products'
import { localizePathForLocale } from './url-localizations'

const origin = 'https://lumorahorticulture.nl'

export function resolveProductVariant(product: ProductFamily, value?: string | string[] | null) {
  return product.variants.find((variant) => variant.id === value) ?? product.variants[0]
}

export function productVariantHref(path: string, variantId: string) {
  return `${path}?variant=${encodeURIComponent(variantId)}`
}

// The same localized catalog supplies the page, variant chooser and markup.
// Availability is omitted until it can be sourced reliably from the live catalog.
export function productGroupSchema(product: ProductFamily, locale: string) {
  const path = localizePathForLocale(product.href, locale)
  const url = `${origin}${path}`
  const absoluteImage = (image: string) => new URL(image, origin).href
  return {
    '@context': 'https://schema.org',
    '@type': 'ProductGroup',
    '@id': `${url}#product-group`,
    name: product.name,
    description: product.description,
    url,
    image: [absoluteImage(product.mainImage)],
    brand: { '@type': 'Brand', name: 'Lumora Horticulture' },
    productGroupID: product.href.replace(/^\//, ''),
    variesBy: 'https://schema.org/size',
    hasVariant: product.variants.map((variant) => {
      const variantUrl = productVariantHref(url, variant.id)
      return {
        '@type': 'Product',
        '@id': `${variantUrl}#product`,
        name: product.id === 'neemx' ? `NeemXPRO ${variant.label}` : variant.label,
        description: variant.description ?? `${product.description} ${variant.detail}`,
        url: variantUrl,
        image: (variant.images?.length ? variant.images.map((image) => image.src) : [product.mainImage]).map(absoluteImage),
        sku: variant.slug,
        size: product.id === 'paperbus' ? `${variant.cellsPerTray}` : variant.label,
        isVariantOf: { '@id': `${url}#product-group` },
        offers: {
          '@type': 'Offer',
          price: variant.price.toFixed(2),
          priceCurrency: 'EUR',
          itemCondition: 'https://schema.org/NewCondition',
          url: variantUrl,
          seller: { '@type': 'Organization', name: 'Lumora Horticulture' },
          shippingDetails: ['NL', 'BE', 'DE'].map((country) => ({
            '@type': 'OfferShippingDetails',
            shippingDestination: { '@type': 'DefinedRegion', addressCountry: country },
            shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'EUR' },
          })),
        },
      }
    }),
  }
}
