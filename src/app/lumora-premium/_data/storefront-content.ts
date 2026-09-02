import type { ProductFamily, ProductVariant } from './products'
import { neemx, paperbus } from './products'
import type { StorefrontLocale } from '../_components/storefront-localization'

type LocalizedProductText = {
  eyebrow: string
  name: string
  shortName: string
  statement: string
  description: string
  mainImageAlt: string
  secondaryImageAlt: string
  tertiaryImageAlt?: string
  usageImageAlt?: string
  heroImageAlt?: string
  highlights: string[]
  useCases: string[]
  variants: Array<Pick<ProductVariant, 'label' | 'shortLabel' | 'detail' | 'description'> & { imageAlts?: string[] }>
}

const productText: Record<StorefrontLocale, { paperbus: LocalizedProductText; neemx: LocalizedProductText }> = {
  nl: {
    paperbus: {
      ...paperbus,
      variants: paperbus.variants.map(({ label, shortLabel, detail, description, images }) => ({ label, shortLabel, detail, description, imageAlts: images?.map((image) => image.alt) })),
    },
    neemx: {
      ...neemx,
      variants: neemx.variants.map(({ label, shortLabel, detail, description, images }) => ({ label, shortLabel, detail, description, imageAlts: images?.map((image) => image.alt) })),
    },
  },
  en: {
    paperbus: {
      eyebrow: 'For sowing and cuttings',
      name: 'Paper Plug Trays',
      shortName: 'Paper Plug Trays',
      statement: 'Professional Paper Plug Trays with Ellepot FP 12+ technology, supplied by the box for efficient seedling propagation.',
      description: 'Choose 84 for a larger cell size or 104 for a higher plant density per tray. Each version is supplied as a complete box.',
      mainImageAlt: 'Rockwool Cutting Plugs 84 with paper sleeve in a propagation tray',
      secondaryImageAlt: 'Second view of Rockwool Cutting Plugs 84 in a propagation tray',
      tertiaryImageAlt: 'Close-up of rockwool cutting plugs with paper sleeve',
      usageImageAlt: 'Young seedling with visible roots in a rockwool cutting plug',
      heroImageAlt: 'Rockwool Cutting Plugs 84 with young plants in a bright greenhouse',
      highlights: ['Ellepot FP 12+ paper technology', 'Plug can be planted directly', 'Complete trays per box'],
      useCases: ['Cuttings', 'Sowing', 'Professional propagation'],
      variants: [
        {
          label: 'Paper Plug Tray 84', shortLabel: 'Paper Plug Tray 84', detail: '8 trays per box · 672 cells in total',
          description: 'Paper Plug Tray 84 with 84 cells measuring Ø38 × 42 mm deep. Its cells have a larger diameter and depth than the 104 version.',
          imageAlts: ['Rockwool Cutting Plugs 84 with paper sleeve in a propagation tray', 'Top view of a tray with 84 rockwool cutting plugs', 'Second view of a tray with 84 rockwool cutting plugs', 'Close-up of rockwool cutting plugs with paper sleeve', 'Open shipping box with a tray of 84 cutting plugs', 'Closed shipping box for the cutting plugs', 'Young seedling with visible roots in a rockwool cutting plug'],
        },
        {
          label: 'Paper Plug Tray 104', shortLabel: 'Paper Plug Tray 104', detail: '7 trays per box · 728 cells in total',
          description: 'Paper Plug Tray 104 with 104 cells measuring Ø32 × 40 mm deep. The higher plant density provides more propagation positions per tray.',
          imageAlts: ['Tray with 104 tall rockwool cutting plugs', 'Open shipping box with a tray of 104 cutting plugs', 'Closed shipping box for the cutting plugs', 'Young seedling with visible roots in a rockwool cutting plug'],
        },
      ],
    },
    neemx: {
      eyebrow: 'Botanical leaf care', name: 'NeemX Pro', shortName: 'NeemX Pro',
      statement: 'Highly concentrated plant-based oil concentrate for even care of the leaf surface.',
      description: 'NEEMX PRO is a highly concentrated botanical oil blend for the care and even treatment of the leaf surface. The formula disperses well in water and is available in 10, 30 and 50 ml.',
      mainImageAlt: 'NeemX Pro range on travertine with neem leaves and white blossom',
      secondaryImageAlt: 'NeemX Pro 50 ml bottle on a stone plinth surrounded by neem leaves',
      tertiaryImageAlt: 'NeemX Pro 50 ml bottle on dark wet slate with neem leaves',
      usageImageAlt: 'NeemX Pro bottles in three sizes on marble with a neem branch',
      highlights: ['Highly concentrated oil blend', 'Disperses well in water', 'Even leaf coverage'],
      useCases: ['Leaf care', 'Houseplants', 'Growing environments'],
      variants: [
        { label: '10 ml', detail: 'Makes 1–4 litres of spray solution' },
        { label: '30 ml', detail: 'Makes 3–12 litres of spray solution' },
        { label: '50 ml', detail: 'Makes 5–20 litres of spray solution' },
      ],
    },
  },
  de: {
    paperbus: {
      eyebrow: 'Für Aussaat und Stecklinge',
      name: 'Paper Plug Trays',
      shortName: 'Paper Plug Trays',
      statement: 'Professionelle Paper Plug Trays mit Ellepot FP 12+ Technologie, kartonweise für eine effiziente Jungpflanzenanzucht geliefert.',
      description: 'Wählen Sie 84 für größere Zellen oder 104 für eine höhere Pflanzendichte pro Anzuchtplatte. Jede Ausführung wird als kompletter Karton geliefert.',
      mainImageAlt: 'Steinwoll-Stecklingsplugs 84 mit Papierhülle in einem Anzuchttray',
      secondaryImageAlt: 'Zweite Ansicht der Steinwoll-Stecklingsplugs 84 im Anzuchttray',
      tertiaryImageAlt: 'Detail der Steinwoll-Stecklingsplugs mit Papierhülle',
      usageImageAlt: 'Junge Pflanze mit sichtbaren Wurzeln in einem Steinwoll-Stecklingsplug',
      heroImageAlt: 'Steinwoll-Stecklingsplugs 84 mit Jungpflanzen in einem hellen Gewächshaus',
      highlights: ['Ellepot FP 12+ Papiertechnologie', 'Direkt auspflanzbarer Plug', 'Komplette Anzuchtplatten pro Karton'],
      useCases: ['Stecklinge', 'Aussaat', 'Professionelle Anzucht'],
      variants: [
        {
          label: 'Paper Plug Tray 84', shortLabel: 'Paper Plug Tray 84', detail: '8 Platten · 672 Zellen gesamt',
          description: 'Paper-Plug-Anzuchtplatte 84 mit 84 Zellen von Ø38 × 42 mm Tiefe. Die Zellen besitzen einen größeren Durchmesser und eine größere Tiefe als die 104-Ausführung.',
          imageAlts: ['Steinwoll-Stecklingsplugs 84 mit Papierhülle in einer Anzuchtplatte', 'Draufsicht auf eine Anzuchtplatte mit 84 Steinwoll-Stecklingsplugs', 'Zweite Ansicht einer Anzuchtplatte mit 84 Steinwoll-Stecklingsplugs', 'Detail der Steinwoll-Stecklingsplugs mit Papierhülle', 'Offener Versandkarton mit einer Anzuchtplatte aus 84 Stecklingsplugs', 'Geschlossener Versandkarton für die Stecklingsplugs', 'Junge Pflanze mit sichtbaren Wurzeln in einem Steinwoll-Stecklingsplug'],
        },
        {
          label: 'Paper Plug Tray 104', shortLabel: 'Paper Plug Tray 104', detail: '7 Platten · 728 Zellen gesamt',
          description: 'Paper-Plug-Anzuchtplatte 104 mit 104 Zellen von Ø32 × 40 mm Tiefe. Die höhere Pflanzendichte schafft mehr Anzuchtplätze pro Anzuchtplatte.',
          imageAlts: ['Anzuchtplatte mit 104 hohen Steinwoll-Stecklingsplugs', 'Offener Versandkarton mit einer Anzuchtplatte aus 104 Stecklingsplugs', 'Geschlossener Versandkarton für die Stecklingsplugs', 'Junge Pflanze mit sichtbaren Wurzeln in einem Steinwoll-Stecklingsplug'],
        },
      ],
    },
    neemx: {
      eyebrow: 'Botanische Blattpflege', name: 'NeemX Pro', shortName: 'NeemX Pro',
      statement: 'Hochkonzentriertes pflanzliches Ölkonzentrat für die gleichmäßige Pflege der Blattoberfläche.',
      description: 'NEEMX PRO ist eine hochkonzentrierte botanische Ölmischung zur Pflege und gleichmäßigen Behandlung der Blattoberfläche. Die Formel lässt sich gut in Wasser verteilen und ist in 10, 30 und 50 ml erhältlich.',
      mainImageAlt: 'NeemX Pro Sortiment auf Travertin mit Neemblättern und weißen Blüten',
      secondaryImageAlt: 'NeemX Pro 50-ml-Flasche auf einem Steinsockel, umgeben von Neemblättern',
      tertiaryImageAlt: 'NeemX Pro 50-ml-Flasche auf dunklem nassem Schiefer mit Neemblättern',
      usageImageAlt: 'NeemX Pro Flaschen in drei Größen auf Marmor mit einem Neemzweig',
      highlights: ['Hochkonzentrierte Ölmischung', 'Gut in Wasser verteilbar', 'Gleichmäßige Blattbenetzung'],
      useCases: ['Blattpflege', 'Zimmerpflanzen', 'Anbauumgebungen'],
      variants: [
        { label: '10 ml', detail: 'Für 1–4 Liter Sprühlösung' },
        { label: '30 ml', detail: 'Für 3–12 Liter Sprühlösung' },
        { label: '50 ml', detail: 'Für 5–20 Liter Sprühlösung' },
      ],
    },
  },
}

