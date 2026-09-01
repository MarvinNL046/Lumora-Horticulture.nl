'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useCart } from '@/contexts/CartContext'
import { calculateCartItemTotal } from '@/lib/cart-pricing'
import { formatPrice } from '../_data/products'
import { getStorefrontRoutes } from '../_data/routes'
import styles from '../storefront.module.css'
import { ArrowRightIcon, CheckIcon, LockIcon } from './Icons'
import { PaymentLogos } from './PaymentLogos'

const CHECKOUT_NONCE_KEY = 'lumora-premium-checkout-idempotency-nonce-v1'

type CheckoutForm = {
  email: string
  firstName: string
  lastName: string
  phone: string
  street: string
  houseNumber: string
  postalCode: string
  city: string
  country: 'NL' | 'BE' | 'DE'
}

const INITIAL_FORM: CheckoutForm = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  houseNumber: '',
  postalCode: '',
  city: '',
  country: 'NL',
}

async function checkoutRequestKey(payload: Record<string, unknown>): Promise<string> {
  let nonce = window.sessionStorage.getItem(CHECKOUT_NONCE_KEY)
  if (!nonce || !/^[A-Za-z0-9_-]{32,128}$/.test(nonce)) {
    nonce = window.crypto.randomUUID()
    window.sessionStorage.setItem(CHECKOUT_NONCE_KEY, nonce)
  }

  const digest = await window.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(`${nonce}:${JSON.stringify(payload)}`),
  )
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function productDetail(slug: string, quantity: number): string {
  if (slug === 'paper-plug-tray-84') return `${quantity} ${quantity === 1 ? 'doos' : 'dozen'} · 8 trays per doos`
  if (slug === 'paper-plug-tray-104') return `${quantity} ${quantity === 1 ? 'doos' : 'dozen'} · 7 trays per doos`
  if (slug === 'neemx-pro-10ml') return `10 ml · ${quantity} ${quantity === 1 ? 'stuk' : 'stuks'}`
  if (slug === 'neemx-pro-30ml') return `30 ml · ${quantity} ${quantity === 1 ? 'stuk' : 'stuks'}`
  if (slug === 'neemx-pro-50ml') return `50 ml · ${quantity} ${quantity === 1 ? 'stuk' : 'stuks'}`
  return `${quantity} ${quantity === 1 ? 'stuk' : 'stuks'}`
}

