'use client'

import Link from 'next/link'

export default function SteenwolLongenClient({ t, locale }: { t: any, locale: string }) {
  const content = {
    nl: {
      title: "Is Steenwol Schadelijk voor de Longen?",
      intro: "Een belangrijke vraag voor professionals die met steenwol werken. Hier vind je alle feiten over veiligheid en gezondheid.",
      answer: {
        title: "Het Korte Antwoord",
        text: "Steenwol voor tuinbouw is over het algemeen veilig als je normale voorzorgsmaatregelen neemt. Moderne steenwol pluggen bevatten geen schadelijke vezels die gevaarlijk zijn voor de longen.",
        icon: "✅"
      },
      sections: [
        {
          title: "Verschil met Isolatie Steenwol",
          content: "Het is belangrijk om onderscheid te maken tussen teelt-steenwol en isolatie-steenwol:",
          points: [
            "Teelt-steenwol: Grotere vezels, veiliger in gebruik",
            "Isolatie-steenwol: Fijnere vezels, meer voorzichtigheid nodig",
            "Verschillende productieprocessen en toepassingen"
          ]
        },
        {
          title: "Veiligheid van Teelt Steenwol",
          content: "Steenwol voor horticulture heeft specifieke eigenschappen die het veiliger maken:",
          points: [
            "Grotere vezeldiameter (>5 μm)",
            "Niet respirabel (te groot om in te ademen)",
            "Geen WHO carcinogeen classificatie",
            "Voldoet aan EU veiligheidsnormen"
          ]
        },
        {
          title: "Aanbevolen Voorzorgsmaatregelen",
          items: [
            { icon: "🧤", text: "Draag handschoenen bij intensief contact" },
            { icon: "👕", text: "Gebruik werkkleding met lange mouwen" },
            { icon: "😷", text: "Stofmasker bij snijden/bewerken (optioneel)" },
            { icon: "🚿", text: "Was handen na gebruik" },
            { icon: "💨", text: "Werk in goed geventileerde ruimte" },
            { icon: "🧹", text: "Houd werkruimte schoon" }
          ]
        },
        {
          title: "Wanneer Extra Voorzichtig Zijn?",
          situations: [
            "Bij snijden of bewerken van steenwol",
            "In stoffige omgevingen",
            "Bij gevoelige huid of luchtwegen",
            "Bij grote hoeveelheden verwerken"
          ]
        },
        {
          title: "Symptomen van Overmatige Blootstelling",
          symptoms: [
            "Lichte huidirritatie (tijdelijk)",
            "Jeuk (verdwijnt na wassen)",
            "Lichte oogirritatie (bij stoffig werk)",
            "Keelirritatie (bij extreme stoffigheid)"
          ],
          note: "Deze symptomen zijn mild en tijdelijk. Ernstige gezondheidsproblemen zijn zeer onwaarschijnlijk bij normaal gebruik."
        }
      ],
      conclusion: {
        title: "Conclusie",
        text: "Steenwol voor tuinbouw is veilig voor gebruik als je basale voorzorgsmaatregelen neemt. De vezels zijn te groot om ingeademd te worden en vormen geen gezondheidsrisico. Draag beschermende kleding bij intensief contact en je bent veilig beschermd."
      },
      cta: { title: "Veilige en Professionele Steenwol Pluggen", button: "Bekijk Producten" }
    },
    en: {
      title: "Is Rockwool Harmful to Lungs?",
      intro: "An important question for professionals working with rockwool. Here you'll find all facts about safety and health.",
      answer: {
        title: "The Short Answer",
        text: "Horticulture rockwool is generally safe when you take normal precautions. Modern rockwool plugs contain no harmful fibers that are dangerous to lungs.",
        icon: "✅"
      },
      sections: [
        {
          title: "Difference with Insulation Rockwool",
          content: "It's important to distinguish between growing rockwool and insulation rockwool:",
          points: [
            "Growing rockwool: Larger fibers, safer to use",
            "Insulation rockwool: Finer fibers, more caution needed",
            "Different production processes and applications"
          ]
        },
        {
          title: "Safety of Growing Rockwool",
          content: "Horticulture rockwool has specific properties that make it safer:",
          points: [
            "Larger fiber diameter (>5 μm)",
            "Not respirable (too large to inhale)",
            "No WHO carcinogen classification",
            "Meets EU safety standards"
          ]
        },
        {
          title: "Recommended Precautions",
          items: [
            { icon: "🧤", text: "Wear gloves during intensive contact" },
            { icon: "👕", text: "Use long-sleeved work clothing" },
            { icon: "😷", text: "Dust mask when cutting/processing (optional)" },
            { icon: "🚿", text: "Wash hands after use" },
            { icon: "💨", text: "Work in well-ventilated area" },
            { icon: "🧹", text: "Keep workspace clean" }
          ]
        },
        {
          title: "When to Be Extra Careful?",
          situations: [
            "When cutting or processing rockwool",
            "In dusty environments",
            "With sensitive skin or airways",
            "When processing large quantities"
          ]
        },
        {
          title: "Symptoms of Excessive Exposure",
          symptoms: [
            "Mild skin irritation (temporary)",
            "Itching (disappears after washing)",
            "Mild eye irritation (during dusty work)",
            "Throat irritation (in extreme dustiness)"
          ],
          note: "These symptoms are mild and temporary. Serious health problems are very unlikely with normal use."
        }
      ],
      conclusion: {
        title: "Conclusion",
        text: "Horticulture rockwool is safe to use when you take basic precautions. The fibers are too large to be inhaled and pose no health risk. Wear protective clothing during intensive contact and you're safely protected."
      },
      cta: { title: "Safe and Professional Rockwool Plugs", button: "View Products" }
    },
    de: {
      title: "Ist Steinwolle Schädlich für die Lunge?",
      intro: "Eine wichtige Frage für Fachleute, die mit Steinwolle arbeiten. Hier finden Sie alle Fakten über Sicherheit und Gesundheit.",
      answer: {
        title: "Die Kurze Antwort",
        text: "Gartenbau-Steinwolle ist im Allgemeinen sicher, wenn Sie normale Vorsichtsmaßnahmen treffen. Moderne Steinwolle-Stecklinge enthalten keine schädlichen Fasern, die für die Lunge gefährlich sind.",
        icon: "✅"
      },
      sections: [
        {
          title: "Unterschied zur Dämm-Steinwolle",
          content: "Es ist wichtig, zwischen Anbau-Steinwolle und Dämm-Steinwolle zu unterscheiden:",
          points: [
            "Anbau-Steinwolle: Größere Fasern, sicherer zu verwenden",
            "Dämm-Steinwolle: Feinere Fasern, mehr Vorsicht erforderlich",
            "Verschiedene Produktionsprozesse und Anwendungen"
          ]
        },
        {
          title: "Sicherheit von Anbau-Steinwolle",
          content: "Gartenbau-Steinwolle hat spezifische Eigenschaften, die sie sicherer machen:",
          points: [
            "Größerer Faserdurchmesser (>5 μm)",
            "Nicht atembar (zu groß zum Einatmen)",
            "Keine WHO-Karzinogen-Klassifizierung",
            "Erfüllt EU-Sicherheitsstandards"
          ]
        },
        {
          title: "Empfohlene Vorsichtsmaßnahmen",
          items: [
            { icon: "🧤", text: "Tragen Sie Handschuhe bei intensivem Kontakt" },
            { icon: "👕", text: "Verwenden Sie langärmelige Arbeitskleidung" },
            { icon: "😷", text: "Staubmaske beim Schneiden/Bearbeiten (optional)" },
            { icon: "🚿", text: "Waschen Sie Hände nach Gebrauch" },
            { icon: "💨", text: "Arbeiten Sie in gut belüftetem Bereich" },
            { icon: "🧹", text: "Halten Sie Arbeitsbereich sauber" }
          ]
        },
        {
          title: "Wann Besonders Vorsichtig Sein?",
          situations: [
            "Beim Schneiden oder Bearbeiten von Steinwolle",
            "In staubigen Umgebungen",
            "Bei empfindlicher Haut oder Atemwegen",
            "Bei Verarbeitung großer Mengen"
          ]
        },
        {
          title: "Symptome Übermäßiger Exposition",
          symptoms: [
            "Leichte Hautreizung (vorübergehend)",
            "Juckreiz (verschwindet nach Waschen)",
            "Leichte Augenreizung (bei staubiger Arbeit)",
            "Halsreizung (bei extremer Staubigkeit)"
          ],
          note: "Diese Symptome sind mild und vorübergehend. Ernsthafte Gesundheitsprobleme sind bei normaler Verwendung sehr unwahrscheinlich."
        }
      ],
      conclusion: {
        title: "Fazit",
        text: "Gartenbau-Steinwolle ist sicher zu verwenden, wenn Sie grundlegende Vorsichtsmaßnahmen treffen. Die Fasern sind zu groß, um eingeatmet zu werden, und stellen kein Gesundheitsrisiko dar. Tragen Sie Schutzkleidung bei intensivem Kontakt und Sie sind sicher geschützt."
      },
      cta: { title: "Sichere und Professionelle Steinwolle-Stecklinge", button: "Produkte Ansehen" }
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
          <div className="bg-lumora-green/10 border-l-4 border-lumora-green rounded-r-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{c.answer.icon}</div>
              <h2 className="text-2xl font-bold text-lumora-dark">{c.answer.title}</h2>
            </div>
            <p className="text-lg text-gray-700">{c.answer.text}</p>
          </div>

          {c.sections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-soft">
              <h2 className="text-2xl font-bold text-lumora-dark mb-4">{section.title}</h2>
              {section.content && <p className="text-gray-700 mb-4">{section.content}</p>}
              {section.points && (
                <ul className="space-y-2">
                  {section.points.map((point, j) => (
                    <li key={j} className="flex items-start">
                      <span className="text-lumora-green mr-3">✓</span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.items && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-3 bg-lumora-cream/20 rounded-lg p-4">
                      <div className="text-3xl">{item.icon}</div>
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
              {section.situations && (
                <ul className="space-y-2">
                  {section.situations.map((sit, j) => (
                    <li key={j} className="flex items-start">
                      <span className="text-orange-500 mr-3">⚠️</span>
                      <span className="text-gray-700">{sit}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.symptoms && (
                <>
                  <ul className="space-y-2 mb-4">
                    {section.symptoms.map((sym, j) => (
                      <li key={j} className="flex items-start">
                        <span className="text-blue-500 mr-3">ℹ️</span>
                        <span className="text-gray-700">{sym}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <p className="text-sm text-gray-700"><strong>Note:</strong> {section.note}</p>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="bg-lumora-dark text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">{c.conclusion.title}</h2>
            <p className="text-lumora-cream/90 leading-relaxed">{c.conclusion.text}</p>
          </div>
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
