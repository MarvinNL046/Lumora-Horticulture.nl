import { unstable_setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generatePageMetadata } from '@/lib/metadata'

// Use dynamic import with no SSR to avoid hydration issues with client components
const ApplicationsClient = dynamic(() => import('./ApplicationsClient'), { ssr: false })

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const metadata = {
    nl: {
      title: 'Toepassingen Glastuinbouw - Professionele Kweek',
      description: 'Ontdek toepassingen voor onze steenwol pluggen: groenteplanten opkweek, sierplanten, kruiden, enten en vertical farming. B2B oplossingen voor professionele glastuinbouw.',
      keywords: ['glastuinbouw toepassingen', 'groenteplanten opkweek', 'sierplanten kweek', 'vertical farming', 'hydroponics', 'enten tomaat paprika']
    },
    en: {
      title: 'Greenhouse Applications - Professional Growing',
      description: 'Discover applications for our rockwool plugs: vegetable propagation, ornamental plants, herbs, grafting and vertical farming. B2B solutions for professional greenhouse horticulture.',
      keywords: ['greenhouse applications', 'vegetable propagation', 'ornamental plant growing', 'vertical farming', 'hydroponics', 'tomato pepper grafting']
    },
    de: {
      title: 'Gewächshaus Anwendungen - Professioneller Anbau',
      description: 'Entdecken Sie Anwendungen für unsere Steinwollstecker: Gemüseanzucht, Zierpflanzen, Kräuter, Veredelung und Vertical Farming. B2B-Lösungen für professionellen Gewächshausgartenbau.',
      keywords: ['Gewächshaus Anwendungen', 'Gemüseanzucht', 'Zierpflanzenanbau', 'Vertical Farming', 'Hydroponik', 'Tomaten Paprika Veredelung']
    }
  }
  
  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/toepassingen/',
    en: '/applications/',
    de: '/anwendungen/'
  }
  
  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/toepassingen/'
  })
}

// Applications page component with modern styling
export default async function ApplicationsPage({ params }: { params: { locale: string } }) {
  // This is needed for internationalization to work properly
  unstable_setRequestLocale(params.locale)
  
  // Load messages manually for static export
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  
  // Pull applications translations from the messages
  const t = messages.applications

  return (
    <ApplicationsClient t={t} locale={params.locale} />
  )
}
