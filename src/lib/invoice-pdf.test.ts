import assert from 'node:assert/strict'
import { test } from 'node:test'
import { PDFDocument } from 'pdf-lib'
import { createInvoicePdf, invoiceCopy, resolveInvoiceLocale } from './invoice-pdf'

const order = {
  _id: 'order123456',
  order_number: 'ORD-2026-0005',
  customer_email: 'test@example.com',
  customer_name: 'Test Customer',
  shipping_address: { street: 'Teststraat 1', postal_code: '1234 AB', city: 'Amsterdam', country: 'DE' },
  total_amount: 84,
  created_at: Date.UTC(2026, 8, 2, 10, 0, 0),
}

test('invoice locale falls back to Dutch for unknown languages', () => {
  assert.equal(resolveInvoiceLocale('en'), 'en')
  assert.equal(resolveInvoiceLocale('de'), 'de')
  assert.equal(resolveInvoiceLocale('fr'), 'nl')
  assert.equal(resolveInvoiceLocale(undefined), 'nl')
})

test('every invoice locale has a complete, distinct label set', () => {
  const keys = Object.keys(invoiceCopy.nl)
  for (const locale of ['en', 'de'] as const) {
    assert.deepEqual(Object.keys(invoiceCopy[locale]), keys)
    assert.notEqual(invoiceCopy[locale].title, invoiceCopy.nl.title)
  }
})

test('the PDF metadata follows the order language', async () => {
  for (const [locale, title, subject] of [['nl', 'Factuur', 'Aankoopfactuur'], ['en', 'Invoice', 'Purchase invoice'], ['de', 'Rechnung', 'Kaufrechnung']] as const) {
    const bytes = await createInvoicePdf({ ...order, locale }, [{ quantity: 1, price_at_purchase: 84, product_name: 'Paper Plug Tray 84' }])
    const document = await PDFDocument.load(bytes)
    assert.equal(document.getTitle(), `${title} ORD-2026-0005`)
    assert.equal(document.getSubject(), subject)
  }
})
