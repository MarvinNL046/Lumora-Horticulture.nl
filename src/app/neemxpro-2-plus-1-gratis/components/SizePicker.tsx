'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCart } from '@/contexts/CartContext';
import {
  NEEMX_PROMO_COOKIE_NAME,
  NEEMX_PROMO_CODE,
  NEEMX_PROMO_COOKIE_MAX_AGE_SECONDS,
  calculateNeemxPromoDiscount,
} from '@/lib/neemx-promo';

interface NeemxProduct {
  _id: string;
  slug: string;
  name: string;
  price: number;
  image_url?: string;
}

const NEEMX_SLUGS = ['neemx-pro-10ml', 'neemx-pro-30ml', 'neemx-pro-50ml'] as const;
type NeemxSlug = typeof NEEMX_SLUGS[number];

interface SizeMeta {
  slug: NeemxSlug;
  label: string;
  yieldText: string;
  badge?: string;
}

const SIZE_META: SizeMeta[] = [
  { slug: 'neemx-pro-10ml', label: '10 ml', yieldText: 'tot 4 L spuitoplossing', badge: 'Starter' },
  { slug: 'neemx-pro-30ml', label: '30 ml', yieldText: 'tot 12 L spuitoplossing', badge: 'Beste waarde' },
  { slug: 'neemx-pro-50ml', label: '50 ml', yieldText: 'tot 20 L spuitoplossing', badge: 'Voor intensief gebruik' },
];

interface Props {
  id: string;
}

