import { schedule } from '@netlify/functions';
import { db } from '../../src/db';
import { orders, orderItems, products } from '../../src/db/schema';
import { sql, and, isNull, or, eq, lt } from 'drizzle-orm';
import { resend, EMAIL_FROM, EMAIL_REPLY_TO } from '../../src/lib/resend';
import { getPaymentRecoveryEmailContent } from '../../src/emails/payment-recovery-template';
import { createPayment } from '../../src/lib/mollie';

/**
 * Netlify Scheduled Function
 * Runs every 2 hours to send payment recovery emails
 * Targets orders with expired/failed payments
 *
 * Email schedule:
 * - 1st email: 1 hour after payment expires
 * - 2nd email: 48 hours after 1st email (if still not paid)
 *
 * Cron: At minute 30 past every 2nd hour (offset from abandoned cart job)
 */
export const handler = schedule('30 */2 * * *', async () => {
  console.log('💳 Running payment recovery email job...');

  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Find orders for FIRST recovery email:
    // 1. Have expired, failed, or cancelled payment status
    // 2. Are older than 1 hour
    // 3. Haven't received any recovery email yet
    const ordersForFirstEmail = await db
      .select()
      .from(orders)
      .where(
        and(
          or(
            eq(orders.payment_status, 'expired'),
            eq(orders.payment_status, 'failed'),
            eq(orders.payment_status, 'cancelled')
          ),
          lt(orders.created_at, oneHourAgo),
          sql`${orders.created_at} > ${sevenDaysAgo}`,
          isNull(orders.recovery_email_sent_at),
          sql`COALESCE(${orders.recovery_attempts}, 0) = 0`
        )
      )
      .limit(30);

    // Find orders for SECOND recovery email:
    // 1. Still have expired/failed/cancelled payment status
    // 2. Received first email more than 48 hours ago
    // 3. Have exactly 1 recovery attempt
    const ordersForSecondEmail = await db
      .select()
      .from(orders)
      .where(
        and(
          or(
            eq(orders.payment_status, 'expired'),
            eq(orders.payment_status, 'failed'),
            eq(orders.payment_status, 'cancelled')
          ),
          sql`${orders.recovery_email_sent_at} < ${fortyEightHoursAgo}`,
          sql`COALESCE(${orders.recovery_attempts}, 0) = 1`
        )
      )
      .limit(20);

    const ordersToRecover = [
      ...ordersForFirstEmail.map(o => ({ ...o, isSecondReminder: false })),
      ...ordersForSecondEmail.map(o => ({ ...o, isSecondReminder: true })),
    ];

    console.log(`📊 Found ${ordersForFirstEmail.length} orders for 1st email, ${ordersForSecondEmail.length} for 2nd email`);

    if (ordersToRecover.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No orders to recover' }),
      };
    }

    let successCount = 0;
    let failCount = 0;

    // Process each order
    for (const orderData of ordersToRecover) {
      const { isSecondReminder, ...order } = orderData;

      try {
        console.log(`Processing order ${order.id} (${isSecondReminder ? '2nd' : '1st'} reminder)...`);

        // Get order items with product details
        const items = await db
          .select({
            name: products.name,
            quantity: orderItems.quantity,
            price: orderItems.price_at_purchase,
            image_url: products.image_url,
          })
          .from(orderItems)
          .leftJoin(products, eq(orderItems.product_id, products.id))
          .where(eq(orderItems.order_id, order.id));

        if (items.length === 0) {
          console.log(`⚠️ No items found for order ${order.id}, skipping`);
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
        const retryPageUrl = `${baseUrl}/${locale}/${checkoutPath}/retry?order_id=${order.id}`;

        // Create a new payment link
        const payment = await createPayment({
          amount: parseFloat(order.total_amount),
          description: `Bestelling ${order.id}`,
          redirectUrl: `${baseUrl}/checkout/conversion?order_id=${order.id}`,
          webhookUrl: `${baseUrl}/api/webhooks/mollie`,
          metadata: {
            order_id: order.id,
            recovery: true,
            reminder_number: isSecondReminder ? 2 : 1,
          },
        });

        // Update order with new payment ID
        await db
          .update(orders)
          .set({
            payment_id: payment.id,
            payment_status: 'pending',
            status: 'pending',
            updated_at: new Date(),
          })
          .where(eq(orders.id, order.id));

        const paymentUrl = payment.getCheckoutUrl();

        // Calculate expiry time (Mollie default is 15 minutes, but we show 24 hours for UX)
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Format order items for email
        const orderItemsForEmail = items.map((item) => ({
          name: item.name || 'Product',
          quantity: parseInt(item.quantity || '1'),
          price: parseFloat(item.price || '0'),
          image_url: item.image_url || undefined,
        }));

        // Generate email content
        const emailContent = getPaymentRecoveryEmailContent({
          customerName: order.customer_name,
          orderId: order.id,
          orderItems: orderItemsForEmail,
          totalAmount: parseFloat(order.total_amount),
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
        const currentAttempts = parseInt(order.recovery_attempts?.toString() || '0');
        await db
          .update(orders)
          .set({
            recovery_email_sent_at: sql`NOW()`,
            recovery_attempts: (currentAttempts + 1).toString(),
          })
          .where(eq(orders.id, order.id));

        successCount++;
        console.log(`✅ ${isSecondReminder ? '2nd' : '1st'} recovery email sent for order ${order.id} to ${order.customer_email}`);
      } catch (error) {
        failCount++;
        console.error(`❌ Failed to process order ${order.id}:`, error);
      }
    }

    console.log(`✨ Recovery job completed: ${successCount} succeeded, ${failCount} failed`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Payment recovery emails processed',
        success: successCount,
        failed: failCount,
        total: ordersToRecover.length,
      }),
    };
  } catch (error) {
    console.error('❌ Error in payment recovery job:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process recovery emails',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
});
