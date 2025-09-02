import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

interface PrivacyPageProps {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    nl: 'Privacybeleid | Lumora Horticulture',
    en: 'Privacy Policy | Lumora Horticulture', 
    de: 'Datenschutz | Lumora Horticulture'
  }
  
  const descriptions = {
    nl: 'Privacybeleid van Lumora Horticulture. Hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen.',
    en: 'Privacy Policy of Lumora Horticulture. How we collect, use and protect your personal data.',
    de: 'Datenschutzrichtlinien von Lumora Horticulture. Wie wir Ihre persönlichen Daten sammeln, verwenden und schützen.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.nl,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.nl,
  }
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = params
  unstable_setRequestLocale(locale)

  const content = {
    nl: {
      title: 'Privacybeleid',
      lastUpdated: 'Laatst bijgewerkt: 2 september 2025',
      sections: [
        {
          title: '1. Algemene Informatie',
          content: 'Lumora Horticulture B.V. hecht veel waarde aan de bescherming van uw persoonlijke gegevens. In dit privacybeleid leggen wij uit welke persoonsgegevens wij verzamelen, hoe wij deze gebruiken en welke rechten u heeft.'
        },
        {
          title: '2. Contactgegevens',
          content: 'Lumora Horticulture B.V.\nE-mail: info@lumorahorticulture.com\nWebsite: www.lumorahorticulture.nl'
        },
        {
          title: '3. Welke gegevens verzamelen wij?',
          content: 'Wij verzamelen de volgende persoonsgegevens:\n• Naam en contactgegevens wanneer u contact met ons opneemt\n• E-mailadres wanneer u zich aanmeldt voor onze nieuwsbrief\n• Website-analysegegevens via cookies\n• Bedrijfsgegevens voor B2B-transacties'
        },
        {
          title: '4. Waarvoor gebruiken wij uw gegevens?',
          content: 'Wij gebruiken uw gegevens voor:\n• Het beantwoorden van uw vragen en verzoeken\n• Het versturen van onze nieuwsbrief (indien aangemeld)\n• Het verbeteren van onze website en dienstverlening\n• Het naleven van wettelijke verplichtingen'
        },
        {
          title: '5. Bewaartermijn',
          content: 'Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor zij zijn verzameld, tenzij een langere bewaartermijn wettelijk is vereist.'
        },
        {
          title: '6. Uw rechten',
          content: 'U heeft het recht om:\n• Inzage te vragen in uw persoonsgegevens\n• Onjuiste gegevens te laten corrigeren\n• Uw gegevens te laten verwijderen\n• Bezwaar te maken tegen de verwerking\n• Uw toestemming in te trekken'
        },
        {
          title: '7. Cookies',
          content: 'Onze website gebruikt functionele cookies voor het goed functioneren van de website en analytische cookies om het gebruik van de website te analyseren.'
        },
        {
          title: '8. Wijzigingen',
          content: 'Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest actuele versie vindt u altijd op onze website.'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: September 2, 2025',
      sections: [
        {
          title: '1. General Information',
          content: 'Lumora Horticulture B.V. attaches great importance to the protection of your personal data. In this privacy policy we explain what personal data we collect, how we use it and what rights you have.'
        },
        {
          title: '2. Contact Details',
          content: 'Lumora Horticulture B.V.\nEmail: info@lumorahorticulture.com\nWebsite: www.lumorahorticulture.com'
        },
        {
          title: '3. What data do we collect?',
          content: 'We collect the following personal data:\n• Name and contact details when you contact us\n• Email address when you sign up for our newsletter\n• Website analytics data via cookies\n• Business data for B2B transactions'
        },
        {
          title: '4. What do we use your data for?',
          content: 'We use your data for:\n• Answering your questions and requests\n• Sending our newsletter (if subscribed)\n• Improving our website and services\n• Complying with legal obligations'
        },
        {
          title: '5. Retention Period',
          content: 'We do not keep your personal data longer than necessary for the purposes for which it was collected, unless a longer retention period is legally required.'
        },
        {
          title: '6. Your Rights',
          content: 'You have the right to:\n• Request access to your personal data\n• Have incorrect data corrected\n• Have your data deleted\n• Object to processing\n• Withdraw your consent'
        },
        {
          title: '7. Cookies',
          content: 'Our website uses functional cookies for the proper functioning of the website and analytical cookies to analyze website usage.'
        },
        {
          title: '8. Changes',
          content: 'We may update this privacy policy from time to time. The most current version can always be found on our website.'
        }
      ]
    },
    de: {
      title: 'Datenschutz',
      lastUpdated: 'Zuletzt aktualisiert: 2. September 2025',
      sections: [
        {
          title: '1. Allgemeine Informationen',
          content: 'Lumora Horticulture B.V. legt großen Wert auf den Schutz Ihrer persönlichen Daten. In dieser Datenschutzerklärung erklären wir, welche personenbezogenen Daten wir sammeln, wie wir sie verwenden und welche Rechte Sie haben.'
        },
        {
          title: '2. Kontaktdaten',
          content: 'Lumora Horticulture B.V.\nE-Mail: info@lumorahorticulture.com\nWebsite: www.lumorahorticulture.de'
        },
        {
          title: '3. Welche Daten sammeln wir?',
          content: 'Wir sammeln die folgenden personenbezogenen Daten:\n• Name und Kontaktdaten, wenn Sie uns kontaktieren\n• E-Mail-Adresse, wenn Sie sich für unseren Newsletter anmelden\n• Website-Analysedaten über Cookies\n• Unternehmensdaten für B2B-Transaktionen'
        },
        {
          title: '4. Wofür verwenden wir Ihre Daten?',
          content: 'Wir verwenden Ihre Daten für:\n• Die Beantwortung Ihrer Fragen und Anfragen\n• Das Versenden unseres Newsletters (falls angemeldet)\n• Die Verbesserung unserer Website und Dienstleistungen\n• Die Einhaltung gesetzlicher Verpflichtungen'
        },
        {
          title: '5. Aufbewahrungszeit',
          content: 'Wir bewahren Ihre personenbezogenen Daten nicht länger auf als für die Zwecke, für die sie erhoben wurden, erforderlich ist, es sei denn, eine längere Aufbewahrungszeit ist gesetzlich vorgeschrieben.'
        },
        {
          title: '6. Ihre Rechte',
          content: 'Sie haben das Recht:\n• Auskunft über Ihre personenbezogenen Daten zu verlangen\n• Falsche Daten korrigieren zu lassen\n• Ihre Daten löschen zu lassen\n• Widerspruch gegen die Verarbeitung einzulegen\n• Ihre Einwilligung zu widerrufen'
        },
        {
          title: '7. Cookies',
          content: 'Unsere Website verwendet funktionale Cookies für das ordnungsgemäße Funktionieren der Website und analytische Cookies zur Analyse der Website-Nutzung.'
        },
        {
          title: '8. Änderungen',
          content: 'Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Die aktuelle Version finden Sie immer auf unserer Website.'
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
            {locale === 'nl' ? 'Vragen over uw privacy?' : 
             locale === 'en' ? 'Questions about your privacy?' : 
             'Fragen zu Ihrem Datenschutz?'}
          </h3>
          <p className="text-lumora-dark/80 mb-4">
            {locale === 'nl' ? 'Neem contact met ons op als u vragen heeft over dit privacybeleid.' : 
             locale === 'en' ? 'Contact us if you have questions about this privacy policy.' : 
             'Kontaktieren Sie uns, wenn Sie Fragen zu dieser Datenschutzerklärung haben.'}
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