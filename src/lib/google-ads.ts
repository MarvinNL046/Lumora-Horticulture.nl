/**
 * Google Ads Conversion Tracking & Google Analytics 4 Utilities
 *
 * Deze functies sturen conversie events naar Google Ads en GA4 voor het meten van aankopen en gebruikersgedrag.
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

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
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
    send_to: 'AW-17631948540/oL8KCMO5-6kbEPzdyNdB',
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
 * Track product view in GA4
 *
 * @param product - Product informatie
 */
export function trackViewItem(product: Product) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'view_item', {
    currency: 'EUR',
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category || 'Horticulture Products',
        quantity: 1,
      },
    ],
  });

  console.log('Product view tracked:', product.name);
}

/**
 * Track begin checkout in GA4
 *
 * @param products - Array van producten in checkout
 * @param totalValue - Totale waarde van checkout
 */
export function trackBeginCheckout(products: Product[], totalValue: number) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'begin_checkout', {
    currency: 'EUR',
    value: totalValue,
    items: products.map((product) => ({
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity: product.quantity || 1,
      item_category: product.category || 'Horticulture Products',
    })),
  });

  console.log('Begin checkout tracked:', { products, totalValue });
}

/**
 * Track add to cart in GA4 (voor toekomstig gebruik)
 *
 * @param product - Product informatie
 */
export function trackAddToCart(product: Product) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'add_to_cart', {
    currency: 'EUR',
    value: product.price * (product.quantity || 1),
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity || 1,
        item_category: product.category || 'Horticulture Products',
      },
    ],
  });

  console.log('Add to cart tracked:', product.name);
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
