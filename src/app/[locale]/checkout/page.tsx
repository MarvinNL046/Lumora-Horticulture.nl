'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { localizePathForLocale } from '@/lib/url-localizations';
import {
  calculateDiscountedPrice,
  calculateTotalPrice,
  getDiscountInfo,
  formatPrice,
} from '@/lib/volume-discount';
import { trackBeginCheckout } from '@/lib/google-ads';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'nl';
  const { items, getTotalPrice, clearCart, updateQuantity, removeItem } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('NL');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [recoveryCartId, setRecoveryCartId] = useState<string | null>(null);

  // Check for cart recovery parameter
  useEffect(() => {
    const cartRecoveryId = searchParams.get('cart_recovery');
    if (cartRecoveryId) {
      setRecoveryCartId(cartRecoveryId);
      console.log('Cart recovery detected:', cartRecoveryId);
    }
  }, [searchParams]);

  const t = {
    checkout: locale === 'de' ? 'Zur Kasse' : locale === 'en' ? 'Checkout' : 'Afrekenen',
    yourOrder: locale === 'de' ? 'Ihre Bestellung' : locale === 'en' ? 'Your Order' : 'Jouw Bestelling',
    emptyCart: locale === 'de' ? 'Ihr Warenkorb ist leer' : locale === 'en' ? 'Your cart is empty' : 'Je winkelwagen is leeg',
    continueShopping: locale === 'de' ? 'Weiter einkaufen' : locale === 'en' ? 'Continue shopping' : 'Verder winkelen',
    product: locale === 'de' ? 'Produkt' : locale === 'en' ? 'Product' : 'Product',
    quantity: locale === 'de' ? 'Anzahl' : locale === 'en' ? 'Quantity' : 'Aantal',
    price: locale === 'de' ? 'Preis' : locale === 'en' ? 'Price' : 'Prijs',
    subtotal: locale === 'de' ? 'Zwischensumme' : locale === 'en' ? 'Subtotal' : 'Subtotaal',
    discount: locale === 'de' ? 'Rabatt' : locale === 'en' ? 'Discount' : 'Korting',
    total: locale === 'de' ? 'Gesamt' : locale === 'en' ? 'Total' : 'Totaal',
    freeShipping: locale === 'de' ? 'Kostenloser Versand' : locale === 'en' ? 'Free Shipping' : 'Gratis Verzending',
    contactInfo: locale === 'de' ? 'Kontaktinformationen' : locale === 'en' ? 'Contact Information' : 'Contactgegevens',
    name: locale === 'de' ? 'Name' : locale === 'en' ? 'Name' : 'Naam',
    email: locale === 'de' ? 'E-Mail' : locale === 'en' ? 'Email' : 'Email',
    phone: locale === 'de' ? 'Telefon' : locale === 'en' ? 'Phone' : 'Telefoon',
    shippingAddress: locale === 'de' ? 'Lieferadresse' : locale === 'en' ? 'Shipping Address' : 'Bezorgadres',
    street: locale === 'de' ? 'Straße und Hausnummer' : locale === 'en' ? 'Street and house number' : 'Straat en huisnummer',
    postalCode: locale === 'de' ? 'Postleitzahl' : locale === 'en' ? 'Postal code' : 'Postcode',
    city: locale === 'de' ? 'Stadt' : locale === 'en' ? 'City' : 'Plaats',
    country: locale === 'de' ? 'Land' : locale === 'en' ? 'Country' : 'Land',
    placeOrder: locale === 'de' ? 'Bestellung aufgeben' : locale === 'en' ? 'Place Order' : 'Bestelling Plaatsen',
    processing: locale === 'de' ? 'Verarbeitung...' : locale === 'en' ? 'Processing...' : 'Bezig met verwerken...',
    pricePerPiece: locale === 'de' ? 'pro Stück' : locale === 'en' ? 'per piece' : 'per stuk',
    remove: locale === 'de' ? 'Entfernen' : locale === 'en' ? 'Remove' : 'Verwijderen',
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white flex items-center justify-center">
        <div className="text-center">
          <svg className="w-24 h-24 text-lumora-dark/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-3xl font-display font-bold text-lumora-dark mb-4">{t.emptyCart}</h1>
          <Link
            href={localizePathForLocale('/shop', locale)}
            className="inline-block px-8 py-3 bg-lumora-green-500 text-white rounded-xl font-semibold hover:bg-lumora-green-600 transition-colors"
          >
            {t.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    setCheckoutLoading(true);

    const totalPrice = getTotalPrice();

    // Track begin checkout in GA4
    trackBeginCheckout(
      items.map((item) => ({
        id: item.product_id,
        name: item.name,
        price: calculateDiscountedPrice(item.price, item.quantity),
        quantity: item.quantity,
        category: 'Horticulture Products',
      })),
      totalPrice
    );

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
          items: items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
          })),
          recovery_cart_id: recoveryCartId, // Track cart recovery
        }),
      });

      const data = await response.json();

      if (data.success && data.payment_url) {
        // Clear cart before redirect
        clearCart();
        // Redirect to Mollie payment page
        window.location.href = data.payment_url;
      } else {
        const errorMsg =
          locale === 'de'
            ? 'Bei der Bestellung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
            : locale === 'en'
            ? 'Something went wrong with the order. Please try again.'
            : 'Er is iets fout gegaan met de bestelling. Probeer het opnieuw.';
        alert(errorMsg);
        setCheckoutLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const errorMsg =
        locale === 'de'
          ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
          : locale === 'en'
          ? 'An error occurred. Please try again.'
          : 'Er is iets fout gegaan. Probeer het opnieuw.';
      alert(errorMsg);
      setCheckoutLoading(false);
    }
  };

  const totalWithoutDiscounts = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalPrice = getTotalPrice();
  const totalDiscounts = totalWithoutDiscounts - totalPrice;

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-display font-bold text-lumora-dark mb-8">{t.checkout}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 border border-lumora-dark/10">
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-6">{t.yourOrder}</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => {
                const discountInfo = getDiscountInfo(item.quantity);
                const discountedPrice = calculateDiscountedPrice(item.price, item.quantity);
                const itemTotal = calculateTotalPrice(item.price, item.quantity);

                return (
                  <div
                    key={item.product_id}
                    className="flex gap-4 pb-4 border-b border-lumora-dark/10"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lumora-dark mb-1">{item.name}</h3>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-lumora-dark/60">{t.quantity}:</span>
                        <div className="flex items-center gap-1 bg-lumora-cream/50 rounded-lg p-1">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(item.product_id, item.quantity - 1);
                              }
                            }}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-lumora-green-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center font-semibold text-lumora-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-lumora-green-500 hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product_id)}
                          className="ml-2 p-1.5 text-lumora-dark/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title={t.remove}
                          aria-label={t.remove}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-baseline gap-2">
                        {discountInfo.hasDiscount ? (
                          <>
                            <span className="text-sm text-lumora-dark/50 line-through">
                              {formatPrice(item.price)}
                            </span>
                            <span className="font-bold text-lumora-green-500">
                              {formatPrice(discountedPrice)}
                            </span>
                            <span className="text-xs text-lumora-green-600">
                              -{discountInfo.currentDiscount}%
                            </span>
                          </>
                        ) : (
                          <span className="font-bold text-lumora-dark">
                            {formatPrice(item.price)}
                          </span>
                        )}
                        <span className="text-xs text-lumora-dark/60">{t.pricePerPiece}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lumora-dark">{formatPrice(itemTotal)}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t-2 border-lumora-dark/20">
              <div className="flex justify-between text-lumora-dark/70">
                <span>{t.subtotal}:</span>
                <span>{formatPrice(totalWithoutDiscounts)}</span>
              </div>
              {totalDiscounts > 0 && (
                <div className="flex justify-between text-lumora-green-600 font-semibold">
                  <span>{t.discount}:</span>
                  <span>-{formatPrice(totalDiscounts)}</span>
                </div>
              )}
              <div className="flex justify-between text-lumora-green-600">
                <span>{t.freeShipping}:</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between text-2xl font-display font-bold text-lumora-dark pt-2 border-t border-lumora-dark/10">
                <span>{t.total}:</span>
                <span className="text-lumora-green-500">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-3xl shadow-soft-lg p-8 border border-lumora-dark/10">
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-lumora-dark mb-6">
                  {t.contactInfo}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-lumora-dark mb-1">
                      {t.name} *
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
                      {t.email} *
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
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-lumora-dark mb-6">
                  {t.shippingAddress}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-lumora-dark mb-1">
                      {t.street} *
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
                        {t.postalCode} *
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
                        {t.city} *
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
                      {t.country} *
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
                </div>
              </div>

              <button
                type="submit"
                disabled={checkoutLoading}
                className="w-full bg-lumora-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-lumora-green-600 transition-all duration-300 shadow-soft hover:shadow-soft-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? t.processing : t.placeOrder}
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-lumora-dark/60 mb-2">
                  {locale === 'de'
                    ? 'Sicher bezahlen mit:'
                    : locale === 'en'
                    ? 'Secure payment with:'
                    : 'Veilig betalen met:'}
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
                  {locale === 'de'
                    ? 'Gesichert durch Mollie'
                    : locale === 'en'
                    ? 'Secured by Mollie'
                    : 'Beveiligd door Mollie'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
