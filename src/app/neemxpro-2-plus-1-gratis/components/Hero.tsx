'use client';

import Image from 'next/image';

interface Props {
  /** Scroll target: id of the size-picker section. */
  ctaTargetId: string;
}

export default function Hero({ ctaTargetId }: Props) {
  const handleCta = () => {
    document.getElementById(ctaTargetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lumora-dark via-lumora-dark to-lumora-dark-700 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          <div className="text-center lg:text-left">
            <span className="inline-block bg-lumora-gold/20 border border-lumora-gold/40 text-lumora-gold text-xs font-bold tracking-widest px-3 py-1.5 rounded-full mb-6 uppercase">
              Tijdelijke actie
            </span>

            <h1 className="font-display font-bold text-lumora-gold mb-4 leading-none">
              <span className="block text-7xl md:text-8xl lg:text-9xl">2+1</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl mt-1">GRATIS</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-2 font-display">
              NEEMX PRO
            </p>
            <p className="text-base md:text-lg text-white/80 mb-8">
              Premium Botanical Oil Concentrate
            </p>

            <ul className="space-y-2 mb-8 text-white/90 text-base md:text-lg">
              <li className="flex items-start gap-2 justify-center lg:justify-start">
                <span className="text-lumora-gold">✓</span>
                <span>100% natuurlijk plantaardig olieconcentraat</span>
              </li>
              <li className="flex items-start gap-2 justify-center lg:justify-start">
                <span className="text-lumora-gold">✓</span>
                <span>4× sterker dan standaard neem-producten</span>
              </li>
              <li className="flex items-start gap-2 justify-center lg:justify-start">
                <span className="text-lumora-gold">✓</span>
                <span>NL voorraad — 48u thuisbezorgd</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={handleCta}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg md:text-xl"
            >
              Kies je 3 flesjes
              <span aria-hidden>→</span>
            </button>

            <p className="text-xs md:text-sm text-white/60 mt-4">
              ✓ Gratis verzending NL/BE vanaf €50 · ✓ Veilig betalen · ✓ 14 dagen retour
            </p>
          </div>

          <div className="relative">
            <Image
              src="/productAfbeeldingen/neemxpro/neemxpro-2plus1-hero.png"
              alt="NEEMX PRO 2+1 GRATIS — drie flesjes met tijdelijke actie banner"
              width={1200}
              height={1200}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
