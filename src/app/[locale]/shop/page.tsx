import { unstable_setRequestLocale } from 'next-intl/server'
import ShopClient from './ShopClient'
import { generatePageMetadata } from '@/lib/metadata'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// CTR-optimized metadata for shop page
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Webshop | Steenwol Pluggen & Trays | Gratis Verzending',
      description: 'Bestel steenwol pluggen, paper plug trays en kweekmateriaal. ✓ Gratis verzending ✓ Binnen 48 uur geleverd ✓ Staffelkorting tot 20% ✓ Op voorraad. Direct bestellen bij Lumora.',
      keywords: ['steenwol pluggen kopen', 'paper plug trays bestellen', 'kweektrays webshop', 'tuinbouw benodigdheden', 'staffelkorting', 'B2B webshop']
    },
    en: {
      title: 'Shop | Rockwool Plugs & Trays | Free Shipping',
      description: 'Order rockwool plugs, paper plug trays and growing materials. ✓ Free shipping ✓ Delivered within 48 hours ✓ Volume discounts up to 20% ✓ In stock. Order directly from Lumora.',
      keywords: ['buy rockwool plugs', 'order paper plug trays', 'growing trays shop', 'horticulture supplies', 'volume discount', 'B2B webshop']
    },
    de: {
      title: 'Webshop | Steinwolle Plugs & Trays | Kostenloser Versand',
      description: 'Bestellen Sie Steinwolle-Plugs, Paper-Plug-Trays und Anzuchtmaterial. ✓ Kostenloser Versand ✓ Lieferung innerhalb 48 Stunden ✓ Mengenrabatt bis 20% ✓ Auf Lager. Direkt bei Lumora bestellen.',
      keywords: ['Steinwolle Plugs kaufen', 'Paper Plug Trays bestellen', 'Anzuchtschalen Shop', 'Gartenbau Zubehör', 'Mengenrabatt', 'B2B Webshop']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/winkel/',
    en: '/shop/',
    de: '/shop/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/winkel/'
  })
}

export default async function ShopPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  return <ShopClient locale={params.locale} />
}
