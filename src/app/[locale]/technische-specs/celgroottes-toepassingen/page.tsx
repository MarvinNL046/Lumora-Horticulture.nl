import { Metadata } from 'next';
import Link from 'next/link';
import { localizePathForLocale } from '@/lib/url-localizations';

export const metadata: Metadata = {
  title: 'Paper Plug Celgroottes & Toepassingen | Technische Specificaties',
  description: 'Uitgebreide gids over celgroottes voor paper plug trays: van 84 tot 288 cellen. Ontdek welke celgrootte perfect past bij uw gewassen, zaadgrootte en teeltsysteem.',
  keywords: 'paper plug celgroottes, tray celgrootte, 84 cellen, 104 cellen, 144 cellen, zaadgrootte paper plug, celgrootte gewassen, paper plug specificaties',
};

interface CellSize {
  cells: number;
  cellVolume: string;
  cellDimensions: string;
  idealFor: string[];
  seedTypes: string[];
  transplantWeeks: string;
  advantages: string[];
  disadvantages: string[];
}

const cellSizes: CellSize[] = [
  {
    cells: 72,
    cellVolume: '38-42 ml',
    cellDimensions: '45 x 45 mm',
    idealFor: [
      'Grote groenten (tomaat, paprika, aubergine)',
      'Kruiden met groot wortelgestel',
      'Langere teeltduur (8-10 weken)',
      'Premium transplanten'
    ],
    seedTypes: ['Groot zaad (&gt;3mm)', 'Pellet zaad', 'Voorbehandeld zaad'],
    transplantWeeks: '8-10 weken',
    advantages: [
      'Maximaal wortelvolume',
      'Minimaal transplantshock',
      'Langere teelt mogelijk',
      'Sterke, uniforme planten'
    ],
    disadvantages: [
      'Hogere kosten per tray',
      'Meer ruimte nodig',
      'Zwaarder bij transport',
      'Beperkt aantal planten per tray'
    ]
  },
  {
    cells: 84,
    cellVolume: '32-35 ml',
    cellDimensions: '42 x 42 mm',
    idealFor: [
      'Tomaten, paprika, komkommer',
      'Middelgrote groenten',
      'Sierteelt (gerbera, anthurium)',
      'Universele toepassing'
    ],
    seedTypes: ['Middelgroot tot groot zaad', 'Meeste groentesoorten', 'Kruidenzaden'],
    transplantWeeks: '6-8 weken',
    advantages: [
      'Beste prijs/prestatie verhouding',
      'Geschikt voor meeste gewassen',
      'Goede wortelontwikkeling',
      'Breed toepasbaar'
    ],
    disadvantages: [
      'Voor sommige gewassen te groot',
      'Relatief meer ruimte dan 104',
      'Iets hogere kosten per plant'
    ]
  },
  {
    cells: 104,
    cellVolume: '25-28 ml',
    cellDimensions: '38 x 38 mm',
    idealFor: [
      'Sla, kool, bladgewassen',
      'Kruiden (basilicum, peterselie)',
      'Eenjarige bloemen',
      'Kortere teeltcyclus'
    ],
    seedTypes: ['Middelgroot zaad', 'Klein tot middelgroot zaad', 'Fijn zaad in pellet'],
    transplantWeeks: '4-6 weken',
    advantages: [
      'Efficiënt ruimtegebruik',
      'Lagere kosten per plant',
      'Snelle cyclus',
      'Ideaal voor volume productie'
    ],
    disadvantages: [
      'Beperkt wortelvolume',
      'Kortere teeltduur',
      'Niet voor grote gewassen',
      'Vroeger uitplanten nodig'
    ]
  },
  {
    cells: 128,
    cellVolume: '18-20 ml',
    cellDimensions: '32 x 32 mm',
    idealFor: [
      'Kleine bladgewassen',
      'Baby leaf productie',
      'Compacte kruiden',
      'Snelle cyclus gewassen'
    ],
    seedTypes: ['Klein zaad', 'Fijn zaad', 'Gepelleteerd fijn zaad'],
    transplantWeeks: '3-5 weken',
    advantages: [
      'Hoge dichtheid',
      'Zeer lage kosten per plant',
      'Snelle omloop',
      'Ideaal voor microgreens'
    ],
    disadvantages: [
      'Zeer beperkt volume',
      'Alleen kleine gewassen',
      'Intensief waterregime',
      'Korte teeltperiode'
    ]
  },
  {
    cells: 144,
    cellVolume: '15-18 ml',
    cellDimensions: '28 x 28 mm',
    idealFor: [
      'Microgreens',
      'Baby vegetables',
      'Zeer kleine kruiden',
      'Zaailingsproductie'
    ],
    seedTypes: ['Zeer fijn zaad', 'Kleine zaadjes', 'Meerdere zaden per cel'],
    transplantWeeks: '2-4 weken',
    advantages: [
      'Maximum aantal per tray',
      'Laagste kosten per plant',
      'Ideaal voor massaproductie',
      'Ruimtebesparend'
    ],
    disadvantages: [
      'Minimaal volume',
      'Zeer beperkte toepassingen',
      'Intensieve zorg nodig',
      'Beperkte teeltduur'
    ]
  }
];

