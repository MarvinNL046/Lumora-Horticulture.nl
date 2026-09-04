import assert from 'node:assert/strict'
import test from 'node:test'
import { paperbus } from '@/app/lumora-premium/_data/products'
import { getLocalizedProducts } from '@/app/lumora-premium/_data/storefront-content'
import { productGroupSchema, resolveProductVariant } from './storefront-product-seo'

test('shared variant URLs select the requested size and safely handle unknown values', () => {
  assert.equal(resolveProductVariant(paperbus, 'tray-104').cellsPerTray, 104)
  for (const value of [undefined, null, '', 'unknown', ['tray-104']]) {
    assert.equal(resolveProductVariant(paperbus, value).cellsPerTray, 84)
  }
})

test('all localized product variants have usable images, unique URLs and matching catalog prices', () => {
  for (const locale of ['nl', 'en', 'de'] as const) {
    for (const product of Object.values(getLocalizedProducts(locale))) {
      const schema = productGroupSchema(product, locale)
      const prefix = locale === 'nl' ? '/' : `/${locale}/`
      assert.ok(new URL(schema.url).pathname.startsWith(prefix))
      assert.equal(new Set(schema.hasVariant.map(v => v.url)).size, product.variants.length)
      for (const variant of schema.hasVariant) {
        const selected = resolveProductVariant(product, new URL(variant.url).searchParams.get('variant'))
        assert.equal(variant.sku, selected.slug)
        assert.equal(variant.offers.price, selected.price.toFixed(2))
        assert.equal(variant.offers.url, variant.url)
        assert.ok(variant.image.length > 0)
        assert.ok(variant.image.every(url => url.startsWith('https://lumorahorticulture.nl/')))
        assert.ok(variant.description.length > 0)
        assert.equal('availability' in variant.offers, false)
      }
    }
  }
})
