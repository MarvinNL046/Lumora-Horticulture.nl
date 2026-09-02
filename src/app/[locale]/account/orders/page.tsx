import Link from 'next/link'
import { redirect } from 'next/navigation'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/../convex/_generated/api'
import { convexServerAuth } from '@/lib/convex'
import { localizePathForLocale } from '@/lib/url-localizations'
import { getLocalizedCartItemName } from '@/app/lumora-premium/_data/storefront-content'
import { stackServerApp } from '@/stack/server'
import styles from '../account.module.css'
import AccountMobileNav from '../AccountMobileNav'

type Locale = 'nl' | 'en' | 'de'

export default async function OrdersPage(props: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await props.params
  const locale = rawLocale as Locale
  const user = await stackServerApp.getUser()
  if (!user) redirect(`/handler/sign-in?lang=${locale}`)

  const orders = await fetchQuery(api.orders.listByAccountWithItems, {
    ...convexServerAuth(), user_id: user.id,
    verified_email: user.primaryEmailVerified ? user.primaryEmail?.trim().toLowerCase() : undefined,
  })
  const t = copy(locale)

  return (
    <div className={styles.accountPage} data-account-dashboard>
      <div className={styles.accountContainer}>
        <Link className={styles.backLink} href={localizePathForLocale('/account', locale)}>← {t.back}</Link>
        <header className={styles.ordersHeader}><span className={styles.eyebrow}>{t.eyebrow}</span><h1>{t.title}</h1><p>{t.intro}</p></header>
        {orders.length === 0 ? (
          <section className={`${styles.panel} ${styles.emptyState}`}><span><OrdersIcon /></span><h2>{t.empty}</h2><p>{t.emptyCopy}</p><Link href={localizePathForLocale('/products', locale)}>{t.shop}</Link></section>
        ) : (
          <div className={styles.orderList}>
            {orders.map((order) => {
              const paid = order.payment_status === 'paid' || ['paid', 'processing', 'shipped', 'completed'].includes(order.status)
              const deliveryLabel = typeof order.delivery_preference?.label === 'string' ? order.delivery_preference.label : undefined
              return (
                <article className={styles.orderCard} key={order._id}>
                  <header className={styles.orderCardHeader}>
                    <div><span>{t.orderNumber}</span><h2>{order.order_number || `#${String(order._id).slice(0, 8)}`}</h2></div>
                    <div><span>{t.date}</span><strong>{new Date(order.created_at).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}</strong></div>
                    <div><span>{t.total}</span><strong>{new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(order.total_amount)}</strong></div>
                    <StatusPill status={order.status} locale={locale} />
                  </header>

                  {(order.tracking_url || order.shipment_status || deliveryLabel) && (
                    <div className={styles.deliveryBox}>
                      <span className={styles.deliveryIcon}><TruckIcon /></span>
                      <div><span>{t.delivery}</span><strong>{shipmentLabel(order.shipment_status, locale, order.status)}</strong>{order.tracking_code ? <small>Track & Trace: {order.tracking_code}</small> : deliveryLabel ? <small>{deliveryLabel}</small> : null}</div>
                      {order.tracking_url && <a href={order.tracking_url} target="_blank" rel="noopener noreferrer">{t.track} <ArrowIcon /></a>}
                    </div>
                  )}

                  <div className={styles.orderItems}>{order.items.map((item) => (
                    <div className={styles.orderItem} key={item._id}>
                      <span className={styles.orderThumb}><OrdersIcon /></span>
                      <div><strong>{getLocalizedCartItemName(locale, item.product_slug, item.product_name)}</strong><small>{t.quantity}: {item.quantity} · {new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(item.price_at_purchase)} {t.each}</small></div>
                      <b>{new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(item.price_at_purchase * item.quantity)}</b>
                    </div>
                  ))}</div>

                  <footer className={styles.orderActions}>
                    <span>{paid ? t.paid : t.invoicePending}</span>
                    {paid && <a href={`/api/account/orders/${order._id}/invoice`}><InvoiceIcon /> {t.invoice}</a>}
                  </footer>
                </article>
              )
            })}
          </div>
        )}
      </div>
      <AccountMobileNav locale={locale} active="orders" />
    </div>
  )
}

function copy(locale: Locale) {
  if (locale === 'de') return { back:'Zum Konto',eyebrow:'BESTELLHISTORIE',title:'Ihre Bestellungen.',intro:'Behalten Sie Status, Sendung und Rechnungen im Blick.',empty:'Noch keine Bestellungen',emptyCopy:'Ihre erste Bestellung erscheint hier automatisch.',shop:'Produkte ansehen',orderNumber:'Bestellnummer',date:'Datum',total:'Gesamt',delivery:'Lieferstatus',track:'Sendung verfolgen',quantity:'Menge',each:'pro Stück',paid:'Bezahlt und bestätigt',invoice:'Rechnung herunterladen',invoicePending:'Rechnung nach Zahlung verfügbar' }
  if (locale === 'en') return { back:'Back to account',eyebrow:'ORDER HISTORY',title:'Your orders.',intro:'Keep track of status, delivery and invoices.',empty:'No orders yet',emptyCopy:'Your first order will appear here automatically.',shop:'View products',orderNumber:'Order number',date:'Date',total:'Total',delivery:'Delivery status',track:'Track parcel',quantity:'Quantity',each:'each',paid:'Paid and confirmed',invoice:'Download invoice',invoicePending:'Invoice available after payment' }
  return { back:'Terug naar account',eyebrow:'BESTELGESCHIEDENIS',title:'Je bestellingen.',intro:'Volg de status, bezorging en download je facturen op één plek.',empty:'Nog geen bestellingen',emptyCopy:'Je eerste bestelling verschijnt hier automatisch.',shop:'Bekijk producten',orderNumber:'Bestelnummer',date:'Datum',total:'Totaal',delivery:'Bezorgstatus',track:'Volg je pakket',quantity:'Aantal',each:'per stuk',paid:'Betaald en bevestigd',invoice:'Factuur downloaden',invoicePending:'Factuur beschikbaar na betaling' }
}

function shipmentLabel(shipmentStatus: string | undefined, locale: Locale, orderStatus: string) {
  const status = shipmentStatus || orderStatus
  const labels: Record<Locale, Record<string, string>> = {
    nl: { pending:'Wordt verwerkt',paid:'Bestelling ontvangen',processing:'Klaar voor verzending',shipped:'Overgedragen aan vervoerder',completed:'Bezorgd',delivered:'Bezorgd' },
    en: { pending:'Being processed',paid:'Order received',processing:'Preparing shipment',shipped:'Handed to carrier',completed:'Delivered',delivered:'Delivered' },
    de: { pending:'Wird bearbeitet',paid:'Bestellung erhalten',processing:'Versand wird vorbereitet',shipped:'An Zusteller übergeben',completed:'Zugestellt',delivered:'Zugestellt' },
  }
  return labels[locale][status] || status
}

function StatusPill({ status, locale }: { status: string; locale: Locale }) {
  return <span className={`${styles.statusPill} ${styles[`status_${status}`] || ''}`}>{shipmentLabel(undefined, locale, status)}</span>
}
function IconBase({ children }: { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg> }
function OrdersIcon() { return <IconBase><path d="M6 3h12l2 5v13H4V8l2-5Z"/><path d="M4 8h16M9 12h6"/></IconBase> }
function TruckIcon() { return <IconBase><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></IconBase> }
function InvoiceIcon() { return <IconBase><path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4"/></IconBase> }
function ArrowIcon() { return <IconBase><path d="M5 12h14m-5-5 5 5-5 5"/></IconBase> }
