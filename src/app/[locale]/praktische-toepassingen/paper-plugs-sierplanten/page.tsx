import { unstable_setRequestLocale } from 'next-intl/server'
import PaperPlugsSierplantenClient from './PageClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for all locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Paper Plug Trays voor Sierplanten: Efficiënte Bloemenproductie | Lumora',
      description: 'Professionele sierplantenproductie met paper plug trays. Uniformiteit, kwaliteit en efficiency voor bloemen, vaste planten en containerteelt. 35% snellere productie. Bestel direct.',
      keywords: [
        'paper plugs sierplanten',
        'bloementeelt paper plugs',
        'ornamentals propagatie',
        'vaste planten kweken',
        'containerteelt',
        'bloemenproductie',
        'bedding plants',
        'potplanten kweken',
        'uniforme groei sierplanten',
        'grootschalige bloementeelt'
      ]
    },
    en: {
      title: 'Paper Plug Trays for Ornamental Plants: Efficient Flower Production | Lumora',
      description: 'Professional ornamental plant production with paper plug trays. Uniformity, quality and efficiency for flowers, perennials and container cultivation. 35% faster production. Order direct.',
      keywords: [
        'paper plugs ornamentals',
        'flower cultivation paper plugs',
        'ornamental propagation',
        'perennials growing',
        'container cultivation',
        'flower production',
        'bedding plants',
        'potted plant growing',
        'uniform ornamental growth',
        'large scale flower cultivation'
      ]
    },
    de: {
      title: 'Paper Plug Trays für Zierpflanzen: Effiziente Blumenproduktion | Lumora',
      description: 'Professionelle Zierpflanzenproduktion mit Paper Plug Trays. Gleichmäßigkeit, Qualität und Effizienz für Blumen, Stauden und Containeranbau. 35% schnellere Produktion. Direkt bestellen.',
      keywords: [
        'paper plugs zierpflanzen',
        'blumenanbau paper plugs',
        'zierpflanzen vermehrung',
        'stauden züchten',
        'containeranbau',
        'blumenproduktion',
        'beetpflanzen',
        'topfpflanzen züchten',
        'gleichmäßiges zierpflanzen wachstum',
        'großflächiger blumenanbau'
      ]
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/toepassingen/paper-plugs-sierplanten',
    en: '/seo/applications/paper-plugs-ornamentals',
    de: '/seo/anwendungen/paper-plugs-zierpflanzen'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || localePaths.nl
  })
}

// SEO Landing page - Pillar 2, Subpillar 2.2
export default async function PaperPlugsSierplantenPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  return <PaperPlugsSierplantenClient locale={params.locale} />
}