export default function SizePicker({ id }: Props) {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Record<string, NeemxProduct>>({});
  const [counts, setCounts] = useState<Record<NeemxSlug, number>>({
    'neemx-pro-10ml': 0,
    'neemx-pro-30ml': 0,
    'neemx-pro-50ml': 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      NEEMX_SLUGS.map((slug) =>
        fetch(`/api/products/slug/${slug}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    ).then((results) => {
      if (cancelled) return;
      const byslug: Record<string, NeemxProduct> = {};
      results.forEach((res, idx) => {
        const slug = NEEMX_SLUGS[idx];
        const product = res?.product ?? res;
        if (product && product.slug) {
          byslug[slug] = product;
        }
      });
      setProducts(byslug);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const totalBottles = useMemo(
    () => Object.values(counts).reduce((s, n) => s + n, 0),
    [counts]
  );

  const subtotal = useMemo(() => {
    let sum = 0;
    for (const slug of NEEMX_SLUGS) {
      const p = products[slug];
      if (p) sum += p.price * counts[slug];
    }
    return sum;
  }, [counts, products]);

  const promoCalc = useMemo(() => {
    const items = NEEMX_SLUGS.map((slug) => ({
      slug,
      unitPrice: products[slug]?.price ?? 0,
      quantity: counts[slug],
    }));
    return calculateNeemxPromoDiscount(items);
  }, [counts, products]);

  const finalTotal = Math.max(0, subtotal - promoCalc.discount);
  const isValid = totalBottles === 3 && Object.values(products).length === 3;

  const inc = (slug: NeemxSlug) => {
    if (totalBottles >= 3) return;
    setCounts((c) => ({ ...c, [slug]: c[slug] + 1 }));
  };
  const dec = (slug: NeemxSlug) => {
    setCounts((c) => ({ ...c, [slug]: Math.max(0, c[slug] - 1) }));
  };

  const handleAddToCart = async () => {
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      for (const slug of NEEMX_SLUGS) {
        const qty = counts[slug];
        if (qty <= 0) continue;
        const p = products[slug];
        if (!p) {
          throw new Error(`Product ${slug} not found`);
        }
        addItem(
          {
            product_id: p._id,
            slug: p.slug,
            name: p.name,
            price: p.price,
            image_url: p.image_url ?? '',
          },
          qty
        );
      }

      // Fire Meta Pixel AddToCart event. fbq is queued globally by MetaPixel.tsx
      // in the root layout — calls before the script loads are buffered.
      if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
        const fbq = (window as unknown as { fbq: (...args: unknown[]) => void }).fbq;
        fbq('track', 'AddToCart', {
          content_type: 'product',
          content_ids: NEEMX_SLUGS.filter((s) => counts[s] > 0).map((s) => products[s]?._id).filter(Boolean),
          value: finalTotal,
          currency: 'EUR',
          contents: NEEMX_SLUGS
            .filter((s) => counts[s] > 0)
            .map((s) => ({
              id: products[s]?._id,
              quantity: counts[s],
            })),
        });
      }

      // Set the hidden promo cookie. The server reads this in /api/checkout
      // via next/headers cookies() and re-validates eligibility from cart contents.
      document.cookie = `${NEEMX_PROMO_COOKIE_NAME}=${NEEMX_PROMO_CODE}; Max-Age=${NEEMX_PROMO_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${
        location.protocol === 'https:' ? '; Secure' : ''
      }`;

      window.location.href = '/checkout';
    } catch (err) {
      console.error('Add to cart failed', err);
      setError('Er ging iets mis. Probeer het opnieuw of neem contact met ons op.');
      setSubmitting(false);
    }
  };

  return (
    <section id={id} className="bg-white text-lumora-dark py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            Stel je 2+1 pakket samen
          </h2>
          <p className="text-lumora-dark/70 text-base md:text-lg">
            Mix vrij tussen 10ml, 30ml en 50ml — het goedkoopste flesje is gratis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-6">
          {SIZE_META.map((meta) => {
            const product = products[meta.slug];
            const count = counts[meta.slug];
            const price = product?.price ?? 0;

            return (
              <div
                key={meta.slug}
                className={`relative bg-lumora-cream/30 border-2 rounded-2xl p-5 transition-all ${
                  count > 0 ? 'border-lumora-green-500 shadow-md' : 'border-transparent'
                }`}
              >
                {meta.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lumora-gold text-lumora-dark text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {meta.badge}
                  </span>
                )}
                <div className="text-center">
                  <p className="font-display text-2xl font-bold mb-1">{meta.label}</p>
                  <p className="text-2xl font-bold text-lumora-green-600 mb-2">
                    €{price.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-xs text-lumora-dark/60 mb-4">{meta.yieldText}</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => dec(meta.slug)}
                      disabled={count === 0}
                      aria-label={`Verlaag aantal ${meta.label}`}
                      className="w-10 h-10 rounded-full bg-white border-2 border-lumora-dark/20 hover:border-lumora-dark disabled:opacity-30 disabled:cursor-not-allowed font-bold text-lg"
                    >
                      −
                    </button>
                    <span
                      className="font-bold text-2xl w-8 text-center tabular-nums"
                      aria-live="polite"
                    >
                      {count}
                    </span>
                    <button
                      type="button"
                      onClick={() => inc(meta.slug)}
                      disabled={totalBottles >= 3}
                      aria-label={`Verhoog aantal ${meta.label}`}
                      className="w-10 h-10 rounded-full bg-white border-2 border-lumora-dark/20 hover:border-lumora-dark disabled:opacity-30 disabled:cursor-not-allowed font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-lumora-dark text-white rounded-2xl p-6 mb-6">
          <div className="flex flex-col gap-2 text-base md:text-lg">
            <div className="flex justify-between">
              <span className="text-white/80">Jouw selectie ({totalBottles}/3 flesjes)</span>
              <span className="tabular-nums">€{subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            {promoCalc.eligible && (
              <div className="flex justify-between text-lumora-gold">
                <span>Goedkoopste flesje gratis</span>
                <span className="tabular-nums">−€{promoCalc.discount.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            <div className="border-t border-white/20 pt-2 mt-1 flex justify-between text-xl md:text-2xl font-bold">
              <span>Jij betaalt</span>
              <span className="tabular-nums text-lumora-gold">
                €{finalTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isValid || submitting}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/40 disabled:cursor-not-allowed text-white font-bold py-5 px-6 rounded-xl text-lg md:text-xl shadow-lg hover:shadow-xl transition-all"
        >
          {submitting
            ? 'Bezig…'
            : isValid
              ? `Voeg toe & ontvang 1 flesje gratis →`
              : `Selecteer nog ${3 - totalBottles} flesje${3 - totalBottles === 1 ? '' : 's'}`}
        </button>

        <p className="text-xs md:text-sm text-lumora-dark/60 text-center mt-3">
          ✓ Korting wordt automatisch toegepast bij checkout
        </p>
      </div>
    </section>
  );
}
