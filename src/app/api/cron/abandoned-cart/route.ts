import { NextRequest, NextResponse } from 'next/server';
import { convex, convexServerAuth } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { resend, EMAIL_FROM, EMAIL_REPLY_TO } from '@/lib/resend';
import { getAbandonedCartEmailContent } from '@/emails/abandoned-cart-template';
import type { CartItem } from '@/contexts/CartContext';
import { isAuthorizedCronRequest } from '@/lib/cron-auth';
import { localizePathForLocale } from '@/lib/url-localizations';

export const dynamic = 'force-dynamic';

export const maxDuration = 60; // Allow up to 60 seconds for processing multiple emails

// Vercel Cron Job: Abandoned Cart Reminders
// Schedule: Every 6 hours (0 */6 * * *)
//
// Sends reminder emails for carts abandoned more than 24 hours ago
// that haven't been reminded yet and haven't been recovered.
export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron
  if (!isAuthorizedCronRequest(request.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // This legacy flow has no durable per-message claim yet. Leave it disabled
  // until capture ownership and exactly-once delivery are redesigned.
  if (process.env.RECOVERY_EMAILS_ENABLED !== 'true') {
    return NextResponse.json(
      { message: 'Abandoned-cart email automation is disabled' },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  }

  console.log('Running abandoned cart reminder job...');

  try {
    // Get abandoned carts that are:
    // 1. Older than 24 hours
    // 2. Haven't been reminded yet (reminded_at IS NULL)
    // 3. Not recovered
    const cartsToRemind = await convex.query(api.abandonedCarts.getUnreminded, {
      ...convexServerAuth(),
    });

    console.log(`Found ${cartsToRemind.length} abandoned carts to remind`);

    if (cartsToRemind.length === 0) {
      return NextResponse.json({ message: 'No carts to remind' });
    }

    let successCount = 0;
    let failCount = 0;

    // Send reminder email for each abandoned cart
    for (const cart of cartsToRemind) {
      try {
        const cartItems: CartItem[] = cart.cart_data as any;

        const checkoutPath = localizePathForLocale('/checkout', cart.locale || 'nl');
        const checkoutUrl = `https://lumorahorticulture.nl${checkoutPath}?cart_recovery=${cart._id}`;

        // Generate email content
        const emailContent = getAbandonedCartEmailContent({
          customerName: cart.customer_name || undefined,
          cartItems,
          totalAmount: cart.total_amount,
          locale: cart.locale || 'nl',
          checkoutUrl,
        });

        // Send email via Resend
        const sendResult = await resend.emails.send(
          {
            from: EMAIL_FROM,
            to: cart.customer_email,
            replyTo: EMAIL_REPLY_TO,
            subject: emailContent.subject,
            html: emailContent.html,
          },
          { idempotencyKey: `abandoned-cart-${cart._id}-1` },
        );
        if (sendResult.error || !sendResult.data?.id) {
          throw new Error('Resend did not acknowledge abandoned-cart email');
        }

        // Update reminded_at timestamp
        await convex.mutation(api.abandonedCarts.markReminded, {
          ...convexServerAuth(),
          id: cart._id,
        });

        successCount++;
        console.log(`Sent reminder for cart ${cart._id}`);
      } catch (error) {
        failCount++;
        console.error(`Failed to send reminder for cart ${cart._id}`);
      }
    }

    console.log(
      `Reminder job completed: ${successCount} succeeded, ${failCount} failed`
    );

    return NextResponse.json({
      message: 'Abandoned cart reminders sent',
      success: successCount,
      failed: failCount,
      total: cartsToRemind.length,
    });
  } catch (error) {
    console.error('Error in abandoned cart reminder job:', error);
    return NextResponse.json(
      {
        error: 'Failed to send reminders',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
