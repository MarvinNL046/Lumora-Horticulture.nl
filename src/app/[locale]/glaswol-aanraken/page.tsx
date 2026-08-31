import { unstable_setRequestLocale } from 'next-intl/server'
import GlaswolAanrakenClient from './GlaswolAanrakenClient'
import { generatePageMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const metadata = {
    nl: {
      title: 'Wat als je Glaswol Aanraakt? | Veiligheid | Lumora',
      description: 'Wat gebeurt er als je glaswol aanraakt? Verschil tussen glaswol en steenwol. Veiligheidstips en wat te doen bij contact.',
      keywords: ['glaswol aanraken', 'glaswol vs steenwol', 'glaswol gevaarlijk', 'huidirritatie', 'veiligheid']
    },
    en: {
      title: 'What if You Touch Fiberglass? | Safety | Lumora',
      description: 'What happens when you touch fiberglass? Difference between fiberglass and rockwool. Safety tips and what to do on contact.',
      keywords: ['touch fiberglass', 'fiberglass vs rockwool', 'fiberglass dangerous', 'skin irritation', 'safety']
    },
    de: {
      title: 'Was passiert wenn man Glaswolle berührt? | Sicherheit | Lumora',
      description: 'Was passiert, wenn Sie Glaswolle berühren? Unterschied zwischen Glaswolle und Steinwolle. Sicherheitstipps und was bei Kontakt zu tun ist.',
      keywords: ['glaswolle berühren', 'glaswolle vs steinwolle', 'glaswolle gefährlich', 'hautreizung']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = { nl: '/glaswol-aanraken/', en: '/touching-fiberglass/', de: '/glaswolle-beruehren/' }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/glaswol-aanraken/'
  })
}

export default async function GlaswolAanrakenPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  unstable_setRequestLocale(params.locale)
  const messages = (await import(`../../../messages/${params.locale}/common.json`)).default
  return <GlaswolAanrakenClient t={messages} locale={params.locale} />
}
