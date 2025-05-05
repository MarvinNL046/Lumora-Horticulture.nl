import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['nl', 'en', 'de'],
  defaultLocale: 'nl',
  
  // Turn off locale detection from Accept-Language header
  localeDetection: false,
  
  // Don't use language prefixes in URLs when using domains
  localePrefix: 'never',
  
  // Define domain configuration
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
      // For Netlify preview and development
      domain: 'lumorahorticulture.netlify.app',
      defaultLocale: 'nl',
    }
  ]
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
