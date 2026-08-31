import { NextRequest, NextResponse } from 'next/server';
import { convex, convexServerAuth } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import {
  EMAIL_FROM,
  EMAIL_REPLY_TO,
  assertResendConfigured,
  resend,
} from '@/lib/resend';
import { getPaymentRecoveryEmailContent } from '@/emails/payment-recovery-template';
import {
  assertPaymentRetryConfiguration,
  createPaymentRetryToken,
  type PaymentRetryLocale,
} from '@/lib/payment-retry-token';
import { isAuthorizedCronRequest } from '@/lib/cron-auth';
import { getCanonicalBaseUrl } from '@/lib/canonical-base-url';

export const dynamic = 'force-dynamic';

export const maxDuration = 60;

// Vercel Cron Job: Payment Recovery Emails
// Schedule: Every 2 hours at minute 30 (30 */2 * * *)
//
// Sends up to 2 reminder emails per abandoned order:
// - 1st email: 1 hour after payment expires
// - 2nd email: 48 hours after the 1st (final reminder)
//
// The cron does NOT pre-create Mollie payments. Each email links to
// /checkout/retry#token=... which mints a fresh payment on click via the
// token-protected retry API. This avoids polluting the Mollie dashboard
// with dozens of expired payments and lets the customer pay even if the
// previous link expired. Mirrors how Shopify, Stripe Checkout, and Klaviyo
// do abandoned-cart recovery.
//
// State machine on the order (recovery_state):
//   none → reminder_1_sent → reminder_2_sent → given_up
// Transition is claimed atomically BEFORE sending email so retries/races
// can never double-send.

