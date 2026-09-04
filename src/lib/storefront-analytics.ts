import type { CartItem } from '@/contexts/CartContext'
import { calculateCartItemTotal } from './cart-pricing'
import { trackAddToCart, trackBeginCheckout, type Product } from './google-ads'

export type AnalyticsCartItem = Pick<CartItem, 'product_id' | 'slug' | 'name' | 'price' | 'quantity'>

export function analyticsCartProduct(item: AnalyticsCartItem): Product {
  const totalValue = Math.round(calculateCartItemTotal(item.slug, item.price, item.quantity) * 100) / 100
  return {
    id: item.product_id,
    name: item.name,
    price: Math.round(totalValue / item.quantity * 1_000_000) / 1_000_000,
    quantity: item.quantity,
    totalValue,
    category: item.slug.startsWith('paper-plug') ? 'Stekpluggen' : 'NeemXPRO',
  }
}

// Tracking must never interrupt a successful cart update or checkout rendering.
export function trackStorefrontCartAddition(item: AnalyticsCartItem) {
  try { trackAddToCart(analyticsCartProduct(item)) }
  catch { console.warn('Cart analytics unavailable') }
}

export function trackStorefrontCheckout(items: AnalyticsCartItem[]) {
  if (!items.length) return
  try {
    const products = items.map(analyticsCartProduct)
    const total = Math.round(products.reduce((sum, product) => sum + product.totalValue!, 0) * 100) / 100
    trackBeginCheckout(products, total)
  } catch { console.warn('Checkout analytics unavailable') }
}

const productRequests = new Map<string, Promise<{ id: string; price: number } | null>>()

// Resolve the catalog ID used by the Meta feed, without blocking page rendering.
// Shared requests also avoid duplicate fetches during React effect replay.
export function loadAnalyticsProduct(slug: string) {
  let request = productRequests.get(slug)
  if (!request) {
    request = fetch(`/api/products/slug/${encodeURIComponent(slug)}?locale=nl`)
      .then(async response => {
        if (!response.ok) return null
        const data = await response.json()
        const product = data.product
        return data.success && typeof product?.id === 'string' &&
          typeof product.price === 'number' && Number.isFinite(product.price)
          ? { id: product.id as string, price: product.price as number } : null
      }).catch(() => null)
    productRequests.set(slug, request)
  }
  return request
}
