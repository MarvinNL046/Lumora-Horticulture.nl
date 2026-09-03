import Link from 'next/link'
import { localizePathForLocale } from '@/lib/url-localizations'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import {
  CheckList,
  ContentCta,
  ContentHero,
  ContentPage,
  ContentSection,
  FactRow,
  FeatureGrid,
  Prose,
  contentStyles as styles,
} from './ContentPage'
import { ArrowRightIcon } from './Icons'
import type { StorefrontLocale } from './storefront-localization'
import { getLocalizedProducts } from '../_data/storefront-content'

// A knowledge article is plain data per locale; this renderer lays it out on
// the shared content layout and adds the product link, related articles and
// FAQ structured data.

export type KnowledgeSection =
  | { kind: 'prose'; title: string; paragraphs: string[] }
  | { kind: 'list'; title: string; intro?: string; items: string[] }
  | { kind: 'steps'; title: string; intro?: string; items: string[]; note?: string }
  | { kind: 'cards'; title: string; intro?: string; items: Array<{ title: string; text: string }> }
  | { kind: 'compare'; title: string; intro?: string; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { kind: 'facts'; title: string; intro?: string; facts: Array<{ value: string; label: string }> }
  | { kind: 'note'; title: string; text: string }

export type KnowledgeArticle = {
  tag: string
  title: string
  intro: string
  answer?: { title: string; text: string }
  sections: KnowledgeSection[]
  cta: { title: string; text: string; button: string }
  faq?: Array<{ question: string; answer: string }>
}

export type KnowledgeSlug =
  | 'glaswol-aanraken'
  | 'voordelen-nadelen-steenwol'
  | 'steenwol-vs-rockwool'
  | 'steenwol-vastzetten'
  | 'steenwol-longen'
  | 'levensduur-steenwol'
  | 'paper-plug-trays-uitgelegd'

export const knowledgeIndex: Record<KnowledgeSlug, Record<StorefrontLocale, string>> = {
  'paper-plug-trays-uitgelegd': { nl: 'Paper Plug Trays uitgelegd', en: 'Paper Plug Trays explained', de: 'Paper Plug Trays erklärt' },
  'voordelen-nadelen-steenwol': { nl: 'Voor- en nadelen van steenwol', en: 'Pros and cons of rockwool', de: 'Vor- und Nachteile von Steinwolle' },
  'steenwol-vs-rockwool': { nl: 'Is steenwol hetzelfde als ROCKWOOL?', en: 'Is rockwool the same as stone wool?', de: 'Ist Steinwolle dasselbe wie ROCKWOOL?' },
  'levensduur-steenwol': { nl: 'Levensduur van steenwol', en: 'Rockwool lifespan', de: 'Lebensdauer von Steinwolle' },
  'steenwol-vastzetten': { nl: 'Steenwol vastzetten', en: 'How to secure rockwool', de: 'Steinwolle befestigen' },
  'steenwol-longen': { nl: 'Is steenwol schadelijk voor de longen?', en: 'Is rockwool harmful to the lungs?', de: 'Ist Steinwolle schädlich für die Lunge?' },
  'glaswol-aanraken': { nl: 'Wat als je glaswol aanraakt?', en: 'What if you touch fiberglass?', de: 'Was passiert bei Kontakt mit Glaswolle?' },
}

const ui = {
  nl: { knowledge: 'Kennisbank', related: 'Verder lezen', product: 'Bekijk de Paper Plug Trays', contact: 'Stel je vraag', shortAnswer: 'Het korte antwoord' },
  en: { knowledge: 'Knowledge base', related: 'Further reading', product: 'View the Paper Plug Trays', contact: 'Ask your question', shortAnswer: 'The short answer' },
  de: { knowledge: 'Wissensdatenbank', related: 'Weiterlesen', product: 'Paper Plug Trays ansehen', contact: 'Frage stellen', shortAnswer: 'Die kurze Antwort' },
} as const

function Section({ section }: { section: KnowledgeSection }) {
  switch (section.kind) {
    case 'prose':
      return (
        <ContentSection title={section.title}>
          <Prose>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</Prose>
        </ContentSection>
      )
    case 'list':
      return (
        <ContentSection title={section.title} intro={section.intro} soft>
          <CheckList items={section.items} />
        </ContentSection>
      )
    case 'steps':
      return (
        <ContentSection title={section.title} intro={section.intro}>
          <ol className={styles.steps}>
            {section.items.map((item, index) => (
              <li key={item}><span>{index + 1}</span><p>{item}</p></li>
            ))}
          </ol>
          {section.note ? <p className={styles.noteBox}>{section.note}</p> : null}
        </ContentSection>
      )
    case 'cards':
      return (
        <ContentSection title={section.title} intro={section.intro} soft>
          <FeatureGrid items={section.items} />
        </ContentSection>
      )
    case 'compare':
      return (
        <ContentSection title={section.title} intro={section.intro} soft>
          <div className={`${styles.grid} ${styles.grid2}`}>
            <article className={styles.card}>
              <h3>{section.left.title}</h3>
              <CheckList items={section.left.items} single />
            </article>
            <article className={styles.card}>
              <h3>{section.right.title}</h3>
              <CheckList items={section.right.items} single />
            </article>
          </div>
        </ContentSection>
      )
    case 'facts':
      return (
        <ContentSection title={section.title} intro={section.intro} soft>
          <FactRow facts={section.facts} />
        </ContentSection>
      )
    case 'note':
      return (
        <ContentSection title={section.title}>
          <p className={styles.noteBox}>{section.text}</p>
        </ContentSection>
      )
  }
}

export function KnowledgePage({
  locale,
  slug,
  article,
}: {
  locale: StorefrontLocale
  slug: KnowledgeSlug
  article: KnowledgeArticle
}) {
  const copy = ui[locale]
  const products = getLocalizedProducts(locale)
  const productHref = localizePathForLocale('/stekpluggen-steenwol', locale)
  const related = (Object.keys(knowledgeIndex) as KnowledgeSlug[]).filter((key) => key !== slug).slice(0, 4)

  const jsonLd = article.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: { '@type': 'Answer', text: entry.answer },
        })),
      }
    : null

  return (
    <ContentPage>
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} /> : null}

      <ContentHero
        locale={locale}
        breadcrumb={copy.knowledge}
        eyebrow={article.tag}
        title={article.title}
        lead={article.intro}
        actions={[
          { href: productHref, label: copy.product },
          { href: 'mailto:info@lumorahorticulture.com', label: copy.contact, variant: 'light' },
        ]}
        image={products.paperbus.tertiaryImage ?? products.paperbus.mainImage}
        imageAlt={products.paperbus.tertiaryImageAlt ?? products.paperbus.mainImageAlt}
        caption={{ small: products.paperbus.name, strong: 'Ellepot FP 12+' }}
      />

      {article.answer ? (
        <section className={styles.section} style={{ paddingTop: 0 }}>
          <div className={styles.container}>
            <div className={styles.answerBox}>
              <span className={styles.eyebrow}>{article.answer.title || copy.shortAnswer}</span>
              <p>{article.answer.text}</p>
            </div>
          </div>
        </section>
      ) : null}

      {article.sections.map((section) => <Section key={section.title} section={section} />)}

      <ContentSection eyebrow={copy.knowledge} title={copy.related} soft>
        <div className={styles.relatedGrid}>
          {related.map((key) => (
            <Link key={key} className={styles.relatedLink} href={localizePathForLocale(`/${key}`, locale)}>
              <span>{knowledgeIndex[key][locale]}</span>
              <ArrowRightIcon />
            </Link>
          ))}
        </div>
      </ContentSection>

      <ContentCta
        eyebrow={products.paperbus.name}
        title={article.cta.title}
        text={article.cta.text}
        actions={[
          { href: productHref, label: article.cta.button },
          { href: 'mailto:info@lumorahorticulture.com', label: copy.contact, variant: 'ghost' },
        ]}
      />
    </ContentPage>
  )
}
