'use client'

import Image from 'next/image'
import { useLocale } from 'next-intl'
import styles from './LumoraLoadingScreen.module.css'

const copy = {
  nl: {
    label: 'Pagina wordt geladen',
    title: 'Even geduld.',
    message: 'De volgende pagina wordt voor je klaargezet.',
  },
  en: {
    label: 'Page is loading',
    title: 'One moment.',
    message: 'The next page is being prepared for you.',
  },
  de: {
    label: 'Seite wird geladen',
    title: 'Einen Moment.',
    message: 'Die nächste Seite wird für Sie vorbereitet.',
  },
} as const

export default function LumoraLoadingScreen() {
  const locale = useLocale()
  const text = copy[locale === 'en' || locale === 'de' ? locale : 'nl']

  return (
    <div className={styles.screen} role="status" aria-live="polite" aria-label={text.label}>
      <div className={styles.content}>
        <div className={styles.logoFrame} aria-hidden="true">
          <Image
            className={styles.logo}
            src="/brand/lumora-horticulture-logo.avif"
            alt=""
            width={66}
            height={66}
            priority
          />
        </div>
        <p className={styles.eyebrow}>Lumora Horticulture</p>
        <p className={styles.title}>{text.title}</p>
        <p className={styles.message}>{text.message}</p>
        <div className={styles.track} aria-hidden="true">
          <span className={styles.bar} />
        </div>
      </div>
    </div>
  )
}
