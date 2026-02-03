/**
 * Volume Discount Configuration
 * Staffelkorting voor B2B verkoop
 */

export interface DiscountTier {
  minQuantity: number;
  maxQuantity: number | null;
  discountPercentage: number;
}

export const VOLUME_DISCOUNT_TIERS: DiscountTier[] = [
  { minQuantity: 1, maxQuantity: 4, discountPercentage: 0 },
  { minQuantity: 5, maxQuantity: 9, discountPercentage: 20 },
  { minQuantity: 10, maxQuantity: 24, discountPercentage: 25 },
  { minQuantity: 25, maxQuantity: 49, discountPercentage: 30 },
  { minQuantity: 50, maxQuantity: null, discountPercentage: 35 }, // 50+ = 35% korting
];

/**
 * Calculate discount percentage for given quantity
 */
export function getDiscountPercentage(quantity: number): number {
  const tier = VOLUME_DISCOUNT_TIERS.find(
    (t) => quantity >= t.minQuantity && (t.maxQuantity === null || quantity <= t.maxQuantity)
  );
  return tier ? tier.discountPercentage : 0;
}

/**
 * Calculate discounted price for a product
 */
export function calculateDiscountedPrice(basePrice: number, quantity: number): number {
  const discountPercentage = getDiscountPercentage(quantity);
  const discountMultiplier = 1 - discountPercentage / 100;
  return basePrice * discountMultiplier;
}

/**
 * Calculate total price with volume discount
 */
export function calculateTotalPrice(basePrice: number, quantity: number): number {
  const discountedPrice = calculateDiscountedPrice(basePrice, quantity);
  return discountedPrice * quantity;
}

/**
 * Get discount information for display
 */
export function getDiscountInfo(quantity: number) {
  const discountPercentage = getDiscountPercentage(quantity);
  const nextTier = VOLUME_DISCOUNT_TIERS.find((t) => t.minQuantity > quantity);

  return {
    currentDiscount: discountPercentage,
    hasDiscount: discountPercentage > 0,
    nextTier: nextTier
      ? {
          quantity: nextTier.minQuantity,
          discount: nextTier.discountPercentage,
        }
      : null,
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}