const CellSizeComparison = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream via-white to-lumora-cream/30">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lumora-dark/5 via-transparent to-lumora-green-500/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-lumora-green-500/10 rounded-full border border-lumora-green-500/20">
              <span className="text-lumora-green-600 font-semibold text-sm">Technische Specificaties</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-lumora-dark mb-6">
              Paper Plug Celgroottes & Toepassingen
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Van 72 tot 144 cellen: Ontdek welke celgrootte optimaal is voor uw gewassen,
              zaadtype en teeltsysteem. Complete vergelijking met praktische toepassingen.
            </p>

            <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-lumora-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5 celgroottes vergeleken</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-lumora-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Volledige specificaties</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-lumora-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Praktische keuze criteria</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Selection Guide */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 text-center">
              Snelle Selectie Gids
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-lumora-green-50 to-white p-6 rounded-xl border-2 border-lumora-green-500/20 shadow-soft">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="text-xl font-bold text-lumora-dark mb-3">Grote Groenten</h3>
                <p className="text-gray-600 mb-4">Tomaat, paprika, aubergine, komkommer</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold">Aanbevolen:</span>
                    <span className="text-lumora-green-600 font-bold">72-84 cellen</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Maximaal wortelvolume voor sterke, uniforme planten
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-lumora-cream to-white p-6 rounded-xl border-2 border-lumora-gold/20 shadow-soft">
                <div className="text-3xl mb-3">🥬</div>
                <h3 className="text-xl font-bold text-lumora-dark mb-3">Bladgewassen</h3>
                <p className="text-gray-600 mb-4">Sla, kool, bladgroenten, kruiden</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold">Aanbevolen:</span>
                    <span className="text-lumora-green-600 font-bold">104-128 cellen</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Efficiënt ruimtegebruik voor snelle cyclus
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-lumora-dark/5 to-white p-6 rounded-xl border-2 border-lumora-dark/20 shadow-soft">
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="text-xl font-bold text-lumora-dark mb-3">Microgreens</h3>
                <p className="text-gray-600 mb-4">Baby vegetables, microgreens, zaailingen</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-semibold">Aanbevolen:</span>
                    <span className="text-lumora-green-600 font-bold">144+ cellen</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Maximum dichtheid voor massaproductie
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Cell Size Specifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-4 text-center">
              Gedetailleerde Specificaties per Celgrootte
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Uitgebreide vergelijking van alle gangbare celgroottes voor paper plug trays,
              inclusief toepassingen, voor- en nadelen.
            </p>

            <div className="space-y-8">
              {cellSizes.map((size, index) => (
                <div
                  key={size.cells}
                  className="bg-white rounded-xl shadow-soft-lg overflow-hidden border border-gray-100 hover:shadow-soft-xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-lumora-green-500 to-lumora-green-600 text-white p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-3xl font-bold mb-2">{size.cells} Cellen</h3>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="bg-white/20 px-3 py-1 rounded-full">
                            Volume: {size.cellVolume}
                          </span>
                          <span className="bg-white/20 px-3 py-1 rounded-full">
                            Afmetingen: {size.cellDimensions}
                          </span>
                          <span className="bg-white/20 px-3 py-1 rounded-full">
                            Teeltduur: {size.transplantWeeks}
                          </span>
                        </div>
                      </div>
                      <div className="text-5xl opacity-80">
                        {index === 0 ? '🏆' : index === 1 ? '⭐' : index === 2 ? '💚' : '⚡'}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-lumora-dark mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-lumora-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Ideaal voor
                        </h4>
                        <ul className="space-y-2">
                          {size.idealFor.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="text-lumora-green-500 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-lumora-dark mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-lumora-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                          Zaadtypes
                        </h4>
                        <ul className="space-y-2">
                          {size.seedTypes.map((type, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="text-lumora-gold mt-1">•</span>
                              <span>{type}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-lumora-dark mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          Voordelen
                        </h4>
                        <ul className="space-y-2">
                          {size.advantages.map((adv, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="text-green-500 mt-1">✓</span>
                              <span>{adv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-lumora-dark mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Beperkingen
                        </h4>
                        <ul className="space-y-2">
                          {size.disadvantages.map((dis, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="text-orange-500 mt-1">!</span>
                              <span>{dis}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 text-center">
              Directe Vergelijking
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-soft-lg rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-lumora-green-500 to-lumora-green-600 text-white">
                    <th className="p-4 text-left font-bold">Specificatie</th>
                    <th className="p-4 text-center font-bold">72 Cellen</th>
                    <th className="p-4 text-center font-bold">84 Cellen</th>
                    <th className="p-4 text-center font-bold">104 Cellen</th>
                    <th className="p-4 text-center font-bold">128 Cellen</th>
                    <th className="p-4 text-center font-bold">144 Cellen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-lumora-cream/30">
                    <td className="p-4 font-semibold text-lumora-dark">Celvolume</td>
                    <td className="p-4 text-center">38-42 ml</td>
                    <td className="p-4 text-center">32-35 ml</td>
                    <td className="p-4 text-center">25-28 ml</td>
                    <td className="p-4 text-center">18-20 ml</td>
                    <td className="p-4 text-center">15-18 ml</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-lumora-cream/30">
                    <td className="p-4 font-semibold text-lumora-dark">Celafmetingen</td>
                    <td className="p-4 text-center">45 x 45 mm</td>
                    <td className="p-4 text-center">42 x 42 mm</td>
                    <td className="p-4 text-center">38 x 38 mm</td>
                    <td className="p-4 text-center">32 x 32 mm</td>
                    <td className="p-4 text-center">28 x 28 mm</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-lumora-cream/30">
                    <td className="p-4 font-semibold text-lumora-dark">Teeltduur</td>
                    <td className="p-4 text-center">8-10 weken</td>
                    <td className="p-4 text-center">6-8 weken</td>
                    <td className="p-4 text-center">4-6 weken</td>
                    <td className="p-4 text-center">3-5 weken</td>
                    <td className="p-4 text-center">2-4 weken</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-lumora-cream/30">
                    <td className="p-4 font-semibold text-lumora-dark">Zaadgrootte</td>
                    <td className="p-4 text-center">Groot (&gt;3mm)</td>
                    <td className="p-4 text-center">Middel-Groot</td>
                    <td className="p-4 text-center">Middel</td>
                    <td className="p-4 text-center">Klein</td>
                    <td className="p-4 text-center">Zeer Klein</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-lumora-cream/30">
                    <td className="p-4 font-semibold text-lumora-dark">Ruimte-efficiëntie</td>
                    <td className="p-4 text-center">⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-lumora-cream/30">
                    <td className="p-4 font-semibold text-lumora-dark">Plantsterkte</td>
                    <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐</td>
                  </tr>
                  <tr className="hover:bg-lumora-cream/30">
                    <td className="p-4 font-semibold text-lumora-dark">Kosten per plant</td>
                    <td className="p-4 text-center text-orange-600">Hoogst</td>
                    <td className="p-4 text-center text-yellow-600">Gemiddeld+</td>
                    <td className="p-4 text-center text-green-600">Gemiddeld</td>
                    <td className="p-4 text-center text-green-600">Laag</td>
                    <td className="p-4 text-center text-green-600">Laagst</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Tree */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 text-center">
              Beslisboom: Kies de Juiste Celgrootte
            </h2>

            <div className="bg-gradient-to-br from-lumora-cream via-white to-lumora-green-50 p-8 rounded-2xl shadow-soft-lg">
              <div className="space-y-6">
                {/* Question 1 */}
                <div className="bg-white p-6 rounded-xl shadow-soft">
                  <h3 className="font-bold text-lumora-dark mb-4 text-lg">
                    1️⃣ Wat is de teeltduur van uw gewas?
                  </h3>
                  <div className="space-y-3 ml-6">
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-green-500 font-bold">→</span>
                      <div>
                        <span className="font-semibold">8+ weken:</span>
                        <span className="text-gray-600"> Kies 72 cellen voor maximale wortelontwikkeling</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-green-500 font-bold">→</span>
                      <div>
                        <span className="font-semibold">6-8 weken:</span>
                        <span className="text-gray-600"> 84 cellen biedt beste balans</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-green-500 font-bold">→</span>
                      <div>
                        <span className="font-semibold">4-6 weken:</span>
                        <span className="text-gray-600"> 104 cellen is meest efficiënt</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-green-500 font-bold">→</span>
                      <div>
                        <span className="font-semibold">&lt;4 weken:</span>
                        <span className="text-gray-600"> 128-144 cellen voor snelle cyclus</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="bg-white p-6 rounded-xl shadow-soft">
                  <h3 className="font-bold text-lumora-dark mb-4 text-lg">
                    2️⃣ Wat is de grootte van uw zaad?
                  </h3>
                  <div className="space-y-3 ml-6">
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-gold font-bold">→</span>
                      <div>
                        <span className="font-semibold">Groot (&gt;3mm):</span>
                        <span className="text-gray-600"> 72-84 cellen nodig</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-gold font-bold">→</span>
                      <div>
                        <span className="font-semibold">Middel (2-3mm):</span>
                        <span className="text-gray-600"> 84-104 cellen ideaal</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-gold font-bold">→</span>
                      <div>
                        <span className="font-semibold">Klein (1-2mm):</span>
                        <span className="text-gray-600"> 104-128 cellen past perfect</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-gold font-bold">→</span>
                      <div>
                        <span className="font-semibold">Zeer klein (&lt;1mm):</span>
                        <span className="text-gray-600"> 128-144 cellen vereist</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question 3 */}
                <div className="bg-white p-6 rounded-xl shadow-soft">
                  <h3 className="font-bold text-lumora-dark mb-4 text-lg">
                    3️⃣ Wat is uw productie prioriteit?
                  </h3>
                  <div className="space-y-3 ml-6">
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-dark font-bold">→</span>
                      <div>
                        <span className="font-semibold">Kwaliteit:</span>
                        <span className="text-gray-600"> Kies grotere cellen (72-84) voor sterke planten</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-dark font-bold">→</span>
                      <div>
                        <span className="font-semibold">Volume:</span>
                        <span className="text-gray-600"> Kleinere cellen (104-128) voor massaproductie</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lumora-dark font-bold">→</span>
                      <div>
                        <span className="font-semibold">Balans:</span>
                        <span className="text-gray-600"> 84-104 cellen biedt beste compromis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-lumora-green-50 rounded-xl border-2 border-lumora-green-500/20">
                <p className="text-center text-gray-700">
                  <strong className="text-lumora-dark">💡 Pro Tip:</strong> Begin met 84 of 104 cellen als u twijfelt.
                  Deze maten zijn het meest veelzijdig en geschikt voor 80% van alle toepassingen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Considerations */}
      <section className="py-16 bg-gradient-to-b from-white to-lumora-cream/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-12 text-center">
              Aanvullende Technische Overwegingen
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-soft">
                <h3 className="text-xl font-bold text-lumora-dark mb-4 flex items-center gap-2">
                  <span className="text-2xl">💧</span>
                  Waterregime per Celgrootte
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="border-l-4 border-lumora-green-500 pl-4">
                    <p className="font-semibold">72-84 cellen:</p>
                    <p className="text-sm">Minder frequent water, maar meer volume per beurt. Buffer tegen droogte.</p>
                  </div>
                  <div className="border-l-4 border-lumora-gold pl-4">
                    <p className="font-semibold">104-128 cellen:</p>
                    <p className="text-sm">Frequenter water nodig. Gevoeliger voor uitdroging.</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <p className="font-semibold">144+ cellen:</p>
                    <p className="text-sm">Dagelijkse bewaking vereist. Druppelsysteem aanbevolen.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-soft">
                <h3 className="text-xl font-bold text-lumora-dark mb-4 flex items-center gap-2">
                  <span className="text-2xl">🌡️</span>
                  Temperatuur Management
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="border-l-4 border-lumora-green-500 pl-4">
                    <p className="font-semibold">Grote cellen (72-84):</p>
                    <p className="text-sm">Stabielere temperatuur in wortelzone. Minder temperatuurschommelingen.</p>
                  </div>
                  <div className="border-l-4 border-lumora-gold pl-4">
                    <p className="font-semibold">Middel cellen (104-128):</p>
                    <p className="text-sm">Gevoeliger voor temperatuurfluctuaties. Extra monitoring nodig.</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <p className="font-semibold">Kleine cellen (144+):</p>
                    <p className="text-sm">Snelle opwarming/afkoeling. Klimaatbeheersing cruciaal.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-soft">
                <h3 className="text-xl font-bold text-lumora-dark mb-4 flex items-center gap-2">
                  <span className="text-2xl">🥗</span>
                  Voedingsstrategie
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>72-84 cellen:</strong> Langzame afgifte NPK (14-16-18). Start bemesting na 3 weken.</p>
                  <p><strong>104-128 cellen:</strong> Snellere cyclus, direct starten met lage EC (0.5-0.8).</p>
                  <p><strong>144+ cellen:</strong> Voorzichtige voeding vanaf begin. Regelmatige lage dosering.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-soft">
                <h3 className="text-xl font-bold text-lumora-dark mb-4 flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  Transport & Handling
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>72-84 cellen:</strong> Zwaarder, maar steviger. Minder risico op omvallen.</p>
                  <p><strong>104-128 cellen:</strong> Lichter per tray. Let op stabiliteit bij stapelen.</p>
                  <p><strong>144+ cellen:</strong> Zeer fragiel. Extra zorgvuldig transport vereist.</p>
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
              Vind Uw Ideale Paper Plug Tray
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Bestel direct de juiste celgrootte voor uw gewas. Professionele kwaliteit,
              duurzaam papier, optimaal voor biologische teelt.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={localizePathForLocale('/shop/paper-plug-tray-84', 'nl')}
                className="inline-block bg-white text-lumora-green-600 px-8 py-4 rounded-xl font-bold hover:bg-lumora-cream transition-all duration-300 shadow-soft-lg hover:shadow-soft-xl"
              >
                84 Cellen Tray →
              </Link>
              <Link
                href={localizePathForLocale('/shop/paper-plug-tray-104', 'nl')}
                className="inline-block bg-lumora-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-lumora-dark/90 transition-all duration-300 shadow-soft-lg hover:shadow-soft-xl"
              >
                104 Cellen Tray →
              </Link>
            </div>

            <p className="mt-8 text-white/80 text-sm">
              ✓ Vanaf €1,18 per tray bij 8 stuks | ✓ Biologisch gecertificeerd | ✓ 100% recyclebaar
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
                href={localizePathForLocale('/technische-specs/84-vs-104-vergelijking', 'nl')}
                className="block bg-lumora-cream/30 p-6 rounded-xl hover:shadow-soft transition-all duration-300"
              >
                <h4 className="font-bold text-lumora-dark mb-2">84 vs 104 Cellen: Welke Kiezen?</h4>
                <p className="text-gray-600 text-sm mb-3">Directe vergelijking van de twee populairste maten</p>
                <span className="text-lumora-green-600 text-sm font-semibold">Lees meer →</span>
              </Link>

              <Link
                href={localizePathForLocale('/seo/voordelen/biologische-certificering', 'nl')}
                className="block bg-lumora-cream/30 p-6 rounded-xl hover:shadow-soft transition-all duration-300"
              >
                <h4 className="font-bold text-lumora-dark mb-2">Biologische Certificering</h4>
                <p className="text-gray-600 text-sm mb-3">Waarom biologische paper plugs kiezen?</p>
                <span className="text-lumora-green-600 text-sm font-semibold">Lees meer →</span>
              </Link>

              <Link
                href={localizePathForLocale('/products', 'nl')}
                className="block bg-lumora-cream/30 p-6 rounded-xl hover:shadow-soft transition-all duration-300"
              >
                <h4 className="font-bold text-lumora-dark mb-2">Alle Paper Plug Producten</h4>
                <p className="text-gray-600 text-sm mb-3">Bekijk ons complete productassortiment</p>
                <span className="text-lumora-green-600 text-sm font-semibold">Bekijk producten →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CellSizeComparison;
