'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  VOLUME_DISCOUNT_TIERS,
  calculateDiscountedPrice,
  calculateTotalPrice,
  getDiscountInfo,
  formatPrice,
} from '@/lib/volume-discount';
import { localizePathForLocale } from '@/lib/url-localizations';
import { trackViewItem, trackBeginCheckout } from '@/lib/google-ads';

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

  // Translations
  const t = {
    freeShipping: locale === 'de' ? 'Immer Kostenloser Versand!' : locale === 'en' ? 'Always Free Shipping!' : 'Altijd Gratis Verzending!',
    freeShippingDesc: locale === 'de' ? 'Kostenlose Lieferung innerhalb der Niederlande, Belgien und Deutschland' : locale === 'en' ? 'Free delivery within Netherlands, Belgium and Germany' : 'Gratis levering binnen Nederland, België en Duitsland',
    volumeDiscount: locale === 'de' ? 'Mengenrabatt' : locale === 'en' ? 'Volume Discount' : 'Staffelkorting',
    normalPrice: locale === 'de' ? 'Normalpreis' : locale === 'en' ? 'Normal price' : 'Normale prijs',
    pieces: locale === 'de' ? 'Stück' : locale === 'en' ? 'pieces' : 'stuks',
    tip: locale === 'de' ? 'Tipp' : locale === 'en' ? 'Tip' : 'Tip',
    tipText: (qty: number, discount: number) =>
      locale === 'de' ? `Bei ${qty} Stück erhalten Sie ${discount}% Rabatt!` :
      locale === 'en' ? `Order ${qty} pieces and get ${discount}% discount!` :
      `Bij ${qty} stuks krijg je ${discount}% korting!`,
    pricePerPiece: locale === 'de' ? 'Preis pro Stück:' : locale === 'en' ? 'Price per piece:' : 'Prijs per stuk:',
    pricePerPackage: locale === 'de' ? 'Preis pro 25 Stück:' : locale === 'en' ? 'Price per 25 units:' : 'Prijs per 25 stuks:',
    discount: locale === 'de' ? 'Rabatt' : locale === 'en' ? 'discount' : 'korting',
    quantity: locale === 'de' ? 'Anzahl:' : locale === 'en' ? 'Quantity:' : 'Aantal:',
    quantityPackages: locale === 'de' ? 'Anzahl Verpackungen:' : locale === 'en' ? 'Number of packages:' : 'Aantal verpakkingen:',
    packageNote: locale === 'de' ? '1 Verpackung = 25 Stück' : locale === 'en' ? '1 package = 25 units' : '1 verpakking = 25 stuks',
    trayBoxNote84: locale === 'de' ? '1 Karton enthält 8 Tabletts' : locale === 'en' ? '1 box contains 8 trays' : '1 doos bevat 8 trays',
    trayBoxNote104: locale === 'de' ? '1 Karton enthält 7 Tabletts' : locale === 'en' ? '1 box contains 7 trays' : '1 doos bevat 7 trays',
    subtotalNoDiscount: locale === 'de' ? 'Zwischensumme ohne Rabatt:' : locale === 'en' ? 'Subtotal without discount:' : 'Subtotaal zonder korting:',
    volumeDiscountLabel: locale === 'de' ? 'Mengenrabatt' : locale === 'en' ? 'Volume discount' : 'Staffelkorting',
    total: locale === 'de' ? 'Gesamt:' : locale === 'en' ? 'Total:' : 'Totaal:',
    orderText: (qty: number, discount: number) =>
      locale === 'de' ? `Bestellen Sie ${qty} Stück und erhalten Sie ${discount}% Rabatt!` :
      locale === 'en' ? `Order ${qty} pieces and get ${discount}% discount!` :
      `Bestel ${qty} stuks en krijg ${discount}% korting!`,
    b2bButton: locale === 'de' ? '🏢 Geschäftlich Bestellen (B2B)' : locale === 'en' ? '🏢 Business Orders (B2B)' : '🏢 Zakelijk Bestellen (B2B)',
    b2bText: locale === 'de' ? 'Große Mengen? Kontaktieren Sie uns für maßgeschneiderte Lösungen und zusätzliche Vorteile' : locale === 'en' ? 'Large orders? Contact us for custom solutions and additional benefits' : 'Grote afname? Neem contact op voor maatwerk en extra voordeel',
  };

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

          // Track product view in GA4
          trackViewItem({
            id: data.product.id,
            name: data.product.name,
            price: parseFloat(data.product.price),
            category: 'Horticulture Products',
          });
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

    // Track begin checkout in GA4
    const basePrice = parseFloat(product.price);
    const totalPrice = calculateTotalPrice(basePrice, quantity);

    trackBeginCheckout(
      [
        {
          id: product.id,
          name: product.name,
          price: calculateDiscountedPrice(basePrice, quantity),
          quantity: quantity,
          category: 'Horticulture Products',
        },
      ],
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

  const basePrice = parseFloat(product.price);
  const discountInfo = getDiscountInfo(quantity);
  const discountedPrice = calculateDiscountedPrice(basePrice, quantity);
  const totalPrice = calculateTotalPrice(basePrice, quantity);
  const totalDiscount = (basePrice * quantity) - totalPrice;

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

            {/* Staffelkorting Tabel */}
            <div className="bg-gradient-to-br from-lumora-green-500/10 to-lumora-green-600/5 rounded-2xl p-6 border-2 border-lumora-green-500/20 mb-6">
              <h3 className="text-xl font-display font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <span className="text-2xl">💰</span> {t.volumeDiscount}
              </h3>
              <div className="space-y-2">
                {VOLUME_DISCOUNT_TIERS.map((tier, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-xl transition-all ${
                      quantity >= tier.minQuantity &&
                      (tier.maxQuantity === null || quantity <= tier.maxQuantity)
                        ? 'bg-lumora-green-500 text-white font-semibold shadow-soft'
                        : 'bg-white/60 text-lumora-dark/70'
                    }`}
                  >
                    <span className="font-medium">
                      {tier.minQuantity}
                      {tier.maxQuantity ? `-${tier.maxQuantity}` : '+'} {t.pieces}
                    </span>
                    <span className="font-bold">
                      {tier.discountPercentage === 0
                        ? t.normalPrice
                        : `-${tier.discountPercentage}%`}
                    </span>
                  </div>
                ))}
              </div>
              {discountInfo.nextTier && (
                <p className="text-sm text-lumora-dark/70 mt-4 bg-white/60 rounded-lg p-3 border border-lumora-dark/10">
                  💡 <strong>{t.tip}:</strong> {t.tipText(discountInfo.nextTier.quantity, discountInfo.nextTier.discount)}
                </p>
              )}
            </div>

            {/* Gratis Verzending Badge */}
            <div className="bg-gradient-to-r from-lumora-green-500 to-lumora-green-600 rounded-2xl p-6 text-white mb-6 shadow-soft-lg">
              <div className="flex items-center gap-4">
                <span className="text-4xl">📦</span>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-1">{t.freeShipping}</h3>
                  <p className="text-lumora-cream/90">
                    {t.freeShippingDesc}
                  </p>
                </div>
              </div>
            </div>

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
                {/* Gratis Verzending Badge - Compact */}
                <div className="bg-gradient-to-r from-lumora-green-500 to-lumora-green-600 rounded-xl p-4 text-white mb-6 text-center shadow-soft">
                  <p className="font-bold text-lg">📦 {t.freeShipping}</p>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-display font-semibold text-lumora-dark">
                    {productSlug === 'transportdoos-vouwdoos' ? t.pricePerPackage : t.pricePerPiece}
                  </span>
                  <div className="text-right">
                    {discountInfo.hasDiscount ? (
                      <>
                        <span className="text-lg text-lumora-dark/50 line-through block">
                          {formatPrice(basePrice)}
                        </span>
                        <span className="text-2xl font-bold text-lumora-green-500">
                          {formatPrice(discountedPrice)}
                        </span>
                        <span className="text-sm text-lumora-green-600 font-semibold block">
                          -{discountInfo.currentDiscount}% {t.discount}!
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-lumora-dark">
                        {formatPrice(basePrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-lumora-dark font-medium block mb-2">
                    {productSlug === 'transportdoos-vouwdoos' ? t.quantityPackages : t.quantity}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center bg-lumora-green-500 text-white rounded-lg hover:bg-lumora-green-600 transition-colors font-bold text-xl"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setQuantity(1);
                        } else {
                          const num = parseInt(val);
                          if (!isNaN(num) && num >= 1) {
                            setQuantity(num);
                          }
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '' || parseInt(e.target.value) < 1) {
                          setQuantity(1);
                        }
                      }}
                      className="w-20 px-4 py-2 border-2 border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-lumora-green-500 font-semibold text-lg text-center"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center bg-lumora-green-500 text-white rounded-lg hover:bg-lumora-green-600 transition-colors font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                  {productSlug === 'transportdoos-vouwdoos' && (
                    <p className="text-xs text-lumora-dark/60 mt-2 bg-lumora-cream/50 rounded-lg p-2 text-center">
                      ℹ️ {t.packageNote}
                    </p>
                  )}
                  {productSlug === 'paper-plug-tray-84' && (
                    <p className="text-xs text-lumora-dark/60 mt-2 bg-lumora-green-50 rounded-lg p-2 text-center border border-lumora-green-100">
                      📦 {t.trayBoxNote84}
                    </p>
                  )}
                  {productSlug === 'paper-plug-tray-104' && (
                    <p className="text-xs text-lumora-dark/60 mt-2 bg-lumora-green-50 rounded-lg p-2 text-center border border-lumora-green-100">
                      📦 {t.trayBoxNote104}
                    </p>
                  )}
                </div>

                {/* Korting Breakdown */}
                {discountInfo.hasDiscount && (
                  <div className="bg-lumora-green-50 rounded-xl p-4 mb-4 border border-lumora-green-200">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-lumora-dark/70">{t.subtotalNoDiscount}</span>
                      <span className="font-semibold text-lumora-dark/70 line-through">
                        {formatPrice(basePrice * quantity)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-lumora-green-600 font-semibold">
                        {t.volumeDiscountLabel} ({discountInfo.currentDiscount}%):
                      </span>
                      <span className="font-bold text-lumora-green-600">
                        -{formatPrice(totalDiscount)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t-2 border-lumora-dark/10">
                  <span className="text-xl font-display font-semibold text-lumora-dark">{t.total}</span>
                  <span className="text-3xl font-bold text-lumora-green-500">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {productSlug === 'transportdoos-vouwdoos' && (
                  <p className="text-xs text-lumora-dark/60 mt-2 text-center">
                    = {quantity * 25} {locale === 'de' ? 'Stück' : locale === 'en' ? 'units' : 'stuks'} {locale === 'de' ? 'insgesamt' : locale === 'en' ? 'total' : 'totaal'}
                  </p>
                )}

                {/* Next Tier Tip */}
                {discountInfo.nextTier && (
                  <p className="text-xs text-lumora-dark/60 mt-3 text-center bg-lumora-cream/50 rounded-lg p-2">
                    💡 {t.orderText(discountInfo.nextTier.quantity, discountInfo.nextTier.discount)}
                  </p>
                )}
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

                {/* B2B / Zakelijk Bestellen Knop */}
                <div className="mt-4 pt-4 border-t border-lumora-dark/10">
                  <Link
                    href={localizePathForLocale('/contact', locale)}
                    className="block w-full bg-gradient-to-r from-lumora-dark to-lumora-dark/90 text-white py-4 rounded-xl font-semibold text-lg hover:from-lumora-dark/90 hover:to-lumora-dark transition-all duration-300 shadow-soft hover:shadow-soft-md text-center"
                  >
                    {t.b2bButton}
                  </Link>
                  <p className="text-xs text-lumora-dark/60 mt-2 text-center">
                    {t.b2bText}
                  </p>
                </div>

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
