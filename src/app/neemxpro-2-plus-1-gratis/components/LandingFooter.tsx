'use client';

import Link from 'next/link';

export default function LandingFooter() {
  return (
    <footer className="bg-lumora-dark border-t border-white/10 py-8 text-white/60 text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-6 text-center">
          <span className="text-white/80">
            Grootverbruiker of wederverkoper? Bulk verkrijgbaar in 1L · 5L · 10L tot 1000L IBC —{' '}
          </span>
          <Link
            href="/contact"
            className="text-lumora-gold hover:underline font-semibold whitespace-nowrap"
          >
            vraag offerte aan →
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p>© {new Date().getFullYear()} Lumora Horticulture</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <a href="mailto:info@lumorahorticulture.nl" className="hover:text-white">
              info@lumorahorticulture.nl
            </a>
            <Link href="/privacybeleid" className="hover:text-white">Privacy</Link>
            <Link href="/algemene-voorwaarden" className="hover:text-white">Voorwaarden</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
