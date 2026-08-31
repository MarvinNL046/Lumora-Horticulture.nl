import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const checkEmailSource = await readFile(
  new URL('../../src/app/api/check-email/route.ts', import.meta.url),
  'utf8',
);
const recoverCartSource = await readFile(
  new URL('../../src/app/api/cart/recover/[id]/route.ts', import.meta.url),
  'utf8',
);
const saveCartSource = await readFile(
  new URL('../../src/app/api/cart/save/route.ts', import.meta.url),
  'utf8',
);
const welcomeEmailSource = await readFile(
  new URL('../../src/app/api/auth/welcome-email/route.ts', import.meta.url),
  'utf8',
);
const metaMirrorSource = await readFile(
  new URL('../../src/app/api/track/meta/route.ts', import.meta.url),
  'utf8',
);
const checkoutSource = await readFile(
  new URL('../../src/app/api/checkout/route.ts', import.meta.url),
  'utf8',
);
const trackingScriptsSource = await readFile(
  new URL('../../src/components/TrackingScripts.tsx', import.meta.url),
  'utf8',
);

test('retired check-email route cannot enumerate customers or orders', () => {
  assert.match(checkEmailSource, /status:\s*410/);
  assert.match(checkEmailSource, /Cache-Control['"]:\s*['"]no-store/);
  assert.doesNotMatch(checkEmailSource, /getByEmail|api\.orders|order_data|customer_phone|exists\s*:/);
  assert.doesNotMatch(checkEmailSource, /request\.json\s*\(/);
});

test('cart recovery response exposes cart contents but no customer PII', () => {
  assert.match(recoverCartSource, /cart:\s*cart\.cart_data/);
  assert.match(recoverCartSource, /Cache-Control['"]:\s*['"]no-store/);
  assert.doesNotMatch(recoverCartSource, /customer_email\s*:|customer_name\s*:/);
  assert.doesNotMatch(recoverCartSource, /details:\s*error/);
});

test('cart save rebuilds product data and totals instead of trusting browser fields', () => {
  assert.match(saveCartSource, /api\.products\.getById/);
  assert.match(saveCartSource, /canonicalCart\.push/);
  assert.match(saveCartSource, /total_amount:\s*Math\.round\(canonicalTotal/);
  assert.doesNotMatch(saveCartSource, /const\s*\{[^}]*total_amount[^}]*\}\s*=\s*body/);
  assert.doesNotMatch(saveCartSource, /details:\s*error/);
});

test('browser-triggered welcome mail and client-supplied Meta CAPI are retired', () => {
  for (const source of [welcomeEmailSource, metaMirrorSource]) {
    assert.match(source, /status:\s*410/);
    assert.match(source, /Cache-Control['"]:\s*['"]no-store/);
    assert.doesNotMatch(source, /request\.json\s*\(/);
  }
  assert.doesNotMatch(welcomeEmailSource, /resend\.emails\.send/);
  assert.doesNotMatch(metaMirrorSource, /sendCapiEvent/);
});

test('provider-creating checkout is fail-closed pending edge protection', () => {
  assert.match(checkoutSource, /process\.env\.CHECKOUT_ENABLED\s*!==\s*'true'/);
  assert.match(checkoutSource, /status:\s*503/);
});

test('third-party scripts are suppressed throughout credential-bearing checkout', () => {
  assert.match(trackingScriptsSource, /checkout\(\?:\\\/\|\$\)/);
  assert.match(trackingScriptsSource, /if \(isCheckoutFlow\) return null/);
});
