import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getAvailableProductLocales,
  hasProductLocale,
} from './product-locales'

test('only exposes Dutch when product translations are missing', () => {
  const product = {}

  assert.deepEqual(getAvailableProductLocales(product), ['nl'])
  assert.equal(hasProductLocale(product, 'nl'), true)
  assert.equal(hasProductLocale(product, 'en'), false)
  assert.equal(hasProductLocale(product, 'de'), false)
})

test('requires both translated product name and description', () => {
  const product = {
    name_en: 'Paper plugs',
    description_en: '   ',
    name_de: 'Papiertopf-Plugs',
    description_de: 'Professionelle Anzuchtlösung',
  }

  assert.deepEqual(getAvailableProductLocales(product), ['nl', 'de'])
})

test('exposes every locale when translations are complete', () => {
  const product = {
    name_en: 'Paper plugs',
    description_en: 'Professional propagation solution',
    name_de: 'Papiertopf-Plugs',
    description_de: 'Professionelle Anzuchtlösung',
  }

  assert.deepEqual(getAvailableProductLocales(product), ['nl', 'en', 'de'])
})
