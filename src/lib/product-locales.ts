export const PRODUCT_LOCALES = ['nl', 'en', 'de'] as const

export type ProductLocale = (typeof PRODUCT_LOCALES)[number]

type TranslatableProduct = {
  name_en?: string | null
  description_en?: string | null
  name_de?: string | null
  description_de?: string | null
}

function hasText(value: string | null | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

export function getAvailableProductLocales(
  product: TranslatableProduct,
): ProductLocale[] {
  const locales: ProductLocale[] = ['nl']

  if (hasText(product.name_en) && hasText(product.description_en)) {
    locales.push('en')
  }
  if (hasText(product.name_de) && hasText(product.description_de)) {
    locales.push('de')
  }

  return locales
}

export function hasProductLocale(
  product: TranslatableProduct,
  locale: string,
): locale is ProductLocale {
  return getAvailableProductLocales(product).includes(locale as ProductLocale)
}
