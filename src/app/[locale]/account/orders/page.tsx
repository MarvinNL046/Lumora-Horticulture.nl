import { redirect } from 'next/navigation'
import { stackServerApp } from '@/stack/server'
import Link from 'next/link'
import { localizePathForLocale } from '@/lib/url-localizations'
import { neon } from '@neondatabase/serverless'

export default async function OrdersPage({ params }: { params: { locale: string } }) {
  const user = await stackServerApp.getUser()

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/handler/signin')
  }

  const locale = params.locale as 'nl' | 'en' | 'de'

  // Fetch user's orders from database
  const sql = neon(process.env.DATABASE_URL!)
  const orders = await sql`
    SELECT
      o.id,
      o.order_number,
      o.customer_email,
      o.customer_name,
      o.total_amount,
      o.status,
      o.payment_status,
      o.created_at,
      json_agg(
        json_build_object(
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'price_at_purchase', oi.price_at_purchase,
          'product_name', p.name,
          'product_slug', p.slug
        )
      ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE o.user_id = ${user.id}
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `

  const t = {
    title: locale === 'de' ? 'Meine Bestellungen' : locale === 'en' ? 'My Orders' : 'Mijn Bestellingen',
    noOrders: locale === 'de' ? 'Sie haben noch keine Bestellungen aufgegeben' : locale === 'en' ? "You haven't placed any orders yet" : 'Je hebt nog geen bestellingen geplaatst',
    startShopping: locale === 'de' ? 'Jetzt einkaufen' : locale === 'en' ? 'Start Shopping' : 'Ga naar winkel',
    orderNumber: locale === 'de' ? 'Bestellnummer' : locale === 'en' ? 'Order Number' : 'Bestelnummer',
    date: locale === 'de' ? 'Datum' : locale === 'en' ? 'Date' : 'Datum',
    status: locale === 'de' ? 'Status' : locale === 'en' ? 'Status' : 'Status',
    total: locale === 'de' ? 'Gesamt' : locale === 'en' ? 'Total' : 'Totaal',
    items: locale === 'de' ? 'Artikel' : locale === 'en' ? 'Items' : 'Artikelen',
    backToAccount: locale === 'de' ? 'Zurück zum Konto' : locale === 'en' ? 'Back to Account' : 'Terug naar Account',
    pending: locale === 'de' ? 'Ausstehend' : locale === 'en' ? 'Pending' : 'In afwachting',
    paid: locale === 'de' ? 'Bezahlt' : locale === 'en' ? 'Paid' : 'Betaald',
    processing: locale === 'de' ? 'In Bearbeitung' : locale === 'en' ? 'Processing' : 'In behandeling',
    shipped: locale === 'de' ? 'Versendet' : locale === 'en' ? 'Shipped' : 'Verzonden',
    completed: locale === 'de' ? 'Abgeschlossen' : locale === 'en' ? 'Completed' : 'Voltooid',
    cancelled: locale === 'de' ? 'Storniert' : locale === 'en' ? 'Cancelled' : 'Geannuleerd',
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return t.pending
      case 'paid': return t.paid
      case 'processing': return t.processing
      case 'shipped': return t.shipped
      case 'completed': return t.completed
      case 'cancelled': return t.cancelled
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={localizePathForLocale('/account', locale)}
            className="inline-flex items-center gap-2 text-lumora-green-500 hover:text-lumora-green-600 font-medium transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToAccount}
          </Link>
          <h1 className="text-4xl font-display font-bold text-lumora-dark">{t.title}</h1>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-soft-lg p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-lumora-dark/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-display font-semibold text-lumora-dark mb-2">{t.noOrders}</h2>
            <p className="text-lumora-dark/60 mb-6">Start met winkelen om je eerste bestelling te plaatsen!</p>
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-block bg-lumora-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-lumora-green-600 transition-colors shadow-soft-md hover:shadow-soft-lg"
            >
              {t.startShopping}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-soft-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-lumora-cream/30 to-lumora-cream/10 p-6 border-b border-lumora-dark/10">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-lumora-dark/60 mb-1">{t.orderNumber}</div>
                      <div className="text-lg font-semibold text-lumora-dark">{order.order_number || `#${order.id.substring(0, 8)}`}</div>
                    </div>
                    <div>
                      <div className="text-sm text-lumora-dark/60 mb-1">{t.date}</div>
                      <div className="text-lg font-semibold text-lumora-dark">
                        {new Date(order.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-lumora-dark/60 mb-1">{t.status}</div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-lumora-dark/60 mb-1">{t.total}</div>
                      <div className="text-2xl font-bold text-lumora-green-500">
                        €{parseFloat(order.total_amount).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="text-sm font-semibold text-lumora-dark/60 mb-3">{t.items}</div>
                  <div className="space-y-3">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex-1">
                          <div className="font-medium text-lumora-dark">{item.product_name}</div>
                          <div className="text-sm text-lumora-dark/60">
                            {locale === 'de' ? 'Menge' : locale === 'en' ? 'Quantity' : 'Aantal'}: {item.quantity}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-lumora-dark">
                            €{(parseFloat(item.price_at_purchase) * parseFloat(item.quantity)).toFixed(2)}
                          </div>
                          <div className="text-sm text-lumora-dark/60">
                            €{parseFloat(item.price_at_purchase).toFixed(2)} {locale === 'de' ? 'pro Stück' : locale === 'en' ? 'each' : 'per stuk'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
