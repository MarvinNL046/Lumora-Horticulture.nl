import EllepotFlyerClient from './EllepotFlyerClient'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

export default async function EllepotFlyerPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  // This is needed for internationalization to work properly

  return <EllepotFlyerClient />
}