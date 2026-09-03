import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { localizePathForLocale } from '@/lib/url-localizations'
import { ArrowRightIcon, CheckIcon } from './Icons'
import type { StorefrontLocale } from './storefront-localization'
import styles from './content.module.css'

// Shared editorial layout for the content pages (about, contact,
// applications, knowledge pages). Server components only; no motion
// libraries, so the page is fully painted on first render.

export type ContentAction = {
  href: string
  label: string
  variant?: 'primary' | 'light' | 'ghost'
  download?: string
  external?: boolean
}

const homeLabel: Record<StorefrontLocale, string> = { nl: 'Home', en: 'Home', de: 'Startseite' }

export function ContentAction({ action }: { action: ContentAction }) {
  const className = action.variant === 'light'
    ? styles.buttonLight
    : action.variant === 'ghost'
      ? styles.buttonGhost
      : styles.button
  const content = <>{action.label} <ArrowRightIcon /></>

  if (action.download || action.external || action.href.startsWith('mailto:') || action.href.startsWith('http')) {
    return (
      <a
        className={className}
        href={action.href}
        download={action.download}
        target={action.external ? '_blank' : undefined}
        rel={action.external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }
  return <Link className={className} href={action.href}>{content}</Link>
}

export function ContentPage({ children }: { children: ReactNode }) {
  return <main className={styles.page}>{children}</main>
}

export function ContentHero({
  locale,
  eyebrow,
  title,
  lead,
  actions,
  image,
  imageAlt,
  caption,
  breadcrumb,
}: {
  locale: StorefrontLocale
  eyebrow: string
  title: string
  lead?: string
  actions?: ContentAction[]
  image?: string
  imageAlt?: string
  caption?: { small: string; strong: string }
  breadcrumb: string
}) {
  return (
    <>
      <nav className={`${styles.container} ${styles.breadcrumbs}`} aria-label="Breadcrumb">
        <Link href={localizePathForLocale('/', locale)}>{homeLabel[locale]}</Link>
        <span aria-hidden="true">/</span>
        <strong>{breadcrumb}</strong>
      </nav>
      <section className={styles.hero}>
        <div className={`${styles.container} ${image ? styles.heroGrid : ''}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><i /> {eyebrow}</span>
            <h1>{title}</h1>
            {lead ? <p className={styles.lead}>{lead}</p> : null}
            {actions?.length ? (
              <div className={styles.actions}>
                {actions.map((action) => <ContentAction key={action.href + action.label} action={action} />)}
              </div>
            ) : null}
          </div>
          {image ? (
            <div className={styles.heroVisual}>
              <Image src={image} alt={imageAlt ?? ''} fill priority sizes="(max-width: 1023px) 100vw, 48vw" />
              {caption ? (
                <div className={styles.heroCaption}>
                  <small>{caption.small}</small>
                  <strong>{caption.strong}</strong>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}

export function ContentSection({
  eyebrow,
  title,
  intro,
  soft = false,
  children,
  id,
}: {
  eyebrow?: string
  title?: string
  intro?: string
  soft?: boolean
  children: ReactNode
  id?: string
}) {
  return (
    <section className={`${styles.section} ${soft ? styles.sectionSoft : ''}`} id={id}>
      <div className={styles.container}>
        {title ? (
          <div className={styles.sectionHeading}>
            {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
            <h2>{title}</h2>
            {intro ? <p>{intro}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  )
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className={styles.prose}>{children}</div>
}

export function FeatureGrid({
  items,
  columns = 3,
  numbered = false,
}: {
  items: Array<{ title: string; text?: string; chips?: string[] }>
  columns?: 2 | 3
  numbered?: boolean
}) {
  return (
    <div className={`${styles.grid} ${columns === 2 ? styles.grid2 : ''}`}>
      {items.map((item, index) => (
        <article className={styles.card} key={item.title}>
          <span className={styles.cardIndex}>{numbered ? `0${index + 1}` : <CheckIcon />}</span>
          <h3>{item.title}</h3>
          {item.text ? <p>{item.text}</p> : null}
          {item.chips?.length ? (
            <div className={styles.chips}>{item.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
          ) : null}
        </article>
      ))}
    </div>
  )
}

export function CheckList({ items, single = false }: { items: string[]; single?: boolean }) {
  return (
    <ul className={`${styles.checkList} ${single ? styles.checkListSingle : ''}`}>
      {items.map((item) => (
        <li key={item}><CheckIcon /><span>{item}</span></li>
      ))}
    </ul>
  )
}

export function SplitSection({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  imageLabel,
  reverse = false,
  soft = false,
}: {
  eyebrow?: string
  title: string
  children: ReactNode
  image: string
  imageAlt: string
  imageLabel?: string
  reverse?: boolean
  soft?: boolean
}) {
  return (
    <section className={`${styles.section} ${soft ? styles.sectionSoft : ''}`}>
      <div className={`${styles.container} ${styles.split} ${reverse ? styles.splitReverse : ''}`}>
        <div>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <h2>{title}</h2>
          {children}
        </div>
        <div className={styles.splitImage}>
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 1023px) 100vw, 50vw" />
          {imageLabel ? <span>{imageLabel}</span> : null}
        </div>
      </div>
    </section>
  )
}

export function SplitPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={styles.splitPanel}>
      <h3>{title}</h3>
      <CheckList items={items} single />
    </div>
  )
}

export function FactRow({ facts }: { facts: Array<{ value: string; label: string }> }) {
  return (
    <div className={styles.facts}>
      {facts.map((fact) => (
        <div className={styles.fact} key={fact.label}>
          <strong>{fact.value}</strong>
          <small>{fact.label}</small>
        </div>
      ))}
    </div>
  )
}

export function ContentCta({
  eyebrow,
  title,
  text,
  actions,
}: {
  eyebrow?: string
  title: string
  text?: string
  actions: ContentAction[]
}) {
  return (
    <section className={styles.cta}>
      <div className={`${styles.container} ${styles.ctaInner}`}>
        <div>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <h2>{title}</h2>
          {text ? <p>{text}</p> : null}
        </div>
        <div className={styles.actions}>
          {actions.map((action) => <ContentAction key={action.href + action.label} action={action} />)}
        </div>
      </div>
    </section>
  )
}

export { styles as contentStyles }
