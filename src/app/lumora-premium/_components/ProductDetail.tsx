'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { resolveProductVariant } from '@/lib/storefront-product-seo'
import { useCart } from '@/contexts/CartContext'
import {
  VOLUME_DISCOUNT_TIERS,
  calculateDiscountedPrice,
  calculateTotalPrice,
  getDiscountInfo,
} from '@/lib/volume-discount'
import {
  calculatePaperbusPromotion,
  PAPERBUS_PROMO_PRICE,
  PAPERBUS_PROMO_QUANTITY,
} from '@/lib/paperbus-promo'
import type { ProductFamily } from '../_data/products'
import { formatPrice } from '../_data/products'
import { getStorefrontRoutes } from '../_data/routes'
import { localizeStorefrontRoutes, type StorefrontLocale } from './storefront-localization'
import styles from '../storefront.module.css'
import {
  ArrowRightIcon,
  BagIcon,
  CheckIcon,
  ChevronDownIcon,
  MessageIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
} from './Icons'
import { PaymentLogos } from './PaymentLogos'

const NEEMX_YIELD_BY_VARIANT = {
  'neemx-10': { solution: '1–4 liter', coverage: '10–40 m²' },
  'neemx-30': { solution: '3–12 liter', coverage: '30–120 m²' },
  'neemx-50': { solution: '5–20 liter', coverage: '50–200 m²' },
} as const

const NEEMX_DOSAGE_ROWS = [
  ['2,5 ml/L', '± 0,25 ml'],
  ['5 ml/L', '± 0,5 ml'],
  ['7 ml/L', '± 0,7 ml'],
  ['10 ml/L', '± 1 ml'],
] as const

