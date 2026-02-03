'use client';

import { useCart } from '@/contexts/CartContext';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { localizePathForLocale } from '@/lib/url-localizations';
import {
  calculateDiscountedPrice,
  calculateTotalPrice,
  getDiscountInfo,
  formatPrice,
} from '@/lib/volume-discount';
import CartEmailPrompt from './CartEmailPrompt';

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, isCartOpen, setIsCartOpen } = useCart();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'nl';

  const t = {
    cart: locale === 'de' ? 'Warenkorb' : locale === 'en' ? 'Shopping Cart' : 'Winkelwagen',
    empty: locale === 'de' ? 'Ihr Warenkorb ist leer' : locale === 'en' ? 'Your cart is empty' : 'Je winkelwagen is leeg',
    continueShopping: locale === 'de' ? 'Weiter einkaufen' : locale === 'en' ? 'Continue shopping' : 'Verder winkelen',
    remove: locale === 'de' ? 'Entfernen' : locale === 'en' ? 'Remove' : 'Verwijderen',
    subtotal: locale === 'de' ? 'Zwischensumme:' : locale === 'en' ? 'Subtotal:' : 'Subtotaal:',
    discount: locale === 'de' ? 'Rabatt' : locale === 'en' ? 'Discount' : 'Korting',
    total: locale === 'de' ? 'Gesamt:' : locale === 'en' ? 'Total:' : 'Totaal:',
    checkout: locale === 'de' ? 'Zur Kasse' : locale === 'en' ? 'Checkout' : 'Afrekenen',
    pricePerPiece: locale === 'de' ? 'pro Stück' : locale === 'en' ? 'per piece' : 'per stuk',
    items: locale === 'de' ? 'Artikel' : locale === 'en' ? 'items' : 'items',
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push(localizePathForLocale('/checkout', locale));
  };

  // Check if cart contains NEEMX PRO products (same day shipping) or plugs (48h)
  const hasNeemxPro = items.some(item => item.slug?.startsWith('neemx-pro'));
  const hasPlugsOrOther = items.some(item => !item.slug?.startsWith('neemx-pro'));

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-lumora-dark text-lumora-cream px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-display font-bold">{t.cart}</h2>
            <p className="text-sm text-lumora-cream/70">
              {getTotalItems()} {t.items}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-lumora-cream hover:text-lumora-gold transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-24 h-24 text-lumora-dark/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg text-lumora-dark/60 mb-4">{t.empty}</p>
              <Link
                href={localizePathForLocale('/shop', locale)}
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 bg-lumora-green-500 text-white rounded-xl font-semibold hover:bg-lumora-green-600 transition-colors"
              >
                {t.continueShopping}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const discountInfo = getDiscountInfo(item.quantity);
                const discountedPrice = calculateDiscountedPrice(item.price, item.quantity);
                const itemTotal = calculateTotalPrice(item.price, item.quantity);
                const itemDiscount = (item.price * item.quantity) - itemTotal;

                return (
                  <div
                    key={item.product_id}
                    className="bg-lumora-cream/30 rounded-xl p-4 border border-lumora-dark/10"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link
                        href={localizePathForLocale(`/shop/${item.slug}`, locale)}
                        onClick={() => setIsCartOpen(false)}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                          }}
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={localizePathForLocale(`/shop/${item.slug}`, locale)}
                          onClick={() => setIsCartOpen(false)}
                          className="font-semibold text-lumora-dark hover:text-lumora-green-500 transition-colors block mb-1"
                        >
                          {item.name}
                        </Link>

                        {/* Price */}
                        <div className="text-sm mb-2">
                          {discountInfo.hasDiscount ? (
                            <>
                              <span className="text-lumora-dark/50 line-through mr-2">
                                {formatPrice(item.price)}
                              </span>
                              <span className="font-bold text-lumora-green-500">
                                {formatPrice(discountedPrice)}
                              </span>
                              <span className="text-xs text-lumora-green-600 ml-1">
                                -{discountInfo.currentDiscount}%
                              </span>
                            </>
                          ) : (
                            <span className="font-bold text-lumora-dark">
                              {formatPrice(item.price)}
                            </span>
                          )}
                          <span className="text-lumora-dark/60 text-xs ml-1">
                            {t.pricePerPiece}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mb-2">
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-lumora-green-500 text-white rounded-lg hover:bg-lumora-green-600 transition-colors font-bold"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-lumora-green-500 text-white rounded-lg hover:bg-lumora-green-600 transition-colors font-bold"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.product_id)}
                            className="ml-auto text-sm text-red-600 hover:text-red-700 font-medium"
                          >
                            {t.remove}
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          {discountInfo.hasDiscount && (
                            <div className="text-xs text-lumora-green-600 mb-1">
                              {t.discount}: -{formatPrice(itemDiscount)}
                            </div>
                          )}
                          <div className="font-bold text-lumora-dark">
                            {formatPrice(itemTotal)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Email Prompt for Cart Saving */}
        {items.length > 0 && <CartEmailPrompt />}

        {/* Footer with Total and Checkout */}
        {items.length > 0 && (
          <div className="border-t border-lumora-dark/10 px-6 py-4 bg-lumora-cream/20">
            {/* Trust Bar */}
            <div className="bg-lumora-green-50 border border-lumora-green-200 rounded-lg p-3 mb-4">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
                <span className="flex items-center gap-1 text-lumora-dark">
                  <span className="text-lumora-green-500">✓</span>
                  {locale === 'de' ? 'Gratis Versand NL/BE/DE' : locale === 'en' ? 'Free Shipping NL/BE/DE' : 'Gratis verzending NL/BE/DE'}
                </span>
                {/* Show delivery time based on cart contents */}
                {hasNeemxPro && !hasPlugsOrOther && (
                  <span className="flex items-center gap-1 text-lumora-dark">
                    <span className="text-lumora-green-500">🚚</span>
                    {locale === 'de' ? 'Versand am selben Tag' : locale === 'en' ? 'Same day shipping' : 'Dezelfde dag verzonden'}
                  </span>
                )}
                {hasPlugsOrOther && (
                  <span className="flex items-center gap-1 text-lumora-dark">
                    <span className="text-lumora-green-500">🚚</span>
                    {locale === 'de' ? 'Innerhalb 48 Std.' : locale === 'en' ? 'Within 48h' : 'Binnen 48 uur'}
                  </span>
                )}
                <span className="flex items-center gap-1 text-lumora-dark">
                  <span className="text-lumora-green-500">↩</span>
                  {locale === 'de' ? '14 Tage Rückgabe' : locale === 'en' ? '14 Days Return' : '14 dagen retour'}
                </span>
                <span className="flex items-center gap-1 text-lumora-dark">
                  <span className="text-lumora-green-500">🔒</span>
                  {locale === 'de' ? 'Sicher' : locale === 'en' ? 'Secure' : 'Veilig'}
                </span>
              </div>
              {/* NEEMX PRO return policy note */}
              {hasNeemxPro && (
                <div className="mt-2 pt-2 border-t border-lumora-green-200/50">
                  <p className="text-xs text-lumora-dark/70 text-center">
                    {locale === 'de'
                      ? '↩ NEEMX PRO: Rückgabe nur ungeöffnet. Versandkosten nach Prüfung erstattet.'
                      : locale === 'en'
                      ? '↩ NEEMX PRO: Return only if unopened. Shipping costs refunded after inspection.'
                      : '↩ NEEMX PRO: Retour alleen ongeopend. Verzendkosten na controle terugbetaald.'
                    }
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center text-xl font-display font-bold mb-2">
                <span className="text-lumora-dark">{t.total}</span>
                <span className="text-lumora-green-500">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-lumora-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-lumora-green-600 transition-all duration-300 shadow-soft hover:shadow-soft-md"
            >
              {t.checkout}
            </button>
            <Link
              href={localizePathForLocale('/shop', locale)}
              onClick={() => setIsCartOpen(false)}
              className="block text-center text-sm text-lumora-dark/60 hover:text-lumora-dark mt-3"
            >
              {t.continueShopping}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
