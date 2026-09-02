import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { StackHandler } from '@stackframe/stack'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'
import { stackServerApp } from '@/stack/server'
import styles from './auth.module.css'

export const metadata: Metadata = {
  title: 'Inloggen | Lumora Horticulture',
  description: 'Log in bij je Lumora-klantaccount voor bestellingen, facturen en bezorginformatie.',
  robots: { index: false, follow: false },
}

export default function Handler(props: Parameters<typeof StackHandler>[0]) {
  return (
    <StoreShell>
      <main className={styles.authPage}>
        <div className={styles.authContainer}>
          <section className={styles.authGrid} aria-label="Lumora klantaccount">
            <div className={styles.authVisual}>
              <Image
                src="/productAfbeeldingen/stekpluggen/stekpluggen-greenhouse-hero-desktop.avif"
                alt="Stekpluggen van Lumora in een lichte kas"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 48vw"
              />
              <div className={styles.visualOverlay} />
              <div className={styles.visualCopy}>
                <span>Klantaccount</span>
                <h1>Alles rond je bestelling op één plek.</h1>
                <p>Bekijk je bestelstatus, download facturen en volg je levering zodra deze onderweg is.</p>
              </div>
              <div className={styles.visualBadge}>
                <ShieldIcon />
                <span><strong>Veilig inloggen</strong><small>Je gegevens blijven beschermd</small></span>
              </div>
            </div>

            <div className={styles.authPanel}>
              <div className={styles.panelIntro}>
                <span>Welkom bij Lumora</span>
                <h2>Log in of maak een account aan.</h2>
                <p>Gebruik hetzelfde e-mailadres als bij je bestelling om alles overzichtelijk terug te vinden.</p>
              </div>

              <div className={styles.authForm}>
                <div className={styles.authFormSkeleton} aria-hidden="true">
                  <span /><span /><span /><span /><span /><span /><span />
                </div>
                <div className={styles.authFormContent}>
                  <StackHandler {...props} fullPage={false} app={stackServerApp} />
                </div>
              </div>

              <div className={styles.accountBenefits} aria-label="Voordelen van een Lumora-account">
                <span><OrdersIcon /> Bestellingen</span>
                <span><InvoiceIcon /> Facturen</span>
                <span><TruckIcon /> Track & Trace</span>
              </div>

              <Link className={styles.backLink} href="/producten">← Terug naar de producten</Link>
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
