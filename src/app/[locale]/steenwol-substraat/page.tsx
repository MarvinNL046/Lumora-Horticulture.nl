import { unstable_setRequestLocale } from 'next-intl/server'
import SteenwolSubstraatClient from './SteenwolSubstraatClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// SEO-optimized metadata for Steenwol Substraat page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Steenwol Substraat | Kweekmedium voor Hydrocultuur & Glastuinbouw',
      description: 'Alles over steenwol substraat: het ideale kweekmedium voor professionele teelt. ✓ Perfecte waterhuishouding ✓ Steriele groeiomgeving ✓ pH-neutraal. Ontdek voordelen, toepassingen en koop direct.',
      keywords: ['steenwol substraat', 'rockwool substraat', 'kweekmedium', 'hydrocultuur substraat', 'glastuinbouw substraat', 'steenwol kopen', 'groeimedium', 'substraat teelt', 'steenwol pluggen', 'minerale wol']
    },
    en: {
      title: 'Rockwool Substrate | Growing Medium for Hydroponics & Greenhouse',
      description: 'Everything about rockwool substrate: the ideal growing medium for professional cultivation. ✓ Perfect water management ✓ Sterile environment ✓ pH-neutral. Discover benefits, applications and buy directly.',
      keywords: ['rockwool substrate', 'stone wool substrate', 'growing medium', 'hydroponic substrate', 'greenhouse substrate', 'buy rockwool', 'grow medium', 'cultivation substrate', 'rockwool plugs', 'mineral wool']
    },
    de: {
      title: 'Steinwolle Substrat | Kulturmedium fur Hydrokultur & Gewachshaus',
      description: 'Alles uber Steinwolle Substrat: das ideale Kulturmedium fur professionellen Anbau. ✓ Perfekter Wasserhaushalt ✓ Sterile Umgebung ✓ pH-neutral. Entdecken Sie Vorteile, Anwendungen und kaufen Sie direkt.',
      keywords: ['Steinwolle Substrat', 'Rockwool Substrat', 'Kulturmedium', 'Hydrokultur Substrat', 'Gewachshaus Substrat', 'Steinwolle kaufen', 'Anzuchtmedium', 'Substrat Anbau', 'Steinwolle Plugs', 'Mineralwolle']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/steenwol-substraat/',
    en: '/rockwool-substrate/',
    de: '/steinwolle-substrat/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/steenwol-substraat/'
  })
}

// SEO Landing page for Steenwol Substraat
export default async function SteenwolSubstraatPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  const t = messages

  return (
    <SteenwolSubstraatClient t={t} locale={params.locale} />
  )
}
