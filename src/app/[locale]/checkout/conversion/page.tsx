'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

/**
 * Payment-return bridge. Verified conversion events are handled server-side
 * by the Mollie webhook; this page only waits for the resulting order status.
 */
export default function ConversionTrackingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order_id');
  const [conversionTracked, setConversionTracked] = useState(false);

  useEffect(() => {
    // Redirect if no order ID
    if (!orderId) {
      router.push('/shop');
      return;
    }

    // Fetch only the payment state. Purchase conversions are emitted from the
    // verified Mollie webhook; browser-side events could be forged or doubled.
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.order) {
          // Only track if payment is actually paid
          if (data.order.payment_status === 'paid') {
            setConversionTracked(true);

            // Redirect to success page after tracking
            setTimeout(() => {
              router.push(`/checkout/success?order_id=${encodeURIComponent(orderId)}`);
            }, 1000);
          } else {
            // Payment not completed, redirect to success page which will show proper status
            router.push(`/checkout/success?order_id=${encodeURIComponent(orderId)}`);
          }
        } else {
          // Order not found, redirect to shop
          router.push('/shop');
        }
      })
      .catch((error) => {
        console.error('Failed to fetch order data:', error);
        router.push('/shop');
      });
  }, [orderId, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              {conversionTracked ? (
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="animate-spin h-10 w-10 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {conversionTracked ? 'Bestelling verwerkt' : 'Verwerken van bestelling...'}
          </h1>

          <p className="text-gray-600">
            {conversionTracked
              ? 'U wordt doorgestuurd naar de bevestigingspagina.'
              : 'Even geduld terwijl we uw bestelling verwerken.'}
          </p>
        </div>
      </div>
    </div>
  );
}
