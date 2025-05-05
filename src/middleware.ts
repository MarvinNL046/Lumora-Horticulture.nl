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
 * The Next.js middleware function
 */
export function middleware(request: NextRequest) {
  const host = getHost(request);
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  
  // Determine locale from domain
  const locale = domainLocaleMap[host] || 'nl';
  
  // If we have a localized URL, convert it to base path for internal routing
  const basePath = basePathFromLocalizedPath(pathname, locale);
  
  // If we translated the path (it's different from the original), update URL
  if (basePath !== pathname) {
    url.pathname = basePath;
    
    // Keep the original pathname in a custom header for debugging
    const response = NextResponse.rewrite(url);
    response.headers.set('x-original-pathname', pathname);
    response.headers.set('x-localized-from', locale);
    return response;
  }
  
  // Otherwise, delegate to the next-intl middleware
  const intlMiddleware = createMiddleware({
    locales: ['nl', 'en', 'de'],
    defaultLocale: 'nl',
    localeDetection: false,
    localePrefix: 'never',
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
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
