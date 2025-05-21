import { unstable_setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

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
  // Load messages manually for static export
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  
  // Pull applications translations from the messages
  const t = messages.applications
  
  return {
    title: t?.title?.main || 'Applications in Greenhouse Horticulture',
    description: t?.title?.subtitle || 'Our plugs are perfectly suited for various application areas'
  }
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
