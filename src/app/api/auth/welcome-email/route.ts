import { NextRequest, NextResponse } from 'next/server';
import { resend, EMAIL_FROM, EMAIL_NOTIFICATION_TO } from '@/lib/resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { NewCustomerNotification } from '@/emails/NewCustomerNotification';
import { stackServerApp } from '@/stack/server';

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from an authenticated user or from Stack Auth
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const customerName = user.displayName || 'Valued Customer';
    const customerEmail = user.primaryEmail;

    if (!customerEmail) {
      return NextResponse.json(
        { success: false, error: 'Email address not found' },
        { status: 400 }
      );
    }

    // Determine locale from request or default to 'nl'
    const { locale = 'nl' } = await request.json().catch(() => ({ locale: 'nl' }));

    // Send welcome email to customer
    const welcomeEmailPromise = resend.emails.send({
      from: EMAIL_FROM,
      to: customerEmail,
      subject: locale === 'de'
        ? 'Willkommen bei Lumora Horticulture!'
        : locale === 'en'
        ? 'Welcome to Lumora Horticulture!'
        : 'Welkom bij Lumora Horticulture!',
      react: WelcomeEmail({
        customerName,
        locale: locale as 'nl' | 'en' | 'de',
      }),
    });

    // Send notification email to business
    const notificationEmailPromise = resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_NOTIFICATION_TO,
      subject: `Nieuwe klant geregistreerd: ${customerName}`,
      react: NewCustomerNotification({
        customerName,
        customerEmail,
        registrationDate: new Date().toISOString(),
      }),
    });

    // Wait for both emails to be sent
    const [welcomeResult, notificationResult] = await Promise.all([
      welcomeEmailPromise,
      notificationEmailPromise,
    ]);

    console.log('Welcome email sent:', welcomeResult);
    console.log('Notification email sent:', notificationResult);

    return NextResponse.json({
      success: true,
      message: 'Welcome emails sent successfully',
      welcomeEmailId: welcomeResult.data?.id,
      notificationEmailId: notificationResult.data?.id,
    });

  } catch (error) {
    console.error('Error sending welcome emails:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send welcome emails',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
