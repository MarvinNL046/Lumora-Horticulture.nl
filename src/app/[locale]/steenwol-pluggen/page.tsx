import { unstable_setRequestLocale } from 'next-intl/server'
import SteenwolPluggenClient from './SteenwolPluggenClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// CTR-optimized metadata for Steenwol Pluggen SEO landing page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Steenwol Pluggen Kopen | FP 12+ Kwaliteit | Gratis Verzending',
      description: 'Professionele steenwol pluggen met FP 12+ technologie. ✓ Optimale wortelontwikkeling ✓ Schimmelwerend ✓ Gratis verzending NL/BE/DE ✓ 24-48u levering. Bestel direct bij Lumora.',
      keywords: ['steenwol pluggen', 'steenwol pluggen kopen', 'rockwool plugs', 'hydrocultuur', 'glastuinbouw', 'propagatie', 'wortelontwikkeling', 'fp 12+', 'kweekmateriaal', 'professionele teelt']
    },
    en: {
      title: 'Buy Rockwool Plugs | FP 12+ Quality | Free Shipping',
      description: 'Professional rockwool plugs with FP 12+ technology. ✓ Optimal root development ✓ Fungal protection ✓ Free shipping NL/BE/DE ✓ 24-48h delivery. Order directly from Lumora.',
      keywords: ['rockwool plugs', 'buy rockwool plugs', 'hydroponics', 'greenhouse cultivation', 'propagation', 'root development', 'fp 12+', 'growing media', 'professional cultivation']
    },
    de: {
      title: 'Steinwolle Plugs Kaufen | FP 12+ Qualitat | Kostenloser Versand',
      description: 'Professionelle Steinwolle-Plugs mit FP 12+ Technologie. ✓ Optimale Wurzelentwicklung ✓ Pilzschutz ✓ Kostenloser Versand NL/BE/DE ✓ 24-48h Lieferung. Direkt bei Lumora bestellen.',
      keywords: ['steinwolle plugs', 'steinwolle plugs kaufen', 'hydrokultur', 'gewachshausanbau', 'vermehrung', 'wurzelentwicklung', 'fp 12+', 'anzuchtmedium', 'professioneller anbau']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/steenwol-pluggen/',
    en: '/rockwool-plugs/',
    de: '/steinwolle-stecklinge/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/steenwol-pluggen/'
  })
}

// SEO Landing page for Steenwol Pluggen
export default async function SteenwolPluggenPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  const t = messages

  return (
    <SteenwolPluggenClient t={t} locale={params.locale} />
  )
}
