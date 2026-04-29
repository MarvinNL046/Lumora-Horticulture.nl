'use client';

import { useEffect } from 'react';
import PromoBar from './components/PromoBar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import SizePicker from './components/SizePicker';
import BenefitCards from './components/BenefitCards';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import LandingFooter from './components/LandingFooter';
import StickyMobileCta from './components/StickyMobileCta';

const PROMO_STOCK_REMAINING = parseInt(
  process.env.NEXT_PUBLIC_NEEMX_PROMO_STOCK ?? '47',
  10
);
const SIZE_PICKER_ID = 'size-picker';

export default function LandingClient() {
  // Capture UTM params on landing for downstream attribution.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term']) {
      const v = params.get(key);
      if (v) utm[key] = v;
    }
    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem('lumora_utm', JSON.stringify(utm));
    }
  }, []);

  const handleSecondaryCta = () => {
    document.getElementById(SIZE_PICKER_ID)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-lumora-dark text-white pb-24 md:pb-0">
      <PromoBar setsRemaining={PROMO_STOCK_REMAINING} />
      <Hero ctaTargetId={SIZE_PICKER_ID} />
      <TrustStrip />
      <SizePicker id={SIZE_PICKER_ID} />
      <BenefitCards />
      <Testimonials />
      <HowItWorks />
      <FAQ />

      <section className="bg-lumora-dark border-t border-white/10 py-12 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <p className="font-display text-2xl md:text-3xl font-bold text-lumora-gold mb-2">
            Nog {PROMO_STOCK_REMAINING} sets beschikbaar
          </p>
          <p className="text-white/80 mb-6">
            Tijdelijke 2+1-actie — wees er snel bij.
          </p>
          <button
            type="button"
            onClick={handleSecondaryCta}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg text-lg"
          >
            Bestel je 2+1 nu
            <span aria-hidden>→</span>
          </button>
        </div>
      </section>

      <LandingFooter />
      <StickyMobileCta targetId={SIZE_PICKER_ID} />
    </main>
  );
}