function isSkippableEmail(email: string): boolean {
  const e = email.toLowerCase().trim();
  // RFC-reserved test domains
  if (/@(example\.(com|org|net)|test\.com|invalid|localhost)$/.test(e)) return true;
  // Common test-account patterns
  if (/^(test|noreply|no-reply|donotreply)@/.test(e)) return true;
  // Plus-addressed test variants
  if (/\+test@|\+spam@/.test(e)) return true;
  return false;
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCronRequest(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Public checkout can be abused to nominate someone else's email address.
  // Keep outbound recovery mail fail-closed until distributed checkout abuse
  // controls have been configured and tested at the platform edge.
  if (process.env.RECOVERY_EMAILS_ENABLED !== 'true') {
    return NextResponse.json(
      { message: 'Payment recovery email automation is disabled' },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  }

  let baseUrl: string;
  try {
    // Check this before claiming any recovery state. Missing configuration
    // must stop the whole job instead of consuming reminders without a link.
    assertPaymentRetryConfiguration();
    baseUrl = getCanonicalBaseUrl();
    assertResendConfigured();
  } catch (error) {
    console.error('Payment recovery is disabled: retry token secret is not configured', error);
    return NextResponse.json(
      { error: 'Payment recovery is not configured' },
      { status: 503 },
    );
  }

  console.log('Running payment recovery email job...');

  try {
    const ordersForFirstEmail = await convex.query(
      api.orders.listForFirstRecovery,
      convexServerAuth(),
    );
    const ordersForSecondEmail = await convex.query(
      api.orders.listForSecondRecovery,
      convexServerAuth(),
    );

    const ordersToRecover = [
      ...ordersForFirstEmail.map((o) => ({ ...o, isSecondReminder: false })),
      ...ordersForSecondEmail.map((o) => ({ ...o, isSecondReminder: true })),
    ];

    console.log(
      `Found ${ordersForFirstEmail.length} orders for 1st email, ${ordersForSecondEmail.length} for 2nd email`
    );

    if (ordersToRecover.length === 0) {
      return NextResponse.json({ message: 'No orders to recover' });
    }

    let successCount = 0;
    let failCount = 0;
    let skippedCount = 0;

    for (const orderData of ordersToRecover) {
      const { isSecondReminder, ...order } = orderData;
      const expectedFrom = isSecondReminder ? 'reminder_1_sent' : 'none';
      const nextState = isSecondReminder ? 'reminder_2_sent' : 'reminder_1_sent';
      const finalState = isSecondReminder ? 'given_up' : nextState;

      try {
        // Skip junk/test emails — claim "given_up" so we never look at this
        // order again.
        if (isSkippableEmail(order.customer_email)) {
          await convex.mutation(api.orders.markRecoveryState, {
            ...convexServerAuth(),
            id: order._id,
            expected_from: expectedFrom,
            to: 'given_up',
          });
          skippedCount++;
          console.log(`Skipped order ${order._id}: test/invalid recipient`);
          continue;
        }

        // CLAIM BEFORE WORK. If another cron instance / retry already moved
        // this order forward, the claim returns false and we skip.
        const claimed = await convex.mutation(api.orders.markRecoveryState, {
          ...convexServerAuth(),
          id: order._id,
          expected_from: expectedFrom,
          to: nextState,
          set_email_sent_at: true,
        });

        if (!claimed) {
          skippedCount++;
          console.log(`Skipped order ${order._id}: state already advanced (race or duplicate run)`);
          continue;
        }

        const itemsWithProducts = await convex.query(api.orderItems.getByOrderWithProducts, {
          ...convexServerAuth(),
          order_id: order._id,
        });

        if (itemsWithProducts.length === 0) {
          console.log(`No items found for order ${order._id}, marking given_up`);
          await convex.mutation(api.orders.markRecoveryState, {
            ...convexServerAuth(),
            id: order._id,
            to: 'given_up',
          });
          skippedCount++;
          continue;
        }

        const locale: PaymentRetryLocale =
          order.locale === 'en' || order.locale === 'de' ? order.locale : 'nl';
        const localePrefix = locale === 'nl' ? '' : `/${locale}`;
        const retryToken = createPaymentRetryToken({
          orderId: order._id,
          locale,
        });

        // The signed, expiring token is the only credential. The order id is
        // deliberately not exposed as a lookup parameter.
        // Keep the capability in the URL fragment: browsers do not send it in
        // the HTTP request, Referer header, CDN logs, or server analytics.
        const retryPageUrl = `${baseUrl}${localePrefix}/checkout/retry#token=${encodeURIComponent(retryToken)}`;

        const orderItemsForEmail = itemsWithProducts.map((item) => ({
          name: item.product?.name || 'Product',
          quantity: item.order_item.quantity,
          price: item.order_item.price_at_purchase,
          image_url: item.product?.image_url || undefined,
        }));

        const emailContent = getPaymentRecoveryEmailContent({
          customerName: order.customer_name || '',
          orderId: order._id,
          orderItems: orderItemsForEmail,
          totalAmount: order.total_amount,
          locale,
          // Both CTAs point to the on-demand retry page. No pre-created Mollie
          // payment, so no expiresAt either.
          paymentUrl: retryPageUrl,
          retryPageUrl,
          isSecondReminder,
        });

        const sendResult = await resend.emails.send(
          {
            from: EMAIL_FROM,
            to: order.customer_email,
            replyTo: EMAIL_REPLY_TO,
            subject: emailContent.subject,
            html: emailContent.html,
          },
          {
            idempotencyKey: `payment-recovery-${order._id}-${isSecondReminder ? '2' : '1'}`,
          },
        );
        if (sendResult.error || !sendResult.data?.id) {
          throw new Error('Resend did not acknowledge payment recovery email');
        }

        // After the 2nd reminder there's nowhere to go — close the loop.
        if (isSecondReminder) {
          await convex.mutation(api.orders.markRecoveryState, {
            ...convexServerAuth(),
            id: order._id,
            to: finalState,
          });
        }

        successCount++;
        console.log(
          `${isSecondReminder ? '2nd' : '1st'} recovery email sent for order ${order._id}`
        );
      } catch (error) {
        failCount++;
        console.error(`Failed to process order ${order._id}:`, error);
      }
    }

    console.log(
      `Recovery job completed: ${successCount} sent, ${skippedCount} skipped, ${failCount} failed`
    );

    return NextResponse.json({
      message: 'Payment recovery emails processed',
      success: successCount,
      skipped: skippedCount,
      failed: failCount,
      total: ordersToRecover.length,
    });
  } catch (error) {
    console.error('Error in payment recovery job:', error);
    return NextResponse.json(
      {
        error: 'Failed to process recovery emails',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
