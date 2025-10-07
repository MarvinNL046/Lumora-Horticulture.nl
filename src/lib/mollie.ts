import { createMollieClient, PaymentMethod } from '@mollie/api-client';

// Initialiseer Mollie client
export const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY!,
});

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
}: {
  amount: number;
  description: string;
  redirectUrl: string;
  webhookUrl: string;
  metadata?: Record<string, any>;
  method?: PaymentMethod; // Optioneel: specificeer een betaalmethode of laat Mollie kiezen
}) {
  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: amount.toFixed(2),
      },
      description,
      redirectUrl,
      webhookUrl,
      metadata,
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
    const payment = await mollieClient.payments.get(paymentId);
    return payment;
  } catch (error) {
    console.error('Mollie payment status error:', error);
    throw error;
  }
}