function localizeProduct(base: ProductFamily, text: LocalizedProductText): ProductFamily {
  return {
    ...base,
    ...text,
    variants: base.variants.map((variant, index) => ({
      ...variant,
      ...text.variants[index],
      images: variant.images?.map((image, imageIndex) => ({
        ...image,
        alt: text.variants[index]?.imageAlts?.[imageIndex] ?? image.alt,
      })),
    })),
  }
}

export function getLocalizedProducts(locale: StorefrontLocale) {
  return {
    paperbus: localizeProduct(paperbus, productText[locale].paperbus),
    neemx: localizeProduct(neemx, productText[locale].neemx),
  }
}

export function getLocalizedCartItemName(
  locale: StorefrontLocale,
  slug: string,
  fallback: string,
): string {
  const products = getLocalizedProducts(locale)
  const variant = [...products.paperbus.variants, ...products.neemx.variants]
    .find((candidate) => candidate.slug === slug)
  return variant?.label ?? fallback
}

export const sharedCopy = {
  nl: {
    from: 'vanaf', view: 'Bekijk', freeShipping: 'Gratis verzending', shippingRegion: 'Binnen Nederland, België en Duitsland',
    secureCheckout: 'Veilig afrekenen', helpChoice: 'Hulp bij je keuze', directContact: 'Rechtstreeks contact met Lumora',
    promoAria: '2 plus 1 gratis stekpluggenactie', promoBadge: '2 + 1 gratis', promoTitle: 'Koop 2 dozen Stekpluggen, ontvang 1 doos gratis', promoPrice: '3 dozen voor €180', promoChoice: 'Kies 84 of 104', promoShipping: 'Verzending inbegrepen', promoAction: 'Bekijk de actie',
  },
  en: {
    from: 'from', view: 'View', freeShipping: 'Free shipping', shippingRegion: 'Within the Netherlands, Belgium and Germany',
    secureCheckout: 'Secure checkout', helpChoice: 'Help choosing', directContact: 'Contact Lumora directly',
    promoAria: 'Buy 2 get 1 free cutting plug offer', promoBadge: 'Buy 2 + get 1 free', promoTitle: 'Buy 2 boxes of cutting plugs and receive 1 box free', promoPrice: '3 boxes for €180', promoChoice: 'Choose 84 or 104', promoShipping: 'Shipping included', promoAction: 'View the offer',
  },
  de: {
    from: 'ab', view: 'Ansehen', freeShipping: 'Kostenloser Versand', shippingRegion: 'Innerhalb der Niederlande, Belgiens und Deutschlands',
    secureCheckout: 'Sicher bezahlen', helpChoice: 'Hilfe bei der Auswahl', directContact: 'Direkter Kontakt mit Lumora',
    promoAria: '2 plus 1 gratis Stecklingsplug-Aktion', promoBadge: '2 kaufen + 1 gratis', promoTitle: '2 Kartons Stecklingsplugs kaufen und 1 Karton gratis erhalten', promoPrice: '3 Kartons für €180', promoChoice: '84 oder 104 wählen', promoShipping: 'Versand inklusive', promoAction: 'Aktion ansehen',
  },
} as const

