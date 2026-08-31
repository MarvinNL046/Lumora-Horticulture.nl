import {notFound} from 'next/navigation'
import {hasLocale} from 'next-intl'
import {getRequestConfig} from 'next-intl/server'
import {routing} from './routing'

export default getRequestConfig(async ({locale, requestLocale}) => {
  let resolvedLocale = locale || (await requestLocale)

  if (!resolvedLocale) {
    // Standalone, non-localized routes use the primary Dutch locale.
    resolvedLocale = routing.defaultLocale
  } else if (!hasLocale(routing.locales, resolvedLocale)) {
    notFound()
  }

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}/common.json`)).default,
  }
})
