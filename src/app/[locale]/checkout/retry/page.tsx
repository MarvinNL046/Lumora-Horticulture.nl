'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { localizePathForLocale } from '@/lib/url-localizations';
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell';
import { ArrowRightIcon, LockIcon, MessageIcon, ShieldIcon } from '@/app/lumora-premium/_components/Icons';
import { PaymentLogos } from '@/app/lumora-premium/_components/PaymentLogos';
import styles from '@/components/CheckoutStatusScreen.module.css';

interface OrderDetails {
  customer_name: string | null;
  total_amount: number;
  payment_status: string | null;
  can_retry: boolean;
}

type SupportedLocale = 'nl' | 'en' | 'de';

const COPY = {
  nl: {
    eyebrow: 'Betaling afronden',
    title: 'Rond je betaling alsnog af.',
    subtitle: 'Je bestelling staat veilig voor je klaar en wacht nog op betaling.',
    loading: 'Beveiligde betaallink controleren…',
    orderFound: 'Bestelling gevonden',
    customer: 'Klant',
    amount: 'Bedrag',
    status: 'Status',
    pending: 'Wacht op betaling',
    expired: 'Verlopen',
    failed: 'Mislukt',
    cancelled: 'Geannuleerd',
    payNow: 'Veilig betalen',
    processing: 'Betaallink maken…',
    securePayment: 'Betaal met een bekende betaalmethode',
    invalid: 'Deze betaallink is ongeldig of verlopen. Neem contact met ons op voor hulp.',
    alreadyPaid: 'Deze bestelling is al betaald.',
    unavailable: 'Betalen is tijdelijk niet beschikbaar. Probeer het over een moment opnieuw.',
    sideTitle: 'Zo werkt het',
    steps: [['Beveiligde controle', 'We controleren je betaallink en bestelling rechtstreeks.'], ['Betaal in één stap', 'Je betaalt met iDEAL, Wero, Visa of Mastercard.'], ['Bevestiging per e-mail', 'Zodra de betaling binnen is, ontvang je direct bericht.']],
    support: 'Hulp nodig bij je betaling?',
    contact: 'Contact opnemen',
    backToShop: 'Terug naar de producten',
  },
  en: {
    eyebrow: 'Complete your payment',
    title: 'Finish your payment.',
    subtitle: 'Your order is safely reserved and is still waiting for payment.',
    loading: 'Checking your secure payment link…',
    orderFound: 'Order found',
    customer: 'Customer',
    amount: 'Amount',
    status: 'Status',
    pending: 'Awaiting payment',
    expired: 'Expired',
    failed: 'Failed',
    cancelled: 'Cancelled',
    payNow: 'Pay securely',
    processing: 'Creating payment link…',
    securePayment: 'Pay with a familiar payment method',
    invalid: 'This payment link is invalid or has expired. Please contact us for help.',
    alreadyPaid: 'This order has already been paid.',
    unavailable: 'Payment is temporarily unavailable. Please try again in a moment.',
    sideTitle: 'How it works',
    steps: [['Secure check', 'We verify your payment link and order directly.'], ['Pay in one step', 'Pay with iDEAL, Wero, Visa or Mastercard.'], ['Email confirmation', 'You receive a confirmation as soon as the payment arrives.']],
    support: 'Need help with your payment?',
    contact: 'Contact us',
    backToShop: 'Back to products',
  },
  de: {
    eyebrow: 'Zahlung abschließen',
    title: 'Schließen Sie Ihre Zahlung ab.',
    subtitle: 'Ihre Bestellung ist sicher für Sie reserviert und wartet noch auf die Zahlung.',
    loading: 'Sicherer Zahlungslink wird geprüft…',
    orderFound: 'Bestellung gefunden',
    customer: 'Kunde',
    amount: 'Betrag',
    status: 'Status',
    pending: 'Zahlung ausstehend',
    expired: 'Abgelaufen',
    failed: 'Fehlgeschlagen',
    cancelled: 'Storniert',
    payNow: 'Sicher bezahlen',
    processing: 'Zahlungslink wird erstellt…',
    securePayment: 'Bezahlen Sie mit einer bekannten Zahlungsmethode',
    invalid: 'Dieser Zahlungslink ist ungültig oder abgelaufen. Bitte kontaktieren Sie uns.',
    alreadyPaid: 'Diese Bestellung wurde bereits bezahlt.',
    unavailable: 'Die Zahlung ist vorübergehend nicht verfügbar. Bitte versuchen Sie es gleich erneut.',
    sideTitle: 'So funktioniert es',
    steps: [['Sichere Prüfung', 'Wir prüfen Ihren Zahlungslink und Ihre Bestellung direkt.'], ['In einem Schritt bezahlen', 'Sie bezahlen mit iDEAL, Wero, Visa oder Mastercard.'], ['Bestätigung per E-Mail', 'Sobald die Zahlung eingegangen ist, erhalten Sie sofort eine Nachricht.']],
    support: 'Brauchen Sie Hilfe bei Ihrer Zahlung?',
    contact: 'Kontakt aufnehmen',
    backToShop: 'Zurück zu den Produkten',
  },
} as const;

function localeFromParam(value: unknown): SupportedLocale {
  return value === 'en' || value === 'de' ? value : 'nl';
}

