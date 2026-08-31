/**
 * URL Path Localization for Lumora Horticulture
 *
 * This module provides mappings for translating URL paths between different languages.
 * It enables locale-specific URL paths on the canonical .nl domain.
 */

// English URL paths (used as the reference/default since they match the file structure)
export const basePaths = {
  home: '',
  about: 'about',
  products: 'products',
  shop: 'shop',
  contact: 'contact',
  applications: 'applications',
  // Legal pages
  privacyPolicy: 'privacy',
  termsConditions: 'terms',
  returnPolicy: 'return-policy',
  // Individual product paths
  tray84: 'products/tray84',
  tray104: 'products/tray104',
  transportbox: 'products/transportbox',
  insertsheets: 'products/insertsheets',
  ellepotfp12: 'products/ellepot-fp12',
  // Marketing paths
  ellepotflyer: 'marketing/ellepot-flyer',
  // SEO Landing pages
  paperbusPluggen: 'paperbus-pluggen',
  steenwolPluggen: 'steenwol-pluggen',
  stekpluggen: 'stekpluggen',
  // FAQ pages
  steenwolVsRockwool: 'steenwol-vs-rockwool',
  voordelenNadelenSteenwol: 'voordelen-nadelen-steenwol',
  steenwolVastzetten: 'steenwol-vastzetten',
  steenwolLongen: 'steenwol-longen',
  glaswolAanraken: 'glaswol-aanraken',
  levensduurSteenwol: 'levensduur-steenwol',
  steenwolSubstraat: 'steenwol-substraat',
  // New SEO Content Categories
  propagatieTechnologie: 'propagatie-technologie',
  praktischeToepassingen: 'praktische-toepassingen',
  efficiencieRoi: 'efficiëntie-roi',
  technischeSpecs: 'technische-specs',
  duurzaamheid: 'duurzaamheid',
  troubleshooting: 'troubleshooting',
  innovatieTrends: 'innovatie-trends',
  regionaleMarkten: 'regionale-markten',
  supplyChain: 'supply-chain',
  caseStudies: 'case-studies',
}

