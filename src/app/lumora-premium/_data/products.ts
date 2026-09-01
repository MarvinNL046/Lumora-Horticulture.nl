export type ProductImage = {
  src: string
  alt: string
  fit?: 'contain' | 'cover' | 'portrait'
}

export type ProductVariant = {
  id: string
  label: string
  shortLabel?: string
  detail: string
  price: number
  images?: ProductImage[]
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
  statement: 'Stekpluggen van steenwol met een Paperbus-wikkel, geleverd in een kweektray.',
  description:
    'Stekpluggen van steenwol met een Paperbus-wikkel, geleverd in een kweektray.',
  href: '/lumora-premium/paperbus',
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
      label: 'Stekpluggen Steenwol 84',
      shortLabel: 'Steenwol 84',
      detail: '84 stekpluggen per tray',
      price: 84,
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
      label: 'Stekpluggen Steenwol 104',
      shortLabel: 'Steenwol 104',
      detail: '104 stekpluggen per tray',
      price: 80,
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
    'Stekplug van steenwol met Paperbus-wikkel',
    'Keuze uit twee tray-indelingen',
    'Geleverd als complete kweektray',
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
  href: '/lumora-premium/neemx-pro',
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
    { id: 'neemx-10', label: '10 ml', detail: 'Voor 1–4 liter spuitoplossing', price: 24.95 },
    { id: 'neemx-30', label: '30 ml', detail: 'Voor 3–12 liter spuitoplossing', price: 44.95 },
    { id: 'neemx-50', label: '50 ml', detail: 'Voor 5–20 liter spuitoplossing', price: 59.95 },
  ],
  highlights: [
    'Hooggeconcentreerde olieblend',
    'Goed te verdelen in water',
    'Gelijkmatige bladbedekking',
  ],
  useCases: ['Bladverzorging', 'Kamerplanten', 'Teeltomgevingen'],
}

export const productFamilies = [paperbus, neemx] as const

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}
