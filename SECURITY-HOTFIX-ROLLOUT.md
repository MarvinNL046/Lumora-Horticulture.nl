# Security hotfix rollout

This branch changes both the public Convex function contracts and every trusted
Next.js caller. Do not deploy one side hours before the other: old callers do
not have `server_secret`, while the new callers are rejected by the old
validators because that argument does not exist there yet.

## 0. Release gate: dependencies and lockfile

Do not release this branch yet. The historical lockfile still resolves known
high-severity production advisories in Next.js and its bundled PostCSS, while
the pinned `next-intl` version also requires a security update. The lockfile is
incomplete enough that `npm ci` cannot reproduce an install. Upgrade the
framework/intl dependency set, regenerate the lockfile from a clean install,
review the migration and rerun this entire preflight before deployment.

## 1. Prepare secrets before deployment

Generate independent high-entropy values. Never prefix server-only values with
`NEXT_PUBLIC_`.

- `CONVEX_SERVER_SECRET`: same 32+ character value in the Convex deployment and
  the Vercel/Next.js runtime.
- `CRON_SECRET`: 32+ characters in Vercel; Vercel Cron sends it as a bearer
  token.
- `PAYMENT_RETRY_SECRET`: 32+ characters in Vercel.
- `MYPARCEL_WEBHOOK_SECRET`: 32+ characters when the extra callback secret is
  enabled.
- Confirm `MOLLIE_API_KEY`, `MYPARCEL_API_KEY`, `RESEND_API_KEY` and the Stack
  server key are server-only.

Also configure `MYPARCEL_LABEL_HOOK_ID` and `MYPARCEL_STATUS_HOOK_ID` from the
MyParcel dashboard. Configure the webhook secret in the callback URL/header if
MyParcel supports that setup for the account.

Existing recovery emails that contain the old unauthenticated
`?order_id=...` link will intentionally stop working. Before rollout, identify
still-active recovery orders and reissue a signed link or prepare customer
support to send one on request; do not restore the public raw-order lookup.

## 2. Preflight locally or in staging

The repository currently has an inconsistent historical `package-lock.json`,
so `npm ci` is not yet a reliable install command. Repair and review the lockfile
in a separate dependency-upgrade change before relying on CI.

Before production rollout:

1. Run official Convex code generation against the target deployment.
2. Run the TypeScript typecheck and all security tests.
3. Run a production Next.js build with staging environment variables.
4. Verify that no generated secret or local `.env` file is staged.

## 3. Coordinated deployment

The current secure end state requires a short maintenance window. Prepare both
artifacts first, then deploy the Convex schema/functions and promote the matching
Next.js deployment immediately afterwards. Keep the previous deployment ready
for rollback, but remember that rolling back only Next.js after the authenticated
Convex contracts are live will break trusted calls.

For true zero downtime, first implement a separate three-phase migration:

1. Add versioned authenticated Convex functions without removing old contracts.
2. Deploy Next.js callers that use only the new functions.
3. Remove the old unauthenticated functions in a final Convex deployment.

## 4. Required staging smoke tests

- New checkout, including a duplicate submit.
- Successful payment and duplicate/out-of-order Mollie webhooks.
- Failed/expired payment followed by a signed retry link.
- A legacy live Mollie payment whose metadata only contains `order_id`.
- Exactly one order number, confirmation email, admin email, shipment and
  conversion event for one paid order.
- MyParcel label and status callbacks with valid and invalid authentication.
- Payment-recovery and abandoned-cart crons with valid and invalid bearer auth.
- Account orders/addresses and admin metrics for authorized and unauthorized
  users.

## 5. Edge protection and monitoring

Add platform rate limits for `/api/checkout`, `/api/payments/retry`,
`/api/cart/save`, `/api/delivery-options`, `/api/track/meta` and both webhook
routes. Monitor payment-attempt and order-effect failures after release. A
Content-Security-Policy should be introduced separately after inventorying and
testing Mollie, Stack, analytics, fonts and image origins.

The hotfix defaults `CHECKOUT_ENABLED`, `RECOVERY_EMAILS_ENABLED`,
`ABANDONED_CART_CAPTURE_ENABLED` and `MYPARCEL_DELIVERY_OPTIONS_ENABLED` to
`false`. Do not enable them merely to restore old behaviour:

- Recovery email must stay off until checkout has a tested distributed rate
  limit/bot challenge and the abandoned-cart flow has an atomic message claim.
- Cart capture must stay off until guest carts are bound to an unguessable
  browser capability instead of globally upserting by an unverified email.
- MyParcel delivery options must stay off until a distributed per-IP/provider
  quota is active. Checkout can continue without the optional picker.
- Checkout itself must stay off until a distributed per-IP/bot limit is active
  and a staging payment smoke test has passed. Set `CHECKOUT_ENABLED=true` only
  as part of that controlled rollout.

The client-triggered welcome email route is intentionally retired. Reintroduce
welcome mail only from a trusted signup event with an atomic one-shot ledger and
a stable provider idempotency key.
