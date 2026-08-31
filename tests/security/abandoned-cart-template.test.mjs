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

const { getAbandonedCartEmailContent } = await import(
  '../../src/emails/abandoned-cart-template.ts'
);

const validItem = {
  product_id: 'product1',
  slug: 'paperbus-pluggen',
  name: 'Paperbus Pluggen',
  price: 10,
  quantity: 1,
  image_url: '/productAfbeeldingen/paperbus.jpg',
};

test('escapes customer and product text in abandoned-cart email HTML', () => {
  const attack = `<img src=x onerror="alert('xss')"> & \"quoted\"`;
  const { html } = getAbandonedCartEmailContent({
    customerName: attack,
    cartItems: [{ ...validItem, name: attack }],
    totalAmount: 10,
    locale: 'nl',
    checkoutUrl: 'https://lumorahorticulture.nl/checkout?cart=a&source=email',
  });

  assert.doesNotMatch(html, /<img src=x onerror=/i);
  assert.doesNotMatch(html, /alert\('xss'\)/);
  assert.match(html, /&lt;img src=x onerror=&quot;alert\(&#039;xss&#039;\)&quot;&gt;/);
  assert.match(html, /cart=a&amp;source=email/);
});

test('rejects executable, insecure and credential-bearing URL attributes', () => {
  const unsafeUrls = [
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'http://images.example.test/plaintext.jpg',
    'https://user:password@images.example.test/private.jpg',
    'https://attacker.example/tracking-pixel.gif',
  ];

  for (const unsafeUrl of unsafeUrls) {
    const { html } = getAbandonedCartEmailContent({
      cartItems: [{ ...validItem, image_url: unsafeUrl }],
      totalAmount: 10,
      locale: 'nl',
      checkoutUrl: unsafeUrl,
    });

    assert.match(html, /<img src=""/);
    assert.match(html, /<a href=""/);
    assert.equal(html.includes(unsafeUrl), false);
  }
});

test('resolves trusted relative catalog images to an absolute Lumora HTTPS URL', () => {
  const { html } = getAbandonedCartEmailContent({
    cartItems: [validItem],
    totalAmount: 10,
    locale: 'nl',
    checkoutUrl: 'https://lumorahorticulture.nl/checkout',
  });

  assert.match(
    html,
    /src="https:\/\/lumorahorticulture\.nl\/productAfbeeldingen\/paperbus\.jpg"/,
  );
});

test('allowlists locale before using it in an HTML attribute', () => {
  const localeAttack = `\"><img src=x onerror=alert(1)>`;
  const { subject, html } = getAbandonedCartEmailContent({
    cartItems: [validItem],
    totalAmount: 10,
    locale: localeAttack,
    checkoutUrl: 'https://lumorahorticulture.nl/checkout',
  });

  assert.match(html, /<html lang="nl">/);
  assert.equal(html.includes(localeAttack), false);
  assert.equal(subject, 'Je producten wachten nog op je! 🌱');
});

test('drops legacy cart rows with non-finite or out-of-range prices and quantities', () => {
  const maliciousQuantity = `1</p><script>alert('quantity')</script>`;
  const invalidItems = [
    { ...validItem, name: 'String quantity', quantity: maliciousQuantity },
    { ...validItem, name: 'Fractional quantity', quantity: 1.5 },
    { ...validItem, name: 'Huge quantity', quantity: 101 },
    { ...validItem, name: 'NaN price', price: Number.NaN },
    { ...validItem, name: 'Infinite price', price: Number.POSITIVE_INFINITY },
    { ...validItem, name: 'Huge price', price: 100_001 },
  ];

  const { html } = getAbandonedCartEmailContent({
    cartItems: [validItem, ...invalidItems],
    totalAmount: Number.POSITIVE_INFINITY,
    locale: 'en',
    checkoutUrl: 'https://lumorahorticulture.nl/en/checkout',
  });

  assert.match(html, /Paperbus Pluggen/);
  for (const item of invalidItems) assert.equal(html.includes(item.name), false);
  assert.doesNotMatch(html, /<script>|Infinity|NaN/i);
  assert.equal(html.includes(maliciousQuantity), false);
});
