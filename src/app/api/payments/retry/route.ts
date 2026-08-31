import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/../convex/_generated/api';
import type { Id } from '@/../convex/_generated/dataModel';
import { convex, convexServerAuth } from '@/lib/convex';
import {
  InvalidRequestBodyError,
  readLimitedJson,
  RequestBodyTooLargeError,
} from '@/lib/limited-json';
import { createPayment } from '@/lib/mollie';
import {
  PaymentRetryConfigurationError,
  verifyPaymentRetryToken,
  type PaymentRetryTokenPayload,
} from '@/lib/payment-retry-token';
import { getCanonicalBaseUrl } from '@/lib/canonical-base-url';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_RETRY_BODY_BYTES = 4_096;

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  Pragma: 'no-cache',
};

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: NO_STORE_HEADERS,
  });
}

function verifyToken(token: unknown): PaymentRetryTokenPayload | NextResponse {
  if (typeof token !== 'string') {
    return json(
      { success: false, code: 'INVALID_RETRY_LINK', error: 'Invalid or expired payment retry link' },
      401,
    );
  }

  try {
    return verifyPaymentRetryToken(token);
  } catch (error) {
    if (error instanceof PaymentRetryConfigurationError) {
      console.error('Payment retry is disabled: PAYMENT_RETRY_SECRET is not configured');
      return json(
        { success: false, code: 'RETRY_NOT_CONFIGURED', error: 'Payment retry is temporarily unavailable' },
        503,
      );
    }

    return json(
      { success: false, code: 'INVALID_RETRY_LINK', error: 'Invalid or expired payment retry link' },
      401,
    );
  }
}

function canonicalCheckoutUrl(
  baseUrl: string,
  locale: PaymentRetryTokenPayload['locale'],
  path: string,
  orderId: string,
): string {
  const localePrefix = locale === 'nl' ? '' : `/${locale}`;
  const url = new URL(`${baseUrl}${localePrefix}${path}`);
  url.searchParams.set('order_id', orderId);
  return url.toString();
}

function bearerToken(request: NextRequest): string | null {
  const authorization = request.headers.get('authorization');
  if (!authorization || authorization.length > 2_100) return null;
  const match = authorization.match(/^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/);
  return match?.[1] ?? null;
}

export async function GET(request: NextRequest) {
  const checkedToken = verifyToken(bearerToken(request));
  if (checkedToken instanceof NextResponse) return checkedToken;

  try {
    const context = await convex.query(api.paymentAttempts.getRetryContext, {
      ...convexServerAuth(),
      order_id: checkedToken.orderId as Id<'orders'>,
    });

    if (context.kind === 'not_found') {
      return json(
        { success: false, code: 'INVALID_RETRY_LINK', error: 'Invalid or expired payment retry link' },
        404,
      );
    }

    if (context.kind === 'paid') {
      return json(
        { success: false, code: 'ALREADY_PAID', error: 'This order has already been paid' },
        409,
      );
    }

    return json({
      success: true,
      order: {
        customer_name: context.order.customer_name,
        total_amount: context.order.total_amount,
        payment_status: context.order.payment_status,
        can_retry: true,
      },
    });
  } catch (error) {
    console.error('Failed to load payment retry context:', error);
    return json(
      { success: false, code: 'RETRY_UNAVAILABLE', error: 'Payment retry is temporarily unavailable' },
      503,
    );
  }
}

