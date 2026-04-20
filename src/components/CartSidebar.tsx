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

// Static cross-sell candidates — the app has no ConvexProvider at layout
// level (everything uses server-side fetchQuery elsewhere), so the cart
// drawer needs self-contained product refs. Data matches the current Convex
// seed; re-sync this block if prices/images change on the 4 relevant SKUs.
const CROSSSELL_CATALOG: Record<string, {
  product_id: string;
  slug: string;
  name: string;
  name_en: string;
  name_de: string;
  price: number;
  image_url: string;
}> = {
  'neemx-pro-10ml': {
    product_id: 'jx7dpmbbm8q29wq3m55x2w5t85841z98',
    slug: 'neemx-pro-10ml',
    name: 'NEEMX PRO 10ml',
    name_en: 'NEEMX PRO 10ml',
    name_de: 'NEEMX PRO 10ml',
    price: 24.95,
    image_url: '/productAfbeeldingen/neemxpro/neemxpro-sfeer-1.webp',
  },
  'paper-plug-tray-84': {
    product_id: 'jx76b4wt3bt54fqr9111spngk5840sqm',
    slug: 'paper-plug-tray-84',
    name: 'Paper Plug Tray 84',
    name_en: 'Paper Plug Tray 84',
    name_de: 'Paper Plug Tray 84',
    price: 84,
    image_url: '/productAfbeeldingen/trays/tray84/steenwol-plug-84tray-sfeer.webp',
  },
};

