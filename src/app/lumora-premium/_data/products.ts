export type ProductVariant = {
  id: string
  label: string
  detail: string
  price: number
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
  variants: ProductVariant[]
  highlights: string[]
  useCases: string[]
}

export const paperbus: ProductFamily = {
  id: 'paperbus',
  eyebrow: 'Voor een sterke opkweek',
  name: 'Paperbus Pluggen',
  shortName: 'Paperbus',
  statement: 'Een overzichtelijke start voor iedere jonge plant.',
  description:
    'Steenwolpluggen met paperbus-wikkel, geleverd in een kweektray. Kies de tray die aansluit op jouw teelt en werkwijze.',
  href: '/lumora-premium/paperbus',
  fromPrice: 80,
  mainImage:
    '/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.webp',
  mainImageAlt: 'Paperbus steenwolpluggen in een Tray 84',
  secondaryImage:
    '/productAfbeeldingen/generated/paperbus-greenhouse-hero-v1.png',
  secondaryImageAlt: 'Jonge planten in een lichte professionele kas',
  variants: [
    { id: 'tray-84', label: 'Tray 84', detail: '84 pluggen per tray', price: 84 },
    { id: 'tray-104', label: 'Tray 104', detail: '104 pluggen per tray', price: 80 },
  ],
  highlights: [
    'Steenwolplug met paperbus-wikkel',
    'Keuze uit twee tray-indelingen',
    'Geleverd als complete kweektray',
  ],
  useCases: ['Stekken', 'Zaaien', 'Professionele opkweek'],
}

export const neemx: ProductFamily = {
  id: 'neemx',
  eyebrow: 'Voor gerichte plantverzorging',
  name: 'NeemX Pro',
  shortName: 'NeemX Pro',
  statement: 'Geconcentreerde verzorging, helder gedoseerd.',
  description:
    'Een geconcentreerde formule op basis van neem voor de verzorging van planten. Verkrijgbaar in drie praktische inhoudsmaten.',
  href: '/lumora-premium/neemx-pro',
  fromPrice: 24.95,
  mainImage: '/productAfbeeldingen/generated/neemx-clean-packshot-v1.png',
  mainImageAlt: 'Donkere NeemX Pro prototypefles met groene dop op een lichte achtergrond',
  secondaryImage:
    '/productAfbeeldingen/generated/neemx-botanical-hero-v1.png',
  secondaryImageAlt: 'Frisse groene bladeren op een lichte achtergrond',
  variants: [
    { id: 'neemx-10', label: '10 ml', detail: 'Compact formaat', price: 24.95 },
    { id: 'neemx-30', label: '30 ml', detail: 'Ruimer formaat', price: 44.95 },
    { id: 'neemx-50', label: '50 ml', detail: 'Grootste formaat', price: 59.95 },
  ],
  highlights: [
    'Geconcentreerde formule',
    'Keuze uit drie inhoudsmaten',
    'Duidelijke gebruiksinstructie',
  ],
  useCases: ['Kamerplanten', 'Sierplanten', 'Plantverzorging'],
}

export const productFamilies = [paperbus, neemx] as const

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}
