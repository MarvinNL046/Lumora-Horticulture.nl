import Link from 'next/link'
import { ArrowRightIcon, BagIcon, CheckIcon, MessageIcon, ShieldIcon, TruckIcon } from '@/app/lumora-premium/_components/Icons'
import { PaymentLogos } from '@/app/lumora-premium/_components/PaymentLogos'
import type { StorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'
import { localizePathForLocale } from '@/lib/url-localizations'
import styles from './CheckoutStatusScreen.module.css'

type StatusKind = 'loading' | 'success' | 'pending' | 'failed'

type CheckoutStatusScreenProps = {
  kind: StatusKind
  orderNumber?: string
  locale?: StorefrontLocale
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6m0-6-6 6" />
    </svg>
  )
}

const content = {
  nl: { loading: {
    eyebrow: 'Betaling controleren',
    title: 'Een moment, we controleren je betaling.',
    description: 'Je bestelling is bij ons aangekomen. We wachten nog even op de beveiligde betaalbevestiging.',
    sideTitle: 'Veilig verwerkt',
  },
  success: {
    eyebrow: 'Betaling ontvangen',
    title: 'Bedankt, je bestelling is ontvangen.',
    description: 'We hebben je bestelling geregistreerd. Je ontvangt de bevestiging per e-mail.',
    sideTitle: 'Wat gebeurt er nu?',
  },
  pending: {
    eyebrow: 'Betaling wordt verwerkt',
    title: 'We wachten op de betaalbevestiging.',
    description: 'Je hoeft niets opnieuw te betalen. Zodra de betaling is bevestigd, ontvang je een e-mail van ons.',
    sideTitle: 'Je bestelling blijft bewaard',
  },
  failed: {
    eyebrow: 'Betaling niet afgerond',
    title: 'De betaling is niet voltooid.',
    description: 'Je winkelwagen blijft beschikbaar. Probeer opnieuw of neem contact op als je hulp nodig hebt.',
    sideTitle: 'Zo kun je verder',
  }},
  en: {
    loading: { eyebrow: 'Checking payment', title: 'One moment, we are checking your payment.', description: 'We have received your order and are waiting for the secure payment confirmation.', sideTitle: 'Processed securely' },
    success: { eyebrow: 'Payment received', title: 'Thank you, your order has been received.', description: 'Your order has been registered. You will receive a confirmation by email.', sideTitle: 'What happens next?' },
    pending: { eyebrow: 'Payment processing', title: 'We are waiting for the payment confirmation.', description: 'You do not need to pay again. We will email you as soon as the payment is confirmed.', sideTitle: 'Your order is saved' },
    failed: { eyebrow: 'Payment incomplete', title: 'The payment was not completed.', description: 'Your cart remains available. Try again or contact us if you need help.', sideTitle: 'How to continue' },
  },
  de: {
    loading: { eyebrow: 'Zahlung wird geprüft', title: 'Einen Moment, wir prüfen Ihre Zahlung.', description: 'Ihre Bestellung ist bei uns eingegangen. Wir warten noch auf die sichere Zahlungsbestätigung.', sideTitle: 'Sicher verarbeitet' },
    success: { eyebrow: 'Zahlung erhalten', title: 'Vielen Dank, Ihre Bestellung ist eingegangen.', description: 'Wir haben Ihre Bestellung registriert. Sie erhalten die Bestätigung per E-Mail.', sideTitle: 'Wie geht es weiter?' },
    pending: { eyebrow: 'Zahlung wird verarbeitet', title: 'Wir warten auf die Zahlungsbestätigung.', description: 'Sie müssen nicht erneut bezahlen. Sobald die Zahlung bestätigt ist, informieren wir Sie per E-Mail.', sideTitle: 'Ihre Bestellung bleibt gespeichert' },
    failed: { eyebrow: 'Zahlung nicht abgeschlossen', title: 'Die Zahlung wurde nicht abgeschlossen.', description: 'Ihr Warenkorb bleibt erhalten. Versuchen Sie es erneut oder kontaktieren Sie uns, wenn Sie Hilfe benötigen.', sideTitle: 'So können Sie fortfahren' },
  },
} satisfies Record<StorefrontLocale, Record<StatusKind, { eyebrow: string; title: string; description: string; sideTitle: string }>>

