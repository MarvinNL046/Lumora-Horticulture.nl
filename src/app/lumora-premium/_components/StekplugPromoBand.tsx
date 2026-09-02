import Link from 'next/link'
import styles from '../storefront.module.css'
import { ArrowRightIcon, CheckIcon } from './Icons'
import { publicStorefrontRoutes } from '../_data/routes'
import { sharedCopy } from '../_data/storefront-content'
import type { StorefrontLocale } from './storefront-localization'

export function StekplugPromoBand({ href = `${publicStorefrontRoutes.stekpluggen}#koopblok`, locale = 'nl' }: { href?: string; locale?: StorefrontLocale }) {
  const copy = sharedCopy[locale]
  return (
    <section className={styles.promoBand} aria-label={copy.promoAria}>
      <Link className={styles.promoBandInner} href={href}>
        <span className={styles.promoBandBadge}>{copy.promoBadge}</span>
        <span className={styles.promoBandCopy}>
          <strong>{copy.promoTitle}</strong>
          <small><CheckIcon /> {copy.promoPrice} <i /> {copy.promoChoice} <i /> {copy.promoShipping}</small>
        </span>
        <span className={styles.promoBandAction}>{copy.promoAction} <ArrowRightIcon /></span>
      </Link>
    </section>
  )
}
