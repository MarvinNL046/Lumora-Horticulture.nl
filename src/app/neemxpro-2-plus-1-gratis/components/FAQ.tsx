'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Geldt 2+1 op elke maat?',
    a: 'Ja, je mag vrij mixen tussen 10ml, 30ml en 50ml. Het goedkoopste flesje van de drie wordt automatisch gratis bij checkout.',
  },
  {
    q: 'Wanneer wordt het geleverd?',
    a: 'Bestel je op werkdagen vóór 16:00, dan wordt je pakket de volgende werkdag bezorgd in NL en BE.',
  },
  {
    q: 'Is het veilig voor mijn huisdieren of kinderen?',
    a: 'NEEMX PRO is 100% natuurlijk en plantaardig. Spuit alleen op planten, niet rechtstreeks op huisdieren of kinderen. Vermijd dat dieren of kinderen in aanraking komen met versgespoten bladeren tot deze opgedroogd zijn.',
  },
  {
    q: 'Hoeveel water kan ik ermee maken?',
    a: '10ml = tot 4 liter spuitoplossing · 30ml = tot 12 liter · 50ml = tot 20 liter. Dosering 2,5 ml per liter water bij preventief gebruik.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white text-lumora-dark py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">
          Veelgestelde vragen
        </h2>

        <div className="divide-y divide-lumora-dark/10 border-t border-b border-lumora-dark/10">
          {FAQS.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center text-left py-5 hover:text-lumora-green-600 transition-colors"
                >
                  <span className="font-semibold pr-6">{item.q}</span>
                  <span
                    className={`text-2xl flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all ${
                    isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-lumora-dark/70 leading-relaxed">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
