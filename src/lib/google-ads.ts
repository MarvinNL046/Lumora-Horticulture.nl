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
    fbq?: (...args: any[]) => void;
  }
}

// Meta Pixel: fbq('track', ...) fires on all initialized pixels automatically.
// When eventId is provided it is passed as the 4th arg so Meta can deduplicate
// this event against the matching server-side Conversions API event.
function fbqTrack(event: string, params?: Record<string, any>, eventId?: string) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  try {
    if (eventId) {
      window.fbq('track', event, params ?? {}, { eventID: eventId });
    } else if (params) {
      window.fbq('track', event, params);
    } else {
      window.fbq('track', event);
    }
  } catch (err) {
    console.warn('fbq track failed:', err);
  }
}

// Read Meta's fbp/fbc cookies from document.cookie for CAPI match quality.
function readFbCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === 'undefined') return {};
  const out: { fbp?: string; fbc?: string } = {};
  for (const raw of document.cookie.split('; ')) {
    const idx = raw.indexOf('=');
    if (idx <= 0) continue;
    const key = raw.slice(0, idx);
    const val = decodeURIComponent(raw.slice(idx + 1));
    if (key === '_fbp') out.fbp = val;
    else if (key === '_fbc') out.fbc = val;
  }
  return out;
}

// Mirror a client-side Meta Pixel event to the server-side Conversions API so
// iOS/Safari/ad-blocker users are still counted. Uses the same event_id as the
// pixel call so Meta deduplicates the two events. Non-blocking, fire-and-forget.
function sendCapiMirror(
  eventName: 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Lead' | 'CompleteRegistration' | 'Subscribe',
  eventId: string,
  customData: Record<string, unknown>,
  extraUserData?: Record<string, string>,
) {
  if (typeof window === 'undefined') return;
  const { fbp, fbc } = readFbCookies();
  const userData: Record<string, string> = { ...(extraUserData || {}) };
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  try {
    fetch('/api/track/meta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName,
        eventId,
        customData,
        userData,
        eventSourceUrl: window.location.href,
      }),
      keepalive: true,
    }).catch((err) => console.warn('CAPI mirror failed:', err));
  } catch (err) {
    console.warn('CAPI mirror throw:', err);
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

  fbqTrack(
    'Purchase',
    {
      value,
      currency: 'EUR',
      content_type: 'product',
      order_id: orderId,
      transaction_id: transactionId || orderId,
    },
    // event_id must match the server-side CAPI event for deduplication.
    // CAPI uses `purchase_${order._id}` — conversion page passes order_id as orderId.
    `purchase_${orderId}`
  );

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

  const eventId = `vc_${product.id}_${Date.now()}`;
  const viewData = {
    content_type: 'product',
    content_ids: [product.id],
    content_name: product.name,
    content_category: product.category || 'Horticulture Products',
    value: product.price,
    currency: 'EUR',
  };

  fbqTrack('ViewContent', viewData, eventId);
  sendCapiMirror('ViewContent', eventId, viewData);

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

  const eventId = `ic_${Date.now()}_${products.map((p) => p.id).join('-').slice(0, 40)}`;
  const checkoutData = {
    content_type: 'product',
    content_ids: products.map((p) => p.id),
    contents: products.map((p) => ({
      id: p.id,
      quantity: p.quantity || 1,
      item_price: p.price,
    })),
    num_items: products.reduce((sum, p) => sum + (p.quantity || 1), 0),
    value: totalValue,
    currency: 'EUR',
  };

  fbqTrack('InitiateCheckout', checkoutData, eventId);
  sendCapiMirror('InitiateCheckout', eventId, checkoutData);

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

  const qty = product.quantity || 1;
  const eventId = `atc_${product.id}_${qty}_${Date.now()}`;
  const atcData = {
    content_type: 'product',
    content_ids: [product.id],
    content_name: product.name,
    content_category: product.category || 'Horticulture Products',
    contents: [{ id: product.id, quantity: qty, item_price: product.price }],
    value: product.price * qty,
    currency: 'EUR',
  };

  fbqTrack('AddToCart', atcData, eventId);
  sendCapiMirror('AddToCart', eventId, atcData);

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
