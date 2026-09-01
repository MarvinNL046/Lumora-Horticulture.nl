import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  getStorefrontRoutes,
  isPreviewStorefrontPath,
  previewStorefrontRoutes,
  publicStorefrontRoutes,
  publicStorefrontPathSet,
} from './routes'

describe('storefront routes', () => {
  it('uses isolated preview links below /lumora-premium', () => {
    assert.equal(isPreviewStorefrontPath('/lumora-premium'), true)
    assert.equal(isPreviewStorefrontPath('/lumora-premium/paperbus'), true)
    assert.deepEqual(
      getStorefrontRoutes('/lumora-premium/winkelmand'),
      previewStorefrontRoutes,
    )
  })

  it('uses canonical Dutch links on public storefront pages', () => {
    assert.equal(isPreviewStorefrontPath('/producten'), false)
    assert.deepEqual(getStorefrontRoutes('/stekpluggen-steenwol'), publicStorefrontRoutes)

    for (const route of Object.values(publicStorefrontRoutes)) {
      assert.equal(publicStorefrontPathSet.has(route), true)
    }
  })
})
