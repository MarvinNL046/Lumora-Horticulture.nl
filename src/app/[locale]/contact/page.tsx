import ContactForm from '@/components/ContactForm'
import ContactPageClient from './client'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
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
    />
  )
}
