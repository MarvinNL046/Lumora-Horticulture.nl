'use client';

import Image from 'next/image';

const BENEFITS = [
  {
    icon: '🐛',
    title: 'Wegjager van zuigers',
    body: 'Spint, witte vlieg, bladluis: NEEMX PRO maakt van je planten een no-go zone — zonder gif.',
  },
  {
    icon: '⚡',
    title: '4× sterker dan standaard',
    body: '1 flesje van 30ml = tot 12 liter spuitvloeistof. Verder dan elk standaard neem-product.',
  },
  {
    icon: '🌱',
    title: 'Veilig voor stekken',
    body: 'Geschikt voor jonge planten, stekken én volgroeide gewassen — bij juiste dosering.',
  },
];

export default function BenefitCards() {
  return (
    <section className="bg-white text-lumora-dark py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Wat doet NEEMX PRO?
            </h2>
            <p className="text-lumora-dark/70 text-base md:text-lg leading-relaxed">
              Een hooggeconcentreerd, plantaardig olieconcentraat dat een beschermende oliefilm op het blad legt — gezonde planten, zonder synthetische middelen.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/productAfbeeldingen/neemxpro/neemxpro-2plus1-cream.png"
              alt="NEEMX PRO 2+1 GRATIS premium presentatie"
              width={1200}
              height={1200}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-lumora-cream/30 rounded-2xl p-6">
              <div className="text-4xl mb-3" aria-hidden>{b.icon}</div>
              <h3 className="font-bold text-lg mb-2">{b.title}</h3>
              <p className="text-lumora-dark/70 text-sm leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
