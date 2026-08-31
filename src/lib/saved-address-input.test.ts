import assert from 'node:assert/strict';
import test from 'node:test';
import { parseSavedAddressInput } from './saved-address-input';

test('normalises a bounded supported address', () => {
  assert.deepEqual(parseSavedAddressInput({
    name: ' Thuis ',
    street: ' Markt 1 ',
    city: ' Delft ',
    postal_code: ' 2611 AA ',
    country: 'nl',
    phone: ' 0612345678 ',
    is_default: true,
  }), {
    name: 'Thuis',
    street: 'Markt 1',
    city: 'Delft',
    postal_code: '2611 AA',
    country: 'NL',
    phone: '0612345678',
    is_default: true,
  });
});

test('rejects unsupported countries, invalid booleans and oversized fields', () => {
  const base = {
    name: 'Thuis',
    street: 'Markt 1',
    city: 'Delft',
    postal_code: '2611 AA',
    country: 'NL',
  };
  assert.equal(parseSavedAddressInput({ ...base, country: 'US' }), null);
  assert.equal(parseSavedAddressInput({ ...base, is_default: 'yes' }), null);
  assert.equal(parseSavedAddressInput({ ...base, street: 'x'.repeat(201) }), null);
});
