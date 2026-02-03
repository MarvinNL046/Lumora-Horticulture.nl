import { unstable_setRequestLocale } from 'next-intl/server'
import HomeClient from '@/app/[locale]/HomeClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// CTR-optimized metadata for homepage
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Steenwol Pluggen & Kweektrays | Gratis Verzending | Lumora',
      description: 'Professionele steenwol pluggen en paper plug trays voor kwekers. ✓ Gratis verzending NL/BE/DE ✓ Binnen 48 uur geleverd ✓ B2B prijzen ✓ 15+ jaar ervaring. Bestel direct bij de specialist.',
      keywords: ['steenwol pluggen', 'kweektrays', 'paper plug trays', 'paperbus pluggen', 'glastuinbouw', 'B2B tuinbouw', 'Ellepot', 'propagatie materiaal']
    },
    en: {
      title: 'Rockwool Plugs & Growing Trays | Free Shipping | Lumora',
      description: 'Professional rockwool plugs and paper plug trays for growers. ✓ Free shipping NL/BE/DE ✓ Delivered within 48 hours ✓ B2B prices ✓ 15+ years experience. Order directly from the specialist.',
      keywords: ['rockwool plugs', 'growing trays', 'paper plug trays', 'propagation', 'greenhouse', 'B2B horticulture', 'Ellepot', 'propagation materials']
    },
    de: {
      title: 'Steinwolle Plugs & Anzuchtschalen | Kostenloser Versand | Lumora',
      description: 'Professionelle Steinwolle-Plugs und Paper-Plug-Trays für Züchter. ✓ Kostenloser Versand NL/BE/DE ✓ Lieferung innerhalb 48 Stunden ✓ B2B-Preise ✓ 15+ Jahre Erfahrung. Direkt beim Spezialisten bestellen.',
      keywords: ['Steinwolle Plugs', 'Anzuchtschalen', 'Paper Plug Trays', 'Vermehrung', 'Gewächshaus', 'B2B Gartenbau', 'Ellepot', 'Vermehrungsmaterial']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: '/'
  })
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
