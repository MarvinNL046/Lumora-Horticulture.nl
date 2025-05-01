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
    <>
      <ContactPageClient t={t} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Push form to right side, taking up 2/3 of space */}
            <div className="lg:w-1/3"></div>
            
            {/* Contact Form with direct translations */}
            <div className="lg:w-2/3">
              <ContactForm translations={formTranslations} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
