import ContactForm from '@/components/ContactForm'
import ContactPageClient from './client'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// CTR-optimized metadata for contact page
export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const metadata = {
    nl: {
      title: 'Contact | Gratis Offerte Binnen 24u | Lumora B2B',
      description: 'Vraag een gratis offerte aan voor steenwol pluggen en kweektrays. ✓ Reactie binnen 24 uur ✓ Persoonlijk advies ✓ B2B groothandel prijzen ✓ Direct van de fabrikant.',
      keywords: ['contact lumora', 'offerte steenwol pluggen', 'B2B offerte', 'tuinbouw leverancier contact', 'steenwol pluggen bestellen', 'groothandel aanvraag']
    },
    en: {
      title: 'Contact & Product Advice',
      description: 'Contact Lumora for personal advice about Paper Plug Trays 84 and 104 or NeemX Pro.',
      keywords: ['contact lumora', 'paper plug trays quote', 'B2B quote', 'horticulture supplier contact', 'wholesale inquiry']
    },
    de: {
      title: 'Kontakt & Produktberatung',
      description: 'Kontaktieren Sie Lumora für persönliche Beratung zu Paper Plug Trays 84 und 104 oder NeemX Pro.',
      keywords: ['kontakt lumora', 'Paper Plug Trays Angebot', 'B2B Angebot', 'Gartenbau Lieferant Kontakt', 'Grosshandel Anfrage']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/contact/',
    en: '/contact/',
    de: '/kontakt/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/contact/'
  })
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  // Load messages manually for static export
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default

  // Pull contact translations from the messages
  const t = messages.contact

  // Create form translations
  const formTranslations = {
    name: t.form.name,
    company: t.form.company,
    email: t.form.email,
    phone: t.form.phone,
    message: t.form.message,
    submit: t.form.submit,
    success: t.form.success,
    error: t.form.error,
    namePlaceholder: params.locale === 'de' ? 'Max Mustermann' : params.locale === 'nl' ? 'Jan de Vries' : 'John Doe',
    companyPlaceholder: params.locale === 'de' ? 'Unternehmen GmbH' : params.locale === 'nl' ? 'Bedrijfsnaam' : 'Company Ltd.',
    messagePlaceholder: params.locale === 'de' ? 'Wie können wir Ihnen helfen?' : params.locale === 'nl' ? 'Waarmee kunnen we je helpen?' : 'How can we help you?',
    requiredError: params.locale === 'de' ? 'Füllen Sie bitte alle Pflichtfelder aus.' : params.locale === 'nl' ? 'Vul alle verplichte velden in.' : 'Please fill in all required fields.',
    submitting: params.locale === 'de' ? 'Wird gesendet…' : params.locale === 'nl' ? 'Bezig met verzenden…' : 'Submitting…',
    successFollowup: params.locale === 'de' ? 'Wir melden uns so schnell wie möglich bei Ihnen.' : params.locale === 'nl' ? 'We nemen zo snel mogelijk contact met je op.' : "We'll get back to you as soon as possible.",
    retryError: params.locale === 'de' ? 'Versuchen Sie es später erneut.' : params.locale === 'nl' ? 'Probeer het later opnieuw.' : 'Please try again later.'
  }

  return (
    <ContactPageClient 
      t={t} 
      form={<ContactForm translations={formTranslations} />}
      locale={params.locale}
    />
  )
}
