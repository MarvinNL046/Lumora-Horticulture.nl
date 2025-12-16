'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { localizePathForLocale } from '@/lib/url-localizations'

interface Props {
  locale: string
}

export default function NeemxProClient({ locale }: Props) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const content = {
    nl: {
      badge: 'NIEUW',
      title: 'NEEMX PRO',
      subtitle: '100% Natuurlijk Botanisch Olieconcentraat',
      tagline: 'Premium bladverzorging voor professionele telers',
      intro: 'NEEMX PRO is een hoogwaardig, 100% natuurlijk botanisch olieconcentraat voor professionele bladverzorging. Het ondersteunt gezonde planten en helpt bij het voorkomen en verminderen van insectendruk, zoals spint en andere zuigende insecten, door een beschermende oliefilm op het blad.',

      heroFeatures: [
        '100% Natuurlijk',
        'Zeer Geconcentreerd',
        'Professionele Kwaliteit',
        'Preventief & Curatief'
      ],

      whatIs: {
        title: 'Wat is NEEMX PRO?',
        description: 'NEEMX PRO is een premium plantaardig olieconcentraat, ontwikkeld voor professioneel gebruik in de (glas)tuinbouw en teeltomgevingen. Het product is gebaseerd op een zorgvuldig samengestelde botanische olieblend en natuurlijke extracten, gecombineerd met een milde emulgator voor een optimale menging met water.',
        benefits: [
          'Ondersteunt de natuurlijke bladweerbaarheid',
          'Vermindert stress op het gewas',
          'Helpt de leefomgeving van ongewenste insecten te verstoren',
          'Draagt bij aan een schoon en vitaal bladoppervlak'
        ]
      },

      features: {
        title: 'Wat doet NEEMX PRO?',
        items: [
          { icon: '🌿', title: 'Gezonde Bladeren', description: 'Ondersteunt gezonde en sterke bladeren' },
          { icon: '🛡️', title: 'Preventief & Curatief', description: 'Helpt bij preventieve en curatieve gewasverzorging' },
          { icon: '💧', title: 'Beschermende Film', description: 'Vormt een beschermende oliefilm op het blad' },
          { icon: '🌱', title: 'Geschikt voor Stekken', description: 'Geschikt voor jonge planten en stekken bij juiste dosering' },
          { icon: '⚡', title: 'Zeer Geconcentreerd', description: 'Lage dosering nodig - een beetje gaat een lange weg' },
          { icon: '💦', title: 'Mengbaar', description: 'Makkelijk mengbaar met water dankzij milde emulgator' }
        ]
      },

      dosage: {
        title: 'Dosering & Gebruik',
        subtitle: 'Mengverhouding per liter water',
        levels: [
          { amount: '2,5 ml/L', use: 'Preventief (wekelijks)', description: 'Wekelijks tot einde teelt voor preventieve bescherming' },
          { amount: '5 ml/L', use: 'Normaal gebruik', description: 'Voor standaard bladverzorging en onderhoud' },
          { amount: '7 ml/L', use: 'Intensieve verzorging', description: 'Bij verhoogde zorg of lichte insectendruk' },
          { amount: '10 ml/L', use: 'Professioneel / Zwaar', description: 'Bij zware insectendruk of professioneel gebruik' }
        ],
        yield: {
          title: 'Opbrengst per flesje',
          items: [
            { size: '10 ml', yield: '1-4 liter spuitvloeistof' },
            { size: '15 ml', yield: '1,5-6 liter spuitvloeistof' },
            { size: '30 ml', yield: '3-12 liter spuitvloeistof' }
          ]
        }
      },

      comparison: {
        title: 'Waarom NEEMX PRO?',
        subtitle: 'NEEMX PRO vs. standaard neemproducten',
        ourProduct: 'NEEMX PRO',
        standard: 'Standaard Neem',
        items: [
          { feature: 'Concentratie', ours: 'Hooggeconcentreerd (4x sterker)', theirs: 'Vaak verdund' },
          { feature: 'Dosering', ours: '2,5-10 ml per liter', theirs: '10-20 ml per liter' },
          { feature: 'Kwaliteit', ours: 'Premium botanische blend', theirs: 'Variabel' },
          { feature: 'Samenstelling', ours: '100% natuurlijk', theirs: 'Soms synthetische toevoegingen' },
          { feature: 'Prijs per behandeling', ours: 'Voordeliger door concentratie', theirs: 'Duurder per behandeling' }
        ],
        note: 'NEEMX PRO is 4× zo sterk als standaard producten. Waar standaard producten 10 ml nodig hebben voor 1 liter water, maakt NEEMX PRO tot 4 liter spuitoplossing per 10 ml bij preventief gebruik.'
      },

      targets: {
        title: 'Effectief tegen',
        items: [
          { name: 'Spint', icon: '🕷️' },
          { name: 'Zuigende insecten', icon: '🦟' },
          { name: 'Bladluis', icon: '🐛' },
          { name: 'Trips', icon: '🦗' },
          { name: 'Witte vlieg', icon: '🪰' },
          { name: 'Meeldauw', icon: '🍄' }
        ]
      },

      forWho: {
        title: 'Voor wie is NEEMX PRO?',
        items: [
          { icon: '🏭', title: 'Glastuinbouw', description: 'Professionele kassen en teeltbedrijven' },
          { icon: '🌸', title: 'Sierteelt', description: 'Bloemen en sierplanten kwekers' },
          { icon: '🌿', title: 'Kruidenteelt', description: 'Biologische en conventionele kruidentelers' },
          { icon: '🌱', title: 'Opkweek & Stekken', description: 'Vermeerderingsbedrijven en stekproductie' },
          { icon: '👨‍🌾', title: 'Professionele Kwekers', description: 'Telers die kiezen voor natuurlijke oplossingen' },
          { icon: '🏡', title: 'Thuisgebruik', description: 'Particulieren met intensieve plantenverzorging' }
        ]
      },

      products: {
        title: 'Kies jouw formaat',
        items: [
          { size: '10 ml', price: '24,95', description: 'Premium instap / Bestseller', yield: '1-4 liter', badge: 'Populair' },
          { size: '15 ml', price: '29,95', description: 'Beste waarde voor particulier', yield: '1,5-6 liter', badge: 'Beste waarde' },
          { size: '30 ml', price: '44,95', description: 'Voor serieuze gebruikers', yield: '3-12 liter', badge: 'Professioneel' }
        ]
      },

      faq: {
        title: 'Veelgestelde vragen',
        items: [
          {
            q: 'Is NEEMX PRO biologisch?',
            a: 'NEEMX PRO is een 100% natuurlijk product gebaseerd op botanische oliën en extracten. Het bevat geen synthetische toevoegingen. Controleer altijd de specifieke eisen van uw certificering voor gebruik in biologische teelt.'
          },
          {
            q: 'Is NEEMX PRO veilig voor mijn planten?',
            a: 'Ja, bij juiste dosering is NEEMX PRO zacht voor de plant terwijl het effectief werkt tegen ongewenste insecten. Begin altijd met de laagste dosering en test op een klein deel van de plant.'
          },
          {
            q: 'Hoe vaak moet ik NEEMX PRO toepassen?',
            a: 'Voor preventief gebruik adviseren we wekelijkse toepassing. Bij actieve insectendruk kan dit verhoogd worden naar 2-3 keer per week. Spray bij voorkeur in de ochtend of avond, niet in direct zonlicht.'
          },
          {
            q: 'Kan ik NEEMX PRO mengen met andere producten?',
            a: 'NEEMX PRO is goed mengbaar met water dankzij de milde emulgator. Voor combinatie met andere gewasbeschermingsmiddelen adviseren we eerst een kleine test te doen.'
          },
          {
            q: 'Waarom is NEEMX PRO duurder dan andere neemproducten?',
            a: 'NEEMX PRO is een hooggeconcentreerd product - 4x sterker dan standaard neemproducten. Hierdoor heeft u per behandeling minder nodig, waardoor de prijs per behandeling juist voordeliger uitvalt.'
          }
        ]
      },

      cta: {
        title: 'Ontdek de kracht van NEEMX PRO',
        description: 'Bestel vandaag nog en ervaar het verschil van professionele, natuurlijke gewasbescherming.',
        button: 'Bekijk in Webshop',
        contact: 'Vragen? Neem contact op'
      }
    },
    en: {
      badge: 'NEW',
      title: 'NEEMX PRO',
      subtitle: '100% Natural Botanical Oil Concentrate',
      tagline: 'Premium leaf care for professional growers',
      intro: 'NEEMX PRO is a high-quality, 100% natural botanical oil concentrate for professional leaf care. It supports healthy plants and helps prevent and reduce insect pressure, such as spider mites and other sucking insects, by forming a protective oil film on the leaf.',

      heroFeatures: [
        '100% Natural',
        'Highly Concentrated',
        'Professional Quality',
        'Preventive & Curative'
      ],

      whatIs: {
        title: 'What is NEEMX PRO?',
        description: 'NEEMX PRO is a premium botanical oil concentrate, developed for professional use in (glass) horticulture and cultivation environments. The product is based on a carefully composed botanical oil blend and natural extracts, combined with a mild emulsifier for optimal mixing with water.',
        benefits: [
          'Supports natural leaf resilience',
          'Reduces stress on the crop',
          'Helps disturb the living environment of unwanted insects',
          'Contributes to a clean and vital leaf surface'
        ]
      },

      features: {
        title: 'What does NEEMX PRO do?',
        items: [
          { icon: '🌿', title: 'Healthy Leaves', description: 'Supports healthy and strong leaves' },
          { icon: '🛡️', title: 'Preventive & Curative', description: 'Helps with preventive and curative crop care' },
          { icon: '💧', title: 'Protective Film', description: 'Forms a protective oil film on the leaf' },
          { icon: '🌱', title: 'Suitable for Cuttings', description: 'Suitable for young plants and cuttings at correct dosage' },
          { icon: '⚡', title: 'Highly Concentrated', description: 'Low dosage needed - a little goes a long way' },
          { icon: '💦', title: 'Mixable', description: 'Easy to mix with water thanks to mild emulsifier' }
        ]
      },

      dosage: {
        title: 'Dosage & Application',
        subtitle: 'Mixing ratio per liter of water',
        levels: [
          { amount: '2.5 ml/L', use: 'Preventive (weekly)', description: 'Weekly until end of cultivation for preventive protection' },
          { amount: '5 ml/L', use: 'Normal use', description: 'For standard leaf care and maintenance' },
          { amount: '7 ml/L', use: 'Intensive care', description: 'For increased care or light insect pressure' },
          { amount: '10 ml/L', use: 'Professional / Heavy', description: 'For heavy insect pressure or professional use' }
        ],
        yield: {
          title: 'Yield per bottle',
          items: [
            { size: '10 ml', yield: '1-4 liters spray solution' },
            { size: '15 ml', yield: '1.5-6 liters spray solution' },
            { size: '30 ml', yield: '3-12 liters spray solution' }
          ]
        }
      },

      comparison: {
        title: 'Why NEEMX PRO?',
        subtitle: 'NEEMX PRO vs. standard neem products',
        ourProduct: 'NEEMX PRO',
        standard: 'Standard Neem',
        items: [
          { feature: 'Concentration', ours: 'Highly concentrated (4x stronger)', theirs: 'Often diluted' },
          { feature: 'Dosage', ours: '2.5-10 ml per liter', theirs: '10-20 ml per liter' },
          { feature: 'Quality', ours: 'Premium botanical blend', theirs: 'Variable' },
          { feature: 'Composition', ours: '100% natural', theirs: 'Sometimes synthetic additives' },
          { feature: 'Price per treatment', ours: 'Better value due to concentration', theirs: 'More expensive per treatment' }
        ],
        note: 'NEEMX PRO is 4× as strong as standard products. Where standard products need 10 ml for 1 liter of water, NEEMX PRO makes up to 4 liters of spray solution per 10 ml for preventive use.'
      },

      targets: {
        title: 'Effective against',
        items: [
          { name: 'Spider mites', icon: '🕷️' },
          { name: 'Sucking insects', icon: '🦟' },
          { name: 'Aphids', icon: '🐛' },
          { name: 'Thrips', icon: '🦗' },
          { name: 'Whitefly', icon: '🪰' },
          { name: 'Mildew', icon: '🍄' }
        ]
      },

      forWho: {
        title: 'Who is NEEMX PRO for?',
        items: [
          { icon: '🏭', title: 'Greenhouse Horticulture', description: 'Professional greenhouses and cultivation companies' },
          { icon: '🌸', title: 'Ornamental Cultivation', description: 'Flower and ornamental plant growers' },
          { icon: '🌿', title: 'Herb Cultivation', description: 'Organic and conventional herb growers' },
          { icon: '🌱', title: 'Propagation & Cuttings', description: 'Propagation companies and cutting production' },
          { icon: '👨‍🌾', title: 'Professional Growers', description: 'Growers who choose natural solutions' },
          { icon: '🏡', title: 'Home Use', description: 'Individuals with intensive plant care' }
        ]
      },

      products: {
        title: 'Choose your size',
        items: [
          { size: '10 ml', price: '24.95', description: 'Premium entry / Bestseller', yield: '1-4 liters', badge: 'Popular' },
          { size: '15 ml', price: '29.95', description: 'Best value for individuals', yield: '1.5-6 liters', badge: 'Best value' },
          { size: '30 ml', price: '44.95', description: 'For serious users', yield: '3-12 liters', badge: 'Professional' }
        ]
      },

      faq: {
        title: 'Frequently asked questions',
        items: [
          {
            q: 'Is NEEMX PRO organic?',
            a: 'NEEMX PRO is a 100% natural product based on botanical oils and extracts. It contains no synthetic additives. Always check the specific requirements of your certification for use in organic cultivation.'
          },
          {
            q: 'Is NEEMX PRO safe for my plants?',
            a: 'Yes, when used at the correct dosage, NEEMX PRO is gentle on plants while effectively working against unwanted insects. Always start with the lowest dosage and test on a small part of the plant.'
          },
          {
            q: 'How often should I apply NEEMX PRO?',
            a: 'For preventive use, we recommend weekly application. With active insect pressure, this can be increased to 2-3 times per week. Preferably spray in the morning or evening, not in direct sunlight.'
          },
          {
            q: 'Can I mix NEEMX PRO with other products?',
            a: 'NEEMX PRO mixes well with water thanks to the mild emulsifier. For combination with other crop protection products, we advise doing a small test first.'
          },
          {
            q: 'Why is NEEMX PRO more expensive than other neem products?',
            a: 'NEEMX PRO is a highly concentrated product - 4x stronger than standard neem products. This means you need less per treatment, making the price per treatment actually more advantageous.'
          }
        ]
      },

      cta: {
        title: 'Discover the power of NEEMX PRO',
        description: 'Order today and experience the difference of professional, natural crop protection.',
        button: 'View in Webshop',
        contact: 'Questions? Contact us'
      }
    },
    de: {
      badge: 'NEU',
      title: 'NEEMX PRO',
      subtitle: '100% Natürliches Botanisches Ölkonzentrat',
      tagline: 'Premium Blattpflege für professionelle Züchter',
      intro: 'NEEMX PRO ist ein hochwertiges, 100% natürliches botanisches Ölkonzentrat für professionelle Blattpflege. Es unterstützt gesunde Pflanzen und hilft, Insektendruck wie Spinnmilben und andere saugende Insekten zu verhindern und zu reduzieren, indem es einen schützenden Ölfilm auf dem Blatt bildet.',

      heroFeatures: [
        '100% Natürlich',
        'Hochkonzentriert',
        'Professionelle Qualität',
        'Präventiv & Kurativ'
      ],

      whatIs: {
        title: 'Was ist NEEMX PRO?',
        description: 'NEEMX PRO ist ein Premium botanisches Ölkonzentrat, entwickelt für den professionellen Einsatz im (Glas-)Gartenbau und in Anbauumgebungen. Das Produkt basiert auf einer sorgfältig zusammengestellten botanischen Ölmischung und natürlichen Extrakten, kombiniert mit einem milden Emulgator für optimale Mischung mit Wasser.',
        benefits: [
          'Unterstützt die natürliche Blattresilienz',
          'Reduziert Stress auf die Kultur',
          'Hilft, die Lebensumgebung unerwünschter Insekten zu stören',
          'Trägt zu einer sauberen und vitalen Blattoberfläche bei'
        ]
      },

      features: {
        title: 'Was macht NEEMX PRO?',
        items: [
          { icon: '🌿', title: 'Gesunde Blätter', description: 'Unterstützt gesunde und starke Blätter' },
          { icon: '🛡️', title: 'Präventiv & Kurativ', description: 'Hilft bei präventiver und kurativer Pflanzenpflege' },
          { icon: '💧', title: 'Schutzfilm', description: 'Bildet einen schützenden Ölfilm auf dem Blatt' },
          { icon: '🌱', title: 'Geeignet für Stecklinge', description: 'Geeignet für junge Pflanzen und Stecklinge bei richtiger Dosierung' },
          { icon: '⚡', title: 'Hochkonzentriert', description: 'Niedrige Dosierung erforderlich - ein wenig reicht weit' },
          { icon: '💦', title: 'Mischbar', description: 'Leicht mit Wasser mischbar dank mildem Emulgator' }
        ]
      },

      dosage: {
        title: 'Dosierung & Anwendung',
        subtitle: 'Mischverhältnis pro Liter Wasser',
        levels: [
          { amount: '2,5 ml/L', use: 'Präventiv (wöchentlich)', description: 'Wöchentlich bis Ende der Kultivierung für präventiven Schutz' },
          { amount: '5 ml/L', use: 'Normale Verwendung', description: 'Für Standard-Blattpflege und Wartung' },
          { amount: '7 ml/L', use: 'Intensive Pflege', description: 'Bei erhöhter Pflege oder leichtem Insektendruck' },
          { amount: '10 ml/L', use: 'Professionell / Schwer', description: 'Bei schwerem Insektendruck oder professionellem Einsatz' }
        ],
        yield: {
          title: 'Ertrag pro Flasche',
          items: [
            { size: '10 ml', yield: '1-4 Liter Sprühlösung' },
            { size: '15 ml', yield: '1,5-6 Liter Sprühlösung' },
            { size: '30 ml', yield: '3-12 Liter Sprühlösung' }
          ]
        }
      },

      comparison: {
        title: 'Warum NEEMX PRO?',
        subtitle: 'NEEMX PRO vs. Standard Neemprodukte',
        ourProduct: 'NEEMX PRO',
        standard: 'Standard Neem',
        items: [
          { feature: 'Konzentration', ours: 'Hochkonzentriert (4x stärker)', theirs: 'Oft verdünnt' },
          { feature: 'Dosierung', ours: '2,5-10 ml pro Liter', theirs: '10-20 ml pro Liter' },
          { feature: 'Qualität', ours: 'Premium botanische Mischung', theirs: 'Variabel' },
          { feature: 'Zusammensetzung', ours: '100% natürlich', theirs: 'Manchmal synthetische Zusätze' },
          { feature: 'Preis pro Behandlung', ours: 'Besser wegen Konzentration', theirs: 'Teurer pro Behandlung' }
        ],
        note: 'NEEMX PRO ist 4× so stark wie Standardprodukte. Wo Standardprodukte 10 ml für 1 Liter Wasser benötigen, macht NEEMX PRO bis zu 4 Liter Sprühlösung pro 10 ml bei präventiver Anwendung.'
      },

      targets: {
        title: 'Wirksam gegen',
        items: [
          { name: 'Spinnmilben', icon: '🕷️' },
          { name: 'Saugende Insekten', icon: '🦟' },
          { name: 'Blattläuse', icon: '🐛' },
          { name: 'Thripse', icon: '🦗' },
          { name: 'Weiße Fliege', icon: '🪰' },
          { name: 'Mehltau', icon: '🍄' }
        ]
      },

      forWho: {
        title: 'Für wen ist NEEMX PRO?',
        items: [
          { icon: '🏭', title: 'Gewächshausgartenbau', description: 'Professionelle Gewächshäuser und Anbaubetriebe' },
          { icon: '🌸', title: 'Zierpflanzenbau', description: 'Blumen- und Zierpflanzenzüchter' },
          { icon: '🌿', title: 'Kräuteranbau', description: 'Bio- und konventionelle Kräuterzüchter' },
          { icon: '🌱', title: 'Vermehrung & Stecklinge', description: 'Vermehrungsbetriebe und Stecklingsproduktion' },
          { icon: '👨‍🌾', title: 'Professionelle Züchter', description: 'Züchter, die natürliche Lösungen wählen' },
          { icon: '🏡', title: 'Heimgebrauch', description: 'Privatpersonen mit intensiver Pflanzenpflege' }
        ]
      },

      products: {
        title: 'Wählen Sie Ihre Größe',
        items: [
          { size: '10 ml', price: '24,95', description: 'Premium Einstieg / Bestseller', yield: '1-4 Liter', badge: 'Beliebt' },
          { size: '15 ml', price: '29,95', description: 'Bester Wert für Privatpersonen', yield: '1,5-6 Liter', badge: 'Bester Wert' },
          { size: '30 ml', price: '44,95', description: 'Für ernsthafte Anwender', yield: '3-12 Liter', badge: 'Professionell' }
        ]
      },

      faq: {
        title: 'Häufig gestellte Fragen',
        items: [
          {
            q: 'Ist NEEMX PRO biologisch?',
            a: 'NEEMX PRO ist ein 100% natürliches Produkt auf Basis von botanischen Ölen und Extrakten. Es enthält keine synthetischen Zusätze. Überprüfen Sie immer die spezifischen Anforderungen Ihrer Zertifizierung für den Einsatz im biologischen Anbau.'
          },
          {
            q: 'Ist NEEMX PRO sicher für meine Pflanzen?',
            a: 'Ja, bei richtiger Dosierung ist NEEMX PRO sanft zu Pflanzen und wirkt gleichzeitig effektiv gegen unerwünschte Insekten. Beginnen Sie immer mit der niedrigsten Dosierung und testen Sie an einem kleinen Teil der Pflanze.'
          },
          {
            q: 'Wie oft sollte ich NEEMX PRO anwenden?',
            a: 'Für präventive Anwendung empfehlen wir wöchentliche Anwendung. Bei aktivem Insektendruck kann dies auf 2-3 Mal pro Woche erhöht werden. Sprühen Sie vorzugsweise morgens oder abends, nicht in direktem Sonnenlicht.'
          },
          {
            q: 'Kann ich NEEMX PRO mit anderen Produkten mischen?',
            a: 'NEEMX PRO lässt sich dank des milden Emulgators gut mit Wasser mischen. Für die Kombination mit anderen Pflanzenschutzmitteln empfehlen wir, zunächst einen kleinen Test durchzuführen.'
          },
          {
            q: 'Warum ist NEEMX PRO teurer als andere Neemprodukte?',
            a: 'NEEMX PRO ist ein hochkonzentriertes Produkt - 4x stärker als Standard-Neemprodukte. Dadurch benötigen Sie pro Behandlung weniger, was den Preis pro Behandlung tatsächlich vorteilhafter macht.'
          }
        ]
      },

      cta: {
        title: 'Entdecken Sie die Kraft von NEEMX PRO',
        description: 'Bestellen Sie noch heute und erleben Sie den Unterschied von professionellem, natürlichem Pflanzenschutz.',
        button: 'Im Webshop ansehen',
        contact: 'Fragen? Kontaktieren Sie uns'
      }
    }
  }

  const t = content[locale as keyof typeof content] || content.nl

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-green-50 py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-lg">
                <span className="animate-pulse">✨</span> {t.badge}
              </span>

              {/* Title */}
              <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-gray-800">NEEMX</span>
                <span className="text-amber-500">PRO</span>
              </h1>
              <p className="text-2xl text-amber-600 font-semibold mb-4">{t.subtitle}</p>
              <p className="text-lg text-gray-600 mb-6">{t.tagline}</p>

              <p className="text-gray-700 leading-relaxed mb-8">{t.intro}</p>

              {/* Hero Features */}
              <div className="flex flex-wrap gap-3 mb-8">
                {t.heroFeatures.map((feature, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 bg-white/80 border border-amber-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                    <span className="text-amber-500">✓</span> {feature}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={localizePathForLocale('/shop/neemx-pro-10ml', locale)}
                  className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t.cta.button}
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href={localizePathForLocale('/contact', locale)}
                  className="inline-flex items-center bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {t.cta.contact}
                </Link>
              </div>
            </div>

            {/* Product Image */}
            <div className="relative">
              <div className="rounded-3xl shadow-2xl overflow-hidden transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/productAfbeeldingen/neemxpro/neemxpro-sfeer-1.webp"
                  alt="NEEMX PRO - Premium Botanical Oil Concentrate"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold shadow-lg transform rotate-12">
                4x {locale === 'nl' ? 'Sterker' : locale === 'de' ? 'Stärker' : 'Stronger'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 text-center">{t.whatIs.title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center">{t.whatIs.description}</p>

          <div className="bg-gradient-to-r from-amber-50 to-green-50 rounded-2xl p-8">
            <h3 className="font-semibold text-gray-800 mb-4">{locale === 'nl' ? 'Na verdunning en toepassing:' : locale === 'de' ? 'Nach Verdünnung und Anwendung:' : 'After dilution and application:'}</h3>
            <ul className="space-y-3">
              {t.whatIs.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-amber-500 mt-1">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center">{t.features.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.items.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dosage Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center">{t.dosage.title}</h2>
          <p className="text-lg text-gray-600 mb-12 text-center">{t.dosage.subtitle}</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {t.dosage.levels.map((level, idx) => (
              <div key={idx} className={`rounded-2xl p-5 text-center ${idx === 0 ? 'bg-green-600 text-white shadow-xl' : idx === 3 ? 'bg-amber-500 text-white shadow-xl' : 'bg-gray-50 border border-gray-200'}`}>
                <div className={`text-3xl font-bold mb-2 ${idx === 0 || idx === 3 ? 'text-white' : 'text-amber-500'}`}>{level.amount}</div>
                <div className={`font-semibold mb-2 ${idx === 0 ? 'text-green-100' : idx === 3 ? 'text-amber-100' : 'text-gray-800'}`}>{level.use}</div>
                <p className={`text-sm ${idx === 0 || idx === 3 ? 'text-white/90' : 'text-gray-600'}`}>{level.description}</p>
              </div>
            ))}
          </div>

          {/* Yield Table */}
          <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-2xl p-8">
            <h3 className="font-bold text-gray-800 mb-4 text-center">{t.dosage.yield.title}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {t.dosage.yield.items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-amber-500 mb-1">{item.size}</div>
                  <div className="text-gray-600 text-sm">{item.yield}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center">{t.comparison.title}</h2>
          <p className="text-gray-400 mb-12 text-center">{t.comparison.subtitle}</p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4"></th>
                  <th className="text-center py-4 px-4 text-amber-400 font-bold">{t.comparison.ourProduct}</th>
                  <th className="text-center py-4 px-4 text-gray-500">{t.comparison.standard}</th>
                </tr>
              </thead>
              <tbody>
                {t.comparison.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800">
                    <td className="py-4 px-4 font-medium">{item.feature}</td>
                    <td className="py-4 px-4 text-center text-green-400">{item.ours}</td>
                    <td className="py-4 px-4 text-center text-gray-500">{item.theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-amber-500/20 border border-amber-500/30 rounded-xl p-6">
            <p className="text-amber-200 text-center">{t.comparison.note}</p>
          </div>
        </div>
      </section>

      {/* Targets Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center">{t.targets.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {t.targets.items.map((target, idx) => (
              <div key={idx} className="bg-red-50 border border-red-100 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{target.icon}</div>
                <div className="text-sm font-medium text-gray-700">{target.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Who Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center">{t.forWho.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.forWho.items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <Image
                src="/productAfbeeldingen/neemxpro/neemxpro-sfeer-1.webp"
                alt="NEEMX PRO - 100% Natural Botanical Oil"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <Image
                src="/productAfbeeldingen/neemxpro/neemxpro-sfeer-2.webp"
                alt="NEEMX PRO - Premium Plant Care"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            {locale === 'nl' ? '100% natuurlijk botanisch olieconcentraat voor professionele bladverzorging' :
             locale === 'de' ? '100% natürliches botanisches Ölkonzentrat für professionelle Blattpflege' :
             '100% natural botanical oil concentrate for professional leaf care'}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center">{t.products.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.products.items.map((product, idx) => (
              <div key={idx} className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all ${idx === 1 ? 'ring-2 ring-amber-500 scale-105' : ''}`}>
                {/* Badge */}
                <div className="text-center mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${idx === 1 ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {product.badge}
                  </span>
                </div>

                {/* Size */}
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-gray-800">{product.size}</div>
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-amber-500">€{product.price}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-center mb-4">{product.description}</p>

                {/* Yield */}
                <div className="bg-gray-50 rounded-lg p-3 text-center mb-6">
                  <span className="text-sm text-gray-500">{locale === 'nl' ? 'Opbrengst:' : locale === 'de' ? 'Ertrag:' : 'Yield:'}</span>
                  <span className="text-sm font-semibold text-gray-700 ml-1">{product.yield}</span>
                </div>

                {/* CTA */}
                <Link
                  href={localizePathForLocale(`/shop/neemx-pro-${product.size.replace(' ', '')}`, locale)}
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${idx === 1 ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                >
                  {locale === 'nl' ? 'Bestel nu' : locale === 'de' ? 'Jetzt bestellen' : 'Order now'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-12 text-center">{t.faq.title}</h2>
          <div className="bg-gray-50 rounded-2xl p-6">
            {t.faq.items.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 last:border-0">
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full py-5 flex justify-between items-center text-left hover:text-amber-600 transition-colors"
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-amber-500 transition-transform duration-300 flex-shrink-0 ${openFAQ === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === idx ? 'max-h-96 pb-5' : 'max-h-0'}`}>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t.cta.title}</h2>
          <p className="text-xl mb-10 text-amber-100">{t.cta.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-flex items-center bg-white text-amber-600 hover:bg-amber-50 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t.cta.button}
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href={localizePathForLocale('/contact', locale)}
              className="inline-flex items-center bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t.cta.contact}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
