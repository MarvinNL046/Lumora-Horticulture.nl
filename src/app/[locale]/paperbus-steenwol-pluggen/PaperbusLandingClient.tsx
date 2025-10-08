'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface PaperbusLandingClientProps {
  t: any
  locale: string
}

export default function PaperbusLandingClient({ t, locale }: PaperbusLandingClientProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const content = {
    nl: {
      title: "Paperbus Steenwol Pluggen",
      subtitle: "Professionele kweekoplossing met FP 12+ technologie",
      hero: {
        title: "De Beste Paperbus Steenwol Pluggen voor Professionele Teelt",
        description: "Ontdek waarom Lumora Horticulture de voorkeur heeft voor paperbus steenwol pluggen met FP 12+ technologie. Superieure kwaliteit, milieuvriendelijk en bewezen resultaten.",
        cta: "Bekijk Onze Producten"
      },
      benefits: {
        title: "Waarom Kiezen voor Paperbus Steenwol Pluggen?",
        items: [
          {
            icon: "🌱",
            title: "100% Milieuvriendelijk",
            description: "Paperbus steenwol pluggen met FP 12+ vlies zijn volledig biologisch afbreekbaar en gemaakt van hernieuwbare houtvezels."
          },
          {
            icon: "⏰", 
            title: "12+ Maanden Stabiliteit",
            description: "Het FP 12+ vlies behoudt zijn structuur gedurende de hele kweekperiode voor optimale groeiomstandigheden."
          },
          {
            icon: "🛡️",
            title: "Schimmelwerende Bescherming",
            description: "Unieke fungicide coating beschermt jonge planten tegen schimmelinfecties en zorgt voor gezondere groei."
          },
          {
            icon: "🌿",
            title: "Geen Transplantatieschok", 
            description: "Wortels groeien moeiteloos door het papier, waardoor transplantatieschok volledig wordt geëlimineerd."
          },
          {
            icon: "🏭",
            title: "Professionele Kwaliteit",
            description: "Speciaal ontwikkeld voor commerciële kwekerijen en professionele glastuinbouw applicaties."
          },
          {
            icon: "📈",
            title: "Bewezen Resultaten",
            description: "Hogere overlevingspercentages en snellere groei vergeleken met traditionele alternatieven."
          }
        ]
      },
      applications: {
        title: "Toepassingen van Paperbus Steenwol Pluggen",
        items: [
          "Groenteteelt in kassen",
          "Sierteelt en potplanten", 
          "Boomkwekerijen",
          "Kruidenteelt",
          "Zaailingen en jonge planten",
          "Biologische teelt"
        ]
      },
      why: {
        title: "Waarom Lumora Paperbus Steenwol Pluggen?",
        description: "Bij Lumora Horticulture kiezen we bewust voor het beste: al onze paperbus steenwol pluggen zijn verpakt met het innovatieve FP 12+ vlies. Dit maakt onze pluggen superieur in kwaliteit, met unieke schimmelwerende eigenschappen voor optimale groeiresultaten."
      },
      cta: {
        title: "Klaar om te Upgraden naar Paperbus Steenwol Pluggen?",
        description: "Ontdek hoe onze paperbus steenwol pluggen met FP 12+ technologie uw teeltresultaten kunnen verbeteren.",
        button: "Download Productfolder",
        contact: "Neem Contact Op"
      }
    },
    en: {
      title: "Paper Pot Rockwool Plugs",
      subtitle: "Professional growing solution with FP 12+ technology", 
      hero: {
        title: "The Best Paper Pot Rockwool Plugs for Professional Cultivation",
        description: "Discover why Lumora Horticulture prefers paper pot rockwool plugs with FP 12+ technology. Superior quality, eco-friendly and proven results.",
        cta: "View Our Products"
      },
      benefits: {
        title: "Why Choose Paper Pot Rockwool Plugs?",
        items: [
          {
            icon: "🌱",
            title: "100% Eco-Friendly",
            description: "Paper pot rockwool plugs with FP 12+ film are fully biodegradable and made from renewable wood fibers."
          },
          {
            icon: "⏰",
            title: "12+ Months Stability", 
            description: "The FP 12+ film maintains its structure throughout the entire growing period for optimal growing conditions."
          },
          {
            icon: "🛡️",
            title: "Fungicide Protection",
            description: "Unique fungicide coating protects young plants against fungal infections and ensures healthier growth."
          },
          {
            icon: "🌿",
            title: "No Transplant Shock",
            description: "Roots grow effortlessly through the paper, completely eliminating transplant shock."
          },
          {
            icon: "🏭",
            title: "Professional Quality",
            description: "Specially developed for commercial nurseries and professional greenhouse applications."
          },
          {
            icon: "📈",
            title: "Proven Results",
            description: "Higher survival rates and faster growth compared to traditional alternatives."
          }
        ]
      },
      applications: {
        title: "Applications of Paper Pot Rockwool Plugs",
        items: [
          "Vegetable cultivation in greenhouses",
          "Ornamental plants and potted plants",
          "Tree nurseries",
          "Herb cultivation",
          "Seedlings and young plants", 
          "Organic cultivation"
        ]
      },
      why: {
        title: "Why Lumora Paper Pot Rockwool Plugs?",
        description: "At Lumora Horticulture we consciously choose the best: all our paper pot rockwool plugs are wrapped with the innovative FP 12+ film. This makes our plugs superior in quality, with unique fungicide properties for optimal growth results."
      },
      cta: {
        title: "Ready to Upgrade to Paper Pot Rockwool Plugs?",
        description: "Discover how our paper pot rockwool plugs with FP 12+ technology can improve your cultivation results.",
        button: "Download Product Brochure",
        contact: "Contact Us"
      }
    },
    de: {
      title: "Papiertopf Steinwollstecker",
      subtitle: "Professionelle Anbaulösung mit FP 12+ Technologie",
      hero: {
        title: "Die Besten Papiertopf-Steinwollstecker für Professionellen Anbau",
        description: "Entdecken Sie, warum Lumora Horticulture Papiertopf-Steinwollstecker mit FP 12+ Technologie bevorzugt. Überlegene Qualität, umweltfreundlich und bewährte Ergebnisse.",
        cta: "Unsere Produkte Ansehen"
      },
      benefits: {
        title: "Warum Papiertopf-Steinwollstecker Wählen?",
        items: [
          {
            icon: "🌱",
            title: "100% Umweltfreundlich",
            description: "Papiertopf-Steinwollstecker mit FP 12+ Folie sind vollständig biologisch abbaubar und aus erneuerbaren Holzfasern hergestellt."
          },
          {
            icon: "⏰",
            title: "12+ Monate Stabilität",
            description: "Die FP 12+ Folie behält ihre Struktur während der gesamten Anbauperiode für optimale Wachstumsbedingungen bei."
          },
          {
            icon: "🛡️",
            title: "Pilzschutz",
            description: "Einzigartige Fungizid-Beschichtung schützt junge Pflanzen vor Pilzinfektionen und sorgt für gesünderes Wachstum."
          },
          {
            icon: "🌿",
            title: "Kein Transplantationsschock",
            description: "Wurzeln wachsen mühelos durch das Papier und eliminieren Transplantationsschock vollständig."
          },
          {
            icon: "🏭",
            title: "Professionelle Qualität", 
            description: "Speziell entwickelt für kommerzielle Gärtnereien und professionelle Gewächshausanwendungen."
          },
          {
            icon: "📈",
            title: "Bewährte Ergebnisse",
            description: "Höhere Überlebensraten und schnelleres Wachstum im Vergleich zu traditionellen Alternativen."
          }
        ]
      },
      applications: {
        title: "Anwendungen von Papiertopf-Steinwollsteckern",
        items: [
          "Gemüseanbau in Gewächshäusern",
          "Zierpflanzen und Topfpflanzen",
          "Baumschulen",
          "Kräuteranbau",
          "Sämlinge und Jungpflanzen",
          "Biologischer Anbau"
        ]
      },
      why: {
        title: "Warum Lumora Papiertopf-Steinwollstecker?", 
        description: "Bei Lumora Horticulture wählen wir bewusst das Beste: alle unsere Papiertopf-Steinwollstecker sind mit der innovativen FP 12+ Folie umhüllt. Dies macht unsere Stecker qualitativ überlegen, mit einzigartigen pilzhemmenden Eigenschaften für optimale Wachstumsergebnisse."
      },
      cta: {
        title: "Bereit für ein Upgrade auf Papiertopf-Steinwollstecker?",
        description: "Entdecken Sie, wie unsere Papiertopf-Steinwollstecker mit FP 12+ Technologie Ihre Anbau-Ergebnisse verbessern können.",
        button: "Produktbroschüre Herunterladen",
        contact: "Kontakt Aufnehmen"
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
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-lumora-dark leading-tight">
                  {currentContent.hero.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {currentContent.hero.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/products`}
                  className="inline-flex items-center justify-center bg-lumora-green text-black hover:bg-lumora-green/90 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                >
                  {currentContent.hero.cta}
                </Link>
                
                <a
                  href="/downloads/Lumora-Ellepot-FP12-Folder.pdf"
                  download="Lumora-Paperbus-Steenwol-Pluggen.pdf"
                  className="inline-flex items-center justify-center bg-lumora-gold text-white hover:bg-lumora-gold/90 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                >
                  {currentContent.cta.button}
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg"
                  alt="Paperbus Steenwol Pluggen"
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

      {/* Why Lumora Section */}
      <section className="py-20 bg-gradient-to-r from-lumora-cream/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark">
                {currentContent.why.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentContent.why.description}
              </p>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-lumora-gold">
                <h3 className="text-xl font-semibold text-lumora-dark mb-3">
                  FP 12+ Technologie Voordelen:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-lumora-green mr-3">✓</span>
                    Langere houdbaarheid dan standaard alternatieven
                  </li>
                  <li className="flex items-center">
                    <span className="text-lumora-green mr-3">✓</span>
                    Superieure wortelontwikkeling
                  </li>
                  <li className="flex items-center">
                    <span className="text-lumora-green mr-3">✓</span>
                    Verminderde uitval door schimmelinfecties
                  </li>
                  <li className="flex items-center">
                    <span className="text-lumora-green mr-3">✓</span>
                    Consistent groeiresultaat
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/greenhouse-1.jpg"
                alt="Professionele glastuinbouw"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-lumora-green/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark mb-4">
              {currentContent.applications.title}
            </h2>
            <div className="w-24 h-1 bg-lumora-gold mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentContent.applications.items.map((application, index) => (
              <div
                key={index}
                className="bg-lumora-cream/20 rounded-xl p-6 text-center hover:bg-lumora-cream/40 transition-colors duration-300"
              >
                <div className="text-lumora-green text-2xl mb-2">✓</div>
                <p className="text-lumora-dark font-medium">{application}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-gradient-to-br from-lumora-cream/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-lumora-green mb-2">84</div>
                  <p className="text-lumora-dark font-medium">Pluggen per Tray-84st</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-lumora-green mb-2">104</div>
                  <p className="text-lumora-dark font-medium">Pluggen per Tray-104st</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-lumora-dark mb-4">
                  Beschikbare Formaten:
                </h3>
                <div className="space-y-3">
                  <div className="py-3 border-b border-lumora-cream">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-lumora-dark">Tray-84st</span>
                      <span className="text-gray-600">84 pluggen</span>
                    </div>
                    <p className="text-sm text-gray-500 italic">Verpakking: 8 trays per doos</p>
                  </div>
                  <div className="py-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-lumora-dark">Tray-104st</span>
                      <span className="text-gray-600">104 pluggen</span>
                    </div>
                    <p className="text-sm text-gray-500 italic">Verpakking: 7 trays per doos</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <Image
                  src="/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg"
                  alt="Tray-84st Paperbus Steenwol Pluggen"
                  width={300}
                  height={200}
                  className="rounded-xl shadow-lg w-full h-auto"
                />
                <p className="text-center text-sm text-gray-600 font-medium">Tray-84st</p>
              </div>
              <div className="space-y-4">
                <Image
                  src="/productAfbeeldingen/trays/tray104/lumorahorticulture-tray104.jpg"
                  alt="Tray-104st Paperbus Steenwol Pluggen"
                  width={300}
                  height={200}
                  className="rounded-xl shadow-lg w-full h-auto"
                />
                <p className="text-center text-sm text-gray-600 font-medium">Tray-104st</p>
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
              download="Lumora-Paperbus-Steenwol-Pluggen.pdf"
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
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Lumora Horticulture"
              }
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Technology",
                "value": "FP 12+"
              },
              {
                "@type": "PropertyValue", 
                "name": "Stability Period",
                "value": "12+ months"
              },
              {
                "@type": "PropertyValue",
                "name": "Eco-Friendly",
                "value": "Yes"
              }
            ]
          })
        }}
      />
    </div>
  )
}