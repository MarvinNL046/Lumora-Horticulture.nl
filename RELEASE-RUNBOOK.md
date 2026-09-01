# Lumora release runbook

This runbook promotes the redesigned Lumora storefront without exposing an
untested checkout or changing production data prematurely.

## Current safe state

- Commit `26dd07a` is deployed as a Vercel Preview from `design-rebuild`.
- Preview keeps `/lumora-premium` available and `noindex` for design review.
- The same reviewed components now serve the final Dutch routes on Preview:
  `/`, `/producten`, `/stekpluggen-steenwol`, `/neemx-pro`, `/winkelmand`
  and `/afrekenen`.
- Production-only redirects consolidate temporary `/lumora-premium` URLs after
  promotion. Existing Dutch 84/104 and NeemX variant URLs redirect to their
  canonical product-family pages.
- Product, cart and checkout screens use the real Convex catalogue and the
  shared cart state.
- The backend is the authority for product prices and the three-box promotion.
- Preview uses an isolated Convex development deployment.
- `CHECKOUT_ENABLED` is absent or `false`; checkout therefore fails closed with
  a maintenance message.
- Cart and checkout are `noindex`; public product pages have reviewed canonical
  metadata and structured product-family data.
- The claim-safe NeemX page contains no pest-control or pesticide terminology.
- No production Convex data, Mollie payment or MyParcel shipment is changed by
  creating a preview.

## 1. Create and approve a preview

1. Push `design-rebuild` and let Vercel build a Preview deployment.
2. Confirm that Preview points to the isolated Convex deployment and contains
   the matching `CONVEX_SERVER_SECRET`.
3. Keep `CHECKOUT_ENABLED`, `RECOVERY_EMAILS_ENABLED`,
   `ABANDONED_CART_CAPTURE_ENABLED` and
   `MYPARCEL_DELIVERY_OPTIONS_ENABLED` off. Keep
   `MYPARCEL_SHIPMENTS_ENABLED` off until the controlled fulfilment test.
4. Smoke-test desktop and mobile:
   - product variants and supplied imagery;
   - add, remove and change quantity in the cart;
   - mixed 84/104 promotion: every complete group of three costs EUR 180;
   - customer/address validation and terms checkbox;
   - disabled checkout returns the friendly maintenance state;
   - account login, orders and invoices remain reachable.
5. Share the Preview URL for final content and visual approval.

## 2. Complete the payment staging gate

A Convex-backed, atomic per-IP limit now protects `/api/checkout`, payment
retry, cart capture, MyParcel delivery options and the Mollie/MyParcel webhook
routes. Only a route-bound HMAC is stored; raw client addresses are not
persisted. `/api/track/meta` is retired with HTTP 410 and performs no provider
call. These protections fail closed. The isolated Preview probe verified that
requests 1 through 8 enter the route and request 9 receives HTTP 429; the
short-lived probe deployment was removed immediately afterwards.

Next, run a controlled Mollie test-mode order through all states, including a
duplicate submit and duplicate/out-of-order webhook. Confirm exactly one order,
email, invoice and MyParcel shipment. Never use a live Mollie key for this test.

The current Vercel environment audit shows these required release items are not
yet configured for the new production flow:

- `CONVEX_SERVER_SECRET` in Vercel Production and the matching production
  Convex deployment;
- a high-entropy `PAYMENT_RETRY_SECRET`;
- `MYPARCEL_WEBHOOK_SECRET`, `MYPARCEL_STATUS_HOOK_ID` and
  `MYPARCEL_LABEL_HOOK_ID` after the corresponding MyParcel hooks exist;
- `MYPARCEL_SHIPMENTS_ENABLED=true`, only during the explicitly approved
  MyParcel label test and later for the controlled production rollout;
- `CHECKOUT_ENABLED=true`, but only after the test-mode order succeeds.

Do not reuse a Preview secret in Production and do not expose any of these
values through a `NEXT_PUBLIC_` variable.

## 3. Prepare the production window

1. Record the current production Vercel deployment URL and Convex deployment so
   both sides can be restored together.
2. Put the same new high-entropy `CONVEX_SERVER_SECRET` in production Convex and
   Vercel Production. Keep it server-only.
3. Verify every required production secret from
   `SECURITY-HOTFIX-ROLLOUT.md`; never copy Preview test keys into Production.
4. Synchronise the reviewed catalogue to production with
   `NEXT_PUBLIC_CONVEX_URL_PROD` explicitly set. Review the reported add/update
   counts before continuing.
5. Run for the exact release commit:
   - `npm ci`
   - `npm run test`
   - `npx tsc --noEmit`
   - `npm run lint`
   - `npm run build`
   - `npm audit --omit=dev --audit-level=high`

## 4. Promote the redesign

The reviewed routing change is included in commit `8f511e1`. It promotes the
Dutch storefront while preserving the existing English and German site, legal
pages and domain consolidation. The old NeemX translations temporarily redirect
to the reviewed Dutch page so unapproved product claims are not published.

Deploy the matching Convex functions and Vercel release in one maintenance
window. First verify browsing and a gated checkout. Enable
`CHECKOUT_ENABLED=true` only after the payment staging gate has passed and
monitor the first real order from payment through invoice and shipment.

Promote the exact tested commit; do not rebuild from a moving branch. Record the
previous production deployment before promotion and keep checkout disabled for
the initial visual smoke test.

## 5. Rollback

If browsing fails before checkout is enabled, restore the previous Vercel
production deployment. If the authenticated Convex contracts have already been
deployed, restore the matching previous Convex functions at the same time; a
Next-only rollback can break trusted calls.

If checkout or fulfilment fails, set `CHECKOUT_ENABLED=false` immediately. This
stops new payment attempts while leaving catalogue browsing and the cart
available. Preserve orders and provider events for reconciliation; never delete
or manually recreate a paid order as a first response.
