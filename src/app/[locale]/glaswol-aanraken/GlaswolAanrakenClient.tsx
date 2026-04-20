'use client'

import Link from 'next/link'
import InfoPageCommercialCTA from '@/components/InfoPageCommercialCTA'

export default function GlaswolAanrakenClient({ t, locale }: { t: any, locale: string }) {
  const content = {
    nl: {
      title: "Wat als je Glaswol Aanraakt?",
      intro: "Glaswol en steenwol worden vaak verward. Hier lees je het verschil en wat er gebeurt bij contact.",
      verschil: {
        title: "Verschil tussen Glaswol en Steenwol",
        glaswol: {
          title: "Glaswol",
          icon: "🔬",
          points: ["Gemaakt van gesmolten glas", "Zeer fijne vezels (1-3 μm)", "Vooral voor isolatie", "Kan huidirritatie veroorzaken"]
        },
        steenwol: {
          title: "Steenwol",
          icon: "🪨",
          points: ["Gemaakt van basalt gesteente", "Grovere vezels (>5 μm)", "Voor isolatie EN teelt", "Minder irriterend voor huid"]
        }
      },
      contact: {
        title: "Wat Gebeurt er bij Contact met Glaswol?",
        symptoms: [
          { icon: "🔴", title: "Huidirritatie", text: "Jeuk en roodheid door fijne vezels" },
          { icon: "👁️", title: "Oogirritatie", text: "Rode, tranende ogen bij contact" },
          { icon: "🫁", title: "Luchtwegirritatie", text: "Hoesten bij inademen van stof" },
          { icon: "⏱️", title: "Tijdelijk", text: "Symptomen verdwijnen na verwijderen vezels" }
        ]
      },
      eerste_hulp: {
        title: "Eerste Hulp bij Glaswol Contact",
        steps: [
          { step: "1", text: "NIET wrijven of krabben" },
          { step: "2", text: "Kleding uitschudden (buiten)" },
          { step: "3", text: "Huid afspoelen met koud water" },
          { step: "4", text: "Plakband gebruiken om vezels te verwijderen" },
          { step: "5", text: "Douchen met koud water" },
          { step: "6", text: "Ogen spoelen bij contact" }
        ]
      },
      steenwol_teelt: {
        title: "Waarom Steenwol Veiliger is voor Teelt",
        points: [
          "Grovere vezels kunnen niet ingeademd worden",
          "Minder irriterend voor huid",
          "Speciaal behandeld voor horticulture gebruik",
          "Voldoet aan veiligheidsnormen voor dagelijks gebruik"
        ]
      },
      preventie: {
        title: "Preventie Tips",
        tips: [
          "🧤 Draag altijd handschoenen bij glaswol",
          "👕 Gebruik beschermende kleding",
          "😷 Draag stofmasker in stoffige omgeving",
          "🚿 Was direct na contact",
          "♻️ Kies steenwol voor tuinbouw (veiliger)"
        ]
      },
      cta: { title: "Veilige Steenwol voor Professionele Teelt", button: "Bekijk Steenwol Pluggen" }
    },
    en: {
      title: "What if You Touch Fiberglass?",
      intro: "Fiberglass and rockwool are often confused. Here you can read the difference and what happens on contact.",
      verschil: {
        title: "Difference between Fiberglass and Rockwool",
        glaswol: {
          title: "Fiberglass",
          icon: "🔬",
          points: ["Made from molten glass", "Very fine fibers (1-3 μm)", "Mainly for insulation", "Can cause skin irritation"]
        },
        steenwol: {
          title: "Rockwool",
          icon: "🪨",
          points: ["Made from basalt rock", "Coarser fibers (>5 μm)", "For insulation AND growing", "Less irritating to skin"]
        }
      },
      contact: {
        title: "What Happens on Contact with Fiberglass?",
        symptoms: [
          { icon: "🔴", title: "Skin Irritation", text: "Itching and redness from fine fibers" },
          { icon: "👁️", title: "Eye Irritation", text: "Red, watery eyes on contact" },
          { icon: "🫁", title: "Airway Irritation", text: "Coughing when inhaling dust" },
          { icon: "⏱️", title: "Temporary", text: "Symptoms disappear after removing fibers" }
        ]
      },
      eerste_hulp: {
        title: "First Aid for Fiberglass Contact",
        steps: [
          { step: "1", text: "DO NOT rub or scratch" },
          { step: "2", text: "Shake out clothing (outside)" },
          { step: "3", text: "Rinse skin with cold water" },
          { step: "4", text: "Use tape to remove fibers" },
          { step: "5", text: "Shower with cold water" },
          { step: "6", text: "Rinse eyes on contact" }
        ]
      },
      steenwol_teelt: {
        title: "Why Rockwool is Safer for Growing",
        points: [
          "Coarser fibers cannot be inhaled",
          "Less irritating to skin",
          "Specially treated for horticulture use",
          "Meets safety standards for daily use"
        ]
      },
      preventie: {
        title: "Prevention Tips",
        tips: [
          "🧤 Always wear gloves with fiberglass",
          "👕 Use protective clothing",
          "😷 Wear dust mask in dusty environment",
          "🚿 Wash immediately after contact",
          "♻️ Choose rockwool for horticulture (safer)"
        ]
      },
      cta: { title: "Safe Rockwool for Professional Growing", button: "View Rockwool Plugs" }
    },
    de: {
      title: "Was passiert wenn man Glaswolle berührt?",
      intro: "Glaswolle und Steinwolle werden oft verwechselt. Hier lesen Sie den Unterschied und was bei Kontakt passiert.",
      verschil: {
        title: "Unterschied zwischen Glaswolle und Steinwolle",
        glaswol: {
          title: "Glaswolle",
          icon: "🔬",
          points: ["Aus geschmolzenem Glas hergestellt", "Sehr feine Fasern (1-3 μm)", "Hauptsächlich für Dämmung", "Kann Hautreizungen verursachen"]
        },
        steenwol: {
          title: "Steinwolle",
          icon: "🪨",
          points: ["Aus Basaltgestein hergestellt", "Gröbere Fasern (>5 μm)", "Für Dämmung UND Anbau", "Weniger reizend für Haut"]
        }
      },
      contact: {
        title: "Was passiert bei Kontakt mit Glaswolle?",
        symptoms: [
          { icon: "🔴", title: "Hautreizung", text: "Juckreiz und Rötung durch feine Fasern" },
          { icon: "👁️", title: "Augenreizung", text: "Rote, tränende Augen bei Kontakt" },
          { icon: "🫁", title: "Atemwegsreizung", text: "Husten beim Einatmen von Staub" },
          { icon: "⏱️", title: "Vorübergehend", text: "Symptome verschwinden nach Entfernen der Fasern" }
        ]
      },
      eerste_hulp: {
        title: "Erste Hilfe bei Glaswolle-Kontakt",
        steps: [
          { step: "1", text: "NICHT reiben oder kratzen" },
          { step: "2", text: "Kleidung ausschütteln (draußen)" },
          { step: "3", text: "Haut mit kaltem Wasser abspülen" },
          { step: "4", text: "Klebeband verwenden um Fasern zu entfernen" },
          { step: "5", text: "Duschen mit kaltem Wasser" },
          { step: "6", text: "Augen spülen bei Kontakt" }
        ]
      },
      steenwol_teelt: {
        title: "Warum Steinwolle für Anbau sicherer ist",
        points: [
          "Gröbere Fasern können nicht eingeatmet werden",
          "Weniger reizend für Haut",
          "Speziell für Gartenbau behandelt",
          "Erfüllt Sicherheitsnormen für täglichen Gebrauch"
        ]
      },
      preventie: {
        title: "Präventionstipps",
        tips: [
          "🧤 Tragen Sie immer Handschuhe bei Glaswolle",
          "👕 Verwenden Sie Schutzkleidung",
          "😷 Tragen Sie Staubmaske in staubiger Umgebung",
          "🚿 Waschen Sie sofort nach Kontakt",
          "♻️ Wählen Sie Steinwolle für Gartenbau (sicherer)"
        ]
      },
      cta: { title: "Sichere Steinwolle für Professionellen Anbau", button: "Steinwolle-Stecklinge Ansehen" }
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
            <h2 className="text-3xl font-bold text-lumora-dark mb-8">{c.verschil.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{c.verschil.glaswol.icon}</div>
                  <h3 className="text-xl font-bold text-red-700">{c.verschil.glaswol.title}</h3>
                </div>
                <ul className="space-y-2">
                  {c.verschil.glaswol.points.map((p, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span className="text-gray-700">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-lumora-green/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{c.verschil.steenwol.icon}</div>
                  <h3 className="text-xl font-bold text-lumora-green">{c.verschil.steenwol.title}</h3>
                </div>
                <ul className="space-y-2">
                  {c.verschil.steenwol.points.map((p, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-lumora-green mr-2">✓</span>
                      <span className="text-gray-700">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-lumora-dark mb-6">{c.contact.title}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {c.contact.symptoms.map((s, i) => (
                <div key={i} className="bg-orange-50 rounded-lg p-4">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <h3 className="font-bold text-lumora-dark mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-lumora-dark mb-6">{c.eerste_hulp.title}</h2>
            <div className="space-y-3">
              {c.eerste_hulp.steps.map((s, i) => (
                <div key={i} className="flex items-center gap-4 bg-lumora-cream/20 rounded-lg p-4">
                  <div className="bg-lumora-dark text-white font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">{s.step}</div>
                  <span className="text-gray-700">{s.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-lumora-green/10 border-l-4 border-lumora-green rounded-r-2xl p-8">
            <h2 className="text-2xl font-bold text-lumora-dark mb-4">{c.steenwol_teelt.title}</h2>
            <ul className="space-y-2">
              {c.steenwol_teelt.points.map((p, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-lumora-green mr-3">✓</span>
                  <span className="text-gray-700">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-lumora-dark mb-6">{c.preventie.title}</h2>
            <div className="space-y-3">
              {c.preventie.tips.map((tip, i) => (
                <div key={i} className="text-lg text-gray-700">{tip}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <InfoPageCommercialCTA locale={locale} />
    </div>
  )
}
