'use client';

export default function LandingFooter() {
  return (
    <footer className="bg-lumora-dark border-t border-white/10 py-8 text-white/60 text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p>© {new Date().getFullYear()} Lumora Horticulture</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <a href="mailto:info@lumorahorticulture.nl" className="hover:text-white">
              info@lumorahorticulture.nl
            </a>
            <a href="/privacy-policy" className="hover:text-white">Privacy</a>
            <a href="/terms-conditions" className="hover:text-white">Voorwaarden</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
