export type StorefrontRoutes = {
  home: string
  products: string
  stekpluggen: string
  neemx: string
  cart: string
  checkout: string
}

export const publicStorefrontRoutes: StorefrontRoutes = {
  home: '/',
  products: '/producten',
  stekpluggen: '/stekpluggen-steenwol',
  neemx: '/neemx-pro',
  cart: '/winkelmand',
  checkout: '/afrekenen',
}

export const previewStorefrontRoutes: StorefrontRoutes = {
  home: '/lumora-premium',
  products: '/lumora-premium/producten',
  stekpluggen: '/lumora-premium/paperbus',
  neemx: '/lumora-premium/neemx-pro',
  cart: '/lumora-premium/winkelmand',
  checkout: '/lumora-premium/afrekenen',
}

export function isPreviewStorefrontPath(pathname: string | null): boolean {
  return pathname === previewStorefrontRoutes.home || Boolean(
    pathname?.startsWith(`${previewStorefrontRoutes.home}/`),
  )
}

export function getStorefrontRoutes(pathname: string | null): StorefrontRoutes {
  return isPreviewStorefrontPath(pathname)
    ? previewStorefrontRoutes
    : publicStorefrontRoutes
}

export const publicStorefrontPathSet = new Set<string>(
  Object.values(publicStorefrontRoutes),
)
