// Product slugs that should NOT be sold individually via the shop.
// Keep empty unless a product truly needs to be hidden from shop while
// still being referenced by SEO content pages.
export const HIDDEN_PRODUCT_SLUGS: ReadonlySet<string> = new Set<string>();

export function isHiddenProductSlug(slug: string | undefined | null): boolean {
  return !!slug && HIDDEN_PRODUCT_SLUGS.has(slug);
}