const PDP_COPY = {
  nl: {
    home: 'Home', products: 'Producten', images: 'Productafbeeldingen', showImage: 'Toon productafbeelding', growingTag: 'Voor zaaien & stekken', careTag: 'Voor bladverzorging', plugsTitle: 'Steenwol stekpluggen: kies 84 of 104 cellen.', pricePer: 'Prijs voor', perBox: 'Per doos', trays: 'trays', cellsTotal: 'cellen totaal', choosePlugs: 'Kies 84 of 104', chooseNeemx: 'Kies 10, 30 of 50 ml', promoHeader: '2 + 1 gratis actie', active: 'Actief', promoTitle: '2 + 1 gratis', promoLead: 'ontvang de derde doos gratis en betaal', promoTotal: 'totaal.', promoShipping: 'Verzending inbegrepen naar NL, BE en DE.', promoChosen: '2 + 1 gratis gekozen', choosePromo: 'Kies 2 + 1 gratis', promoActive: 'actief · verzending inbegrepen', perBottle: 'per fles', save: 'Je bespaart', quantity: 'Aantal', lower: 'Aantal verlagen', raise: 'Aantal verhogen', adding: 'Bezig met toevoegen…', addBoxes: 'dozen toe', addCart: 'in winkelwagen', freeShipping: 'Gratis verzending', paymentMethods: 'Betaalmethoden', question: 'Productvraag?', contact: 'Neem contact op', volume: 'Staffelkorting', equalSize: 'Per gelijk flesformaat', chooseTier: 'Kies een staffel en aantal', bottlesNoDiscount: 'flessen zonder staffelkorting', bottlesFor: 'flessen voor', discountActive: 'staffelkorting actief', bottle: 'fles', bottles: 'flessen', until: 'tot', professional: 'Voor professionele afname', bulkTitle: 'Ook verkrijgbaar vanaf 1 liter', bulkText: 'NeemXPRO is ook leverbaar in een 1-literverpakking en grotere volumes. Vraag naar de beschikbaarheid en ontvang een offerte op maat.', quote: 'Vraag een offerte aan', specs: 'Specificaties', cellsTray: 'Cellen per tray', plugSize: 'Plugmaat', traysBox: 'Trays per doos', cellsBox: 'Cellen per doos', technology: 'Papertechnologie', directPlant: 'Direct uitplantbaar: plant de complete plug zonder de paper-wikkel te verwijderen.', backSize: 'Terug naar maatkeuze', dosage: 'Dosering & opbrengst', dosageIntro: 'Gebruik de actuele gebruiksaanwijzing om de passende dosering te bepalen. Begin altijd met de laagste dosering.', dosageCaption: 'NeemXPRO dosering per liter en per vierkante meter', perLitre: 'Dosering per liter', perSquare: 'Concentraat per m²*', selected: 'geselecteerd', makes: 'maak je', sprayFor: 'spuitoplossing voor indicatief', dosageFoot: '*Gebaseerd op circa 100 ml aangemaakte spuitoplossing per m².', test: 'Test eerst op een klein deel van de plant en spuit niet in direct zonlicht.', what: 'Wat is NeemXPRO?', whatText: 'NeemXPRO combineert hoogwaardige plantaardige oliën met een natuurlijke antioxidant en emulgatoren. Het emulgatorsysteem helpt de olieblend gelijkmatig met water te mengen voor de verzorging van het bladoppervlak.', storage: 'Bewaren & voorbereiden', storageText: 'Bij lage temperaturen kan het concentraat dikker worden. Breng het product voor gebruik op kamertemperatuur en schud goed. Maak alleen de hoeveelheid spuitoplossing aan die je direct nodig hebt en gebruik deze dezelfde dag.', delivery: 'Levering & retour', plugsReturn: 'Verzending binnen Nederland, België en Duitsland is gratis. Voor consumenten geldt 14 dagen bedenktijd; bekijk vóór aankoop altijd het volledige retourbeleid.', neemxReturn: 'Verzending binnen Nederland, België en Duitsland is gratis. NeemXPRO kan alleen retour als de fles ongeopend is, de verzegeling van de draaidop volledig intact is en de fles inclusief etiket in originele staat verkeert.', explained: 'Helder uitgelegd', why: 'Waarom NeemXPRO', plugsHighlight: 'Eén productlijn, twee traykeuzes.', neemxHighlight: 'Ontwikkeld voor gelijkmatige bladverzorging.', chooseBottle: 'Kies je flesformaat', usePlug: 'Zo gebruik je de plug', useNeemx: 'Zo gebruik je NeemXPRO', trayToPlant: 'Van tray naar uitplanten.', concentrateToFresh: 'Van concentraat naar verse spuitoplossing.', ask: 'Stel je productvraag', chosenDock: 'verzending inbegrepen', boxesDock: '3 dozen', addDock: 'In winkelwagen', genericError: 'Toevoegen lukt nu niet. Probeer het opnieuw of neem contact met ons op.', priceError: 'De prijs wordt bijgewerkt. Vernieuw de pagina en probeer opnieuw.', productError: 'Product kon niet worden geladen',
  },
  en: {
    home: 'Home', products: 'Products', images: 'Product images', showImage: 'Show product image', growingTag: 'For sowing & cuttings', careTag: 'For leaf care', plugsTitle: 'Professional Paper Plug Trays.', pricePer: 'Price for', perBox: 'Per box', trays: 'trays', cellsTotal: 'cells in total', choosePlugs: 'Choose 84 or 104', chooseNeemx: 'Choose 10, 30 or 50 ml', promoHeader: 'Buy 2 + get 1 free', active: 'Active', promoTitle: 'Buy 2 + get 1 free', promoLead: 'receive the third box free and pay', promoTotal: 'in total.', promoShipping: 'Shipping to NL, BE and DE included.', promoChosen: 'Buy 2 + get 1 free selected', choosePromo: 'Choose buy 2 + get 1 free', promoActive: 'free third box active · shipping included', perBottle: 'per bottle', save: 'You save', quantity: 'Quantity', lower: 'Decrease quantity', raise: 'Increase quantity', adding: 'Adding…', addBoxes: 'boxes ·', addCart: 'to cart', freeShipping: 'Free shipping', paymentMethods: 'Payment methods', question: 'Product question?', contact: 'Contact us', volume: 'Volume discount', equalSize: 'Per identical bottle size', chooseTier: 'Choose a tier and quantity', bottlesNoDiscount: 'bottles without volume discount', bottlesFor: 'bottles for', discountActive: 'volume discount active', bottle: 'bottle', bottles: 'bottles', until: 'until', professional: 'For professional orders', bulkTitle: 'Also available from 1 litre', bulkText: 'NeemXPRO is also available in 1-litre packaging and larger volumes. Ask about availability and receive a tailored quote.', quote: 'Request a quote', specs: 'Specifications', cellsTray: 'Cells per tray', plugSize: 'Plug size', traysBox: 'Trays per box', cellsBox: 'Cells per box', technology: 'Paper technology', directPlant: 'Ready to plant directly: plant the complete plug without removing the paper sleeve.', backSize: 'Back to size selection', dosage: 'Dosage & yield', dosageIntro: 'Use the current instructions to determine the appropriate dosage. Always start with the lowest dosage.', dosageCaption: 'NeemXPRO dosage per litre and per square metre', perLitre: 'Dosage per litre', perSquare: 'Concentrate per m²*', selected: 'selected', makes: 'makes', sprayFor: 'of spray solution for approximately', dosageFoot: '*Based on approximately 100 ml of prepared spray solution per m².', test: 'Test on a small part of the plant first and do not spray in direct sunlight.', what: 'What is NeemXPRO?', whatText: 'NeemXPRO combines high-quality plant oils with a natural antioxidant and emulsifiers. The emulsifier system helps the botanical oil blend mix evenly with water for care of the leaf surface.', storage: 'Storage & preparation', storageText: 'The concentrate may thicken at low temperatures. Bring the product to room temperature before use and shake well. Prepare only the amount of spray solution you need and use it the same day.', delivery: 'Delivery & returns', plugsReturn: 'Shipping within the Netherlands, Belgium and Germany is free. Consumers have a 14-day cooling-off period; always read the complete return policy before purchase.', neemxReturn: 'Shipping within the Netherlands, Belgium and Germany is free. NeemXPRO can only be returned if the bottle is unopened, the seal on the screw cap is completely intact and unbroken, and the bottle and label are still in their original condition.', explained: 'Clearly explained', why: 'Why NeemXPRO', plugsHighlight: 'One product line, two tray options.', neemxHighlight: 'Developed for even leaf care.', chooseBottle: 'Choose your bottle size', usePlug: 'How to use the plug', useNeemx: 'How to use NeemXPRO', trayToPlant: 'From tray to planting.', concentrateToFresh: 'From concentrate to fresh spray solution.', ask: 'Ask your product question', chosenDock: 'shipping included', boxesDock: '3 boxes', addDock: 'Add to cart', genericError: 'We cannot add this item right now. Try again or contact us.', priceError: 'The price is being updated. Refresh the page and try again.', productError: 'The product could not be loaded',
  },
  de: {
    home: 'Startseite', products: 'Produkte', images: 'Produktbilder', showImage: 'Produktbild anzeigen', growingTag: 'Für Aussaat & Stecklinge', careTag: 'Für Blattpflege', plugsTitle: 'Professionelle Paper Plug Trays.', pricePer: 'Preis für', perBox: 'Pro Karton', trays: 'Anzuchtplatten', cellsTotal: 'Zellen insgesamt', choosePlugs: '84 oder 104 wählen', chooseNeemx: '10, 30 oder 50 ml wählen', promoHeader: '2 kaufen + 1 gratis', active: 'Aktiv', promoTitle: '2 kaufen + 1 gratis', promoLead: 'erhalten Sie den dritten Karton gratis und zahlen', promoTotal: 'insgesamt.', promoShipping: 'Versand nach NL, BE und DE inklusive.', promoChosen: 'Gratis-Karton ausgewählt', choosePromo: '2 kaufen + 1 gratis wählen', promoActive: 'Gratis-Karton aktiv · Versand inklusive', perBottle: 'pro Flasche', save: 'Sie sparen', quantity: 'Anzahl', lower: 'Anzahl verringern', raise: 'Anzahl erhöhen', adding: 'Wird hinzugefügt…', addBoxes: 'Kartons ·', addCart: 'in den Warenkorb', freeShipping: 'Kostenloser Versand', paymentMethods: 'Zahlungsmethoden', question: 'Produktfrage?', contact: 'Kontakt aufnehmen', volume: 'Mengenrabatt', equalSize: 'Je gleicher Flaschengröße', chooseTier: 'Staffel und Anzahl wählen', bottlesNoDiscount: 'Flaschen ohne Mengenrabatt', bottlesFor: 'Flaschen für', discountActive: 'Mengenrabatt aktiv', bottle: 'Flasche', bottles: 'Flaschen', until: 'bis', professional: 'Für professionelle Abnahme', bulkTitle: 'Auch ab 1 Liter erhältlich', bulkText: 'NeemXPRO ist auch in 1-Liter-Verpackungen und größeren Mengen erhältlich. Fragen Sie nach der Verfügbarkeit und erhalten Sie ein individuelles Angebot.', quote: 'Angebot anfragen', specs: 'Spezifikationen', cellsTray: 'Zellen pro Anzuchtplatte', plugSize: 'Pluggröße', traysBox: 'Anzuchtplatten pro Karton', cellsBox: 'Zellen pro Karton', technology: 'Papiertechnologie', directPlant: 'Direkt auspflanzbar: Pflanzen Sie den kompletten Plug ein, ohne die Papierhülle zu entfernen.', backSize: 'Zurück zur Größenauswahl', dosage: 'Dosierung & Ergiebigkeit', dosageIntro: 'Bestimmen Sie die passende Dosierung anhand der aktuellen Gebrauchsanweisung. Beginnen Sie immer mit der niedrigsten Dosierung.', dosageCaption: 'NeemXPRO Dosierung pro Liter und Quadratmeter', perLitre: 'Dosierung pro Liter', perSquare: 'Konzentrat pro m²*', selected: 'ausgewählt', makes: 'ergibt', sprayFor: 'Sprühlösung für ungefähr', dosageFoot: '*Basierend auf etwa 100 ml zubereiteter Sprühlösung pro m².', test: 'Zuerst an einem kleinen Pflanzenteil testen und nicht in direktem Sonnenlicht sprühen.', what: 'Was ist NeemXPRO?', whatText: 'NeemXPRO kombiniert hochwertige pflanzliche Öle mit einem natürlichen Antioxidans und Emulgatoren. Das Emulgatorsystem unterstützt die gleichmäßige Vermischung der botanischen Ölmischung mit Wasser zur Pflege der Blattoberfläche.', storage: 'Aufbewahrung & Vorbereitung', storageText: 'Bei niedrigen Temperaturen kann das Konzentrat dickflüssiger werden. Bringen Sie das Produkt vor Gebrauch auf Raumtemperatur und schütteln Sie es gut. Bereiten Sie nur die benötigte Menge vor und verwenden Sie die Sprühlösung noch am selben Tag.', delivery: 'Lieferung & Rückgabe', plugsReturn: 'Der Versand innerhalb der Niederlande, Belgiens und Deutschlands ist kostenlos. Für Verbraucher gilt eine 14-tägige Widerrufsfrist; lesen Sie vor dem Kauf immer das vollständige Rückgaberecht.', neemxReturn: 'Der Versand innerhalb der Niederlande, Belgiens und Deutschlands ist kostenlos. NeemXPRO kann nur zurückgegeben werden, wenn die Flasche ungeöffnet ist, die Versiegelung des Schraubverschlusses vollständig intakt und nicht aufgebrochen ist und sich Flasche und Etikett noch im Originalzustand befinden.', explained: 'Klar erklärt', why: 'Warum NeemXPRO', plugsHighlight: 'Eine Produktlinie, zwei Anzuchtplatten.', neemxHighlight: 'Für gleichmäßige Blattpflege entwickelt.', chooseBottle: 'Flaschengröße wählen', usePlug: 'So verwenden Sie den Plug', useNeemx: 'So verwenden Sie NeemXPRO', trayToPlant: 'Von der Anzuchtplatte zum Auspflanzen.', concentrateToFresh: 'Vom Konzentrat zur frischen Sprühlösung.', ask: 'Produktfrage stellen', chosenDock: 'Versand inklusive', boxesDock: '3 Kartons', addDock: 'In den Warenkorb', genericError: 'Der Artikel kann derzeit nicht hinzugefügt werden. Versuchen Sie es erneut oder kontaktieren Sie uns.', priceError: 'Der Preis wird aktualisiert. Laden Sie die Seite neu und versuchen Sie es erneut.', productError: 'Das Produkt konnte nicht geladen werden',
  },
} as const

