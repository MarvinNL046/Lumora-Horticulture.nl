'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/volume-discount';
import Link from 'next/link';
import { localizePathForLocale } from '@/lib/url-localizations';

export default function ExitIntentPopup() {
  const params = useParams();
  const locale = (params?.locale as string) || 'nl';
  const { items, getTotalPrice, getTotalItems, setIsCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const t = {
    title: locale === 'de'
      ? 'Moment! Vergessen Sie nichts?'
      : locale === 'en'
      ? 'Wait! Don\'t forget your items!'
      : 'Wacht! Vergeet je niks?',
    subtitle: locale === 'de'
      ? 'Sie haben noch Artikel in Ihrem Warenkorb'
      : locale === 'en'
      ? 'You still have items in your cart'
      : 'Je hebt nog producten in je winkelwagen',
    itemsInCart: locale === 'de' ? 'Artikel im Warenkorb' : locale === 'en' ? 'items in cart' : 'producten in winkelwagen',
    totalValue: locale === 'de' ? 'Warenwert' : locale === 'en' ? 'Cart value' : 'Winkelwagenwaarde',
    freeShipping: locale === 'de' ? '✓ Kostenloser Versand' : locale === 'en' ? '✓ Free shipping' : '✓ Gratis verzending',
    saveCart: locale === 'de'
      ? 'Warenkorb per E-Mail speichern'
      : locale === 'en'
      ? 'Save cart via email'
      : 'Bewaar winkelwagen via email',
    emailPlaceholder: locale === 'de' ? 'Ihre E-Mail-Adresse' : locale === 'en' ? 'Your email address' : 'Je e-mailadres',
    sendLink: locale === 'de' ? 'Link senden' : locale === 'en' ? 'Send link' : 'Stuur link',
    saved: locale === 'de' ? 'Gespeichert! Überprüfen Sie Ihre E-Mail.' : locale === 'en' ? 'Saved! Check your email.' : 'Opgeslagen! Check je email.',
    viewCart: locale === 'de' ? 'Warenkorb ansehen' : locale === 'en' ? 'View cart' : 'Bekijk winkelwagen',
    checkout: locale === 'de' ? 'Zur Kasse' : locale === 'en' ? 'Checkout now' : 'Direct afrekenen',
    noThanks: locale === 'de' ? 'Nein danke, später' : locale === 'en' ? 'No thanks, maybe later' : 'Nee bedankt, later',
    emptyTitle: locale === 'de'
      ? 'Verlassen Sie uns schon?'
      : locale === 'en'
      ? 'Leaving so soon?'
      : 'Ga je al weg?',
    emptySubtitle: locale === 'de'
      ? 'Entdecken Sie unsere professionellen Gartenbauprodukte'
      : locale === 'en'
      ? 'Discover our professional horticulture products'
      : 'Ontdek onze professionele tuinbouwproducten',
    browseProducts: locale === 'de' ? 'Produkte ansehen' : locale === 'en' ? 'Browse products' : 'Bekijk producten',
    benefits: [
      locale === 'de' ? '✓ Kostenloser Versand NL/BE/DE' : locale === 'en' ? '✓ Free shipping NL/BE/DE' : '✓ Gratis verzending NL/BE/DE',
      locale === 'de' ? '✓ 14 Tage Rückgaberecht' : locale === 'en' ? '✓ 14 days return policy' : '✓ 14 dagen retourrecht',
      locale === 'de' ? '✓ Lieferung innerhalb 48 Std.' : locale === 'en' ? '✓ Delivered within 48h' : '✓ Binnen 48 uur geleverd',
    ],
  };

  // Detect exit intent (mouse leaving viewport at top)
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !hasShown && !isVisible) {
      // Check if popup was already shown this session
      const popupShown = sessionStorage.getItem('exitPopupShown');
      if (!popupShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    }
  }, [hasShown, isVisible]);

  // Also trigger on back button / page unload for mobile
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (items.length > 0 && !hasShown) {
        const popupShown = sessionStorage.getItem('exitPopupShown');
        if (!popupShown) {
          // Can't show custom popup on beforeunload, but we tried
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleMouseLeave, items.length, hasShown]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  const handleSaveCart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || items.length === 0) return;

    setSaving(true);
    try {
      const response = await fetch('/api/cart/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_email: email,
          cart_data: items,
          total_amount: getTotalPrice(),
          locale,
        }),
      });

      if (response.ok) {
        setEmailSaved(true);
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleViewCart = () => {
    setIsVisible(false);
    setIsCartOpen(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[100] animate-fade-in"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full pointer-events-auto animate-scale-in overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-lumora-green-500 to-lumora-green-600 px-6 py-5 text-white relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-4xl mb-2">
              {items.length > 0 ? '🛒' : '👋'}
            </div>
            <h2 className="text-2xl font-display font-bold">
              {items.length > 0 ? t.title : t.emptyTitle}
            </h2>
            <p className="text-lumora-cream/90 mt-1">
              {items.length > 0 ? t.subtitle : t.emptySubtitle}
            </p>
          </div>

          {/* Content */}
          <div className="p-6">
            {items.length > 0 ? (
              <>
                {/* Cart Summary */}
                <div className="bg-lumora-cream/30 rounded-xl p-4 mb-4 border border-lumora-dark/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lumora-dark/70">{getTotalItems()} {t.itemsInCart}</span>
                    <span className="font-bold text-lumora-green-500 text-xl">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="text-sm text-lumora-green-600 font-medium">
                    {t.freeShipping}
                  </div>
                </div>

                {/* Cart Items Preview */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.product_id} className="flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border border-lumora-dark/10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                        }}
                      />
                    </div>
                  ))}
                  {items.length > 3 && (
                    <div className="w-16 h-16 flex-shrink-0 bg-lumora-dark/10 rounded-lg flex items-center justify-center text-lumora-dark/60 font-semibold">
                      +{items.length - 3}
                    </div>
                  )}
                </div>

                {/* Save Cart Form */}
                {!emailSaved ? (
                  <form onSubmit={handleSaveCart} className="mb-4">
                    <p className="text-sm text-lumora-dark/70 mb-2">{t.saveCart}</p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="flex-1 px-4 py-2 border border-lumora-dark/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-4 py-2 bg-lumora-gold text-lumora-dark font-semibold rounded-lg hover:bg-lumora-gold/80 transition-colors text-sm disabled:opacity-50"
                      >
                        {saving ? '...' : t.sendLink}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-lumora-green-50 border border-lumora-green-200 rounded-lg p-3 mb-4 text-center">
                    <span className="text-lumora-green-600 font-medium">✓ {t.saved}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    href={localizePathForLocale('/checkout', locale)}
                    onClick={() => setIsVisible(false)}
                    className="block w-full bg-lumora-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-lumora-green-600 transition-colors"
                  >
                    {t.checkout}
                  </Link>
                  <button
                    onClick={handleViewCart}
                    className="w-full bg-lumora-dark/10 text-lumora-dark py-3 rounded-xl font-semibold hover:bg-lumora-dark/20 transition-colors"
                  >
                    {t.viewCart}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Benefits for empty cart */}
                <div className="space-y-2 mb-6">
                  {t.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-lumora-dark/80">
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Browse Products Button */}
                <Link
                  href={localizePathForLocale('/shop', locale)}
                  onClick={() => setIsVisible(false)}
                  className="block w-full bg-lumora-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-lumora-green-600 transition-colors"
                >
                  {t.browseProducts}
                </Link>
              </>
            )}

            {/* Dismiss Link */}
            <button
              onClick={handleClose}
              className="w-full text-center text-sm text-lumora-dark/50 hover:text-lumora-dark mt-4 py-2"
            >
              {t.noThanks}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
