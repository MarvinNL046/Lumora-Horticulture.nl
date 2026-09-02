import type {Metadata} from 'next'
import {generatePageMetadata} from '@/lib/metadata'

const SUPPORTED_LOCALES = ['nl', 'en', 'de'] as const
type ReturnPolicyLocale = (typeof SUPPORTED_LOCALES)[number]

type PolicyCopy = {
  title: string
  description: string
  coolingOff: {title: string; text: string}
  conditions: {title: string; intro: string; items: string[]}
  process: {
    title: string
    steps: Array<{title: string; text: string}>
    addressLabel: string
    country: string
  }
  costs: {title: string; intro: string; items: string[]; text: string}
  refund: {title: string; text: string}
  exclusions: {title: string; intro: string; items: string[]}
  questions: {title: string; text: string}
  tip: {title: string; text: string}
}

const COPY: Record<ReturnPolicyLocale, PolicyCopy> = {
  nl: {
    title: 'Retourbeleid',
    description: 'Retourbeleid en herroepingsrecht van Lumora Horticulture.',
    coolingOff: {
      title: '14 dagen bedenktijd',
      text: 'Als consument heeft u het recht om binnen 14 dagen na ontvangst van uw bestelling deze zonder opgave van redenen te retourneren. Deze bedenktermijn gaat in op de dag nadat u (of een door u aangewezen derde partij) het product heeft ontvangen.',
    },
    conditions: {
      title: 'Voorwaarden voor retourneren',
      intro: 'Om gebruik te maken van uw herroepingsrecht dienen de volgende voorwaarden te worden nageleefd:',
      items: [
        'Het product is onbeschadigd en in originele staat',
        'Het product bevindt zich in de originele verpakking',
        'NEEMX PRO kan alleen retour als de fles ongeopend is, de verzegeling van de draaidop volledig intact is en de fles inclusief etiket in originele staat verkeert',
        'Het product is niet gebruikt of geïnstalleerd',
        'Alle accessoires en documentatie zijn compleet',
      ],
    },
    process: {
      title: 'Hoe retourneren?',
      steps: [
        {
          title: 'Stap 1: Melding',
          text: 'Meld uw retour binnen 14 dagen na ontvangst aan via onze contactpagina of per e-mail. Vermeld daarbij uw ordernummer en de reden van retourneren.',
        },
        {
          title: 'Stap 2: Verzending',
          text: 'Stuur het product binnen 14 dagen na uw melding terug naar ons retouradres:',
        },
        {
          title: 'Stap 3: Verwerking',
          text: 'Na ontvangst van uw retour controleren wij het product. Als het retour wordt goedgekeurd, ontvangt u binnen 14 dagen het volledige aankoopbedrag terug op dezelfde wijze als waarop u heeft betaald.',
        },
      ],
      addressLabel: 'Retouradres:',
      country: 'Nederland',
    },
    costs: {
      title: 'Retourkosten',
      intro: 'De kosten voor het retourneren van producten zijn voor uw eigen rekening, tenzij:',
      items: [
        'Het verkeerde product is geleverd',
        'Het product beschadigd is ontvangen',
        'Het product een gebrek vertoont',
      ],
      text: 'In deze gevallen nemen wij de retourkosten voor onze rekening. Neem in dat geval eerst contact met ons op voordat u het product terugstuurt.',
    },
    refund: {
      title: 'Terugbetaling',
      text: 'Na goedkeuring van uw retour wordt het aankoopbedrag binnen 14 dagen teruggestort op de rekening waarmee u heeft betaald. U ontvangt een bevestiging per e-mail zodra de terugbetaling is verwerkt.',
    },
    exclusions: {
      title: 'Uitgesloten van herroepingsrecht',
      intro: 'In de volgende gevallen is het herroepingsrecht uitgesloten:',
      items: [
        'Producten die op maat zijn gemaakt of aangepast',
        'Geopende NEEMX PRO-flessen of flessen waarvan de verzegeling van de draaidop is beschadigd of verbroken',
        'Producten die door hun aard niet kunnen worden teruggestuurd',
        'Snel bederfelijke producten',
      ],
    },
    questions: {
      title: 'Vragen?',
      text: 'Heeft u vragen over ons retourbeleid? Neem dan contact met ons op:',
    },
    tip: {
      title: '💡 Tip',
      text: 'Bewaar altijd uw track & trace code tot uw retour is verwerkt. Dit is uw bewijs dat u het product heeft geretourneerd.',
    },
  },
  en: {
    title: 'Return Policy',
    description: 'Return policy and right of withdrawal for Lumora Horticulture orders.',
    coolingOff: {
      title: '14-day cooling-off period',
      text: 'As a consumer, you have the right to return your order without giving a reason within 14 days of receipt. This cooling-off period starts on the day after you, or a third party appointed by you, receive the product.',
    },
    conditions: {
      title: 'Return conditions',
      intro: 'To exercise your right of withdrawal, the following conditions must be met:',
      items: [
        'The product is undamaged and in its original condition',
        'The product is in its original packaging',
        'NEEMX PRO can only be returned if the bottle is unopened, the screw-cap seal is completely intact, and the bottle and label remain in their original condition',
        'The product has not been used or installed',
        'All accessories and documentation are complete',
      ],
    },
    process: {
      title: 'How do I return a product?',
      steps: [
        {
          title: 'Step 1: Notify us',
          text: 'Notify us of your return through our contact page or by email within 14 days of receipt. Include your order number and the reason for the return.',
        },
        {
          title: 'Step 2: Ship the product',
          text: 'Send the product to our return address within 14 days after notifying us:',
        },
        {
          title: 'Step 3: Processing',
          text: 'We will inspect the product after receiving your return. If the return is approved, the full purchase amount will be refunded within 14 days using the same payment method you used for the order.',
        },
      ],
      addressLabel: 'Return address:',
      country: 'The Netherlands',
    },
    costs: {
      title: 'Return shipping costs',
      intro: 'You are responsible for the cost of returning products, unless:',
      items: [
        'You received the wrong product',
        'The product arrived damaged',
        'The product is defective',
      ],
      text: 'In these cases, we will cover the return shipping costs. Please contact us before sending the product back.',
    },
    refund: {
      title: 'Refunds',
      text: 'After your return has been approved, the purchase amount will be refunded within 14 days to the account used for payment. You will receive an email confirmation once the refund has been processed.',
    },
    exclusions: {
      title: 'Exceptions to the right of withdrawal',
      intro: 'The right of withdrawal does not apply in the following cases:',
      items: [
        'Products that have been made to measure or customised',
        'Opened NEEMX PRO bottles or bottles with a damaged or broken screw-cap seal',
        'Products that, by their nature, cannot be returned',
        'Perishable products',
      ],
    },
    questions: {
      title: 'Questions?',
      text: 'Do you have questions about our return policy? Please contact us:',
    },
    tip: {
      title: '💡 Tip',
      text: 'Keep your track-and-trace code until your return has been processed. This is your proof that you returned the product.',
    },
  },
  de: {
    title: 'Rückgaberecht',
    description: 'Rückgaberecht und Widerrufsrecht für Bestellungen bei Lumora Horticulture.',
    coolingOff: {
      title: '14 Tage Widerrufsfrist',
      text: 'Als Verbraucher haben Sie das Recht, Ihre Bestellung innerhalb von 14 Tagen nach Erhalt ohne Angabe von Gründen zurückzusenden. Diese Frist beginnt am Tag, nachdem Sie oder ein von Ihnen benannter Dritter das Produkt erhalten haben.',
    },
    conditions: {
      title: 'Bedingungen für die Rückgabe',
      intro: 'Um Ihr Widerrufsrecht auszuüben, müssen die folgenden Bedingungen erfüllt sein:',
      items: [
        'Das Produkt ist unbeschädigt und im Originalzustand',
        'Das Produkt befindet sich in der Originalverpackung',
        'NEEMX PRO kann nur zurückgegeben werden, wenn die Flasche ungeöffnet, die Versiegelung des Schraubverschlusses vollständig unbeschädigt und die Flasche samt Etikett im Originalzustand ist',
        'Das Produkt wurde weder benutzt noch installiert',
        'Alle Zubehörteile und Unterlagen sind vollständig',
      ],
    },
    process: {
      title: 'Wie sende ich ein Produkt zurück?',
      steps: [
        {
          title: 'Schritt 1: Rückgabe anmelden',
          text: 'Melden Sie Ihre Rückgabe innerhalb von 14 Tagen nach Erhalt über unsere Kontaktseite oder per E-Mail an. Geben Sie dabei Ihre Bestellnummer und den Rückgabegrund an.',
        },
        {
          title: 'Schritt 2: Produkt versenden',
          text: 'Senden Sie das Produkt innerhalb von 14 Tagen nach Ihrer Mitteilung an unsere Rücksendeadresse:',
        },
        {
          title: 'Schritt 3: Bearbeitung',
          text: 'Nach Eingang Ihrer Rücksendung prüfen wir das Produkt. Wird die Rückgabe genehmigt, erstatten wir Ihnen innerhalb von 14 Tagen den vollständigen Kaufbetrag über dieselbe Zahlungsart, die Sie für die Bestellung verwendet haben.',
        },
      ],
      addressLabel: 'Rücksendeadresse:',
      country: 'Niederlande',
    },
    costs: {
      title: 'Rücksendekosten',
      intro: 'Die Kosten der Rücksendung tragen Sie selbst, es sei denn:',
      items: [
        'Es wurde das falsche Produkt geliefert',
        'Das Produkt wurde beschädigt geliefert',
        'Das Produkt weist einen Mangel auf',
      ],
      text: 'In diesen Fällen übernehmen wir die Rücksendekosten. Bitte kontaktieren Sie uns, bevor Sie das Produkt zurücksenden.',
    },
    refund: {
      title: 'Rückerstattung',
      text: 'Nach Genehmigung Ihrer Rückgabe wird der Kaufbetrag innerhalb von 14 Tagen auf das für die Zahlung verwendete Konto zurückerstattet. Sobald die Rückerstattung bearbeitet wurde, erhalten Sie eine Bestätigung per E-Mail.',
    },
    exclusions: {
      title: 'Ausnahmen vom Widerrufsrecht',
      intro: 'In den folgenden Fällen besteht kein Widerrufsrecht:',
      items: [
        'Produkte, die nach Maß gefertigt oder angepasst wurden',
        'Geöffnete NEEMX PRO-Flaschen oder Flaschen mit beschädigter beziehungsweise gebrochener Versiegelung am Schraubverschluss',
        'Produkte, die aufgrund ihrer Beschaffenheit nicht zurückgesendet werden können',
        'Schnell verderbliche Produkte',
      ],
    },
    questions: {
      title: 'Fragen?',
      text: 'Haben Sie Fragen zu unserem Rückgaberecht? Kontaktieren Sie uns:',
    },
    tip: {
      title: '💡 Tipp',
      text: 'Bewahren Sie Ihren Sendungsverfolgungscode auf, bis Ihre Rückgabe bearbeitet wurde. Er dient als Nachweis dafür, dass Sie das Produkt zurückgesendet haben.',
    },
  },
}

