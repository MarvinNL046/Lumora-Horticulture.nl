'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface SteenwolPluggenClientProps {
  t: any
  locale: string
}

export default function SteenwolPluggenClient({ t, locale }: SteenwolPluggenClientProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const content = {
    nl: {
      title: "Steenwol Pluggen",
      subtitle: "Professionele Hydrocultuur Kweekoplossing",
      hero: {
        title: "Steenwol Pluggen: Optimale Kweekresultaten met Hydrocultuur",
        description: "Ontdek de voordelen van steenwol pluggen met FP 12+ technologie. Perfect voor hydrocultuur toepassingen met superieure wateropname en wortelontwikkeling.",
        cta: "Bekijk Producten"
      },
      benefits: {
        title: "Waarom Kiezen voor Steenwol Pluggen?",
        items: [
          {
            icon: "💧",
            title: "Optimale Wateropname",
            description: "Steenwol pluggen hebben uitstekende waterretentie en -distributie eigenschappen voor constante vochtigheid."
          },
          {
            icon: "🌱",
            title: "Superieure Wortelontwikkeling",
            description: "De open structuur van steenwol stimuleert gezonde en krachtige wortelgroei voor optimale plantopname."
          },
          {
            icon: "🛡️",
            title: "Schimmelwerende Bescherming",
            description: "FP 12+ vlies biedt unieke schimmelwerende eigenschappen en beschermt jonge planten tegen infecties."
          },
          {
            icon: "⚡",
            title: "Snelle Groei",
            description: "De ideale lucht-water verhouding zorgt voor versnelde groei en ontwikkeling van jonge planten."
          },
          {
            icon: "🎯",
            title: "Perfecte pH-Stabiliteit",
            description: "Steenwol heeft een neutrale pH en is eenvoudig te bufferen voor optimale groeiomstandigheden."
          },
          {
            icon: "♻️",
            title: "Herbruikbaar",
            description: "Na gebruik kunnen steenwol pluggen worden gerecycled voor duurzame teeltpraktijken."
          }
        ]
      },
      features: {
        title: "Kenmerken van Steenwol Pluggen",
        items: [
          "✓ Uitstekende waterretentie",
          "✓ Optimale lucht-water verhouding",
          "✓ FP 12+ vlies voor stabiliteit",
          "✓ pH-neutraal en eenvoudig te bufferen",
          "✓ Steriele groeiomgeving",
          "✓ Geschikt voor alle hydrocultuur systemen",
          "✓ Consistente kwaliteit",
          "✓ Verkrijgbaar in meerdere formaten"
        ]
      },
      applications: {
        title: "Toepassingen",
        items: [
          "Hydrocultuur systemen",
          "Glastuinbouw",
          "Groenteteelt",
          "Sierteelt",
          "Zaailingen en stekken",
          "Verticale teelt systemen"
        ]
      },
      cta: {
        title: "Start met Steenwol Pluggen",
        description: "Ontdek hoe steenwol pluggen met FP 12+ technologie uw hydrocultuur resultaten naar een hoger niveau tillen.",
        button: "Download Brochure",
        contact: "Vraag Prijsopgave"
      }
    },
    en: {
      title: "Rockwool Plugs",
      subtitle: "Professional Hydroponic Growing Solution",
      hero: {
        title: "Rockwool Plugs: Optimal Growing Results with Hydroponics",
        description: "Discover the benefits of rockwool plugs with FP 12+ technology. Perfect for hydroponic applications with superior water absorption and root development.",
        cta: "View Products"
      },
      benefits: {
        title: "Why Choose Rockwool Plugs?",
        items: [
          {
            icon: "💧",
            title: "Optimal Water Absorption",
            description: "Rockwool plugs have excellent water retention and distribution properties for consistent moisture."
          },
          {
            icon: "🌱",
            title: "Superior Root Development",
            description: "The open structure of rockwool stimulates healthy and strong root growth for optimal plant uptake."
          },
          {
            icon: "🛡️",
            title: "Fungal Protection",
            description: "FP 12+ film provides unique fungal protection properties and protects young plants from infections."
          },
          {
            icon: "⚡",
            title: "Fast Growth",
            description: "The ideal air-water ratio ensures accelerated growth and development of young plants."
          },
          {
            icon: "🎯",
            title: "Perfect pH Stability",
            description: "Rockwool has a neutral pH and is easy to buffer for optimal growing conditions."
          },
          {
            icon: "♻️",
            title: "Reusable",
            description: "After use, rockwool plugs can be recycled for sustainable cultivation practices."
          }
        ]
      },
      features: {
        title: "Features of Rockwool Plugs",
        items: [
          "✓ Excellent water retention",
          "✓ Optimal air-water ratio",
          "✓ FP 12+ film for stability",
          "✓ pH-neutral and easy to buffer",
          "✓ Sterile growing environment",
          "✓ Suitable for all hydroponic systems",
          "✓ Consistent quality",
          "✓ Available in multiple formats"
        ]
      },
      applications: {
        title: "Applications",
        items: [
          "Hydroponic systems",
          "Greenhouse cultivation",
          "Vegetable cultivation",
          "Ornamental cultivation",
          "Seedlings and cuttings",
          "Vertical farming systems"
        ]
      },
      cta: {
        title: "Get Started with Rockwool Plugs",
        description: "Discover how rockwool plugs with FP 12+ technology elevate your hydroponic results to the next level.",
        button: "Download Brochure",
        contact: "Request Quote"
      }
    },
    de: {
      title: "Steinwolle Stecklinge",
      subtitle: "Professionelle Hydrokultur Anbaulösung",
      hero: {
        title: "Steinwolle-Stecklinge: Optimale Anbau-Ergebnisse mit Hydrokultur",
        description: "Entdecken Sie die Vorteile von Steinwolle-Stecklingen mit FP 12+ Technologie. Perfekt für Hydrokultur-Anwendungen mit überlegener Wasseraufnahme und Wurzelentwicklung.",
        cta: "Produkte Ansehen"
      },
      benefits: {
        title: "Warum Steinwolle-Stecklinge Wählen?",
        items: [
          {
            icon: "💧",
            title: "Optimale Wasseraufnahme",
            description: "Steinwolle-Stecklinge haben hervorragende Wasserspeicher- und -verteilungseigenschaften für konstante Feuchtigkeit."
          },
          {
            icon: "🌱",
            title: "Überlegene Wurzelentwicklung",
            description: "Die offene Struktur von Steinwolle stimuliert gesundes und kräftiges Wurzelwachstum für optimale Pflanzenaufnahme."
          },
          {
            icon: "🛡️",
            title: "Pilzschutz",
            description: "FP 12+ Folie bietet einzigartige pilzhemmende Eigenschaften und schützt junge Pflanzen vor Infektionen."
          },
          {
            icon: "⚡",
            title: "Schnelles Wachstum",
            description: "Das ideale Luft-Wasser-Verhältnis sorgt für beschleunigtes Wachstum und Entwicklung junger Pflanzen."
          },
          {
            icon: "🎯",
            title: "Perfekte pH-Stabilität",
            description: "Steinwolle hat einen neutralen pH-Wert und ist einfach zu puffern für optimale Wachstumsbedingungen."
          },
          {
            icon: "♻️",
            title: "Wiederverwendbar",
            description: "Nach Gebrauch können Steinwolle-Stecklinge für nachhaltige Anbaumethoden recycelt werden."
          }
        ]
      },
      features: {
        title: "Merkmale von Steinwolle-Stecklingen",
        items: [
          "✓ Hervorragende Wasserspeicherung",
          "✓ Optimales Luft-Wasser-Verhältnis",
          "✓ FP 12+ Folie für Stabilität",
          "✓ pH-neutral und einfach zu puffern",
          "✓ Sterile Wachstumsumgebung",
          "✓ Geeignet für alle Hydrokultur-Systeme",
          "✓ Konstante Qualität",
          "✓ Erhältlich in mehreren Formaten"
        ]
      },
      applications: {
        title: "Anwendungen",
        items: [
          "Hydrokultur-Systeme",
          "Gewächshausanbau",
          "Gemüseanbau",
          "Zierpflanzenanbau",
          "Sämlinge und Stecklinge",
          "Vertikale Anbausysteme"
        ]
      },
      cta: {
        title: "Starten Sie mit Steinwolle-Stecklingen",
        description: "Entdecken Sie, wie Steinwolle-Stecklinge mit FP 12+ Technologie Ihre Hydrokultur-Ergebnisse auf die nächste Stufe heben.",
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
                <span className="text-lumora-green font-semibold">💧 {currentContent.subtitle}</span>
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
                  src="/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.webp"
                  alt="Steenwol Pluggen"
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
                "value": "Hydroponics"
              }
            ]
          })
        }}
      />
    </div>
  )
}
