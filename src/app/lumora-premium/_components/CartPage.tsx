'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { calculateCartItemTotal } from '@/lib/cart-pricing'
import { calculatePaperbusPromotion } from '@/lib/paperbus-promo'
import { formatPrice } from '../_data/products'
import styles from '../storefront.module.css'
import { ArrowRightIcon, CheckIcon, LockIcon, MinusIcon, PlusIcon, TruckIcon } from './Icons'
import { PaymentLogos } from './PaymentLogos'

type CartItem = {
  id: string
  slug: string
  name: string
  variant: string
  detail: string
  price: number
  quantity: number
  image: string
  imageAlt: string
}

const defaultItems: CartItem[] = [
  {
    id: 'paperbus-84',
    slug: 'paper-plug-tray-84',
    name: 'Stekpluggen Steenwol',
    variant: 'Stekpluggen Steenwol 84',
    detail: 'Per doos: 8 trays · 672 cellen',
    price: 84,
    quantity: 1,
    image: '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-front.webp',
    imageAlt: 'Stekpluggen Steenwol 84 met Paperbus-wikkel in een kweektray',
  },
  {
    id: 'neemx-10',
    slug: 'neemx-pro-10ml',
    name: 'NeemX Pro',
    variant: '10 ml',
    detail: 'Geconcentreerde formule',
    price: 24.95,
    quantity: 1,
    image: '/productAfbeeldingen/neemxpro/neemx-pro-assortiment-travertijn-neem-bloesem.webp',
    imageAlt: 'NeemX Pro assortiment met flesjes van 50, 30 en 10 ml',
  },
]

type CartPageProps = {
  action?: string
  variantId?: string
  quantity?: number
}

function getInitialItems({ action, variantId, quantity }: CartPageProps): CartItem[] {
  if (action !== 'stekpluggen-3-voor-180') return defaultItems
  const is104 = variantId === 'tray-104'
  return [{
    id: is104 ? 'paperbus-104' : 'paperbus-84',
    slug: is104 ? 'paper-plug-tray-104' : 'paper-plug-tray-84',
    name: 'Stekpluggen Steenwol',
    variant: is104 ? 'Stekpluggen Steenwol 104' : 'Stekpluggen Steenwol 84',
    detail: is104 ? 'Per doos: 7 trays · 728 cellen' : 'Per doos: 8 trays · 672 cellen',
    price: is104 ? 80 : 84,
    quantity: Math.min(100, Math.max(1, quantity ?? 3)),
    image: is104
      ? '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-104-tray.webp'
      : '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-front.webp',
    imageAlt: is104
      ? 'Tray met 104 stekpluggen van steenwol'
      : 'Stekpluggen Steenwol 84 met Paperbus-wikkel in een kweektray',
  }]
}

export function CartPage(props: CartPageProps) {
  const [items, setItems] = useState(() => getInitialItems(props))
  const regularTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = items.reduce((sum, item) => sum + calculateCartItemTotal(item.slug, item.price, item.quantity), 0)
  const totalDiscount = Math.max(0, regularTotal - total)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const activeBundle = items.length === 1
    ? calculatePaperbusPromotion(items[0].slug, items[0].price, items[0].quantity)
    : null
  const checkoutHref = activeBundle?.eligible
    ? `/lumora-premium/afrekenen?action=stekpluggen-3-voor-180&variant=${items[0].id.endsWith('104') ? 'tray-104' : 'tray-84'}&quantity=${items[0].quantity}`
    : '/lumora-premium/afrekenen'

  function changeQuantity(id: string, delta: number) {
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

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
            {items.map((item) => (
              <article className={styles.cartItem} key={item.id}>
                <div className={`${styles.cartItemImage} ${item.id.startsWith('neemx') ? styles.cartItemImageNeemx : ''}`}>
                  <Image src={item.image} alt={item.imageAlt} fill sizes="160px" />
                </div>
                <div className={styles.cartItemInfo}>
                  <span>{item.name}</span>
                  <h2>{item.variant}</h2>
                  <small>{item.detail}</small>
                  {item.id.startsWith('paperbus') && (() => {
                    const promotion = calculatePaperbusPromotion(item.slug, item.price, item.quantity)
                    return promotion.eligible ? (
                      <span className={styles.cartPromoApplied}><CheckIcon /> 3-voor-€180 actie toegepast</span>
                    ) : (
                      <button className={styles.cartPromoNudge} type="button" onClick={() => changeQuantity(item.id, 3 - item.quantity)}>
                        Kies 3 dozen voor €180
                      </button>
                    )
                  })()}
                  <button type="button" onClick={() => removeItem(item.id)}>Verwijderen</button>
                </div>
                <div className={styles.cartItemControls}>
                  {(() => {
                    const itemTotal = calculateCartItemTotal(item.slug, item.price, item.quantity)
                    const itemRegularTotal = item.price * item.quantity
                    return (
                      <span className={styles.cartItemPrice}>
                        {itemTotal < itemRegularTotal && <del>{formatPrice(itemRegularTotal)}</del>}
                        <strong>{formatPrice(itemTotal)}</strong>
                      </span>
                    )
                  })()}
                  <div className={styles.cartQuantity}>
                    <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Aantal ${item.name} verlagen`}><MinusIcon /></button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Aantal ${item.name} verhogen`}><PlusIcon /></button>
                  </div>
                </div>
              </article>
            ))}
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
              {totalDiscount > 0 && <span className={styles.summaryDiscount}><small>3-voor-€180 actie</small><strong>− {formatPrice(totalDiscount)}</strong></span>}
              <span><small>Verzending NL, BE of DE</small><strong>Inbegrepen</strong></span>
            </div>
            <div className={styles.summaryTotal}><span>Totaal</span><strong>{formatPrice(total)}</strong></div>
            {activeBundle?.eligible && (
              <div className={styles.summaryPromoProof}>
                <CheckIcon />
                <span><strong>Actie toegepast</strong><small>{items[0].quantity} dozen {items[0].variant}</small></span>
              </div>
            )}
            <Link href={checkoutHref} className={styles.checkoutButton}>Verder naar afrekenen <ArrowRightIcon /></Link>
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
