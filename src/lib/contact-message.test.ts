import assert from 'node:assert/strict'
import { it } from 'node:test'
import { parseContactMessage } from './contact-message'

const valid = { name: ' Jan ', email: 'jan@example.com', message: ' Productvraag ' }
it('accepts a contact message, trims fields and allows optional company and phone', () => {
  assert.deepEqual(parseContactMessage(valid), { name: 'Jan', email: valid.email, message: 'Productvraag', company: '', phone: '' })
  assert.equal(parseContactMessage({ ...valid, phone: '+31 6 12345678' })?.phone, '+31 6 12345678')
})
it('rejects missing fields, invalid email, header injection and oversized messages', () => {
  for (const input of [null, [], {}, { ...valid, name: ' ' }, { ...valid, email: 'invalid' }, { ...valid, email: 'a@example.com\r\nBcc:x@y.com' }, { ...valid, name: 'Jan\nBcc: x@y.com' }, { ...valid, message: 'x'.repeat(5001) }, { ...valid, phone: 123 }]) {
    assert.equal(parseContactMessage(input), null)
  }
})
