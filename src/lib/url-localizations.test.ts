import assert from 'node:assert/strict'
import test from 'node:test'
import {
  basePathFromLocalizedPath,
  localizePathForLocale,
} from './url-localizations'

test('builds canonical locale paths on the .nl host', () => {
  assert.equal(localizePathForLocale('/', 'nl'), '/')
  assert.equal(localizePathForLocale('/', 'en'), '/en')
  assert.equal(localizePathForLocale('/', 'de'), '/de')
  assert.equal(localizePathForLocale('/products', 'nl'), '/producten')
  assert.equal(localizePathForLocale('/products', 'en'), '/en/products')
  assert.equal(localizePathForLocale('/products', 'de'), '/de/produkte')
})

test('keeps localized SEO paths while adding the language prefix', () => {
  assert.equal(localizePathForLocale('/paperbus-pluggen', 'en'), '/en/paper-pot-plugs')
  assert.equal(localizePathForLocale('/paperbus-pluggen', 'de'), '/de/papiertopf-stecker')
  assert.equal(
    localizePathForLocale('/paperbus-steenwol-pluggen', 'en'),
    '/en/paper-pot-rockwool-plugs',
  )
  assert.equal(
    localizePathForLocale('/paperbus-steenwol-pluggen', 'de'),
    '/de/papiertopf-steinwollstecker',
  )
  assert.equal(
    localizePathForLocale('/products/ellepot-fp12', 'nl'),
    '/producten/ellepot-fp12',
  )
})

test('localizes nested article routes without inventing translated leaf slugs', () => {
  assert.equal(
    localizePathForLocale('/efficiëntie-roi/roi-berekenen', 'en'),
    '/en/efficiency-roi/roi-berekenen',
  )
  assert.equal(
    localizePathForLocale('/efficiëntie-roi/arbeidsbesparing-40-procent', 'de'),
    '/de/effizienz-roi/arbeidsbesparing-40-procent',
  )
  assert.equal(
    localizePathForLocale('/propagatie-technologie/fp-12-technologie', 'en'),
    '/en/propagation-technology/fp-12-technologie',
  )
  assert.equal(
    localizePathForLocale('/praktische-toepassingen/paper-plugs-sierplanten', 'de'),
    '/de/praktische-anwendungen/paper-plugs-sierplanten',
  )
})

test('converts visible locale paths back to internal app routes', () => {
  assert.equal(basePathFromLocalizedPath('/producten', 'nl'), '/products')
  assert.equal(basePathFromLocalizedPath('/de/produkte/ellepot-fp12', 'de'), '/products/ellepot-fp12')
  assert.equal(basePathFromLocalizedPath('/en/paper-pot-plugs', 'en'), '/paperbus-pluggen')
  assert.equal(
    basePathFromLocalizedPath('/en/paper-pot-rockwool-plugs', 'en'),
    '/paperbus-steenwol-pluggen',
  )
  assert.equal(
    basePathFromLocalizedPath('/de/papiertopf-steinwollstecker', 'de'),
    '/paperbus-steenwol-pluggen',
  )
})

test('uses the translated legal pages as the canonical legal routes', () => {
  assert.equal(localizePathForLocale('/privacy', 'nl'), '/privacybeleid')
  assert.equal(localizePathForLocale('/privacy', 'en'), '/en/privacy-policy')
  assert.equal(localizePathForLocale('/privacy', 'de'), '/de/datenschutz')
  assert.equal(localizePathForLocale('/terms', 'nl'), '/algemene-voorwaarden')
  assert.equal(basePathFromLocalizedPath('/de/datenschutz', 'de'), '/privacy')
})
