import Link from 'next/link'
import { localizePathForLocale } from '@/lib/url-localizations'
import styles from './account.module.css'

type Locale = 'nl' | 'en' | 'de'

export default function AccountMobileNav({ locale, active }: { locale: Locale; active: 'account' | 'orders' }) {
  const t = {
    nav: locale === 'de' ? 'Kundenkonto-Navigation' : locale === 'en' ? 'Customer account navigation' : 'Klantaccount navigatie',
    home: locale === 'de' ? 'Start' : 'Home',
    products: locale === 'de' ? 'Produkte' : locale === 'en' ? 'Products' : 'Producten',
    account: locale === 'de' ? 'Konto' : 'Account',
    orders: locale === 'de' ? 'Bestellungen' : locale === 'en' ? 'Orders' : 'Bestellingen',
    cart: locale === 'de' ? 'Warenkorb' : locale === 'en' ? 'Cart' : 'Mandje',
  }

  return (
    <nav className={styles.accountMobileNav} aria-label={t.nav}>
      <Link href={localizePathForLocale('/', locale)}><HomeIcon /><span>{t.home}</span></Link>
      <Link href={localizePathForLocale('/products', locale)}><GridIcon /><span>{t.products}</span></Link>
      <Link className={active === 'account' ? styles.accountMobileActive : ''} href={localizePathForLocale('/account', locale)}><UserIcon /><span>{t.account}</span></Link>
      <Link className={active === 'orders' ? styles.accountMobileActive : ''} href={localizePathForLocale('/account/orders', locale)}><BoxIcon /><span>{t.orders}</span></Link>
      <Link href={localizePathForLocale('/winkelmand', locale)}><BagIcon /><span>{t.cart}</span></Link>
    </nav>
  )
}

function Base({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg> }
function HomeIcon(){return <Base><path d="m3 10 9-7 9 7M5.5 9.5V21h13V9.5M9.5 21v-7h5v7"/></Base>}
function GridIcon(){return <Base><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></Base>}
function UserIcon(){return <Base><circle cx="12" cy="8" r="4"/><path d="M4.8 21a7.2 7.2 0 0 1 14.4 0"/></Base>}
function BoxIcon(){return <Base><path d="M6 3h12l2 5v13H4V8l2-5ZM4 8h16"/></Base>}
function BagIcon(){return <Base><path d="M5 8h14l-1 13H6L5 8ZM9 9V6a3 3 0 0 1 6 0v3"/></Base>}