const commonCopy = {
  nl: { orderNumber: 'Bestelnummer', cart: 'Terug naar winkelwagen', orders: 'Bekijk mijn bestellingen', products: 'Naar producten', contact: 'Contact opnemen', continue: 'Verder winkelen', paidWith: 'Veilig betaald met', support: 'Vragen over je bestelling?', failedSteps: [['Je winkelwagen is bewaard', 'Je kunt de bestelling opnieuw controleren en afrekenen.'], ['Persoonlijke hulp', 'Lumora helpt je direct als de betaling opnieuw niet lukt.']], pendingSteps: [['Beveiligde controle', 'We controleren de betaalstatus rechtstreeks.'], ['Bevestiging per e-mail', 'Je ontvangt bericht zodra de betaling is bevestigd.']], successSteps: [['Bestelling ontvangen', 'De bestelling staat veilig bij ons geregistreerd.'], ['Klaarmaken', 'We controleren en verpakken je bestelling zorgvuldig.'], ['Verzendbevestiging', 'Je ontvangt bericht zodra de bestelling onderweg is.']] },
  en: { orderNumber: 'Order number', cart: 'Back to cart', orders: 'View my orders', products: 'Go to products', contact: 'Contact us', continue: 'Continue shopping', paidWith: 'Paid securely with', support: 'Questions about your order?', failedSteps: [['Your cart is saved', 'You can review the order and try checkout again.'], ['Personal support', 'Lumora can help if the payment fails again.']], pendingSteps: [['Secure check', 'We verify the payment status directly.'], ['Email confirmation', 'We will email you as soon as the payment is confirmed.']], successSteps: [['Order received', 'Your order has been registered securely.'], ['Preparing your order', 'We check and pack your order carefully.'], ['Shipping confirmation', 'We will notify you when the order is on its way.']] },
  de: { orderNumber: 'Bestellnummer', cart: 'Zurück zum Warenkorb', orders: 'Meine Bestellungen ansehen', products: 'Zu den Produkten', contact: 'Kontakt aufnehmen', continue: 'Weiter einkaufen', paidWith: 'Sicher bezahlt mit', support: 'Fragen zu Ihrer Bestellung?', failedSteps: [['Ihr Warenkorb ist gespeichert', 'Sie können die Bestellung erneut prüfen und bezahlen.'], ['Persönliche Hilfe', 'Lumora hilft Ihnen, falls die Zahlung erneut nicht funktioniert.']], pendingSteps: [['Sichere Prüfung', 'Wir prüfen den Zahlungsstatus direkt.'], ['Bestätigung per E-Mail', 'Sie erhalten eine Nachricht, sobald die Zahlung bestätigt ist.']], successSteps: [['Bestellung erhalten', 'Ihre Bestellung ist sicher bei uns registriert.'], ['Vorbereitung', 'Wir prüfen und verpacken Ihre Bestellung sorgfältig.'], ['Versandbestätigung', 'Sie erhalten eine Nachricht, sobald die Bestellung unterwegs ist.']] },
} as const

function StatusIcon({ kind }: { kind: StatusKind }) {
  const className = [
    styles.statusIcon,
    kind === 'pending' || kind === 'loading' ? styles.statusIconPending : '',
    kind === 'failed' ? styles.statusIconFailed : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={className} aria-hidden="true">
      {kind === 'success' ? <CheckIcon /> : kind === 'failed' ? <CloseIcon /> : <ClockIcon />}
    </div>
  )
}

