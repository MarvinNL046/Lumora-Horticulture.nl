import { unstable_setRequestLocale } from 'next-intl/server'
import NeemxProFlyerClient from './NeemxProFlyerClient'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

export default async function NeemxProFlyerPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  // This is needed for internationalization to work properly
  unstable_setRequestLocale(params.locale)

  return <NeemxProFlyerClient locale={params.locale} />
}
