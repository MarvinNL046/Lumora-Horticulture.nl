'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function LevensduurSteenwolClient({ t, locale }: { t: any, locale: string }) {
  const content = {
    nl: {
      title: "Levensduur van Steenwol",
      intro: "Hoe lang gaat steenwol mee? Een belangrijke vraag voor professionele telers die hun investering willen maximaliseren.",
      answer: {
        title: "Snelle Ant woorden",
        items: [
          { label: "Standaard steenwol", duur: "6-12 maanden", icon: "📅" },
          { label: "FP 12+ steenwol", duur: "12+ maanden", icon: "⭐" },
          { label: "Voor propagatie", duur: "1 teeltcyclus", icon: "🌱" },
          { label: "Bij hergebruik", duur: "2-3 cycli", icon: "♻️" }
        ]
      },
      fp12: {
        title: "FP 12+ Technologie: Langere Levensduur",
        intro: "Het FP 12+ vlies maakt een groot verschil in de levensduur:",
        voordelen: [
          { title: "12+ Maanden Stabiliteit", desc: "Behoudt structuur en eigenschappen minimaal 12 maanden" },
          { title: "Schimmelwerend", desc: "Vermindert afbraak door schimmelgroei" },
          { title: "Structuurbehoud", desc: "Geen afbrokkeling of verkruimeling" },
          { title: "Consistente Kwaliteit", desc: "Eigenschappen blijven constant tijdens teelt" }
        ]
      },
      factoren: {
        title: "Factoren die Levensduur Beïnvloeden",
        items: [
          { icon: "💧", factor: "Waterkwaliteit", impact: "Hoge EC/pH kan afbraak versnellen" },
          { icon: "🌡️", factor: "Temperatuur", impact: "Hoge temperaturen (>30°C) verkorten levensduur" },
          { icon: "🦠", factor: "Microbiële Activiteit", impact: "Schimmels en algen kunnen afbraak veroorzaken" },
          { icon: "☀️", factor: "UV-Blootstelling", impact: "Direct zonlicht kan materiaal aantasten" },
          { icon: "🧪", factor: "Chemicaliën", impact: "Agressieve middelen kunnen structuur beschadigen" }
        ]
      },
      hergebruik: {
        title: "Hergebruik van Steenwol",
        intro: "Steenwol kan onder de juiste omstandigheden hergebruikt worden:",
        stappen: [
          "Verwijder oude wortels en plantenresten",
          "Steriliseer met stoom of chemische behandeling",
          "Spoel grondig met schoon water",
          "Buffer opnieuw naar juiste pH",
          "Controleer op structuurschade",
          "Gebruik alleen voor niet-gevoelige teelten"
        ],
        note: "⚠️ Voor propagatie wordt eenmalig gebruik aanbevolen voor optimale hygiëne."
      },
      onderhoud: {
        title: "Onderhoud Tips voor Langere Levensduur",
        tips: [
          "✓ Gebruik schoon water met juiste pH (5.5-6.5)",
          "✓ Voorkom algengroei door lichtdichte bedekking",
          "✓ Regelmatige EC-controle en spoeling",
          "✓ Goede drainage voor zuurstoftoevoer",
          "✓ Bescherm tegen direct zonlicht",
          "✓ Optimale temperatuur (18-24°C)",
          "✓ Preventieve schimmelbehandeling",
          "✓ Regelmatige visuele inspectie"
        ]
      },
      afvoer: {
        title: "Verantwoorde Afvoer na Gebruik",
        opties: [
          { methode: "Recycling", desc: "Steenwol kan gerecycled worden tot nieuw materiaal" },
          { methode: "Hergebruik", desc: "Geschikt voor minder kritische toepassingen" },
          { methode: "Compostering", desc: "Alleen voor niet-behandelde steenwol" },
          { methode: "Afvalverwerking", desc: "Via erkende afvalverwerker" }
        ]
      },
      cta: { title: "FP 12+ Steenwol voor Langdurig Gebruik", button: "Bekijk Ons Assortiment" }
    },
    en: {
      title: "Rockwool Lifespan",
      intro: "How long does rockwool last? An important question for professional growers who want to maximize their investment.",
      answer: {
        title: "Quick Answers",
        items: [
          { label: "Standard rockwool", duur: "6-12 months", icon: "📅" },
          { label: "FP 12+ rockwool", duur: "12+ months", icon: "⭐" },
          { label: "For propagation", duur: "1 growing cycle", icon: "🌱" },
          { label: "When reused", duur: "2-3 cycles", icon: "♻️" }
        ]
      },
      fp12: {
        title: "FP 12+ Technology: Extended Lifespan",
        intro: "The FP 12+ film makes a big difference in lifespan:",
        voordelen: [
          { title: "12+ Months Stability", desc: "Maintains structure and properties for at least 12 months" },
          { title: "Fungal Protection", desc: "Reduces degradation from fungal growth" },
          { title: "Structure Retention", desc: "No crumbling or deterioration" },
          { title: "Consistent Quality", desc: "Properties remain constant during cultivation" }
        ]
      },
      factoren: {
        title: "Factors Affecting Lifespan",
        items: [
          { icon: "💧", factor: "Water Quality", impact: "High EC/pH can accelerate degradation" },
          { icon: "🌡️", factor: "Temperature", impact: "High temperatures (>30°C) shorten lifespan" },
          { icon: "🦠", factor: "Microbial Activity", impact: "Fungi and algae can cause degradation" },
          { icon: "☀️", factor: "UV Exposure", impact: "Direct sunlight can damage material" },
          { icon: "🧪", factor: "Chemicals", impact: "Aggressive agents can damage structure" }
        ]
      },
      hergebruik: {
        title: "Reusing Rockwool",
        intro: "Rockwool can be reused under the right conditions:",
        stappen: [
          "Remove old roots and plant residues",
          "Sterilize with steam or chemical treatment",
          "Rinse thoroughly with clean water",
          "Re-buffer to correct pH",
          "Check for structural damage",
          "Use only for non-sensitive crops"
        ],
        note: "⚠️ Single use is recommended for propagation for optimal hygiene."
      },
      onderhoud: {
        title: "Maintenance Tips for Extended Lifespan",
        tips: [
          "✓ Use clean water with correct pH (5.5-6.5)",
          "✓ Prevent algae growth with light-blocking cover",
          "✓ Regular EC monitoring and flushing",
          "✓ Good drainage for oxygen supply",
          "✓ Protect from direct sunlight",
          "✓ Optimal temperature (18-24°C)",
          "✓ Preventive fungal treatment",
          "✓ Regular visual inspection"
        ]
      },
      afvoer: {
        title: "Responsible Disposal After Use",
        opties: [
          { methode: "Recycling", desc: "Rockwool can be recycled into new material" },
          { methode: "Reuse", desc: "Suitable for less critical applications" },
          { methode: "Composting", desc: "Only for untreated rockwool" },
          { methode: "Waste Processing", desc: "Via certified waste processor" }
        ]
      },
      cta: { title: "FP 12+ Rockwool for Long-Term Use", button: "View Our Range" }
    },
    de: {
      title: "Steinwolle Lebensdauer",
      intro: "Wie lange hält Steinwolle? Eine wichtige Frage für professionelle Züchter, die ihre Investition maximieren möchten.",
      answer: {
        title: "Schnelle Antworten",
        items: [
          { label: "Standard Steinwolle", duur: "6-12 Monate", icon: "📅" },
          { label: "FP 12+ Steinwolle", duur: "12+ Monate", icon: "⭐" },
          { label: "Für Vermehrung", duur: "1 Anbau-Zyklus", icon: "🌱" },
          { label: "Bei Wiederverwendung", duur: "2-3 Zyklen", icon: "♻️" }
        ]
      },
      fp12: {
        title: "FP 12+ Technologie: Längere Lebensdauer",
        intro: "Die FP 12+ Folie macht einen großen Unterschied bei der Lebensdauer:",
        voordelen: [
          { title: "12+ Monate Stabilität", desc: "Behält Struktur und Eigenschaften mindestens 12 Monate" },
          { title: "Pilzschutz", desc: "Reduziert Abbau durch Pilzwachstum" },
          { title: "Strukturerhalt", desc: "Kein Zerbröckeln oder Zerfall" },
          { title: "Konstante Qualität", desc: "Eigenschaften bleiben während Anbau konstant" }
        ]
      },
      factoren: {
        title: "Faktoren die Lebensdauer Beeinflussen",
        items: [
          { icon: "💧", factor: "Wasserqualität", impact: "Hohe EC/pH kann Abbau beschleunigen" },
          { icon: "🌡️", factor: "Temperatur", impact: "Hohe Temperaturen (>30°C) verkürzen Lebensdauer" },
          { icon: "🦠", factor: "Mikrobielle Aktivität", impact: "Pilze und Algen können Abbau verursachen" },
          { icon: "☀️", factor: "UV-Exposition", impact: "Direktes Sonnenlicht kann Material schädigen" },
          { icon: "🧪", factor: "Chemikalien", impact: "Aggressive Mittel können Struktur beschädigen" }
        ]
      },
      hergebruik: {
        title: "Wiederverwendung von Steinwolle",
        intro: "Steinwolle kann unter den richtigen Bedingungen wiederverwendet werden:",
        stappen: [
          "Alte Wurzeln und Pflanzenreste entfernen",
          "Mit Dampf oder chemischer Behandlung sterilisieren",
          "Gründlich mit sauberem Wasser spülen",
          "Auf korrekten pH-Wert neu puffern",
          "Auf Strukturschäden prüfen",
          "Nur für nicht-empfindliche Kulturen verwenden"
        ],
        note: "⚠️ Für Vermehrung wird einmaliger Gebrauch für optimale Hygiene empfohlen."
      },
      onderhoud: {
        title: "Wartungstipps für Längere Lebensdauer",
        tips: [
          "✓ Sauberes Wasser mit korrektem pH verwenden (5.5-6.5)",
          "✓ Algenwachstum durch lichtdichte Abdeckung verhindern",
          "✓ Regelmäßige EC-Kontrolle und Spülung",
          "✓ Gute Drainage für Sauerstoffzufuhr",
          "✓ Vor direktem Sonnenlicht schützen",
          "✓ Optimale Temperatur (18-24°C)",
          "✓ Vorbeugende Pilzbehandlung",
          "✓ Regelmäßige visuelle Inspektion"
        ]
      },
      afvoer: {
        title: "Verantwortungsvolle Entsorgung Nach Gebrauch",
        opties: [
          { methode: "Recycling", desc: "Steinwolle kann zu neuem Material recycelt werden" },
          { methode: "Wiederverwendung", desc: "Geeignet für weniger kritische Anwendungen" },
          { methode: "Kompostierung", desc: "Nur für unbehandelte Steinwolle" },
          { methode: "Abfallverarbeitung", desc: "Über zertifizierten Abfallverarbeiter" }
        ]
      },
      cta: { title: "FP 12+ Steinwolle für Langfristige Nutzung", button: "Sortiment Ansehen" }
    }
  }

  const c = content[locale as keyof typeof content] || content.nl

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-lumora-cream via-white to-lumora-cream/50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-lumora-dark mb-6">{c.title}</h1>
          <p className="text-xl text-gray-600">{c.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h2 className="text-3xl font-bold text-lumora-dark mb-8">{c.answer.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.answer.items.map((item, i) => (
                <div key={i} className="bg-lumora-cream/30 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <div className="font-bold text-lumora-dark mb-2">{item.label}</div>
                  <div className="text-2xl text-lumora-green font-bold">{item.duur}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-lumora-green/10 border-l-4 border-lumora-green rounded-r-2xl p-8">
            <h2 className="text-2xl font-bold text-lumora-dark mb-4">{c.fp12.title}</h2>
            <p className="text-gray-700 mb-6">{c.fp12.intro}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {c.fp12.voordelen.map((v, i) => (
                <div key={i} className="bg-white rounded-lg p-4">
                  <h3 className="font-bold text-lumora-dark mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-lumora-dark mb-6">{c.factoren.title}</h2>
            <div className="space-y-4">
              {c.factoren.items.map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-orange-50 rounded-lg p-4">
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="font-bold text-lumora-dark">{item.factor}</div>
                    <div className="text-sm text-gray-600">{item.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-lumora-dark mb-4">{c.hergebruik.title}</h2>
            <p className="text-gray-700 mb-6">{c.hergebruik.intro}</p>
            <ol className="space-y-3 mb-6">
              {c.hergebruik.stappen.map((stap, i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-lumora-green text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">{i + 1}</span>
                  <span className="text-gray-700 pt-1">{stap}</span>
                </li>
              ))}
            </ol>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-sm text-gray-700">{c.hergebruik.note}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-lumora-dark mb-6">{c.onderhoud.title}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {c.onderhoud.tips.map((tip, i) => (
                <div key={i} className="text-gray-700">{tip}</div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-lumora-dark mb-6">{c.afvoer.title}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {c.afvoer.opties.map((opt, i) => (
                <div key={i} className="bg-lumora-cream/20 rounded-lg p-4">
                  <h3 className="font-bold text-lumora-dark mb-2">♻️ {opt.methode}</h3>
                  <p className="text-sm text-gray-600">{opt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-lumora-cream/50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Image src="/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.webp" alt="Steenwol FP 12+" width={800} height={400} className="rounded-2xl shadow-2xl mx-auto" />
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
