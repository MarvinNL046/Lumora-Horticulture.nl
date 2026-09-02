import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { StackHandler } from '@stackframe/stack'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'
import { resolveStorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'
import { localizePathForLocale } from '@/lib/url-localizations'
import { stackServerApp } from '@/stack/server'
import { getLocale } from 'next-intl/server'
import styles from './auth.module.css'

const authCopy = {
  nl: {
    metadataTitle: 'Inloggen | Lumora Horticulture',
    metadataDescription: 'Log in bij je Lumora-klantaccount voor bestellingen, facturen en bezorginformatie.',
    accountAria: 'Lumora klantaccount',
    imageAlt: 'Stekpluggen van Lumora in een lichte kas',
    eyebrow: 'Klantaccount',
    visualTitle: 'Alles rond je bestelling op één plek.',
    visualText: 'Bekijk je bestelstatus, download facturen en volg je levering zodra deze onderweg is.',
    secureSignIn: 'Veilig inloggen',
    protectedData: 'Je gegevens blijven beschermd',
    welcome: 'Welkom bij Lumora',
    title: 'Log in of maak een account aan.',
    intro: 'Gebruik hetzelfde e-mailadres als bij je bestelling voor je bestellingen, facturen en Track & Trace.',
    benefitsAria: 'Voordelen van een Lumora-account',
    orders: 'Bestellingen',
    invoices: 'Facturen',
    tracking: 'Track & Trace',
    back: 'Terug naar de producten',
  },
  en: {
    metadataTitle: 'Sign in | Lumora Horticulture',
    metadataDescription: 'Sign in to your Lumora customer account for orders, invoices and delivery information.',
    accountAria: 'Lumora customer account',
    imageAlt: 'Lumora Paper Plug Trays in a bright greenhouse',
    eyebrow: 'Customer account',
    visualTitle: 'Everything about your order in one place.',
    visualText: 'Check your order status, download invoices and track your delivery once it is on its way.',
    secureSignIn: 'Secure sign-in',
    protectedData: 'Your data stays protected',
    welcome: 'Welcome to Lumora',
    title: 'Sign in or create an account.',
    intro: 'Use the same email address as your order to view orders, download invoices and follow Track & Trace.',
    benefitsAria: 'Benefits of a Lumora account',
    orders: 'Orders',
    invoices: 'Invoices',
    tracking: 'Track & Trace',
    back: 'Back to products',
  },
  de: {
    metadataTitle: 'Anmelden | Lumora Horticulture',
    metadataDescription: 'Melden Sie sich für Bestellungen, Rechnungen und Lieferinformationen bei Ihrem Lumora-Kundenkonto an.',
    accountAria: 'Lumora Kundenkonto',
    imageAlt: 'Lumora Paper Plug Trays in einem hellen Gewächshaus',
    eyebrow: 'Kundenkonto',
    visualTitle: 'Alles rund um Ihre Bestellung an einem Ort.',
    visualText: 'Behalten Sie Ihren Bestellstatus im Blick, laden Sie Rechnungen herunter und verfolgen Sie Ihre Lieferung, sobald sie unterwegs ist.',
    secureSignIn: 'Sicher anmelden',
    protectedData: 'Ihre Daten bleiben geschützt',
    welcome: 'Willkommen bei Lumora',
    title: 'Anmelden oder Konto erstellen.',
    intro: 'Verwenden Sie dieselbe E-Mail-Adresse wie bei Ihrer Bestellung für Bestellungen, Rechnungen und Sendungsverfolgung.',
    benefitsAria: 'Vorteile eines Lumora-Kontos',
    orders: 'Bestellungen',
    invoices: 'Rechnungen',
    tracking: 'Sendungsverfolgung',
    back: 'Zurück zu den Produkten',
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveStorefrontLocale(await getLocale())
  const copy = authCopy[locale]

  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    robots: { index: false, follow: false },
  }
}

export default async function Handler(props: Parameters<typeof StackHandler>[0]) {
  const locale = resolveStorefrontLocale(await getLocale())
  const copy = authCopy[locale]

  return (
    <StoreShell>
      <main className={styles.authPage}>
        <div className={styles.authContainer}>
          <section className={styles.authGrid} aria-label={copy.accountAria}>
            <div className={styles.authVisual}>
              <Image
                src="/productAfbeeldingen/stekpluggen/stekpluggen-greenhouse-hero-desktop.avif"
                alt={copy.imageAlt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 48vw"
              />
              <div className={styles.visualOverlay} />
              <div className={styles.visualCopy}>
                <span>{copy.eyebrow}</span>
                <h1>{copy.visualTitle}</h1>
                <p>{copy.visualText}</p>
              </div>
              <div className={styles.visualBadge}>
                <ShieldIcon />
                <span><strong>{copy.secureSignIn}</strong><small>{copy.protectedData}</small></span>
              </div>
            </div>

            <div className={styles.authPanel}>
              <div className={styles.panelIntro}>
                <span>{copy.welcome}</span>
                <h2>{copy.title}</h2>
                <p>{copy.intro}</p>
              </div>

              <div className={styles.authForm}>
                <div className={styles.authFormSkeleton} aria-hidden="true">
                  <span /><span /><span /><span /><span /><span /><span />
                </div>
                <div className={styles.authFormContent}>
                  <StackHandler {...props} fullPage={false} app={stackServerApp} />
                </div>
              </div>

              <div className={styles.accountBenefits} aria-label={copy.benefitsAria}>
                <span><OrdersIcon /> {copy.orders}</span>
                <span><InvoiceIcon /> {copy.invoices}</span>
                <span><TruckIcon /> {copy.tracking}</span>
              </div>

              <Link className={styles.backLink} href={localizePathForLocale('/products', locale)}>← {copy.back}</Link>
            </div>
          </section>
        </div>
      </main>
    </StoreShell>
  )
}

function Icon({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
}

function ShieldIcon() { return <Icon><path d="M12 3 5 6v5c0 4.8 2.8 8.3 7 10 4.2-1.7 7-5.2 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></Icon> }
function OrdersIcon() { return <Icon><path d="M6 3h12l2 5v13H4V8l2-5Z"/><path d="M4 8h16"/></Icon> }
function InvoiceIcon() { return <Icon><path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4"/></Icon> }
function TruckIcon() { return <Icon><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></Icon> }
