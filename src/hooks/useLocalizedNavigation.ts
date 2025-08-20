'use client'

import { usePathname, useParams } from 'next/navigation'
import { 
  localizePathForLocale,
  basePathFromLocalizedPath,
  domainLocaleMap
} from '@/lib/url-localizations'

// Domain to locale mapping for URL generation
const localeMap = {
  nl: 'lumorahorticulture.nl',
  en: 'lumorahorticulture.com',
  de: 'lumorahorticulture.de'
}

const defaultLocale = 'nl'

export function useLocalizedNavigation() {
  const pathname = usePathname() || ''
  const params = useParams()
  
  // Get current locale from URL or domain
  const getCurrentLocale = (): string => {
    // If we have a locale in the URL params, use that
    if (params?.locale) {
      return params.locale as string;
    }
    
    // Otherwise try to determine from domain
    if (typeof window !== 'undefined') {
      return domainLocaleMap[window.location.hostname] || defaultLocale;
    }
    
    return defaultLocale;
  }
  
  const currentLocale = getCurrentLocale()
  
  // Get the path without the locale prefix and convert to base path
  const getPathWithoutLocale = (): string => {
    let cleanPath = pathname;
    
    // Remove the locale prefix if present
    if (cleanPath.startsWith('/' + currentLocale + '/')) {
      cleanPath = cleanPath.substring(('/' + currentLocale).length);
    } else if (cleanPath.startsWith('/' + currentLocale)) {
      cleanPath = '/';
    }
    
    // Convert localized path back to base path
    return basePathFromLocalizedPath(cleanPath, currentLocale);
  }
  
  const pathWithoutLocale = getPathWithoutLocale()
  
  // Generate localized URL for current locale
  const localizedUrl = (path: string): string => {
    return localizePathForLocale(path, currentLocale)
  }
  
  // Create a link for a different locale (for language switchers)
  const createLocalizedUrl = (locale: string, targetPath?: string): string => {
    const domain = localeMap[locale as keyof typeof localeMap];
    const pathToUse = targetPath || pathWithoutLocale;
    
    // Convert the current path back to base path if needed
    let basePath = pathToUse;
    if (pathToUse.startsWith(`/${currentLocale}/`)) {
      basePath = pathToUse.substring(`/${currentLocale}`.length);
    } else if (pathToUse === `/${currentLocale}`) {
      basePath = '/';
    }
    
    // Get base path from potentially localized path
    basePath = basePathFromLocalizedPath(basePath, currentLocale);
    
    // Then localize it for the target locale
    const localizedPath = localizePathForLocale(basePath, locale);
    
    // For local development, use locale in path
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('netlify.app'))) {
      return `/${locale}${localizedPath}`;
    }
    
    // For production, use full domain
    return `https://${domain}${localizedPath}`;
  }
  
  // Helper to get current locale from pathname
  const getCurrentLocaleFromPath = (path: string): string => {
    const match = path.match(/^\/(nl|en|de)/);
    return match ? match[1] : defaultLocale;
  }
  
  return {
    currentLocale,
    pathWithoutLocale,
    localizedUrl,
    createLocalizedUrl
  }
}