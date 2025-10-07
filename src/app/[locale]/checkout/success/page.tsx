'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [orderStatus, setOrderStatus] = useState<string>('pending');

  useEffect(() => {
    // In een productie-omgeving zou je hier de order status ophalen
    // Voor nu tonen we gewoon een success message
    if (orderId) {
      setOrderStatus('success');
    }
  }, [orderId]);

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

          {orderId && (
            <p className="text-sm text-gray-500 mb-6">
              Bestelnummer: <span className="font-mono font-semibold">{orderId}</span>
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
