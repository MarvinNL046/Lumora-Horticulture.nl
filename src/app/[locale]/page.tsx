import { unstable_setRequestLocale } from 'next-intl/server'
import HomeClient from './HomeClient'

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
      subtitle: "Duurzame en professionele tuinbouw oplossingen voor de moderne teler.",
      viewProducts: "Bekijk onze producten",
      contactUs: "Neem contact op"
    },
    products: {
      title: "Onze Producten",
      subtitle: "Hoogwaardige, duurzame oplossingen ontworpen voor de moderne professionele tuinder",
      moreInfo: "Meer informatie",
      viewAll: "Bekijk alle producten"
    },
    cta: {
      title: "Neem contact met ons op",
      description: "Heeft u vragen over onze producten of wilt u een bestelling plaatsen? Wij helpen u graag verder met persoonlijk advies.",
      button: "Contact opnemen"
    }
  }

  return (
    <HomeClient locale={params.locale} t={t} />
  )
}
