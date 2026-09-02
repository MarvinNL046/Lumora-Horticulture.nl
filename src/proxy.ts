import {NextRequest, NextResponse} from 'next/server'
import {routing, type AppLocale} from './i18n/routing'
import {
  basePathFromLocalizedPath,
  localizePathForLocale,
} from './lib/url-localizations'

const PRIMARY_HOST = 'lumorahorticulture.nl'
const NEXT_INTL_LOCALE_HEADER = 'X-NEXT-INTL-LOCALE'
const LOCALE_PREFERENCE_COOKIE = 'lumora_locale'
const LEGACY_HOST_LOCALES: Record<string, AppLocale> = {
  'lumorahorticulture.com': 'en',
  'www.lumorahorticulture.com': 'en',
  'lumorahorticulture.de': 'de',
  'www.lumorahorticulture.de': 'de',
}

const LOCALE_PREFIX = /^\/(nl|en|de)(?=\/|$)/
const FILE_EXTENSION = /\.[a-z0-9]{2,10}$/i
const NON_LOCALIZED_PATHS = [
  '/handler',
  '/lumora-premium',
  '/neemxpro-2-plus-1-gratis',
]
const LEGACY_BASE_PATH_ALIASES: Record<string, string> = {
  '/privacy-policy': '/privacy',
  '/terms-conditions': '/terms',
}
const PRODUCTION_STOREFRONT_REDIRECTS: Record<string, string> = {
  '/lumora-premium': '/',
  '/lumora-premium/producten': '/producten',
  '/lumora-premium/paperbus': '/stekpluggen-steenwol',
  '/lumora-premium/neemx-pro': '/neemx-pro',
  '/lumora-premium/winkelmand': '/winkelmand',
  '/lumora-premium/afrekenen': '/afrekenen',
}
const DUTCH_PRODUCT_FAMILY_REDIRECTS: Record<string, string> = {
  '/shop/paper-plug-tray-84': '/stekpluggen-steenwol',
  '/shop/paper-plug-tray-104': '/stekpluggen-steenwol',
  '/shop/neemx-pro-10ml': '/neemx-pro',
  '/shop/neemx-pro-30ml': '/neemx-pro',
  '/shop/neemx-pro-50ml': '/neemx-pro',
}

function getHost(request: NextRequest): string {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = forwardedHost?.split(',')[0] || request.headers.get('host') || ''
  return host.trim().toLowerCase().replace(/:\d+$/, '')
}

function stripLocalePrefix(pathname: string): {
  locale?: AppLocale
  pathname: string
} {
  const match = pathname.match(LOCALE_PREFIX)
  if (!match) return {pathname}

  const strippedPath = pathname.slice(match[0].length)
  return {
    locale: match[1] as AppLocale,
    pathname: strippedPath || '/',
  }
}

function canonicalPath(pathname: string, locale: AppLocale): string {
  const basePath = basePathFromLocalizedPath(pathname, locale)
  const canonicalBasePath = LEGACY_BASE_PATH_ALIASES[basePath] || basePath
  return localizePathForLocale(canonicalBasePath, locale)
}

function primaryHostRedirect(
  request: NextRequest,
  locale: AppLocale,
  pathname: string,
) {
  const destination = request.nextUrl.clone()
  destination.protocol = 'https:'
  destination.hostname = PRIMARY_HOST
  destination.port = ''
  destination.pathname = canonicalPath(pathname, locale)
  return NextResponse.redirect(destination, 308)
}

function primaryHostPathRedirect(request: NextRequest, pathname: string) {
  const destination = request.nextUrl.clone()
  destination.protocol = 'https:'
  destination.hostname = PRIMARY_HOST
  destination.port = ''
  destination.pathname = pathname
  return NextResponse.redirect(destination, 308)
}

function isNonLocalizedPath(pathname: string): boolean {
  return NON_LOCALIZED_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )
}

function isAppLocale(value: string | null | undefined): value is AppLocale {
  return value === 'nl' || value === 'en' || value === 'de'
}

