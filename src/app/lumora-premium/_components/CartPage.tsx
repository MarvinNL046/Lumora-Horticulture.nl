'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { formatPrice } from '../_data/products'
import styles from '../storefront.module.css'
import { ArrowRightIcon, LockIcon, MinusIcon, PlusIcon, ShieldIcon, TruckIcon } from './Icons'

type CartItem = {
  id: string
  name: string
  variant: string
  price: number
  quantity: number
  image: string
  imageAlt: string
}

const initialItems: CartItem[] = [
  {
    id: 'paperbus-84',
    name: 'Paperbus Pluggen',
    variant: 'Tray 84',
    price: 84,
    quantity: 1,
    image: '/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.webp',
    imageAlt: 'Paperbus Pluggen Tray 84',
  },
  {
    id: 'neemx-10',
    name: 'NeemX Pro',
    variant: '10 ml',
    price: 24.95,
    quantity: 1,
    image: '/productAfbeeldingen/generated/neemx-clean-packshot-v1.png',
    imageAlt: 'NeemX Pro prototypefles 10 ml',
  },
]

export function CartPage() {
  const [items, setItems] = useState(initialItems)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
          <p>Kies Paperbus pluggen of NeemX Pro om verder te gaan.</p>
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
                  <small>{item.id.startsWith('paperbus') ? '84 pluggen per tray' : 'Geconcentreerde formule'}</small>
                  <button type="button" onClick={() => removeItem(item.id)}>Verwijderen</button>
                </div>
                <div className={styles.cartItemControls}>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                  <div className={styles.cartQuantity}>
                    <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Aantal ${item.name} verlagen`}><MinusIcon /></button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Aantal ${item.name} verhogen`}><PlusIcon /></button>
                  </div>
                </div>
              </article>
            ))}
            <div className={styles.cartNote}>
              <ShieldIcon />
              <span><strong>Je bestelling blijft controleerbaar.</strong><small>Je ziet levering, totaal en voorwaarden voordat je betaalt.</small></span>
            </div>
          </section>

          <aside className={styles.orderSummary}>
            <span className={styles.summaryEyebrow}>Besteloverzicht</span>
            <h2>Totaal</h2>
            <div className={styles.summaryLines}>
              <span><small>Subtotaal</small><strong>{formatPrice(total)}</strong></span>
              <span><small>Verzending NL, BE of DE</small><strong>Gratis</strong></span>
            </div>
            <div className={styles.summaryTotal}><span>Totaal</span><strong>{formatPrice(total)}</strong></div>
            <Link href="/lumora-premium/afrekenen" className={styles.checkoutButton}>Verder naar afrekenen <ArrowRightIcon /></Link>
            <div className={styles.summaryDecisionTrust} aria-label="Betaling en service">
              <span><LockIcon /> Via Mollie</span>
              <Link href="/return-policy">14 dagen bedenktijd</Link>
              <a href="mailto:info@lumorahorticulture.com">Contact</a>
            </div>
            <div className={styles.summaryProof}><TruckIcon /><span><strong>Gratis verzending</strong><small>Binnen Nederland, België en Duitsland</small></span></div>
          </aside>
        </div>
      </div>
    </main>
  )
}
