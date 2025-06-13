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

// Generate metadata for contact page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Contact - B2B Groothandel Aanvragen',
      description: 'Neem contact op met Lumora Horticulture voor groothandel bestellingen, offertes en B2B samenwerkingen. Direct contact met de fabrikant van steenwol pluggen en kweektrays.',
      keywords: ['contact groothandel', 'B2B offerte', 'tuinbouw leverancier contact', 'steenwol pluggen bestellen']
    },
    en: {
      title: 'Contact - B2B Wholesale Inquiries',
      description: 'Contact Lumora Horticulture for wholesale orders, quotes and B2B partnerships. Direct contact with the manufacturer of rockwool plugs and growing trays.',
      keywords: ['wholesale contact', 'B2B quote', 'horticulture supplier contact', 'order rockwool plugs']
    },
    de: {
      title: 'Kontakt - B2B Großhandel Anfragen',
      description: 'Kontaktieren Sie Lumora Horticulture für Großhandelsbestellungen, Angebote und B2B-Partnerschaften. Direkter Kontakt zum Hersteller von Steinwollsteckern und Anzuchtschalen.',
      keywords: ['Großhandel Kontakt', 'B2B Angebot', 'Gartenbau Lieferant Kontakt', 'Steinwollstecker bestellen']
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
