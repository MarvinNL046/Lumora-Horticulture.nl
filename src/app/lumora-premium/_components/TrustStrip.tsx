import styles from '../storefront.module.css'
import { MessageIcon, ShieldIcon, TruckIcon } from './Icons'
import { PaymentLogos } from './PaymentLogos'

const items = [
  {
    icon: TruckIcon,
    title: 'Gratis verzending',
    text: 'Binnen Nederland, België en Duitsland',
  },
  {
    icon: ShieldIcon,
    title: 'Veilig afrekenen',
    paymentLogos: true,
  },
  {
    icon: MessageIcon,
    title: 'Hulp bij je keuze',
    text: 'Rechtstreeks contact met Lumora',
  },
]

export function TrustStrip() {
  return (
    <section className={styles.trustStrip} aria-label="Servicevoordelen">
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
