'use client';

import PromoBar from './components/PromoBar';
import Hero from './components/Hero';

const PROMO_STOCK_REMAINING = parseInt(
  process.env.NEXT_PUBLIC_NEEMX_PROMO_STOCK ?? '47',
  10
);
const SIZE_PICKER_ID = 'size-picker';

export default function LandingClient() {
  return (
    <main className="min-h-screen bg-lumora-dark text-white">
      <PromoBar setsRemaining={PROMO_STOCK_REMAINING} />
      <Hero ctaTargetId={SIZE_PICKER_ID} />
      {/* Following sections come in next tasks */}
    </main>
  );
}
