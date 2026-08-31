import NeemxProSpuitschemaClient from './NeemxProSpuitschemaClient'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

export default async function NeemxProSpuitschemaPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  // This is needed for internationalization to work properly

  return <NeemxProSpuitschemaClient locale={params.locale} />
}
