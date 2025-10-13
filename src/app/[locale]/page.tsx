import { unstable_setRequestLocale } from 'next-intl/server'
import HomeClient from '@/app/[locale]/HomeClient'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

export default async function Home({ params }: { params: { locale: string } }) {
  // This is needed for internationalization to work properly
  unstable_setRequestLocale(params.locale)
  
  // Load messages manually for static export
  const messages = (await import(`../../messages/${params.locale}/common.json`)).default
  
  // Pull home translations from the messages
  const t = messages.home || {
    hero: {
      subtitle: "Paperbus steenwol pluggen & professionele kweektrays voor de moderne teler",
      viewProducts: "Bekijk onze producten",
      contactUs: "Neem contact op"
    },
    contactForm: {
      name: "Naam",
      email: "E-mail",
      message: "Bericht",
      submit: "Versturen",
      success: "Bericht verzonden!",
      error: "Fout bij verzenden",
      quickContact: "Snel contact"
    },
    products: {
      title: "Onze Producten",
      subtitle: "Paperbus steenwol pluggen & professionele kweektrays met Ellepot FP 12+ technologie",
      moreInfo: "Meer informatie",
      viewAll: "Bekijk alle producten"
    },
    cta: {
      title: "Neem contact met ons op",
      description: "Heeft u vragen over onze paperbus steenwol pluggen of andere producten? Wij helpen u graag verder met persoonlijk advies.",
      button: "Contact opnemen"
    }
  }

  return (
    <HomeClient locale={params.locale} t={t} />
  )
}
