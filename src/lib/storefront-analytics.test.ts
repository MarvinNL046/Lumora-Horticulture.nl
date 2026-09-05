import assert from 'node:assert/strict'
import test from 'node:test'
import { analyticsCartProduct, loadAnalyticsProduct, trackStorefrontCartAddition, trackStorefrontCheckout } from './storefront-analytics'

test('analytics values match promotion and volume-discount totals', () => {
  const base = { product_id: 'catalog104', slug: 'paper-plug-tray-104', name: '104', price: 80 }
  for (const [quantity, total] of [[1, 80], [3, 180], [4, 260], [7, 440]]) {
    const product = analyticsCartProduct({ ...base, quantity })
    assert.equal(product.totalValue, total)
    assert.equal(Math.round(product.price * quantity * 100), total * 100)
    assert.equal(product.id, 'catalog104')
  }
  const neem = analyticsCartProduct({ product_id: 'catalogNeem', slug: 'neemx-pro-10ml',
    name: 'NeemXPRO', price: 9.95, quantity: 5 })
  assert.equal(neem.price, 7.96)
  assert.equal(neem.totalValue, 39.8)
})

test('new storefront events reach both queues with cart totals and catalog IDs, without customer data', () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'window')
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { location: { pathname: '/afrekenen' } } })
  try {
    const item = { product_id: 'catalog104', slug: 'paper-plug-tray-104', name: '104', price: 80, quantity: 3 }
    trackStorefrontCartAddition(item)
    trackStorefrontCheckout([item])
    const events = window.dataLayer!.map(value => Array.from(value)).filter(value => value[0] === 'event')
    assert.deepEqual(events.map(event => event[1]), ['add_to_cart', 'begin_checkout'])
    for (const event of events) {
      const payload = event[2] as { value: number; items: { item_id: string; price: number; quantity: number }[] }
      assert.equal(payload.value, 180)
      assert.equal(payload.items[0].item_id, 'catalog104')
      assert.equal(payload.items[0].price, 60)
      assert.equal(payload.items[0].quantity, 3)
    }
    const pixelEvents = window._fbq!.queue.filter(event => ['AddToCart', 'InitiateCheckout'].includes(event[1] as string))
    assert.equal(pixelEvents.length, 2)
    for (const event of pixelEvents) assert.equal((event[2] as { value: number }).value, 180)
    const before = window.dataLayer!.length
    trackStorefrontCheckout([])
    assert.equal(window.dataLayer!.length, before)
    assert.doesNotMatch(JSON.stringify(events), /email|phone|address|firstName|lastName/)
    window.gtag = () => { throw new Error('Simulated unavailable SDK') }
    assert.doesNotThrow(() => trackStorefrontCartAddition(item))
    assert.doesNotThrow(() => trackStorefrontCheckout([item]))
  } finally {
    if (previous) Object.defineProperty(globalThis, 'window', previous)
    else Reflect.deleteProperty(globalThis, 'window')
  }
})

test('product lookup reuses one request and tolerates a catalog outage', async () => {
  const original = globalThis.fetch
  let calls = 0
  globalThis.fetch = async () => {
    calls++
    return new Response(JSON.stringify({ success: true, product: { id: 'catalog84', price: 84 } }))
  }
  try {
    const [first, second] = await Promise.all([loadAnalyticsProduct('test-84'), loadAnalyticsProduct('test-84')])
    assert.equal(calls, 1)
    assert.deepEqual(first, { id: 'catalog84', price: 84 })
    assert.deepEqual(second, first)
    globalThis.fetch = async () => { throw new Error('Offline') }
    assert.equal(await loadAnalyticsProduct('test-offline'), null)
  } finally { globalThis.fetch = original }
})
