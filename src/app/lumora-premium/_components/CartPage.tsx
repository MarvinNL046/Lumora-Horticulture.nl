'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { calculateCartItemTotal } from '@/lib/cart-pricing'
import { calculatePaperbusPromotion, isPaperbusPromoSlug } from '@/lib/paperbus-promo'
import { formatPrice } from '../_data/products'
import styles from '../storefront.module.css'
import { ArrowRightIcon, CheckIcon, LockIcon, MinusIcon, PlusIcon, TruckIcon } from './Icons'
import { PaymentLogos } from './PaymentLogos'

function cartItemDetail(slug: string): string {
  if (slug === 'paper-plug-tray-84') return 'Per doos: 8 trays · 672 cellen'
  if (slug === 'paper-plug-tray-104') return 'Per doos: 7 trays · 728 cellen'
  if (slug === 'neemx-pro-10ml') return '10 ml · geconcentreerde formule'
  if (slug === 'neemx-pro-30ml') return '30 ml · geconcentreerde formule'
  if (slug === 'neemx-pro-50ml') return '50 ml · geconcentreerde formule'
  return 'Bekijk de productdetails voor de gekozen uitvoering'
}

export function CartPage() {
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
          <h1>Je winkelwagen is nog leeg.</h1>
          <p>Kies Stekpluggen Steenwol of NeemX Pro om verder te gaan.</p>
          <Link href="/lumora-premium/producten" className={styles.primaryButton}>Bekijk de producten <ArrowRightIcon /></Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.cartPage}>
      <div className={styles.container}>
        <div className={styles.cartHeading}>
          <div><span className={styles.eyebrow}>Jouw selectie</span><h1>Je winkelwagen.</h1></div>
          <Link href="/lumora-premium/producten">Verder winkelen <ArrowRightIcon /></Link>
        </div>

        <div className={styles.cartLayout}>
          <section className={styles.cartItems} aria-label="Producten in winkelwagen">
            {items.map((item) => {
              const itemTotal = calculateCartItemTotal(item.slug, item.price, item.quantity)
              const itemRegularTotal = item.price * item.quantity
              const paperbusPromotion = isPaperbusPromoSlug(item.slug)
                ? calculatePaperbusPromotion(item.slug, item.price, item.quantity)
                : null
              const isNeemx = item.slug.startsWith('neemx-pro')

              return (
                <article className={styles.cartItem} key={item.product_id}>
                  <div className={`${styles.cartItemImage} ${isNeemx ? styles.cartItemImageNeemx : ''}`}>
                    <Image src={item.image_url} alt={item.name} fill sizes="160px" />
                  </div>
                  <div className={styles.cartItemInfo}>
                    <span>{isNeemx ? 'Botanische bladverzorging' : 'Professionele stekpluggen'}</span>
                    <h2>{item.name}</h2>
                    <small>{cartItemDetail(item.slug)}</small>
                    {paperbusPromotion && (paperbusPromotion.eligible ? (
                      <span className={styles.cartPromoApplied}><CheckIcon /> 3-voor-€180 actie toegepast</span>
                    ) : (
                      <button className={styles.cartPromoNudge} type="button" onClick={() => updateQuantity(item.product_id, 3)}>
                        Kies 3 dozen voor €180
                      </button>
                    ))}
                    <button type="button" onClick={() => removeItem(item.product_id)}>Verwijderen</button>
                  </div>
                  <div className={styles.cartItemControls}>
                    <span className={styles.cartItemPrice}>
                      {itemTotal < itemRegularTotal && <del>{formatPrice(itemRegularTotal)}</del>}
                      <strong>{formatPrice(itemTotal)}</strong>
                    </span>
                    <div className={styles.cartQuantity}>
                      <button type="button" onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))} aria-label={`Aantal ${item.name} verlagen`}><MinusIcon /></button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.product_id, Math.min(100, item.quantity + 1))} aria-label={`Aantal ${item.name} verhogen`}><PlusIcon /></button>
                    </div>
                  </div>
                </article>
              )
            })}
            <div className={styles.cartNote} aria-label="Huidige bestelling" aria-live="polite">
              <span>
                <strong>Huidige bestelling</strong>
                <small>{itemCount} {itemCount === 1 ? 'artikel' : 'artikelen'} · {formatPrice(total)} totaal</small>
              </span>
            </div>
          </section>

          <aside className={styles.orderSummary}>
            <span className={styles.summaryEyebrow}>Besteloverzicht</span>
            <h2>Totaal</h2>
            <div className={styles.summaryLines}>
              <span><small>Subtotaal</small><strong>{formatPrice(regularTotal)}</strong></span>
              {totalDiscount > 0 && <span className={styles.summaryDiscount}><small>Actie en staffelkorting</small><strong>− {formatPrice(totalDiscount)}</strong></span>}
              <span><small>Verzending NL, BE of DE</small><strong>Inbegrepen</strong></span>
            </div>
            <div className={styles.summaryTotal}><span>Totaal</span><strong>{formatPrice(total)}</strong></div>
            {activeBundle?.eligible && (
              <div className={styles.summaryPromoProof}>
                <CheckIcon />
                <span><strong>3-voor-€180 actie toegepast</strong><small>{items[0].quantity} dozen {items[0].name}</small></span>
              </div>
            )}
            <Link href="/lumora-premium/afrekenen" className={styles.checkoutButton}>Verder naar afrekenen <ArrowRightIcon /></Link>
            <div className={styles.summaryPayment} aria-label="Betaalmogelijkheden">
              <span className={styles.summaryPaymentLabel}><LockIcon /> Veilig online betalen</span>
              <PaymentLogos />
            </div>
            <div className={styles.summaryProof}><TruckIcon /><span><strong>Gratis verzending</strong><small>Binnen Nederland, België en Duitsland</small></span></div>
          </aside>
        </div>
      </div>
    </main>
  )
}
