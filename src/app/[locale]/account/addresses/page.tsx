import { redirect } from 'next/navigation'
import { stackServerApp } from '@/stack/server'
import Link from 'next/link'
import { localizePathForLocale } from '@/lib/url-localizations'
import AddressesClient from './AddressesClient'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/../convex/_generated/api'

export default async function AddressesPage({ params }: { params: { locale: string } }) {
  const user = await stackServerApp.getUser()

  if (!user) {
    redirect('/handler/signin')
  }

  const locale = params.locale as 'nl' | 'en' | 'de'

  const addresses = await fetchQuery(api.savedAddresses.list, { user_id: user.id })

  const t = {
    title: locale === 'de' ? 'Meine Adressen' : locale === 'en' ? 'My Addresses' : 'Mijn Adressen',
    backToAccount: locale === 'de' ? 'Zurück zum Konto' : locale === 'en' ? 'Back to Account' : 'Terug naar Account',
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <AddressesClient addresses={addresses as any} locale={locale} />
      </div>
    </div>
  )
}
