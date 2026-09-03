import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { localizePathForLocale } from '@/lib/url-localizations'
import {
  ContentCta,
  ContentHero,
  ContentPage,
  ContentSection,
  FeatureGrid,
} from '@/app/lumora-premium/_components/ContentPage'
import { resolveStorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'
import { getLocalizedProducts } from '@/app/lumora-premium/_data/storefront-content'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

const uiCopy = {
  nl: { products: 'Bekijk de Paper Plug Trays', imageLabel: 'Paper Plug Tray 84 in de opkweek', ctaEyebrow: 'Persoonlijk advies' },
  en: { products: 'View the Paper Plug Trays', imageLabel: 'Paper Plug Tray 84 in propagation', ctaEyebrow: 'Personal advice' },
  de: { products: 'Paper Plug Trays ansehen', imageLabel: 'Paper Plug Tray 84 in der Anzucht', ctaEyebrow: 'Persönliche Beratung' },
} as const

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const metadata = {
    nl: {
      title: 'Toepassingen Glastuinbouw - Professionele Kweek',
      description: 'Ontdek toepassingen voor onze steenwol pluggen: groenteplanten opkweek, sierplanten, kruiden, enten en vertical farming. B2B oplossingen voor professionele glastuinbouw.',
      keywords: ['glastuinbouw toepassingen', 'groenteplanten opkweek', 'sierplanten kweek', 'vertical farming', 'hydroponics', 'enten tomaat paprika']
    },
    en: {
      title: 'Greenhouse Applications - Professional Growing',
      description: 'Discover applications for our rockwool plugs: vegetable propagation, ornamental plants, herbs, grafting and vertical farming. B2B solutions for professional greenhouse horticulture.',
      keywords: ['greenhouse applications', 'vegetable propagation', 'ornamental plant growing', 'vertical farming', 'hydroponics', 'tomato pepper grafting']
    },
    de: {
      title: 'Gewächshaus Anwendungen - Professioneller Anbau',
      description: 'Entdecken Sie Anwendungen für unsere Steinwollstecker: Gemüseanzucht, Zierpflanzen, Kräuter, Veredelung und Vertical Farming. B2B-Lösungen für professionellen Gewächshausgartenbau.',
      keywords: ['Gewächshaus Anwendungen', 'Gemüseanzucht', 'Zierpflanzenanbau', 'Vertical Farming', 'Hydroponik', 'Tomaten Paprika Veredelung']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/toepassingen/',
    en: '/applications/',
    de: '/anwendungen/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/toepassingen/'
  })
}

type ApplicationItem = { title: string; description: string; benefits?: string[]; examples?: string[] }

export default async function ApplicationsPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = resolveStorefrontLocale(params.locale)
  const messages = (await import(`../../../messages/${locale}/common.json`)).default
  const t = messages.applications
  const ui = uiCopy[locale]
  const products = getLocalizedProducts(locale)
  const plugsHref = localizePathForLocale('/stekpluggen-steenwol', locale)
  const items = Object.values(t.items as Record<string, ApplicationItem>)

  return (
    <ContentPage>
      <ContentHero
        locale={locale}
        breadcrumb={t.title.tag}
        eyebrow={t.title.tag}
        title={t.title.main}
        lead={t.title.subtitle}
        actions={[
          { href: plugsHref, label: ui.products },
          { href: 'mailto:info@lumorahorticulture.com', label: t.cta.contactUs, variant: 'light' },
        ]}
        image={products.paperbus.usageImage ?? products.paperbus.mainImage}
        imageAlt={products.paperbus.usageImageAlt ?? products.paperbus.mainImageAlt}
        caption={{ small: products.paperbus.name, strong: ui.imageLabel }}
      />

      <ContentSection eyebrow={t.title.tag} title={t.section.title} intro={t.section.subtitle} soft>
        <FeatureGrid
          numbered
          items={items.map((item) => ({
            title: item.title,
            text: item.benefits?.length ? `${item.description}. ${item.benefits[0]}.` : item.description,
            chips: item.examples,
          }))}
        />
      </ContentSection>

      <ContentCta
        eyebrow={ui.ctaEyebrow}
        title={t.cta.title ?? t.section.title}
        text={t.cta.description}
        actions={[
          { href: 'mailto:info@lumorahorticulture.com', label: t.cta.contactUs },
          { href: plugsHref, label: ui.products, variant: 'ghost' },
        ]}
      />
    </ContentPage>
  )
}
