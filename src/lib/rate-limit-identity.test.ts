import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getTrustedClientAddress, hashRateLimitIdentity } from './rate-limit-identity'

describe('distributed rate-limit identity', () => {
  it('prefers the Vercel-supplied address and normalises supported forms', () => {
    const headers = new Headers({
      'x-vercel-forwarded-for': '203.0.113.7, 198.51.100.2',
      'x-forwarded-for': '192.0.2.1',
    })
    assert.equal(getTrustedClientAddress(headers), '203.0.113.7')

    assert.equal(
      getTrustedClientAddress(new Headers({ 'x-real-ip': '[2001:db8::1]:443' })),
      '2001:db8::1',
    )
    assert.equal(
      getTrustedClientAddress(new Headers({ 'x-real-ip': '203.0.113.9:8443' })),
      '203.0.113.9',
    )
  })

  it('rejects malformed addresses instead of creating a shared bucket', () => {
    assert.equal(getTrustedClientAddress(new Headers()), null)
    assert.equal(
      getTrustedClientAddress(new Headers({ 'x-forwarded-for': 'attacker.example' })),
      null,
    )
  })

  it('creates stable route-bound HMAC keys without exposing the address', () => {
    const secret = 's'.repeat(32)
    const first = hashRateLimitIdentity('checkout', '203.0.113.7', secret)
    const repeated = hashRateLimitIdentity('checkout', '203.0.113.7', secret)
    const otherRoute = hashRateLimitIdentity('cart-save', '203.0.113.7', secret)

    assert.match(first, /^[a-f0-9]{64}$/)
    assert.equal(first, repeated)
    assert.notEqual(first, otherRoute)
    assert.equal(first.includes('203.0.113.7'), false)
  })
})
