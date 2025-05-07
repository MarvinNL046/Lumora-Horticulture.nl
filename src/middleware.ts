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
  
  // Force set locale param in the URL
  url.pathname = `/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  
  console.log(`Redirecting to: ${url.pathname}`);
  
  // If we have a localized URL, convert it to base path for internal routing
  const basePath = basePathFromLocalizedPath(pathname, locale);
  
  // If we translated the path (it's different from the original), update URL
  if (basePath !== pathname) {
    url.pathname = `/${locale}${basePath}`;
    
    // Keep the original pathname in a custom header for debugging
    const response = NextResponse.rewrite(url);
    response.headers.set('x-original-pathname', pathname);
    response.headers.set('x-localized-from', locale);
    response.headers.set('x-domain-detected', domain);
    return response;
  }
  
  // Force redirecting to the localized route
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  
  // Otherwise, delegate to the next-intl middleware
  const intlMiddleware = createMiddleware({
    locales: ['nl', 'en', 'de'],
    defaultLocale: locale, // Use detected locale as default
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

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
