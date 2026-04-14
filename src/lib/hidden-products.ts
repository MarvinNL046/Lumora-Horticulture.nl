// Product slugs that should NOT be sold individually via the shop.
// These products remain in the database for SEO content pages,
// but are excluded from shop listings, detail pages, and checkout.
export const HIDDEN_PRODUCT_SLUGS: ReadonlySet<string> = new Set([
  'paper-plug-tray-84',
  'paper-plug-tray-104',
]);

export function isHiddenProductSlug(slug: string | undefined | null): boolean {
  return !!slug && HIDDEN_PRODUCT_SLUGS.has(slug);
}