export const homeCopy = {
  nl: {
    title: 'Gerichte producten voor sterke, verzorgde planten.', lead: 'Stekpluggen van steenwol voor zaaien en stekken. NeemX Pro voor gerichte plantverzorging. Twee heldere productlijnen, direct online te bestellen.', products: 'Bekijk de producten', help: 'Hulp bij kiezen', proofOne: 'Slechts twee productlijnen', proofTwo: 'iDEAL, Wero & creditcard', heroTitle: 'Stekpluggen Steenwol', heroText: 'Voor een overzichtelijke opkweek', miniTop: 'Ook voor plantverzorging', miniTitle: 'Ontdek NeemX Pro', specialty: 'Twee specialismen', chooseTitle: 'Kies wat je plant nu nodig heeft.', chooseText: 'Begin bij je doel. De juiste uitvoering kies je pas daarna, zonder een overvolle catalogus.', adviceImage: 'Productadvies zonder omwegen', simple: 'Eenvoudig kiezen', routeTitle: 'Van teeltvraag naar het juiste product.', routeText: 'Geen eindeloze productlijst. Kies eerst tussen opkweek en plantverzorging en vergelijk daarna alleen de uitvoeringen die relevant zijn.', steps: [['Kies je toepassing', 'Opkweek met stekpluggen van steenwol of verzorging met NeemX Pro.'], ['Selecteer de uitvoering', 'Vergelijk tray-indeling of inhoudsmaat in één overzicht.'], ['Bestel met duidelijkheid', 'Bekijk levering, totaal en voorwaarden vóór je betaalt.']], compare: 'Vergelijk beide producten', personal: 'Persoonlijk contact', unsure: 'Niet zeker welke uitvoering past?', helpText: 'Stuur je vraag rechtstreeks naar Lumora. Zo kies je met de productinformatie die voor jouw situatie relevant is.', question: 'Stel je productvraag',
  },
  en: {
    title: 'Focused products for strong, well-cared-for plants.', lead: 'Rockwool cutting plugs for sowing and cuttings. NeemX Pro for focused plant care. Two clear product lines, available to order online.', products: 'View the products', help: 'Help me choose', proofOne: 'Only two product lines', proofTwo: 'iDEAL, Wero & credit card', heroTitle: 'Rockwool Cutting Plugs', heroText: 'For organised propagation', miniTop: 'Also for plant care', miniTitle: 'Discover NeemX Pro', specialty: 'Two specialties', chooseTitle: 'Choose what your plants need now.', chooseText: 'Start with your goal. Choose the right version afterwards, without an overcrowded catalogue.', adviceImage: 'Straightforward product advice', simple: 'Simple selection', routeTitle: 'From growing question to the right product.', routeText: 'No endless product list. First choose propagation or plant care, then compare only the relevant versions.', steps: [['Choose your application', 'Propagation with rockwool cutting plugs or plant care with NeemX Pro.'], ['Select the version', 'Compare tray layout or bottle size in one overview.'], ['Order with clarity', 'Review delivery, total and terms before you pay.']], compare: 'Compare both products', personal: 'Personal contact', unsure: 'Not sure which version fits?', helpText: 'Send your question directly to Lumora and choose with the product information relevant to your situation.', question: 'Ask your product question',
  },
  de: {
    title: 'Gezielte Produkte für starke, gepflegte Pflanzen.', lead: 'Steinwoll-Stecklingsplugs für Aussaat und Stecklinge. NeemX Pro für gezielte Pflanzenpflege. Zwei klare Produktlinien, direkt online bestellbar.', products: 'Produkte ansehen', help: 'Hilfe bei der Auswahl', proofOne: 'Nur zwei Produktlinien', proofTwo: 'iDEAL, Wero & Kreditkarte', heroTitle: 'Steinwoll-Stecklingsplugs', heroText: 'Für eine übersichtliche Anzucht', miniTop: 'Auch für die Pflanzenpflege', miniTitle: 'NeemX Pro entdecken', specialty: 'Zwei Spezialgebiete', chooseTitle: 'Wählen Sie, was Ihre Pflanzen jetzt brauchen.', chooseText: 'Beginnen Sie mit Ihrem Ziel. Die passende Ausführung wählen Sie anschließend – ohne überfüllten Katalog.', adviceImage: 'Produktberatung ohne Umwege', simple: 'Einfach auswählen', routeTitle: 'Von der Anbaufrage zum passenden Produkt.', routeText: 'Keine endlose Produktliste. Wählen Sie zuerst Anzucht oder Pflanzenpflege und vergleichen Sie danach nur die relevanten Ausführungen.', steps: [['Anwendung wählen', 'Anzucht mit Steinwoll-Stecklingsplugs oder Pflege mit NeemX Pro.'], ['Ausführung auswählen', 'Tray-Aufteilung oder Flaschengröße auf einen Blick vergleichen.'], ['Klar bestellen', 'Lieferung, Gesamtpreis und Bedingungen vor der Zahlung prüfen.']], compare: 'Beide Produkte vergleichen', personal: 'Persönlicher Kontakt', unsure: 'Unsicher, welche Ausführung passt?', helpText: 'Senden Sie Ihre Frage direkt an Lumora. So entscheiden Sie mit den Produktinformationen, die für Ihre Situation relevant sind.', question: 'Produktfrage stellen',
  },
} as const

