import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { resend, EMAIL_FROM, EMAIL_REPLY_TO } from '@/lib/resend';
import { getPaymentRecoveryEmailContent } from '@/emails/payment-recovery-template';

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
// /checkout/retry?order_id=... which mints a fresh payment on click via
// /api/orders/[id]/retry-payment. This avoids polluting the Mollie dashboard
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
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('Running payment recovery email job...');

  try {
    const ordersForFirstEmail = await convex.query(api.orders.listForFirstRecovery);
    const ordersForSecondEmail = await convex.query(api.orders.listForSecondRecovery);

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
            id: order._id,
            expected_from: expectedFrom,
            to: 'given_up',
          });
          skippedCount++;
          console.log(`Skipped order ${order._id}: test/invalid email ${order.customer_email}`);
          continue;
        }

        // CLAIM BEFORE WORK. If another cron instance / retry already moved
        // this order forward, the claim returns false and we skip.
        const claimed = await convex.mutation(api.orders.markRecoveryState, {
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
          order_id: order._id,
        });

        if (itemsWithProducts.length === 0) {
          console.log(`No items found for order ${order._id}, marking given_up`);
          await convex.mutation(api.orders.markRecoveryState, {
            id: order._id,
            to: 'given_up',
          });
          skippedCount++;
          continue;
        }

        const locale = order.locale || 'nl';
        const domain =
          locale === 'en'
            ? 'lumorahorticulture.com'
            : locale === 'de'
            ? 'lumorahorticulture.de'
            : 'lumorahorticulture.nl';
        const baseUrl = `https://${domain}`;

        // Single CTA: a stable retry URL. /checkout/retry creates the Mollie
        // payment on click via /api/orders/[id]/retry-payment, so we don't
        // pre-create anything here.
        const retryPageUrl = `${baseUrl}/${locale}/checkout/retry?order_id=${order._id}`;

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

        await resend.emails.send({
          from: EMAIL_FROM,
          to: order.customer_email,
          replyTo: EMAIL_REPLY_TO,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        // After the 2nd reminder there's nowhere to go — close the loop.
        if (isSecondReminder) {
          await convex.mutation(api.orders.markRecoveryState, {
            id: order._id,
            to: finalState,
          });
        }

        successCount++;
        console.log(
          `${isSecondReminder ? '2nd' : '1st'} recovery email sent for order ${order._id} to ${order.customer_email}`
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
