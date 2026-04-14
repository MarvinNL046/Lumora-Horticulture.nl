import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../convex/_generated/api';
import { resend, EMAIL_FROM, EMAIL_REPLY_TO } from '@/lib/resend';
import { getPaymentRecoveryEmailContent } from '@/emails/payment-recovery-template';
import { createPayment } from '@/lib/mollie';

export const dynamic = 'force-dynamic';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const maxDuration = 60; // Allow up to 60 seconds for processing multiple emails

// Vercel Cron Job: Payment Recovery Emails
// Schedule: Every 2 hours at minute 30 (30 */2 * * *)
//
// Targets orders with expired/failed payments.
// Email schedule:
// - 1st email: 1 hour after payment expires
// - 2nd email: 48 hours after 1st email (if still not paid)
export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('Running payment recovery email job...');

  try {
    // Find orders for FIRST recovery email
    const ordersForFirstEmail = await convex.query(api.orders.listForFirstRecovery);

    // Find orders for SECOND recovery email
    const ordersForSecondEmail = await convex.query(api.orders.listForSecondRecovery);

    const ordersToRecover = [
      ...ordersForFirstEmail.map(o => ({ ...o, isSecondReminder: false })),
      ...ordersForSecondEmail.map(o => ({ ...o, isSecondReminder: true })),
    ];

    console.log(`Found ${ordersForFirstEmail.length} orders for 1st email, ${ordersForSecondEmail.length} for 2nd email`);

    if (ordersToRecover.length === 0) {
      return NextResponse.json({ message: 'No orders to recover' });
    }

    let successCount = 0;
    let failCount = 0;

    // Process each order
    for (const orderData of ordersToRecover) {
      const { isSecondReminder, ...order } = orderData;

      try {
        console.log(`Processing order ${order._id} (${isSecondReminder ? '2nd' : '1st'} reminder)...`);

        // Get order items with product details
        const itemsWithProducts = await convex.query(api.orderItems.getByOrderWithProducts, {
          order_id: order._id,
        });

        if (itemsWithProducts.length === 0) {
          console.log(`No items found for order ${order._id}, skipping`);
          continue;
        }

        // Determine base URL based on locale
        const locale = order.locale || 'nl';
        const domain =
          locale === 'en'
            ? 'lumorahorticulture.com'
            : locale === 'de'
            ? 'lumorahorticulture.de'
            : 'lumorahorticulture.nl';

        const baseUrl = `https://${domain}`;

        // Build retry page URL for self-service
        const checkoutPath = locale === 'de' ? 'checkout' : locale === 'en' ? 'checkout' : 'checkout';
        const retryPageUrl = `${baseUrl}/${locale}/${checkoutPath}/retry?order_id=${order._id}`;

        // Create a new payment link
        const payment = await createPayment({
          amount: order.total_amount,
          description: `Bestelling ${order._id}`,
          redirectUrl: `${baseUrl}/checkout/conversion?order_id=${order._id}`,
          webhookUrl: `${baseUrl}/api/webhooks/mollie`,
          metadata: {
            order_id: order._id,
            recovery: true,
            reminder_number: isSecondReminder ? 2 : 1,
          },
        });

        // Update order with new payment ID
        await convex.mutation(api.orders.update, {
          id: order._id,
          payment_id: payment.id,
          payment_status: 'pending',
          status: 'pending',
        });

        const paymentUrl = payment.getCheckoutUrl();

        // Calculate expiry time (Mollie default is 15 minutes, but we show 24 hours for UX)
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Format order items for email
        const orderItemsForEmail = itemsWithProducts.map((item) => ({
          name: item.product?.name || 'Product',
          quantity: item.order_item.quantity,
          price: item.order_item.price_at_purchase,
          image_url: item.product?.image_url || undefined,
        }));

        // Generate email content
        const emailContent = getPaymentRecoveryEmailContent({
          customerName: order.customer_name || '',
          orderId: order._id,
          orderItems: orderItemsForEmail,
          totalAmount: order.total_amount,
          locale: locale,
          paymentUrl: paymentUrl!,
          retryPageUrl: retryPageUrl,
          expiresAt,
          isSecondReminder,
        });

        // Send email via Resend
        await resend.emails.send({
          from: EMAIL_FROM,
          to: order.customer_email,
          replyTo: EMAIL_REPLY_TO,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        // Update order to mark recovery email sent
        const currentAttempts = order.recovery_attempts ?? 0;
        await convex.mutation(api.orders.update, {
          id: order._id,
          recovery_email_sent_at: Date.now(),
          recovery_attempts: currentAttempts + 1,
        });

        successCount++;
        console.log(`${isSecondReminder ? '2nd' : '1st'} recovery email sent for order ${order._id} to ${order.customer_email}`);
      } catch (error) {
        failCount++;
        console.error(`Failed to process order ${order._id}:`, error);
      }
    }

    console.log(`Recovery job completed: ${successCount} succeeded, ${failCount} failed`);

    return NextResponse.json({
      message: 'Payment recovery emails processed',
      success: successCount,
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
