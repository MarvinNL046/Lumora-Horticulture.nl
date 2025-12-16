'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface PaperbusPluggenClientProps {
  t: any
  locale: string
}

export default function PaperbusPluggenClient({ t, locale }: PaperbusPluggenClientProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const content = {
    nl: {
      title: "Paperbus Pluggen",
      subtitle: "100% Biologisch Afbreekbaar & Duurzaam",
      hero: {
        title: "Paperbus Pluggen: De Duurzame Keuze voor Professionele Kwekerijen",
        description: "Ontdek de voordelen van paperbus pluggen met FP 12+ technologie. Volledig biologisch afbreekbaar, duurzaam en perfect voor elk type kweektoepassing.",
        cta: "Bekijk Producten"
      },
      benefits: {
        title: "Waarom Kiezen voor Paperbus Pluggen?",
        items: [
          {
            icon: "🌱",
            title: "100% Biologisch Afbreekbaar",
            description: "Paperbus pluggen zijn volledig biologisch afbreekbaar en gemaakt van hernieuwbare houtvezels, perfect voor duurzame teelt."
          },
          {
            icon: "♻️",
            title: "Milieuvriendelijk & Duurzaam",
            description: "Verminder uw ecologische voetafdruk met onze milieuvriendelijke paperbus pluggen. Geen plastic afval meer."
          },
          {
            icon: "🌿",
            title: "Geen Transplantatieschok",
            description: "Wortels groeien moeiteloos door het papier heen, waardoor transplantatieschok volledig wordt vermeden."
          },
          {
            icon: "🏆",
            title: "FP 12+ Technologie",
            description: "Het innovatieve FP 12+ vlies biedt 12+ maanden stabiliteit en schimmelwerende bescherming voor optimale groei."
          },
          {
            icon: "💧",
            title: "Optimale Waterhuishouding",
            description: "Uitstekende water- en luchtdoorlatendheid zorgt voor gezonde wortelontwikkeling en voorkomt overwatering."
          },
          {
            icon: "🎯",
            title: "Bewezen Resultaten",
            description: "Hogere overlevingspercentages en snellere groei vergeleken met traditionele propagatiemethoden."
          }
        ]
      },
      features: {
        title: "Kenmerken van Paperbus Pluggen",
        items: [
          "✓ Hernieuwbare houtvezels",
          "✓ FP 12+ vlies voor langdurige stabiliteit",
          "✓ Schimmelwerende bescherming",
          "✓ Geen plastic componenten",
          "✓ Geschikt voor biologische teelt",
          "✓ Optimale wortelontwikkeling",
          "✓ Makkelijk te verwerken",
          "✓ Verkrijgbaar in meerdere formaten"
        ]
      },
      applications: {
        title: "Toepassingen",
        items: [
          "Groenteteelt in kassen",
          "Sierteelt en potplanten",
          "Boomkwekerijen",
          "Kruidenteelt",
          "Biologische teelt",
          "Zaailingen en jonge planten"
        ]
      },
      cta: {
        title: "Start met Paperbus Pluggen",
        description: "Ontdek hoe paperbus pluggen uw teeltresultaten kunnen verbeteren met duurzame, biologisch afbreekbare propagatie.",
        button: "Download Brochure",
        contact: "Vraag Prijsopgave"
      }
    },
    en: {
      title: "Paper Pot Plugs",
      subtitle: "100% Biodegradable & Sustainable",
      hero: {
        title: "Paper Pot Plugs: The Sustainable Choice for Professional Nurseries",
        description: "Discover the benefits of paper pot plugs with FP 12+ technology. Fully biodegradable, sustainable and perfect for any growing application.",
        cta: "View Products"
      },
      benefits: {
        title: "Why Choose Paper Pot Plugs?",
        items: [
          {
            icon: "🌱",
            title: "100% Biodegradable",
            description: "Paper pot plugs are fully biodegradable and made from renewable wood fibers, perfect for sustainable cultivation."
          },
          {
            icon: "♻️",
            title: "Eco-Friendly & Sustainable",
            description: "Reduce your ecological footprint with our environmentally friendly paper pot plugs. No more plastic waste."
          },
          {
            icon: "🌿",
            title: "No Transplant Shock",
            description: "Roots grow effortlessly through the paper, completely eliminating transplant shock."
          },
          {
            icon: "🏆",
            title: "FP 12+ Technology",
            description: "The innovative FP 12+ film provides 12+ months of stability and fungal protection for optimal growth."
          },
          {
            icon: "💧",
            title: "Optimal Water Management",
            description: "Excellent water and air permeability ensures healthy root development and prevents overwatering."
          },
          {
            icon: "🎯",
            title: "Proven Results",
            description: "Higher survival rates and faster growth compared to traditional propagation methods."
          }
        ]
      },
      features: {
        title: "Features of Paper Pot Plugs",
        items: [
          "✓ Renewable wood fibers",
          "✓ FP 12+ film for long-term stability",
          "✓ Fungal protection",
          "✓ No plastic components",
          "✓ Suitable for organic cultivation",
          "✓ Optimal root development",
          "✓ Easy to process",
          "✓ Available in multiple formats"
        ]
      },
      applications: {
        title: "Applications",
        items: [
          "Vegetable cultivation in greenhouses",
          "Ornamental plants and potted plants",
          "Tree nurseries",
          "Herb cultivation",
          "Organic cultivation",
          "Seedlings and young plants"
        ]
      },
      cta: {
        title: "Get Started with Paper Pot Plugs",
        description: "Discover how paper pot plugs can improve your cultivation results with sustainable, biodegradable propagation.",
        button: "Download Brochure",
        contact: "Request Quote"
      }
    },
    de: {
      title: "Papiertopf Stecker",
      subtitle: "100% Biologisch Abbaubar & Nachhaltig",
      hero: {
        title: "Papiertopf-Stecker: Die Nachhaltige Wahl für Professionelle Gärtnereien",
        description: "Entdecken Sie die Vorteile von Papiertopf-Steckern mit FP 12+ Technologie. Vollständig biologisch abbaubar, nachhaltig und perfekt für jede Anbauanwendung.",
        cta: "Produkte Ansehen"
      },
      benefits: {
        title: "Warum Papiertopf-Stecker Wählen?",
        items: [
          {
            icon: "🌱",
            title: "100% Biologisch Abbaubar",
            description: "Papiertopf-Stecker sind vollständig biologisch abbaubar und aus erneuerbaren Holzfasern hergestellt, perfekt für nachhaltigen Anbau."
          },
          {
            icon: "♻️",
            title: "Umweltfreundlich & Nachhaltig",
            description: "Reduzieren Sie Ihren ökologischen Fußabdruck mit unseren umweltfreundlichen Papiertopf-Steckern. Kein Plastikmüll mehr."
          },
          {
            icon: "🌿",
            title: "Kein Transplantationsschock",
            description: "Wurzeln wachsen mühelos durch das Papier, wodurch Transplantationsschock vollständig vermieden wird."
          },
          {
            icon: "🏆",
            title: "FP 12+ Technologie",
            description: "Die innovative FP 12+ Folie bietet 12+ Monate Stabilität und Pilzschutz für optimales Wachstum."
          },
          {
            icon: "💧",
            title: "Optimales Wassermanagement",
            description: "Hervorragende Wasser- und Luftdurchlässigkeit sorgt für gesunde Wurzelentwicklung und verhindert Überwässerung."
          },
          {
            icon: "🎯",
            title: "Bewährte Ergebnisse",
            description: "Höhere Überlebensraten und schnelleres Wachstum im Vergleich zu traditionellen Vermehrungsmethoden."
          }
        ]
      },
      features: {
        title: "Merkmale von Papiertopf-Steckern",
        items: [
          "✓ Erneuerbare Holzfasern",
          "✓ FP 12+ Folie für langfristige Stabilität",
          "✓ Pilzschutz",
          "✓ Keine Kunststoffkomponenten",
          "✓ Geeignet für biologischen Anbau",
          "✓ Optimale Wurzelentwicklung",
          "✓ Einfach zu verarbeiten",
          "✓ Erhältlich in mehreren Formaten"
        ]
      },
      applications: {
        title: "Anwendungen",
        items: [
          "Gemüseanbau in Gewächshäusern",
          "Zierpflanzen und Topfpflanzen",
          "Baumschulen",
          "Kräuteranbau",
          "Biologischer Anbau",
          "Sämlinge und Jungpflanzen"
        ]
      },
      cta: {
        title: "Starten Sie mit Papiertopf-Steckern",
        description: "Entdecken Sie, wie Papiertopf-Stecker Ihre Anbau-Ergebnisse mit nachhaltiger, biologisch abbaubarer Vermehrung verbessern können.",
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
                <span className="text-lumora-green font-semibold">♻️ {currentContent.subtitle}</span>
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
                  alt="Paperbus Pluggen"
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

      {/* Features Section */}
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
                "name": "Biodegradable",
                "value": "Yes"
              },
              {
                "@type": "PropertyValue",
                "name": "Sustainable",
                "value": "Yes"
              }
            ]
          })
        }}
      />
    </div>
  )
}
