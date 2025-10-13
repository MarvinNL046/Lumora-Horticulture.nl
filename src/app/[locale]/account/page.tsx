import { redirect } from 'next/navigation'
import { stackServerApp } from '@/stack/server'
import Link from 'next/link'
import { localizePathForLocale } from '@/lib/url-localizations'

export default async function AccountPage({ params }: { params: { locale: string } }) {
  const user = await stackServerApp.getUser()

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/handler/signin')
  }

  const locale = params.locale as 'nl' | 'en' | 'de'

  const t = {
    title: locale === 'de' ? 'Mein Konto' : locale === 'en' ? 'My Account' : 'Mijn Account',
    welcome: locale === 'de' ? 'Willkommen zurück' : locale === 'en' ? 'Welcome back' : 'Welkom terug',
    accountInfo: locale === 'de' ? 'Kontoinformationen' : locale === 'en' ? 'Account Information' : 'Accountgegevens',
    email: locale === 'de' ? 'E-Mail' : locale === 'en' ? 'Email' : 'E-mail',
    name: locale === 'de' ? 'Name' : locale === 'en' ? 'Name' : 'Naam',
    quickLinks: locale === 'de' ? 'Schnellzugriff' : locale === 'en' ? 'Quick Links' : 'Snelkoppelingen',
    viewOrders: locale === 'de' ? 'Meine Bestellungen' : locale === 'en' ? 'My Orders' : 'Mijn Bestellingen',
    viewOrdersDesc: locale === 'de' ? 'Sehen Sie Ihre Bestellhistorie und verfolgen Sie Bestellungen' : locale === 'en' ? 'View your order history and track orders' : 'Bekijk je bestelgeschiedenis en volg bestellingen',
    viewAddresses: locale === 'de' ? 'Meine Adressen' : locale === 'en' ? 'My Addresses' : 'Mijn Adressen',
    viewAddressesDesc: locale === 'de' ? 'Verwalten Sie Ihre gespeicherten Lieferadressen' : locale === 'en' ? 'Manage your saved delivery addresses' : 'Beheer je opgeslagen bezorgadressen',
    backToShop: locale === 'de' ? 'Zurück zum Shop' : locale === 'en' ? 'Back to Shop' : 'Terug naar Winkel',
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-lumora-dark mb-2">{t.title}</h1>
          <p className="text-lg text-lumora-dark/60">{t.welcome}, {user.displayName || user.primaryEmail}</p>
        </div>

        {/* Account Information Card */}
        <div className="bg-white rounded-2xl shadow-soft-lg p-8 mb-6">
          <h2 className="text-2xl font-display font-semibold text-lumora-dark mb-6">{t.accountInfo}</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-32 text-lumora-dark/60 font-medium">{t.name}:</div>
              <div className="flex-1 text-lumora-dark">{user.displayName || '-'}</div>
            </div>
            <div className="flex items-start">
              <div className="w-32 text-lumora-dark/60 font-medium">{t.email}:</div>
              <div className="flex-1 text-lumora-dark">{user.primaryEmail}</div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-soft-lg p-8 mb-6">
          <h2 className="text-2xl font-display font-semibold text-lumora-dark mb-6">{t.quickLinks}</h2>
          <div className="grid gap-4">
            <Link
              href={localizePathForLocale('/account/orders', locale)}
              className="flex items-center justify-between p-6 bg-gradient-to-r from-lumora-cream/30 to-lumora-cream/10 rounded-xl hover:shadow-soft-md transition-all duration-300 group"
            >
              <div>
                <h3 className="text-lg font-semibold text-lumora-dark group-hover:text-lumora-green-500 transition-colors">
                  {t.viewOrders}
                </h3>
                <p className="text-sm text-lumora-dark/60 mt-1">{t.viewOrdersDesc}</p>
              </div>
              <svg className="w-6 h-6 text-lumora-green-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href={localizePathForLocale('/account/addresses', locale)}
              className="flex items-center justify-between p-6 bg-gradient-to-r from-lumora-cream/30 to-lumora-cream/10 rounded-xl hover:shadow-soft-md transition-all duration-300 group"
            >
              <div>
                <h3 className="text-lg font-semibold text-lumora-dark group-hover:text-lumora-green-500 transition-colors">
                  {t.viewAddresses}
                </h3>
                <p className="text-sm text-lumora-dark/60 mt-1">{t.viewAddressesDesc}</p>
              </div>
              <svg className="w-6 h-6 text-lumora-green-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Back to Shop */}
        <div className="text-center">
          <Link
            href={localizePathForLocale('/shop', locale)}
            className="inline-flex items-center gap-2 text-lumora-green-500 hover:text-lumora-green-600 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.backToShop}
          </Link>
        </div>
      </div>
    </div>
  )
}
