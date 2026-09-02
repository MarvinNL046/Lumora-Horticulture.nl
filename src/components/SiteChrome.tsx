'use client'

import { usePathname } from 'next/navigation'
import { publicStorefrontPathSet } from '@/app/lumora-premium/_data/routes'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'

// Routes that render their own chrome: the storefront pages wrap themselves in
// StoreShell, the account/auth trees have their own layouts, and the marketing
// landing pages and print flyers ship a standalone design.
const STANDALONE_ROUTES = [
  '/lumora-premium',
  '/neemxpro-2-plus-1-gratis',
  '/handler',
  '/account',
  '/marketing',
  '/admin',
]
const STANDALONE_CHECKOUT_ROUTES = ['/checkout/success', '/checkout/conversion', '/checkout/retry']
const LOCALIZED_STOREFRONT_ROUTES = new Set([
  '/', '/producten', '/products', '/produkte', '/stekpluggen-steenwol',
  '/neemx-pro', '/winkelmand', '/afrekenen',
])

function isStandalonePath(pathname: string | null): boolean {
  if (!pathname) return false
  if (publicStorefrontPathSet.has(pathname)) return true
  const localeAgnosticPath = pathname.replace(/^\/(?:nl|en|de)(?=\/|$)/, '') || '/'
  if (LOCALIZED_STOREFRONT_ROUTES.has(localeAgnosticPath)) return true
  if (STANDALONE_CHECKOUT_ROUTES.some((route) => localeAgnosticPath.startsWith(route))) return true
  return STANDALONE_ROUTES.some(
    (r) => localeAgnosticPath === r || localeAgnosticPath.startsWith(`${r}/`)
  )
}

// Every remaining content page (about, contact, blog, legal, knowledge base)
// uses the same Lumora storefront shell in all three languages, so there is
// no legacy header or footer left anywhere on the site.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (isStandalonePath(pathname)) {
    return <>{children}</>
  }

  return <StoreShell>{children}</StoreShell>
}
