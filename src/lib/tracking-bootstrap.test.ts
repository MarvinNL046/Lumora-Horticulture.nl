import assert from 'node:assert/strict'
import test from 'node:test'
import { initializeGoogleTracking, initializeMetaTracking } from './tracking-bootstrap'
import { trackAddToCart, trackPurchase } from './google-ads'

function browser(pathname = '/stekpluggen-steenwol') {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'window')
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { location: { pathname } } })
  return () => {
    if (previous) Object.defineProperty(globalThis, 'window', previous)
    else Reflect.deleteProperty(globalThis, 'window')
  }
}

test('an early cart event queues for both providers before SDK loading, without duplicate initialization', () => {
  const restore = browser()
  try {
    trackAddToCart({ id: 'tray-104', name: '104', price: 80, quantity: 2 })
    initializeGoogleTracking()
    initializeMetaTracking()
    const google = window.dataLayer!.map(value => Array.from(value))
    assert.deepEqual(google.filter(value => value[0] === 'config'), [
      ['config', 'GT-P8Q289LQ'], ['config', 'G-KBWMQY1NRL'],
    ])
    assert.equal(google.filter(value => value[1] === 'add_to_cart').length, 1)
    assert.equal((google.at(-1)![2] as { value: number }).value, 160)
    assert.deepEqual(window._fbq!.queue.slice(0, 3), [
      ['init', '1537235201740065'], ['init', '2680887955624246'], ['track', 'PageView'],
    ])
    assert.equal(window._fbq!.queue.length, 4)
    assert.equal(window._fbq!.queue[3][1], 'AddToCart')
    assert.equal((window._fbq!.queue[3][2] as { value: number }).value, 160)
  } finally { restore() }
})

test('queued pixel hands later calls to its loaded SDK and retains purchase deduplication IDs', () => {
  const restore = browser()
  try {
    initializeMetaTracking()
    const delivered: unknown[][] = []
    window._fbq!.callMethod = (...args) => { delivered.push(args) }
    trackPurchase('test-order', 180, 'test-payment')
    assert.equal(delivered.length, 1)
    assert.equal(delivered[0][1], 'Purchase')
    assert.deepEqual(delivered[0][3], { eventID: 'purchase_test-order' })
    const google = window.dataLayer!.map(value => Array.from(value))
    const conversion = google.find(value => value[1] === 'conversion')!
    assert.deepEqual(conversion[2], {
      send_to: 'AW-17631948540/oL8KCMO5-6kbEPzdyNdB', value: 180,
      currency: 'EUR', transaction_id: 'test-payment',
    })
  } finally { restore() }
})

test('capability-bearing checkout routes do not initialize or queue tracking', () => {
  for (const path of ['/checkout/success', '/en/checkout/retry', '/de/checkout']) {
    const restore = browser(path)
    try {
      initializeGoogleTracking()
      initializeMetaTracking()
      trackPurchase('test-order', 180)
      assert.equal(window.dataLayer, undefined)
      assert.equal(window.fbq, undefined)
    } finally { restore() }
  }
})
