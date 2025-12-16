'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Props {
  t: any
  locale: string
}

export default function SteenwolVsRockwoolClient({ t, locale }: Props) {
  const content = {
    nl: {
      title: "Is Steenwol Hetzelfde als ROCKWOOL?",
      intro: "Een veelgestelde vraag in de professionele tuinbouw. Laten we het verschil uitleggen tussen het materiaal en het merk.",
      sections: [
        {
          title: "Het Korte Antwoord",
          content: "Nee, steenwol en ROCKWOOL zijn niet hetzelfde. Steenwol is een materiaal, terwijl ROCKWOOL een merknaam is.",
          icon: "💡"
        },
        {
          title: "Wat is Steenwol?",
          content: "Steenwol is een mineraal vezelmateriaal dat wordt gemaakt door basalt (vulkanisch gesteente) te smelten bij zeer hoge temperaturen (ongeveer 1.500°C) en vervolgens te spinnen tot vezels.",
          points: [
            "Natuurlijk mineraal materiaal",
            "Gemaakt van basalt gesteente",
            "Uitstekende water- en luchtretentie",
            "Veel gebruikt in de horticulture"
          ]
        },
        {
          title: "Wat is ROCKWOOL?",
          content: "ROCKWOOL is een Deens bedrijf en merknaam dat steenwol producten produceert. Het is de grootste fabrikant van steenwol isolatie en teeltproducten ter wereld.",
          points: [
            "Deens bedrijf opgericht in 1937",
            "Marktleider in steenwol producten",
            "Maakt zowel isolatie als teeltproducten",
            "Synoniem geworden met steenwol"
          ]
        },
        {
          title: "Vergelijkbaar met Kleenex",
          content: "Net zoals Kleenex een merknaam is voor papieren zakdoekjes, is ROCKWOOL een merknaam voor steenwol. Het merk is zo dominant dat mensen vaak 'ROCKWOOL' zeggen wanneer ze steenwol bedoelen.",
          icon: "📦"
        },
        {
          title: "Andere Steenwol Fabrikanten",
          content: "Hoewel ROCKWOOL de bekendste is, zijn er meer fabrikanten van steenwol producten:",
          brands: [
            "Grodan (teeltmatten en pluggen)",
            "Cultilene (steenwol substraten)",
            "Paroc (isolatie en teelt)",
            "Knauf Insulation"
          ]
        },
        {
          title: "Voor de Horticulture",
          content: "In de professionele tuinbouw wordt steenwol vooral gebruikt als teeltsubstraat. Het biedt uitstekende eigenschappen voor hydrocultuur en wordt veel ingezet bij:",
          applications: [
            "Groenteteelt in kassen",
            "Propagatie en stekken",
            "Verticale teeltsystemen",
            "Hydrocultuur installaties"
          ]
        }
      ],
      cta: {
        title: "Ontdek Onze Steenwol Pluggen",
        description: "Bij Lumora bieden we professionele steenwol pluggen met FP 12+ technologie voor optimale teeltresultaten.",
        button: "Bekijk Steenwol Pluggen"
      }
    },
    en: {
      title: "Is Rockwool the Same as Stone Wool?",
      intro: "A frequently asked question in professional horticulture. Let's explain the difference between the material and the brand.",
      sections: [
        {
          title: "The Short Answer",
          content: "No, stone wool and ROCKWOOL are not the same. Stone wool is a material, while ROCKWOOL is a brand name.",
          icon: "💡"
        },
        {
          title: "What is Stone Wool?",
          content: "Stone wool is a mineral fiber material made by melting basalt (volcanic rock) at very high temperatures (about 1,500°C) and then spinning it into fibers.",
          points: [
            "Natural mineral material",
            "Made from basalt rock",
            "Excellent water and air retention",
            "Widely used in horticulture"
          ]
        },
        {
          title: "What is ROCKWOOL?",
          content: "ROCKWOOL is a Danish company and brand name that produces stone wool products. It is the world's largest manufacturer of stone wool insulation and growing products.",
          points: [
            "Danish company founded in 1937",
            "Market leader in stone wool products",
            "Makes both insulation and growing products",
            "Has become synonymous with stone wool"
          ]
        },
        {
          title: "Similar to Kleenex",
          content: "Just as Kleenex is a brand name for tissues, ROCKWOOL is a brand name for stone wool. The brand is so dominant that people often say 'ROCKWOOL' when they mean stone wool.",
          icon: "📦"
        },
        {
          title: "Other Stone Wool Manufacturers",
          content: "Although ROCKWOOL is the most well-known, there are more manufacturers of stone wool products:",
          brands: [
            "Grodan (growing slabs and plugs)",
            "Cultilene (stone wool substrates)",
            "Paroc (insulation and growing)",
            "Knauf Insulation"
          ]
        },
        {
          title: "For Horticulture",
          content: "In professional horticulture, stone wool is mainly used as a growing substrate. It offers excellent properties for hydroponics and is widely used in:",
          applications: [
            "Vegetable cultivation in greenhouses",
            "Propagation and cuttings",
            "Vertical growing systems",
            "Hydroponic installations"
          ]
        }
      ],
      cta: {
        title: "Discover Our Stone Wool Plugs",
        description: "At Lumora we offer professional stone wool plugs with FP 12+ technology for optimal growing results.",
        button: "View Stone Wool Plugs"
      }
    },
    de: {
      title: "Ist Steinwolle das Gleiche wie ROCKWOOL?",
      intro: "Eine häufig gestellte Frage im professionellen Gartenbau. Lassen Sie uns den Unterschied zwischen dem Material und der Marke erklären.",
      sections: [
        {
          title: "Die Kurze Antwort",
          content: "Nein, Steinwolle und ROCKWOOL sind nicht dasselbe. Steinwolle ist ein Material, während ROCKWOOL ein Markenname ist.",
          icon: "💡"
        },
        {
          title: "Was ist Steinwolle?",
          content: "Steinwolle ist ein mineralisches Fasermaterial, das durch Schmelzen von Basalt (Vulkangestein) bei sehr hohen Temperaturen (ca. 1.500°C) und anschließendes Spinnen zu Fasern hergestellt wird.",
          points: [
            "Natürliches Mineralmaterial",
            "Hergestellt aus Basaltgestein",
            "Hervorragende Wasser- und Luftspeicherung",
            "Weit verbreitet im Gartenbau"
          ]
        },
        {
          title: "Was ist ROCKWOOL?",
          content: "ROCKWOOL ist ein dänisches Unternehmen und Markenname, der Steinwollprodukte herstellt. Es ist der weltweit größte Hersteller von Steinwolle-Dämm- und Anbauprodukten.",
          points: [
            "Dänisches Unternehmen gegründet 1937",
            "Marktführer bei Steinwollprodukten",
            "Stellt sowohl Dämmung als auch Anbauprodukte her",
            "Ist zum Synonym für Steinwolle geworden"
          ]
        },
        {
          title: "Ähnlich wie Tempo",
          content: "So wie Tempo ein Markenname für Papiertaschentücher ist, ist ROCKWOOL ein Markenname für Steinwolle. Die Marke ist so dominant, dass Menschen oft 'ROCKWOOL' sagen, wenn sie Steinwolle meinen.",
          icon: "📦"
        },
        {
          title: "Andere Steinwollhersteller",
          content: "Obwohl ROCKWOOL am bekanntesten ist, gibt es weitere Hersteller von Steinwollprodukten:",
          brands: [
            "Grodan (Anbauplatten und Stecker)",
            "Cultilene (Steinwollsubstrate)",
            "Paroc (Dämmung und Anbau)",
            "Knauf Insulation"
          ]
        },
        {
          title: "Für den Gartenbau",
          content: "Im professionellen Gartenbau wird Steinwolle hauptsächlich als Anbausubstrat verwendet. Es bietet hervorragende Eigenschaften für Hydrokultur und wird häufig eingesetzt bei:",
          applications: [
            "Gemüseanbau in Gewächshäusern",
            "Vermehrung und Stecklinge",
            "Vertikale Anbausysteme",
            "Hydrokultur-Anlagen"
          ]
        }
      ],
      cta: {
        title: "Entdecken Sie Unsere Steinwolle-Stecklinge",
        description: "Bei Lumora bieten wir professionelle Steinwolle-Stecklinge mit FP 12+ Technologie für optimale Anbau-Ergebnisse.",
        button: "Steinwolle-Stecklinge Ansehen"
      }
    }
  }

  const currentContent = content[locale as keyof typeof content] || content.nl

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lumora-cream via-white to-lumora-cream/50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-lumora-dark mb-6">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {currentContent.intro}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {currentContent.sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-soft">
              {section.icon && (
                <div className="text-5xl mb-4">{section.icon}</div>
              )}
              <h2 className="text-2xl lg:text-3xl font-bold text-lumora-dark mb-4">
                {section.title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {section.content}
              </p>

              {section.points && (
                <ul className="space-y-3">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-lumora-green mr-3 mt-1">✓</span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.brands && (
                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  {section.brands.map((brand, idx) => (
                    <div key={idx} className="bg-lumora-cream/30 rounded-lg p-4">
                      <span className="text-lumora-dark font-medium">{brand}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.applications && (
                <ul className="space-y-3 mt-6">
                  {section.applications.map((app, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-lumora-green mr-3">→</span>
                      <span className="text-gray-700">{app}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Product Image */}
      <section className="py-16 bg-gradient-to-r from-lumora-cream/50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.webp"
              alt="Steenwol Pluggen"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-lumora-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            {currentContent.cta.title}
          </h2>
          <p className="text-xl text-lumora-cream/90 mb-10">
            {currentContent.cta.description}
          </p>
          <Link
            href={`/${locale}/steenwol-pluggen`}
            className="inline-flex items-center justify-center bg-lumora-green text-black hover:bg-lumora-green/90 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
          >
            {currentContent.cta.button}
          </Link>
        </div>
      </section>
    </div>
  )
}
