import { publicStorefrontRoutes } from './routes'

export type ProductImage = {
  src: string
  alt: string
  fit?: 'contain' | 'cover' | 'portrait'
}

export type ProductVariant = {
  id: string
  slug: string
  label: string
  shortLabel?: string
  detail: string
  price: number
  images?: ProductImage[]
  description?: string
  technology?: string
  cellsPerTray?: number
  cellDiameterMm?: number
  cellDepthMm?: number
  traysPerBox?: number
  cellsPerBox?: number
}

export type ProductFamily = {
  id: 'paperbus' | 'neemx'
  eyebrow: string
  name: string
  shortName: string
  statement: string
  description: string
  href: string
  fromPrice: number
  mainImage: string
  mainImageAlt: string
  secondaryImage: string
  secondaryImageAlt: string
  tertiaryImage?: string
  tertiaryImageAlt?: string
  usageImage?: string
  usageImageAlt?: string
  heroImage?: string
  heroMobileImage?: string
  heroImageAlt?: string
  variants: ProductVariant[]
  highlights: string[]
  useCases: string[]
}

export const paperbus: ProductFamily = {
  id: 'paperbus',
  eyebrow: 'Voor zaaien en stekken',
  name: 'Stekpluggen Steenwol',
  shortName: 'Stekpluggen',
  statement: 'Professionele stekpluggen met Ellepot FP 12+ papertechnologie, geleverd per doos voor gerichte zaailingenkweek.',
  description:
    'Kies 84 voor een grotere celmaat of 104 voor een hogere plantdichtheid per tray. Iedere uitvoering wordt per complete doos geleverd.',
  href: publicStorefrontRoutes.stekpluggen,
  fromPrice: 80,
  mainImage: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-front.webp',
  mainImageAlt: 'Stekpluggen Steenwol 84 met Paperbus-wikkel in een kweektray',
  secondaryImage: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-alternate.webp',
  secondaryImageAlt: 'Tweede aanzicht van Stekpluggen Steenwol 84 in een kweektray',
  tertiaryImage: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-paperbus-detail.webp',
  tertiaryImageAlt: 'Detail van stekpluggen van steenwol met Paperbus-wikkel',
  usageImage: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-bewortelde-zaailing.webp',
  usageImageAlt: 'Jonge zaailing met zichtbare wortels in een stekplug van steenwol',
  heroImage: '/productAfbeeldingen/stekpluggen/stekpluggen-greenhouse-hero-desktop.avif',
  heroMobileImage: '/productAfbeeldingen/stekpluggen/stekpluggen-greenhouse-hero-mobile.avif',
  heroImageAlt: 'Stekpluggen Steenwol 84 met jonge planten in een lichte kas',
  variants: [
    {
      id: 'tray-84',
      slug: 'paper-plug-tray-84',
      label: 'Stekpluggen Steenwol 84',
      shortLabel: 'Steenwol 84',
      detail: '8 trays per doos · 672 cellen totaal',
      price: 84,
      description: 'Paper Plug Tray 84 met 84 cellen van Ø38 × 42 mm diep. De cellen hebben een grotere diameter en diepte dan bij de 104-uitvoering.',
      technology: 'Ellepot FP 12+',
      cellsPerTray: 84,
      cellDiameterMm: 38,
      cellDepthMm: 42,
      traysPerBox: 8,
      cellsPerBox: 672,
      images: [
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-front.webp',
          alt: 'Stekpluggen Steenwol 84 met Paperbus-wikkel in een kweektray',
        },
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-close.webp',
          alt: 'Bovenaanzicht van een tray met 84 stekpluggen van steenwol',
        },
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-alternate.webp',
          alt: 'Tweede aanzicht van een tray met 84 stekpluggen van steenwol',
        },
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-paperbus-detail.webp',
          alt: 'Detail van stekpluggen van steenwol met Paperbus-wikkel',
          fit: 'cover',
        },
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-open-box.webp',
          alt: 'Open verzenddoos met een tray van 84 stekpluggen',
        },
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-closed-box.webp',
          alt: 'Gesloten verzenddoos voor de stekpluggen',
        },
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-bewortelde-zaailing.webp',
          alt: 'Jonge zaailing met zichtbare wortels in een stekplug van steenwol',
          fit: 'portrait',
        },
      ],
    },
    {
      id: 'tray-104',
      slug: 'paper-plug-tray-104',
      label: 'Stekpluggen Steenwol 104',
      shortLabel: 'Steenwol 104',
      detail: '7 trays per doos · 728 cellen totaal',
      price: 80,
      description: 'Paper Plug Tray 104 met 104 cellen van Ø32 × 40 mm diep. De hogere plantdichtheid benut meer kweekplaatsen per tray.',
      technology: 'Ellepot FP 12+',
      cellsPerTray: 104,
      cellDiameterMm: 32,
      cellDepthMm: 40,
      traysPerBox: 7,
      cellsPerBox: 728,
      images: [
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-104-tray.webp',
          alt: 'Tray met 104 hoge stekpluggen van steenwol',
        },
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-104-open-box.webp',
          alt: 'Open verzenddoos met een tray van 104 stekpluggen',
        },
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-closed-box.webp',
          alt: 'Gesloten verzenddoos voor de stekpluggen',
        },
        {
          src: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-bewortelde-zaailing.webp',
          alt: 'Jonge zaailing met zichtbare wortels in een stekplug van steenwol',
          fit: 'portrait',
        },
      ],
    },
  ],
  highlights: [
    'Ellepot FP 12+ papertechnologie',
    'Direct uitplantbare plug',
    'Complete trays per doos',
  ],
  useCases: ['Stekken', 'Zaaien', 'Professionele opkweek'],
}

