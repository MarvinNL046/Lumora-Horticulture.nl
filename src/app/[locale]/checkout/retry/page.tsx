'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { localizePathForLocale } from '@/lib/url-localizations';
import { formatPrice } from '@/lib/volume-discount';

interface OrderDetails {
  customer_name: string | null;
  total_amount: number;
  payment_status: string | null;
  can_retry: boolean;
}

type SupportedLocale = 'nl' | 'en' | 'de';

const COPY = {
  nl: {
    title: 'Betaling opnieuw proberen',
    subtitle: 'Je bestelling wacht nog op betaling',
    loading: 'Beveiligde betaallink controleren…',
    orderFound: 'Bestelling gevonden',
    customer: 'Klant',
    amount: 'Bedrag',
    status: 'Status',
    pending: 'Wacht op betaling',
    expired: 'Verlopen',
    failed: 'Mislukt',
    cancelled: 'Geannuleerd',
    payNow: 'Veilig betalen via Mollie',
    processing: 'Betaallink maken…',
    securePayment: 'Je betaling wordt veilig verwerkt door Mollie',
    invalid: 'Deze betaallink is ongeldig of verlopen. Neem contact met ons op voor hulp.',
    alreadyPaid: 'Deze bestelling is al betaald.',
    unavailable: 'Betalen is tijdelijk niet beschikbaar. Probeer het over een moment opnieuw.',
    needHelp: 'Hulp nodig?',
    contactUs: 'Neem contact met ons op via',
    backToShop: 'Terug naar de winkel',
  },
  en: {
    title: 'Retry payment',
    subtitle: 'Your order is still waiting for payment',
    loading: 'Checking your secure payment link…',
    orderFound: 'Order found',
    customer: 'Customer',
    amount: 'Amount',
    status: 'Status',
    pending: 'Awaiting payment',
    expired: 'Expired',
    failed: 'Failed',
    cancelled: 'Cancelled',
    payNow: 'Pay securely with Mollie',
    processing: 'Creating payment link…',
    securePayment: 'Your payment is securely processed by Mollie',
    invalid: 'This payment link is invalid or expired. Please contact us for help.',
    alreadyPaid: 'This order has already been paid.',
    unavailable: 'Payment is temporarily unavailable. Please try again in a moment.',
    needHelp: 'Need help?',
    contactUs: 'Contact us at',
    backToShop: 'Back to shop',
  },
  de: {
    title: 'Zahlung erneut versuchen',
    subtitle: 'Ihre Bestellung wartet noch auf Zahlung',
    loading: 'Sicherer Zahlungslink wird geprüft…',
    orderFound: 'Bestellung gefunden',
    customer: 'Kunde',
    amount: 'Betrag',
    status: 'Status',
    pending: 'Zahlung ausstehend',
    expired: 'Abgelaufen',
    failed: 'Fehlgeschlagen',
    cancelled: 'Storniert',
    payNow: 'Sicher mit Mollie bezahlen',
    processing: 'Zahlungslink wird erstellt…',
    securePayment: 'Ihre Zahlung wird sicher von Mollie verarbeitet',
    invalid: 'Dieser Zahlungslink ist ungültig oder abgelaufen. Bitte kontaktieren Sie uns.',
    alreadyPaid: 'Diese Bestellung wurde bereits bezahlt.',
    unavailable: 'Die Zahlung ist vorübergehend nicht verfügbar. Bitte versuchen Sie es gleich erneut.',
    needHelp: 'Brauchen Sie Hilfe?',
    contactUs: 'Kontaktieren Sie uns unter',
    backToShop: 'Zurück zum Shop',
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

  const backToShopHref = useMemo(() => {
    const localizedPath = localizePathForLocale('/shop', locale);
    return locale === 'nl' ? localizedPath : `/${locale}${localizedPath}`;
  }, [locale]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const hashParams = new URLSearchParams(url.hash.replace(/^#/, ''));
    // Hash is the safe format. Query support is kept temporarily so recovery
    // emails already sent before this release do not stop working.
    const capturedToken = hashParams.get('token') ?? url.searchParams.get('token');

    url.searchParams.delete('token');
    url.hash = '';
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}`,
    );

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

  const statusColor = (status: string | null) => {
    if (status === 'failed') return 'bg-red-100 text-red-700';
    if (status === 'cancelled' || status === 'canceled') return 'bg-gray-100 text-gray-700';
    if (status === 'expired') return 'bg-orange-100 text-orange-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-lumora-green-500/10">
            <svg className="h-8 w-8 text-lumora-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="mb-2 font-display text-3xl font-bold text-lumora-dark sm:text-4xl">{t.title}</h1>
          <p className="text-lg text-lumora-dark/70">{t.subtitle}</p>
        </div>

        <div className="rounded-3xl border border-lumora-dark/10 bg-white p-6 shadow-soft-lg sm:p-8">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-10 text-lumora-dark/70" role="status">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-lumora-green-500 border-t-transparent" />
              {t.loading}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4" role="alert">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {!loading && order && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 rounded-xl bg-lumora-green-500/10 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lumora-green-600" aria-hidden="true">✓</span>
                <p className="font-semibold text-lumora-dark">{t.orderFound}</p>
              </div>

              <div className="space-y-4 rounded-xl bg-lumora-cream/30 p-5">
                {order.customer_name && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-lumora-dark/70">{t.customer}</span>
                    <span className="text-right font-medium text-lumora-dark">{order.customer_name}</span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lumora-dark/70">{t.status}</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusColor(order.payment_status)}`}>
                    {statusLabel(order.payment_status)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-lumora-dark/10 pt-3">
                  <span className="text-lg font-semibold text-lumora-dark">{t.amount}</span>
                  <span className="text-2xl font-bold text-lumora-green-500">{formatPrice(order.total_amount)}</span>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4" role="alert">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="button"
                onClick={handleRetryPayment}
                disabled={retryLoading || !order.can_retry}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-lumora-green-500 py-4 text-xl font-semibold text-white shadow-soft-md transition-all hover:bg-lumora-green-600 hover:shadow-soft-lg disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {retryLoading ? t.processing : t.payNow}
              </button>

              <p className="text-center text-sm text-lumora-dark/60">🔒 {t.securePayment}</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="mb-2 text-lumora-dark/70">{t.needHelp}</p>
          <p className="text-lumora-green-500">
            {t.contactUs}{' '}
            <a href="mailto:info@lumorahorticulture.com" className="underline hover:text-lumora-green-600">
              info@lumorahorticulture.com
            </a>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href={backToShopHref} className="text-lumora-dark/60 transition-colors hover:text-lumora-dark">
            ← {t.backToShop}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RetryPaymentPage() {
  return <RetryPaymentContent />;
}
