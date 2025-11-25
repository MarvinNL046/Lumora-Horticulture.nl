import { Metadata } from 'next';
import Link from 'next/link';
import { localizePathForLocale } from '@/lib/url-localizations';

export const metadata: Metadata = {
  title: '84 vs 104 Cell Paper Plug Trays: Definitieve Vergelijking | Keuze Gids',
  description: 'Paper plug 84 vs 104 cellen vergelijking: welke tray past bij uw gewas? Gedetailleerde analyse van kosten, toepassingen, voor- en nadelen voor professionele kwekers.',
  keywords: 'paper plug 84 cellen, paper plug 104 cellen, 84 vs 104 vergelijking, paper plug tray keuze, welke paper plug tray, 84 104 verschil',
};

interface ComparisonMetric {
  metric: string;
  cells84: string | number;
  cells104: string | number;
  winner?: '84' | '104' | 'tie';
  explanation: string;
}

const technicalComparison: ComparisonMetric[] = [
  {
    metric: 'Celvolume',
    cells84: '32-35 ml',
    cells104: '25-28 ml',
    winner: '84',
    explanation: '22% meer wortelruimte leidt tot sterkere planten en betere droogtetolerantie'
  },
  {
    metric: 'Celafmetingen',
    cells84: '42 x 42 mm',
    cells104: '38 x 38 mm',
    winner: '84',
    explanation: 'Grotere oppervlakte biedt meer ruimte voor bladontwikkeling en luchtworteling'
  },
  {
    metric: 'Aantal per tray',
    cells84: 84,
    cells104: 104,
    winner: '104',
    explanation: '24% meer planten per tray betekent efficiënter ruimtegebruik'
  },
  {
    metric: 'Kosten per plant',
    cells84: '€0.014 - €0.018',
    cells104: '€0.011 - €0.015',
    winner: '104',
    explanation: 'Lagere kosten per plant bij gelijk tray gebruik'
  },
  {
    metric: 'Teeltduur',
    cells84: '6-8 weken',
    cells104: '4-6 weken',
    winner: 'tie',
    explanation: 'Beide geschikt voor verschillende teeltcycli, afhankelijk van gewas'
  },
  {
    metric: 'Zaadgrootte',
    cells84: 'Middel tot groot',
    cells104: 'Klein tot middel',
    winner: 'tie',
    explanation: 'Iedere maat geoptimaliseerd voor specifieke zaadfractie'
  },
  {
    metric: 'Waterretentie',
    cells84: '36-40 uur',
    cells104: '24-32 uur',
    winner: '84',
    explanation: 'Groter volume betekent langere periode tussen watergiften'
  },
  {
    metric: 'Plantsterkte',
    cells84: '⭐⭐⭐⭐⭐',
    cells104: '⭐⭐⭐⭐',
    winner: '84',
    explanation: 'Meer wortelruimte resulteert in krachtiger, veerkrachtiger planten'
  },
  {
    metric: 'Ruimte-efficiëntie',
    cells84: '⭐⭐⭐',
    cells104: '⭐⭐⭐⭐⭐',
    winner: '104',
    explanation: 'Meer planten per m² kasoppervlak, ideaal voor volume productie'
  },
  {
    metric: 'Transportgewicht (vol)',
    cells84: '2.8-3.2 kg',
    cells104: '2.6-2.9 kg',
    winner: '104',
    explanation: 'Lichter per tray, maar let op: meer trays nodig voor zelfde aantal planten'
  }
];

interface CropRecommendation {
  crop: string;
  recommended: '84' | '104' | 'both';
  reason: string;
  additionalNotes: string;
}

