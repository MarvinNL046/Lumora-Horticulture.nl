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
import { useUser } from '@stackframe/stack';

interface SavedAddress {
  id: string
  name: string
  street: string
  city: string
  postal_code: string
  country: string
  phone: string | null
  is_default: boolean
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'nl';
  const { items, getTotalPrice, clearCart, updateQuantity, removeItem } = useCart();
  const user = useUser();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('NL');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [recoveryCartId, setRecoveryCartId] = useState<string | null>(null);

  // Saved addresses
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [saveAddressForFuture, setSaveAddressForFuture] = useState(false);

  // Email recognition for guest users
  const [emailExists, setEmailExists] = useState(false);
  const [suggestedData, setSuggestedData] = useState<{ customer_name: string; customer_phone: string | null } | null>(null);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);

  // Auto-fill form with user data if logged in
  useEffect(() => {
    if (user) {
      // Fill in name and email from Stack Auth
      if (user.displayName && !customerName) {
        setCustomerName(user.displayName);
      }
      if (user.primaryEmail && !customerEmail) {
        setCustomerEmail(user.primaryEmail);
      }
    }
  }, [user]);

  // Fetch saved addresses for logged-in users
  useEffect(() => {
    if (user) {
      fetch('/api/addresses')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.addresses) {
            setSavedAddresses(data.addresses);
            // Auto-select default address if available
            const defaultAddress = data.addresses.find((addr: SavedAddress) => addr.is_default);
            if (defaultAddress) {
              setSelectedAddressId(defaultAddress.id);
              fillAddressFields(defaultAddress);
            }
          }
        })
        .catch((error) => console.error('Error fetching addresses:', error));
    }
  }, [user]);

  // Check for cart recovery parameter
  useEffect(() => {
    const cartRecoveryId = searchParams.get('cart_recovery');
    if (cartRecoveryId) {
      setRecoveryCartId(cartRecoveryId);
      console.log('Cart recovery detected:', cartRecoveryId);
    }
  }, [searchParams]);

  // Email recognition for guest users (debounced)
  useEffect(() => {
    if (!user && customerEmail && customerEmail.includes('@')) {
      setEmailCheckLoading(true);

      const timeoutId = setTimeout(async () => {
        try {
          const response = await fetch('/api/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: customerEmail }),
          });

          const data = await response.json();

          if (data.success && data.exists) {
            setEmailExists(true);
            setSuggestedData(data.order_data);
            setShowEmailPrompt(true);
          } else {
            setEmailExists(false);
            setSuggestedData(null);
            setShowEmailPrompt(false);
          }
        } catch (error) {
          console.error('Error checking email:', error);
        } finally {
          setEmailCheckLoading(false);
        }
      }, 800); // 800ms debounce

      return () => clearTimeout(timeoutId);
    } else {
      setEmailExists(false);
      setSuggestedData(null);
      setShowEmailPrompt(false);
    }
  }, [customerEmail, user]);

  // Auto-save cart as abandoned when email is entered on checkout page
  useEffect(() => {
    if (!customerEmail || !customerEmail.includes('@') || items.length === 0) {
      return;
    }

    // Debounce: save 3 seconds after email is entered
    const timeoutId = setTimeout(async () => {
      try {
        const totalPrice = items.reduce((total, item) => {
          return total + calculateTotalPrice(item.price, item.quantity);
        }, 0);

        await fetch('/api/cart/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_email: customerEmail,
            customer_name: customerName || undefined,
            cart_data: items,
            total_amount: totalPrice,
            locale,
          }),
        });
        console.log('Checkout cart auto-saved for abandonment tracking');
      } catch (error) {
        console.error('Failed to save checkout cart:', error);
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [customerEmail, items, customerName, locale]);

  // Fill address fields from selected saved address
  const fillAddressFields = (address: SavedAddress) => {
    setStreet(address.street);
    setCity(address.city);
    setPostalCode(address.postal_code);
    setCountry(address.country);
    if (address.phone) {
      setCustomerPhone(address.phone);
    }
  };

  // Handle address selection
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    if (addressId === '') {
      // Clear address fields if "new address" is selected
      setStreet('');
      setCity('');
      setPostalCode('');
      setCountry('NL');
      return;
    }
    const address = savedAddresses.find((addr) => addr.id === addressId);
    if (address) {
      fillAddressFields(address);
    }
  };

  // Apply suggested data from previous order
  const applySuggestedData = () => {
    if (suggestedData) {
      if (suggestedData.customer_name && !customerName) {
        setCustomerName(suggestedData.customer_name);
      }
      if (suggestedData.customer_phone && !customerPhone) {
        setCustomerPhone(suggestedData.customer_phone);
      }
    }
    setShowEmailPrompt(false);
  };

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
    selectAddress: locale === 'de' ? 'Adresse wählen' : locale === 'en' ? 'Select address' : 'Selecteer adres',
    newAddress: locale === 'de' ? 'Neue Adresse eingeben' : locale === 'en' ? 'Enter new address' : 'Nieuw adres invoeren',
    manageAddresses: locale === 'de' ? 'Adressen verwalten' : locale === 'en' ? 'Manage addresses' : 'Adressen beheren',
    saveAddress: locale === 'de' ? 'Adresse für zukünftige Bestellungen speichern' : locale === 'en' ? 'Save address for future orders' : 'Adres opslaan voor toekomstige bestellingen',
    street: locale === 'de' ? 'Straße und Hausnummer' : locale === 'en' ? 'Street and house number' : 'Straat en huisnummer',
    postalCode: locale === 'de' ? 'Postleitzahl' : locale === 'en' ? 'Postal code' : 'Postcode',
    city: locale === 'de' ? 'Stadt' : locale === 'en' ? 'City' : 'Plaats',
    country: locale === 'de' ? 'Land' : locale === 'en' ? 'Country' : 'Land',
    placeOrder: locale === 'de' ? 'Bestellung aufgeben' : locale === 'en' ? 'Place Order' : 'Bestelling Plaatsen',
    processing: locale === 'de' ? 'Verarbeitung...' : locale === 'en' ? 'Processing...' : 'Bezig met verwerken...',
    pricePerPiece: locale === 'de' ? 'pro Stück' : locale === 'en' ? 'per piece' : 'per stuk',
    remove: locale === 'de' ? 'Entfernen' : locale === 'en' ? 'Remove' : 'Verwijderen',
    emailRecognized: locale === 'de' ? 'Willkommen zurück!' : locale === 'en' ? 'Welcome back!' : 'Welkom terug!',
    emailRecognizedText: locale === 'de'
      ? 'Wir haben Ihre E-Mail-Adresse erkannt. Sie haben bereits bei uns bestellt.'
      : locale === 'en'
      ? 'We recognized your email address. You have ordered with us before.'
      : 'We herkennen je e-mailadres. Je hebt eerder bij ons besteld.',
    loginSuggestion: locale === 'de'
      ? 'Möchten Sie sich anmelden für ein besseres Einkaufserlebnis?'
      : locale === 'en'
      ? 'Would you like to log in for a better shopping experience?'
      : 'Wil je inloggen voor een betere winkelervaring?',
    loginButton: locale === 'de' ? 'Anmelden' : locale === 'en' ? 'Sign in' : 'Inloggen',
    continueAsGuest: locale === 'de' ? 'Als Gast fortfahren' : locale === 'en' ? 'Continue as guest' : 'Verder als gast',
    usePreviousInfo: locale === 'de' ? 'Vorherige Daten verwenden' : locale === 'en' ? 'Use previous information' : 'Vorige gegevens gebruiken',
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
          locale: locale, // Store locale for recovery emails
        }),
      });

      const data = await response.json();

      if (data.success && data.payment_url) {
        // Save address for future orders if checkbox is checked
        if (user && saveAddressForFuture && selectedAddressId === '') {
          // Save asynchronously in background (don't wait for response)
          fetch('/api/addresses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: locale === 'de' ? 'Lieferadresse' : locale === 'en' ? 'Delivery Address' : 'Bezorgadres',
              street,
              city,
              postal_code: postalCode,
              country,
              phone: customerPhone || null,
              is_default: savedAddresses.length === 0, // Set as default if it's the first address
            }),
          }).catch(err => console.error('Failed to save address:', err));
        }

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

  // Check if cart contains NEEMX PRO products (same day shipping) or plugs (48h)
  const hasNeemxPro = items.some(item => item.slug?.startsWith('neemx-pro'));
  const hasPlugsOrOther = items.some(item => !item.slug?.startsWith('neemx-pro'));

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-lumora-dark mb-4">{t.checkout}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-lumora-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <span className="text-sm font-semibold text-lumora-dark">
                {locale === 'de' ? 'Daten eingeben' : locale === 'en' ? 'Your details' : 'Jouw gegevens'}
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-lumora-dark/20"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-lumora-dark/20 text-lumora-dark/50 rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <span className="text-sm text-lumora-dark/50">
                {locale === 'de' ? 'Bezahlen' : locale === 'en' ? 'Payment' : 'Betalen'}
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-lumora-dark/20"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-lumora-dark/20 text-lumora-dark/50 rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <span className="text-sm text-lumora-dark/50">
                {locale === 'de' ? 'Bestätigung' : locale === 'en' ? 'Confirmation' : 'Bevestiging'}
              </span>
            </div>
          </div>
        </div>

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
                    className="flex flex-col sm:flex-row gap-4 pb-4 border-b border-lumora-dark/10"
                  >
                    <div className="flex gap-4 flex-1">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lumora-dark mb-1">{item.name}</h3>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
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
                            className="ml-auto sm:ml-2 p-1.5 text-lumora-dark/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title={t.remove}
                            aria-label={t.remove}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex items-baseline gap-2 flex-wrap">
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
                    </div>

                    {/* Total - clearly visible on all screens */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 px-4 py-2 sm:p-0 bg-lumora-cream/30 sm:bg-transparent rounded-lg sm:rounded-none border sm:border-0 border-lumora-green-500/20">
                      <span className="text-sm sm:text-xs text-lumora-dark/60 font-medium uppercase tracking-wide">
                        {t.total}
                      </span>
                      <div className="text-xl sm:text-base font-bold text-lumora-green-500">
                        {formatPrice(itemTotal)}
                      </div>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-lumora-dark mb-1">
                      {t.email} *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                      />
                      {emailCheckLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg className="animate-spin h-5 w-5 text-lumora-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email Recognition Prompt */}
                  {!user && showEmailPrompt && emailExists && (
                    <div className="bg-gradient-to-r from-lumora-green-500/10 to-lumora-gold/10 rounded-xl p-5 border-2 border-lumora-green-500/30">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <svg className="w-6 h-6 text-lumora-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lumora-dark mb-1">{t.emailRecognized}</h3>
                          <p className="text-sm text-lumora-dark/80 mb-2">{t.emailRecognizedText}</p>
                          <p className="text-sm text-lumora-dark/70 mb-3">{t.loginSuggestion}</p>

                          <div className="flex flex-col sm:flex-row gap-2">
                            <Link
                              href="/handler/signin"
                              className="px-4 py-2 bg-lumora-green-500 text-white rounded-lg font-medium hover:bg-lumora-green-600 transition-colors text-center text-sm"
                            >
                              {t.loginButton}
                            </Link>
                            {suggestedData && (suggestedData.customer_name || suggestedData.customer_phone) && (
                              <button
                                onClick={applySuggestedData}
                                className="px-4 py-2 bg-lumora-gold/20 text-lumora-dark rounded-lg font-medium hover:bg-lumora-gold/30 transition-colors text-sm"
                              >
                                {t.usePreviousInfo}
                              </button>
                            )}
                            <button
                              onClick={() => setShowEmailPrompt(false)}
                              className="px-4 py-2 bg-lumora-cream/50 text-lumora-dark rounded-lg font-medium hover:bg-lumora-cream transition-colors text-sm"
                            >
                              {t.continueAsGuest}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-lumora-dark mb-6">
                  {t.shippingAddress}
                </h2>

                <div className="space-y-4">
                  {/* Address Selector for logged-in users */}
                  {user && savedAddresses.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-lumora-dark">
                          {t.selectAddress}
                        </label>
                        <Link
                          href={localizePathForLocale('/account/addresses', locale)}
                          className="text-sm text-lumora-green-500 hover:text-lumora-green-600 font-medium transition-colors"
                        >
                          {t.manageAddresses}
                        </Link>
                      </div>
                      <select
                        value={selectedAddressId}
                        onChange={(e) => handleAddressSelect(e.target.value)}
                        className="w-full px-4 py-2 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                      >
                        <option value="">{t.newAddress}</option>
                        {savedAddresses.map((address) => (
                          <option key={address.id} value={address.id}>
                            {address.name} - {address.street}, {address.city}
                            {address.is_default ? ` (${locale === 'de' ? 'Standard' : locale === 'en' ? 'Default' : 'Standaard'})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
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
                        <option value="DE">Deutschland</option>
                      </select>
                    </div>
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

                  {/* Save address checkbox - only for logged-in users entering new address */}
                  {user && selectedAddressId === '' && (
                    <div className="flex items-start gap-3 p-4 bg-lumora-cream/20 rounded-xl border border-lumora-green-500/20">
                      <input
                        type="checkbox"
                        id="saveAddress"
                        checked={saveAddressForFuture}
                        onChange={(e) => setSaveAddressForFuture(e.target.checked)}
                        className="mt-1 w-4 h-4 text-lumora-green-500 border-lumora-dark/20 rounded focus:ring-lumora-green-500"
                      />
                      <label htmlFor="saveAddress" className="text-sm text-lumora-dark cursor-pointer">
                        {t.saveAddress}
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={checkoutLoading}
                className="w-full bg-lumora-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-lumora-green-600 transition-all duration-300 shadow-soft hover:shadow-soft-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? t.processing : t.placeOrder}
              </button>

              {/* Trust Bar */}
              <div className="bg-lumora-green-50 border border-lumora-green-200 rounded-xl p-4 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lumora-green-500">✓</span>
                    <span className="text-sm font-medium text-lumora-dark">
                      {locale === 'de' ? 'Gratis Versand NL/BE/DE' : locale === 'en' ? 'Free Shipping NL/BE/DE' : 'Gratis verzending NL/BE/DE'}
                    </span>
                  </div>
                  {/* Show delivery time based on cart contents */}
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lumora-green-500">🚚</span>
                    <span className="text-sm font-medium text-lumora-dark">
                      {hasNeemxPro && !hasPlugsOrOther
                        ? (locale === 'de' ? 'Versand am selben Tag' : locale === 'en' ? 'Same day shipping' : 'Dezelfde dag verzonden')
                        : (locale === 'de' ? 'Innerhalb 48 Std.' : locale === 'en' ? 'Within 48h' : 'Binnen 48 uur')
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lumora-green-500">↩</span>
                    <span className="text-sm font-medium text-lumora-dark">
                      {locale === 'de' ? '14 Tage Rückgaberecht' : locale === 'en' ? '14 Days Return' : '14 dagen bedenktijd'}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lumora-green-500">🔒</span>
                    <span className="text-sm font-medium text-lumora-dark">
                      {locale === 'de' ? 'Sicher bezahlen' : locale === 'en' ? 'Secure Payment' : 'Veilig betalen'}
                    </span>
                  </div>
                </div>
                {/* NEEMX PRO return policy note */}
                {hasNeemxPro && (
                  <div className="mt-3 pt-3 border-t border-lumora-green-200/50">
                    <p className="text-xs text-lumora-dark/70 text-center">
                      {locale === 'de'
                        ? '↩ NEEMX PRO: Rückgabe nur bei ungeöffneten Flaschen. Versandkosten werden nach Prüfung erstattet.'
                        : locale === 'en'
                        ? '↩ NEEMX PRO: Return only for unopened bottles. Shipping costs refunded after inspection.'
                        : '↩ NEEMX PRO: Retour alleen bij ongeopende flesjes. Verzendkosten worden na controle terugbetaald.'
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Help Section */}
              <div className="bg-lumora-cream/30 border border-lumora-dark/10 rounded-xl p-4 mt-4">
                <p className="text-sm font-medium text-lumora-dark text-center mb-3">
                  {locale === 'de' ? 'Fragen? Wir helfen gerne!' : locale === 'en' ? 'Questions? We\'re here to help!' : 'Vragen? We helpen je graag!'}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href="https://wa.me/31638382564"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a
                    href="mailto:info@lumorahorticulture.nl"
                    className="inline-flex items-center gap-2 bg-lumora-dark/10 text-lumora-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-lumora-dark/20 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm font-medium text-lumora-dark text-center mb-3">
                  {locale === 'de' ? 'Sicher bezahlen mit:' : locale === 'en' ? 'Secure payment with:' : 'Veilig betalen met:'}
                </p>
                <div className="flex justify-center items-center gap-3 flex-wrap">
                  <span className="bg-[#CC0066] text-white text-sm font-bold px-3 py-1 rounded-lg">iDEAL</span>
                  <span className="bg-gray-800 text-white text-sm font-bold px-3 py-1 rounded-lg">VISA</span>
                  <span className="bg-[#003087] text-white text-sm font-bold px-3 py-1 rounded-lg">PayPal</span>
                  <span className="bg-[#FF5F00] text-white text-sm font-bold px-3 py-1 rounded-lg">Mastercard</span>
                  <span className="bg-[#005B9A] text-white text-sm font-bold px-3 py-1 rounded-lg">Bancontact</span>
                  <span className="bg-[#E52B50] text-white text-sm font-bold px-2.5 py-1 rounded-lg">Apple Pay</span>
                </div>
                <p className="text-xs text-lumora-dark/50 mt-3 text-center">
                  {locale === 'de' ? 'Gesichert durch Mollie' : locale === 'en' ? 'Secured by Mollie' : 'Beveiligd door Mollie'}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
