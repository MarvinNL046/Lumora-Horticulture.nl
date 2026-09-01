import Image from 'next/image'
import styles from '../storefront.module.css'

export function PaymentLogos() {
  return (
    <span
      className={styles.paymentLogos}
      role="img"
      aria-label="Betaalmethoden: iDEAL, Wero, Visa en Mastercard"
    >
      <Image src="/payment-methods/ideal-wero.svg" alt="" width={45} height={30} />
      <Image src="/payment-methods/visa.svg" alt="" width={45} height={30} />
      <Image src="/payment-methods/mastercard.svg" alt="" width={45} height={30} />
    </span>
  )
}