export default function CartSidebar() {
  const { items, addItem, removeItem, updateQuantity, getTotalItems, getTotalPrice, isCartOpen, setIsCartOpen } = useCart();
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

  // Pick a cross-sell candidate based on cart contents. Rules:
  //   - Cart has trays (no NEEMX) → suggest NEEMX PRO 10ml (leaf care for crops)
  //   - Cart has NEEMX only → suggest Paper Plug Tray 84 (bestseller)
  //   - Cart has transport box → suggest Paper Plug Tray 84
  //   - Otherwise → NEEMX PRO 10ml as a small low-commitment add-on
  // Excludes products already in cart.
  const crossSellSlug = (() => {
    const cartSlugs = new Set(items.map((i) => i.slug));
    const hasTray = items.some((i) => i.slug?.includes('paper-plug-tray'));
    const hasOnlyNeemx = hasNeemxPro && !hasPlugsOrOther;
    let candidate = 'neemx-pro-10ml';
    if (hasOnlyNeemx || items.some((i) => i.slug?.startsWith('transportdoos'))) {
      candidate = 'paper-plug-tray-84';
    } else if (hasTray && !hasNeemxPro) {
      candidate = 'neemx-pro-10ml';
    }
    return cartSlugs.has(candidate) ? null : candidate;
  })();
  const crossSellProduct = crossSellSlug ? CROSSSELL_CATALOG[crossSellSlug] ?? null : null;

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

                        {/* Next-tier nudge — AOV lever.
                            Shows the user exactly how many more pieces unlock
                            the next bulk discount tier AND how much extra they
                            save, so stacking quantity becomes the obvious move. */}
                        {discountInfo.nextTier && (() => {
                          const piecesToNext = discountInfo.nextTier.quantity - item.quantity;
                          const nextTierPrice = item.price * (1 - discountInfo.nextTier.discount / 100);
                          const savedAtNextTier = (item.price * discountInfo.nextTier.quantity) - (nextTierPrice * discountInfo.nextTier.quantity);
                          const extraSavings = savedAtNextTier - itemDiscount;
                          const copy =
                            locale === 'de'
                              ? `Noch ${piecesToNext} hinzufügen → ${discountInfo.nextTier.discount}% Rabatt (${formatPrice(extraSavings)} extra sparen)`
                              : locale === 'en'
                                ? `Add ${piecesToNext} more → ${discountInfo.nextTier.discount}% off (save ${formatPrice(extraSavings)} extra)`
                                : `Nog ${piecesToNext} erbij → ${discountInfo.nextTier.discount}% korting (${formatPrice(extraSavings)} extra besparen)`;
                          return (
                            <button
                              onClick={() => updateQuantity(item.product_id, discountInfo.nextTier!.quantity)}
                              className="mt-2 w-full text-left text-xs bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-medium rounded-md px-2 py-1.5 transition-colors"
                            >
                              {copy}
                            </button>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cross-sell — AOV lever. Shows ONE complementary product based on
            what's already in the cart, with a single-tap add button. */}
        {items.length > 0 && crossSellProduct && (
          <div className="px-6 py-3 border-t border-lumora-dark/10 bg-white">
            <div className="text-xs font-mono uppercase tracking-wider text-lumora-dark/50 mb-2">
              {locale === 'de'
                ? 'Wird auch mitbestellt'
                : locale === 'en'
                  ? 'Growers also add'
                  : 'Kwekers kopen er ook bij'}
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={localizePathForLocale(`/shop/${crossSellProduct.slug}`, locale)}
                onClick={() => setIsCartOpen(false)}
                className="flex-shrink-0"
              >
                <img
                  src={crossSellProduct.image_url}
                  alt={crossSellProduct.name}
                  className="w-14 h-14 object-cover rounded-lg"
                  onError={(e) => ((e.target as HTMLImageElement).src = '/placeholder-product.jpg')}
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={localizePathForLocale(`/shop/${crossSellProduct.slug}`, locale)}
                  onClick={() => setIsCartOpen(false)}
                  className="block text-sm font-semibold text-lumora-dark hover:text-lumora-green-500 truncate"
                >
                  {locale === 'de' ? crossSellProduct.name_de :
                   locale === 'en' ? crossSellProduct.name_en :
                   crossSellProduct.name}
                </Link>
                <div className="text-xs text-lumora-dark/60">
                  {formatPrice(crossSellProduct.price)}
                </div>
              </div>
              <button
                onClick={() =>
                  addItem(
                    {
                      product_id: crossSellProduct.product_id,
                      slug: crossSellProduct.slug,
                      name: crossSellProduct.name,
                      price: crossSellProduct.price,
                      image_url: crossSellProduct.image_url,
                    },
                    1,
                  )
                }
                className="flex-shrink-0 bg-lumora-green-500 hover:bg-lumora-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {locale === 'de' ? 'Hinzufügen' : locale === 'en' ? 'Add' : 'Toevoegen'}
              </button>
            </div>
          </div>
        )}

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
            {/* Urgency */}
            <p className="text-sm font-semibold text-amber-700 text-center mb-2">
              {locale === 'de'
                ? '⚡ Vor 16:00 bestellt = Heute versendet'
                : locale === 'en'
                ? '⚡ Order before 4 PM = Shipped today'
                : '⚡ Voor 16:00 besteld = Vandaag verzonden'}
            </p>

            {/* Payment methods — mirror what's actually enabled in Mollie.
                Apple/Google Pay advertised here raise mobile conversion; they
                only show on the Mollie method-select screen for supported
                devices, so we're safe to list them for every visitor. */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-3 py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-xs text-lumora-dark/50 mr-1">{locale === 'de' ? 'Bezahlen mit' : locale === 'en' ? 'Pay with' : 'Betaal met'}</span>
              <span className="bg-[#00A4E4] text-white text-xs font-bold px-2 py-0.5 rounded">iDEAL</span>
              <span className="bg-black text-white text-xs font-bold px-2 py-0.5 rounded"> Pay</span>
              <span className="bg-white border border-gray-300 text-gray-800 text-xs font-bold px-2 py-0.5 rounded">G Pay</span>
              <span className="bg-[#005B9A] text-white text-xs font-bold px-1.5 py-0.5 rounded">Bancontact</span>
              <span className="bg-[#E30613] text-white text-xs font-bold px-1.5 py-0.5 rounded">Belfius</span>
              <span className="bg-[#00A4E4] text-white text-xs font-bold px-2 py-0.5 rounded">Wero</span>
              <span className="bg-gray-800 text-white text-xs font-bold px-1.5 py-0.5 rounded">VISA</span>
              <span className="bg-[#FF5F00] text-white text-xs font-bold px-1.5 py-0.5 rounded text-[10px]">MC</span>
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
