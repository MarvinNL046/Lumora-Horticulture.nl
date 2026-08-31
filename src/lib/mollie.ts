import { createMollieClient, PaymentMethod } from '@mollie/api-client';

let mollieClient: ReturnType<typeof createMollieClient> | null = null;

function getMollieClient(): ReturnType<typeof createMollieClient> {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (
    !apiKey ||
    apiKey.length < 20 ||
    (!apiKey.startsWith('live_') && !apiKey.startsWith('test_'))
  ) {
    throw new Error('MOLLIE_API_KEY is not configured correctly');
  }

  mollieClient ??= createMollieClient({ apiKey });
  return mollieClient;
}

/**
 * Maak een Mollie betaling aan
 */
export async function createPayment({
  amount,
  description,
  redirectUrl,
  webhookUrl,
  metadata,
  method,
  idempotencyKey,
}: {
  amount: number;
  description: string;
  redirectUrl: string;
  webhookUrl: string;
  metadata?: Record<string, any>;
  method?: PaymentMethod; // Optioneel: specificeer een betaalmethode of laat Mollie kiezen
  idempotencyKey?: string;
}) {
  try {
    const payment = await getMollieClient().payments.create({
      amount: {
        currency: 'EUR',
        value: amount.toFixed(2),
      },
      description,
      redirectUrl,
      webhookUrl,
      metadata,
      idempotencyKey,
      // Als geen method opgegeven, toont Mollie alle beschikbare betaalmethodes
      ...(method && { method }),
    });

    return payment;
  } catch (error) {
    console.error('Mollie payment creation error:', error);
    throw error;
  }
}

/**
 * Controleer de status van een betaling
 */
export async function getPaymentStatus(paymentId: string) {
  try {
    const payment = await getMollieClient().payments.get(paymentId);
    return payment;
  } catch (error) {
    console.error('Mollie payment status error:', error);
    throw error;
  }
}
