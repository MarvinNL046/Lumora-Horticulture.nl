'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { calculateCartItemTotal } from '@/lib/cart-pricing'
import { calculatePaperbusPromotion, isPaperbusPromoSlug } from '@/lib/paperbus-promo'
import { formatPrice } from '../_data/products'
import { getLocalizedCartItemName } from '../_data/storefront-content'
import { getStorefrontRoutes } from '../_data/routes'
import { localizeStorefrontRoutes, type StorefrontLocale } from './storefront-localization'
import styles from '../storefront.module.css'
import { ArrowRightIcon, CheckIcon, LockIcon, MinusIcon, PlusIcon, TruckIcon } from './Icons'
import { PaymentLogos } from './PaymentLogos'

const COPY = {
  nl: { empty: 'Je winkelwagen is nog leeg.', emptyText: 'Kies Stekpluggen Steenwol of NeemX Pro om verder te gaan.', products: 'Bekijk de producten', eyebrow: 'Jouw selectie', title: 'Je winkelwagen.', continue: 'Verder winkelen', itemsAria: 'Producten in winkelwagen', neemx: 'Botanische bladverzorging', plugs: 'Professionele stekpluggen', applied: '2 + 1 gratis toegepast', choosePromo: 'Kies 2 + 1 gratis · €180 totaal', remove: 'Verwijderen', current: 'Huidige bestelling', article: 'artikel', articles: 'artikelen', totalWord: 'totaal', summary: 'Besteloverzicht', subtotal: 'Subtotaal', discounts: 'Actie en staffelkorting', shipping: 'Verzending NL, BE of DE', included: 'Inbegrepen', total: 'Totaal', promoLine: '2 + 1 gratis toegepast', boxes: 'dozen', checkout: 'Verder naar afrekenen', paymentsAria: 'Betaalmogelijkheden', paySafe: 'Veilig online betalen', freeShipping: 'Gratis verzending', region: 'Binnen Nederland, België en Duitsland', lower: 'verlagen', raise: 'verhogen', box: 'Per doos', cells: 'cellen', concentrate: 'geconcentreerde formule', fallback: 'Bekijk de productdetails voor de gekozen uitvoering' },
  en: { empty: 'Your cart is still empty.', emptyText: 'Choose Rockwool Cutting Plugs or NeemX Pro to continue.', products: 'View the products', eyebrow: 'Your selection', title: 'Your cart.', continue: 'Continue shopping', itemsAria: 'Products in cart', neemx: 'Botanical leaf care', plugs: 'Professional cutting plugs', applied: 'Buy 2 + get 1 free applied', choosePromo: 'Choose buy 2 + get 1 free · €180 total', remove: 'Remove', current: 'Current order', article: 'item', articles: 'items', totalWord: 'total', summary: 'Order summary', subtotal: 'Subtotal', discounts: 'Offer and volume discount', shipping: 'Shipping to NL, BE or DE', included: 'Included', total: 'Total', promoLine: 'Buy 2 + get 1 free applied', boxes: 'boxes', checkout: 'Continue to checkout', paymentsAria: 'Payment options', paySafe: 'Secure online payment', freeShipping: 'Free shipping', region: 'Within the Netherlands, Belgium and Germany', lower: 'decrease', raise: 'increase', box: 'Per box', cells: 'cells', concentrate: 'concentrated formula', fallback: 'View the product details for the selected version' },
  de: { empty: 'Ihr Warenkorb ist noch leer.', emptyText: 'Wählen Sie Steinwoll-Stecklingsplugs oder NeemX Pro, um fortzufahren.', products: 'Produkte ansehen', eyebrow: 'Ihre Auswahl', title: 'Ihr Warenkorb.', continue: 'Weiter einkaufen', itemsAria: 'Produkte im Warenkorb', neemx: 'Botanische Blattpflege', plugs: 'Professionelle Stecklingsplugs', applied: '2 kaufen + 1 gratis angewendet', choosePromo: '2 kaufen + 1 gratis wählen · €180 gesamt', remove: 'Entfernen', current: 'Aktuelle Bestellung', article: 'Artikel', articles: 'Artikel', totalWord: 'gesamt', summary: 'Bestellübersicht', subtotal: 'Zwischensumme', discounts: 'Aktion und Mengenrabatt', shipping: 'Versand nach NL, BE oder DE', included: 'Inklusive', total: 'Gesamt', promoLine: '2 kaufen + 1 gratis angewendet', boxes: 'Kartons', checkout: 'Weiter zur Kasse', paymentsAria: 'Zahlungsmöglichkeiten', paySafe: 'Sicher online bezahlen', freeShipping: 'Kostenloser Versand', region: 'Innerhalb der Niederlande, Belgiens und Deutschlands', lower: 'verringern', raise: 'erhöhen', box: 'Pro Karton', cells: 'Zellen', concentrate: 'konzentrierte Formel', fallback: 'Produktdetails der gewählten Ausführung ansehen' },
} as const

