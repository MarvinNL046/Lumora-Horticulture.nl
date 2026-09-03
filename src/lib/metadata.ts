import { Metadata } from 'next'
import {
  basePathFromLocalizedPath,
  localizePathForLocale,
} from './url-localizations'

interface GenerateMetadataParams {
  title: string
  description: string
  locale: string
  path?: string
  keywords?: string[]
  ogImage?: string
  availableLocales?: readonly SupportedLocale[]
}

const siteOrigin = 'https://lumorahorticulture.nl'
const supportedLocales = ['nl', 'en', 'de'] as const
type SupportedLocale = (typeof supportedLocales)[number]

export function generatePageMetadata({
  title,
  description,
  locale,
  path = '',
  keywords = [],
  ogImage = '/logo/lumura-horticulture-logo.jpeg',
  availableLocales = supportedLocales,
}: GenerateMetadataParams): Metadata {
  const basePath = basePathFromLocalizedPath(path || '/', locale)
  const localizedPaths = {
    nl: localizePathForLocale(basePath, 'nl'),
    en: localizePathForLocale(basePath, 'en'),
    de: localizePathForLocale(basePath, 'de'),
  }
  const localizedPath =
    localizedPaths[locale as keyof typeof localizedPaths] || localizedPaths.nl
  const url = `${siteOrigin}${localizedPath}`
  const alternateLocales = availableLocales.filter((candidate) =>
    supportedLocales.includes(candidate),
  )
  const defaultLocale = alternateLocales.includes('nl')
    ? 'nl'
    : alternateLocales[0] || 'nl'
  const languageAlternates = {
    ...Object.fromEntries(
      alternateLocales.map((candidate) => [
        candidate,
        `${siteOrigin}${localizedPaths[candidate]}`,
      ]),
    ),
    'x-default': `${siteOrigin}${localizedPaths[defaultLocale]}`,
  }

  // Add default B2B keywords based on locale
  const defaultKeywords = {
    nl: ['professionele tuinbouw', 'stekpluggen steenwol', 'paper plug trays', 'NeemXPRO', 'leverancier'],
    en: ['B2B', 'wholesale', 'professional horticulture', 'supplier', 'manufacturer'],
    de: ['B2B', 'Großhandel', 'professioneller Gartenbau', 'Lieferant', 'Hersteller']
  }

  const allKeywords = [...(defaultKeywords[locale as keyof typeof defaultKeywords] || defaultKeywords.nl), ...keywords]

  return {
    title: `${title} | Lumora Horticulture`,
    description,
    keywords: allKeywords.join(', '),
    openGraph: {
      title: `${title} | Lumora Horticulture`,
      description,
      url,
      siteName: 'Lumora Horticulture',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Lumora Horticulture - Professional Horticultural Solutions'
        }
      ],
      locale: locale === 'nl' ? 'nl_NL' : locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Lumora Horticulture`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
      languages: languageAlternates,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'SpcTizFlTiNDDn9CpPqJ6O5Xjz2ivcEWKt3QHtxQgpQ',
    },
  }
}

// Product-specific metadata generator
export function generateProductMetadata(
  productName: string,
  productType: string,
  locale: string,
  path: string
): Metadata {
  const descriptions = {
    nl: `${productName} - Professionele ${productType} voor B2B groothandel. Direct van de fabrikant. Bestel steenwol pluggen en kweektrays voor glastuinbouw bij Lumora Horticulture.`,
    en: `${productName} - Professional ${productType} for B2B wholesale. Direct from manufacturer. Order rockwool plugs and growing trays for greenhouse horticulture at Lumora Horticulture.`,
    de: `${productName} - Professionelle ${productType} für B2B-Großhandel. Direkt vom Hersteller. Bestellen Sie Steinwollstecker und Anzuchtschalen für Gewächshausgartenbau bei Lumora Horticulture.`
  }

  const keywords = {
    nl: [productName, productType, 'steenwol pluggen', 'kweektrays', 'glastuinbouw', 'tuinbouw groothandel'],
    en: [productName, productType, 'rockwool plugs', 'growing trays', 'greenhouse', 'horticulture wholesale'],
    de: [productName, productType, 'Steinwollstecker', 'Anzuchtschalen', 'Gewächshaus', 'Gartenbau Großhandel']
  }

  return generatePageMetadata({
    title: productName,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.nl,
    keywords: keywords[locale as keyof typeof keywords] || keywords.nl,
    locale,
    path
  })
}