function Steps({ kind, locale }: { kind: StatusKind; locale: StorefrontLocale }) {
  const copy = commonCopy[locale]
  if (kind === 'failed') {
    return (
      <ul className={styles.steps}>
        <li><span className={styles.stepIcon}><BagIcon /></span><span><strong>{copy.failedSteps[0][0]}</strong><small>{copy.failedSteps[0][1]}</small></span></li>
        <li><span className={styles.stepIcon}><MessageIcon /></span><span><strong>{copy.failedSteps[1][0]}</strong><small>{copy.failedSteps[1][1]}</small></span></li>
      </ul>
    )
  }

  if (kind === 'pending' || kind === 'loading') {
    return (
      <ul className={styles.steps}>
        <li><span className={styles.stepIcon}><ShieldIcon /></span><span><strong>{copy.pendingSteps[0][0]}</strong><small>{copy.pendingSteps[0][1]}</small></span></li>
        <li><span className={styles.stepIcon}><MessageIcon /></span><span><strong>{copy.pendingSteps[1][0]}</strong><small>{copy.pendingSteps[1][1]}</small></span></li>
      </ul>
    )
  }

  return (
    <ul className={styles.steps}>
      <li><span className={styles.stepIcon}><CheckIcon /></span><span><strong>{copy.successSteps[0][0]}</strong><small>{copy.successSteps[0][1]}</small></span></li>
      <li><span className={styles.stepIcon}><BagIcon /></span><span><strong>{copy.successSteps[1][0]}</strong><small>{copy.successSteps[1][1]}</small></span></li>
      <li><span className={styles.stepIcon}><TruckIcon /></span><span><strong>{copy.successSteps[2][0]}</strong><small>{copy.successSteps[2][1]}</small></span></li>
    </ul>
  )
}

export default function CheckoutStatusScreen({ kind, orderNumber, locale = 'nl' }: CheckoutStatusScreenProps) {
  const text = content[locale][kind]
  const copy = commonCopy[locale]
  const isLoading = kind === 'loading'

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section
          className={styles.card}
          aria-live={kind === 'failed' ? 'assertive' : isLoading ? 'polite' : undefined}
          aria-busy={isLoading || undefined}
          role={kind === 'failed' ? 'alert' : isLoading ? 'status' : undefined}
        >
          <div className={styles.main}>
            <StatusIcon kind={kind} />
            <p className={styles.eyebrow}>{text.eyebrow}</p>
            <h1 className={styles.title}>{text.title}</h1>
            <p className={styles.description}>{text.description}</p>

            {orderNumber ? (
              <div className={styles.orderNumber}>
                <span>{copy.orderNumber}</span>
                <strong>{orderNumber}</strong>
              </div>
            ) : null}

            {isLoading ? (
              <div className={styles.progressTrack} aria-hidden="true"><span className={styles.progressBar} /></div>
            ) : (
              <div className={styles.actions}>
                <Link className={styles.primaryAction} href={localizePathForLocale(kind === 'failed' ? '/winkelmand' : kind === 'success' ? '/account/orders' : '/products', locale)}>
                  {kind === 'failed' ? copy.cart : kind === 'success' ? copy.orders : copy.products}
                  <ArrowRightIcon />
                </Link>
                {kind === 'failed' ? (
                  <a className={styles.secondaryAction} href="mailto:info@lumorahorticulture.com"><MessageIcon /> {copy.contact}</a>
                ) : (
                  <Link className={styles.secondaryAction} href={localizePathForLocale('/products', locale)}>{copy.continue}</Link>
                )}
              </div>
            )}
          </div>

          <aside className={styles.side} aria-label={text.sideTitle}>
            <div>
              <h2>{text.sideTitle}</h2>
              <Steps kind={kind} locale={locale} />
            </div>
            <div className={styles.paymentProof}>
              <span>{copy.paidWith}</span>
              <PaymentLogos />
            </div>
          </aside>
        </section>

        <p className={styles.support}>{copy.support} <a href="mailto:info@lumorahorticulture.com">info@lumorahorticulture.com</a></p>
      </div>
    </main>
  )
}
