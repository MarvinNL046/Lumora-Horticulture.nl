'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function SteenwolVastzettenClient({ t, locale }: { t: any, locale: string }) {
  const content = {
    nl: {
      title: "Hoe Zet je Steenwol Vast?",
      intro: "Het correct vastzetten van steenwol is essentieel voor optimale groeiresultaten. Hier leer je alle methoden en best practices.",
      methods: [
        {
          title: "In Trays en Propagatiesystemen",
          icon: "📦",
          steps: [
            "Plaats de steenwol plug direct in de tray opening",
            "Zorg dat de plug stabiel zit zonder te wiebelen",
            "Druk niet te hard - de plug moet ademen",
            "Controleer of alle pluggen op gelijke hoogte zitten"
          ]
        },
        {
          title: "In Hydrocultuur Systemen",
          icon: "💧",
          steps: [
            "Gebruik netpotten of groeibakken",
            "Plaats steenwol plug in het centrum",
            "Vul rondom met kleikorrels voor stabiliteit",
            "Zorg dat de plug het wateroppervlak raakt"
          ]
        },
        {
          title: "In Substraat (Kokos/Potgrond)",
          icon: "🌱",
          steps: [
            "Maak een gat ter grootte van de plug",
            "Plaats de plug op gelijke hoogte met substraat",
            "Druk substraat licht aan rond de plug",
            "Water geven voor goed contact"
          ]
        },
        {
          title: "In NFT Systemen",
          icon: "🔄",
          steps: [
            "Gebruik speciale steenwol houders",
            "Plaats plug in de houder",
            "Zorg dat wortels naar beneden groeien",
            "Controleer voedingsfilmstroom regelmatig"
          ]
        }
      ],
      tips: {
        title: "Belangrijke Tips",
        items: [
          "🎯 Zorg altijd voor goed contact met het teeltsysteem",
          "💦 Voornat steenwol voor gebruik",
          "🌡️ Houd optimale temperatuur aan (18-24°C)",
          "📏 Check waterpassing voor gelijkmatige groei",
          "🔍 Controleer regelmatig op verschuivingen",
          "💨 Zorg voor voldoende luchtcirculatie"
        ]
      },
      mistakes: {
        title: "Veelgemaakte Fouten",
        items: [
          "❌ Te hard aandrukken (beschadigt structuur)",
          "❌ Plug te diep plaatsen (wortelrot risico)",
          "❌ Droge plug plaatsen (slechte wateropname)",
          "❌ Ongelijke hoogte (ongelijkmatige groei)",
          "❌ Geen stabilisatie (plug verschuift)"
        ]
      },
      cta: { title: "Professionele Steenwol Pluggen", button: "Bekijk Assortiment" }
    },
    en: {
      title: "How to Secure Rockwool?",
      intro: "Properly securing rockwool is essential for optimal growing results. Here you'll learn all methods and best practices.",
      methods: [
        {
          title: "In Trays and Propagation Systems",
          icon: "📦",
          steps: [
            "Place the rockwool plug directly in the tray opening",
            "Ensure the plug sits stable without wobbling",
            "Don't press too hard - the plug needs to breathe",
            "Check that all plugs are at equal height"
          ]
        },
        {
          title: "In Hydroponic Systems",
          icon: "💧",
          steps: [
            "Use net pots or growing containers",
            "Place rockwool plug in the center",
            "Fill around with clay pebbles for stability",
            "Ensure plug touches the water surface"
          ]
        },
        {
          title: "In Substrate (Coco/Soil)",
          icon: "🌱",
          steps: [
            "Make a hole the size of the plug",
            "Place plug level with substrate",
            "Press substrate lightly around plug",
            "Water for good contact"
          ]
        },
        {
          title: "In NFT Systems",
          icon: "🔄",
          steps: [
            "Use special rockwool holders",
            "Place plug in holder",
            "Ensure roots grow downward",
            "Check nutrient film flow regularly"
          ]
        }
      ],
      tips: {
        title: "Important Tips",
        items: [
          "🎯 Always ensure good contact with growing system",
          "💦 Pre-soak rockwool before use",
          "🌡️ Maintain optimal temperature (18-24°C)",
          "📏 Check level for even growth",
          "🔍 Regularly check for shifts",
          "💨 Ensure adequate air circulation"
        ]
      },
      mistakes: {
        title: "Common Mistakes",
        items: [
          "❌ Pressing too hard (damages structure)",
          "❌ Placing plug too deep (root rot risk)",
          "❌ Placing dry plug (poor water uptake)",
          "❌ Uneven height (uneven growth)",
          "❌ No stabilization (plug shifts)"
        ]
      },
      cta: { title: "Professional Rockwool Plugs", button: "View Range" }
    },
    de: {
      title: "Wie Befestigt Man Steinwolle?",
      intro: "Das richtige Befestigen von Steinwolle ist entscheidend für optimale Anbau-Ergebnisse. Hier lernen Sie alle Methoden und Best Practices.",
      methods: [
        {
          title: "In Schalen und Vermehrungssystemen",
          icon: "📦",
          steps: [
            "Platzieren Sie den Steinwolle-Stecker direkt in die Schalenöffnung",
            "Stellen Sie sicher, dass der Stecker stabil sitzt",
            "Nicht zu fest drücken - der Stecker muss atmen",
            "Prüfen Sie, ob alle Stecker auf gleicher Höhe sind"
          ]
        },
        {
          title: "In Hydrokultur-Systemen",
          icon: "💧",
          steps: [
            "Verwenden Sie Netztöpfe oder Wachstumsbehälter",
            "Platzieren Sie Steinwolle-Stecker in der Mitte",
            "Füllen Sie rundherum mit Tonkügelchen für Stabilität",
            "Stellen Sie sicher, dass Stecker Wasseroberfläche berührt"
          ]
        },
        {
          title: "In Substrat (Kokos/Erde)",
          icon: "🌱",
          steps: [
            "Machen Sie ein Loch in Größe des Steckers",
            "Platzieren Sie Stecker auf gleicher Höhe mit Substrat",
            "Drücken Sie Substrat leicht um Stecker",
            "Gießen für guten Kontakt"
          ]
        },
        {
          title: "In NFT-Systemen",
          icon: "🔄",
          steps: [
            "Verwenden Sie spezielle Steinwolle-Halter",
            "Platzieren Sie Stecker im Halter",
            "Stellen Sie sicher, dass Wurzeln nach unten wachsen",
            "Prüfen Sie Nährstofffilmfluss regelmäßig"
          ]
        }
      ],
      tips: {
        title: "Wichtige Tipps",
        items: [
          "🎯 Sorgen Sie immer für guten Kontakt mit Anbausystem",
          "💦 Weichen Sie Steinwolle vor Gebrauch ein",
          "🌡️ Halten Sie optimale Temperatur ein (18-24°C)",
          "📏 Prüfen Sie Wasserwaage für gleichmäßiges Wachstum",
          "🔍 Kontrollieren Sie regelmäßig auf Verschiebungen",
          "💨 Sorgen Sie für ausreichende Luftzirkulation"
        ]
      },
      mistakes: {
        title: "Häufige Fehler",
        items: [
          "❌ Zu fest drücken (beschädigt Struktur)",
          "❌ Stecker zu tief platzieren (Wurzelfäule-Risiko)",
          "❌ Trockenen Stecker platzieren (schlechte Wasseraufnahme)",
          "❌ Ungleiche Höhe (ungleichmäßiges Wachstum)",
          "❌ Keine Stabilisierung (Stecker verschiebt sich)"
        ]
      },
      cta: { title: "Professionelle Steinwolle-Stecklinge", button: "Sortiment Ansehen" }
    }
  }

  const c = content[locale as keyof typeof content] || content.nl

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-lumora-cream via-white to-lumora-cream/50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-lumora-dark mb-6">{c.title}</h1>
          <p className="text-xl text-gray-600">{c.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {c.methods.map((method, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{method.icon}</div>
                <h2 className="text-2xl font-bold text-lumora-dark">{method.title}</h2>
              </div>
              <ol className="space-y-3">
                {method.steps.map((step, j) => (
                  <li key={j} className="flex items-start">
                    <span className="bg-lumora-green text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">{j + 1}</span>
                    <span className="text-gray-700 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-lumora-cream/50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold text-lumora-green mb-6">{c.tips.title}</h2>
              <ul className="space-y-3">
                {c.tips.items.map((tip, i) => (
                  <li key={i} className="text-gray-700">{tip}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold text-orange-600 mb-6">{c.mistakes.title}</h2>
              <ul className="space-y-3">
                {c.mistakes.items.map((mistake, i) => (
                  <li key={i} className="text-gray-700">{mistake}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Image src="/productAfbeeldingen/trays/tray84/steenwol-plug-84tray-sfeer.webp" alt={locale === 'nl' ? 'Steenwol Pluggen' : locale === 'de' ? 'Steinwolle Plugs' : 'Rockwool Plugs'} width={800} height={400} className="rounded-2xl shadow-2xl mx-auto" />
        </div>
      </section>

      <section className="py-20 bg-lumora-dark text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{c.cta.title}</h2>
          <Link href={`/${locale}/steenwol-pluggen`} className="inline-flex items-center justify-center bg-lumora-green text-black hover:bg-lumora-green/90 px-8 py-4 rounded-xl shadow-lg transition-all font-semibold text-lg">
            {c.cta.button}
          </Link>
        </div>
      </section>
    </div>
  )
}
