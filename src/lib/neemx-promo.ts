/**
 * NEEMX PRO 2+1 GRATIS promo helpers.
 *
 * The promo is hidden — activated only when a Facebook visitor lands on
 * `/neemxpro-2-plus-1-gratis` and clicks the CTA, which sets the cookie
 * below. Server-side checkout re-validates: cookie + cart-content match.
 */

export const NEEMX_PROMO_COOKIE_NAME = 'lumora_promo';
export const NEEMX_PROMO_CODE = 'NEEMX2PLUS1';
export const NEEMX_PROMO_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const NEEMX_PRODUCT_SLUG_PREFIX = 'neemx-pro';
export const NEEMX_PROMO_MIN_ITEMS = 3;

export interface PromoCartItem {
  slug: string;
  /** Base price per unit in EUR (number, not cents). */
  unitPrice: number;
  quantity: number;
}

export interface PromoResult {
  /** Total discount in EUR to subtract from order total. */
  discount: number;
  /** Slug of the bottle that's free (lowest unit price among NEEMX items). */
  freeItemSlug: string | null;
  /** True when the cart qualifies. */
  eligible: boolean;
}

/**
 * Compute the 2+1 discount for a cart.
 *
 * Eligibility: ≥3 individual NEEMX bottles in cart (sum of quantities for
 * items with slug starting with `neemx-pro`).
 *
 * Discount: the price of the cheapest individual bottle. The customer gets
 * exactly 1 free bottle per order, regardless of how many extra bottles
 * they add beyond 3.
 */
export function calculateNeemxPromoDiscount(items: PromoCartItem[]): PromoResult {
  const neemxItems = items.filter((i) => i.slug.startsWith(NEEMX_PRODUCT_SLUG_PREFIX));
  const totalNeemxBottles = neemxItems.reduce((sum, i) => sum + i.quantity, 0);

  if (totalNeemxBottles < NEEMX_PROMO_MIN_ITEMS) {
    return { discount: 0, freeItemSlug: null, eligible: false };
  }

  let cheapest: PromoCartItem | null = null;
  for (const item of neemxItems) {
    if (item.quantity <= 0) continue;
    if (!cheapest || item.unitPrice < cheapest.unitPrice) {
      cheapest = item;
    }
  }

  if (!cheapest) {
    return { discount: 0, freeItemSlug: null, eligible: false };
  }

  return {
    discount: cheapest.unitPrice,
    freeItemSlug: cheapest.slug,
    eligible: true,
  };
}

/**
 * Check if a cookie value indicates the promo is active.
 * Use exact-match — never trust a substring or prefix.
 */
export function isPromoCookieActive(cookieValue: string | undefined | null): boolean {
  return cookieValue === NEEMX_PROMO_CODE;
}
