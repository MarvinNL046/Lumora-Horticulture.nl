/**
 * URL Path Localization for Lumora Horticulture
 * 
 * This module provides mappings for translating URL paths between different languages.
 * It enables domain-specific URL paths such as /products/ on the English site but /producten/ on the Dutch site.
 */

// English URL paths (used as the reference/default since they match the file structure)
export const basePaths = {
  home: '',
  about: 'about',
  products: 'products',
  contact: 'contact',
  applications: 'applications',
  // Individual product paths
  tray84: 'products/tray84',
  tray104: 'products/tray104',
  transportbox: 'products/transportbox',
  insertsheets: 'products/insertsheets',
}

// URL path translations for each locale
export const localizedPaths: Record<string, Record<string, string>> = {
  // Dutch paths
  nl: {
    about: 'over-ons',
    products: 'producten',
    applications: 'toepassingen',
    // Individual products in Dutch
    'products/tray84': 'producten/tray84',
    'products/tray104': 'producten/tray104',
    'products/transportbox': 'producten/transportdoos',
    'products/insertsheets': 'producten/inlegvellen',
    // contact is the same in Dutch, no need to translate
  },
  
  // English paths (same as base paths)
  en: {
    // No translation needed as they match the base paths
  },
  
  // German paths
  de: {
    about: 'uber-uns',
    products: 'produkte',
    contact: 'kontakt',
    applications: 'anwendungen',
    // Individual products in German
    'products/tray84': 'produkte/tray84',
    'products/tray104': 'produkte/tray104',
    'products/transportbox': 'produkte/transportbox',
    'products/insertsheets': 'produkte/einlegebogen',
  }
}

// Domain to locale mapping
export const domainLocaleMap: Record<string, string> = {
  'lumorahorticulture.nl': 'nl',
  'lumorahorticulture.com': 'en',
  'lumorahorticulture.de': 'de',
  'lumorahorticulture.netlify.app': 'nl', // Default to Dutch for Netlify previews
  'localhost': 'nl', // Default for local development
}

/**
 * Convert a path from the base path (English) to a localized path
 */
export function localizePathForLocale(path: string, locale: string): string {
  // Clean the path and remove leading/trailing slashes
  const cleanPath = path.replace(/^\/|\/$/g, '');
  
  // If this is the homepage (empty path), return as is
  if (!cleanPath) {
    return '/';
  }
  
  // Check if we have a direct match for the full path
  const localizedPath = localizedPaths[locale]?.[cleanPath];
  if (localizedPath) {
    return '/' + localizedPath;
  }
  
  // Otherwise try to localize the first segment
  const pathSegments = cleanPath.split('/');
  const firstSegment = pathSegments[0];
  
  // Find the localized version of the first segment if it exists
  const localizedFirstSegment = localizedPaths[locale]?.[firstSegment] || firstSegment;
  
  // Replace the first segment with the localized version
  pathSegments[0] = localizedFirstSegment;
  
  // Rebuild the path with localized first segment
  return '/' + pathSegments.join('/');
}

/**
 * Convert a localized path back to its base path (English)
 */
export function basePathFromLocalizedPath(localizedPath: string, locale: string): string {
  // Clean the path and remove leading/trailing slashes
  const cleanPath = localizedPath.replace(/^\/|\/$/g, '');
  
  // If this is the homepage (empty path), return as is
  if (!cleanPath) {
    return '/';
  }
  
  // First check if we have a direct match for the full path
  const localePathMap = localizedPaths[locale] || {};
  for (const [baseKey, localizedValue] of Object.entries(localePathMap)) {
    if (localizedValue === cleanPath) {
      return '/' + baseKey;
    }
  }
  
  // Otherwise try to de-localize the first segment
  const pathSegments = cleanPath.split('/');
  const firstSegment = pathSegments[0];
  
  // Find which base path key this segment corresponds to
  let basePath = firstSegment;
  
  for (const [baseKey, localizedValue] of Object.entries(localePathMap)) {
    if (localizedValue === firstSegment) {
      basePath = baseKey;
      break;
    }
  }
  
  // Replace the first segment with the base path
  pathSegments[0] = basePath;
  
  // Rebuild the path with the base path
  return '/' + pathSegments.join('/');
}

/**
 * Get the localized path for a specific domain
 */
export function getLocalizedPathForDomain(path: string, domain: string): string {
  const locale = domainLocaleMap[domain] || 'nl'; // Default to Dutch if domain not found
  return localizePathForLocale(path, locale);
}

/**
 * Determine the locale from a domain name
 */
export function getLocaleFromDomain(domain: string): string {
  return domainLocaleMap[domain] || 'nl'; // Default to Dutch if domain not found
}
