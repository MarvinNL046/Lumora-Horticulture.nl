import Link from 'next/link'
import { redirect } from 'next/navigation'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/../convex/_generated/api'
import { convexServerAuth } from '@/lib/convex'
import { localizePathForLocale } from '@/lib/url-localizations'
import { stackServerApp } from '@/stack/server'
import AccountSignOut from './AccountSignOut'
import AccountMobileNav from './AccountMobileNav'
import styles from './account.module.css'

type Locale = 'nl' | 'en' | 'de'

export default async function AccountPage(props: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await props.params
  const locale = rawLocale as Locale
  const user = await stackServerApp.getUser()
  if (!user) redirect('/handler/signin')

  const orders = await fetchQuery(api.orders.listByAccountWithItems, {
    ...convexServerAuth(),
    user_id: user.id,
    verified_email: user.primaryEmailVerified ? user.primaryEmail?.trim().toLowerCase() : undefined,
  })

  const t = {
    eyebrow: locale === 'de' ? 'KUNDENKONTO' : locale === 'en' ? 'CUSTOMER ACCOUNT' : 'KLANTACCOUNT',
    title: locale === 'de' ? 'Schön, Sie wiederzusehen.' : locale === 'en' ? 'Good to see you again.' : 'Fijn je weer te zien.',
    intro: locale === 'de' ? 'Bestellungen, Rechnungen und Lieferungen an einem Ort.' : locale === 'en' ? 'Orders, invoices and deliveries together in one clear place.' : 'Bestellingen, facturen en bezorging overzichtelijk bij elkaar.',
    orders: locale === 'de' ? 'Bestellungen' : locale === 'en' ? 'Orders' : 'Bestellingen',
    active: locale === 'de' ? 'Unterwegs' : locale === 'en' ? 'In transit' : 'Onderweg',
    invoices: locale === 'de' ? 'Rechnungen' : locale === 'en' ? 'Invoices' : 'Facturen',
    recent: locale === 'de' ? 'Letzte Bestellungen' : locale === 'en' ? 'Recent orders' : 'Recente bestellingen',
    allOrders: locale === 'de' ? 'Alle Bestellungen' : locale === 'en' ? 'All orders' : 'Alle bestellingen',
    noOrders: locale === 'de' ? 'Noch keine Bestellungen' : locale === 'en' ? 'No orders yet' : 'Nog geen bestellingen',
    noOrdersCopy: locale === 'de' ? 'Ihre erste Bestellung erscheint hier automatisch.' : locale === 'en' ? 'Your first order will appear here automatically.' : 'Je eerste bestelling verschijnt hier automatisch.',
    shop: locale === 'de' ? 'Produkte ansehen' : locale === 'en' ? 'View products' : 'Bekijk producten',
    account: locale === 'de' ? 'Kontodaten' : locale === 'en' ? 'Account details' : 'Accountgegevens',
    email: locale === 'de' ? 'E-Mail-Adresse' : locale === 'en' ? 'Email address' : 'E-mailadres',
    verified: locale === 'de' ? 'Verifiziert' : locale === 'en' ? 'Verified' : 'Geverifieerd',
    addresses: locale === 'de' ? 'Adressen verwalten' : locale === 'en' ? 'Manage addresses' : 'Adressen beheren',
    logout: locale === 'de' ? 'Abmelden' : locale === 'en' ? 'Sign out' : 'Uitloggen',
    order: locale === 'de' ? 'Bestellung' : locale === 'en' ? 'Order' : 'Bestelling',
  }

  const activeOrders = orders.filter((order) => ['paid', 'processing', 'shipped'].includes(order.status)).length
  const invoiceCount = orders.filter((order) => order.payment_status === 'paid' || ['paid', 'processing', 'shipped', 'completed'].includes(order.status)).length

  return (
    <div className={styles.accountPage} data-account-dashboard>
      <div className={styles.accountContainer}>
        <header className={styles.dashboardHeader}>
          <div><span className={styles.eyebrow}>{t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p></div>
          <div className={styles.identityBadge} aria-label={user.primaryEmail || ''}>
            <span>{(user.displayName || user.primaryEmail || 'L').slice(0, 1).toUpperCase()}</span>
            <div><strong>{user.displayName || user.primaryEmail?.split('@')[0]}</strong><small>{user.primaryEmail}</small></div>
          </div>
        </header>

        <section className={styles.statGrid} aria-label="Accountoverzicht">
          <Link href={localizePathForLocale('/account/orders', locale)} className={styles.statCard}><span className={styles.statIcon}><OrdersIcon /></span><div><strong>{orders.length}</strong><small>{t.orders}</small></div><ArrowIcon /></Link>
          <Link href={localizePathForLocale('/account/orders', locale)} className={styles.statCard}><span className={styles.statIcon}><TruckIcon /></span><div><strong>{activeOrders}</strong><small>{t.active}</small></div><ArrowIcon /></Link>
          <Link href={localizePathForLocale('/account/orders', locale)} className={styles.statCard}><span className={styles.statIcon}><InvoiceIcon /></span><div><strong>{invoiceCount}</strong><small>{t.invoices}</small></div><ArrowIcon /></Link>
        </section>

        <div className={styles.dashboardGrid}>
          <section className={styles.panel}>
            <div className={styles.panelHeading}><div><span>{t.orders}</span><h2>{t.recent}</h2></div><Link href={localizePathForLocale('/account/orders', locale)}>{t.allOrders} <ArrowIcon /></Link></div>
            {orders.length === 0 ? (
              <div className={styles.emptyState}><span><OrdersIcon /></span><h3>{t.noOrders}</h3><p>{t.noOrdersCopy}</p><Link href="/lumora-premium/producten">{t.shop}</Link></div>
            ) : (
              <div className={styles.recentOrders}>{orders.slice(0, 3).map((order) => (
                <Link href={localizePathForLocale('/account/orders', locale)} key={order._id} className={styles.recentOrder}>
                  <span className={styles.orderThumb}><OrdersIcon /></span>
                  <div><strong>{order.order_number || `${t.order} ${String(order._id).slice(0, 8)}`}</strong><small>{new Date(order.created_at).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })} · {order.items.length} {productCountLabel(order.items.length, locale)}</small></div>
                  <b>{new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(order.total_amount)}</b><ArrowIcon />
                </Link>
              ))}</div>
            )}
          </section>

          <aside className={`${styles.panel} ${styles.accountPanel}`}>
            <span>{t.account}</span><h2>{user.displayName || user.primaryEmail?.split('@')[0]}</h2>
            <div className={styles.detailRow}><span>{t.email}</span><strong>{user.primaryEmail}</strong></div>
            {user.primaryEmailVerified && <div className={styles.verified}><CheckIcon /> {t.verified}</div>}
            <Link className={styles.secondaryAction} href={localizePathForLocale('/account/addresses', locale)}><PinIcon /> {t.addresses}</Link>
            <AccountSignOut label={t.logout} />
          </aside>
        </div>
      </div>
      <AccountMobileNav locale={locale} active="account" />
    </div>
  )
}

function IconBase({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg> }
function OrdersIcon() { return <IconBase><path d="M6 3h12l2 5v13H4V8l2-5Z"/><path d="M4 8h16M9 12h6"/></IconBase> }
function TruckIcon() { return <IconBase><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></IconBase> }
function InvoiceIcon() { return <IconBase><path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4"/></IconBase> }
function PinIcon() { return <IconBase><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></IconBase> }
function CheckIcon() { return <IconBase><path d="m5 12 4 4L19 6"/></IconBase> }
function ArrowIcon() { return <IconBase><path d="M5 12h14m-5-5 5 5-5 5"/></IconBase> }

function productCountLabel(count: number, locale: Locale) {
  if (locale === 'de') return count === 1 ? 'Produkt' : 'Produkte'
  if (locale === 'en') return count === 1 ? 'product' : 'products'
  return count === 1 ? 'product' : 'producten'
}
