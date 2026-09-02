import Link from 'next/link'
import styles from '../storefront.module.css'
import { ArrowRightIcon, CheckIcon } from './Icons'
import { publicStorefrontRoutes } from '../_data/routes'

export function StekplugPromoBand({ href = `${publicStorefrontRoutes.stekpluggen}#koopblok` }: { href?: string }) {
  return (
    <section className={styles.promoBand} aria-label="2 plus 1 gratis stekpluggenactie">
      <Link className={styles.promoBandInner} href={href}>
        <span className={styles.promoBandBadge}>2 + 1 gratis</span>
        <span className={styles.promoBandCopy}>
          <strong>Koop 2 dozen Stekpluggen, ontvang 1 doos gratis</strong>
          <small><CheckIcon /> 3 dozen voor €180 <i /> Kies 84 of 104 <i /> Verzending inbegrepen</small>
        </span>
        <span className={styles.promoBandAction}>Bekijk de actie <ArrowRightIcon /></span>
      </Link>
    </section>
  )
}
