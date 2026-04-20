import Link from 'next/link';

type Locale = 'nl' | 'en' | 'de';

interface Props {
  locale: string;
  /** Target product slug in /shop/. Default is the €84 bestseller that already
   *  produced the single paid order in the last 90 days. */
  targetSlug?: string;
  /** Starting price shown in the "from €X" signal. */
  fromPriceEUR?: number;
}

const COPY: Record<Locale, {
  kicker: string;
  headline: string;
  sub: string;
  trust: string[];
  primary: string;
  secondary: string;
  from: string;
  perBox: string;
}> = {
  nl: {
    kicker: 'Stop met praten over steenwol, ga ermee telen',
    headline: 'Professionele paper plugs & kweektrays',
    sub: 'Dezelfde materialen waar dit artikel over gaat — klaar voor jouw kwekerij. 100% biologisch afbreekbaar, geen transplantatieschok, 48u geleverd.',
    trust: ['✓ 15+ jaar specialist', '✓ 500+ kwekers', '✓ Staffelkorting tot 35%'],
    primary: 'Bekijk de bestseller',
    secondary: 'Alle producten →',
    from: 'Vanaf',
    perBox: '/ doos',
  },
  en: {
    kicker: 'Stop reading about it. Start growing with it.',
    headline: 'Professional paper plugs & growing trays',
    sub: 'The exact materials this article is about — ready to ship to your nursery. 100% biodegradable, zero transplant shock, delivered in 48h.',
    trust: ['✓ 15+ yrs specialist', '✓ 500+ growers', '✓ Volume discounts to 35%'],
    primary: 'See the bestseller',
    secondary: 'All products →',
    from: 'From',
    perBox: '/ box',
  },
  de: {
    kicker: 'Schluss mit Lesen. Jetzt damit anbauen.',
    headline: 'Professionelle Paper Plugs & Anzuchtschalen',
    sub: 'Genau die Materialien, über die dieser Artikel handelt — lieferbereit für Ihre Gärtnerei. 100% biologisch abbaubar, kein Transplantationsschock, in 48 Std.',
    trust: ['✓ 15+ Jahre Spezialist', '✓ 500+ Gärtner', '✓ Mengenrabatt bis 35%'],
    primary: 'Bestseller ansehen',
    secondary: 'Alle Produkte →',
    from: 'Ab',
    perBox: '/ Karton',
  },
};

const SHOP_PATH: Record<Locale, string> = { nl: '/winkel', en: '/shop', de: '/shop' };

export default function InfoPageCommercialCTA({
  locale,
  targetSlug = 'paper-plug-tray-84',
  fromPriceEUR = 84,
}: Props) {
  const lang = (['nl', 'en', 'de'] as Locale[]).includes(locale as Locale) ? (locale as Locale) : 'nl';
  const t = COPY[lang];
  const shopRoot = SHOP_PATH[lang];
  const productHref = `/${lang}${shopRoot}/${targetSlug}`;
  const shopHref = `/${lang}${shopRoot}`;

  return (
    <section className="py-16 bg-gradient-to-br from-lumora-green-50 via-white to-lumora-cream/40">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-soft-xl border border-lumora-green-100 overflow-hidden grid md:grid-cols-2">
          {/* Product imagery — uses the existing product shot so we don't
              have to touch CMS/upload pipeline. */}
          <div className="bg-lumora-cream/40 flex items-center justify-center p-8 md:p-12">
            <img
              src="/products/paper-plug-tray-84/tray-84-plugs.jpg"
              alt="Paper Plug Tray 84"
              className="max-w-full max-h-72 object-contain rounded-xl shadow-md"
              onError={(e) => ((e.target as HTMLImageElement).src = '/placeholder-product.jpg')}
            />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-sm font-mono uppercase tracking-wider text-lumora-green-600 mb-2">
              {t.kicker}
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-3">
              {t.headline}
            </h2>
            <p className="text-lumora-dark/70 mb-6 leading-relaxed">{t.sub}</p>

            <div className="mb-6">
              <span className="text-sm text-lumora-dark/60">{t.from} </span>
              <span className="text-3xl font-display font-bold text-lumora-green-600">
                €{fromPriceEUR}
              </span>
              <span className="text-sm text-lumora-dark/60"> {t.perBox}</span>
            </div>

            <ul className="space-y-1.5 mb-6 text-sm text-lumora-dark/80">
              {t.trust.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href={productHref}
                className="inline-flex items-center justify-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-soft hover:shadow-soft-md"
              >
                {t.primary}
              </Link>
              <Link
                href={shopHref}
                className="inline-flex items-center text-lumora-dark/70 hover:text-lumora-green-600 font-medium px-2 py-3 transition-colors"
              >
                {t.secondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
