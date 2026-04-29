// Standalone smoke test for src/lib/neemx-promo.ts
// Run: npx tsx scripts/test-neemx-promo.ts
// Exits non-zero on any assertion failure.
import { calculateNeemxPromoDiscount, isPromoCookieActive } from '../src/lib/neemx-promo';

let failed = 0;
function assertEq(label: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    console.error(`FAIL: ${label}\n  expected: ${e}\n  actual:   ${a}`);
    failed++;
  } else {
    console.log(`PASS: ${label}`);
  }
}

// 1. Empty cart → not eligible
assertEq(
  'empty cart',
  calculateNeemxPromoDiscount([]),
  { discount: 0, freeItemSlug: null, eligible: false }
);

// 2. 2 NEEMX bottles → not eligible
assertEq(
  '2 bottles total → not eligible',
  calculateNeemxPromoDiscount([
    { slug: 'neemx-pro-30ml', unitPrice: 44.95, quantity: 2 },
  ]),
  { discount: 0, freeItemSlug: null, eligible: false }
);

// 3. 3× same bottle → eligible, free unit is that one
assertEq(
  '3× 30ml → 1× 30ml free',
  calculateNeemxPromoDiscount([
    { slug: 'neemx-pro-30ml', unitPrice: 44.95, quantity: 3 },
  ]),
  { discount: 44.95, freeItemSlug: 'neemx-pro-30ml', eligible: true }
);

// 4. Mix 2× 50ml + 1× 10ml → cheapest (10ml) free
assertEq(
  'mix 2×50ml + 1×10ml → 10ml free',
  calculateNeemxPromoDiscount([
    { slug: 'neemx-pro-50ml', unitPrice: 59.95, quantity: 2 },
    { slug: 'neemx-pro-10ml', unitPrice: 24.95, quantity: 1 },
  ]),
  { discount: 24.95, freeItemSlug: 'neemx-pro-10ml', eligible: true }
);

// 5. Mix 1× 50ml + 1× 30ml + 1× 10ml → 10ml free
assertEq(
  'mix one of each → 10ml free',
  calculateNeemxPromoDiscount([
    { slug: 'neemx-pro-50ml', unitPrice: 59.95, quantity: 1 },
    { slug: 'neemx-pro-30ml', unitPrice: 44.95, quantity: 1 },
    { slug: 'neemx-pro-10ml', unitPrice: 24.95, quantity: 1 },
  ]),
  { discount: 24.95, freeItemSlug: 'neemx-pro-10ml', eligible: true }
);

// 6. 4× NEEMX still gets exactly 1 free (not 2)
assertEq(
  '4 bottles → still only 1 free',
  calculateNeemxPromoDiscount([
    { slug: 'neemx-pro-30ml', unitPrice: 44.95, quantity: 2 },
    { slug: 'neemx-pro-10ml', unitPrice: 24.95, quantity: 2 },
  ]),
  { discount: 24.95, freeItemSlug: 'neemx-pro-10ml', eligible: true }
);

// 7. NEEMX + non-NEEMX in cart → only NEEMX counts toward eligibility
assertEq(
  '2 NEEMX + 1 non-NEEMX → not eligible (need 3 NEEMX)',
  calculateNeemxPromoDiscount([
    { slug: 'neemx-pro-30ml', unitPrice: 44.95, quantity: 2 },
    { slug: 'paper-plug-tray-84', unitPrice: 12.50, quantity: 1 },
  ]),
  { discount: 0, freeItemSlug: null, eligible: false }
);

// 8. NEEMX + non-NEEMX → only NEEMX considered for cheapest
assertEq(
  '3 NEEMX + 1 cheap tray → cheapest NEEMX free, tray ignored',
  calculateNeemxPromoDiscount([
    { slug: 'neemx-pro-30ml', unitPrice: 44.95, quantity: 3 },
    { slug: 'paper-plug-tray-84', unitPrice: 5.00, quantity: 1 },
  ]),
  { discount: 44.95, freeItemSlug: 'neemx-pro-30ml', eligible: true }
);

// 9. Cookie matchers
assertEq('cookie active true', isPromoCookieActive('NEEMX2PLUS1'), true);
assertEq('cookie active false (different)', isPromoCookieActive('OTHER'), false);
assertEq('cookie active false (undefined)', isPromoCookieActive(undefined), false);
assertEq('cookie active false (empty)', isPromoCookieActive(''), false);
assertEq('cookie active false (substring)', isPromoCookieActive('NEEMX2PLUS1; foo=bar'), false);

if (failed > 0) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}
console.log('\nAll tests passed');
