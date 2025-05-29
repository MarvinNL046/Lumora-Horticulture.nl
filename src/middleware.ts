import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { 
  domainLocaleMap, 
  basePathFromLocalizedPath,
  localizePathForLocale
} from './lib/url-localizations';

/**
 * Get host from request (handling localhost with port)
 */
function getHost(request: NextRequest): string {
  const host = request.headers.get('host') || '';
  // For localhost, remove the port
  return host.replace(/:\d+$/, '');
}

/**
 * Extract domain without subdomain
 */
function extractDomain(host: string): string {
  // Extract domain name (without port)
  const domain = host.split(':')[0];
  
  // Handle different domain variations
  if (domain.includes('lumorahorticulture.nl')) return 'lumorahorticulture.nl';
  if (domain.includes('lumorahorticulture.com')) return 'lumorahorticulture.com';
  if (domain.includes('lumorahorticulture.de')) return 'lumorahorticulture.de';
  if (domain.includes('lumorahorticulture.netlify.app')) return 'lumorahorticulture.netlify.app';
  
  // Default fallback
  return domain;
}

/**
 * The Next.js middleware function
 */
export function middleware(request: NextRequest) {
  const host = getHost(request);
  const domain = extractDomain(host);
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  
  console.log(`Middleware processing: Domain: ${domain}, Path: ${pathname}`);
  
  // Determine locale from domain
  const locale = domainLocaleMap[domain] || 'nl';
  console.log(`Selected locale: ${locale} for domain: ${domain}`);
  
  // Check if the path already starts with a locale
  const localeRegex = /^\/(nl|en|de)\b/;
  const hasLocalePrefix = localeRegex.test(pathname);
  
  if (hasLocalePrefix) {
    // Path already has locale prefix, let next-intl handle it
    console.log(`Path already has locale prefix: ${pathname}`);
    
    const intlMiddleware = createMiddleware({
      locales: ['nl', 'en', 'de'],
      defaultLocale: locale,
      localeDetection: false,
      localePrefix: 'as-needed',
      domains: [
        {
          domain: 'lumorahorticulture.nl',
          defaultLocale: 'nl',
        },
        {
          domain: 'lumorahorticulture.com',
          defaultLocale: 'en',
        },
        {
          domain: 'lumorahorticulture.de',
          defaultLocale: 'de',
        },
        {
          domain: 'lumorahorticulture.netlify.app',
          defaultLocale: 'nl',
        }
      ]
    });

    return intlMiddleware(request);
  }
  
  // Path doesn't have locale prefix, add it
  console.log(`Adding locale prefix to: ${pathname}`);
  
  // If we have a localized URL, convert it to base path for internal routing
  const basePath = basePathFromLocalizedPath(pathname, locale);
  
  // If we translated the path (it's different from the original), update URL
  if (basePath !== pathname) {
    url.pathname = `/${locale}${basePath}`;
    console.log(`Redirecting translated path to: ${url.pathname}`);
    
    // Keep the original pathname in a custom header for debugging
    const response = NextResponse.rewrite(url);
    response.headers.set('x-original-pathname', pathname);
    response.headers.set('x-localized-from', locale);
    response.headers.set('x-domain-detected', domain);
    return response;
  }
  
  // Force redirecting to the localized route
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  console.log(`Redirecting to: ${url.pathname}`);
  
  return NextResponse.redirect(url);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
