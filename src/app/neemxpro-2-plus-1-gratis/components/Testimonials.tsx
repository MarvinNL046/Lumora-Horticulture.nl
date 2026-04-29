'use client';

const TESTIMONIALS = [
  {
    quote: 'Eindelijk iets natuurlijks dat écht werkt tegen spint. Mijn tomaten gered.',
    author: 'Mark',
    role: 'Hobbykweker',
    rating: 5,
  },
  {
    quote: "Gebruik het op kamerplanten en in m'n kasje. Klein flesje, gaat lang mee.",
    author: 'Sandra',
    role: 'Semi-prof teler',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-lumora-cream/40 text-lumora-dark py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">
          Vertrouwd door 500+ kwekers
        </h2>
        <p className="text-center text-lumora-dark/70 mb-10">
          in Nederland, België en Duitsland
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex mb-3" aria-label={`${t.rating} van 5 sterren`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < t.rating ? 'text-lumora-gold' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-lumora-dark/80 mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-semibold">{t.author}</p>
              <p className="text-sm text-lumora-dark/60">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
