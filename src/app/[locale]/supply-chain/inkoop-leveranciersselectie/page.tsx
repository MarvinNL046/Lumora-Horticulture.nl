import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, TrendingUp, Shield, Clock, Users, FileCheck, Truck, BarChart3, AlertCircle, Star } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Inkoop en Leveranciersselectie Teeltmateriaal | Professionele Gids | Lumora',
    description: 'Professionele gids voor inkoop en leveranciersselectie van teeltmateriaal. Selectiecriteria, contractonderhandelingen, kwaliteitscontrole en risicomanagement voor kwekerijen.',
    keywords: 'inkoop teeltmateriaal, leveranciersselectie, kwaliteitscontrole, contractonderhandelingen, risicomanagement, kwekerij inkoop',
    openGraph: {
      title: 'Inkoop en Leveranciersselectie Teeltmateriaal | Lumora',
      description: 'Complete gids voor professionele inkoop en leveranciersselectie van teeltmateriaal',
      type: 'article',
    },
  }
}

export default function InkoopLeveranciersselectiePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-lumora-cream to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lumora-dark to-lumora-dark/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-lumora-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Supply Chain Management</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Inkoop en Leveranciersselectie
              <span className="block text-lumora-gold mt-2">Professionele Teeltmateriaal Procurement</span>
            </h1>

            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Strategische gids voor het selecteren en managen van betrouwbare leveranciers van teeltmateriaal.
              Van selectiecriteria tot contractonderhandelingen en kwaliteitscontrole.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-lumora-gold" />
                <span>Selectiecriteria</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-lumora-gold" />
                <span>Contract Management</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-lumora-gold" />
                <span>Prestatie Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-lumora-cream/30 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-lumora-dark mb-4">Inhoud van deze gids</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <a href="#selectiecriteria" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Leveranciersselectiecriteria
              </a>
              <a href="#evaluatie" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Evaluatie en Due Diligence
              </a>
              <a href="#onderhandelingen" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Contractonderhandelingen
              </a>
              <a href="#kwaliteit" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Kwaliteitscontrole Systemen
              </a>
              <a href="#monitoring" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Prestatie Monitoring
              </a>
              <a href="#risico" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Risicomanagement
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Selectiecriteria */}
        <section id="selectiecriteria" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-lumora-green-500" />
            Leveranciersselectiecriteria
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              Het selecteren van de juiste leveranciers is cruciaal voor de continuïteit en kwaliteit van uw teeltproces.
              Een systematische aanpak met duidelijke criteria voorkomt kostbare fouten en zorgt voor betrouwbare partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-soft-md p-6 border-l-4 border-lumora-green-500">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-lumora-gold" />
                Primaire Criteria
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-lumora-dark">Productkwaliteit:</strong>
                    <p className="text-sm text-gray-600 mt-1">Consistente kwaliteit, certificeringen (MPS, GlobalGAP), kwaliteitsgaranties en testresultaten</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-lumora-dark">Leverbetrouwbaarheid:</strong>
                    <p className="text-sm text-gray-600 mt-1">Levertijden, voorraadbeheer, flexibiliteit bij urgente orders, track record</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-lumora-dark">Prijs-kwaliteit verhouding:</strong>
                    <p className="text-sm text-gray-600 mt-1">Competitieve prijzen, volume kortingen, transparante prijsstructuur, geen verborgen kosten</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-lumora-dark">Financiële stabiliteit:</strong>
                    <p className="text-sm text-gray-600 mt-1">Kredietwaardigheid, betalingscondities, financiële gezondheid van het bedrijf</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-soft-md p-6 border-l-4 border-lumora-gold">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-lumora-gold" />
                Secundaire Criteria
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-lumora-dark">Technische ondersteuning:</strong>
                    <p className="text-sm text-gray-600 mt-1">Advisering, teeltadvies, probleemoplossing, klantenservice kwaliteit</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-lumora-dark">Innovatievermogen:</strong>
                    <p className="text-sm text-gray-600 mt-1">Nieuwe producten, R&D investeringen, marktleiderschap, duurzaamheid initiatieven</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-lumora-dark">Locatie en logistiek:</strong>
                    <p className="text-sm text-gray-600 mt-1">Geografische nabijheid, distributie netwerk, transport mogelijkheden</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-lumora-dark">Duurzaamheid:</strong>
                    <p className="text-sm text-gray-600 mt-1">Milieu certificaten, CO2 footprint, circulaire economie initiatieven</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-lumora-green-500/10 to-lumora-gold/10 rounded-lg p-6 border border-lumora-green-500/20">
            <h3 className="text-lg font-semibold text-lumora-dark mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-lumora-green-500" />
              Scorecard voor Leveranciersevaluatie
            </h3>
            <p className="text-gray-700 mb-4">
              Gebruik een gewogen scorecard om leveranciers objectief te beoordelen:
            </p>
            <div className="bg-white rounded-lg p-4 shadow-soft">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-lumora-green-500/20">
                    <th className="text-left py-2 font-semibold text-lumora-dark">Criterium</th>
                    <th className="text-center py-2 font-semibold text-lumora-dark">Weging</th>
                    <th className="text-center py-2 font-semibold text-lumora-dark">Score (1-10)</th>
                    <th className="text-right py-2 font-semibold text-lumora-dark">Resultaat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-2">Productkwaliteit</td>
                    <td className="text-center">30%</td>
                    <td className="text-center">-</td>
                    <td className="text-right">-</td>
                  </tr>
                  <tr>
                    <td className="py-2">Leverbetrouwbaarheid</td>
                    <td className="text-center">25%</td>
                    <td className="text-center">-</td>
                    <td className="text-right">-</td>
                  </tr>
                  <tr>
                    <td className="py-2">Prijs-kwaliteit</td>
                    <td className="text-center">20%</td>
                    <td className="text-center">-</td>
                    <td className="text-right">-</td>
                  </tr>
                  <tr>
                    <td className="py-2">Financiële stabiliteit</td>
                    <td className="text-center">15%</td>
                    <td className="text-center">-</td>
                    <td className="text-right">-</td>
                  </tr>
                  <tr>
                    <td className="py-2">Service & Support</td>
                    <td className="text-center">10%</td>
                    <td className="text-center">-</td>
                    <td className="text-right">-</td>
                  </tr>
                  <tr className="font-semibold bg-lumora-cream/30">
                    <td className="py-2">Totaal Score</td>
                    <td className="text-center">100%</td>
                    <td className="text-center">-</td>
                    <td className="text-right">-/10</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-600 mt-3">
                💡 Minimale acceptatie score: 7.0 | Preferred partner status: 8.5+
              </p>
            </div>
          </div>
        </section>

        {/* Evaluatie */}
        <section id="evaluatie" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <FileCheck className="w-8 h-8 text-lumora-green-500" />
            Evaluatie en Due Diligence
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              Grondige due diligence voorkomt toekomstige problemen en zorgt voor vertrouwen in uw leveranciers.
              Een systematisch evaluatieproces identificeert risico's voordat u zich aan een leverancier verbindt.
            </p>
          </div>

          <div className="grid gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-lumora-green-500" />
                Due Diligence Checklist
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lumora-dark mb-3">Bedrijfsinformatie</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>KVK nummer en handelsregister gegevens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Bedrijfshistorie en eigendomsstructuur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Jaarrekeningen laatste 3 jaar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Kredietrapport en rating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Verzekeringen en aansprakelijkheid</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lumora-dark mb-3">Operationele Capaciteit</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Productiecapaciteit en machines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Kwaliteitsmanagement systemen (ISO)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Magazijn en logistieke faciliteiten</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>IT systemen en order management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Backup leveranciers en contingency plans</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lumora-dark mb-3">Referenties en Track Record</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Referentieklanten contacteren (min. 3)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Leverbetrouwbaarheid historiek</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Klachtenafhandeling en customer service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Online reviews en reputatie check</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Branche certificeringen en awards</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lumora-dark mb-3">Compliance en Certificering</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Kwaliteitscertificaten (MPS, GlobalGAP)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Milieu certificaten (ISO 14001, FSC)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Arbeidsomstandigheden certificering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>REACH en wetgeving compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-lumora-green-500 mt-0.5">□</span>
                      <span>Product certificaten en test rapporten</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-lumora-dark mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Leveranciers Audit Proces
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
                  <h4 className="font-semibold text-sm mb-2">Desktop Audit</h4>
                  <p className="text-xs text-gray-600">Documentatie review, certificaten check, financiële analyse</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
                  <h4 className="font-semibold text-sm mb-2">Site Visit</h4>
                  <p className="text-xs text-gray-600">Bedrijfsbezoek, faciliteiten inspectie, management gesprek</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
                  <h4 className="font-semibold text-sm mb-2">Sample Testing</h4>
                  <p className="text-xs text-gray-600">Product samples testen, kwaliteitscontrole, laboratorium analyse</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-2">4</div>
                  <h4 className="font-semibold text-sm mb-2">Final Assessment</h4>
                  <p className="text-xs text-gray-600">Scorecard invullen, rapport opstellen, go/no-go beslissing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Onderhandelingen */}
        <section id="onderhandelingen" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-lumora-green-500" />
            Contractonderhandelingen
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              Effectieve onderhandelingen zorgen voor win-win situaties waarbij beide partijen profiteren.
              Een goed contract beschermt uw belangen en legt de basis voor een succesvolle samenwerking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-lumora-green-500" />
                Onderhandelingsstrategieën
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-lumora-green-500 pl-4">
                  <h4 className="font-semibold text-lumora-dark mb-2">1. Voorbereiding is Alles</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Ken uw alternatieve leveranciers (BATNA)</li>
                    <li>• Bepaal uw maximum prijs en minimum eisen</li>
                    <li>• Onderzoek marktprijzen en concurrentie</li>
                    <li>• Bereid kwantitatieve data voor (volumes, forecast)</li>
                  </ul>
                </div>
                <div className="border-l-4 border-lumora-gold pl-4">
                  <h4 className="font-semibold text-lumora-dark mb-2">2. Waarde Creëren</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Focus op totale ownership cost, niet alleen prijs</li>
                    <li>• Bespreek lange-termijn partnership voordelen</li>
                    <li>• Identificeer wederzijdse groei mogelijkheden</li>
                    <li>• Bied stabiliteit in ruil voor betere condities</li>
                  </ul>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lumora-dark mb-2">3. Flexibiliteit en Creativiteit</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Overweeg verschillende betalingsstructuren</li>
                    <li>• Bespreek volume tiers en groei incentives</li>
                    <li>• Onderhandel over service levels en garanties</li>
                    <li>• Denk aan exclusiviteit en partnerships</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-lumora-green-500" />
                Essentiële Contract Clausules
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-lumora-cream/30 rounded p-3">
                  <strong className="text-lumora-dark block mb-1">Prijzen en Betalingscondities</strong>
                  <p className="text-gray-600">Volume kortingen, prijsindexering, betalingstermijnen, vroegbetaal korting</p>
                </div>
                <div className="bg-lumora-cream/30 rounded p-3">
                  <strong className="text-lumora-dark block mb-1">Levering en Logistiek</strong>
                  <p className="text-gray-600">Levertijden, minimale bestelgroottes, transportverantwoordelijkheid (Incoterms), urgente orders</p>
                </div>
                <div className="bg-lumora-cream/30 rounded p-3">
                  <strong className="text-lumora-dark block mb-1">Kwaliteit en Garanties</strong>
                  <p className="text-gray-600">Kwaliteitsstandaarden, acceptatiecriteria, retourbeleid, garantie periode en condities</p>
                </div>
                <div className="bg-lumora-cream/30 rounded p-3">
                  <strong className="text-lumora-dark block mb-1">Aansprakelijkheid en Verzekering</strong>
                  <p className="text-gray-600">Product aansprakelijkheid, schadevergoeding, verzekeringseisen, force majeure clausules</p>
                </div>
                <div className="bg-lumora-cream/30 rounded p-3">
                  <strong className="text-lumora-dark block mb-1">Contract Duur en Beëindiging</strong>
                  <p className="text-gray-600">Looptijd, verlengings opties, opzegtermijnen, exit clausules</p>
                </div>
                <div className="bg-lumora-cream/30 rounded p-3">
                  <strong className="text-lumora-dark block mb-1">Geschillenbeslechting</strong>
                  <p className="text-gray-600">Escalatie procedures, mediatie, arbitrage, toepasselijk recht en rechtbank</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-lumora-dark mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Veel Gemaakte Onderhandelings Fouten
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-sm text-red-600 mb-2">❌ Te Snel Akkoord</h4>
                <p className="text-xs text-gray-600">Accepteer niet het eerste bod. Leveranciers verwachten onderhandeling en hebben meestal ruimte.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-sm text-red-600 mb-2">❌ Focus Alleen op Prijs</h4>
                <p className="text-xs text-gray-600">Kwaliteit, betrouwbaarheid en service zijn vaak belangrijker dan de laagste prijs.</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-sm text-red-600 mb-2">❌ Vage Afspraken</h4>
                <p className="text-xs text-gray-600">Alle afspraken zwart op wit vastleggen met meetbare criteria en deadlines.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Kwaliteitscontrole */}
        <section id="kwaliteit" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <Shield className="w-8 h-8 text-lumora-green-500" />
            Kwaliteitscontrole Systemen
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              Systematische kwaliteitscontrole voorkomt problemen en waarborgt consistente productkwaliteit.
              Een robuust systeem beschermt uw teelt en voorkomt kostbare uitval.
            </p>
          </div>

          <div className="grid gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4">Inkomende Goederencontrole Protocol</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-lumora-dark mb-3 flex items-center gap-2">
                    <span className="bg-lumora-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    Visuele Inspectie
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Verpakkingsschade controleren</li>
                    <li>• Product conditie beoordelen</li>
                    <li>• Kleur en consistentie check</li>
                    <li>• Verontreiniging detectie</li>
                    <li>• Etikettering verificatie</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lumora-dark mb-3 flex items-center gap-2">
                    <span className="bg-lumora-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    Administratieve Check
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Leverbon vs bestelling vergelijken</li>
                    <li>• Hoeveelheden controleren</li>
                    <li>• Batch nummers registreren</li>
                    <li>• Vervaldatum check</li>
                    <li>• Certificaten opvragen</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lumora-dark mb-3 flex items-center gap-2">
                    <span className="bg-lumora-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Functionele Testing
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Steekproef monsters nemen</li>
                    <li>• Afmetingen en gewicht meten</li>
                    <li>• Sterkte en duurzaamheid testen</li>
                    <li>• pH en EC waarden (substraten)</li>
                    <li>• Waterdoorlatendheid check</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Acceptatie Criteria per Product Type
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white rounded p-3">
                    <strong className="text-lumora-dark">Steenwolstekblokken:</strong>
                    <ul className="text-gray-600 mt-1 space-y-1">
                      <li>• Uniforme dichtheid (85-95 kg/m³)</li>
                      <li>• Geen zichtbare verontreiniging</li>
                      <li>• Correcte celafmetingen (±2mm)</li>
                      <li>• pH tussen 5.5-6.5</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded p-3">
                    <strong className="text-lumora-dark">Paper Plugs:</strong>
                    <ul className="text-gray-600 mt-1 space-y-1">
                      <li>• Geen schimmel of vocht schade</li>
                      <li>• Uniform gewicht per plug (±5%)</li>
                      <li>• Goede vorm stabiliteit</li>
                      <li>• Voldoende poriën voor wortels</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded p-3">
                    <strong className="text-lumora-dark">Transportdozen:</strong>
                    <ul className="text-gray-600 mt-1 space-y-1">
                      <li>• Geen structurele schade</li>
                      <li>• Correcte afmetingen (±5mm)</li>
                      <li>• Voldoende draagkracht</li>
                      <li>• Goede vouwen en kleefkracht</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
                <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Afkeur Protocol
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white rounded p-3">
                    <strong className="text-red-600">Kritische Afwijkingen (Direct Retour):</strong>
                    <ul className="text-gray-600 mt-1 space-y-1">
                      <li>• Zichtbare contaminatie of schimmel</li>
                      <li>• Ernstige structurele schade</li>
                      <li>• Afmeting buiten tolerantie (&gt;10%)</li>
                      <li>• Verkeerde product of specificatie</li>
                      <li>• Ontbrekende of verlopen certificaten</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded p-3">
                    <strong className="text-orange-600">Kleine Afwijkingen (Documenteren):</strong>
                    <ul className="text-gray-600 mt-1 space-y-1">
                      <li>• Cosmetische verpakkingsschade</li>
                      <li>• Kleine afmetingsvariaties (&lt;5%)</li>
                      <li>• Etikettering fouten</li>
                      <li>• Administratieve verschillen</li>
                    </ul>
                  </div>
                  <div className="bg-lumora-cream/50 rounded p-3">
                    <strong className="text-lumora-dark">Actie bij Afkeur:</strong>
                    <p className="text-gray-600 mt-1">
                      1. Foto documentatie maken<br/>
                      2. Leverancier binnen 24u informeren<br/>
                      3. Product isoleren (quarantaine)<br/>
                      4. Claim indienen met bewijs<br/>
                      5. Vervangingsleveringafspraak maken
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monitoring */}
        <section id="monitoring" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-lumora-green-500" />
            Prestatie Monitoring
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              Continue monitoring van leveranciersprestaties identificeert trends, problemen en verbetermogelijkheden.
              Data-gedreven beslissingen zorgen voor optimale leveranciers relaties.
            </p>
          </div>

          <div className="grid gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4">Key Performance Indicators (KPI's)</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <div className="text-sm text-gray-600 mb-1">On-Time Delivery</div>
                  <div className="text-2xl font-bold text-green-600 mb-2">95%+</div>
                  <div className="text-xs text-gray-600">Target: 98% | Min: 90%</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">Order Accuracy</div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">98%+</div>
                  <div className="text-xs text-gray-600">Target: 99.5% | Min: 95%</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <div className="text-sm text-gray-600 mb-1">Quality Acceptance</div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">97%+</div>
                  <div className="text-xs text-gray-600">Target: 99% | Min: 95%</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
                  <div className="text-sm text-gray-600 mb-1">Response Time</div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">&lt;24h</div>
                  <div className="text-xs text-gray-600">Target: &lt;4h | Max: 48h</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-soft-md p-6">
                <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-lumora-green-500" />
                  Quarterly Business Review (QBR)
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Voer elk kwartaal een formele review uit met strategische leveranciers:
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-lumora-green-500 text-lg">📊</span>
                    <div>
                      <strong className="text-lumora-dark">Performance Review:</strong>
                      <p className="text-gray-600">KPI dashboard bespreking, trend analyse, prestatie evaluatie</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lumora-green-500 text-lg">🎯</span>
                    <div>
                      <strong className="text-lumora-dark">Issue Resolution:</strong>
                      <p className="text-gray-600">Bespreken van problemen, root cause analyse, actieplannen opstellen</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lumora-green-500 text-lg">🚀</span>
                    <div>
                      <strong className="text-lumora-dark">Future Planning:</strong>
                      <p className="text-gray-600">Forecast sharing, nieuwe producten, innovatie mogelijkheden</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lumora-green-500 text-lg">💰</span>
                    <div>
                      <strong className="text-lumora-dark">Commercial Review:</strong>
                      <p className="text-gray-600">Prijzen evalueren, volume discounts, contract verlenging bespreken</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-soft-md p-6">
                <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-lumora-green-500" />
                  Continuous Improvement Programma
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Werk samen met leveranciers aan continue verbetering:
                </p>
                <div className="space-y-3">
                  <div className="bg-lumora-cream/30 rounded p-3">
                    <strong className="text-sm text-lumora-dark block mb-1">Gezamenlijke Doelen Stellen</strong>
                    <p className="text-xs text-gray-600">Definieer gezamenlijke verbeter doelen, meetbare targets, win-win situaties</p>
                  </div>
                  <div className="bg-lumora-cream/30 rounded p-3">
                    <strong className="text-sm text-lumora-dark block mb-1">Process Optimization</strong>
                    <p className="text-xs text-gray-600">Order processen stroomlijnen, EDI koppeling, voorraad optimalisatie</p>
                  </div>
                  <div className="bg-lumora-cream/30 rounded p-3">
                    <strong className="text-sm text-lumora-dark block mb-1">Innovation Workshops</strong>
                    <p className="text-xs text-gray-600">Nieuwe producten testen, duurzaamheid initiatieven, technologie adoptie</p>
                  </div>
                  <div className="bg-lumora-cream/30 rounded p-3">
                    <strong className="text-sm text-lumora-dark block mb-1">Best Practice Sharing</strong>
                    <p className="text-xs text-gray-600">Kennis uitwisseling, training sessies, industrie trends bespreken</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risicomanagement */}
        <section id="risico" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-lumora-green-500" />
            Risicomanagement
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              Proactief risicomanagement voorkomt supply chain verstoringen en beschermt uw bedrijfscontinuïteit.
              Een robuuste risico strategie bereidt u voor op onverwachte situaties.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4">Supply Chain Risico Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-lumora-green-500/20">
                      <th className="text-left py-3 px-4 font-semibold text-lumora-dark">Risico Type</th>
                      <th className="text-center py-3 px-4 font-semibold text-lumora-dark">Impact</th>
                      <th className="text-center py-3 px-4 font-semibold text-lumora-dark">Kans</th>
                      <th className="text-left py-3 px-4 font-semibold text-lumora-dark">Mitigatie Strategie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-lumora-cream/20">
                      <td className="py-3 px-4">Leveranciers faillissement</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Hoog</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Laag</span></td>
                      <td className="py-3 px-4 text-gray-600">Multi-sourcing, financiële monitoring, backup leveranciers</td>
                    </tr>
                    <tr className="hover:bg-lumora-cream/20">
                      <td className="py-3 px-4">Kwaliteitsproblemen</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Middel</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Middel</span></td>
                      <td className="py-3 px-4 text-gray-600">Strenge QC, audits, kwaliteitsclausules in contract</td>
                    </tr>
                    <tr className="hover:bg-lumora-cream/20">
                      <td className="py-3 px-4">Logistieke verstoringen</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Middel</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Hoog</span></td>
                      <td className="py-3 px-4 text-gray-600">Buffer voorraad, alternatieve transport, flexibele planning</td>
                    </tr>
                    <tr className="hover:bg-lumora-cream/20">
                      <td className="py-3 px-4">Prijsschommelingen</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Laag</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Hoog</span></td>
                      <td className="py-3 px-4 text-gray-600">Lange-termijn contracten, prijsindexering, hedging</td>
                    </tr>
                    <tr className="hover:bg-lumora-cream/20">
                      <td className="py-3 px-4">Geopolitieke instabiliteit</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Hoog</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Laag</span></td>
                      <td className="py-3 px-4 text-gray-600">Geografische diversificatie, lokale sourcing</td>
                    </tr>
                    <tr className="hover:bg-lumora-cream/20">
                      <td className="py-3 px-4">Cyber security bedreigingen</td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Middel</span></td>
                      <td className="text-center py-3 px-4"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">Middel</span></td>
                      <td className="py-3 px-4 text-gray-600">IT security eisen, data encryptie, backup systemen</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Multi-Sourcing Strategie
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Verminder leveranciers afhankelijkheid met strategische multi-sourcing:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>70/30 regel:</strong> Hoofdleverancier 70%, backup 30%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Dual sourcing:</strong> Twee gekwalificeerde leveranciers per kritisch product</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Geografische spreiding:</strong> Lokale en internationale leveranciers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Jaarlijkse review:</strong> Backup leveranciers blijven gekwalificeerd</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Business Continuity Plan
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Voorbereid zijn op supply chain verstoringen:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Safety stock:</strong> 2-4 weken buffer voorraad voor kritische items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Escalatie protocol:</strong> Contactpersonen en procedures gedocumenteerd</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Alternatieve producten:</strong> Geïdentificeerde substituten per product</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Jaarlijkse drill:</strong> BCP testen met scenario simulaties</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Early Warning Systeem
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Vroege signalen detecteren en proactief handelen:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Kwaliteit trends:</strong> Monitoring van afkeur percentages en klachten</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Leverprestatie:</strong> Late leveringen en voorraad issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Financiële gezondheid:</strong> Betalingsvertragingen en credit rating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Markt signalen:</strong> Industrie nieuws en concurrentie analyse</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-lumora-dark to-lumora-dark/90 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-bold mb-4">
              Optimaliseer Uw Inkoop Proces
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Lumora Horticulture biedt betrouwbare kwaliteit, transparante prijzen en professionele service.
              Ervaar het verschil van een strategische partner die uw teeltproces begrijpt.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/winkel"
                className="inline-flex items-center gap-2 bg-lumora-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-lumora-green-600 transition-colors shadow-lg"
              >
                Bekijk Ons Assortiment
                <span>→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Vraag Offerte Aan
              </Link>
            </div>
          </div>
        </section>

      </article>

      {/* Related Articles */}
      <section className="bg-lumora-cream/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-lumora-dark mb-8">Gerelateerde Supply Chain Onderwerpen</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/supply-chain/opslag-houdbaarheid" className="group bg-white rounded-lg shadow-soft hover:shadow-soft-lg transition-all p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-lumora-green-500" />
                <h3 className="font-semibold text-lumora-dark group-hover:text-lumora-green-500 transition-colors">
                  Opslag en Houdbaarheid
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Optimale opslagcondities en houdbaarheid maximalisatie voor teeltmateriaal
              </p>
            </Link>

            <Link href="/supply-chain/bulkinkoop-voordelen" className="group bg-white rounded-lg shadow-soft hover:shadow-soft-lg transition-all p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-lumora-green-500" />
                <h3 className="font-semibold text-lumora-dark group-hover:text-lumora-green-500 transition-colors">
                  Bulkinkoop Voordelen
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Volume kortingen en kostenbesparingen door strategische inkoop
              </p>
            </Link>

            <Link href="/supply-chain/just-in-time-levering" className="group bg-white rounded-lg shadow-soft hover:shadow-soft-lg transition-all p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-lumora-green-500" />
                <h3 className="font-semibold text-lumora-dark group-hover:text-lumora-green-500 transition-colors">
                  Just-In-Time Levering
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Voorraad optimalisatie met tijdige leveringen op maat
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
