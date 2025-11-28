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
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Contact | Gratis Offerte Binnen 24u | Lumora B2B',
      description: 'Vraag een gratis offerte aan voor steenwol pluggen en kweektrays. ✓ Reactie binnen 24 uur ✓ Persoonlijk advies ✓ B2B groothandel prijzen ✓ Direct van de fabrikant.',
      keywords: ['contact lumora', 'offerte steenwol pluggen', 'B2B offerte', 'tuinbouw leverancier contact', 'steenwol pluggen bestellen', 'groothandel aanvraag']
    },
    en: {
      title: 'Contact | Free Quote Within 24h | Lumora B2B',
      description: 'Request a free quote for rockwool plugs and growing trays. ✓ Response within 24 hours ✓ Personal advice ✓ B2B wholesale prices ✓ Direct from manufacturer.',
      keywords: ['contact lumora', 'rockwool plugs quote', 'B2B quote', 'horticulture supplier contact', 'order rockwool plugs', 'wholesale inquiry']
    },
    de: {
      title: 'Kontakt | Kostenloses Angebot in 24h | Lumora B2B',
      description: 'Fordern Sie ein kostenloses Angebot fur Steinwolle-Plugs und Anzuchtschalen an. ✓ Antwort innerhalb 24 Stunden ✓ Personliche Beratung ✓ B2B-Grosshandelspreise ✓ Direkt vom Hersteller.',
      keywords: ['kontakt lumora', 'Steinwolle Plugs Angebot', 'B2B Angebot', 'Gartenbau Lieferant Kontakt', 'Steinwollstecker bestellen', 'Grosshandel Anfrage']
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

export default async function ContactPage({ params }: { params: { locale: string } }) {
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
    error: t.form.error
  }
  
  return (
    <ContactPageClient 
      t={t} 
      form={<ContactForm translations={formTranslations} />}
      locale={params.locale}
    />
  )
}
