'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { trackStorefrontCheckout } from '@/lib/storefront-analytics'
import type { FormEvent } from 'react'
import { useCart } from '@/contexts/CartContext'
import { calculateCartItemTotal } from '@/lib/cart-pricing'
import { formatPrice } from '../_data/products'
import { getLocalizedCartItemName } from '../_data/storefront-content'
import { getStorefrontRoutes } from '../_data/routes'
import { localizeStorefrontRoutes, type StorefrontLocale } from './storefront-localization'
import { localizePathForLocale } from '@/lib/url-localizations'
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

const COPY = {
  nl: { loading: 'Je winkelwagen wordt geladen…', checkout: 'Afrekenen', empty: 'Je winkelwagen is leeg.', emptyText: 'Voeg eerst een product toe voordat je gaat afrekenen.', products: 'Bekijk de producten', progress: 'Voortgang afrekenen', data: 'Gegevens', review: 'Controle', payment: 'Betaling', title: 'Waar bezorgen we je bestelling?', intro: 'Vul je contact- en bezorggegevens in. Daarna betaal je veilig via een bekende betaalmethode.', contact: 'Contactgegevens', contactText: 'Voor je orderbevestiging en bezorgupdates.', email: 'E-mailadres', emailPlaceholder: 'naam@bedrijf.nl', first: 'Voornaam', last: 'Achternaam', phone: 'Telefoonnummer', optional: 'optioneel', phonePlaceholder: 'Voor vragen over de bezorging', address: 'Bezorgadres', addressText: 'Gratis verzending binnen Nederland, België en Duitsland.', street: 'Straat', streetPlaceholder: 'Straatnaam', number: 'Huisnummer', postal: 'Postcode', city: 'Plaats', cityPlaceholder: 'Plaats', country: 'Land', countries: ['Nederland', 'België', 'Duitsland'], consentStart: 'Ik ga akkoord met de', terms: 'algemene voorwaarden', consentAnd: 'en heb het', returns: 'retourbeleid', consentEnd: 'gelezen.', start: 'Betaling starten…', pay: 'Veilig betalen', order: 'Jouw bestelling', edit: 'Wijzigen', discountApplied: 'Actie of staffelkorting toegepast', advantage: 'Je voordeel is al verrekend', subtotal: 'Subtotaal', discount: 'Actie en staffelkorting', shipping: 'Verzending NL, BE of DE', included: 'Inbegrepen', total: 'Totaal', details: 'Vul je gegevens in', secure: 'Veilig online betalen', confirmed: 'Je bestelling wordt pas geplaatst nadat je betaling is bevestigd.', box: 'doos', boxes: 'dozen', perBox: 'trays per doos', piece: 'stuk', pieces: 'stuks', retry: 'Afrekenen wordt nog veilig klaargezet. Probeer het later opnieuw of neem contact met ons op.', invalid: 'Een product in je winkelwagen is gewijzigd. Ga terug naar je winkelwagen en voeg het product opnieuw toe.', failed: 'De betaling kon niet worden gestart. Controleer je gegevens en probeer het opnieuw.', unknown: 'Er ging iets mis bij het starten van de betaling. Probeer het opnieuw.' },
  en: { loading: 'Your cart is loading…', checkout: 'Checkout', empty: 'Your cart is empty.', emptyText: 'Add a product before continuing to checkout.', products: 'View the products', progress: 'Checkout progress', data: 'Details', review: 'Review', payment: 'Payment', title: 'Where should we deliver your order?', intro: 'Enter your contact and delivery details. You can then pay securely with a familiar payment method.', contact: 'Contact details', contactText: 'For your order confirmation and delivery updates.', email: 'Email address', emailPlaceholder: 'name@company.com', first: 'First name', last: 'Last name', phone: 'Phone number', optional: 'optional', phonePlaceholder: 'For questions about delivery', address: 'Delivery address', addressText: 'Free shipping within the Netherlands, Belgium and Germany.', street: 'Street', streetPlaceholder: 'Street name', number: 'House number', postal: 'Postal code', city: 'City', cityPlaceholder: 'City', country: 'Country', countries: ['Netherlands', 'Belgium', 'Germany'], consentStart: 'I agree to the', terms: 'terms and conditions', consentAnd: 'and have read the', returns: 'return policy', consentEnd: '.', start: 'Starting payment…', pay: 'Pay securely', order: 'Your order', edit: 'Edit', discountApplied: 'Offer or volume discount applied', advantage: 'Your saving has already been deducted', subtotal: 'Subtotal', discount: 'Offer and volume discount', shipping: 'Shipping to NL, BE or DE', included: 'Included', total: 'Total', details: 'Enter your details', secure: 'Secure online payment', confirmed: 'Your order is only placed after your payment has been confirmed.', box: 'box', boxes: 'boxes', perBox: 'trays per box', piece: 'item', pieces: 'items', retry: 'Secure checkout is still being prepared. Please try again later or contact us.', invalid: 'A product in your cart has changed. Return to your cart and add the product again.', failed: 'The payment could not be started. Check your details and try again.', unknown: 'Something went wrong while starting the payment. Please try again.' },
  de: { loading: 'Ihr Warenkorb wird geladen…', checkout: 'Kasse', empty: 'Ihr Warenkorb ist leer.', emptyText: 'Fügen Sie zuerst ein Produkt hinzu, bevor Sie zur Kasse gehen.', products: 'Produkte ansehen', progress: 'Fortschritt beim Bezahlen', data: 'Daten', review: 'Prüfen', payment: 'Zahlung', title: 'Wohin dürfen wir Ihre Bestellung liefern?', intro: 'Geben Sie Ihre Kontakt- und Lieferdaten ein. Anschließend bezahlen Sie sicher mit einer bekannten Zahlungsmethode.', contact: 'Kontaktdaten', contactText: 'Für Ihre Bestellbestätigung und Lieferinformationen.', email: 'E-Mail-Adresse', emailPlaceholder: 'name@firma.de', first: 'Vorname', last: 'Nachname', phone: 'Telefonnummer', optional: 'optional', phonePlaceholder: 'Für Fragen zur Lieferung', address: 'Lieferadresse', addressText: 'Kostenloser Versand innerhalb der Niederlande, Belgiens und Deutschlands.', street: 'Straße', streetPlaceholder: 'Straßenname', number: 'Hausnummer', postal: 'Postleitzahl', city: 'Ort', cityPlaceholder: 'Ort', country: 'Land', countries: ['Niederlande', 'Belgien', 'Deutschland'], consentStart: 'Ich stimme den', terms: 'Allgemeinen Geschäftsbedingungen', consentAnd: 'zu und habe das', returns: 'Rückgaberecht', consentEnd: 'gelesen.', start: 'Zahlung wird gestartet…', pay: 'Sicher bezahlen', order: 'Ihre Bestellung', edit: 'Ändern', discountApplied: 'Aktion oder Mengenrabatt angewendet', advantage: 'Ihr Vorteil wurde bereits abgezogen', subtotal: 'Zwischensumme', discount: 'Aktion und Mengenrabatt', shipping: 'Versand nach NL, BE oder DE', included: 'Inklusive', total: 'Gesamt', details: 'Daten eingeben', secure: 'Sicher online bezahlen', confirmed: 'Ihre Bestellung wird erst nach bestätigter Zahlung aufgegeben.', box: 'Karton', boxes: 'Kartons', perBox: 'Anzuchtplatten pro Karton', piece: 'Stück', pieces: 'Stück', retry: 'Der sichere Bezahlvorgang wird noch vorbereitet. Versuchen Sie es später erneut oder kontaktieren Sie uns.', invalid: 'Ein Produkt in Ihrem Warenkorb wurde geändert. Gehen Sie zurück zum Warenkorb und fügen Sie es erneut hinzu.', failed: 'Die Zahlung konnte nicht gestartet werden. Prüfen Sie Ihre Angaben und versuchen Sie es erneut.', unknown: 'Beim Starten der Zahlung ist ein Fehler aufgetreten. Versuchen Sie es erneut.' },
} as const

