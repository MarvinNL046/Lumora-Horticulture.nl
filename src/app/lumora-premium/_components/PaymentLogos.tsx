import Image from 'next/image'
import { useLocale } from 'next-intl'
import styles from '../storefront.module.css'

const labels = {
  nl: 'Betaalmethoden: iDEAL, Wero, Visa en Mastercard',
  en: 'Payment methods: iDEAL, Wero, Visa and Mastercard',
  de: 'Zahlungsmethoden: iDEAL, Wero, Visa und Mastercard',
} as const

export function PaymentLogos() {
  const locale = useLocale()
  const label = labels[locale === 'en' || locale === 'de' ? locale : 'nl']

  return (
    <span className={styles.paymentLogos} role="img" aria-label={label}>
      <Image src="/payment-methods/ideal-wero.svg" alt="" width={45} height={30} />
      <Image src="/payment-methods/visa.svg" alt="" width={45} height={30} />
      <Image src="/payment-methods/mastercard.svg" alt="" width={45} height={30} />
    </span>
  )
}
