import { Metadata } from 'next'
import NeemxProClient from './NeemxProClient'

interface Props {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params

  const meta = {
    nl: {
      title: 'NEEMX PRO | 100% Natuurlijk Botanisch Olieconcentraat | Lumora',
      description: 'NEEMX PRO - Premium plantaardig olieconcentraat voor professionele bladverzorging. Voorkom en verminder insectendruk zoals spint. 100% natuurlijk, zeer geconcentreerd.',
      keywords: 'neemx pro, neem olie, botanisch olieconcentraat, spint bestrijding, plantenverzorging, natuurlijk gewasbescherming, bladverzorging'
    },
    en: {
      title: 'NEEMX PRO | 100% Natural Botanical Oil Concentrate | Lumora',
      description: 'NEEMX PRO - Premium botanical oil concentrate for professional leaf care. Prevent and reduce insect pressure like spider mites. 100% natural, highly concentrated.',
      keywords: 'neemx pro, neem oil, botanical oil concentrate, spider mite control, plant care, natural crop protection, leaf care'
    },
    de: {
      title: 'NEEMX PRO | 100% Natürliches Botanisches Ölkonzentrat | Lumora',
      description: 'NEEMX PRO - Premium botanisches Ölkonzentrat für professionelle Blattpflege. Verhindern und reduzieren Sie Insektendruck wie Spinnmilben. 100% natürlich, hochkonzentriert.',
      keywords: 'neemx pro, neemöl, botanisches ölkonzentrat, spinnmilbenbekämpfung, pflanzenpflege, natürlicher pflanzenschutz, blattpflege'
    }
  }

  const currentMeta = meta[locale as keyof typeof meta] || meta.nl
  const domain = locale === 'de' ? 'lumorahorticulture.de' : locale === 'en' ? 'lumorahorticulture.com' : 'lumorahorticulture.nl'

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: `https://${domain}/neemx-pro`,
      siteName: 'Lumora Horticulture',
      images: [
        {
          url: `https://${domain}/productAfbeeldingen/neemxpro/neemxpro-logo.png`,
          width: 1200,
          height: 630,
          alt: 'NEEMX PRO Botanical Oil Concentrate',
        },
      ],
      locale: locale === 'de' ? 'de_DE' : locale === 'en' ? 'en_US' : 'nl_NL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description,
    },
    alternates: {
      canonical: `https://${domain}/neemx-pro`,
      languages: {
        'nl': 'https://lumorahorticulture.nl/neemx-pro',
        'en': 'https://lumorahorticulture.com/neemx-pro',
        'de': 'https://lumorahorticulture.de/neemx-pro',
      },
    },
  }
}

export default function NeemxProPage({ params }: Props) {
  return <NeemxProClient locale={params.locale} />
}
