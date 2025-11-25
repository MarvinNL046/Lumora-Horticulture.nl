import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, TrendingUp, MapPin, Award, Users, BarChart3, Building2, Leaf, ArrowRight, FileText, Download, Euro } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Deutsche Gärtnerei Markt | Paperpot & Pluggen Lösungen | Lumora',
  description: 'Spezialist für nachhaltige Anbaulösungen für deutsche Gärtnereien. Paper Plug Trays für Gemüse, Zierpflanzen und Kräuter. Marktführer seit 2020.',
  keywords: 'Deutsche Gärtnerei, Paperpot Deutschland, Plug Trays Gewächshaus, Bayern Anbau, nachhaltiger Anbau Deutschland, deutsche Gartenbau Innovation',
  openGraph: {
    title: 'Deutsche Gärtnerei Lösungen | Lumora Horticulture',
    description: 'Nachhaltige Anbaulösungen für deutsche Gärtnereien. Spezialist für Paper Plug Trays für Gemüse, Zierpflanzen und Kräuter.',
    type: 'article',
  },
};

export default function DeutscheGaertnereiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lumora-cream/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lumora-dark to-lumora-green-500 text-white py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Deutscher Markt Fokus</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Deutsche Gärtnerei:<br />
              <span className="text-lumora-cream">Nachhaltigkeit trifft Innovation</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Deutschland ist mit 5.200+ Gartenbaubetrieben und €5,1 Milliarden Jahresumsatz ein führender europäischer Markt. Deutsche Gärtnereien setzen auf Qualität, Nachhaltigkeit und technologische Innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-lumora-cream text-lumora-dark px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all shadow-lg hover:shadow-xl"
              >
                Produkte Ansehen
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Beratung Anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Market Overview Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-4">
              Deutscher Gartenbau in Zahlen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Der deutsche Gartenbausektor ist ein wichtiger Wirtschaftsfaktor mit starker regionaler Verankerung
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, value: '1.300 ha', label: 'Gewächshausfläche', color: 'from-blue-500 to-blue-600' },
              { icon: Euro, value: '€5,1 Mrd', label: 'Jahresumsatz gesamt', color: 'from-green-500 to-green-600' },
              { icon: Building2, value: '5.200+', label: 'Gartenbaubetriebe', color: 'from-purple-500 to-purple-600' },
              { icon: Users, value: '85.000+', label: 'Beschäftigte', color: 'from-yellow-500 to-yellow-600' },
            ].map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-soft hover:shadow-soft-lg transition-all">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-lumora-dark mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Focus */}
      <section className="py-16 bg-lumora-cream/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-4">
              Regionale Gartenbau-Cluster
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deutschland verfügt über diverse Gartenbauregionen mit spezifischen Schwerpunkten
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                region: 'Bayern & Baden-Württemberg',
                area: '420 Hektar',
                specialty: 'Zierpflanzen & Baumschulen',
                description: 'Süddeutschland ist führend bei Topfpflanzen, Stauden und Baumschulkulturen. Traditionelle Qualitätsbetriebe mit starkem Fokus auf Nachhaltigkeit.',
                highlights: ['Baumschulen', 'Topfpflanzen', 'Stauden', 'Bio-Zertifizierung']
              },
              {
                region: 'Niedersachsen & NRW',
                area: '380 Hektar',
                specialty: 'Gemüseanbau unter Glas',
                description: 'Nordwestdeutschland konzentriert sich auf Tomaten, Gurken und Paprika. Moderne Gewächshäuser mit energieeffizienten Systemen.',
                highlights: ['Tomatenanbau', 'Gurkenkulturen', 'Energie-Effizienz', 'Holland-Nähe']
              },
              {
                region: 'Rheinland & Pfalz',
                area: '280 Hektar',
                specialty: 'Kräuter & Schnittblumen',
                description: 'Das Rheinland ist bekannt für Kräuterkulturen und Schnittblumen. Innovative Betriebe mit direkter Nähe zu großen Absatzmärkten.',
                highlights: ['Kräuteranbau', 'Schnittblumen', 'Verbrauchermarkt', 'Logistik-Hub']
              },
            ].map((cluster, index) => (
              <div key={index} className="bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all overflow-hidden">
                <div className="bg-gradient-to-br from-lumora-green-500 to-lumora-dark text-white p-6">
                  <div className="flex items-start justify-between mb-3">
                    <MapPin className="w-8 h-8" />
                    <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {cluster.area}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{cluster.region}</h3>
                  <p className="text-white/80 text-sm">{cluster.specialty}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">{cluster.description}</p>
                  <div className="space-y-2">
                    {cluster.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-lumora-green-500 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* German Market Trends */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-4">
                Trends im Deutschen Gartenbau
              </h2>
              <p className="text-lg text-gray-600">
                Der Sektor entwickelt sich schnell in Richtung Nachhaltigkeit, Regionalität und Kreislaufwirtschaft
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Leaf,
                  title: 'Klimaneutralität & Energiewende',
                  description: 'Deutsche Gärtnereien investieren massiv in Solar, Geothermie und Wärmerückgewinnung. Ziel: CO₂-neutral bis 2045 gemäß Klimaschutzgesetz.',
                  stats: '35% nutzen erneuerbare Energie',
                  progress: 35
                },
                {
                  icon: Award,
                  title: 'Bio-Zertifizierung & Qualitätssiegel',
                  description: 'Nachfrage nach Bio-Produkten wächst um 12% jährlich. EU-Bio, Bioland und Demeter werden zum Standard im Zierpflanzenbereich.',
                  stats: '22% Bio-zertifizierte Betriebe',
                  progress: 22
                },
                {
                  icon: TrendingUp,
                  title: 'Regionale Vermarktung & Direktvertrieb',
                  description: 'Hofladen, Wochenmärkte und regionale Partnerschaften boomen. Verbraucher bevorzugen lokale Produkte (+30% seit 2020).',
                  stats: '45% mit Direktvermarktung',
                  progress: 45
                },
                {
                  icon: Building2,
                  title: 'Digitalisierung & Smart Farming',
                  description: 'Klimasteuerung, Sensortechnik und automatisierte Bewässerung optimieren Ressourceneinsatz und Produktqualität.',
                  stats: '55% nutzen digitale Systeme',
                  progress: 55
                },
              ].map((trend, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-soft hover:shadow-soft-lg transition-all">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-lumora-green-500 to-lumora-dark rounded-xl flex items-center justify-center">
                        <trend.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-lumora-dark mb-3">{trend.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{trend.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-lumora-green-500 to-lumora-dark h-2 rounded-full transition-all"
                            style={{ width: `${trend.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-lumora-dark">{trend.stats}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Paperpot Benefits for German Market */}
      <section className="py-16 bg-lumora-cream/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-4">
                Warum Deutsche Gärtner Paperpot Wählen
              </h2>
              <p className="text-lg text-gray-600">
                Unsere Lösungen entsprechen den hohen deutschen Standards für Nachhaltigkeit und Qualität
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: 'Kreislaufwirtschaft-konform',
                  description: '100% kompostierbar, kein Mikroplastik. Erfüllt deutsches Kreislaufwirtschaftsgesetz (KrWG) und EU-Richtlinien.',
                  impact: '100% biologisch abbaubar',
                  icon: Leaf
                },
                {
                  title: 'Arbeitskräftemangel lösen',
                  description: 'Direktes Auspflanzen spart 40% Arbeitszeit. Ideal bei Fachkräftemangel und steigenden Lohnkosten.',
                  impact: '40% weniger Arbeit',
                  icon: Users
                },
                {
                  title: 'Wurzelgesundheit & Qualität',
                  description: 'Natürliches Wurzelwachstum ohne Stauwurzeln. 25% besseres Anwachsen und höhere Pflanzenqualität.',
                  impact: '25% bessere Anwuchsrate',
                  icon: Award
                },
                {
                  title: 'Bio-Zertifizierung unterstützen',
                  description: 'Kompatibel mit EU-Bio, Bioland und Demeter Standards. Keine synthetischen Materialien.',
                  impact: 'Bio-zertifiziert',
                  icon: CheckCircle
                },
              ].map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-lumora-green-500 to-lumora-dark rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-lumora-dark mb-2">{benefit.title}</h3>
                      <p className="text-gray-600 mb-3 leading-relaxed">{benefit.description}</p>
                      <div className="inline-flex items-center gap-2 bg-lumora-cream px-3 py-1 rounded-full text-sm font-semibold text-lumora-dark">
                        <TrendingUp className="w-4 h-4" />
                        {benefit.impact}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-lumora-green-500 to-lumora-dark text-white rounded-2xl p-8 md:p-12 shadow-soft-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-sm text-white/80 mb-2">Erfolgsgeschichte</div>
                  <h3 className="text-3xl font-bold">Bio-Gärtnerei Bayern</h3>
                  <p className="text-white/80">2,5 Hektar Gewächshaus, Bioland-zertifiziert</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: 'Arbeitszeitersparnis', value: '38%', description: 'pro Kulturzyklus' },
                  { label: 'Plastik-Reduktion', value: '100%', description: 'keine Kunststofftöpfe mehr' },
                  { label: 'Schnellere Produktion', value: '12 Tage', description: 'kürzere Kulturdauer' },
                ].map((metric, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-3xl font-bold mb-1">{metric.value}</div>
                    <div className="text-sm font-semibold mb-1">{metric.label}</div>
                    <div className="text-xs text-white/70">{metric.description}</div>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-4 border-white/30 pl-6 mb-6">
                <p className="text-lg italic mb-4">
                  "Paper Plug Trays haben unseren Betrieb revolutioniert. Wir erfüllen höchste Bio-Standards, sparen Arbeitszeit und unsere Pflanzen entwickeln sich besser. Die Kunden schätzen unsere konsequente Nachhaltigkeitsstrategie."
                </p>
                <footer className="text-white/80">
                  — Michael Hoffmann, Betriebsleiter
                </footer>
              </blockquote>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-lumora-dark px-6 py-3 rounded-lg font-semibold hover:bg-lumora-cream transition-all"
              >
                Ähnliche Ergebnisse Erzielen?
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* German Regulations & Standards */}
      <section className="py-16 bg-lumora-cream/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-4">
                Deutsche Vorschriften & Zertifizierung
              </h2>
              <p className="text-lg text-gray-600">
                Erfüllt alle relevanten deutschen und europäischen Standards für den Gartenbau
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Kreislaufwirtschaftsgesetz (KrWG)',
                  description: 'Paperpot erfüllt die deutschen Anforderungen zur Abfallvermeidung und Kreislaufführung. Vollständig kompostierbar gemäß DIN EN 13432.',
                  compliance: 'KrWG-konform',
                  icon: Leaf
                },
                {
                  title: 'EU-Bio Verordnung',
                  description: 'Entspricht EU-Öko-Verordnung (2018/848) für ökologischen Landbau. Keine synthetischen Zusätze, 100% natürliche Materialien.',
                  compliance: 'EU-Bio zertifiziert',
                  icon: Award
                },
                {
                  title: 'Bioland & Demeter Standards',
                  description: 'Kompatibel mit strengsten deutschen Bio-Anbauverbänden. Fördert Bodengesundheit und natürliche Kreisläufe.',
                  compliance: 'Verbandskonform',
                  icon: CheckCircle
                },
                {
                  title: 'DIN EN 13432 Kompostierbarkeit',
                  description: 'Zertifiziert nach europäischer Norm für biologische Abbaubarkeit. Vollständige Zersetzung in 90 Tagen bei industrieller Kompostierung.',
                  compliance: 'DIN-zertifiziert',
                  icon: Building2
                },
              ].map((standard, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-lumora-green-500 to-lumora-dark rounded-lg flex items-center justify-center flex-shrink-0">
                      <standard.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-lumora-dark mb-2">{standard.title}</h3>
                      <div className="inline-flex items-center gap-2 bg-lumora-cream px-3 py-1 rounded-full text-xs font-semibold text-lumora-dark mb-3">
                        <CheckCircle className="w-3 h-3" />
                        {standard.compliance}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{standard.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Recommendations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-4">
                Beliebte Produkte für Deutsche Gärtner
              </h2>
              <p className="text-lg text-gray-600">
                Diese Paper Plug Trays werden am häufigsten von deutschen Gartenbaubetrieben eingesetzt
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: 'Paper Plug Tray 84',
                  cells: '84 Zellen',
                  ideal: 'Tomaten, Paprika',
                  price: 'Ab €2,95',
                  popular: true
                },
                {
                  name: 'Paper Plug Tray 128',
                  cells: '128 Zellen',
                  ideal: 'Salat, Kräuter',
                  price: 'Ab €3,45',
                  popular: true
                },
                {
                  name: 'Paper Plug Tray 50',
                  cells: '50 Zellen',
                  ideal: 'Topfpflanzen, Stauden',
                  price: 'Ab €2,65',
                  popular: false
                },
              ].map((product, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-all border border-gray-100">
                  {product.popular && (
                    <div className="inline-flex items-center gap-1 bg-lumora-gold/10 text-lumora-gold px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      <Award className="w-3 h-3" />
                      Beliebt
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-lumora-dark mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.cells} • {product.ideal}</p>
                  <div className="text-2xl font-bold text-lumora-green-500 mb-4">{product.price}</div>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 w-full justify-center bg-lumora-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-lumora-dark transition-all"
                  >
                    Produkt Ansehen
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-lumora-cream to-white rounded-xl p-8 text-center shadow-soft">
              <FileText className="w-12 h-12 text-lumora-dark mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-lumora-dark mb-3">Vollständiger Produktkatalog</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Laden Sie unseren kompletten Katalog mit allen Paper Plug Formaten, Preisen und technischen Spezifikationen für den deutschen Markt herunter.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-lumora-dark text-white px-6 py-3 rounded-lg font-semibold hover:bg-lumora-green-500 transition-all"
              >
                <Download className="w-5 h-5" />
                Katalog Herunterladen (PDF)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-lumora-dark to-lumora-green-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Bereit für Nachhaltigen Anbau in Deutschland?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Schließen Sie sich 150+ deutschen Gärtnereien an, die bereits auf Paper Plug Trays umgestiegen sind. Kostenlose maßgeschneiderte Beratung für Ihren Betrieb.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-lumora-dark px-8 py-4 rounded-lg font-semibold hover:bg-lumora-cream transition-all shadow-lg hover:shadow-xl"
              >
                Kostenlose Beratung Anfragen
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Alle Produkte Ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
