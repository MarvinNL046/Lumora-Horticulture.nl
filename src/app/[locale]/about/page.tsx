import { generatePageMetadata } from '@/lib/metadata'
import { localizePathForLocale } from '@/lib/url-localizations'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import {
  ContentCta,
  ContentHero,
  ContentPage,
  ContentSection,
  FeatureGrid,
  Prose,
  SplitPanel,
  SplitSection,
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
  nl: { products: 'Bekijk de producten', contact: 'Neem contact op', imageLabel: 'Paper Plug Trays in de kas', ourStory: 'Ons verhaal' },
  en: { products: 'View the products', contact: 'Contact us', imageLabel: 'Paper Plug Trays in the greenhouse', ourStory: 'Our story' },
  de: { products: 'Produkte ansehen', contact: 'Kontakt aufnehmen', imageLabel: 'Paper Plug Trays im Gewächshaus', ourStory: 'Unsere Geschichte' },
} as const

// Generate metadata for about page
export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const metadata = {
    nl: {
      title: 'Over Lumora Horticulture',
      description: 'Maak kennis met Lumora Horticulture, specialist in professionele Paper Plug Trays en gerichte botanische bladverzorging voor kwekers en plantenliefhebbers.',
      keywords: ['over lumora horticulture', 'paper plug trays', 'stekpluggen steenwol', 'botanische bladverzorging', 'NeemXPRO']
    },
    en: {
      title: 'About Lumora Horticulture',
      description: 'Meet Lumora Horticulture, specialist in professional Paper Plug Trays and targeted botanical plant care for growers and plant enthusiasts.',
      keywords: ['about lumora horticulture', 'paper plug trays', 'horticulture supplier', 'botanical plant care']
    },
    de: {
      title: 'Über Lumora Horticulture',
      description: 'Lernen Sie Lumora Horticulture kennen, Spezialist für professionelle Paper Plug Trays und gezielte botanische Pflanzenpflege.',
      keywords: ['über lumora horticulture', 'Paper Plug Trays', 'Gartenbau Lieferant', 'botanische Pflanzenpflege']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/over-ons/',
    en: '/about/',
    de: '/uber-uns/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/over-ons/'
  })
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = resolveStorefrontLocale(params.locale)
  const messages = (await import(`../../../messages/${locale}/common.json`)).default
  const t = messages.about
  const ui = uiCopy[locale]
  const products = getLocalizedProducts(locale)
  const productsHref = localizePathForLocale('/products', locale)
  const contactHref = localizePathForLocale('/contact', locale)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'de' ? 'Startseite' : 'Home', item: `https://lumorahorticulture.nl${localizePathForLocale('/', locale)}` },
      { '@type': 'ListItem', position: 2, name: t.title.tag, item: `https://lumorahorticulture.nl${localizePathForLocale('/about', locale)}` },
    ],
  }

  return (
    <ContentPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

      <ContentHero
        locale={locale}
        breadcrumb={t.title.tag}
        eyebrow={t.title.tag}
        title={t.title.main}
        lead={t.title.subtitle}
        actions={[
          { href: productsHref, label: ui.products },
          { href: contactHref, label: ui.contact, variant: 'light' },
        ]}
        image={products.paperbus.heroImage ?? products.paperbus.mainImage}
        imageAlt={products.paperbus.heroImageAlt ?? products.paperbus.mainImageAlt}
        caption={{ small: 'Lumora Horticulture', strong: ui.imageLabel }}
      />

      <ContentSection eyebrow={t.intro.title} title={t.ourStory.title} soft>
        <Prose>
          <p>{t.intro.description}</p>
          <p>{t.ourStory.description}</p>
        </Prose>
      </ContentSection>

      <SplitSection
        eyebrow={ui.ourStory}
        title={t.production.title}
        image={products.paperbus.tertiaryImage ?? products.paperbus.secondaryImage}
        imageAlt={products.paperbus.tertiaryImageAlt ?? products.paperbus.secondaryImageAlt}
        imageLabel={products.paperbus.name}
      >
        <Prose><p>{t.production.description}</p></Prose>
        <SplitPanel title={t.production.title} items={t.production.features} />
      </SplitSection>

      <ContentSection eyebrow="Lumora" title={t.whyUs.title} soft>
        <FeatureGrid
          columns={2}
          numbered
          items={t.whyUs.reasons.map((reason: { title: string; description: string }) => ({ title: reason.title, text: reason.description }))}
        />
      </ContentSection>

      <ContentSection title={t.certifications.title}>
        <Prose><p>{t.certifications.description}</p></Prose>
      </ContentSection>

      <ContentCta
        eyebrow={t.title.tag}
        title={t.cta.title}
        text={t.cta.description}
        actions={[
          { href: 'mailto:info@lumorahorticulture.com', label: t.cta.button },
          { href: productsHref, label: ui.products, variant: 'ghost' },
        ]}
      />
    </ContentPage>
  )
}
