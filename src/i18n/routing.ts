import {defineRouting} from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['nl', 'en', 'de'],
  defaultLocale: 'nl',
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
})

export type AppLocale = (typeof routing.locales)[number]
