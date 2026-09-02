import {
  basePathFromLocalizedPath,
  localizePathForLocale,
} from '@/lib/url-localizations'
import {
  isPreviewStorefrontPath,
  type StorefrontRoutes,
} from '../_data/routes'

export type StorefrontLocale = 'nl' | 'en' | 'de'

export const storefrontLanguages: ReadonlyArray<{
  locale: StorefrontLocale
  label: string
}> = [
  { locale: 'nl', label: 'Nederlands' },
  { locale: 'en', label: 'English' },
  { locale: 'de', label: 'Deutsch' },
]

export const storefrontShellCopy = {
  nl: {
    utilityLine: 'Specialistische producten voor plant en opkweek',
    utilityContact: 'Productadvies nodig? Neem contact op',
    products: 'Producten',
    whyLumora: 'Waarom Lumora',
    helpContact: 'Hulp & contact',
    mainNavigation: 'Hoofdnavigatie',
    homepageLabel: 'Lumora homepage',
    languageLabel: 'Taal: Nederlands',
    accountLabel: 'Mijn account',
    account: 'Account',
    cart: 'Winkelwagen',
    mobileNavigation: 'Mobiele navigatie',
    home: 'Home',
    help: 'Hulp',
    bag: 'Mandje',
    footerLead: 'Twee specialistische productfamilies, met aandacht geselecteerd voor plant en opkweek.',
    cuttingPlugs: 'Stekpluggen Steenwol',
    service: 'Service',
    contact: 'Contact',
    returnPolicy: 'Retourbeleid',
    terms: 'Voorwaarden',
    reachable: 'Bereikbaar',
    safePayment: 'Veilig online betalen met bekende betaalmethoden',
    checkoutHomeLabel: 'Terug naar Lumora',
    secureCheckout: 'Veilig afrekenen',
    total: 'Totaal',
    toPayment: 'Naar betaling',
    payWith: 'Betaal met',
    paymentMethods: 'Beschikbare betaalmethoden',
  },
  en: {
    utilityLine: 'Specialist products for plant care and propagation',
    utilityContact: 'Need product advice? Contact us',
    products: 'Products',
    whyLumora: 'Why Lumora',
    helpContact: 'Help & contact',
    mainNavigation: 'Main navigation',
    homepageLabel: 'Lumora homepage',
    languageLabel: 'Language: English',
    accountLabel: 'My account',
    account: 'Account',
    cart: 'Cart',
    mobileNavigation: 'Mobile navigation',
    home: 'Home',
    help: 'Help',
    bag: 'Cart',
    footerLead: 'Two specialist product families, carefully selected for plant care and propagation.',
    cuttingPlugs: 'Paper Plug Trays',
    service: 'Service',
    contact: 'Contact',
    returnPolicy: 'Return policy',
    terms: 'Terms',
    reachable: 'Contact',
    safePayment: 'Secure online payments with familiar payment methods',
    checkoutHomeLabel: 'Back to Lumora',
    secureCheckout: 'Secure checkout',
    total: 'Total',
    toPayment: 'Continue to payment',
    payWith: 'Pay with',
    paymentMethods: 'Available payment methods',
  },
  de: {
    utilityLine: 'Spezialprodukte für Pflanzenpflege und Anzucht',
    utilityContact: 'Produktberatung benötigt? Kontaktieren Sie uns',
    products: 'Produkte',
    whyLumora: 'Warum Lumora',
    helpContact: 'Hilfe & Kontakt',
    mainNavigation: 'Hauptnavigation',
    homepageLabel: 'Lumora Startseite',
    languageLabel: 'Sprache: Deutsch',
    accountLabel: 'Mein Konto',
    account: 'Konto',
    cart: 'Warenkorb',
    mobileNavigation: 'Mobile Navigation',
    home: 'Startseite',
    help: 'Hilfe',
    bag: 'Warenkorb',
    footerLead: 'Zwei spezialisierte Produktfamilien, sorgfältig für Pflanzenpflege und Anzucht ausgewählt.',
    cuttingPlugs: 'Paper Plug Trays',
    service: 'Service',
    contact: 'Kontakt',
    returnPolicy: 'Rückgaberecht',
    terms: 'Bedingungen',
    reachable: 'Erreichbar',
    safePayment: 'Sicher online mit bekannten Zahlungsmethoden bezahlen',
    checkoutHomeLabel: 'Zurück zu Lumora',
    secureCheckout: 'Sicher bezahlen',
    total: 'Gesamt',
    toPayment: 'Weiter zur Zahlung',
    payWith: 'Bezahlen mit',
    paymentMethods: 'Verfügbare Zahlungsmethoden',
  },
} as const

export function resolveStorefrontLocale(locale: string): StorefrontLocale {
  return locale === 'en' || locale === 'de' ? locale : 'nl'
}

export function localizeStorefrontRoutes(
  routes: StorefrontRoutes,
  locale: StorefrontLocale,
): StorefrontRoutes {
  if (isPreviewStorefrontPath(routes.home) || locale === 'nl') return routes

  return Object.fromEntries(
    Object.entries(routes).map(([name, path]) => [
      name,
      localizePathForLocale(basePathFromLocalizedPath(path, 'nl'), locale),
    ]),
  ) as StorefrontRoutes
}

export function getStorefrontLanguageHref(
  pathname: string | null,
  currentLocale: StorefrontLocale,
  targetLocale: StorefrontLocale,
): string {
  const currentPath = pathname || '/'
  const localeAgnosticPath = currentPath.replace(/^\/(?:nl|en|de)(?=\/|$)/, '') || '/'

  if (
    localeAgnosticPath === '/handler' ||
    localeAgnosticPath.startsWith('/handler/') ||
    isPreviewStorefrontPath(localeAgnosticPath)
  ) {
    return `${localeAgnosticPath}?lang=${targetLocale}`
  }

  const basePath = basePathFromLocalizedPath(currentPath, currentLocale)
  return localizePathForLocale(basePath, targetLocale)
}
