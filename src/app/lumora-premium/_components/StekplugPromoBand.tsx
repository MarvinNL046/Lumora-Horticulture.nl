import Link from 'next/link'
import styles from '../storefront.module.css'
import { ArrowRightIcon, CheckIcon } from './Icons'
import { publicStorefrontRoutes } from '../_data/routes'
import { sharedCopy } from '../_data/storefront-content'
import type { StorefrontLocale } from './storefront-localization'

export function StekplugPromoBand({ href = `${publicStorefrontRoutes.stekpluggen}#koopblok`, locale = 'nl' }: { href?: string; locale?: StorefrontLocale }) {
  const copy = sharedCopy[locale]
  const promoAria = locale === 'en' ? 'Paper Plug Tray special offer' : locale === 'de' ? 'Paper Plug Tray Sonderaktion' : copy.promoAria
  const promoTitle = locale === 'en'
    ? 'Buy 2 boxes of Paper Plug Trays + get 1 free'
    : locale === 'de'
      ? '2 Kartons Paper Plug Trays kaufen + 1 gratis'
      : copy.promoTitle
  return (
    <section className={styles.promoBand} aria-label={promoAria}>
      <Link className={styles.promoBandInner} href={href}>
        <span className={styles.promoBandBadge}>{copy.promoBadge}</span>
        <span className={styles.promoBandCopy}>
          <strong>{promoTitle}</strong>
          <small><CheckIcon /> {copy.promoPrice} <i /> {copy.promoChoice} <i /> {copy.promoShipping}</small>
        </span>
        <span className={styles.promoBandAction}>{copy.promoAction} <ArrowRightIcon /></span>
      </Link>
    </section>
  )
}
