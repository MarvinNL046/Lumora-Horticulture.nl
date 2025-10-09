/**
 * Google Ads Conversion Tracking Utilities
 *
 * Deze functies sturen conversie events naar Google Ads voor het meten van aankopen.
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      params?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Stuur een purchase conversie event naar Google Ads
 *
 * @param orderId - Uniek order nummer
 * @param value - Totaal bedrag van de aankoop (in EUR)
 * @param transactionId - Mollie payment ID (optioneel)
 */
export function trackPurchase(
  orderId: string,
  value: number,
  transactionId?: string
) {
  // Check of gtag beschikbaar is
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('gtag not available for conversion tracking');
    return;
  }

  // Stuur conversie event naar Google Ads
  window.gtag('event', 'conversion', {
    send_to: 'AW-17631948540/YOUR_CONVERSION_LABEL', // Je moet dit nog aanvullen met je conversion label
    value: value,
    currency: 'EUR',
    transaction_id: transactionId || orderId,
  });

  // Stuur ook een standaard purchase event voor Google Analytics (indien aanwezig)
  window.gtag('event', 'purchase', {
    transaction_id: transactionId || orderId,
    value: value,
    currency: 'EUR',
    items: [
      {
        item_name: `Order ${orderId}`,
      },
    ],
  });

  console.log('Purchase conversion tracked:', {
    orderId,
    value,
    transactionId,
  });
}

/**
 * Server-side conversie tracking helper
 * Voor gebruik in API routes (bijvoorbeeld Mollie webhook)
 *
 * Dit gebruikt de Google Ads API en vereist een API key setup.
 * Voor de meeste use cases is client-side tracking voldoende.
 */
export async function trackServerSideConversion(
  orderId: string,
  value: number,
  transactionId: string,
  customerEmail?: string
) {
  // Dit is een placeholder voor server-side conversie tracking
  // In de praktijk zou je hier de Google Ads API gebruiken
  // Voor nu loggen we alleen
  console.log('Server-side conversion would be tracked:', {
    orderId,
    value,
    transactionId,
    customerEmail,
  });

  // TODO: Implementeer Google Ads API conversie tracking indien nodig
  // Zie: https://developers.google.com/google-ads/api/docs/conversions/upload-clicks
}