function RetryPaymentContent() {
  const params = useParams();
  const locale = localeFromParam(params?.locale);
  const t = COPY[locale];
  const [token, setToken] = useState<string | null>(null);
  const [tokenCaptured, setTokenCaptured] = useState(false);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [retryLoading, setRetryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backToShopHref = useMemo(() => localizePathForLocale('/products', locale), [locale]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const hashParams = new URLSearchParams(url.hash.replace(/^#/, ''));
    // Hash is the safe format. Query support is kept temporarily so recovery
    // emails already sent before this release do not stop working.
    const capturedToken = hashParams.get('token') ?? url.searchParams.get('token');

    url.searchParams.delete('token');
    url.hash = '';
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}`);

    setToken(capturedToken);
    setTokenCaptured(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    if (!tokenCaptured) return () => controller.abort();

    if (!token) {
      setError(t.invalid);
      setLoading(false);
      return () => controller.abort();
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    fetch('/api/payments/retry', {
      cache: 'no-store',
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !data.success || !data.order) {
          if (data.code === 'ALREADY_PAID') throw new Error('ALREADY_PAID');
          if (data.code === 'RETRY_UNAVAILABLE' || data.code === 'RETRY_NOT_CONFIGURED') {
            throw new Error('UNAVAILABLE');
          }
          throw new Error('INVALID');
        }
        setOrder(data.order as OrderDetails);
      })
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        const code = requestError instanceof Error ? requestError.message : 'INVALID';
        setError(code === 'ALREADY_PAID' ? t.alreadyPaid : code === 'UNAVAILABLE' ? t.unavailable : t.invalid);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [token, tokenCaptured, t]);

  const handleRetryPayment = async () => {
    if (!token || !order?.can_retry) return;

    setRetryLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/retry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();

      if (response.ok && data.success && typeof data.payment_url === 'string') {
        window.location.assign(data.payment_url);
        return;
      }

      if (data.code === 'ALREADY_PAID') {
        setOrder(null);
        setError(t.alreadyPaid);
      } else if (data.code === 'INVALID_RETRY_LINK') {
        setOrder(null);
        setError(t.invalid);
      } else {
        setError(t.unavailable);
      }
    } catch {
      setError(t.unavailable);
    } finally {
      setRetryLoading(false);
    }
  };

  const statusLabel = (status: string | null) => {
    if (status === 'expired') return t.expired;
    if (status === 'failed') return t.failed;
    if (status === 'cancelled' || status === 'canceled') return t.cancelled;
    return t.pending;
  };

  const amount = order
    ? new Intl.NumberFormat(locale === 'en' ? 'en-IE' : locale === 'de' ? 'de-DE' : 'nl-NL', { style: 'currency', currency: 'EUR' }).format(order.total_amount)
    : null;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section
          className={styles.card}
          aria-live={error ? 'assertive' : loading ? 'polite' : undefined}
          aria-busy={loading || undefined}
          role={error ? 'alert' : loading ? 'status' : undefined}
        >
          <div className={styles.main}>
            <div className={`${styles.statusIcon} ${error ? styles.statusIconFailed : styles.statusIconPending}`} aria-hidden="true">
              <LockIcon />
            </div>
            <p className={styles.eyebrow}>{t.eyebrow}</p>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.description}>{t.subtitle}</p>

            {loading ? (
              <>
                <p className={styles.description}>{t.loading}</p>
                <div className={styles.progressTrack} aria-hidden="true"><span className={styles.progressBar} /></div>
              </>
            ) : null}

            {!loading && error ? (
              <div className={styles.orderNumber}>
                <strong>{error}</strong>
              </div>
            ) : null}

            {!loading && order ? (
              <>
                <div className={styles.retryDetails}>
                  {order.customer_name ? (
                    <div><span>{t.customer}</span><strong>{order.customer_name}</strong></div>
                  ) : null}
                  <div><span>{t.status}</span><strong>{statusLabel(order.payment_status)}</strong></div>
                  <div><span>{t.amount}</span><strong>{amount}</strong></div>
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.primaryAction}
                    onClick={handleRetryPayment}
                    disabled={retryLoading || !order.can_retry}
                  >
                    {retryLoading ? t.processing : `${t.payNow} · ${amount}`}
                    {retryLoading ? null : <ArrowRightIcon />}
                  </button>
                  <Link className={styles.secondaryAction} href={backToShopHref}>{t.backToShop}</Link>
                </div>
              </>
            ) : null}

            {!loading && !order ? (
              <div className={styles.actions}>
                <a className={styles.primaryAction} href="mailto:info@lumorahorticulture.com"><MessageIcon /> {t.contact}</a>
                <Link className={styles.secondaryAction} href={backToShopHref}>{t.backToShop}</Link>
              </div>
            ) : null}
          </div>

          <aside className={styles.side} aria-label={t.sideTitle}>
            <div>
              <h2>{t.sideTitle}</h2>
              <ul className={styles.steps}>
                {t.steps.map(([title, text], index) => (
                  <li key={title}>
                    <span className={styles.stepIcon}>{index === 0 ? <ShieldIcon /> : index === 1 ? <LockIcon /> : <MessageIcon />}</span>
                    <span><strong>{title}</strong><small>{text}</small></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.paymentProof}>
              <span>{t.securePayment}</span>
              <PaymentLogos />
            </div>
          </aside>
        </section>

        <p className={styles.support}>{t.support} <a href="mailto:info@lumorahorticulture.com">info@lumorahorticulture.com</a></p>
      </div>
    </main>
  );
}

export default function RetryPaymentPage() {
  return (
    <StoreShell>
      <RetryPaymentContent />
    </StoreShell>
  );
}
