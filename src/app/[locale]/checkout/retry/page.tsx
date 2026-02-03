'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { localizePathForLocale } from '@/lib/url-localizations';
import { formatPrice } from '@/lib/volume-discount';

interface OrderDetails {
  id: string;
  customer_name: string;
  total_amount: string;
  status: string;
  payment_status: string;
  can_retry: boolean;
}

export default function RetryPaymentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'nl';

  // Get order_id from URL if provided (from recovery email)
  const orderIdFromUrl = searchParams.get('order_id');

  const [orderId, setOrderId] = useState(orderIdFromUrl || '');
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryLoading, setRetryLoading] = useState(false);

  const t = {
    title: locale === 'de'
      ? 'Zahlung erneut versuchen'
      : locale === 'en'
      ? 'Retry Payment'
      : 'Betaling Opnieuw Proberen',
    subtitle: locale === 'de'
      ? 'Ihre Bestellung wartet noch auf Zahlung'
      : locale === 'en'
      ? 'Your order is still waiting for payment'
      : 'Je bestelling wacht nog op betaling',
    orderIdLabel: locale === 'de'
      ? 'Bestellnummer'
      : locale === 'en'
      ? 'Order ID'
      : 'Bestelnummer',
    orderIdPlaceholder: locale === 'de'
      ? 'z.B. 9ba26fd2-7de5-4e4c-8202-52176add025f'
      : locale === 'en'
      ? 'e.g. 9ba26fd2-7de5-4e4c-8202-52176add025f'
      : 'bijv. 9ba26fd2-7de5-4e4c-8202-52176add025f',
    lookupButton: locale === 'de'
      ? 'Bestellung suchen'
      : locale === 'en'
      ? 'Look up order'
      : 'Bestelling Opzoeken',
    searching: locale === 'de'
      ? 'Suche...'
      : locale === 'en'
      ? 'Searching...'
      : 'Zoeken...',
    orderFound: locale === 'de'
      ? 'Bestellung gefunden'
      : locale === 'en'
      ? 'Order found'
      : 'Bestelling gevonden',
    customer: locale === 'de' ? 'Kunde' : locale === 'en' ? 'Customer' : 'Klant',
    amount: locale === 'de' ? 'Betrag' : locale === 'en' ? 'Amount' : 'Bedrag',
    status: locale === 'de' ? 'Status' : locale === 'en' ? 'Status' : 'Status',
    payNow: locale === 'de'
      ? 'Jetzt bezahlen'
      : locale === 'en'
      ? 'Pay Now'
      : 'Nu Betalen',
    processing: locale === 'de'
      ? 'Zahlungslink wird erstellt...'
      : locale === 'en'
      ? 'Creating payment link...'
      : 'Betaallink wordt aangemaakt...',
    errorNotFound: locale === 'de'
      ? 'Bestellung nicht gefunden. Bitte überprüfen Sie die Bestellnummer.'
      : locale === 'en'
      ? 'Order not found. Please check the order ID.'
      : 'Bestelling niet gevonden. Controleer het bestelnummer.',
    errorAlreadyPaid: locale === 'de'
      ? 'Diese Bestellung wurde bereits bezahlt.'
      : locale === 'en'
      ? 'This order has already been paid.'
      : 'Deze bestelling is al betaald.',
    errorCannotRetry: locale === 'de'
      ? 'Die Zahlung für diese Bestellung kann nicht wiederholt werden.'
      : locale === 'en'
      ? 'Payment cannot be retried for this order.'
      : 'De betaling voor deze bestelling kan niet opnieuw worden geprobeerd.',
    errorGeneric: locale === 'de'
      ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
      : locale === 'en'
      ? 'An error occurred. Please try again.'
      : 'Er is een fout opgetreden. Probeer het opnieuw.',
    statusExpired: locale === 'de' ? 'Abgelaufen' : locale === 'en' ? 'Expired' : 'Verlopen',
    statusFailed: locale === 'de' ? 'Fehlgeschlagen' : locale === 'en' ? 'Failed' : 'Mislukt',
    statusCancelled: locale === 'de' ? 'Storniert' : locale === 'en' ? 'Cancelled' : 'Geannuleerd',
    statusPending: locale === 'de' ? 'Ausstehend' : locale === 'en' ? 'Pending' : 'In afwachting',
    helpText: locale === 'de'
      ? 'Sie finden Ihre Bestellnummer in der Bestätigungs-E-Mail oder in der Zahlungsaufforderung.'
      : locale === 'en'
      ? 'You can find your order ID in the confirmation email or payment recovery email.'
      : 'Je vindt je bestelnummer in de bevestigingsmail of de betaalherinnering.',
    securePayment: locale === 'de'
      ? 'Sichere Zahlung über Mollie'
      : locale === 'en'
      ? 'Secure payment via Mollie'
      : 'Veilig betalen via Mollie',
    needHelp: locale === 'de'
      ? 'Brauchen Sie Hilfe?'
      : locale === 'en'
      ? 'Need help?'
      : 'Hulp nodig?',
    contactUs: locale === 'de'
      ? 'Kontaktieren Sie uns unter'
      : locale === 'en'
      ? 'Contact us at'
      : 'Neem contact op via',
    backToShop: locale === 'de'
      ? 'Zurück zum Shop'
      : locale === 'en'
      ? 'Back to shop'
      : 'Terug naar winkel',
  };

  // Auto-lookup if order_id is in URL
  useEffect(() => {
    if (orderIdFromUrl) {
      lookupOrder(orderIdFromUrl);
    }
  }, [orderIdFromUrl]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'expired': return t.statusExpired;
      case 'failed': return t.statusFailed;
      case 'cancelled': return t.statusCancelled;
      case 'pending': return t.statusPending;
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'expired': return 'bg-orange-100 text-orange-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const lookupOrder = async (id?: string) => {
    const orderIdToLookup = id || orderId.trim();

    if (!orderIdToLookup) {
      setError(t.errorNotFound);
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const response = await fetch(`/api/orders/${orderIdToLookup}/retry-payment`);
      const data = await response.json();

      if (data.success && data.order) {
        if (data.order.payment_status === 'paid') {
          setError(t.errorAlreadyPaid);
        } else if (!data.order.can_retry) {
          setError(t.errorCannotRetry);
        } else {
          setOrder(data.order);
        }
      } else {
        setError(t.errorNotFound);
      }
    } catch (err) {
      console.error('Lookup error:', err);
      setError(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleRetryPayment = async () => {
    if (!order) return;

    setRetryLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${order.id}/retry-payment`, {
        method: 'POST',
      });
      const data = await response.json();

      if (data.success && data.payment_url) {
        // Redirect to Mollie payment page
        window.location.href = data.payment_url;
      } else {
        setError(data.error || t.errorGeneric);
        setRetryLoading(false);
      }
    } catch (err) {
      console.error('Retry payment error:', err);
      setError(t.errorGeneric);
      setRetryLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupOrder();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-lumora-green-500/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-lumora-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-lumora-dark mb-2">
            {t.title}
          </h1>
          <p className="text-lumora-dark/70 text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-soft-lg p-6 sm:p-8 border border-lumora-dark/10">
          {/* Order Lookup Form */}
          {!order && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-lumora-dark mb-2">
                  {t.orderIdLabel}
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder={t.orderIdPlaceholder}
                  className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent text-sm"
                  disabled={loading}
                />
                <p className="mt-2 text-sm text-lumora-dark/60">
                  {t.helpText}
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !orderId.trim()}
                className="w-full bg-lumora-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-lumora-green-600 transition-all duration-300 shadow-soft hover:shadow-soft-md disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.searching}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {t.lookupButton}
                  </>
                )}
              </button>
            </form>
          )}

          {/* Order Details & Pay Button */}
          {order && (
            <div className="space-y-6">
              {/* Success Header */}
              <div className="flex items-center gap-3 p-4 bg-lumora-green-500/10 rounded-xl">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-lumora-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-lumora-dark">{t.orderFound}</p>
                  <p className="text-sm text-lumora-dark/70">#{order.id.substring(0, 8).toUpperCase()}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-4 p-5 bg-lumora-cream/30 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-lumora-dark/70">{t.customer}:</span>
                  <span className="font-medium text-lumora-dark">{order.customer_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lumora-dark/70">{t.status}:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.payment_status)}`}>
                    {getStatusLabel(order.payment_status)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-lumora-dark/10">
                  <span className="text-lg font-semibold text-lumora-dark">{t.amount}:</span>
                  <span className="text-2xl font-bold text-lumora-green-500">
                    {formatPrice(parseFloat(order.total_amount))}
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Pay Now Button */}
              <button
                onClick={handleRetryPayment}
                disabled={retryLoading}
                className="w-full bg-lumora-green-500 text-white py-4 rounded-xl font-semibold text-xl hover:bg-lumora-green-600 transition-all duration-300 shadow-soft-md hover:shadow-soft-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {retryLoading ? (
                  <>
                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.processing}
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    💳 {t.payNow}
                  </>
                )}
              </button>

              {/* Security Note */}
              <p className="text-center text-sm text-lumora-dark/60 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t.securePayment}
              </p>

              {/* Look up different order */}
              <button
                onClick={() => {
                  setOrder(null);
                  setOrderId('');
                  setError(null);
                }}
                className="w-full py-3 text-lumora-dark/70 hover:text-lumora-dark font-medium transition-colors"
              >
                {locale === 'de' ? 'Andere Bestellung suchen' : locale === 'en' ? 'Look up a different order' : 'Andere bestelling opzoeken'}
              </button>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-lumora-dark/70 mb-2">{t.needHelp}</p>
          <p className="text-lumora-green-500">
            {t.contactUs}{' '}
            <a href="mailto:info@lumorahorticulture.nl" className="underline hover:text-lumora-green-600">
              info@lumorahorticulture.nl
            </a>
          </p>
        </div>

        {/* Back to Shop */}
        <div className="mt-6 text-center">
          <Link
            href={localizePathForLocale('/shop', locale)}
            className="inline-flex items-center gap-2 text-lumora-dark/60 hover:text-lumora-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t.backToShop}
          </Link>
        </div>
      </div>
    </div>
  );
}
