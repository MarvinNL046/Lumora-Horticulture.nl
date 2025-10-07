'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  brand: string;
  availability: string;
  metadata?: {
    [key: string]: any;
  };
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productSlug = params.slug as string;
  const locale = (params.locale as string) || 'nl';

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('NL');

  useEffect(() => {
    fetch(`/api/products/slug/${productSlug}?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [productSlug, locale]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    setCheckoutLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          shipping_address: {
            street,
            city,
            postal_code: postalCode,
            country,
          },
          items: [
            {
              product_id: product.id,
              quantity,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.success && data.payment_url) {
        // Redirect naar Mollie betaalpagina
        window.location.href = data.payment_url;
      } else {
        alert('Er is iets fout gegaan met de bestelling. Probeer het opnieuw.');
        setCheckoutLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Er is iets fout gegaan. Probeer het opnieuw.');
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product niet gevonden</div>
      </div>
    );
  }

  const totalPrice = parseFloat(product.price) * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product afbeelding en details */}
          <div>
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg mb-6">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                }}
              />
            </div>
            <h1 className="text-4xl font-display font-bold text-lumora-dark mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-lumora-dark/70 mb-6 leading-relaxed">{product.description}</p>

            {product.metadata && (
              <div className="bg-lumora-cream/30 rounded-2xl p-6 border border-lumora-dark/10">
                <h3 className="text-xl font-display font-semibold text-lumora-dark mb-4">Specificaties</h3>
                <dl className="space-y-3">
                  {Object.entries(product.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-lumora-dark/10 pb-2">
                      <dt className="text-lumora-dark/70 capitalize font-medium">{key}:</dt>
                      <dd className="font-semibold text-lumora-dark">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Checkout formulier */}
          <div>
            <div className="bg-white rounded-3xl shadow-soft-lg p-8 sticky top-8 border border-lumora-dark/10">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-display font-semibold text-lumora-dark">Prijs:</span>
                  <span className="text-3xl font-bold text-lumora-green-500">
                    €{parseFloat(product.price).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-lumora-dark font-medium">Aantal:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 px-3 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-lumora-dark/10">
                  <span className="text-xl font-display font-semibold text-lumora-dark">Totaal:</span>
                  <span className="text-3xl font-bold text-lumora-green-500">
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-lumora-dark mb-4">Contactgegevens</h3>

                <div>
                  <label className="block text-sm font-medium text-lumora-dark mb-1">
                    Naam *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-lumora-dark mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-lumora-dark mb-1">
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                  />
                </div>

                <h3 className="text-xl font-display font-semibold text-lumora-dark mb-4 pt-4">Bezorgadres</h3>

                <div>
                  <label className="block text-sm font-medium text-lumora-dark mb-1">
                    Straat en huisnummer *
                  </label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-4 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-lumora-dark mb-1">
                      Postcode *
                    </label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-4 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-lumora-dark mb-1">
                      Plaats *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-lumora-dark mb-1">
                    Land *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                  >
                    <option value="NL">Nederland</option>
                    <option value="BE">België</option>
                    <option value="DE">Duitsland</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={checkoutLoading || product.availability !== 'in stock'}
                  className="w-full bg-lumora-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-lumora-green-600 transition-all duration-300 shadow-soft hover:shadow-soft-md disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
                >
                  {checkoutLoading
                    ? 'Bezig met bestellen...'
                    : product.availability !== 'in stock'
                    ? 'Niet beschikbaar'
                    : 'Bestellen'}
                </button>

                <div className="text-center mt-6">
                  <p className="text-sm text-lumora-dark/60 mb-2">
                    Veilig betalen met:
                  </p>
                  <div className="flex justify-center items-center gap-2 text-xs text-lumora-dark/70 font-medium">
                    <span>iDEAL</span>
                    <span>•</span>
                    <span>Creditcard</span>
                    <span>•</span>
                    <span>Apple Pay</span>
                    <span>•</span>
                    <span>PayPal</span>
                  </div>
                  <p className="text-xs text-lumora-dark/50 mt-2">
                    Beveiligd door Mollie
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
