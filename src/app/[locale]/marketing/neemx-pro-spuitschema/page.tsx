import { unstable_setRequestLocale } from 'next-intl/server'
import NeemxProSpuitschemaClient from './NeemxProSpuitschemaClient'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

export default function NeemxProSpuitschemaPage({ params }: { params: { locale: string } }) {
  // This is needed for internationalization to work properly
  unstable_setRequestLocale(params.locale)

  return <NeemxProSpuitschemaClient locale={params.locale} />
}
