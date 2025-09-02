import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

interface TermsPageProps {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    nl: 'Algemene Voorwaarden | Lumora Horticulture',
    en: 'Terms & Conditions | Lumora Horticulture', 
    de: 'Allgemeine Geschäftsbedingungen | Lumora Horticulture'
  }
  
  const descriptions = {
    nl: 'Algemene voorwaarden van Lumora Horticulture voor de levering van tuinbouw producten en diensten.',
    en: 'Terms and conditions of Lumora Horticulture for the supply of horticultural products and services.',
    de: 'Allgemeine Geschäftsbedingungen von Lumora Horticulture für die Lieferung von Gartenbau-Produkten und -Dienstleistungen.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.nl,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.nl,
  }
}

export default function TermsPage({ params }: TermsPageProps) {
  const { locale } = params
  unstable_setRequestLocale(locale)

  const content = {
    nl: {
      title: 'Algemene Voorwaarden',
      lastUpdated: 'Laatst bijgewerkt: 2 september 2025',
      sections: [
        {
          title: '1. Algemene Bepalingen',
          content: 'Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en leveringen van Lumora Horticulture B.V., gevestigd in Nederland.'
        },
        {
          title: '2. Aanbiedingen en Prijzen',
          content: 'Alle aanbiedingen zijn vrijblijvend. Prijzen zijn exclusief BTW tenzij anders vermeld. Wij behouden ons het recht voor om prijzen aan te passen.'
        },
        {
          title: '3. Bestelling en Levering',
          content: 'Bestellingen worden schriftelijk bevestigd. Levertijden zijn indicatief. Lumora Horticulture streeft ernaar alle bestellingen binnen de afgesproken termijn te leveren.'
        },
        {
          title: '4. Betaling',
          content: 'Betaling dient te geschieden binnen 30 dagen na factuurdatum, tenzij anders overeengekomen. Bij te late betaling zijn wij gerechtigd rente in rekening te brengen.'
        },
        {
          title: '5. Eigendomsvoorbehoud',
          content: 'Geleverde goederen blijven eigendom van Lumora Horticulture totdat alle verschuldigde bedragen volledig zijn voldaan.'
        },
        {
          title: '6. Garantie en Aansprakelijkheid',
          content: 'Wij garanderen de kwaliteit van onze producten conform de specificaties. Onze aansprakelijkheid is beperkt tot de factuurwaarde van de geleverde goederen.'
        },
        {
          title: '7. Overmacht',
          content: 'Lumora Horticulture is niet aansprakelijk voor vertraging of niet-nakoming als gevolg van overmacht, waaronder pandemieën, natuurrampen of overheidsmaatregelen.'
        },
        {
          title: '8. Geschillen',
          content: 'Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.'
        }
      ]
    },
    en: {
      title: 'Terms & Conditions',
      lastUpdated: 'Last updated: September 2, 2025',
      sections: [
        {
          title: '1. General Provisions',
          content: 'These terms and conditions apply to all offers, agreements and deliveries of Lumora Horticulture B.V., established in the Netherlands.'
        },
        {
          title: '2. Offers and Prices',
          content: 'All offers are without obligation. Prices are exclusive of VAT unless otherwise stated. We reserve the right to adjust prices.'
        },
        {
          title: '3. Order and Delivery',
          content: 'Orders are confirmed in writing. Delivery times are indicative. Lumora Horticulture strives to deliver all orders within the agreed term.'
        },
        {
          title: '4. Payment',
          content: 'Payment must be made within 30 days of invoice date, unless otherwise agreed. In case of late payment, we are entitled to charge interest.'
        },
        {
          title: '5. Retention of Title',
          content: 'Delivered goods remain the property of Lumora Horticulture until all amounts owed have been paid in full.'
        },
        {
          title: '6. Warranty and Liability',
          content: 'We guarantee the quality of our products according to specifications. Our liability is limited to the invoice value of the delivered goods.'
        },
        {
          title: '7. Force Majeure',
          content: 'Lumora Horticulture is not liable for delay or non-performance due to force majeure, including pandemics, natural disasters or government measures.'
        },
        {
          title: '8. Disputes',
          content: 'Dutch law applies to all agreements. Disputes are submitted to the competent court in the Netherlands.'
        }
      ]
    },
    de: {
      title: 'Allgemeine Geschäftsbedingungen',
      lastUpdated: 'Zuletzt aktualisiert: 2. September 2025',
      sections: [
        {
          title: '1. Allgemeine Bestimmungen',
          content: 'Diese Allgemeinen Geschäftsbedingungen gelten für alle Angebote, Verträge und Lieferungen der Lumora Horticulture B.V. mit Sitz in den Niederlanden.'
        },
        {
          title: '2. Angebote und Preise',
          content: 'Alle Angebote sind unverbindlich. Preise verstehen sich zuzüglich Mehrwertsteuer, sofern nicht anders angegeben. Wir behalten uns das Recht vor, Preise anzupassen.'
        },
        {
          title: '3. Bestellung und Lieferung',
          content: 'Bestellungen werden schriftlich bestätigt. Lieferzeiten sind indikativ. Lumora Horticulture ist bestrebt, alle Bestellungen innerhalb der vereinbarten Frist zu liefern.'
        },
        {
          title: '4. Zahlung',
          content: 'Die Zahlung muss innerhalb von 30 Tagen nach Rechnungsdatum erfolgen, sofern nicht anders vereinbart. Bei verspäteter Zahlung sind wir berechtigt, Zinsen zu berechnen.'
        },
        {
          title: '5. Eigentumsvorbehalt',
          content: 'Gelieferte Waren bleiben Eigentum von Lumora Horticulture, bis alle geschuldeten Beträge vollständig bezahlt sind.'
        },
        {
          title: '6. Garantie und Haftung',
          content: 'Wir garantieren die Qualität unserer Produkte gemäß den Spezifikationen. Unsere Haftung ist auf den Rechnungswert der gelieferten Waren beschränkt.'
        },
        {
          title: '7. Höhere Gewalt',
          content: 'Lumora Horticulture haftet nicht für Verzögerungen oder Nichterfüllung aufgrund höherer Gewalt, einschließlich Pandemien, Naturkatastrophen oder Regierungsmaßnahmen.'
        },
        {
          title: '8. Streitigkeiten',
          content: 'Für alle Verträge gilt niederländisches Recht. Streitigkeiten werden dem zuständigen Gericht in den Niederlanden vorgelegt.'
        }
      ]
    }
  }

  const currentContent = content[locale as keyof typeof content] || content.nl

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-lumora-dark mb-4">
            {currentContent.title}
          </h1>
          <p className="text-lumora-dark/60 text-sm">
            {currentContent.lastUpdated}
          </p>
        </div>

        <div className="space-y-12">
          {currentContent.sections.map((section, index) => (
            <div key={index} className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-lumora-dark mb-4">
                {section.title}
              </h2>
              <div className="text-lumora-dark/80 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-lumora-cream/20 rounded-xl border border-lumora-gold/20">
          <h3 className="text-xl font-semibold text-lumora-dark mb-3">
            {locale === 'nl' ? 'Vragen over de voorwaarden?' : 
             locale === 'en' ? 'Questions about the terms?' : 
             'Fragen zu den Bedingungen?'}
          </h3>
          <p className="text-lumora-dark/80 mb-4">
            {locale === 'nl' ? 'Neem contact met ons op voor vragen over deze algemene voorwaarden.' : 
             locale === 'en' ? 'Contact us if you have questions about these terms and conditions.' : 
             'Kontaktieren Sie uns, wenn Sie Fragen zu diesen Allgemeinen Geschäftsbedingungen haben.'}
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center bg-lumora-dark text-lumora-cream px-6 py-3 rounded-lg hover:bg-lumora-dark/90 transition-colors duration-300"
          >
            {locale === 'nl' ? 'Contact opnemen' : 
             locale === 'en' ? 'Contact us' : 
             'Kontakt aufnehmen'}
          </a>
        </div>
      </div>
    </div>
  )
}