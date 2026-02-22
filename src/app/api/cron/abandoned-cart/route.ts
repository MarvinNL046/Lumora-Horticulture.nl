import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { abandonedCarts } from '@/db/schema';
import { sql, and, isNull, lt } from 'drizzle-orm';
import { resend, EMAIL_FROM, EMAIL_REPLY_TO } from '@/lib/resend';
import { getAbandonedCartEmailContent } from '@/emails/abandoned-cart-template';
import type { CartItem } from '@/contexts/CartContext';

export const maxDuration = 60; // Allow up to 60 seconds for processing multiple emails

/**
 * Vercel Cron Job: Abandoned Cart Reminders
 * Schedule: Every 6 hours (0 */6 * * *)
 *
 * Sends reminder emails for carts abandoned more than 24 hours ago
 * that haven't been reminded yet and haven't been recovered.
 */
export async function GET(request: NextRequest) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('Running abandoned cart reminder job...');

  try {
    // Get abandoned carts that are:
    // 1. Older than 24 hours
    // 2. Haven't been reminded yet (reminded_at IS NULL)
    // 3. Not recovered
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const cartsToRemind = await db
      .select()
      .from(abandonedCarts)
      .where(
        and(
          lt(abandonedCarts.created_at, twentyFourHoursAgo),
          isNull(abandonedCarts.reminded_at),
          sql`${abandonedCarts.recovered} = false`
        )
      );

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

        // Determine checkout URL based on locale
        const domain =
          cart.locale === 'en'
            ? 'lumorahorticulture.com'
            : cart.locale === 'de'
            ? 'lumorahorticulture.de'
            : 'lumorahorticulture.nl';

        const checkoutPath = cart.locale === 'de' ? '/kasse' : cart.locale === 'en' ? '/checkout' : '/checkout';

        const checkoutUrl = `https://${domain}/${cart.locale}${checkoutPath}?cart_recovery=${cart.id}`;

        // Generate email content
        const emailContent = getAbandonedCartEmailContent({
          customerName: cart.customer_name || undefined,
          cartItems,
          totalAmount: parseFloat(cart.total_amount),
          locale: cart.locale || 'nl',
          checkoutUrl,
        });

        // Send email via Resend
        await resend.emails.send({
          from: EMAIL_FROM,
          to: cart.customer_email,
          replyTo: EMAIL_REPLY_TO,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        // Update reminded_at timestamp
        await db
          .update(abandonedCarts)
          .set({ reminded_at: sql`NOW()` })
          .where(sql`${abandonedCarts.id} = ${cart.id}`);

        successCount++;
        console.log(`Sent reminder to ${cart.customer_email}`);
      } catch (error) {
        failCount++;
        console.error(`Failed to send reminder to ${cart.customer_email}:`, error);
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