export function PremiumCheckout() {
  const routes = getStorefrontRoutes(usePathname())
  const { items, getTotalPrice, clearCart, isLoaded } = useCart()
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const total = getTotalPrice()
  const regularTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = Math.max(0, regularTotal - total)

  function updateField<Key extends keyof CheckoutForm>(key: Key, value: CheckoutForm[Key]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function submitCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitting || items.length === 0) return

    setIsSubmitting(true)
    setCheckoutError(null)

    const payload = {
      customer_name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      customer_email: form.email.trim(),
      customer_phone: form.phone.trim(),
      shipping_address: {
        street: `${form.street.trim()} ${form.houseNumber.trim()}`.trim(),
        city: form.city.trim(),
        postal_code: form.postalCode.trim(),
        country: form.country,
      },
      delivery_preference: null,
      items: items.map((item) => ({ product_id: item.product_id, quantity: item.quantity })),
      recovery_cart_id: null,
      locale: 'nl',
    }

    try {
      const requestKey = await checkoutRequestKey(payload)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, checkout_request_key: requestKey }),
      })
      const data = await response.json().catch(() => ({})) as {
        success?: boolean
        payment_url?: string
        code?: string
      }

      if (response.ok && data.success && data.payment_url) {
        window.sessionStorage.removeItem(CHECKOUT_NONCE_KEY)
        clearCart()
        window.location.assign(data.payment_url)
        return
      }

      if (response.status === 503) {
        setCheckoutError('Afrekenen wordt nog veilig klaargezet. Probeer het later opnieuw of neem contact met ons op.')
      } else if (data.code === 'INVALID_CART' || response.status === 404) {
        setCheckoutError('Een product in je winkelwagen is gewijzigd. Ga terug naar je winkelwagen en voeg het product opnieuw toe.')
      } else {
        setCheckoutError('De betaling kon niet worden gestart. Controleer je gegevens en probeer het opnieuw.')
      }
    } catch (error) {
      console.error('Premium checkout failed', error)
      setCheckoutError('Er ging iets mis bij het starten van de betaling. Probeer het opnieuw.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoaded) {
    return <main className={styles.checkoutPage}><div className={styles.checkoutLoading} role="status">Je winkelwagen wordt geladen…</div></main>
  }

  if (items.length === 0) {
    return (
      <main className={styles.checkoutPage}>
        <div className={styles.checkoutEmpty}>
          <span className={styles.eyebrow}>Afrekenen</span>
          <h1>Je winkelwagen is leeg.</h1>
          <p>Voeg eerst een product toe voordat je gaat afrekenen.</p>
          <Link className={styles.primaryButton} href={routes.products}>Bekijk de producten <ArrowRightIcon /></Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.checkoutPage}>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutSteps} aria-label="Voortgang afrekenen">
          <span className={styles.checkoutStepActive}><small>1</small> Gegevens</span><i /><span><small>2</small> Controle</span><i /><span><small>3</small> Betaling</span>
        </div>

        <div className={styles.checkoutIntro}>
          <span className={styles.eyebrow}>Afrekenen</span>
          <h1>Waar bezorgen we je bestelling?</h1>
          <p>Vul je contact- en bezorggegevens in. Daarna betaal je veilig via een bekende betaalmethode.</p>
        </div>

        <div className={styles.checkoutLayout}>
          <form className={styles.checkoutForm} onSubmit={submitCheckout}>
            <section className={styles.formSection} id="contactgegevens">
              <div className={styles.formSectionHeading}><span>01</span><div><h2>Contactgegevens</h2><p>Voor je orderbevestiging en bezorgupdates.</p></div></div>
              <div className={styles.formGrid}>
                <label className={styles.fieldFull}><span>E-mailadres</span><input required type="email" autoComplete="email" placeholder="naam@bedrijf.nl" value={form.email} onChange={(event) => updateField('email', event.target.value)} /></label>
                <label><span>Voornaam</span><input required type="text" autoComplete="given-name" placeholder="Voornaam" value={form.firstName} onChange={(event) => updateField('firstName', event.target.value)} /></label>
                <label><span>Achternaam</span><input required type="text" autoComplete="family-name" placeholder="Achternaam" value={form.lastName} onChange={(event) => updateField('lastName', event.target.value)} /></label>
                <label className={styles.fieldFull}><span>Telefoonnummer <small>optioneel</small></span><input type="tel" autoComplete="tel" placeholder="Voor vragen over de bezorging" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /></label>
              </div>
            </section>

            <section className={styles.formSection}>
              <div className={styles.formSectionHeading}><span>02</span><div><h2>Bezorgadres</h2><p>Gratis verzending binnen Nederland, België en Duitsland.</p></div></div>
              <div className={styles.formGrid}>
                <label className={styles.fieldWide}><span>Straat</span><input required type="text" autoComplete="address-line1" placeholder="Straatnaam" value={form.street} onChange={(event) => updateField('street', event.target.value)} /></label>
                <label><span>Huisnummer</span><input required type="text" autoComplete="address-line2" placeholder="12 A" value={form.houseNumber} onChange={(event) => updateField('houseNumber', event.target.value)} /></label>
                <label><span>Postcode</span><input required type="text" autoComplete="postal-code" placeholder="1234 AB" value={form.postalCode} onChange={(event) => updateField('postalCode', event.target.value)} /></label>
                <label className={styles.fieldWide}><span>Plaats</span><input required type="text" autoComplete="address-level2" placeholder="Plaats" value={form.city} onChange={(event) => updateField('city', event.target.value)} /></label>
                <label className={styles.fieldFull}><span>Land</span><select value={form.country} autoComplete="country" onChange={(event) => updateField('country', event.target.value as CheckoutForm['country'])}><option value="NL">Nederland</option><option value="BE">België</option><option value="DE">Duitsland</option></select></label>
              </div>
            </section>

            <label className={styles.termsConsent}>
              <input required type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
              <span>Ik ga akkoord met de <Link href="/algemene-voorwaarden">algemene voorwaarden</Link> en heb het <Link href="/retourbeleid">retourbeleid</Link> gelezen.</span>
            </label>

            {checkoutError ? <p className={styles.checkoutError} role="alert">{checkoutError}</p> : null}

            <button className={styles.formContinue} id="bestelling-plaatsen" type="submit" disabled={isSubmitting || !acceptedTerms}>
              {isSubmitting ? 'Betaling starten…' : `Veilig betalen · ${formatPrice(total)}`} {isSubmitting ? null : <ArrowRightIcon />}
            </button>
          </form>

          <aside className={styles.checkoutSummary}>
            <div className={styles.checkoutSummaryHeading}><span>Jouw bestelling</span><Link href={routes.cart}>Wijzigen</Link></div>
            {items.map((item) => {
              const itemTotal = calculateCartItemTotal(item.slug, item.price, item.quantity)
              return (
                <div className={styles.checkoutProduct} key={item.product_id}>
                  <span className={`${styles.checkoutProductImage} ${item.slug.startsWith('neemx-pro') ? styles.checkoutProductNeemx : ''}`}><Image src={item.image_url} alt="" fill sizes="64px" /></span>
                  <span><strong>{item.name}</strong><small>{productDetail(item.slug, item.quantity)}</small></span>
                  <strong>{formatPrice(itemTotal)}</strong>
                </div>
              )
            })}
            {discount > 0 ? <div className={styles.checkoutPromoApplied}><CheckIcon /><span><strong>Actie of staffelkorting toegepast</strong><small>Je voordeel is al verrekend</small></span></div> : null}
            <div className={styles.checkoutTotals}>
              <span><small>Subtotaal</small><strong>{formatPrice(regularTotal)}</strong></span>
              {discount > 0 ? <span className={styles.checkoutDiscount}><small>Actie en staffelkorting</small><strong>− {formatPrice(discount)}</strong></span> : null}
              <span><small>Verzending NL, BE of DE</small><strong>Inbegrepen</strong></span>
              <span><b>Totaal</b><b>{formatPrice(total)}</b></span>
            </div>
            <a className={styles.summaryAction} href="#contactgegevens">Vul je gegevens in <ArrowRightIcon /></a>
            <div className={styles.checkoutSecurity}><LockIcon /><span><strong>Veilig online betalen</strong><PaymentLogos /><small>Je bestelling wordt pas geplaatst nadat je betaling is bevestigd.</small></span></div>
          </aside>
        </div>
      </div>
    </main>
  )
}
