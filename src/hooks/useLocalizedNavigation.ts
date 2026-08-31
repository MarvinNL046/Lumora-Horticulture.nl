'use client'

import { usePathname, useParams } from 'next/navigation'
import {
  localizePathForLocale,
  basePathFromLocalizedPath
} from '@/lib/url-localizations'

const defaultLocale = 'nl'

export function useLocalizedNavigation() {
  const pathname = usePathname() || ''
  const params = useParams()

  // Get current locale from the internal route params or visible prefix.
  const getCurrentLocale = (): string => {
    // If we have a locale in the URL params, use that
    if (params?.locale) {
      return params.locale as string;
    }

    const match = pathname.match(/^\/(nl|en|de)(?=\/|$)/)
    return match?.[1] || defaultLocale
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

    return localizedPath
  }

  return {
    currentLocale,
    pathWithoutLocale,
    localizedUrl,
    createLocalizedUrl
  }
}