// URL path translations for each locale
export const localizedPaths: Record<string, Record<string, string>> = {
  // Dutch paths
  nl: {
    about: 'over-ons',
    products: 'producten',
    shop: 'winkel',
    applications: 'toepassingen',
    // Legal pages
    privacy: 'privacybeleid',
    terms: 'algemene-voorwaarden',
    'return-policy': 'retourbeleid',
    // Individual products in Dutch
    'products/tray84': 'producten/tray84',
    'products/tray104': 'producten/tray104',
    'products/transportbox': 'producten/transportdoos',
    'products/insertsheets': 'producten/inlegvellen',
    'products/ellepot-fp12': 'producten/ellepot-fp12',
    // Marketing materials
    'marketing/ellepot-flyer': 'marketing/ellepot-folder',
    // SEO Landing pages (Dutch uses same URLs as base)
    'paperbus-pluggen': 'paperbus-pluggen',
    'steenwol-pluggen': 'steenwol-pluggen',
    'stekpluggen': 'stekpluggen',
    // FAQ pages (Dutch uses same URLs as base)
    'steenwol-vs-rockwool': 'steenwol-vs-rockwool',
    'voordelen-nadelen-steenwol': 'voordelen-nadelen-steenwol',
    'steenwol-vastzetten': 'steenwol-vastzetten',
    'steenwol-longen': 'steenwol-longen',
    'glaswol-aanraken': 'glaswol-aanraken',
    'levensduur-steenwol': 'levensduur-steenwol',
    'steenwol-substraat': 'steenwol-substraat',
    // New SEO Content Categories (Dutch - same as base)
    'propagatie-technologie': 'propagatie-technologie',
    'praktische-toepassingen': 'praktische-toepassingen',
    'efficiëntie-roi': 'efficiëntie-roi',
    'technische-specs': 'technische-specs',
    'regionale-markten': 'regionale-markten',
    'supply-chain': 'supply-chain',
    'case-studies': 'case-studies',
    // contact is the same in Dutch, no need to translate
  },

  // English paths (same as base paths)
  en: {
    // Legal pages
    privacy: 'privacy-policy',
    terms: 'terms-conditions',
    // SEO Landing pages translated to English
    'paperbus-pluggen': 'paper-pot-plugs',
    'paperbus-steenwol-pluggen': 'paper-pot-rockwool-plugs',
    'steenwol-pluggen': 'rockwool-plugs',
    'stekpluggen': 'cutting-plugs',
    // FAQ pages translated to English
    'steenwol-vs-rockwool': 'rockwool-vs-stone-wool',
    'voordelen-nadelen-steenwol': 'rockwool-pros-cons',
    'steenwol-vastzetten': 'securing-rockwool',
    'steenwol-longen': 'rockwool-lungs',
    'glaswol-aanraken': 'touching-fiberglass',
    'levensduur-steenwol': 'rockwool-lifespan',
    'steenwol-substraat': 'rockwool-substrate',
    // New SEO Content Categories (English translations)
    'propagatie-technologie': 'propagation-technology',
    'praktische-toepassingen': 'practical-applications',
    'efficiëntie-roi': 'efficiency-roi',
    'technische-specs': 'technical-specifications',
    'duurzaamheid': 'sustainability',
    'troubleshooting': 'troubleshooting',
    'innovatie-trends': 'innovation-trends',
    'regionale-markten': 'regional-markets',
    'supply-chain': 'supply-chain',
    'case-studies': 'case-studies',
    // No translation needed for other paths as they match the base paths
  },

  // German paths
  de: {
    about: 'uber-uns',
    products: 'produkte',
    shop: 'shop',
    contact: 'kontakt',
    applications: 'anwendungen',
    // Legal pages
    privacy: 'datenschutz',
    terms: 'allgemeine-geschaftsbedingungen',
    'return-policy': 'ruckgaberecht',
    // Individual products in German
    'products/tray84': 'produkte/tray84',
    'products/tray104': 'produkte/tray104',
    'products/transportbox': 'produkte/transportbox',
    'products/insertsheets': 'produkte/einlegebogen',
    'products/ellepot-fp12': 'produkte/ellepot-fp12',
    // Marketing materials
    'marketing/ellepot-flyer': 'marketing/ellepot-broschure',
    // SEO Landing pages translated to German
    'paperbus-pluggen': 'papiertopf-stecker',
    'paperbus-steenwol-pluggen': 'papiertopf-steinwollstecker',
    'steenwol-pluggen': 'steinwolle-stecklinge',
    'stekpluggen': 'stecklingsplugs',
    // FAQ pages translated to German
    'steenwol-vs-rockwool': 'steinwolle-vs-rockwool',
    'voordelen-nadelen-steenwol': 'steinwolle-vor-nachteile',
    'steenwol-vastzetten': 'steinwolle-befestigen',
    'steenwol-longen': 'steinwolle-lunge',
    'glaswol-aanraken': 'glaswolle-beruehren',
    'levensduur-steenwol': 'steinwolle-lebensdauer',
    'steenwol-substraat': 'steinwolle-substrat',
    // New SEO Content Categories (German translations)
    'propagatie-technologie': 'vermehrungstechnologie',
    'praktische-toepassingen': 'praktische-anwendungen',
    'efficiëntie-roi': 'effizienz-roi',
    'technische-specs': 'technische-spezifikationen',
    'duurzaamheid': 'nachhaltigkeit',
    'troubleshooting': 'fehlerbehebung',
    'innovatie-trends': 'innovation-trends',
    'regionale-markten': 'regionale-maerkte',
    'supply-chain': 'lieferkette',
    'case-studies': 'fallstudien',
  }
}

/**
 * Convert a base path to its canonical path on lumorahorticulture.nl.
 * Dutch uses no prefix; English and German use /en and /de.
 */
export function localizePathForLocale(path: string, locale: string): string {
  const localePrefix = locale === 'nl' ? '' : `/${locale}`;
  const pathWithoutPrefix = path.replace(/^\/(nl|en|de)(?=\/|$)/, '') || '/';
  const cleanPath = pathWithoutPrefix.replace(/^\/|\/$/g, '');

  // If this is the homepage (empty path), return as is
  if (!cleanPath) {
    return localePrefix || '/';
  }

  // Check if we have a direct match for the full path
  const localizedPath = localizedPaths[locale]?.[cleanPath];
  if (localizedPath) {
    return `${localePrefix}/${localizedPath}`;
  }

  // Otherwise try to localize the first segment
  const pathSegments = cleanPath.split('/');
  const firstSegment = pathSegments[0];

  // Find the localized version of the first segment if it exists
  const localizedFirstSegment = localizedPaths[locale]?.[firstSegment] || firstSegment;

  // Replace the first segment with the localized version
  pathSegments[0] = localizedFirstSegment;

  // Rebuild the path with localized first segment
  return `${localePrefix}/${pathSegments.join('/')}`;
}

/**
 * Convert a localized path back to its base path (English)
 */
export function basePathFromLocalizedPath(localizedPath: string, locale: string): string {
  const pathWithoutPrefix = localizedPath.replace(/^\/(nl|en|de)(?=\/|$)/, '') || '/';
  const cleanPath = pathWithoutPrefix.replace(/^\/|\/$/g, '');

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
