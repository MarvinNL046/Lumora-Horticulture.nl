export const PAPERBUS_PROMO_CODE = 'STEKPLUGGEN_3_VOOR_180' as const;
export const PAPERBUS_PROMO_QUANTITY = 3;
export const PAPERBUS_PROMO_PRICE = 180;

const PAPERBUS_PROMO_SLUGS = new Set([
  'paper-plug-tray-84',
  'paper-plug-tray-104',
]);

export function isPaperbusPromoSlug(slug: string): boolean {
  return PAPERBUS_PROMO_SLUGS.has(slug);
}

export type PaperbusPromotion = {
  eligible: boolean;
  bundleCount: number;
  regularTotal: number;
  total: number;
  discount: number;
};

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculatePaperbusPromotion(
  slug: string,
  unitPrice: number,
  quantity: number,
): PaperbusPromotion {
  const safeQuantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 0;
  const regularTotal = roundCurrency(unitPrice * safeQuantity);

  if (!isPaperbusPromoSlug(slug) || safeQuantity < PAPERBUS_PROMO_QUANTITY) {
    return { eligible: false, bundleCount: 0, regularTotal, total: regularTotal, discount: 0 };
  }

  const bundleCount = Math.floor(safeQuantity / PAPERBUS_PROMO_QUANTITY);
  const remainder = safeQuantity % PAPERBUS_PROMO_QUANTITY;
  const actionTotal = roundCurrency(
    bundleCount * PAPERBUS_PROMO_PRICE + remainder * unitPrice,
  );
  const total = Math.min(regularTotal, actionTotal);
  const discount = roundCurrency(regularTotal - total);

  return {
    eligible: discount > 0,
    bundleCount,
    regularTotal,
    total,
    discount,
  };
}

