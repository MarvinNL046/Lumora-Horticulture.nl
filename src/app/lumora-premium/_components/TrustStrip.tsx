import styles from '../storefront.module.css'
import { MessageIcon, ShieldIcon, TruckIcon } from './Icons'
import { PaymentLogos } from './PaymentLogos'
import { sharedCopy } from '../_data/storefront-content'
import type { StorefrontLocale } from './storefront-localization'

export function TrustStrip({ locale = 'nl' }: { locale?: StorefrontLocale }) {
  const copy = sharedCopy[locale]
  const items = [
    { icon: TruckIcon, title: copy.freeShipping, text: copy.shippingRegion },
    { icon: ShieldIcon, title: copy.secureCheckout, paymentLogos: true },
    { icon: MessageIcon, title: copy.helpChoice, text: copy.directContact },
  ]
  return (
    <section className={styles.trustStrip} aria-label={copy.secureCheckout}>
      <div className={`${styles.container} ${styles.trustGrid}`}>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div className={styles.trustItem} key={item.title}>
              <span className={styles.trustIcon}>
                <Icon />
              </span>
              <span>
                <strong>{item.title}</strong>
                {item.paymentLogos ? <PaymentLogos /> : <small>{item.text}</small>}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
