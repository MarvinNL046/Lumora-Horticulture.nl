'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function VoordelenNadelenClient({ t, locale }: { t: any, locale: string }) {
  const content = {
    nl: {
      title: "Voor- en Nadelen van Steenwol",
      intro: "Steenwol is een populair teeltsubstraat in de professionele horticulture. Maar wat zijn nu precies de voordelen en nadelen? Hier een compleet overzicht.",
      voordelen: {
        title: "Voordelen van Steenwol",
        items: [
          { icon: "💧", title: "Uitstekende Waterretentie", desc: "Steenwol kan tot 14 keer zijn gewicht aan water vasthouden, ideaal voor constante vochtvoorziening." },
          { icon: "🌬️", title: "Goede Luchtdoorlatendheid", desc: "De open structuur zorgt voor optimale zuurstoftoevoer naar de wortels." },
          { icon: "⚖️", title: "pH-Neutraal", desc: "Steenwol heeft een stabiele pH-waarde en is eenvoudig te bufferen." },
          { icon: "🦠", title: "Steriel", desc: "Geen onkruiden, ziekten of parasieten, perfect voor een schone start." },
          { icon: "♻️", title: "Herbruikbaar", desc: "Na gebruik kan steenwol gerecycled worden voor duurzame teelt." },
          { icon: "📏", title: "Consistente Kwaliteit", desc: "Uniforme eigenschappen voor voorspelbare teeltresultaten." },
          { icon: "🎯", title: "Nauwkeurige Controle", desc: "Perfecte controle over water, voeding en pH-waarde." },
          { icon: "🌱", title: "Snelle Wortelgroei", desc: "De structuur stimuleert gezonde en snelle wortelontwikkeling." }
        ]
      },
      nadelen: {
        title: "Nadelen van Steenwol",
        items: [
          { icon: "💰", title: "Hogere Aanschafkosten", desc: "Initiële investering is hoger dan sommige alternatieven." },
          { icon: "⚗️", title: "Bufferen Nodig", desc: "Voor gebruik moet steenwol gebufferd worden tot de juiste pH." },
          { icon: "💦", title: "Nauwkeurig Watergeven", desc: "Verkeerd watergeven kan leiden tot problemen met waterhuishouding." },
          { icon: "🔬", title: "Technische Kennis Vereist", desc: "Optimaal gebruik vraagt kennis en ervaring." },
          { icon: "🏭", title: "Productieproces", desc: "De productie vereist hoge temperaturen en energie." },
          { icon: "📦", title: "Afvoer na Gebruik", desc: "Verantwoorde afvoer vereist recycling of hergebruik." }
        ]
      },
      conclusion: {
        title: "Conclusie",
        text: "Voor professionele telers wegen de voordelen van steenwol zwaar: de uitstekende controle, consistente kwaliteit en bewezen resultaten maken het een topkeuze in de hydrocultuur. De nadelen zijn vooral gerelateerd aan de leercurve en initiële investering."
      },
      cta: { title: "Ontdek Onze Steenwol Pluggen", button: "Bekijk Producten" }
    },
    en: {
      title: "Pros and Cons of Rockwool",
      intro: "Rockwool is a popular growing substrate in professional horticulture. But what exactly are the advantages and disadvantages? Here's a complete overview.",
      voordelen: {
        title: "Advantages of Rockwool",
        items: [
          { icon: "💧", title: "Excellent Water Retention", desc: "Rockwool can hold up to 14 times its weight in water, ideal for constant moisture supply." },
          { icon: "🌬️", title: "Good Air Permeability", desc: "The open structure ensures optimal oxygen supply to roots." },
          { icon: "⚖️", title: "pH-Neutral", desc: "Rockwool has a stable pH value and is easy to buffer." },
          { icon: "🦠", title: "Sterile", desc: "No weeds, diseases or parasites, perfect for a clean start." },
          { icon: "♻️", title: "Reusable", desc: "After use, rockwool can be recycled for sustainable cultivation." },
          { icon: "📏", title: "Consistent Quality", desc: "Uniform properties for predictable growing results." },
          { icon: "🎯", title: "Precise Control", desc: "Perfect control over water, nutrition and pH value." },
          { icon: "🌱", title: "Fast Root Growth", desc: "The structure stimulates healthy and fast root development." }
        ]
      },
      nadelen: {
        title: "Disadvantages of Rockwool",
        items: [
          { icon: "💰", title: "Higher Initial Costs", desc: "Initial investment is higher than some alternatives." },
          { icon: "⚗️", title: "Buffering Required", desc: "Before use, rockwool must be buffered to the correct pH." },
          { icon: "💦", title: "Precise Watering", desc: "Incorrect watering can lead to water management problems." },
          { icon: "🔬", title: "Technical Knowledge Required", desc: "Optimal use requires knowledge and experience." },
          { icon: "🏭", title: "Production Process", desc: "Production requires high temperatures and energy." },
          { icon: "📦", title: "Disposal After Use", desc: "Responsible disposal requires recycling or reuse." }
        ]
      },
      conclusion: {
        title: "Conclusion",
        text: "For professional growers, the advantages of rockwool are significant: excellent control, consistent quality and proven results make it a top choice in hydroponics. The disadvantages are mainly related to the learning curve and initial investment."
      },
      cta: { title: "Discover Our Rockwool Plugs", button: "View Products" }
    },
    de: {
      title: "Vor- und Nachteile von Steinwolle",
      intro: "Steinwolle ist ein beliebtes Anbausubstrat im professionellen Gartenbau. Aber was sind genau die Vor- und Nachteile? Hier ist eine vollständige Übersicht.",
      voordelen: {
        title: "Vorteile von Steinwolle",
        items: [
          { icon: "💧", title: "Hervorragende Wasserspeicherung", desc: "Steinwolle kann bis zu 14-mal ihr Gewicht an Wasser halten, ideal für konstante Feuchtigkeitsversorgung." },
          { icon: "🌬️", title: "Gute Luftdurchlässigkeit", desc: "Die offene Struktur sorgt für optimale Sauerstoffzufuhr zu den Wurzeln." },
          { icon: "⚖️", title: "pH-Neutral", desc: "Steinwolle hat einen stabilen pH-Wert und ist einfach zu puffern." },
          { icon: "🦠", title: "Steril", desc: "Keine Unkräuter, Krankheiten oder Parasiten, perfekt für einen sauberen Start." },
          { icon: "♻️", title: "Wiederverwendbar", desc: "Nach Gebrauch kann Steinwolle für nachhaltigen Anbau recycelt werden." },
          { icon: "📏", title: "Konsistente Qualität", desc: "Einheitliche Eigenschaften für vorhersagbare Anbau-Ergebnisse." },
          { icon: "🎯", title: "Präzise Kontrolle", desc: "Perfekte Kontrolle über Wasser, Nährstoffe und pH-Wert." },
          { icon: "🌱", title: "Schnelles Wurzelwachstum", desc: "Die Struktur stimuliert gesunde und schnelle Wurzelentwicklung." }
        ]
      },
      nadelen: {
        title: "Nachteile von Steinwolle",
        items: [
          { icon: "💰", title: "Höhere Anschaffungskosten", desc: "Anfangsinvestition ist höher als einige Alternativen." },
          { icon: "⚗️", title: "Pufferung Erforderlich", desc: "Vor Gebrauch muss Steinwolle auf den richtigen pH-Wert gepuffert werden." },
          { icon: "💦", title: "Präzise Bewässerung", desc: "Falsche Bewässerung kann zu Problemen mit der Wasserwirtschaft führen." },
          { icon: "🔬", title: "Technisches Wissen Erforderlich", desc: "Optimale Nutzung erfordert Wissen und Erfahrung." },
          { icon: "🏭", title: "Produktionsprozess", desc: "Die Produktion erfordert hohe Temperaturen und Energie." },
          { icon: "📦", title: "Entsorgung Nach Gebrauch", desc: "Verantwortungsvolle Entsorgung erfordert Recycling oder Wiederverwendung." }
        ]
      },
      conclusion: {
        title: "Fazit",
        text: "Für professionelle Züchter überwiegen die Vorteile von Steinwolle deutlich: hervorragende Kontrolle, konstante Qualität und bewährte Ergebnisse machen es zur Top-Wahl in der Hydrokultur. Die Nachteile beziehen sich hauptsächlich auf die Lernkurve und Anfangsinvestition."
      },
      cta: { title: "Entdecken Sie Unsere Steinwolle-Stecklinge", button: "Produkte Ansehen" }
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-soft mb-12">
            <h2 className="text-3xl font-bold text-lumora-green mb-8">✓ {c.voordelen.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {c.voordelen.items.map((item, i) => (
                <div key={i} className="bg-lumora-cream/20 rounded-xl p-6">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lumora-dark mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-soft mb-12">
            <h2 className="text-3xl font-bold text-orange-600 mb-8">⚠️ {c.nadelen.title}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {c.nadelen.items.map((item, i) => (
                <div key={i} className="bg-orange-50 rounded-xl p-6">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lumora-dark mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-lumora-dark text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">{c.conclusion.title}</h2>
            <p className="text-lumora-cream/90 leading-relaxed">{c.conclusion.text}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-lumora-cream/50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Image src="/productAfbeeldingen/trays/tray104/steenwolplug-104tray-sfeer.webp" alt={locale === 'nl' ? 'Steenwol' : locale === 'de' ? 'Steinwolle' : 'Rockwool'} width={800} height={400} className="rounded-2xl shadow-2xl mx-auto mb-8" />
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