function productDetail(slug: string, quantity: number, locale: StorefrontLocale): string {
  const copy = COPY[locale]
  const perBoxLabel = locale === 'de' ? 'Platten/Karton' : copy.perBox
  if (slug === 'paper-plug-tray-84') return `${quantity} ${quantity === 1 ? copy.box : copy.boxes} · 8 ${perBoxLabel}`
  if (slug === 'paper-plug-tray-104') return `${quantity} ${quantity === 1 ? copy.box : copy.boxes} · 7 ${perBoxLabel}`
  if (slug === 'neemx-pro-10ml') return `10 ml · ${quantity} ${quantity === 1 ? copy.piece : copy.pieces}`
  if (slug === 'neemx-pro-30ml') return `30 ml · ${quantity} ${quantity === 1 ? copy.piece : copy.pieces}`
  if (slug === 'neemx-pro-50ml') return `50 ml · ${quantity} ${quantity === 1 ? copy.piece : copy.pieces}`
  return `${quantity} ${quantity === 1 ? copy.piece : copy.pieces}`
}

export function PremiumCheckout({ locale = 'nl' }: { locale?: StorefrontLocale }) {
  const copy = COPY[locale]
  const routes = localizeStorefrontRoutes(getStorefrontRoutes(usePathname()), locale)
  const { items, getTotalPrice, clearCart, isLoaded } = useCart()
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const checkoutTracked = useRef(false)
  useEffect(() => {
    if (!isLoaded || !items.length || checkoutTracked.current) return
    checkoutTracked.current = true
    trackStorefrontCheckout(items)
  }, [isLoaded, items])

  const total = getTotalPrice()
  const regularTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = Math.max(0, regularTotal - total)
  const hasPaperPlugPromotion = items.some((item) =>
    (item.slug === 'paper-plug-tray-84' || item.slug === 'paper-plug-tray-104') && item.quantity >= 3
  )
  const appliedDiscountTitle = hasPaperPlugPromotion
    ? locale === 'de'
      ? '2 kaufen + 1 gratis'
      : locale === 'en'
        ? 'Buy 2 + get 1 free'
        : '2 + 1 gratis'
    : copy.discountApplied
  const appliedDiscountNote = hasPaperPlugPromotion
    ? locale === 'de'
      ? '3 Kartons · 180 € · Versand inklusive'
      : locale === 'en'
        ? '3 boxes · €180 · shipping included'
        : '3 dozen · €180 · verzending inbegrepen'
    : copy.advantage

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
      locale,
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
        setCheckoutError(copy.retry)
      } else if (data.code === 'INVALID_CART' || response.status === 404) {
        setCheckoutError(copy.invalid)
      } else {
        setCheckoutError(copy.failed)
      }
    } catch (error) {
      console.error('Premium checkout failed', error)
      setCheckoutError(copy.unknown)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoaded) {
    return <main className={styles.checkoutPage}><div className={styles.checkoutLoading} role="status">{copy.loading}</div></main>
  }

  if (items.length === 0) {
    return (
      <main className={styles.checkoutPage}>
        <div className={styles.checkoutEmpty}>
          <span className={styles.eyebrow}>{copy.checkout}</span>
          <h1>{copy.empty}</h1>
          <p>{copy.emptyText}</p>
          <Link className={styles.primaryButton} href={routes.products}>{copy.products} <ArrowRightIcon /></Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.checkoutPage}>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutSteps} aria-label={copy.progress}>
          <span className={styles.checkoutStepActive}><small>1</small> {copy.data}</span><i /><span><small>2</small> {copy.review}</span><i /><span><small>3</small> {copy.payment}</span>
        </div>

        <div className={styles.checkoutIntro}>
          <span className={styles.eyebrow}>{copy.checkout}</span>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>

        <div className={styles.checkoutLayout}>
          <form className={styles.checkoutForm} onSubmit={submitCheckout}>
            <section className={styles.formSection} id="contactgegevens">
              <div className={styles.formSectionHeading}><span>01</span><div><h2>{copy.contact}</h2><p>{copy.contactText}</p></div></div>
              <div className={styles.formGrid}>
                <label className={styles.fieldFull}><span>{copy.email}</span><input required type="email" autoComplete="email" placeholder={copy.emailPlaceholder} value={form.email} onChange={(event) => updateField('email', event.target.value)} /></label>
                <label><span>{copy.first}</span><input required type="text" autoComplete="given-name" placeholder={copy.first} value={form.firstName} onChange={(event) => updateField('firstName', event.target.value)} /></label>
                <label><span>{copy.last}</span><input required type="text" autoComplete="family-name" placeholder={copy.last} value={form.lastName} onChange={(event) => updateField('lastName', event.target.value)} /></label>
                <label className={styles.fieldFull}><span>{copy.phone} <small>{copy.optional}</small></span><input type="tel" autoComplete="tel" placeholder={copy.phonePlaceholder} value={form.phone} onChange={(event) => updateField('phone', event.target.value)} /></label>
              </div>
            </section>

            <section className={styles.formSection}>
              <div className={styles.formSectionHeading}><span>02</span><div><h2>{copy.address}</h2><p>{copy.addressText}</p></div></div>
              <div className={styles.formGrid}>
                <label className={styles.fieldWide}><span>{copy.street}</span><input required type="text" autoComplete="address-line1" placeholder={copy.streetPlaceholder} value={form.street} onChange={(event) => updateField('street', event.target.value)} /></label>
                <label><span>{copy.number}</span><input required type="text" autoComplete="address-line2" placeholder="12 A" value={form.houseNumber} onChange={(event) => updateField('houseNumber', event.target.value)} /></label>
                <label><span>{copy.postal}</span><input required type="text" autoComplete="postal-code" placeholder={locale === 'de' ? '12345' : '1234 AB'} value={form.postalCode} onChange={(event) => updateField('postalCode', event.target.value)} /></label>
                <label className={styles.fieldWide}><span>{copy.city}</span><input required type="text" autoComplete="address-level2" placeholder={copy.cityPlaceholder} value={form.city} onChange={(event) => updateField('city', event.target.value)} /></label>
                <label className={styles.fieldFull}><span>{copy.country}</span><select value={form.country} autoComplete="country" onChange={(event) => updateField('country', event.target.value as CheckoutForm['country'])}><option value="NL">{copy.countries[0]}</option><option value="BE">{copy.countries[1]}</option><option value="DE">{copy.countries[2]}</option></select></label>
              </div>
            </section>

            <label className={styles.termsConsent}>
              <input required type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
              <span>{copy.consentStart} <Link href={localizePathForLocale('/terms', locale)}>{copy.terms}</Link> {copy.consentAnd} <Link href={localizePathForLocale('/return-policy', locale)}>{copy.returns}</Link> {copy.consentEnd}</span>
            </label>

            {checkoutError ? <p className={styles.checkoutError} role="alert">{checkoutError}</p> : null}

            <button className={styles.formContinue} id="bestelling-plaatsen" type="submit" disabled={isSubmitting || !acceptedTerms}>
              {isSubmitting ? copy.start : `${copy.pay} · ${formatPrice(total, locale)}`} {isSubmitting ? null : <ArrowRightIcon />}
            </button>
          </form>

          <aside className={styles.checkoutSummary}>
            <div className={styles.checkoutSummaryHeading}><span>{copy.order}</span><Link href={routes.cart}>{copy.edit}</Link></div>
            {items.map((item) => {
              const itemTotal = calculateCartItemTotal(item.slug, item.price, item.quantity)
              return (
                <div className={styles.checkoutProduct} key={item.product_id}>
                  <span className={`${styles.checkoutProductImage} ${item.slug.startsWith('neemx-pro') ? styles.checkoutProductNeemx : ''}`}><Image src={item.image_url} alt="" fill sizes="64px" /></span>
                  <span><strong>{getLocalizedCartItemName(locale, item.slug, item.name)}</strong><small>{productDetail(item.slug, item.quantity, locale)}</small></span>
                  <strong>{formatPrice(itemTotal, locale)}</strong>
                </div>
              )
            })}
            {discount > 0 ? <div className={styles.checkoutPromoApplied}><CheckIcon /><span><strong>{appliedDiscountTitle}</strong><small>{appliedDiscountNote}</small></span></div> : null}
            <div className={styles.checkoutTotals}>
              <span><small>{copy.subtotal}</small><strong>{formatPrice(regularTotal, locale)}</strong></span>
              {discount > 0 ? <span className={styles.checkoutDiscount}><small>{copy.discount}</small><strong>− {formatPrice(discount, locale)}</strong></span> : null}
              <span><small>{copy.shipping}</small><strong>{copy.included}</strong></span>
              <span><b>{copy.total}</b><b>{formatPrice(total, locale)}</b></span>
            </div>
            <a className={styles.summaryAction} href="#contactgegevens">{copy.details} <ArrowRightIcon /></a>
            <div className={styles.checkoutSecurity}><LockIcon /><span><strong>{copy.secure}</strong><PaymentLogos /><small>{copy.confirmed}</small></span></div>
          </aside>
        </div>
      </div>
    </main>
  )
}
