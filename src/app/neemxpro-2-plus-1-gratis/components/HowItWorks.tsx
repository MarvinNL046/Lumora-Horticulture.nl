'use client';

import Image from 'next/image';

const STEPS = [
  { n: 1, title: 'Kies je 3 flesjes', body: 'Mix vrij tussen 10ml, 30ml en 50ml.' },
  { n: 2, title: 'Betaal er maar 2', body: 'Goedkoopste flesje wordt automatisch gratis.' },
  { n: 3, title: 'Binnen 48u thuis', body: 'NL voorraad, werkdagen vóór 16:00 = morgen geleverd.' },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-lumora-dark text-white py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <Image
          src="/productAfbeeldingen/neemxpro/neemxpro-2plus1-forest.png"
          alt=""
          fill
          aria-hidden
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-lumora-dark/80" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
          Zo werkt het
        </h2>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <li key={step.n} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-lumora-gold text-lumora-dark rounded-full flex items-center justify-center font-bold text-xl mb-4">
                {step.n}
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
