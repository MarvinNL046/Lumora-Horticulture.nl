'use client';

const ITEMS = [
  { icon: '🛡️', label: 'KRACHTIG & EFFECTIEF' },
  { icon: '🐾', label: 'VEILIG VOOR MENS & DIER' },
  { icon: '🌿', label: 'PUUR NATUUR, ZONDER TOEVOEGINGEN' },
];

export default function TrustStrip() {
  return (
    <section className="bg-lumora-dark border-t border-white/10 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {ITEMS.map((item) => (
            <li key={item.label} className="flex flex-col items-center">
              <span className="text-3xl text-lumora-gold mb-2" aria-hidden>{item.icon}</span>
              <span className="text-xs md:text-sm font-bold tracking-widest text-white">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