function resolveLocale(locale: string): ReturnPolicyLocale {
  return SUPPORTED_LOCALES.includes(locale as ReturnPolicyLocale)
    ? (locale as ReturnPolicyLocale)
    : 'nl'
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale: requestedLocale} = await params
  const locale = resolveLocale(requestedLocale)
  const copy = COPY[locale]

  return generatePageMetadata({
    title: copy.title,
    description: copy.description,
    locale,
    path: '/return-policy',
  })
}

function BulletList({items}: {items: string[]}) {
  return (
    <ul className="list-disc list-inside space-y-2 text-lumora-dark/70">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

export default async function ReturnPolicyPage({
  params,
}: {
  params: Promise<{locale: string}>
}) {
  const {locale: requestedLocale} = await params
  const copy = COPY[resolveLocale(requestedLocale)]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f7f4] to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-lumora-dark mb-8">
          {copy.title}
        </h1>

        <div className="bg-white rounded-3xl shadow-soft-lg p-8 border border-lumora-dark/10 space-y-8">
          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">{copy.coolingOff.title}</h2>
            <p className="text-lumora-dark/70 leading-relaxed">{copy.coolingOff.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">{copy.conditions.title}</h2>
            <p className="text-lumora-dark/70 leading-relaxed mb-4">{copy.conditions.intro}</p>
            <BulletList items={copy.conditions.items} />
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">{copy.process.title}</h2>
            <div className="space-y-4">
              {copy.process.steps.map((step, index) => (
                <div key={step.title}>
                  <h3 className="text-lg font-semibold text-lumora-dark mb-2">{step.title}</h3>
                  <p className={`text-lumora-dark/70 leading-relaxed ${index === 1 ? 'mb-3' : ''}`}>{step.text}</p>
                  {index === 1 && (
                    <div className="bg-lumora-cream/30 rounded-xl p-4 border border-lumora-dark/10">
                      <p className="text-lumora-dark font-semibold">{copy.process.addressLabel}</p>
                      <p className="text-lumora-dark/70">Lumora Horticulture</p>
                      <p className="text-lumora-dark/70">Aan de Bogen 11</p>
                      <p className="text-lumora-dark/70">6118 AS Nieuwstadt</p>
                      <p className="text-lumora-dark/70">{copy.process.country}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">{copy.costs.title}</h2>
            <p className="text-lumora-dark/70 leading-relaxed">{copy.costs.intro}</p>
            <div className="mt-4"><BulletList items={copy.costs.items} /></div>
            <p className="text-lumora-dark/70 leading-relaxed mt-4">{copy.costs.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">{copy.refund.title}</h2>
            <p className="text-lumora-dark/70 leading-relaxed">{copy.refund.text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">{copy.exclusions.title}</h2>
            <p className="text-lumora-dark/70 leading-relaxed mb-4">{copy.exclusions.intro}</p>
            <BulletList items={copy.exclusions.items} />
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">{copy.questions.title}</h2>
            <p className="text-lumora-dark/70 leading-relaxed mb-4">{copy.questions.text}</p>
            <div className="space-y-2 text-lumora-dark/70">
              <p><strong>Lumora Horticulture</strong></p>
              <p>Aan de Bogen 11</p>
              <p>6118 AS Nieuwstadt</p>
              <p>{copy.process.country}</p>
              <p className="mt-4">KvK: 96669772</p>
              <p>BTW: NL005224624B80</p>
            </div>
          </section>

          <div className="bg-lumora-green-500/10 border border-lumora-green-500/20 rounded-2xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-lumora-dark mb-2">{copy.tip.title}</h3>
            <p className="text-lumora-dark/70 leading-relaxed">{copy.tip.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
