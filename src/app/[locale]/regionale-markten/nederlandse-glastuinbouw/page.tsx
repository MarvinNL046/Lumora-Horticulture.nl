import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, TrendingUp, MapPin, Award, Users, BarChart3, Building2, Leaf, ArrowRight, FileText, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nederlandse Glastuinbouw | Paperpot & Pluggen Oplossingen | Lumora',
  description: 'Specialist in duurzame teeltoplossingen voor de Nederlandse glastuinbouw. Paper Plug trays voor groenten, sierteelt en kruiden. Marktleider sinds 2020.',
  keywords: 'Nederlandse glastuinbouw, paperpot Nederland, plug trays glastuinbouw, Westland teelt, duurzame teelt Nederland, Nederlandse tuinbouw innovatie',
  openGraph: {
    title: 'Nederlandse Glastuinbouw Oplossingen | Lumora Horticulture',
    description: 'Duurzame teeltoplossingen voor de Nederlandse glastuinbouw. Specialist in Paper Plug trays voor groenten, sierteelt en kruiden.',
    type: 'article',
  },
};

export default function NederlandseGlastuinbouwPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lumora-cream/30">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lumora-dark to-lumora-green-500 text-white py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Nederlandse Markt Focus</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Nederlandse Glastuinbouw:<br />
              <span className="text-lumora-cream">Innovatie in Duurzame Teelt</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Nederland is wereldleider in glastuinbouw innovatie. Met 10.500+ hectare onder glas en €9,2 miljard export zijn Nederlandse telers voorlopers in efficiëntie, duurzaamheid en technologie.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-lumora-cream text-lumora-dark px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all shadow-lg hover:shadow-xl"
              >
                Bekijk Producten
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Vraag Advies
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
              Nederlandse Glastuinbouw in Cijfers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              De Nederlandse tuinbouwsector is een economische krachtpatser met wereldwijde invloed
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, value: '10.500+', label: 'Hectare onder glas', color: 'from-blue-500 to-blue-600' },
              { icon: TrendingUp, value: '€9,2 mld', label: 'Jaarlijkse export', color: 'from-green-500 to-green-600' },
              { icon: Building2, value: '4.300+', label: 'Glastuinbouwbedrijven', color: 'from-purple-500 to-purple-600' },
              { icon: Award, value: '#1', label: 'Wereldwijd innovatie', color: 'from-yellow-500 to-yellow-600' },
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
              Regionale Glastuinbouw Clusters
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nederland kent diverse tuinbouwgebieden, elk met eigen specialisaties en kenmerken
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                region: 'Westland',
                area: '2.300 hectare',
                specialty: 'Groenten onder glas',
                description: 'Het hart van de Nederlandse glastuinbouw met focus op tomaten, paprika\'s en komkommers. Hoogste concentratie kassen wereldwijd.',
                highlights: ['Tomatentelers', 'Paprika specialists', 'Komkommerteelt', 'Innovatiecentrum']
              },
              {
                region: 'Aalsmeer & Uithoorn',
                area: '1.400 hectare',
                specialty: 'Sierteelt & snijbloemen',
                description: 'Wereldcentrum voor bloemen en planten met de grootste bloemenveiling. Focus op rozen, lelies en potplanten.',
                highlights: ['Royal FloraHolland', 'Rozenteelt', 'Potplanten', 'Exportlogistiek']
              },
              {
                region: 'Venlo & Noord-Limburg',
                area: '1.800 hectare',
                specialty: 'Groenten & innovatie',
                description: 'Snelgroeiend gebied met moderne kassen en focus op duurzame teelt. Sterke verbinding met Duitse markt.',
                highlights: ['Smart farming', 'Energie-efficiëntie', 'Grensoverschrijdend', 'Technologie']
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

      {/* Dutch Market Trends */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-4">
                Trends in de Nederlandse Glastuinbouw
              </h2>
              <p className="text-lg text-gray-600">
                De sector evolueert snel richting duurzaamheid, automatisering en klimaatneutraliteit
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Leaf,
                  title: 'Energie-transitie & CO₂-neutrale teelt',
                  description: 'Nederlandse telers streven naar 100% duurzame energie in 2040. Geothermie, LED-belichting en energieschermen zijn standaard.',
                  stats: '40% minder gas sinds 2010',
                  progress: 40
                },
                {
                  icon: TrendingUp,
                  title: 'Precisie-teelt & data-gedreven sturing',
                  description: 'Sensoren, AI en machine learning optimaliseren klimaat, water en voeding. Real-time monitoring verhoogt opbrengst met 15-25%.',
                  stats: '85% gebruikt klimaatcomputers',
                  progress: 85
                },
                {
                  icon: Users,
                  title: 'Arbeidskrapte & automatisering',
                  description: 'Robotisering van oogst, transport en verpakking wordt essentieel. Investering in oogstrobots groeit 200% per jaar.',
                  stats: '30.000+ vacatures jaarlijks',
                  progress: 65
                },
                {
                  icon: Award,
                  title: 'Certificering & duurzaamheidslabels',
                  description: 'MPS-certificering, On the way to PlanetProof en bio-keurmerken worden belangrijker voor export en retail.',
                  stats: '70% heeft duurzaamheidscertificaat',
                  progress: 70
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

      {/* Paperpot Benefits for Dutch Market */}
      <section className="py-16 bg-lumora-cream/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-4">
                Waarom Nederlandse Telers Kiezen voor Paperpot
              </h2>
              <p className="text-lg text-gray-600">
                Onze oplossingen sluiten perfect aan bij Nederlandse duurzaamheids- en efficiëntiedoelstellingen
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: 'CO₂-voetafdruk reductie',
                  description: 'Paper Plug trays zijn 100% biologisch afbreekbaar en composteren binnen 90 dagen. Geen plastic afval meer.',
                  impact: '90% minder plastic',
                  icon: Leaf
                },
                {
                  title: 'Arbeidsefficiëntie',
                  description: 'Direct uitplanten zonder uitpotten bespaart 40% arbeidstijd. Ideaal bij personeelstekorten.',
                  impact: '40% minder arbeid',
                  icon: TrendingUp
                },
                {
                  title: 'Wortelkwaliteit',
                  description: 'Natuurlijke wortelgroei zonder cirkelwortels. 25% betere aanslag en snellere productie.',
                  impact: '25% betere aanslag',
                  icon: Award
                },
                {
                  title: 'MPS & certificering',
                  description: 'Draagt bij aan On the way to PlanetProof en MPS-A status. Verhoogt duurzaamheidsscore.',
                  impact: 'MPS-gecertificeerd',
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
                  <div className="text-sm text-white/80 mb-2">Case Study</div>
                  <h3 className="text-3xl font-bold">Westlandse Tomatenteler</h3>
                  <p className="text-white/80">4 hectare moderne kas, Westland</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: 'Arbeidsbesparing', value: '42%', description: 'per teeltcyclus' },
                  { label: 'Plastic reductie', value: '100%', description: 'geen plastic pots meer' },
                  { label: 'Snellere productie', value: '10 dagen', description: 'kortere teeltduur' },
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
                  "De overstap naar Paper Plug trays was een gamechanger. Onze medewerkers werken sneller, we hebben geen plasticafval meer, en de planten groeien beter. Het past perfect bij onze ambitie om in 2030 volledig circulair te zijn."
                </p>
                <footer className="text-white/80">
                  — Jan van der Berg, Eigenaar
                </footer>
              </blockquote>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-lumora-dark px-6 py-3 rounded-lg font-semibold hover:bg-lumora-cream transition-all"
              >
                Vergelijkbare Resultaten?
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dutch Regulations & Standards */}
      <section className="py-16 bg-lumora-cream/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-4">
                Nederlandse Regelgeving & Certificering
              </h2>
              <p className="text-lg text-gray-600">
                Voldoe aan alle relevante normen en certificeringen voor de Nederlandse tuinbouwmarkt
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'On the way to PlanetProof',
                  description: 'Het Nederlandse duurzaamheidskeurmerk voor tuinbouwproducten. Paperpot draagt bij aan scores voor afvalreductie en circulariteit.',
                  compliance: 'Volledig compatibel',
                  icon: Award
                },
                {
                  title: 'MPS Certificering',
                  description: 'Milieu Project Sierteelt certificering (MPS-A, B, C). Paper Plug trays verbeteren score voor materiaalgebruik.',
                  compliance: 'MPS-A bevorderend',
                  icon: Leaf
                },
                {
                  title: 'KIWA Keurmerk Duurzaamheid',
                  description: 'Certificering voor circulaire en duurzame bedrijfsvoering in de glastuinbouw.',
                  compliance: 'Gecertificeerd product',
                  icon: CheckCircle
                },
                {
                  title: 'EU Green Deal Compliance',
                  description: 'Voldoet aan EU-richtlijnen voor plasticreductie en circulaire economie in land- en tuinbouw.',
                  compliance: 'EU-conform',
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
                Populaire Producten voor Nederlandse Telers
              </h2>
              <p className="text-lg text-gray-600">
                Deze Paper Plug trays worden het meest gebruikt in de Nederlandse glastuinbouw
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: 'Paper Plug Tray 84',
                  cells: '84 cellen',
                  ideal: 'Tomaten, paprika\'s',
                  price: 'Vanaf €2,95',
                  popular: true
                },
                {
                  name: 'Paper Plug Tray 128',
                  cells: '128 cellen',
                  ideal: 'Sla, kruiden',
                  price: 'Vanaf €3,45',
                  popular: true
                },
                {
                  name: 'Paper Plug Tray 50',
                  cells: '50 cellen',
                  ideal: 'Potplanten, rozen',
                  price: 'Vanaf €2,65',
                  popular: false
                },
              ].map((product, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-all border border-gray-100">
                  {product.popular && (
                    <div className="inline-flex items-center gap-1 bg-lumora-gold/10 text-lumora-gold px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      <Award className="w-3 h-3" />
                      Populair
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-lumora-dark mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.cells} • {product.ideal}</p>
                  <div className="text-2xl font-bold text-lumora-green-500 mb-4">{product.price}</div>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 w-full justify-center bg-lumora-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-lumora-dark transition-all"
                  >
                    Bekijk Product
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-lumora-cream to-white rounded-xl p-8 text-center shadow-soft">
              <FileText className="w-12 h-12 text-lumora-dark mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-lumora-dark mb-3">Volledige Productcatalogus</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Download onze complete gids met alle Paper Plug formaten, prijzen en technische specificaties voor de Nederlandse markt.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-lumora-dark text-white px-6 py-3 rounded-lg font-semibold hover:bg-lumora-green-500 transition-all"
              >
                <Download className="w-5 h-5" />
                Download Catalogus (PDF)
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
              Klaar voor Duurzame Teelt in Nederland?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Sluit je aan bij 300+ Nederlandse glastuinbouwbedrijven die al overstapten naar Paper Plug trays. Gratis advies op maat voor jouw teelt.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-lumora-dark px-8 py-4 rounded-lg font-semibold hover:bg-lumora-cream transition-all shadow-lg hover:shadow-xl"
              >
                Vraag Gratis Advies
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
              >
                Bekijk Alle Producten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