function cartItemDetail(slug: string, locale: StorefrontLocale): string {
  const copy = COPY[locale]
  const trayLabel = locale === 'de' ? 'Platten' : 'trays'
  if (slug === 'paper-plug-tray-84') return `${copy.box}: 8 ${trayLabel} · 672 ${copy.cells}`
  if (slug === 'paper-plug-tray-104') return `${copy.box}: 7 ${trayLabel} · 728 ${copy.cells}`
  if (slug === 'neemx-pro-10ml') return `10 ml · ${copy.concentrate}`
  if (slug === 'neemx-pro-30ml') return `30 ml · ${copy.concentrate}`
  if (slug === 'neemx-pro-50ml') return `50 ml · ${copy.concentrate}`
  return copy.fallback
}

export function CartPage({ locale = 'nl' }: { locale?: StorefrontLocale }) {
  const copy = COPY[locale]
  const emptyText = locale === 'en'
    ? 'Choose a Paper Plug Tray or NeemX Pro to continue.'
    : locale === 'de'
      ? 'Wählen Sie eine Paper Plug Tray oder NeemX Pro, um fortzufahren.'
      : copy.emptyText
  const paperPlugCategory = locale === 'en'
    ? 'Professional Paper Plug Trays'
    : locale === 'de'
      ? 'Professionelle Paper Plug Trays'
      : copy.plugs
  const routes = localizeStorefrontRoutes(getStorefrontRoutes(usePathname()), locale)
  const {
    items,
    getTotalPrice,
    removeItem,
    updateQuantity,
  } = useCart()
  const regularTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = getTotalPrice()
  const totalDiscount = Math.max(0, regularTotal - total)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const activeBundle = items.length === 1 && isPaperbusPromoSlug(items[0].slug)
    ? calculatePaperbusPromotion(items[0].slug, items[0].price, items[0].quantity)
    : null

  if (items.length === 0) {
    return (
      <main className={styles.emptyCart}>
        <div>
          <span className={styles.emptyCartIcon}>0</span>
          <h1>{copy.empty}</h1>
          <p>{emptyText}</p>
          <Link href={routes.products} className={styles.primaryButton}>{copy.products} <ArrowRightIcon /></Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.cartPage}>
      <div className={styles.container}>
        <div className={styles.cartHeading}>
          <div><span className={styles.eyebrow}>{copy.eyebrow}</span><h1>{copy.title}</h1></div>
          <Link href={routes.products}>{copy.continue} <ArrowRightIcon /></Link>
        </div>

        <div className={styles.cartLayout}>
          <section className={styles.cartItems} aria-label={copy.itemsAria}>
            {items.map((item) => {
              const localizedName = getLocalizedCartItemName(locale, item.slug, item.name)
              const itemTotal = calculateCartItemTotal(item.slug, item.price, item.quantity)
              const itemRegularTotal = item.price * item.quantity
              const paperbusPromotion = isPaperbusPromoSlug(item.slug)
                ? calculatePaperbusPromotion(item.slug, item.price, item.quantity)
                : null
              const isNeemx = item.slug.startsWith('neemx-pro')

              return (
                <article className={styles.cartItem} key={item.product_id}>
                  <div className={`${styles.cartItemImage} ${isNeemx ? styles.cartItemImageNeemx : ''}`}>
                    <Image src={item.image_url} alt={localizedName} fill sizes="160px" />
                  </div>
                  <div className={styles.cartItemInfo}>
                    <span>{isNeemx ? copy.neemx : paperPlugCategory}</span>
                    <h2>{localizedName}</h2>
                    <small>{cartItemDetail(item.slug, locale)}</small>
                    {paperbusPromotion && (paperbusPromotion.eligible ? (
                      <span className={styles.cartPromoApplied}><CheckIcon /> {copy.applied}</span>
                    ) : (
                      <button className={styles.cartPromoNudge} type="button" onClick={() => updateQuantity(item.product_id, 3)}>
                        {copy.choosePromo}
                      </button>
                    ))}
                    <button type="button" onClick={() => removeItem(item.product_id)}>{copy.remove}</button>
                  </div>
                  <div className={styles.cartItemControls}>
                    <span className={styles.cartItemPrice}>
                      {itemTotal < itemRegularTotal && <del>{formatPrice(itemRegularTotal, locale)}</del>}
                      <strong>{formatPrice(itemTotal, locale)}</strong>
                    </span>
                    <div className={styles.cartQuantity}>
                      <button type="button" onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))} aria-label={`${localizedName}: ${copy.lower}`}><MinusIcon /></button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.product_id, Math.min(100, item.quantity + 1))} aria-label={`${localizedName}: ${copy.raise}`}><PlusIcon /></button>
                    </div>
                  </div>
                </article>
              )
            })}
            <div className={styles.cartNote} aria-label={copy.current} aria-live="polite">
              <span>
                <strong>{copy.current}</strong>
                <small>{itemCount} {itemCount === 1 ? copy.article : copy.articles} · {formatPrice(total, locale)} {copy.totalWord}</small>
              </span>
            </div>
          </section>

          <aside className={styles.orderSummary}>
            <span className={styles.summaryEyebrow}>{copy.summary}</span>
            <h2>{copy.total}</h2>
            <div className={styles.summaryLines}>
              <span><small>{copy.subtotal}</small><strong>{formatPrice(regularTotal, locale)}</strong></span>
              {totalDiscount > 0 && <span className={styles.summaryDiscount}><small>{copy.discounts}</small><strong>− {formatPrice(totalDiscount, locale)}</strong></span>}
              <span><small>{copy.shipping}</small><strong>{copy.included}</strong></span>
            </div>
            <div className={styles.summaryTotal}><span>{copy.total}</span><strong>{formatPrice(total, locale)}</strong></div>
            {activeBundle?.eligible && (
              <div className={styles.summaryPromoProof}>
                <CheckIcon />
                <span><strong>{copy.promoLine}</strong><small>{items[0].quantity} {copy.boxes} {getLocalizedCartItemName(locale, items[0].slug, items[0].name)} · €180 {copy.totalWord}</small></span>
              </div>
            )}
            <Link href={routes.checkout} className={styles.checkoutButton}>{copy.checkout} <ArrowRightIcon /></Link>
            <div className={styles.summaryPayment} aria-label={copy.paymentsAria}>
              <span className={styles.summaryPaymentLabel}><LockIcon /> {copy.paySafe}</span>
              <PaymentLogos />
            </div>
            <div className={styles.summaryProof}><TruckIcon /><span><strong>{copy.freeShipping}</strong><small>{copy.region}</small></span></div>
          </aside>
        </div>
      </div>
    </main>
  )
}
