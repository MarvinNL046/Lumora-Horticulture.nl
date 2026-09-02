import Link from 'next/link'
import { ArrowRightIcon, BagIcon, CheckIcon, MessageIcon, ShieldIcon, TruckIcon } from '@/app/lumora-premium/_components/Icons'
import { PaymentLogos } from '@/app/lumora-premium/_components/PaymentLogos'
import styles from './CheckoutStatusScreen.module.css'

type StatusKind = 'loading' | 'success' | 'pending' | 'failed'

type CheckoutStatusScreenProps = {
  kind: StatusKind
  orderNumber?: string
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
  loading: {
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
  },
} satisfies Record<StatusKind, { eyebrow: string; title: string; description: string; sideTitle: string }>

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

function Steps({ kind }: { kind: StatusKind }) {
  if (kind === 'failed') {
    return (
      <ul className={styles.steps}>
        <li><span className={styles.stepIcon}><BagIcon /></span><span><strong>Je winkelwagen is bewaard</strong><small>Je kunt de bestelling opnieuw controleren en afrekenen.</small></span></li>
        <li><span className={styles.stepIcon}><MessageIcon /></span><span><strong>Persoonlijke hulp</strong><small>Lumora helpt je direct als de betaling opnieuw niet lukt.</small></span></li>
      </ul>
    )
  }

  if (kind === 'pending' || kind === 'loading') {
    return (
      <ul className={styles.steps}>
        <li><span className={styles.stepIcon}><ShieldIcon /></span><span><strong>Beveiligde controle</strong><small>We controleren de betaalstatus rechtstreeks.</small></span></li>
        <li><span className={styles.stepIcon}><MessageIcon /></span><span><strong>Bevestiging per e-mail</strong><small>Je ontvangt bericht zodra de betaling is bevestigd.</small></span></li>
      </ul>
    )
  }

  return (
    <ul className={styles.steps}>
      <li><span className={styles.stepIcon}><CheckIcon /></span><span><strong>Bestelling ontvangen</strong><small>De bestelling staat veilig bij ons geregistreerd.</small></span></li>
      <li><span className={styles.stepIcon}><BagIcon /></span><span><strong>Klaarmaken</strong><small>We controleren en verpakken je bestelling zorgvuldig.</small></span></li>
      <li><span className={styles.stepIcon}><TruckIcon /></span><span><strong>Verzendbevestiging</strong><small>Je ontvangt bericht zodra de bestelling onderweg is.</small></span></li>
    </ul>
  )
}

export default function CheckoutStatusScreen({ kind, orderNumber }: CheckoutStatusScreenProps) {
  const text = content[kind]
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
                <span>Bestelnummer</span>
                <strong>{orderNumber}</strong>
              </div>
            ) : null}

            {isLoading ? (
              <div className={styles.progressTrack} aria-hidden="true"><span className={styles.progressBar} /></div>
            ) : (
              <div className={styles.actions}>
                <Link className={styles.primaryAction} href={kind === 'failed' ? '/winkelmand' : kind === 'success' ? '/account/orders' : '/producten'}>
                  {kind === 'failed' ? 'Terug naar winkelwagen' : kind === 'success' ? 'Bekijk mijn bestellingen' : 'Naar producten'}
                  <ArrowRightIcon />
                </Link>
                {kind === 'failed' ? (
                  <a className={styles.secondaryAction} href="mailto:info@lumorahorticulture.com"><MessageIcon /> Contact opnemen</a>
                ) : (
                  <Link className={styles.secondaryAction} href="/producten">Verder winkelen</Link>
                )}
              </div>
            )}
          </div>

          <aside className={styles.side} aria-label={text.sideTitle}>
            <div>
              <h2>{text.sideTitle}</h2>
              <Steps kind={kind} />
            </div>
            <div className={styles.paymentProof}>
              <span>Veilig betaald met</span>
              <PaymentLogos />
            </div>
          </aside>
        </section>

        <p className={styles.support}>Vragen over je bestelling? <a href="mailto:info@lumorahorticulture.com">info@lumorahorticulture.com</a></p>
      </div>
    </main>
  )
}
