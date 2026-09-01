import { calculatePaperbusPromotion } from './paperbus-promo';
import { calculateTotalPrice } from './volume-discount';

export function calculateCartItemTotal(
  slug: string,
  unitPrice: number,
  quantity: number,
): number {
  const paperbusPromotion = calculatePaperbusPromotion(slug, unitPrice, quantity);
  if (paperbusPromotion.eligible) return paperbusPromotion.total;
  if (slug.startsWith('neemx-pro')) return calculateTotalPrice(unitPrice, quantity);
  return Math.round(unitPrice * quantity * 100) / 100;
}

