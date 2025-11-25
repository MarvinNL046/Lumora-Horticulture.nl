import { Metadata } from 'next'
import Link from 'next/link'
import { Package, ThermometerSnowflake, Droplets, Wind, Calendar, AlertTriangle, CheckCircle, Shield, Clock, FileText } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Opslag en Houdbaarheid Teeltmateriaal | Optimale Condities | Lumora',
    description: 'Complete gids voor opslag en houdbaarheid van teeltmateriaal. Temperatuur, luchtvochtigheid, rotatie systemen en voorraad management voor kwekerijen.',
    keywords: 'opslag teeltmateriaal, houdbaarheid steenwol, voorraad management, magazijn condities, FIFO systeem, kwekerij opslag',
    openGraph: {
      title: 'Opslag en Houdbaarheid Teeltmateriaal | Lumora',
      description: 'Professionele gids voor optimale opslag condities en maximale houdbaarheid van teeltmateriaal',
      type: 'article',
    },
  }
}

export default function OpslagHoudbaarheidPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-lumora-cream to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lumora-dark to-lumora-dark/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-lumora-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">Supply Chain Management</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Opslag en Houdbaarheid
              <span className="block text-lumora-gold mt-2">Maximale Kwaliteit Behoud van Teeltmateriaal</span>
            </h1>

            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              Professionele gids voor optimale opslag condities, houdbaarheid maximalisatie en voorraad management.
              Behoud product kwaliteit en vermijd kostbaar materiaal verlies.
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <ThermometerSnowflake className="w-5 h-5 text-lumora-gold" />
                <span>Klimaatbeheersing</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-lumora-gold" />
                <span>FIFO Systemen</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-lumora-gold" />
                <span>Kwaliteitsbehoud</span>
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
              <a href="#condities" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Optimale Opslag Condities
              </a>
              <a href="#per-product" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Houdbaarheid per Product Type
              </a>
              <a href="#voorraad" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Voorraad Management Systemen
              </a>
              <a href="#magazijn" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Magazijn Inrichting
              </a>
              <a href="#controle" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Kwaliteitscontrole Procedures
              </a>
              <a href="#problemen" className="text-lumora-green-500 hover:text-lumora-green-600 flex items-center gap-2">
                <span>→</span> Veel Voorkomende Problemen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Optimale Condities */}
        <section id="condities" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <ThermometerSnowflake className="w-8 h-8 text-lumora-green-500" />
            Optimale Opslag Condities
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              De juiste opslag condities zijn cruciaal voor het behoud van product kwaliteit en maximale houdbaarheid.
              Temperatuur, luchtvochtigheid, ventilatie en lichtblootstelling hebben directe invloed op materiaal eigenschappen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-soft-md p-6 border-l-4 border-lumora-green-500">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <ThermometerSnowflake className="w-5 h-5 text-lumora-green-500" />
                Temperatuur Beheersing
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-lumora-dark">Ideale Range</strong>
                    <span className="text-2xl font-bold text-blue-600">15-20°C</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Optimale temperatuur voor de meeste teeltmaterialen. Voorkomt condensatie en materiaal degradatie.
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-lumora-dark">Stabiele temperatuur:</strong>
                      <p className="text-gray-600 mt-1">Vermijd schommelingen &gt;5°C per dag, gebruik klimaatbeheersing indien mogelijk</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-lumora-dark">Monitoring:</strong>
                      <p className="text-gray-600 mt-1">Data loggers gebruiken, min/max thermometers, alarm systemen bij afwijkingen</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-orange-600">Vermijd:</strong>
                      <p className="text-gray-600 mt-1">Directe warmtebronnen, onverwarmde ruimtes in winter, direct zonlicht</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-soft-md p-6 border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                Luchtvochtigheid Controle
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-lumora-dark">Ideale Range</strong>
                    <span className="text-2xl font-bold text-green-600">40-60%</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Optimale relatieve luchtvochtigheid voorkomt uitdroging en schimmelvorming.
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-lumora-dark">Te laag (&lt;40%):</strong>
                      <p className="text-gray-600 mt-1">Risico op uitdroging steenwol, brosse verpakkingen, stof problematiek</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-lumora-dark">Te hoog (&gt;70%):</strong>
                      <p className="text-gray-600 mt-1">Schimmelgroei, condensatie, verpakking schade, papier producten verzwakken</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wind className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-lumora-dark">Controle maatregelen:</strong>
                      <p className="text-gray-600 mt-1">Dehumidifier bij hoge vochtigheid, ventilatie, hygrometers per zone</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <Wind className="w-5 h-5 text-purple-600" />
                Ventilatie
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Goede luchtcirculatie voorkomt vocht ophoping</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Mechanische ventilatie in afgesloten ruimtes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Vermijd directe tocht op producten</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Filter systemen tegen stof en verontreiniging</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
              <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <span className="text-amber-600">☀️</span>
                Lichtblootstelling
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Direct zonlicht vermijden (UV degradatie)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Donkere of indirecte verlichting gebruiken</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Producten in originele verpakking bewaren</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Ramen voorzien van UV-filter of blindering</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600" />
                Hygiëne & Veiligheid
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Schone, droge magazijn omgeving</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Pest control programma (ongedierte)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Scheiding van chemicaliën en teeltmateriaal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Reguliere inspectie en schoonmaak</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Houdbaarheid per Product */}
        <section id="per-product" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-lumora-green-500" />
            Houdbaarheid per Product Type
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              Elk teeltmateriaal heeft specifieke houdbaarheid eigenschappen en opslag vereisten.
              Kennis van deze verschillen optimaliseert voorraad planning en minimaliseert materiaal verlies.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="bg-white rounded-lg shadow-soft-md overflow-hidden">
              <div className="bg-gradient-to-r from-lumora-green-500 to-lumora-green-600 text-white px-6 py-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  Steenwol Producten
                </h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Houdbaarheid & Opslag</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-lumora-dark">Houdbaarheid:</strong>
                          <p className="text-gray-600 mt-1">Onbeperkt bij correcte opslag (niet-organisch materiaal)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ThermometerSnowflake className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-lumora-dark">Temperatuur:</strong>
                          <p className="text-gray-600 mt-1">15-25°C | Geen bevriezing of extreme hitte</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Droplets className="w-5 h-5 text-lumora-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-lumora-dark">Vochtigheid:</strong>
                          <p className="text-gray-600 mt-1">40-60% RH | Droog bewaren, originele folie intact houden</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Kwaliteit Bewaken</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-lumora-cream/30 rounded p-3">
                        <strong className="text-green-600 flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4" />
                          Goed: Droog, schoon, originele verpakking intact
                        </strong>
                      </div>
                      <div className="bg-orange-50 rounded p-3">
                        <strong className="text-orange-600 flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4" />
                          Let op: Vochtige verpakking, beschadigde folie
                        </strong>
                        <p className="text-xs text-gray-600 mt-1">Check op schimmel, uitdroging, stofophoping</p>
                      </div>
                      <div className="bg-red-50 rounded p-3">
                        <strong className="text-red-600 flex items-center gap-2 mb-1">
                          <span>❌</span>
                          Afkeuren: Zichtbare schimmel, vervorming, sterke geur
                        </strong>
                        <p className="text-xs text-gray-600 mt-1">Contact leverancier voor vervanging</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-soft-md overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  Paper Plugs / Paper Pot Trays
                </h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Houdbaarheid & Opslag</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-lumora-dark">Houdbaarheid:</strong>
                          <p className="text-gray-600 mt-1">12-24 maanden bij optimale condities (organisch materiaal)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ThermometerSnowflake className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-lumora-dark">Temperatuur:</strong>
                          <p className="text-gray-600 mt-1">10-20°C | Koele, droge omgeving essentieel</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Droplets className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-lumora-dark">Vochtigheid:</strong>
                          <p className="text-gray-600 mt-1">30-50% RH | Extreem gevoelig voor vocht!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Specifieke Aandachtspunten</h4>
                    <div className="space-y-2 text-sm">
                      <div className="bg-red-50 rounded p-3 border border-red-200">
                        <strong className="text-red-600 flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4" />
                          Kritische Risico's
                        </strong>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Schimmelgroei bij hoge luchtvochtigheid (&gt;60%)</li>
                          <li>• Structureel verzwakken door vocht</li>
                          <li>• Verkleuring en degradatie door UV</li>
                          <li>• Ongedierte aantrekking (papier)</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 rounded p-3 border border-green-200">
                        <strong className="text-green-600 flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4" />
                          Best Practices
                        </strong>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Stapel max 5-6 trays hoog</li>
                          <li>• Gebruik pallets (nooit direct op vloer)</li>
                          <li>• FIFO strikt handhaven (max 6 maanden)</li>
                          <li>• Wekelijkse visuele inspectie</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-soft-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  Transport Dozen / Verpakkingsmateriaal
                </h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Houdbaarheid & Opslag</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-lumora-dark">Houdbaarheid:</strong>
                          <p className="text-gray-600 mt-1">18-36 maanden bij droge opslag (karton/papier)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ThermometerSnowflake className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-lumora-dark">Temperatuur:</strong>
                          <p className="text-gray-600 mt-1">15-25°C | Normale magazijn temperatuur voldoende</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Droplets className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong className="text-lumora-dark">Vochtigheid:</strong>
                          <p className="text-gray-600 mt-1">40-55% RH | Vocht verzwakt karton structuur</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Opslag Tips</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Plat gestapeld bewaren (originele conditie)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Maximale stapelhoogte 1.5m (voorkom vervorming)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Bescherm tegen mechanische schade</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Roteren op basis van productie datum</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>Check op waterschade, vlekken, zwakke vouwen</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voorraad Management */}
        <section id="voorraad" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <FileText className="w-8 h-8 text-lumora-green-500" />
            Voorraad Management Systemen
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              Effectief voorraad management voorkomt materiaal veroudering, minimaliseert voorraad kosten en waarborgt
              product beschikbaarheid wanneer nodig. Een goed systeem combineert FIFO principes met intelligente voorraad planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-lumora-green-500" />
                FIFO Systeem (First In, First Out)
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Het FIFO principe zorgt ervoor dat oudere voorraad eerst wordt gebruikt, waardoor veroudering
                  en kwaliteitsverlies wordt voorkomen.
                </p>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-lumora-dark mb-3">Implementatie Stappen</h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="bg-lumora-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                      <div>
                        <strong>Label alle inkomende goederen</strong> met ontvangstdatum en batch nummer
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-lumora-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                      <div>
                        <strong>Organiseer magazijn logisch</strong> - oudste voorraad vooraan, nieuwste achteraan
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-lumora-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                      <div>
                        <strong>Scan systeem implementeren</strong> - barcode of RFID voor tracking
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-lumora-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</span>
                      <div>
                        <strong>Train personeel</strong> - bewustwording en procedures handhaven
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-lumora-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">5</span>
                      <div>
                        <strong>Reguliere audits</strong> - maandelijkse check op naleving FIFO
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-lumora-green-500" />
                Voorraad Niveaus Optimaliseren
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Balans tussen voldoende voorraad en minimale opslag kosten met data-gedreven planning.
                </p>
                <div className="space-y-3">
                  <div className="bg-lumora-cream/30 rounded p-3">
                    <strong className="text-lumora-dark block mb-1 text-sm">Minimum Voorraad (Safety Stock)</strong>
                    <p className="text-xs text-gray-600">
                      Berekening: 2-3 weken gemiddeld verbruik + levertijd buffer
                    </p>
                    <div className="mt-2 text-xs text-gray-700">
                      Voorbeeld: 100 trays/week × 2 weken + 1 week levertijd = 300 trays minimum
                    </div>
                  </div>
                  <div className="bg-lumora-cream/30 rounded p-3">
                    <strong className="text-lumora-dark block mb-1 text-sm">Maximale Voorraad</strong>
                    <p className="text-xs text-gray-600">
                      Gebaseerd op: opslagcapaciteit, houdbaarheid, seizoens vraag
                    </p>
                    <div className="mt-2 text-xs text-gray-700">
                      Paper Plugs: max 6 maanden voorraad (houdbaarheid beperking)
                    </div>
                  </div>
                  <div className="bg-lumora-cream/30 rounded p-3">
                    <strong className="text-lumora-dark block mb-1 text-sm">Bestel Punt (Reorder Point)</strong>
                    <p className="text-xs text-gray-600">
                      Trigger automatische bestelling bij bereiken drempel
                    </p>
                    <div className="mt-2 text-xs text-gray-700">
                      Formule: (Gemiddeld gebruik × Levertijd) + Safety Stock
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Voorraad Tracking Template
            </h3>
            <div className="bg-white rounded-lg p-4 shadow-soft overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b-2 border-blue-200">
                    <th className="text-left py-2 px-2 font-semibold text-lumora-dark">Product</th>
                    <th className="text-center py-2 px-2 font-semibold text-lumora-dark">Batch #</th>
                    <th className="text-center py-2 px-2 font-semibold text-lumora-dark">Ontvangst</th>
                    <th className="text-center py-2 px-2 font-semibold text-lumora-dark">Locatie</th>
                    <th className="text-center py-2 px-2 font-semibold text-lumora-dark">Aantal</th>
                    <th className="text-center py-2 px-2 font-semibold text-lumora-dark">Status</th>
                    <th className="text-center py-2 px-2 font-semibold text-lumora-dark">Actie</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-2 px-2">Paper Plug 84</td>
                    <td className="text-center py-2 px-2 text-gray-600">PP-2024-001</td>
                    <td className="text-center py-2 px-2 text-gray-600">15-Jan-2024</td>
                    <td className="text-center py-2 px-2 text-gray-600">A-12</td>
                    <td className="text-center py-2 px-2 font-semibold">450</td>
                    <td className="text-center py-2 px-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">OK</span></td>
                    <td className="text-center py-2 px-2 text-green-600">Gebruik eerst</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Paper Plug 84</td>
                    <td className="text-center py-2 px-2 text-gray-600">PP-2024-018</td>
                    <td className="text-center py-2 px-2 text-gray-600">03-Mrt-2024</td>
                    <td className="text-center py-2 px-2 text-gray-600">A-13</td>
                    <td className="text-center py-2 px-2 font-semibold">800</td>
                    <td className="text-center py-2 px-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">OK</span></td>
                    <td className="text-center py-2 px-2 text-gray-600">Reserve</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="py-2 px-2">Steenwol 77</td>
                    <td className="text-center py-2 px-2 text-gray-600">SW-2023-089</td>
                    <td className="text-center py-2 px-2 text-gray-600">22-Sep-2023</td>
                    <td className="text-center py-2 px-2 text-gray-600">B-05</td>
                    <td className="text-center py-2 px-2 font-semibold">120</td>
                    <td className="text-center py-2 px-2"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">Check</span></td>
                    <td className="text-center py-2 px-2 text-orange-600">Inspectie nodig</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              💡 Tip: Gebruik software (Excel, Google Sheets, of dedicated inventory management systeem) voor automatische alerts en rapportage
            </p>
          </div>
        </section>

        {/* Magazijn Inrichting */}
        <section id="magazijn" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <Package className="w-8 h-8 text-lumora-green-500" />
            Magazijn Inrichting
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed">
              Een efficiënt ingerichte magazijn ruimte verbetert workflow, vermindert zoektijd en beschermt product kwaliteit.
              Strategische indeling gebaseerd op product eigenschappen en gebruik frequentie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4">Zone Indeling</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <strong className="text-lumora-dark block mb-1">🅰️ Zone A - Hoge Frequentie</strong>
                  <p className="text-sm text-gray-600">Meest gebruikte producten, gemakkelijk bereikbaar, nabij verzendgebied</p>
                  <p className="text-xs text-gray-500 mt-1">Voorbeeld: Paper Plugs seizoen producten, populaire steenwol maten</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <strong className="text-lumora-dark block mb-1">🅱️ Zone B - Medium Frequentie</strong>
                  <p className="text-sm text-gray-600">Regulier verkochte items, standaard opslagsystemen</p>
                  <p className="text-xs text-gray-500 mt-1">Voorbeeld: Basis transport dozen, standaard tray maten</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <strong className="text-lumora-dark block mb-1">🅲 Zone C - Lage Frequentie</strong>
                  <p className="text-sm text-gray-600">Seizoens voorraad, bulk opslag, minder toegankelijk</p>
                  <p className="text-xs text-gray-500 mt-1">Voorbeeld: Off-season voorraad, speciale bestellingen</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <strong className="text-lumora-dark block mb-1">🔧 Zone S - Speciaal</strong>
                  <p className="text-sm text-gray-600">Klimaat gecontroleerd, quarantaine, retour goederen</p>
                  <p className="text-xs text-gray-500 mt-1">Voorbeeld: Temperature sensitive items, damaged goods</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4">Opslag Systemen</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-lumora-cream/50 to-lumora-gold/10 rounded-lg p-4">
                  <h4 className="font-semibold text-lumora-dark mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lumora-green-500" />
                    Pallet Stellingen
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">Best voor: Steenwol producten, bulk dozen</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Selectieve stellingen voor FIFO toegang</li>
                    <li>• Drive-in systemen voor hoge volumes</li>
                    <li>• Hoogte optimalisatie (veiligheid eerst)</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-lumora-cream/50 to-lumora-gold/10 rounded-lg p-4">
                  <h4 className="font-semibold text-lumora-dark mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lumora-green-500" />
                    Vloer Opslag
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">Best voor: Paper plugs (hoge turnover)</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Pallets verplicht (geen direct contact vloer)</li>
                    <li>• Maximum stapelhoogte respecteren</li>
                    <li>• Gangpaden vrij houden (brandveiligheid)</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-lumora-cream/50 to-lumora-gold/10 rounded-lg p-4">
                  <h4 className="font-semibold text-lumora-dark mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-lumora-green-500" />
                    Klimaat Kamer
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">Best voor: Temperature/humidity sensitive items</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 24/7 monitoring en alarm systemen</li>
                    <li>• Backup power en klimaat systemen</li>
                    <li>• Beperkte toegang (protocol)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-lumora-dark mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-600" />
              Magazijn Veiligheid & Ergonomie
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-sm text-lumora-dark mb-2">Veiligheid</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>✓ Nooduitgangen vrij en duidelijk gemarkeerd</li>
                  <li>✓ Brandblussers strategisch geplaatst</li>
                  <li>✓ Spill kits beschikbaar</li>
                  <li>✓ Eerst hulp voorzieningen</li>
                  <li>✓ Veiligheidsverlichting en signalering</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-sm text-lumora-dark mb-2">Ergonomie</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>✓ Zwaarste items op middel hoogte (60-120cm)</li>
                  <li>✓ Lift equipment voor zware lasten</li>
                  <li>✓ Anti-slip vloeren in natte zones</li>
                  <li>✓ Adequate verlichting (min 300 lux)</li>
                  <li>✓ Duidelijke bewegwijzering</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-sm text-lumora-dark mb-2">Efficiency</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>✓ Gangpad breedte min 1.2m (heftruck 2.5m)</li>
                  <li>✓ Duidelijke locatie codes (alfanumeriek)</li>
                  <li>✓ Pick-to-light systemen (grote operaties)</li>
                  <li>✓ Dedicated ontvangst/verzend zones</li>
                  <li>✓ Voldoende werk oppervlak</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Kwaliteitscontrole */}
        <section id="controle" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <Shield className="w-8 h-8 text-lumora-green-500" />
            Kwaliteitscontrole Procedures
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4">Reguliere Inspectie Schema</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <strong className="text-lumora-dark block mb-2">📅 Dagelijks</strong>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Temperatuur en luchtvochtigheid check (ochtend/middag)</li>
                    <li>• Visuele scan op zichtbare problemen</li>
                    <li>• Ventilatie systemen operationeel</li>
                  </ul>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <strong className="text-lumora-dark block mb-2">📅 Wekelijks</strong>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Steekproef paper plugs (vocht, schimmel)</li>
                    <li>• FIFO naleving controleren</li>
                    <li>• Magazijn schoonmaak en ordening</li>
                    <li>• Pest control monitoring</li>
                  </ul>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <strong className="text-lumora-dark block mb-2">📅 Maandelijks</strong>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Volledige voorraad inventarisatie</li>
                    <li>• Detailleerde product inspectie (oudste batches)</li>
                    <li>• Klimaat systeem maintenance</li>
                    <li>• Voorraad rapporten en analyse</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-soft-md p-6">
              <h3 className="text-xl font-semibold text-lumora-dark mb-4">Inspectie Checklist</h3>
              <div className="bg-lumora-cream/30 rounded-lg p-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-lumora-dark block mb-2">Visuele Check</strong>
                    <div className="space-y-1 text-gray-700">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Verpakking intact, geen scheuren of gaten</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Geen zichtbare schimmel of verkleuring</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Product vorm en structuur normaal</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Labels leesbaar, batch info correct</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <strong className="text-lumora-dark block mb-2">Omgevings Check</strong>
                    <div className="space-y-1 text-gray-700">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Temperatuur binnen range (15-20°C)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Luchtvochtigheid OK (40-60% RH)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Ventilatie systeem operationeel</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Geen lekkages of water schade</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <strong className="text-lumora-dark block mb-2">Administratie Check</strong>
                    <div className="space-y-1 text-gray-700">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>FIFO principe correct toegepast</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Voorraad systeem up-to-date</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Locatie codes juist en duidelijk</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-lumora-green-500" />
                        <span>Geen producten over houdbaar datum</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Veel Voorkomende Problemen */}
        <section id="problemen" className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-lumora-green-500" />
            Veel Voorkomende Problemen & Oplossingen
          </h2>

          <div className="grid gap-6">
            <div className="bg-white rounded-lg shadow-soft-md overflow-hidden">
              <div className="bg-red-50 px-6 py-4 border-b border-red-200">
                <h3 className="text-lg font-semibold text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Probleem: Schimmelvorming op Paper Plugs
                </h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Oorzaken</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>Te hoge luchtvochtigheid (&gt;65% RH)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>Slechte ventilatie en luchtcirculatie</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>Beschadigde verpakking (vocht insluiting)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>Temperatuur schommelingen (condensatie)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Oplossingen</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Dehumidifier installeren (target &lt;50% RH)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Ventilatie verbeteren (mechanisch indien nodig)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Beschadigde producten direct isoleren</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Klimaatcontrole stabiliseren (16-18°C constant)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <strong className="text-amber-800 text-sm block mb-2">⚠️ Preventie Tip</strong>
                  <p className="text-xs text-gray-700">
                    Investeer in continue monitoring systeem met SMS alerts. Schimmel preventie is 10x goedkoper dan schade controle.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-soft-md overflow-hidden">
              <div className="bg-orange-50 px-6 py-4 border-b border-orange-200">
                <h3 className="text-lg font-semibold text-orange-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Probleem: Steenwol Uitdroging
                </h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Oorzaken</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500">•</span>
                        <span>Te lage luchtvochtigheid (&lt;30% RH)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500">•</span>
                        <span>Beschadigde of geopende plastic folie</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500">•</span>
                        <span>Directe warmtebron nabij opslag</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500">•</span>
                        <span>Zeer lange opslag tijd (jaren)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Oplossingen</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Luchtvochtigheid verhogen (40-50% ideal)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Verpakking repareren met plastic folie</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Verplaats van warmtebronnen (min 2m afstand)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>FIFO stricter handhaven (max 12 maanden)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-soft-md overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Probleem: Transport Dozen Verzwakken
                </h3>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Oorzaken</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>Vocht absorptie (hoge RH &gt;60%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>Te hoge stapeling (compressie schade)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>Direct op betonnen vloer (vocht opname)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>Oude voorraad (natuurlijke degradatie)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-3">Oplossingen</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>RH verlagen naar 40-50% met dehumidifier</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Maximum stapelhoogte 1.5m handhaven</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Altijd pallets gebruiken (10cm van vloer)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Voorraad roteren (max 18 maanden)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-lumora-dark to-lumora-dark/90 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-display font-bold mb-4">
              Kwaliteit Gegarandeerd
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Lumora Horticulture levert teeltmateriaal met optimale houdbaarheid garantie.
              Vers geproduceerd, perfect verpakt en professioneel opgeslagen voor maximale kwaliteit bij u.
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
                Advies Vragen
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
            <Link href="/supply-chain/inkoop-leveranciersselectie" className="group bg-white rounded-lg shadow-soft hover:shadow-soft-lg transition-all p-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-lumora-green-500" />
                <h3 className="font-semibold text-lumora-dark group-hover:text-lumora-green-500 transition-colors">
                  Inkoop & Leveranciers
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Professionele selectie en management van betrouwbare leveranciers
              </p>
            </Link>

            <Link href="/supply-chain/bulkinkoop-voordelen" className="group bg-white rounded-lg shadow-soft hover:shadow-soft-lg transition-all p-6">
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-6 h-6 text-lumora-green-500" />
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