function getTierLabel(minQuantity: number, maxQuantity: number | null) {
  return maxQuantity === null ? `${minQuantity}+` : `${minQuantity}–${maxQuantity}`
}

export function ProductDetail({ product, locale = 'nl', children }: { product: ProductFamily; locale?: StorefrontLocale; children?: ReactNode }) {
  const copy = PDP_COPY[locale]
  const router = useRouter()
  const pathname = usePathname()
  const routes = localizeStorefrontRoutes(getStorefrontRoutes(pathname), locale)
  const { addItem } = useCart()
  const searchParams = useSearchParams()
  const variant = resolveProductVariant(product, searchParams.get('variant'))
  const variantId = variant.id
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [purchaseError, setPurchaseError] = useState<string | null>(null)
  const fallbackGallery = [
    { src: product.mainImage, alt: product.mainImageAlt },
    { src: product.secondaryImage, alt: product.secondaryImageAlt },
    ...(product.tertiaryImage && product.tertiaryImageAlt
      ? [{ src: product.tertiaryImage, alt: product.tertiaryImageAlt, fit: 'cover' as const }]
      : []),
  ]
  const gallery = variant.images?.length ? variant.images : fallbackGallery
  const activeImageIndex = Math.min(imageIndex, gallery.length - 1)
  const activeImage = gallery[activeImageIndex]
  const isPaperbus = product.id === 'paperbus'
  const paperbusSlug = variant.slug
  const compactVariantLabel = variant.shortLabel ?? variant.label
  const selectedBoxContents = isPaperbus
    ? locale === 'de'
      ? `${variant.traysPerBox} Platten · ${variant.cellsPerBox} Zellen`
      : `${variant.traysPerBox} ${copy.trays} · ${variant.cellsPerBox} ${copy.cellsTotal}`
    : variant.detail
  const originalTotal = variant.price * quantity
  const discountInfo = getDiscountInfo(quantity)
  const discountedUnitPrice = calculateDiscountedPrice(variant.price, quantity)
  const discountedTotal = calculateTotalPrice(variant.price, quantity)
  const paperbusPromotion = calculatePaperbusPromotion(paperbusSlug, variant.price, quantity)
  const productTotal = isPaperbus ? paperbusPromotion.total : discountedTotal
  const savings = isPaperbus
    ? paperbusPromotion.discount
    : Math.max(0, originalTotal - discountedTotal)
  const nextTierQuantity = discountInfo.nextTier?.quantity ?? null
  const bottlesToNextTier = nextTierQuantity === null ? 0 : nextTierQuantity - quantity
  const neemxYield = NEEMX_YIELD_BY_VARIANT[variant.id as keyof typeof NEEMX_YIELD_BY_VARIANT]
  const usageImage = product.usageImage ?? product.tertiaryImage ?? product.secondaryImage
  const usageImageAlt = product.usageImageAlt ?? product.tertiaryImageAlt ?? product.secondaryImageAlt
  const usageSteps = isPaperbus
    ? [
        [locale === 'en' ? 'Choose the cell density' : locale === 'de' ? 'Zellendichte wählen' : 'Kies je celdichtheid', locale === 'en' ? `${variant.label} has ${variant.cellsPerTray} cells measuring Ø${variant.cellDiameterMm} × ${variant.cellDepthMm} mm deep.` : locale === 'de' ? `${variant.label} besitzt ${variant.cellsPerTray} Zellen von Ø${variant.cellDiameterMm} × ${variant.cellDepthMm} mm Tiefe.` : `${variant.label} heeft ${variant.cellsPerTray} cellen van Ø${variant.cellDiameterMm} × ${variant.cellDepthMm} mm diep.`],
        [locale === 'en' ? 'Grow in complete trays' : locale === 'de' ? 'In kompletten Anzuchtplatten kultivieren' : 'Kweek in complete trays', locale === 'en' ? `One box contains ${variant.traysPerBox} trays with ${variant.cellsPerBox} propagation cells in total.` : locale === 'de' ? `Ein Karton enthält ${variant.traysPerBox} Anzuchtplatten mit insgesamt ${variant.cellsPerBox} Anzuchtzellen.` : `Eén doos bevat ${variant.traysPerBox} trays met in totaal ${variant.cellsPerBox} kweekcellen.`],
        [locale === 'en' ? 'Plant the complete plug' : locale === 'de' ? 'Kompletten Plug auspflanzen' : 'Plant de complete plug uit', locale === 'en' ? 'Do not remove the paper sleeve. Roots can continue to grow through it after planting.' : locale === 'de' ? 'Entfernen Sie die Papierhülle nicht. Die Wurzeln können nach dem Auspflanzen durch die Hülle weiterwachsen.' : 'Verwijder de paper-wikkel niet. Wortels kunnen na het uitplanten door de wikkel verder groeien.'],
      ]
    : [
        [locale === 'en' ? 'Bring to room temperature' : locale === 'de' ? 'Auf Raumtemperatur bringen' : 'Breng op kamertemperatuur', locale === 'en' ? 'Has the concentrate thickened in the cold? Let it reach room temperature first, then shake well.' : locale === 'de' ? 'Ist das Konzentrat durch Kälte dickflüssiger geworden? Bringen Sie es zuerst auf Raumtemperatur und schütteln Sie es anschließend gut.' : 'Is het concentraat door kou dikker geworden? Laat het eerst op kamertemperatuur komen en schud daarna goed.'],
        [locale === 'en' ? 'Dilute according to the instructions' : locale === 'de' ? 'Nach Gebrauchsanweisung verdünnen' : 'Verdun volgens de gebruiksaanwijzing', locale === 'en' ? 'Mix the correct amount of concentrate with water and distribute it evenly.' : locale === 'de' ? 'Mischen Sie die richtige Menge Konzentrat mit Wasser und sorgen Sie für eine gleichmäßige Verteilung.' : 'Meng de juiste hoeveelheid concentraat met water en zorg voor een gelijkmatige verdeling.'],
        [locale === 'en' ? 'Prepare only what you use' : locale === 'de' ? 'Nur die benötigte Menge ansetzen' : 'Maak alleen aan wat je gebruikt', locale === 'en' ? 'Prepare only the amount you need and use the spray solution the same day.' : locale === 'de' ? 'Bereiten Sie nur die benötigte Menge vor und verwenden Sie die Sprühlösung noch am selben Tag.' : 'Bereid alleen de benodigde hoeveelheid en gebruik de aangemaakte spuitoplossing dezelfde dag.'],
      ]
  const highlightDescriptions = isPaperbus
    ? [
        locale === 'en' ? 'The FP 12+ paper sleeve protects the plug during a longer propagation period.' : locale === 'de' ? 'Die FP 12+ Papierhülle schützt den Plug während einer längeren Anzuchtphase.' : 'De FP 12+ paper-wikkel beschermt de plug tijdens een langere opkweekperiode.',
        locale === 'en' ? 'Plant the complete plug without removing the paper sleeve.' : locale === 'de' ? 'Pflanzen Sie den kompletten Plug ein, ohne die Papierhülle zu entfernen.' : 'Plant de complete plug uit zonder de paper-wikkel te verwijderen.',
        locale === 'en' ? `${variant.label} is supplied as ${variant.traysPerBox} trays with ${variant.cellsPerBox} cells per box.` : locale === 'de' ? `${variant.label} wird als ${variant.traysPerBox} Anzuchtplatten mit ${variant.cellsPerBox} Zellen pro Karton geliefert.` : `${variant.label} wordt geleverd als ${variant.traysPerBox} trays met ${variant.cellsPerBox} cellen per doos.`,
      ]
    : [
        locale === 'en' ? 'The high concentration means only a small amount is needed per litre of spray solution.' : locale === 'de' ? 'Dank der hohen Konzentration wird pro Liter Sprühlösung nur eine kleine Menge benötigt.' : 'Door de hoge concentratie heb je per liter spuitoplossing slechts een kleine hoeveelheid nodig.',
        locale === 'en' ? 'The emulsifier system helps the botanical oil blend mix well and evenly with water.' : locale === 'de' ? 'Das Emulgatorsystem unterstützt die gute und gleichmäßige Vermischung der botanischen Ölmischung mit Wasser.' : 'Het emulgatorsysteem helpt de botanische olieblend goed en gelijkmatig met water te mengen.',
        locale === 'en' ? 'The prepared solution is intended for even coverage of the leaf surface.' : locale === 'de' ? 'Die zubereitete Lösung ist für eine gleichmäßige Benetzung der Blattoberfläche bestimmt.' : 'De aangemaakte oplossing is bedoeld voor een gelijkmatige bedekking van het bladoppervlak.',
      ]

  async function addSelectedProductToCart() {
    if (isAdding) return
    setIsAdding(true)
    setPurchaseError(null)

    try {
      const response = await fetch(`/api/products/slug/${encodeURIComponent(variant.slug)}?locale=nl`, {
        cache: 'no-store',
      })
      const data = await response.json() as {
        success?: boolean
        product?: { id?: string; price?: number }
      }
      const productId = data.product?.id
      const databasePrice = data.product?.price

      if (!response.ok || !data.success || !productId || typeof databasePrice !== 'number') {
        throw new Error(copy.productError)
      }

      if (Math.abs(databasePrice - variant.price) > 0.001) {
        throw new Error(copy.priceError)
      }

      addItem({
        product_id: productId,
        slug: variant.slug,
        name: isPaperbus ? variant.label : `NeemXPRO ${variant.label}`,
        price: variant.price,
        image_url: gallery[0]?.src ?? product.mainImage,
      }, quantity)
      router.push(routes.cart)
    } catch (error) {
      setPurchaseError(error instanceof Error && error.message === copy.priceError
        ? error.message
        : copy.genericError)
      setIsAdding(false)
    }
  }

  return (
    <main>
      <div className={`${styles.container} ${styles.breadcrumbs}`}>
        <Link href={routes.home}>{copy.home}</Link><span>/</span>
        <Link href={routes.products}>{copy.products}</Link><span>/</span>
        <strong>{product.name}</strong>
      </div>

      <section className={`${styles.container} ${styles.pdpGrid}`}>
        <div className={styles.gallery}>
          <div className={styles.galleryStage}>
            <div className={styles.galleryThumbs} aria-label={copy.images}>
              {gallery.map((image, index) => (
                <button
                  type="button"
                  className={activeImageIndex === index ? styles.galleryThumbActive : ''}
                  key={image.src}
                  onClick={() => setImageIndex(index)}
                  aria-label={`${copy.showImage} ${index + 1}`}
                  aria-pressed={activeImageIndex === index}
                >
                  <Image src={image.src} alt="" fill sizes="80px" />
                </button>
              ))}
            </div>
            <div className={`${styles.galleryMain} ${styles[`galleryMain_${product.id}`]}`}>
              <Image
                className={activeImage.fit === 'cover'
                  ? styles.galleryDetailImage
                  : activeImage.fit === 'portrait'
                    ? styles.galleryPortraitImage
                    : undefined}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 50vw"
              />
              <span className={styles.galleryTag}>{isPaperbus ? copy.growingTag : copy.careTag}</span>
            </div>
          </div>
        </div>

        <div className={`${styles.productSummary} ${styles[`productSummary_${product.id}`]}`} id="koopblok">
          <span className={styles.eyebrow}>{product.eyebrow}</span>
          <h1>{isPaperbus ? copy.plugsTitle : 'NeemXPRO'}</h1>

          <div className={styles.priceLine}>
            <strong>{formatPrice(variant.price, locale)}</strong>
            <span>{isPaperbus ? `${copy.perBox} · ${selectedBoxContents}` : `${copy.pricePer} ${variant.label}`}</span>
          </div>

          <fieldset className={styles.variantFieldset}>
            <legend>{isPaperbus ? copy.choosePlugs : copy.chooseNeemx}</legend>
            <div className={styles.variantGrid}>
              {product.variants.map((item) => (
                <button
                  key={item.id}
                  id={`variant-${item.id}`}
                  type="button"
                  className={variantId === item.id ? styles.variantActive : ''}
                  onClick={() => {
                    const url = new URL(window.location.href)
                    url.searchParams.set('variant', item.id)
                    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
                    setImageIndex(0)
                  }}
                  aria-pressed={variantId === item.id}
                >
                  <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                  <span>{formatPrice(item.price, locale)}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {isPaperbus && (
            <section
              className={`${styles.bundleOffer} ${paperbusPromotion.eligible ? styles.bundleOfferActive : ''}`}
              aria-labelledby="stekpluggen-actie"
            >
              <div className={styles.bundleOfferHeader}>
                <span>{copy.promoHeader}</span>
                {paperbusPromotion.eligible && <strong><CheckIcon /> {copy.active}</strong>}
              </div>
              <div className={styles.bundleOfferBody}>
                <div>
                  <h2 id="stekpluggen-actie">{copy.promoTitle}</h2>
                  <p>{variant.label}: {copy.promoLead} <strong>{formatPrice(PAPERBUS_PROMO_PRICE, locale)}</strong> {copy.promoTotal}</p>
                  <small>{copy.promoShipping}</small>
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity(PAPERBUS_PROMO_QUANTITY)}
                  aria-pressed={paperbusPromotion.eligible && quantity === PAPERBUS_PROMO_QUANTITY}
                >
                  {paperbusPromotion.eligible && quantity === PAPERBUS_PROMO_QUANTITY
                    ? copy.promoChosen
                    : copy.choosePromo}
                </button>
              </div>
            </section>
          )}

          <div className={styles.purchasePanel}>
            <div className={styles.buyRow}>
              <div className={styles.selectedDecision}>
                <span className={styles.selectedDecisionCopy}>
                  <strong>{variant.label} × {quantity}</strong>
                  <small>
                    {isPaperbus && paperbusPromotion.eligible
                      ? `${paperbusPromotion.bundleCount === 1 ? copy.promoTitle : `${paperbusPromotion.bundleCount}× ${copy.promoTitle}`} ${copy.promoActive}`
                      : !isPaperbus && discountInfo.hasDiscount
                      ? `${discountInfo.currentDiscount}% ${copy.volume.toLowerCase()} · ${formatPrice(discountedUnitPrice, locale)} ${copy.perBottle}`
                      : variant.detail}
                  </small>
                  {savings > 0 && <em>{copy.save} {formatPrice(savings, locale)}</em>}
                </span>
                <span className={styles.selectedDecisionPrice}>
                  {savings > 0 && <del>{formatPrice(originalTotal, locale)}</del>}
                  <strong>{formatPrice(productTotal, locale)}</strong>
                </span>
              </div>
              <span className={styles.buyRowLabel}>{copy.quantity}</span>
              <div className={styles.quantityControl} aria-label={copy.quantity}>
                <button type="button" aria-label={copy.lower} onClick={() => setQuantity((current) => Math.max(1, current - 1))}><MinusIcon /></button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" aria-label={copy.raise} onClick={() => setQuantity((current) => current + 1)}><PlusIcon /></button>
              </div>
              <button
                type="button"
                className={styles.addButton}
                onClick={addSelectedProductToCart}
                disabled={isAdding}
                aria-busy={isAdding}
              >
                <BagIcon /> {isPaperbus && paperbusPromotion.eligible
                  ? (isAdding ? copy.adding : `${quantity} ${copy.addBoxes} ${formatPrice(productTotal, locale)}`)
                  : (isAdding ? copy.adding : `${compactVariantLabel} ${copy.addCart}`)}
              </button>
              {purchaseError && <p className={styles.purchaseError} role="alert">{purchaseError}</p>}
            </div>

            <div className={styles.purchaseProof}>
              <span><TruckIcon /><strong>{copy.freeShipping}</strong><small>NL, BE &amp; DE</small></span>
              <span className={styles.paymentBrandProof}>
                <strong>{copy.paymentMethods}</strong>
                <PaymentLogos />
              </span>
              <span><MessageIcon /><strong>{copy.question}</strong><small>{copy.contact}</small></span>
            </div>
          </div>

          {!isPaperbus && (
            <section className={styles.volumeDiscount} aria-labelledby="neemx-staffelkorting">
              <div className={styles.volumeDiscountHeader}>
                <div>
                  <strong id="neemx-staffelkorting">{copy.volume}</strong>
                  <span>{copy.equalSize}</span>
                </div>
                {discountInfo.hasDiscount && (
                  <span className={styles.volumeDiscountBadge}>−{discountInfo.currentDiscount}%</span>
                )}
              </div>
              <div className={styles.volumeTierGrid} role="group" aria-label={copy.chooseTier}>
                {VOLUME_DISCOUNT_TIERS.map((tier) => {
                  const isActive = quantity >= tier.minQuantity
                    && (tier.maxQuantity === null || quantity <= tier.maxQuantity)
                  const tierLabel = getTierLabel(tier.minQuantity, tier.maxQuantity)

                  return (
                    <button
                      key={tier.minQuantity}
                      id={`neemx-tier-${tier.minQuantity}`}
                      type="button"
                      className={isActive ? styles.volumeTierActive : ''}
                      onClick={() => setQuantity(tier.minQuantity)}
                      aria-pressed={isActive}
                      aria-label={tier.discountPercentage === 0
                        ? `${tierLabel} ${copy.bottlesNoDiscount}`
                        : `${tierLabel} ${copy.bottlesFor} ${tier.discountPercentage}% ${copy.volume.toLowerCase()}`}
                    >
                      <span>{tierLabel}</span>
                      <strong>{tier.discountPercentage === 0 ? '0%' : `−${tier.discountPercentage}%`}</strong>
                    </button>
                  )
                })}
              </div>
              <div className={styles.volumeDiscountStatus} aria-live="polite">
                <strong>
                  {discountInfo.hasDiscount
                    ? `${discountInfo.currentDiscount}% ${copy.discountActive} · ${formatPrice(discountedUnitPrice, locale)} ${copy.perBottle}.`
                    : `${formatPrice(variant.price, locale)} ${copy.perBottle}.`}
                </strong>
                {discountInfo.nextTier && (
                  <span>
                    {bottlesToNextTier} {bottlesToNextTier === 1 ? copy.bottle : copy.bottles} {copy.until} {discountInfo.nextTier.discount}% {copy.volume.toLowerCase()}.
                  </span>
                )}
              </div>
            </section>
          )}

          {!isPaperbus && (
            <section className={styles.bulkOrder} aria-labelledby="neemx-grootverpakking">
              <div>
                <span>{copy.professional}</span>
                <h2 id="neemx-grootverpakking">{copy.bulkTitle}</h2>
                <p>{copy.bulkText}</p>
              </div>
              <a
                href="mailto:info@lumorahorticulture.com?subject=Offerteaanvraag%20NeemXPRO%201%20liter%20of%20grootverpakking"
              >
                {copy.quote} <ArrowRightIcon />
              </a>
            </section>
          )}

          <p className={styles.productIntro}>{isPaperbus ? variant.description : product.description}</p>

          <div className={styles.productAccordions}>
            {isPaperbus ? (
              <details open>
                <summary>{copy.specs} {compactVariantLabel} <ChevronDownIcon /></summary>
                <div className={styles.productSpecs}>
                  <p>{variant.description}</p>
                  <dl>
                    <div><dt>{copy.cellsTray}</dt><dd>{variant.cellsPerTray}</dd></div>
                    <div><dt>{copy.plugSize}</dt><dd>Ø{variant.cellDiameterMm} × {variant.cellDepthMm} mm</dd></div>
                    <div><dt>{copy.traysBox}</dt><dd>{variant.traysPerBox}</dd></div>
                    <div><dt>{copy.cellsBox}</dt><dd>{variant.cellsPerBox}</dd></div>
                    <div><dt>{copy.technology}</dt><dd>{variant.technology}</dd></div>
                  </dl>
                  <p className={styles.productSpecsNote}>{copy.directPlant}</p>
                  <a className={styles.productSpecsAction} href="#koopblok">{copy.backSize} ↑</a>
                </div>
              </details>
            ) : (
              <details open>
                <summary>{copy.dosage} <ChevronDownIcon /></summary>
                <div className={styles.dosageContent}>
                  <p className={styles.dosageIntro}>{copy.dosageIntro}</p>
                  <table className={styles.dosageTable}>
                    <caption className={styles.srOnly}>{copy.dosageCaption}</caption>
                    <thead>
                      <tr><th>{copy.perLitre}</th><th>{copy.perSquare}</th></tr>
                    </thead>
                    <tbody>
                      {NEEMX_DOSAGE_ROWS.map(([perLiter, perSquareMeter]) => (
                        <tr key={perLiter}><th scope="row">{perLiter}</th><td>{perSquareMeter}</td></tr>
                      ))}
                    </tbody>
                  </table>
                  {neemxYield && (
                    <p className={styles.dosageResult}>
                      <strong>{variant.label} {copy.selected}</strong>
                      <span>{variant.label} {copy.makes} {neemxYield.solution} {copy.sprayFor} {neemxYield.coverage}.</span>
                    </p>
                  )}
                  <p className={styles.dosageFootnote}>{copy.dosageFoot}</p>
                  <p className={styles.dosageUseNote}>{copy.test}</p>
                </div>
              </details>
            )}
            {!isPaperbus && (
              <>
                <details>
                  <summary>{copy.what} <ChevronDownIcon /></summary>
                  <p>{copy.whatText}</p>
                </details>
                <details>
                  <summary>{copy.storage} <ChevronDownIcon /></summary>
                  <p>{copy.storageText}</p>
                </details>
              </>
            )}
            <details>
              <summary>{copy.delivery} <ChevronDownIcon /></summary>
              <p>
                {isPaperbus
                  ? copy.plugsReturn
                  : copy.neemxReturn}
              </p>
            </details>
          </div>
        </div>
      </section>

      {children}

      <section className={styles.productHighlights}>
        <div className={styles.container}>
          <div className={styles.highlightIntro}>
            <span className={styles.eyebrow}>{isPaperbus ? copy.explained : copy.why}</span>
            <h2>{isPaperbus ? copy.plugsHighlight : copy.neemxHighlight}</h2>
          </div>
          <div className={styles.highlightGrid}>
            {product.highlights.map((highlight, index) => (
              <article key={highlight}><span>0{index + 1}</span><CheckIcon /><h3>{highlight}</h3><p>{highlightDescriptions[index]}</p></article>
            ))}
          </div>
          {!isPaperbus && <a className={styles.highlightAction} href="#koopblok">{copy.chooseBottle} <ArrowRightIcon /></a>}
        </div>
      </section>

      <section className={styles.usageSection}>
        <div className={`${styles.container} ${styles.usageGrid}`}>
          <div className={`${styles.usageImage} ${styles[`usageImage_${product.id}`]}`}>
            <Image src={usageImage} alt={usageImageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" />
          </div>
          <div className={styles.usageCopy}>
            <span className={styles.eyebrow}>{isPaperbus ? copy.usePlug : copy.useNeemx}</span>
            <h2>{isPaperbus ? copy.trayToPlant : copy.concentrateToFresh}</h2>
            <div className={styles.usageSteps}>
              {usageSteps.map(([title, text], index) => (
                <div key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>
              ))}
            </div>
            <a className={styles.textLink} href="mailto:info@lumorahorticulture.com">{copy.ask} <ArrowRightIcon /></a>
          </div>
        </div>
      </section>

      <div className={styles.mobileBuyDock}>
        <div className={styles.dockQuantity} aria-label={copy.quantity}>
          <button type="button" aria-label={copy.lower} onClick={() => setQuantity((current) => Math.max(1, current - 1))}><MinusIcon /></button>
          <span aria-live="polite">{quantity}</span>
          <button type="button" aria-label={copy.raise} onClick={() => setQuantity((current) => current + 1)}><PlusIcon /></button>
        </div>
        <button
          type="button"
          className={styles.dockPrimaryAction}
          onClick={addSelectedProductToCart}
          disabled={isAdding}
          aria-busy={isAdding}
        >
          <span>
            <small>{isPaperbus && paperbusPromotion.eligible ? `${copy.promoTitle} · ${copy.chosenDock}` : `${compactVariantLabel} × ${quantity}`}</small>
            <strong>{isAdding ? copy.adding : isPaperbus && paperbusPromotion.eligible ? `${copy.boxesDock} · ${formatPrice(productTotal, locale)}` : `${copy.addDock} · ${formatPrice(productTotal, locale)}`}</strong>
          </span>
        </button>
      </div>
    </main>
  )
}
