'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface StekpluggenClientProps {
  t: any
  locale: string
}

export default function StekpluggenClient({ t, locale }: StekpluggenClientProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const content = {
    nl: {
      title: "Stekpluggen",
      subtitle: "Professionele Propagatie & Beworteling",
      hero: {
        title: "Stekpluggen: Professionele Oplossing voor Optimale Beworteling",
        description: "Ontdek de voordelen van stekpluggen met FP 12+ technologie. Perfect voor professionele vermeerdering met snelle beworteling en gezonde plantopname.",
        cta: "Bekijk Producten"
      },
      benefits: {
        title: "Waarom Kiezen voor Stekpluggen?",
        items: [
          {
            icon: "🌿",
            title: "Snelle Beworteling",
            description: "Stekpluggen bieden de ideale omgeving voor snelle en gezonde wortelvorming bij stekken en zaailingen."
          },
          {
            icon: "💪",
            title: "Sterke Wortelontwikkeling",
            description: "De optimale lucht-water verhouding zorgt voor krachtige en gezonde wortelgroei voor sterke planten."
          },
          {
            icon: "🛡️",
            title: "Schimmelwerende Bescherming",
            description: "FP 12+ vlies beschermt kwetsbare stekken tegen schimmelinfecties tijdens de kritieke bewortelingsfase."
          },
          {
            icon: "✂️",
            title: "Perfect voor Stekken",
            description: "Speciaal ontwikkeld voor vegetatieve vermeerdering met optimale condities voor wortelontwikkeling."
          },
          {
            icon: "📈",
            title: "Hogere Slagingspercentages",
            description: "Bewezen hogere slagingspercentages bij stekken en zaailingen vergeleken met traditionele methoden."
          },
          {
            icon: "🌱",
            title: "Geen Transplantatieschok",
            description: "Plant plug en al in het eindsubstraat zonder stress voor de jonge plant."
          }
        ]
      },
      features: {
        title: "Kenmerken van Stekpluggen",
        items: [
          "✓ Optimaal voor vegetatieve vermeerdering",
          "✓ Snelle wortelontwikkeling",
          "✓ FP 12+ vlies voor stabiliteit",
          "✓ Schimmelwerende bescherming",
          "✓ Geen transplantatieschok",
          "✓ Hogere slagingspercentages",
          "✓ Biologisch afbreekbaar",
          "✓ Verkrijgbaar in meerdere formaten"
        ]
      },
      applications: {
        title: "Toepassingen",
        items: [
          "Vegetatieve vermeerdering",
          "Stekken van sierplanten",
          "Moederplanten beheer",
          "Zaailingen",
          "Boomkwekerijen",
          "Professionele propagatie"
        ]
      },
      cta: {
        title: "Start met Stekpluggen",
        description: "Verhoog uw slagingspercentages met professionele stekpluggen en FP 12+ technologie voor optimale beworteling.",
        button: "Download Brochure",
        contact: "Vraag Prijsopgave"
      }
    },
    en: {
      title: "Cutting Plugs",
      subtitle: "Professional Propagation & Rooting",
      hero: {
        title: "Cutting Plugs: Professional Solution for Optimal Rooting",
        description: "Discover the benefits of cutting plugs with FP 12+ technology. Perfect for professional propagation with fast rooting and healthy plant uptake.",
        cta: "View Products"
      },
      benefits: {
        title: "Why Choose Cutting Plugs?",
        items: [
          {
            icon: "🌿",
            title: "Fast Rooting",
            description: "Cutting plugs provide the ideal environment for fast and healthy root formation in cuttings and seedlings."
          },
          {
            icon: "💪",
            title: "Strong Root Development",
            description: "The optimal air-water ratio ensures strong and healthy root growth for robust plants."
          },
          {
            icon: "🛡️",
            title: "Fungal Protection",
            description: "FP 12+ film protects vulnerable cuttings against fungal infections during the critical rooting phase."
          },
          {
            icon: "✂️",
            title: "Perfect for Cuttings",
            description: "Specially developed for vegetative propagation with optimal conditions for root development."
          },
          {
            icon: "📈",
            title: "Higher Success Rates",
            description: "Proven higher success rates with cuttings and seedlings compared to traditional methods."
          },
          {
            icon: "🌱",
            title: "No Transplant Shock",
            description: "Plant plug and all in the final substrate without stress for the young plant."
          }
        ]
      },
      features: {
        title: "Features of Cutting Plugs",
        items: [
          "✓ Optimal for vegetative propagation",
          "✓ Fast root development",
          "✓ FP 12+ film for stability",
          "✓ Fungal protection",
          "✓ No transplant shock",
          "✓ Higher success rates",
          "✓ Biodegradable",
          "✓ Available in multiple formats"
        ]
      },
      applications: {
        title: "Applications",
        items: [
          "Vegetative propagation",
          "Ornamental plant cuttings",
          "Mother plant management",
          "Seedlings",
          "Tree nurseries",
          "Professional propagation"
        ]
      },
      cta: {
        title: "Get Started with Cutting Plugs",
        description: "Increase your success rates with professional cutting plugs and FP 12+ technology for optimal rooting.",
        button: "Download Brochure",
        contact: "Request Quote"
      }
    },
    de: {
      title: "Stecklingsplugs",
      subtitle: "Professionelle Vermehrung & Bewurzelung",
      hero: {
        title: "Stecklingsplugs: Professionelle Lösung für Optimale Bewurzelung",
        description: "Entdecken Sie die Vorteile von Stecklingsplugs mit FP 12+ Technologie. Perfekt für professionelle Vermehrung mit schneller Bewurzelung und gesunder Pflanzenaufnahme.",
        cta: "Produkte Ansehen"
      },
      benefits: {
        title: "Warum Stecklingsplugs Wählen?",
        items: [
          {
            icon: "🌿",
            title: "Schnelle Bewurzelung",
            description: "Stecklingsplugs bieten die ideale Umgebung für schnelle und gesunde Wurzelbildung bei Stecklingen und Sämlingen."
          },
          {
            icon: "💪",
            title: "Starke Wurzelentwicklung",
            description: "Das optimale Luft-Wasser-Verhältnis sorgt für kräftiges und gesundes Wurzelwachstum für robuste Pflanzen."
          },
          {
            icon: "🛡️",
            title: "Pilzschutz",
            description: "FP 12+ Folie schützt anfällige Stecklinge während der kritischen Bewurzelungsphase vor Pilzinfektionen."
          },
          {
            icon: "✂️",
            title: "Perfekt für Stecklinge",
            description: "Speziell entwickelt für vegetative Vermehrung mit optimalen Bedingungen für Wurzelentwicklung."
          },
          {
            icon: "📈",
            title: "Höhere Erfolgsraten",
            description: "Nachweislich höhere Erfolgsraten bei Stecklingen und Sämlingen im Vergleich zu traditionellen Methoden."
          },
          {
            icon: "🌱",
            title: "Kein Transplantationsschock",
            description: "Pflanzen Sie den Plug komplett ins Endsubstrat ohne Stress für die junge Pflanze."
          }
        ]
      },
      features: {
        title: "Merkmale von Stecklingsplugs",
        items: [
          "✓ Optimal für vegetative Vermehrung",
          "✓ Schnelle Wurzelentwicklung",
          "✓ FP 12+ Folie für Stabilität",
          "✓ Pilzschutz",
          "✓ Kein Transplantationsschock",
          "✓ Höhere Erfolgsraten",
          "✓ Biologisch abbaubar",
          "✓ Erhältlich in mehreren Formaten"
        ]
      },
      applications: {
        title: "Anwendungen",
        items: [
          "Vegetative Vermehrung",
          "Zierpflanzenstecklinge",
          "Mutterpflanzenverwaltung",
          "Sämlinge",
          "Baumschulen",
          "Professionelle Vermehrung"
        ]
      },
      cta: {
        title: "Starten Sie mit Stecklingsplugs",
        description: "Erhöhen Sie Ihre Erfolgsraten mit professionellen Stecklingsplugs und FP 12+ Technologie für optimale Bewurzelung.",
        button: "Broschüre Herunterladen",
        contact: "Angebot Anfordern"
      }
    }
  }

  const currentContent = content[locale as keyof typeof content] || content.nl

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lumora-cream via-white to-lumora-cream/50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-lumora-green/10 px-4 py-2 rounded-full">
                <span className="text-lumora-green font-semibold">✂️ {currentContent.subtitle}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-lumora-dark leading-tight">
                {currentContent.hero.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {currentContent.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/shop`}
                  className="inline-flex items-center justify-center bg-lumora-green text-black hover:bg-lumora-green/90 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                >
                  {currentContent.hero.cta}
                </Link>
                <a
                  href="/downloads/Lumora-Ellepot-FP12-Folder.pdf"
                  download
                  className="inline-flex items-center justify-center bg-lumora-gold text-white hover:bg-lumora-gold/90 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                >
                  📄 {currentContent.cta.button}
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.webp"
                  alt="Stekpluggen"
                  width={600}
                  height={400}
                  className={`w-full h-auto rounded-xl transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-lumora-cream animate-pulse rounded-xl" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark mb-4">
              {currentContent.benefits.title}
            </h2>
            <div className="w-24 h-1 bg-lumora-gold mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.benefits.items.map((benefit, index) => (
              <div
                key={index}
                className="bg-lumora-cream/30 border border-lumora-gold/20 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-lumora-dark mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features & Applications Section */}
      <section className="py-20 bg-gradient-to-r from-lumora-cream/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark mb-8">
                {currentContent.features.title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {currentContent.features.items.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-lumora-green font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark mb-8">
                {currentContent.applications.title}
              </h2>
              <div className="space-y-3">
                {currentContent.applications.items.map((app, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <span className="text-lumora-green mr-2">✓</span>
                    <span className="text-gray-700">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark mb-4">
              Onze Stekpluggen Producten
            </h2>
            <p className="text-xl text-gray-600">
              Verkrijgbaar in verschillende formaten voor elke toepassing
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <Image
                src="/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.webp"
                alt="Paper Plug Tray 84"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lumora-dark/90 to-transparent p-6 rounded-b-2xl">
                <h3 className="text-white text-2xl font-bold">PAPER PLUG TRAY 84</h3>
                <p className="text-lumora-cream">84 pluggen | 8 trays per doos</p>
              </div>
            </div>
            <div className="relative group">
              <Image
                src="/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.webp"
                alt="Paper Plug Tray 104"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl w-full h-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lumora-dark/90 to-transparent p-6 rounded-b-2xl">
                <h3 className="text-white text-2xl font-bold">PAPER PLUG TRAY 104</h3>
                <p className="text-lumora-cream">104 pluggen | 7 trays per doos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-lumora-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {currentContent.cta.title}
          </h2>
          <p className="text-xl text-lumora-cream/90 mb-10 leading-relaxed">
            {currentContent.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/downloads/Lumora-Ellepot-FP12-Folder.pdf"
              download
              className="inline-flex items-center justify-center bg-lumora-gold text-white hover:bg-lumora-gold/90 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
            >
              📄 {currentContent.cta.button}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center bg-transparent border-2 border-lumora-cream text-lumora-cream hover:bg-lumora-cream hover:text-lumora-dark px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg"
            >
              📞 {currentContent.cta.contact}
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": currentContent.title,
            "description": currentContent.hero.description,
            "brand": {
              "@type": "Brand",
              "name": "Lumora Horticulture"
            },
            "category": "Horticultural Supplies",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Technology",
                "value": "FP 12+"
              },
              {
                "@type": "PropertyValue",
                "name": "Application",
                "value": "Propagation"
              }
            ]
          })
        }}
      />
    </div>
  )
}
