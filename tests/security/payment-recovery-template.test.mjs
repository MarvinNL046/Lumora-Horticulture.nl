import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url));

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === '@/lib/volume-discount') {
      return {
        shortCircuit: true,
        url: pathToFileURL(path.join(repositoryRoot, 'src/lib/volume-discount.ts')).href,
      };
    }
    return nextResolve(specifier, context);
  },
});

const { getPaymentRecoveryEmailContent } = await import(
  '../../src/emails/payment-recovery-template.ts'
);

const validProps = {
  customerName: 'Marvin',
  orderId: 'order123456',
  orderItems: [{
    name: 'Paperbus Pluggen',
    quantity: 2,
    price: 10,
    image_url: '/productAfbeeldingen/paperbus.jpg',
  }],
  totalAmount: 20,
  locale: 'nl',
  paymentUrl: 'https://www.mollie.com/checkout/select-method/test',
  retryPageUrl: 'https://lumorahorticulture.nl/checkout/retry#token=abc_123',
};

test('escapes names and order identifiers in payment-recovery HTML', () => {
  const attack = `<img src=x onerror="alert('xss')">`;
  const { html } = getPaymentRecoveryEmailContent({
    ...validProps,
    customerName: attack,
    orderId: attack,
    orderItems: [{ ...validProps.orderItems[0], name: attack }],
  });

  assert.doesNotMatch(html, /<img src=x onerror=/i);
  assert.doesNotMatch(html, /alert\('xss'\)/);
  assert.match(html, /&lt;img src=x onerror=&quot;/);
});

test('allows only trusted HTTPS URLs in payment, retry and image attributes', () => {
  const unsafe = 'https://attacker.example/collect?secret=1';
  const { html } = getPaymentRecoveryEmailContent({
    ...validProps,
    paymentUrl: unsafe,
    retryPageUrl: 'javascript:alert(1)',
    orderItems: [{ ...validProps.orderItems[0], image_url: unsafe }],
  });

  assert.equal(html.includes(unsafe), false);
  assert.match(html, /<a href=""/);
  assert.doesNotMatch(html, /<img[^>]+attacker\.example/);
});

test('preserves a trusted fragment retry capability without locale injection', () => {
  const localeAttack = `"><script>alert(1)</script>`;
  const { html, subject } = getPaymentRecoveryEmailContent({
    ...validProps,
    locale: localeAttack,
    paymentUrl: validProps.retryPageUrl,
  });

  assert.match(html, /<html lang="nl">/);
  assert.match(html, /checkout\/retry#token=abc_123/);
  assert.equal(html.includes(localeAttack), false);
  assert.equal(subject, 'Je bestelling wacht nog op betaling 💳');
});

test('drops invalid item numbers and never renders non-finite totals', () => {
  const { html } = getPaymentRecoveryEmailContent({
    ...validProps,
    totalAmount: Number.POSITIVE_INFINITY,
    orderItems: [
      validProps.orderItems[0],
      { ...validProps.orderItems[0], name: 'Invalid', quantity: 1.5 },
      { ...validProps.orderItems[0], name: 'NaN', price: Number.NaN },
    ],
  });

  assert.match(html, /Paperbus Pluggen/);
  assert.equal(html.includes('Invalid'), false);
  assert.doesNotMatch(html, /Infinity|NaN/);
});