export async function POST(request: NextRequest) {
  const mediaType = request.headers
    .get('content-type')
    ?.split(';', 1)[0]
    .trim()
    .toLowerCase();
  if (mediaType !== 'application/json') {
    return json({ success: false, error: 'Invalid request' }, 400);
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await readLimitedJson(request, MAX_RETRY_BODY_BYTES);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new InvalidRequestBodyError();
    }
    body = parsed as Record<string, unknown>;
    if (Object.keys(body).some((key) => key !== 'token')) {
      throw new InvalidRequestBodyError();
    }
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return json({ success: false, error: 'Payload too large' }, 413);
    }
    return json({ success: false, error: 'Invalid request' }, 400);
  }

  const checkedToken = verifyToken(body.token);
  if (checkedToken instanceof NextResponse) return checkedToken;

  let baseUrl: string;
  try {
    // Fail before reserving an attempt: redirect and webhook origins are part
    // of the payment's security boundary.
    baseUrl = getCanonicalBaseUrl();
  } catch {
    console.error('Payment retry is disabled: canonical base URL is invalid');
    return json(
      { success: false, code: 'RETRY_NOT_CONFIGURED', error: 'Payment retry is temporarily unavailable' },
      503,
    );
  }

  let reservedAttemptId: Id<'paymentAttempts'> | null = null;

  try {
    const reservation = await convex.mutation(api.paymentAttempts.reserveAttempt, {
      ...convexServerAuth(),
      order_id: checkedToken.orderId as Id<'orders'>,
      kind: 'retry',
      request_key: `retry:${checkedToken.jti}`,
    });

    if (reservation.kind === 'not_found') {
      return json(
        { success: false, code: 'INVALID_RETRY_LINK', error: 'Invalid or expired payment retry link' },
        404,
      );
    }

    if (reservation.kind === 'already_paid') {
      return json(
        { success: false, code: 'ALREADY_PAID', error: 'This order has already been paid' },
        409,
      );
    }

    if (reservation.kind === 'not_retryable') {
      return json(
        { success: false, code: 'NOT_RETRYABLE', error: 'This payment cannot be retried' },
        409,
      );
    }

    if (reservation.kind === 'in_progress') {
      return json(
        {
          success: false,
          code: 'PAYMENT_CREATION_IN_PROGRESS',
          error: 'A payment link is already being created. Please try again in a moment.',
        },
        409,
      );
    }

    if (reservation.kind === 'reusable') {
      return json({
        success: true,
        payment_url: reservation.checkout_url,
      });
    }

    reservedAttemptId = reservation.attempt_id;
    const payment = await createPayment({
      amount: reservation.amount_cents / 100,
      description: `Bestelling ${checkedToken.orderId}`,
      redirectUrl: canonicalCheckoutUrl(
        baseUrl,
        checkedToken.locale,
        '/checkout/conversion',
        checkedToken.orderId,
      ),
      webhookUrl: `${baseUrl}/api/webhooks/mollie`,
      metadata: {
        order_id: checkedToken.orderId,
        payment_attempt_id: reservation.attempt_id,
        kind: 'retry',
      },
      idempotencyKey: `lumora-${reservation.attempt_id}`,
    });
    const checkoutUrl = payment.getCheckoutUrl();

    if (!checkoutUrl) {
      throw new Error('Mollie did not return a checkout URL');
    }

    const providerStatus =
      payment.status === 'pending' || payment.status === 'authorized'
        ? payment.status
        : 'open';

    try {
      await convex.mutation(api.paymentAttempts.attachProviderPayment, {
        ...convexServerAuth(),
        attempt_id: reservation.attempt_id,
        provider_payment_id: payment.id,
        checkout_url: checkoutUrl,
        provider_status: providerStatus,
      });
    } catch (error) {
      // Do not create a second provider payment. Mollie metadata still binds
      // this payment to the reserved attempt, so the webhook can reconcile it.
      console.error('Payment was created but could not be attached to its attempt:', error);
    }

    return json({
      success: true,
      payment_url: checkoutUrl,
    });
  } catch (error) {
    console.error('Payment retry failed:', error);

    if (reservedAttemptId) {
      try {
        await convex.mutation(api.paymentAttempts.failAttemptCreation, {
          ...convexServerAuth(),
          attempt_id: reservedAttemptId,
          reason: error instanceof Error ? error.message.slice(0, 500) : 'Payment creation failed',
        });
      } catch (markFailedError) {
        console.error('Could not mark failed payment attempt:', markFailedError);
      }
    }

    return json(
      { success: false, code: 'RETRY_UNAVAILABLE', error: 'Payment retry is temporarily unavailable' },
      503,
    );
  }
}