export const productsPageCopy = {
  nl: { eyebrow: 'De Lumora collectie', title: 'Kies je productlijn.', intro: 'Begin bij wat je wilt doen: opkweken met stekpluggen van steenwol of je planten verzorgen met NeemX Pro.', action: 'Bekijk beide productlijnen', lines: '2 productlijnen', variants: '5 uitvoeringen', glance: 'In één oogopslag', compareTitle: 'Van doel naar product.', compareIntro: 'Beide lijnen hebben een eigen toepassing. Vergelijk alleen wat je nodig hebt en kies daarna de juiste uitvoering.', seek: 'Je zoekt', application: 'Toepassing', growing: 'Zaaien en stekken', care: 'Plant- en bladverzorging', versions: 'Uitvoeringen', next: 'Volgende stap', choosePlugs: 'Kies je stekpluggen', chooseSize: 'Kies je formaat', uncertain: 'Nog niet zeker?', tell: 'Vertel ons wat je wilt bereiken.', help: 'Neem rechtstreeks contact op met Lumora voor hulp bij je product- of variantkeuze.', advice: 'Vraag productadvies' },
  en: { eyebrow: 'The Lumora collection', title: 'Choose your product line.', intro: 'Start with your goal: propagate with rockwool cutting plugs or care for your plants with NeemX Pro.', action: 'View both product lines', lines: '2 product lines', variants: '5 versions', glance: 'At a glance', compareTitle: 'From goal to product.', compareIntro: 'Each line has its own application. Compare only what you need, then choose the right version.', seek: 'You need', application: 'Application', growing: 'Sowing and cuttings', care: 'Plant and leaf care', versions: 'Versions', next: 'Next step', choosePlugs: 'Choose your cutting plugs', chooseSize: 'Choose your size', uncertain: 'Still unsure?', tell: 'Tell us what you want to achieve.', help: 'Contact Lumora directly for help choosing your product or version.', advice: 'Ask for product advice' },
  de: { eyebrow: 'Die Lumora Kollektion', title: 'Wählen Sie Ihre Produktlinie.', intro: 'Beginnen Sie mit Ihrem Ziel: Anzucht mit Steinwoll-Stecklingsplugs oder Pflanzenpflege mit NeemX Pro.', action: 'Beide Produktlinien ansehen', lines: '2 Produktlinien', variants: '5 Ausführungen', glance: 'Auf einen Blick', compareTitle: 'Vom Ziel zum Produkt.', compareIntro: 'Beide Linien haben ihren eigenen Einsatzbereich. Vergleichen Sie nur, was Sie benötigen, und wählen Sie anschließend die passende Ausführung.', seek: 'Sie suchen', application: 'Anwendung', growing: 'Aussaat und Stecklinge', care: 'Pflanzen- und Blattpflege', versions: 'Ausführungen', next: 'Nächster Schritt', choosePlugs: 'Stecklingsplugs wählen', chooseSize: 'Größe wählen', uncertain: 'Noch unsicher?', tell: 'Sagen Sie uns, was Sie erreichen möchten.', help: 'Kontaktieren Sie Lumora direkt, wenn Sie Hilfe bei der Produkt- oder Variantenauswahl benötigen.', advice: 'Produktberatung anfragen' },
} as const
