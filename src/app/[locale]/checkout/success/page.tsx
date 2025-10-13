'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { trackPurchase } from '@/lib/google-ads';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [orderStatus, setOrderStatus] = useState<string>('loading');
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Haal order gegevens op en valideer payment status
    if (orderId) {
      // Fetch order data voor validatie en conversie tracking
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.order) {
            setOrderData(data.order);

            // Valideer of betaling daadwerkelijk succesvol is
            if (data.order.payment_status === 'paid') {
              setOrderStatus('success');

              // Track Google Ads conversie alleen bij succesvolle betaling
              const totalAmount = parseFloat(data.order.total_amount);
              trackPurchase(
                data.order.order_number || orderId,
                totalAmount,
                data.order.payment_id
              );
            } else if (data.order.payment_status === 'pending') {
              setOrderStatus('pending');
            } else {
              // failed, cancelled, expired
              setOrderStatus('failed');
            }
          } else {
            setOrderStatus('error');
          }
        })
        .catch((error) => {
          console.error('Failed to fetch order data:', error);
          setOrderStatus('error');
        });
    } else {
      setOrderStatus('error');
    }
  }, [orderId]);

  // Loading state
  if (orderStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Controleren van betaling...</h1>
            <p className="text-gray-600">Even geduld terwijl we uw betaling verwerken.</p>
          </div>
        </div>
      </div>
    );
  }

  // Pending payment state
  if (orderStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Betaling in behandeling</h1>
            <p className="text-gray-600 mb-6">
              Uw betaling wordt nog verwerkt. U ontvangt een bevestigingsmail zodra de betaling is voltooid.
            </p>
            <div className="space-y-3">
              <Link href="/shop" className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                Terug naar shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Failed/cancelled payment state
  if (orderStatus === 'failed' || orderStatus === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Betaling niet voltooid</h1>
            <p className="text-gray-600 mb-6">
              Uw betaling is niet gelukt of werd geannuleerd. Probeer het opnieuw of neem contact met ons op als het probleem blijft bestaan.
            </p>
            <div className="space-y-3">
              <Link href="/shop" className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                Probeer opnieuw
              </Link>
              <a href="mailto:info@lumora-horticulture.nl" className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300">
                Contact opnemen
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state (only shown if payment_status === 'paid')
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
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
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bestelling succesvol!
          </h1>

          <p className="text-gray-600 mb-2">
            Bedankt voor uw bestelling. We hebben een bevestigingsmail gestuurd.
          </p>

          {orderData?.order_number && (
            <p className="text-sm text-gray-500 mb-6">
              Bestelnummer: <span className="font-mono font-semibold">{orderData.order_number}</span>
            </p>
          )}

          <div className="space-y-3">
            <Link
              href="/shop"
              className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
            >
              Terug naar shop
            </Link>
            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              Naar homepage
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Wat nu?</h3>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>U ontvangt een orderbevestiging per e-mail</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Uw bestelling wordt binnen 1-3 werkdagen verzonden</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>U ontvangt een track & trace code zodra uw pakket is verzonden</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Vragen? Neem contact met ons op via{' '}
            <a href="mailto:info@lumora-horticulture.nl" className="text-green-600 hover:underline">
              info@lumora-horticulture.nl
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
