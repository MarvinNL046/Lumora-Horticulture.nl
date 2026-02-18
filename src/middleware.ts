import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { 
  domainLocaleMap, 
  basePathFromLocalizedPath,
  localizePathForLocale
} from './lib/url-localizations';

// Create the next-intl middleware with domain-based configuration
const intlMiddleware = createMiddleware({
  locales: ['nl', 'en', 'de'],
  defaultLocale: 'nl',
  localeDetection: false,
  localePrefix: 'always', // Always use locale prefix internally
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

  // Block requests with file extensions (bots probing for .php, .xml, .env, etc.)
  // The matcher should catch these, but Netlify edge functions may bypass it
  if (/\.[a-z0-9]{2,10}$/i.test(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  // Determine locale from domain
  const locale = domainLocaleMap[domain] || 'nl';
  
  // Check if the path already starts with a locale
  const localeRegex = /^\/(nl|en|de)\b/;
  const hasLocalePrefix = localeRegex.test(pathname);
  
  // For domain-based routing, we need to handle two cases:
  // 1. Development/localhost: Use locale prefixes in URLs
  // 2. Production domains: No locale prefixes in URLs, but internally we need them
  
  if (domain === 'localhost' || domain.includes('netlify.app')) {
    // In development/preview, handle localized URLs
    if (!hasLocalePrefix) {
      // Check if this is a localized path that needs to be converted to base path
      const basePath = basePathFromLocalizedPath(pathname, locale);
      
      // Add the locale prefix for internal routing
      url.pathname = `/${locale}${basePath}`;
      console.log(`Rewriting ${pathname} to ${url.pathname} for locale ${locale}`);
      return NextResponse.rewrite(url);
    }
    
    // If it already has a locale prefix, use standard middleware
    return intlMiddleware(request);
  }
  
  // For production domains
  if (hasLocalePrefix) {
    // If there's already a locale prefix, this is probably an internal redirect
    // Just let next-intl handle it
    return intlMiddleware(request);
  }
  
  // No locale prefix - this is a public URL on a domain
  // We need to internally rewrite it to include the locale prefix
  
  // First, translate the localized path to base path
  const basePath = basePathFromLocalizedPath(pathname, locale);
  
  // Then add the locale prefix for internal routing
  url.pathname = `/${locale}${basePath}`;
  console.log(`Rewriting ${pathname} to ${url.pathname} for locale ${locale}`);
  
  // Rewrite (not redirect) to preserve the clean URL
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip all paths that should not be internationalized
  // Also skip Stack Auth handler routes
  matcher: ['/((?!api|_next|_vercel|handler|.*\\..*).*)']
};