function getNonLocalizedLocale(request: NextRequest): AppLocale {
  const requestedLocale = request.nextUrl.searchParams.get('lang')
  if (isAppLocale(requestedLocale)) return requestedLocale

  const savedLocale = request.cookies.get(LOCALE_PREFERENCE_COOKIE)?.value
  return isAppLocale(savedLocale) ? savedLocale : routing.defaultLocale
}

export function proxy(request: NextRequest) {
  const host = getHost(request)
  const incomingPath = request.nextUrl.pathname
  const prefixed = stripLocalePrefix(incomingPath)
  const legacyLocale = LEGACY_HOST_LOCALES[host]
  const bypassLocalization =
    FILE_EXTENSION.test(incomingPath) || isNonLocalizedPath(incomingPath)

  // Keep the non-indexed /lumora-premium routes available on Vercel Preview,
  // but consolidate them onto the final public URLs after production release.
  const productionStorefrontPath = process.env.VERCEL_ENV === 'production'
    ? PRODUCTION_STOREFRONT_REDIRECTS[incomingPath]
    : undefined
  if (productionStorefrontPath) {
    return primaryHostPathRedirect(request, productionStorefrontPath)
  }

  // Consolidate the legacy language domains onto the canonical .nl host.
  if (legacyLocale) {
    if (bypassLocalization) {
      return primaryHostPathRedirect(request, incomingPath)
    }
    const legacyBasePath = basePathFromLocalizedPath(
      prefixed.pathname,
      legacyLocale,
    )
    if (
      legacyLocale === 'en' &&
      (legacyBasePath === '/blog' || legacyBasePath.startsWith('/blog/'))
    ) {
      return primaryHostRedirect(request, 'nl', legacyBasePath)
    }
    return primaryHostRedirect(request, legacyLocale, prefixed.pathname)
  }

  if (bypassLocalization) {
    if (host === `www.${PRIMARY_HOST}`) {
      return primaryHostPathRedirect(request, incomingPath)
    }

    if (FILE_EXTENSION.test(incomingPath)) return NextResponse.next()

    const locale = getNonLocalizedLocale(request)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set(NEXT_INTL_LOCALE_HEADER, locale)
    const response = NextResponse.next({request: {headers: requestHeaders}})
    const requestedLocale = request.nextUrl.searchParams.get('lang')

    if (isAppLocale(requestedLocale)) {
      response.cookies.set(LOCALE_PREFERENCE_COOKIE, requestedLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    }

    return response
  }

  const locale = prefixed.locale || routing.defaultLocale
  const visiblePath = prefixed.pathname
  const basePath = basePathFromLocalizedPath(visiblePath, locale)

  const dutchProductFamilyPath = locale === 'nl'
    ? DUTCH_PRODUCT_FAMILY_REDIRECTS[basePath]
    : undefined
  if (dutchProductFamilyPath) {
    return primaryHostPathRedirect(request, dutchProductFamilyPath)
  }

  // The redesigned NeemX page contains the approved claim-safe copy. Until
  // equivalent translations are reviewed, consolidate EN/DE onto that page.
  if (locale !== 'nl' && basePath === '/neemx-pro') {
    return primaryHostRedirect(request, 'nl', basePath)
  }

  // The blog currently has verified Dutch content and optional German
  // translations, but no English articles. Avoid an indexable soft 404.
  if (
    locale === 'en' &&
    (basePath === '/blog' || basePath.startsWith('/blog/'))
  ) {
    return primaryHostRedirect(request, 'nl', basePath)
  }

  const expectedPath = canonicalPath(visiblePath, locale)

  // Canonicalize www, the redundant /nl prefix and translated path aliases.
  if (
    host === `www.${PRIMARY_HOST}` ||
    prefixed.locale === routing.defaultLocale ||
    incomingPath !== expectedPath
  ) {
    return primaryHostRedirect(request, locale, visiblePath)
  }

  const destination = request.nextUrl.clone()
  destination.pathname = `/${locale}${basePath === '/' ? '' : basePath}`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(NEXT_INTL_LOCALE_HEADER, locale)

  return NextResponse.rewrite(destination, {request: {headers: requestHeaders}})
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel).*)',
  ],
}
