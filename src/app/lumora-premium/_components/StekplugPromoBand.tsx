import Link from 'next/link'
import styles from '../storefront.module.css'
import { ArrowRightIcon, CheckIcon } from './Icons'

export function StekplugPromoBand() {
  return (
    <section className={styles.promoBand} aria-label="Stekpluggen actie">
      <Link className={styles.promoBandInner} href="/lumora-premium/paperbus#koopblok">
        <span className={styles.promoBandBadge}>3 voor €180</span>
        <span className={styles.promoBandCopy}>
          <strong>3 dozen Stekpluggen Steenwol voor €180</strong>
          <small><CheckIcon /> Kies 84 of 104 <i /> Verzending inbegrepen</small>
        </span>
        <span className={styles.promoBandAction}>Bekijk de actie <ArrowRightIcon /></span>
      </Link>
    </section>
  )
}