const cropRecommendations: CropRecommendation[] = [
  {
    crop: 'Tomaat (groot fruit)',
    recommended: '84',
    reason: 'Grote zaden en lang wortelgestel vereisen extra volume',
    additionalNotes: 'Teeltduur 7-8 weken voor sterke transplanten'
  },
  {
    crop: 'Cherry Tomaat',
    recommended: 'both',
    reason: 'Beide maten geschikt, afhankelijk van teeltduur',
    additionalNotes: '84 voor langere teelt (6-7 weken), 104 voor snellere cyclus (5-6 weken)'
  },
  {
    crop: 'Paprika',
    recommended: '84',
    reason: 'Trage kieming en lange teeltduur vragen om meer wortelruimte',
    additionalNotes: 'Minimaal 6-8 weken teeltduur voor optimale transplanten'
  },
  {
    crop: 'Komkommer',
    recommended: '84',
    reason: 'Groot zaad en snelle groei vereisen voldoende volume',
    additionalNotes: 'Uitplanten na 4-5 weken om wortelspiralisatie te voorkomen'
  },
  {
    crop: 'Aubergine',
    recommended: '84',
    reason: 'Langzame kieming en lange teeltduur (8+ weken)',
    additionalNotes: 'Extra warmte nodig, grotere cel helpt temperatuur stabiliseren'
  },
  {
    crop: 'IJsbergsla',
    recommended: '104',
    reason: 'Klein zaad en korte teeltcyclus (4-5 weken)',
    additionalNotes: 'Snelle omloop, volume productie mogelijk'
  },
  {
    crop: 'Veldsla',
    recommended: '104',
    reason: 'Zeer klein zaad, korte teeltduur (3-4 weken)',
    additionalNotes: 'Hoge dichtheid maximaal benutten'
  },
  {
    crop: 'Kool (alle types)',
    recommended: '104',
    reason: 'Uniform klein zaad, 5-6 weken teeltduur',
    additionalNotes: 'Ideaal voor massaproductie van uniforme transplanten'
  },
  {
    crop: 'Basilicum',
    recommended: '104',
    reason: 'Klein zaad, snelle cyclus (4-5 weken)',
    additionalNotes: 'Let op: 84 alleen voor premium potplanten'
  },
  {
    crop: 'Peterselie',
    recommended: '104',
    reason: 'Klein zaad, compacte groei',
    additionalNotes: 'Langzame kieming, maar compact blijvend'
  },
  {
    crop: 'Bieslook',
    recommended: '104',
    reason: 'Zeer fijn zaad, compacte groei',
    additionalNotes: 'Vaak meerdere zaden per cel'
  },
  {
    crop: 'Courgette',
    recommended: '84',
    reason: 'Zeer groot zaad, snelle groei',
    additionalNotes: 'Vroeg uitplanten (3-4 weken) om overgroei te voorkomen'
  }
];

