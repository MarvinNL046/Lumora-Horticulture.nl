import { unstable_setRequestLocale } from 'next-intl/server'
import SteenwolLongenClient from './SteenwolLongenClient'
import { generatePageMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Is Steenwol Schadelijk voor de Longen? | Veiligheid Info | Lumora',
      description: 'Alles over de veiligheid van steenwol. Is het schadelijk voor de longen? Welke voorzorgsmaatregelen moet je nemen? Lees de complete veiligheidsinformatie.',
      keywords: ['steenwol schadelijk', 'steenwol longen', 'steenwol veiligheid', 'werkkleding', 'bescherming', 'veilig werken']
    },
    en: {
      title: 'Is Rockwool Harmful to Lungs? | Safety Info | Lumora',
      description: 'Everything about rockwool safety. Is it harmful to lungs? What precautions should you take? Read complete safety information.',
      keywords: ['rockwool harmful', 'rockwool lungs', 'rockwool safety', 'work clothing', 'protection', 'safe work']
    },
    de: {
      title: 'Ist Steinwolle Schädlich für die Lunge? | Sicherheitsinfo | Lumora',
      description: 'Alles über Steinwolle-Sicherheit. Ist es schädlich für die Lunge? Welche Vorsichtsmaßnahmen sollten Sie treffen? Lesen Sie vollständige Sicherheitsinformationen.',
      keywords: ['steinwolle schädlich', 'steinwolle lunge', 'steinwolle sicherheit', 'arbeitskleidung', 'schutz']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = { nl: '/steenwol-longen/', en: '/rockwool-lungs/', de: '/steinwolle-lunge/' }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/steenwol-longen/'
  })
}

export default async function SteenwolLongenPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  return <SteenwolLongenClient t={messages} locale={params.locale} />
}
