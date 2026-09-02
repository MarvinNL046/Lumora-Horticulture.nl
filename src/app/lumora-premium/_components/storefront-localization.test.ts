import assert from 'node:assert/strict'
import test from 'node:test'

import { publicStorefrontRoutes } from '../_data/routes'
import {
  getStorefrontLanguageHref,
  localizeStorefrontRoutes,
} from './storefront-localization'

test('keeps the selected language throughout the standalone auth flow', () => {
  assert.equal(
    getStorefrontLanguageHref('/handler/sign-in', 'nl', 'en'),
    '/handler/sign-in?lang=en',
  )
  assert.equal(
    getStorefrontLanguageHref('/handler/sign-up', 'en', 'de'),
    '/handler/sign-up?lang=de',
  )
})

test('links account and storefront routes to their localized public paths', () => {
  assert.equal(getStorefrontLanguageHref('/account', 'nl', 'de'), '/de/account')
  assert.equal(getStorefrontLanguageHref('/en/account/orders', 'en', 'nl'), '/account/orders')

  const germanRoutes = localizeStorefrontRoutes(publicStorefrontRoutes, 'de')
  assert.equal(germanRoutes.home, '/de')
  assert.equal(germanRoutes.products, '/de/produkte')
  assert.equal(germanRoutes.cart, '/de/winkelmand')
})