const Page84vs104Comparison = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream via-white to-lumora-cream/30">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lumora-green-500/5 via-transparent to-lumora-gold/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-lumora-gold/10 rounded-full border border-lumora-gold/20">
              <span className="text-lumora-dark font-semibold text-sm">Definitieve Keuze Gids</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-lumora-dark mb-6">
              84 vs 104 Cell Paper Plug Trays
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              De twee populairste paper plug maten vergeleken: welke past perfect bij uw gewas,
              teeltsysteem en businessmodel? Maak de juiste keuze met onze complete analyse.
            </p>

            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                <span>10 Criteria vergeleken</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <span>12 Gewassen geanalyseerd</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <span>ROI Calculator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Decision Guide */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 text-center">
              Snelle Beslissing: Welke Past Bij U?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 84 Cells */}
              <div className="bg-gradient-to-br from-lumora-green-50 to-white p-8 rounded-2xl border-2 border-lumora-green-500 shadow-soft-lg">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🏆</div>
                  <h3 className="text-3xl font-bold text-lumora-dark">84 Cellen</h3>
                  <p className="text-lumora-green-600 font-semibold mt-2">Beste voor KWALITEIT</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-soft">
                    <h4 className="font-bold text-lumora-dark mb-2">✅ Kies 84 als u heeft:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-lumora-green-500 mt-1">•</span>
                        <span><strong>Grote groenten:</strong> tomaat, paprika, aubergine</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lumora-green-500 mt-1">•</span>
                        <span><strong>Lange teelt:</strong> 6-8+ weken</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lumora-green-500 mt-1">•</span>
                        <span><strong>Premium markt:</strong> uniforme, sterke planten</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lumora-green-500 mt-1">•</span>
                        <span><strong>Groot zaad:</strong> &gt;2.5mm diameter</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-lumora-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lumora-dark mb-2">💪 Sterke Punten:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✓ 22% meer wortelvolume</li>
                      <li>✓ Langere waterretentie</li>
                      <li>✓ Sterkere transplanten</li>
                      <li>✓ Minder uitval</li>
                    </ul>
                  </div>

                  <div className="text-center pt-4">
                    <Link
                      href={localizePathForLocale('/shop/paper-plug-tray-84', 'nl')}
                      className="inline-block bg-lumora-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-lumora-green-600 transition-all duration-300 shadow-soft"
                    >
                      Bestel 84 Cellen →
                    </Link>
                  </div>
                </div>
              </div>

              {/* 104 Cells */}
              <div className="bg-gradient-to-br from-lumora-gold/10 to-white p-8 rounded-2xl border-2 border-lumora-gold shadow-soft-lg">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">⚡</div>
                  <h3 className="text-3xl font-bold text-lumora-dark">104 Cellen</h3>
                  <p className="text-lumora-gold font-semibold mt-2">Beste voor EFFICIËNTIE</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-soft">
                    <h4 className="font-bold text-lumora-dark mb-2">✅ Kies 104 als u heeft:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-lumora-gold mt-1">•</span>
                        <span><strong>Bladgewassen:</strong> sla, kool, kruiden</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lumora-gold mt-1">•</span>
                        <span><strong>Korte cyclus:</strong> 4-6 weken</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lumora-gold mt-1">•</span>
                        <span><strong>Volume productie:</strong> efficiëntie prioriteit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-lumora-gold mt-1">•</span>
                        <span><strong>Klein zaad:</strong> &lt;2mm diameter</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-lumora-gold/10 p-4 rounded-lg">
                    <h4 className="font-bold text-lumora-dark mb-2">💪 Sterke Punten:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>✓ 24% meer planten per tray</li>
                      <li>✓ Lagere kosten per plant</li>
                      <li>✓ Efficiënter ruimtegebruik</li>
                      <li>✓ Snellere omloop</li>
                    </ul>
                  </div>

                  <div className="text-center pt-4">
                    <Link
                      href={localizePathForLocale('/shop/paper-plug-tray-104', 'nl')}
                      className="inline-block bg-lumora-gold text-white px-6 py-3 rounded-xl font-bold hover:bg-lumora-gold/90 transition-all duration-300 shadow-soft"
                    >
                      Bestel 104 Cellen →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-4 text-center">
              Technische Specificaties Vergelijking
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Objectieve analyse van 10 belangrijke criteria voor professionele kwekers
            </p>

            <div className="bg-white rounded-2xl shadow-soft-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-lumora-dark to-lumora-green-600 text-white">
                      <th className="p-4 text-left font-bold">Criterium</th>
                      <th className="p-4 text-center font-bold">84 Cellen</th>
                      <th className="p-4 text-center font-bold">104 Cellen</th>
                      <th className="p-4 text-center font-bold">Winnaar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicalComparison.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-lumora-cream/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="font-semibold text-lumora-dark">{item.metric}</div>
                          <div className="text-sm text-gray-600 mt-1">{item.explanation}</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`font-semibold ${item.winner === '84' ? 'text-lumora-green-600' : 'text-gray-700'}`}>
                            {item.cells84}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`font-semibold ${item.winner === '104' ? 'text-lumora-gold' : 'text-gray-700'}`}>
                            {item.cells104}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {item.winner === '84' && <span className="text-2xl">🟢</span>}
                          {item.winner === '104' && <span className="text-2xl">🟡</span>}
                          {item.winner === 'tie' && <span className="text-2xl">⚖️</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-lumora-cream/30 p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl mb-2">🟢</div>
                    <div className="font-bold text-lumora-dark">84 Cellen</div>
                    <div className="text-sm text-gray-600">Wint op 5 criteria</div>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">⚖️</div>
                    <div className="font-bold text-lumora-dark">Gelijkspel</div>
                    <div className="text-sm text-gray-600">2 criteria gelijk</div>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">🟡</div>
                    <div className="font-bold text-lumora-dark">104 Cellen</div>
                    <div className="text-sm text-gray-600">Wint op 3 criteria</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crop Recommendations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-4 text-center">
              Aanbevelingen per Gewas
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Praktische keuze gids voor 12 populaire kwekerij gewassen
            </p>

            <div className="space-y-4">
              {cropRecommendations.map((crop, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border-2 border-gray-100 hover:border-lumora-green-500/30 transition-all duration-300 shadow-soft hover:shadow-soft-lg overflow-hidden"
                >
                  <div className="grid md:grid-cols-4 gap-4 p-6">
                    <div className="md:col-span-1">
                      <h3 className="text-xl font-bold text-lumora-dark mb-1">{crop.crop}</h3>
                      <div className="mt-2">
                        {crop.recommended === '84' && (
                          <span className="inline-block px-3 py-1 bg-lumora-green-500 text-white text-sm font-bold rounded-full">
                            84 Cellen
                          </span>
                        )}
                        {crop.recommended === '104' && (
                          <span className="inline-block px-3 py-1 bg-lumora-gold text-white text-sm font-bold rounded-full">
                            104 Cellen
                          </span>
                        )}
                        {crop.recommended === 'both' && (
                          <span className="inline-block px-3 py-1 bg-lumora-dark text-white text-sm font-bold rounded-full">
                            Beide geschikt
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-3 space-y-2">
                      <div>
                        <span className="font-semibold text-lumora-dark">Reden: </span>
                        <span className="text-gray-700">{crop.reason}</span>
                      </div>
                      <div className="bg-lumora-cream/30 p-3 rounded-lg">
                        <span className="font-semibold text-lumora-dark">💡 Tip: </span>
                        <span className="text-gray-700">{crop.additionalNotes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost Analysis */}
      <section className="py-16 bg-gradient-to-b from-lumora-cream/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 text-center">
              Kosten-Batenanalyse
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 84 Cell Cost Breakdown */}
              <div className="bg-white p-8 rounded-2xl shadow-soft-lg">
                <h3 className="text-2xl font-bold text-lumora-dark mb-6 flex items-center gap-2">
                  <span className="text-3xl">💰</span>
                  84 Cellen Kostenanalyse
                </h3>

                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Prijs per tray (8 stuks)</span>
                      <span className="font-bold">€1,18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Kosten per plant</span>
                      <span className="font-bold text-lumora-green-600">€0,014</span>
                    </div>
                  </div>

                  <div className="bg-lumora-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lumora-dark mb-3">Per 1000 planten:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Trays nodig:</span>
                        <span className="font-semibold">12 trays</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Materiaalkosten:</span>
                        <span className="font-semibold">€14,16</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kasruimte:</span>
                        <span className="font-semibold">3.6 m²</span>
                      </div>
                      <div className="flex justify-between border-t border-lumora-green-200 pt-2 mt-2">
                        <span className="font-bold">Totaal per plant:</span>
                        <span className="font-bold text-lumora-green-600">€0,014</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-lumora-cream/50 p-4 rounded-lg">
                    <h4 className="font-bold text-lumora-dark mb-2">✅ Voordelen:</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Lagere uitval (gemiddeld 2-3% vs 5-7%)</li>
                      <li>• Sterkere planten = hogere verkoopprijs</li>
                      <li>• Minder watergiften = lagere arbeidskosten</li>
                      <li>• Betere uniformiteit</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 104 Cell Cost Breakdown */}
              <div className="bg-white p-8 rounded-2xl shadow-soft-lg">
                <h3 className="text-2xl font-bold text-lumora-dark mb-6 flex items-center gap-2">
                  <span className="text-3xl">💰</span>
                  104 Cellen Kostenanalyse
                </h3>

                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Prijs per tray (8 stuks)</span>
                      <span className="font-bold">€1,18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Kosten per plant</span>
                      <span className="font-bold text-lumora-gold">€0,011</span>
                    </div>
                  </div>

                  <div className="bg-lumora-gold/10 p-4 rounded-lg">
                    <h4 className="font-bold text-lumora-dark mb-3">Per 1000 planten:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Trays nodig:</span>
                        <span className="font-semibold">10 trays</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Materiaalkosten:</span>
                        <span className="font-semibold">€11,80</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kasruimte:</span>
                        <span className="font-semibold">3.0 m²</span>
                      </div>
                      <div className="flex justify-between border-t border-lumora-gold/30 pt-2 mt-2">
                        <span className="font-bold">Totaal per plant:</span>
                        <span className="font-bold text-lumora-gold">€0,011</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-lumora-cream/50 p-4 rounded-lg">
                    <h4 className="font-bold text-lumora-dark mb-2">✅ Voordelen:</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• 21% lagere materiaalkosten per 1000 planten</li>
                      <li>• 17% minder kasruimte nodig</li>
                      <li>• Snellere cyclus = meer oogsten per jaar</li>
                      <li>• Ideaal voor volume productie</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Comparison */}
            <div className="mt-12 bg-gradient-to-br from-lumora-dark to-lumora-green-600 text-white p-8 rounded-2xl shadow-soft-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">📊 ROI Vergelijking (10.000 planten/jaar)</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🟢</div>
                    <div className="text-2xl font-bold mb-2">84 Cellen</div>
                    <div className="text-3xl font-bold text-lumora-gold mb-2">€141,60</div>
                    <div className="text-sm opacity-80">Materiaalkosten/jaar</div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="text-sm">Uitval: 2-3%</div>
                      <div className="text-sm">Kweker verkoopprijs: +15%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🟡</div>
                    <div className="text-2xl font-bold mb-2">104 Cellen</div>
                    <div className="text-3xl font-bold text-lumora-gold mb-2">€118,00</div>
                    <div className="text-sm opacity-80">Materiaalkosten/jaar</div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="text-sm">Uitval: 5-7%</div>
                      <div className="text-sm">Kweker verkoopprijs: standaard</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 p-6 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl mb-2">💡</div>
                    <div className="text-2xl font-bold mb-2">Verschil</div>
                    <div className="text-3xl font-bold text-lumora-cream mb-2">€23,60</div>
                    <div className="text-sm opacity-80">Materiaal besparing 104</div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="text-sm font-bold">Maar let op:</div>
                      <div className="text-xs opacity-80">Lagere uitval + hogere prijs 84 kan totaal winstgevender zijn</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white/10 p-4 rounded-xl text-center">
                <p className="text-sm">
                  <strong>💡 Conclusie:</strong> 104 heeft lagere directe kosten, maar 84 kan hoger rendement opleveren
                  door betere kwaliteit en lagere uitval. Kies op basis van uw markt en gewas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Considerations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-12 text-center">
              Praktische Overwegingen
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-lumora-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-lumora-dark mb-4 flex items-center gap-2">
                    <span className="text-2xl">💧</span>
                    Watermanagement
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="border-l-4 border-lumora-green-500 pl-4">
                      <p className="font-semibold">84 Cellen:</p>
                      <p className="text-sm">Water elke 36-40 uur. Grotere buffer tegen droogte stress.</p>
                    </div>
                    <div className="border-l-4 border-lumora-gold pl-4">
                      <p className="font-semibold">104 Cellen:</p>
                      <p className="text-sm">Water elke 24-32 uur. Intensievere monitoring nodig.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-lumora-cream/50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-lumora-dark mb-4 flex items-center gap-2">
                    <span className="text-2xl">🌡️</span>
                    Klimaatbeheersing
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="border-l-4 border-lumora-green-500 pl-4">
                      <p className="font-semibold">84 Cellen:</p>
                      <p className="text-sm">Stabielere worteltemperatuur. Minder gevoelig voor schommelingen.</p>
                    </div>
                    <div className="border-l-4 border-lumora-gold pl-4">
                      <p className="font-semibold">104 Cellen:</p>
                      <p className="text-sm">Snellere temperatuurveranderingen. Beter klimaatregeling vereist.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-lumora-gold/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-lumora-dark mb-4 flex items-center gap-2">
                    <span className="text-2xl">🚚</span>
                    Transport & Logistiek
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="border-l-4 border-lumora-green-500 pl-4">
                      <p className="font-semibold">84 Cellen:</p>
                      <p className="text-sm">Zwaarder maar steviger. Minder breuk tijdens transport.</p>
                    </div>
                    <div className="border-l-4 border-lumora-gold pl-4">
                      <p className="font-semibold">104 Cellen:</p>
                      <p className="text-sm">Lichter per tray. Let op stabiliteit bij stapelen.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-lumora-dark/5 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-lumora-dark mb-4 flex items-center gap-2">
                    <span className="text-2xl">⏰</span>
                    Arbeidskosten
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="border-l-4 border-lumora-green-500 pl-4">
                      <p className="font-semibold">84 Cellen:</p>
                      <p className="text-sm">Minder watergiften. Lagere arbeidsintensiteit.</p>
                    </div>
                    <div className="border-l-4 border-lumora-gold pl-4">
                      <p className="font-semibold">104 Cellen:</p>
                      <p className="text-sm">Meer watergiften. Intensievere monitoring, maar meer planten per handeling.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Recommendation */}
      <section className="py-16 bg-gradient-to-br from-lumora-cream via-lumora-green-50 to-lumora-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 text-center">
              Onze Eindconclusie
            </h2>

            <div className="bg-white p-8 rounded-2xl shadow-soft-xl">
              <div className="space-y-6">
                <div className="bg-lumora-green-50 p-6 rounded-xl border-2 border-lumora-green-500/20">
                  <h3 className="text-2xl font-bold text-lumora-dark mb-4">🏆 Geen absolute winnaar</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Beide maten hebben hun plek in professionele kwekerijen. De keuze hangt af van uw
                    specifieke gewassen, teeltsysteem en businessmodel.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-lumora-green-50 to-white p-6 rounded-xl">
                    <h4 className="font-bold text-lumora-dark mb-3">✅ Kies 84 Cellen voor:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Premium kwaliteit prioriteit</li>
                      <li>• Grote groenten (tomaat, paprika)</li>
                      <li>• Langere teeltcyclus (6-8+ weken)</li>
                      <li>• Beperkte irrigatie capaciteit</li>
                      <li>• Hogere verkoopprijzen mogelijk</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-lumora-gold/10 to-white p-6 rounded-xl">
                    <h4 className="font-bold text-lumora-dark mb-3">✅ Kies 104 Cellen voor:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Volume productie prioriteit</li>
                      <li>• Bladgewassen en kruiden</li>
                      <li>• Kortere teeltcyclus (4-6 weken)</li>
                      <li>• Maximale ruimte-efficiëntie</li>
                      <li>• Kostenoptimalisatie</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-lumora-cream/50 p-6 rounded-xl">
                  <h4 className="font-bold text-lumora-dark mb-3 flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    Pro Tip: Start met Beide
                  </h4>
                  <p className="text-gray-700">
                    Veel professionele kwekers gebruiken <strong>beide maten</strong> voor verschillende gewassen
                    en toepassingen. Start met 1 doos van elke maat (8 trays) om te testen wat het beste
                    werkt voor uw specifieke situatie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-lumora-green-500 to-lumora-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Bestel Uw Paper Plug Trays Vandaag
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Professionele kwaliteit, biologisch gecertificeerd, 100% recyclebaar.
              Directe levering voor optimaal verse trays.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={localizePathForLocale('/shop/paper-plug-tray-84', 'nl')}
                className="inline-block bg-white text-lumora-green-600 px-8 py-4 rounded-xl font-bold hover:bg-lumora-cream transition-all duration-300 shadow-soft-lg hover:shadow-soft-xl"
              >
                Bestel 84 Cellen →
              </Link>
              <Link
                href={localizePathForLocale('/shop/paper-plug-tray-104', 'nl')}
                className="inline-block bg-lumora-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-lumora-dark/90 transition-all duration-300 shadow-soft-lg hover:shadow-soft-xl"
              >
                Bestel 104 Cellen →
              </Link>
            </div>

            <p className="mt-8 text-white/80 text-sm">
              ✓ Vanaf €1,18 per tray bij 8 stuks | ✓ Biologisch gecertificeerd | ✓ Gratis verzending boven €150
            </p>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-lumora-dark mb-6 text-center">
              Gerelateerde Artikelen
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href={localizePathForLocale('/technische-specs/celgroottes-toepassingen', 'nl')}
                className="block bg-lumora-cream/30 p-6 rounded-xl hover:shadow-soft transition-all duration-300"
              >
                <h4 className="font-bold text-lumora-dark mb-2">Alle Celgroottes Vergelijken</h4>
                <p className="text-gray-600 text-sm mb-3">Van 72 tot 144 cellen: complete gids</p>
                <span className="text-lumora-green-600 text-sm font-semibold">Lees meer →</span>
              </Link>

              <Link
                href={localizePathForLocale('/seo/voordelen/biologische-certificering', 'nl')}
                className="block bg-lumora-cream/30 p-6 rounded-xl hover:shadow-soft transition-all duration-300"
              >
                <h4 className="font-bold text-lumora-dark mb-2">Biologische Certificering</h4>
                <p className="text-gray-600 text-sm mb-3">Waarom biologische paper plugs?</p>
                <span className="text-lumora-green-600 text-sm font-semibold">Lees meer →</span>
              </Link>

              <Link
                href={localizePathForLocale('/products', 'nl')}
                className="block bg-lumora-cream/30 p-6 rounded-xl hover:shadow-soft transition-all duration-300"
              >
                <h4 className="font-bold text-lumora-dark mb-2">Alle Paper Plug Producten</h4>
                <p className="text-gray-600 text-sm mb-3">Bekijk ons complete assortiment</p>
                <span className="text-lumora-green-600 text-sm font-semibold">Bekijk producten →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page84vs104Comparison;
