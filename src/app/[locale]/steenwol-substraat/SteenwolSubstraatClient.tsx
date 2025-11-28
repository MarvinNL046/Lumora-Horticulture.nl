'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface SteenwolSubstraatClientProps {
  t: any
  locale: string
}

export default function SteenwolSubstraatClient({ t, locale }: SteenwolSubstraatClientProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const content = {
    nl: {
      title: "Steenwol Substraat",
      subtitle: "Het Ideale Kweekmedium voor Professionele Teelt",
      hero: {
        title: "Steenwol Substraat: De Basis voor Succesvolle Plantenkweek",
        description: "Steenwol substraat is het meest gebruikte kweekmedium in de professionele tuinbouw. Ontdek waarom kwekers wereldwijd kiezen voor steenwol als substraat voor hydrocultuur en glastuinbouw.",
        cta: "Bekijk Producten"
      },
      intro: {
        title: "Wat is Steenwol Substraat?",
        paragraphs: [
          "Steenwol substraat, ook bekend als rockwool of minerale wol, is een kunstmatig kweekmedium gemaakt van gesmolten basaltgesteente. Door het gesteente te smelten bij extreme temperaturen en te spinnen tot fijne vezels, ontstaat een luchtig en watervasthoudend materiaal dat ideaal is voor plantenkweek.",
          "Als substraat biedt steenwol een perfecte balans tussen water- en luchthuishouding. De vezelige structuur zorgt voor uitstekende drainage terwijl voldoende vocht wordt vastgehouden voor optimale wortelgroei.",
          "In de glastuinbouw en hydrocultuur is steenwol substraat onmisbaar geworden. Van zaailing tot oogst - steenwol ondersteunt elke groeifase met consistente kwaliteit en betrouwbare resultaten."
        ]
      },
      benefits: {
        title: "Voordelen van Steenwol als Substraat",
        items: [
          {
            icon: "💧",
            title: "Perfecte Waterhuishouding",
            description: "Steenwol substraat houdt tot 80% water vast terwijl 20% lucht beschikbaar blijft voor de wortels. Deze ideale verhouding voorkomt zowel uitdroging als wortelrot."
          },
          {
            icon: "🌱",
            title: "Steriele Groeiomgeving",
            description: "Steenwol is van nature steriel en vrij van onkruidzaden, schimmels en bacterien. Dit vermindert ziektedruk en de noodzaak voor chemische bestrijding."
          },
          {
            icon: "📊",
            title: "Voorspelbare Resultaten",
            description: "Door de uniforme structuur gedraagt elk steenwol substraat blok zich identiek. Dit maakt nauwkeurige dosering van water en voeding mogelijk."
          },
          {
            icon: "🔄",
            title: "pH-Neutraal & Inert",
            description: "Steenwol is chemisch inert en beinvloedt de voedingsoplossing niet. Na bufferen blijft de pH stabiel voor optimale nutrientenopname."
          },
          {
            icon: "♻️",
            title: "Duurzaam & Recyclebaar",
            description: "Gebruikt steenwol substraat kan worden gerecycled tot isolatiemateriaal of bodemverbeteraar. Een circulaire oplossing voor moderne teelt."
          },
          {
            icon: "⚡",
            title: "Snelle Wortelontwikkeling",
            description: "De open structuur van steenwol stimuleert snelle en gezonde wortelgroei, wat leidt tot krachtigere planten en hogere opbrengsten."
          }
        ]
      },
      types: {
        title: "Soorten Steenwol Substraat",
        items: [
          {
            name: "Steenwol Pluggen",
            description: "Kleine cilinders voor zaailingen en stekken. Ideaal voor de vermeerderingsfase voordat planten worden overgezet naar grotere blokken.",
            link: "/steenwol-pluggen"
          },
          {
            name: "Steenwol Blokken",
            description: "Grotere blokken voor de groei- en productfase. Verkrijgbaar in verschillende formaten afhankelijk van het gewas en teeltsysteem.",
            link: "/shop"
          },
          {
            name: "Steenwol Matten",
            description: "Lange matten voor rij-teelt van tomaten, komkommers en paprika's. Meerdere planten per mat voor efficiente ruimtebenutting.",
            link: "/contact"
          }
        ]
      },
      applications: {
        title: "Toepassingen van Steenwol Substraat",
        items: [
          "Glastuinbouw (tomaten, komkommers, paprika's)",
          "Sierteelt en potplanten",
          "Hydrocultuur systemen",
          "Verticale teelt installaties",
          "Zaailingen en stekken vermeerdering",
          "Cannabis kweek (waar legaal)"
        ]
      },
      comparison: {
        title: "Steenwol vs. Andere Substraten",
        headers: ["Eigenschap", "Steenwol", "Kokos", "Perliet"],
        rows: [
          ["Watervasthoudend", "Uitstekend", "Goed", "Matig"],
          ["Luchtcirculatie", "Uitstekend", "Goed", "Uitstekend"],
          ["pH-stabiliteit", "Uitstekend", "Matig", "Goed"],
          ["Herbruikbaarheid", "Beperkt", "Beperkt", "Goed"],
          ["Prijs", "Gemiddeld", "Laag", "Gemiddeld"],
          ["Uniformiteit", "Hoog", "Variabel", "Hoog"]
        ]
      },
      faq: {
        title: "Veelgestelde Vragen over Steenwol Substraat",
        items: [
          {
            q: "Moet steenwol substraat worden voorbehandeld?",
            a: "Ja, nieuw steenwol substraat moet worden gebufferd door het 24 uur te weken in een voedingsoplossing met pH 5.5. Dit neutraliseert de natuurlijk hoge pH van steenwol."
          },
          {
            q: "Hoe lang gaat steenwol substraat mee?",
            a: "In de professionele teelt wordt steenwol meestal 1 teeltseizoen gebruikt. De structuur blijft stabiel, maar hygieneoverwegingen maken vervanging wenselijk."
          },
          {
            q: "Is steenwol substraat milieuvriendelijk?",
            a: "Steenwol is recyclebaar en wordt gemaakt van natuurlijk gesteente. Veel leveranciers bieden inzameling en recycling aan voor gebruikte steenwol."
          },
          {
            q: "Kan ik steenwol combineren met andere substraten?",
            a: "Ja, steenwol pluggen worden vaak gebruikt in combinatie met kokos of potgrond. De plug beschermt de jonge wortel tijdens het verpotten."
          }
        ]
      },
      cta: {
        title: "Start met Steenwol Substraat",
        description: "Ontdek ons assortiment steenwol pluggen en trays met FP 12+ technologie. Professionele kwaliteit voor de beste kweekresultaten.",
        button: "Bekijk Webshop",
        contact: "Vraag Advies"
      }
    },
    en: {
      title: "Rockwool Substrate",
      subtitle: "The Ideal Growing Medium for Professional Cultivation",
      hero: {
        title: "Rockwool Substrate: The Foundation for Successful Plant Growing",
        description: "Rockwool substrate is the most widely used growing medium in professional horticulture. Discover why growers worldwide choose rockwool as substrate for hydroponics and greenhouse cultivation.",
        cta: "View Products"
      },
      intro: {
        title: "What is Rockwool Substrate?",
        paragraphs: [
          "Rockwool substrate, also known as stone wool or mineral wool, is an artificial growing medium made from molten basalt rock. By melting the rock at extreme temperatures and spinning it into fine fibers, a light and water-retaining material is created that is ideal for plant cultivation.",
          "As a substrate, rockwool offers a perfect balance between water and air management. The fibrous structure provides excellent drainage while retaining sufficient moisture for optimal root growth.",
          "In greenhouse cultivation and hydroponics, rockwool substrate has become indispensable. From seedling to harvest - rockwool supports every growth phase with consistent quality and reliable results."
        ]
      },
      benefits: {
        title: "Benefits of Rockwool as Substrate",
        items: [
          {
            icon: "💧",
            title: "Perfect Water Management",
            description: "Rockwool substrate retains up to 80% water while 20% air remains available for roots. This ideal ratio prevents both dehydration and root rot."
          },
          {
            icon: "🌱",
            title: "Sterile Growing Environment",
            description: "Rockwool is naturally sterile and free from weed seeds, fungi and bacteria. This reduces disease pressure and the need for chemical control."
          },
          {
            icon: "📊",
            title: "Predictable Results",
            description: "Due to the uniform structure, each rockwool substrate block behaves identically. This enables precise dosing of water and nutrients."
          },
          {
            icon: "🔄",
            title: "pH-Neutral & Inert",
            description: "Rockwool is chemically inert and does not affect the nutrient solution. After buffering, the pH remains stable for optimal nutrient uptake."
          },
          {
            icon: "♻️",
            title: "Sustainable & Recyclable",
            description: "Used rockwool substrate can be recycled into insulation material or soil improver. A circular solution for modern cultivation."
          },
          {
            icon: "⚡",
            title: "Fast Root Development",
            description: "The open structure of rockwool stimulates fast and healthy root growth, leading to stronger plants and higher yields."
          }
        ]
      },
      types: {
        title: "Types of Rockwool Substrate",
        items: [
          {
            name: "Rockwool Plugs",
            description: "Small cylinders for seedlings and cuttings. Ideal for the propagation phase before plants are transferred to larger blocks.",
            link: "/rockwool-plugs"
          },
          {
            name: "Rockwool Blocks",
            description: "Larger blocks for the growth and production phase. Available in various sizes depending on the crop and growing system.",
            link: "/shop"
          },
          {
            name: "Rockwool Slabs",
            description: "Long slabs for row cultivation of tomatoes, cucumbers and peppers. Multiple plants per slab for efficient space utilization.",
            link: "/contact"
          }
        ]
      },
      applications: {
        title: "Applications of Rockwool Substrate",
        items: [
          "Greenhouse horticulture (tomatoes, cucumbers, peppers)",
          "Ornamental cultivation and potted plants",
          "Hydroponic systems",
          "Vertical farming installations",
          "Seedling and cutting propagation",
          "Cannabis cultivation (where legal)"
        ]
      },
      comparison: {
        title: "Rockwool vs. Other Substrates",
        headers: ["Property", "Rockwool", "Coco", "Perlite"],
        rows: [
          ["Water retention", "Excellent", "Good", "Moderate"],
          ["Air circulation", "Excellent", "Good", "Excellent"],
          ["pH stability", "Excellent", "Moderate", "Good"],
          ["Reusability", "Limited", "Limited", "Good"],
          ["Price", "Medium", "Low", "Medium"],
          ["Uniformity", "High", "Variable", "High"]
        ]
      },
      faq: {
        title: "Frequently Asked Questions about Rockwool Substrate",
        items: [
          {
            q: "Does rockwool substrate need to be pre-treated?",
            a: "Yes, new rockwool substrate should be buffered by soaking it for 24 hours in a nutrient solution with pH 5.5. This neutralizes the naturally high pH of rockwool."
          },
          {
            q: "How long does rockwool substrate last?",
            a: "In professional cultivation, rockwool is usually used for 1 growing season. The structure remains stable, but hygiene considerations make replacement desirable."
          },
          {
            q: "Is rockwool substrate environmentally friendly?",
            a: "Rockwool is recyclable and made from natural rock. Many suppliers offer collection and recycling for used rockwool."
          },
          {
            q: "Can I combine rockwool with other substrates?",
            a: "Yes, rockwool plugs are often used in combination with coco or potting soil. The plug protects the young root during transplanting."
          }
        ]
      },
      cta: {
        title: "Get Started with Rockwool Substrate",
        description: "Discover our range of rockwool plugs and trays with FP 12+ technology. Professional quality for the best growing results.",
        button: "View Webshop",
        contact: "Request Advice"
      }
    },
    de: {
      title: "Steinwolle Substrat",
      subtitle: "Das Ideale Kulturmedium fur Professionellen Anbau",
      hero: {
        title: "Steinwolle Substrat: Die Basis fur Erfolgreichen Pflanzenanbau",
        description: "Steinwolle Substrat ist das meistverwendete Kulturmedium im professionellen Gartenbau. Entdecken Sie, warum Zuchter weltweit Steinwolle als Substrat fur Hydrokultur und Gewachshausanbau wahlen.",
        cta: "Produkte Ansehen"
      },
      intro: {
        title: "Was ist Steinwolle Substrat?",
        paragraphs: [
          "Steinwolle Substrat, auch bekannt als Rockwool oder Mineralwolle, ist ein kunstliches Kulturmedium aus geschmolzenem Basaltgestein. Durch Schmelzen des Gesteins bei extremen Temperaturen und Spinnen zu feinen Fasern entsteht ein leichtes und wasserspeicherndes Material, das ideal fur den Pflanzenanbau ist.",
          "Als Substrat bietet Steinwolle eine perfekte Balance zwischen Wasser- und Lufthaushalt. Die faserige Struktur sorgt fur ausgezeichnete Drainage bei gleichzeitiger Speicherung ausreichender Feuchtigkeit fur optimales Wurzelwachstum.",
          "Im Gewachshausanbau und in der Hydrokultur ist Steinwolle Substrat unverzichtbar geworden. Vom Samling bis zur Ernte - Steinwolle unterstutzt jede Wachstumsphase mit konstanter Qualitat und zuverlassigen Ergebnissen."
        ]
      },
      benefits: {
        title: "Vorteile von Steinwolle als Substrat",
        items: [
          {
            icon: "💧",
            title: "Perfekter Wasserhaushalt",
            description: "Steinwolle Substrat speichert bis zu 80% Wasser, wahrend 20% Luft fur die Wurzeln verfugbar bleibt. Dieses ideale Verhaltnis verhindert sowohl Austrocknung als auch Wurzelfaule."
          },
          {
            icon: "🌱",
            title: "Sterile Wachstumsumgebung",
            description: "Steinwolle ist von Natur aus steril und frei von Unkrautsamen, Pilzen und Bakterien. Dies reduziert den Krankheitsdruck und den Bedarf an chemischer Bekampfung."
          },
          {
            icon: "📊",
            title: "Vorhersagbare Ergebnisse",
            description: "Durch die einheitliche Struktur verhalt sich jeder Steinwolle-Substratblock identisch. Dies ermoglicht eine prazise Dosierung von Wasser und Nahrstoffen."
          },
          {
            icon: "🔄",
            title: "pH-Neutral & Inert",
            description: "Steinwolle ist chemisch inert und beeinflusst die Nahrlosung nicht. Nach dem Puffern bleibt der pH-Wert stabil fur optimale Nahrstoffaufnahme."
          },
          {
            icon: "♻️",
            title: "Nachhaltig & Recycelbar",
            description: "Gebrauchtes Steinwolle Substrat kann zu Isoliermaterial oder Bodenverbesserer recycelt werden. Eine zirkulare Losung fur modernen Anbau."
          },
          {
            icon: "⚡",
            title: "Schnelle Wurzelentwicklung",
            description: "Die offene Struktur der Steinwolle stimuliert schnelles und gesundes Wurzelwachstum, was zu kraftigeren Pflanzen und hoheren Ertragen fuhrt."
          }
        ]
      },
      types: {
        title: "Arten von Steinwolle Substrat",
        items: [
          {
            name: "Steinwolle Plugs",
            description: "Kleine Zylinder fur Samlinge und Stecklinge. Ideal fur die Vermehrungsphase, bevor Pflanzen in grossere Blocke umgesetzt werden.",
            link: "/steinwolle-stecklinge"
          },
          {
            name: "Steinwolle Blocke",
            description: "Grossere Blocke fur die Wachstums- und Produktionsphase. Erhaltlich in verschiedenen Grossen je nach Kultur und Anbausystem.",
            link: "/shop"
          },
          {
            name: "Steinwolle Matten",
            description: "Lange Matten fur Reihenanbau von Tomaten, Gurken und Paprika. Mehrere Pflanzen pro Matte fur effiziente Raumnutzung.",
            link: "/contact"
          }
        ]
      },
      applications: {
        title: "Anwendungen von Steinwolle Substrat",
        items: [
          "Gewachshausgartenbau (Tomaten, Gurken, Paprika)",
          "Zierpflanzenanbau und Topfpflanzen",
          "Hydrokultur-Systeme",
          "Vertikale Anbauanlagen",
          "Samlings- und Stecklingsvermehrung",
          "Cannabis-Anbau (wo legal)"
        ]
      },
      comparison: {
        title: "Steinwolle vs. Andere Substrate",
        headers: ["Eigenschaft", "Steinwolle", "Kokos", "Perlit"],
        rows: [
          ["Wasserspeicherung", "Ausgezeichnet", "Gut", "Massig"],
          ["Luftzirkulation", "Ausgezeichnet", "Gut", "Ausgezeichnet"],
          ["pH-Stabilitat", "Ausgezeichnet", "Massig", "Gut"],
          ["Wiederverwendbarkeit", "Begrenzt", "Begrenzt", "Gut"],
          ["Preis", "Mittel", "Niedrig", "Mittel"],
          ["Gleichmassigkeit", "Hoch", "Variabel", "Hoch"]
        ]
      },
      faq: {
        title: "Haufig Gestellte Fragen zu Steinwolle Substrat",
        items: [
          {
            q: "Muss Steinwolle Substrat vorbehandelt werden?",
            a: "Ja, neues Steinwolle Substrat sollte gepuffert werden, indem es 24 Stunden in einer Nahrlosung mit pH 5,5 eingeweicht wird. Dies neutralisiert den naturlich hohen pH-Wert der Steinwolle."
          },
          {
            q: "Wie lange halt Steinwolle Substrat?",
            a: "Im professionellen Anbau wird Steinwolle meist fur 1 Anbausaison verwendet. Die Struktur bleibt stabil, aber aus Hygienegründen ist ein Austausch wünschenswert."
          },
          {
            q: "Ist Steinwolle Substrat umweltfreundlich?",
            a: "Steinwolle ist recycelbar und wird aus natürlichem Gestein hergestellt. Viele Lieferanten bieten Sammlung und Recycling für gebrauchte Steinwolle an."
          },
          {
            q: "Kann ich Steinwolle mit anderen Substraten kombinieren?",
            a: "Ja, Steinwolle-Plugs werden oft in Kombination mit Kokos oder Blumenerde verwendet. Der Plug schützt die junge Wurzel beim Umtopfen."
          }
        ]
      },
      cta: {
        title: "Starten Sie mit Steinwolle Substrat",
        description: "Entdecken Sie unser Sortiment an Steinwolle-Plugs und Trays mit FP 12+ Technologie. Professionelle Qualität für die besten Anbauergebnisse.",
        button: "Webshop Ansehen",
        contact: "Beratung Anfordern"
      }
    }
  }

  const currentContent = content[locale as keyof typeof content] || content.nl
  const localizedShopPath = locale === 'nl' ? '/winkel' : '/shop'
  const localizedContactPath = `/${locale}/contact`

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-lumora-cream via-white to-lumora-cream/50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block bg-lumora-green/10 px-4 py-2 rounded-full">
                <span className="text-lumora-green font-semibold">🌱 {currentContent.subtitle}</span>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-lumora-dark leading-tight">
                {currentContent.hero.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {currentContent.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}${localizedShopPath}`}
                  className="inline-flex items-center justify-center bg-lumora-green text-black hover:bg-lumora-green/90 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                >
                  {currentContent.hero.cta}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg"
                  alt="Steenwol Substraat"
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

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark mb-8 text-center">
            {currentContent.intro.title}
          </h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            {currentContent.intro.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-lumora-cream/30">
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
                className="bg-white border border-lumora-gold/20 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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

      {/* Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark mb-12 text-center">
            {currentContent.types.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.types.items.map((type, index) => (
              <div key={index} className="bg-lumora-cream/30 rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                <h3 className="text-2xl font-semibold text-lumora-dark mb-4">{type.name}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <Link
                  href={`/${locale}${type.link}`}
                  className="text-lumora-green font-semibold hover:underline"
                >
                  {locale === 'nl' ? 'Meer info →' : locale === 'de' ? 'Mehr Info →' : 'More info →'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-lumora-cream/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark mb-12 text-center">
            {currentContent.comparison.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-lumora-dark text-white">
                <tr>
                  {currentContent.comparison.headers.map((header, index) => (
                    <th key={index} className="px-6 py-4 text-left font-semibold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentContent.comparison.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-lumora-cream/20' : 'bg-white'}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className={`px-6 py-4 ${cellIndex === 0 ? 'font-semibold text-lumora-dark' : 'text-gray-600'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark mb-8 text-center">
            {currentContent.applications.title}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {currentContent.applications.items.map((app, index) => (
              <div key={index} className="bg-lumora-cream/30 rounded-lg p-4 flex items-center">
                <span className="text-lumora-green mr-3 text-xl">✓</span>
                <span className="text-gray-700">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-lumora-cream/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-lumora-dark mb-12 text-center">
            {currentContent.faq.title}
          </h2>
          <div className="space-y-6">
            {currentContent.faq.items.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-lumora-dark mb-3">{item.q}</h3>
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
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
            <Link
              href={`/${locale}${localizedShopPath}`}
              className="inline-flex items-center justify-center bg-lumora-green text-black hover:bg-lumora-green/90 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
            >
              🛒 {currentContent.cta.button}
            </Link>
            <Link
              href={localizedContactPath}
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
            "@type": "Article",
            "headline": currentContent.hero.title,
            "description": currentContent.hero.description,
            "author": {
              "@type": "Organization",
              "name": "Lumora Horticulture"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Lumora Horticulture",
              "logo": {
                "@type": "ImageObject",
                "url": "https://lumorahorticulture.nl/logo/lumura-horticulture-logo.jpeg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": currentContent.faq.items.map(item => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
              }
            }))
          })
        }}
      />
    </div>
  )
}
