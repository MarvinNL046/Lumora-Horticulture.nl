import { Metadata } from 'next'
import NeemxProClient from './NeemxProClient'
import { localizePathForLocale } from '@/lib/url-localizations'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
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
  const siteOrigin = 'https://lumorahorticulture.nl'
  const canonical = `${siteOrigin}${localizePathForLocale('/neemx-pro', locale)}`

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: canonical,
      siteName: 'Lumora Horticulture',
      images: [
        {
          url: `${siteOrigin}/productAfbeeldingen/neemxpro/neemxpro-logo.png`,
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
      canonical,
      languages: {
        'nl': 'https://lumorahorticulture.nl/neemx-pro',
        'en': 'https://lumorahorticulture.nl/en/neemx-pro',
        'de': 'https://lumorahorticulture.nl/de/neemx-pro',
        'x-default': 'https://lumorahorticulture.nl/neemx-pro',
      },
    },
  }
}

export default async function NeemxProPage(props: Props) {
  const params = await props.params;
  return <NeemxProClient locale={params.locale} />
}