export const neemx: ProductFamily = {
  id: 'neemx',
  eyebrow: 'Botanische bladverzorging',
  name: 'NeemX Pro',
  shortName: 'NeemX Pro',
  statement: 'Hooggeconcentreerd plantaardig olieconcentraat voor een gelijkmatige verzorging van het bladoppervlak.',
  description:
    'NEEMX PRO is een hooggeconcentreerde botanische olieblend voor de verzorging en gelijkmatige behandeling van het bladoppervlak. De formule is goed te verdelen in water en verkrijgbaar in 10, 30 en 50 ml.',
  href: publicStorefrontRoutes.neemx,
  fromPrice: 24.95,
  mainImage: '/productAfbeeldingen/neemxpro/neemx-pro-assortiment-travertijn-neem-bloesem.webp',
  mainImageAlt: 'NeemX Pro assortiment op travertijn met neem-bladeren en witte bloesem',
  secondaryImage: '/productAfbeeldingen/neemxpro/neemx-pro-50ml-travertijn-sokkel.webp',
  secondaryImageAlt: 'NeemX Pro 50 ml flesje op een stenen sokkel met neem-bladeren rondom',
  tertiaryImage: '/productAfbeeldingen/neemxpro/neemx-pro-50ml-leisteen-donker.webp',
  tertiaryImageAlt: 'NeemX Pro 50 ml flesje op donkere natte leisteen met neem-bladeren',
  usageImage: '/productAfbeeldingen/neemxpro/neemx-pro-hero-marmer-neem-tak.webp',
  usageImageAlt: 'NeemX Pro flesjes in drie formaten op een marmeren blad met een neem-tak',
  variants: [
    { id: 'neemx-10', slug: 'neemx-pro-10ml', label: '10 ml', detail: 'Voor 1–4 liter spuitoplossing', price: 24.95 },
    { id: 'neemx-30', slug: 'neemx-pro-30ml', label: '30 ml', detail: 'Voor 3–12 liter spuitoplossing', price: 44.95 },
    { id: 'neemx-50', slug: 'neemx-pro-50ml', label: '50 ml', detail: 'Voor 5–20 liter spuitoplossing', price: 59.95 },
  ],
  highlights: [
    'Hooggeconcentreerde olieblend',
    'Goed te verdelen in water',
    'Gelijkmatige bladbedekking',
  ],
  useCases: ['Bladverzorging', 'Kamerplanten', 'Teeltomgevingen'],
}

export const productFamilies = [paperbus, neemx] as const

export function formatPrice(value: number, locale: 'nl' | 'en' | 'de' = 'nl'): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-IE' : locale === 'de' ? 'de-DE' : 'nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}
