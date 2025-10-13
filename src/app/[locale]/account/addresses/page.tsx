import { redirect } from 'next/navigation'
import { stackServerApp } from '@/stack/server'
import Link from 'next/link'
import { localizePathForLocale } from '@/lib/url-localizations'
import AddressesClient from './AddressesClient'
import { neon } from '@neondatabase/serverless'

interface Address {
  id: string
  user_id: string
  name: string
  street: string
  city: string
  postal_code: string
  country: string
  phone: string | null
  is_default: boolean
  created_at: string
  updated_at: string
}

export default async function AddressesPage({ params }: { params: { locale: string } }) {
  const user = await stackServerApp.getUser()

  // Redirect to login if not authenticated
  if (!user) {
    redirect('/handler/signin')
  }

  const locale = params.locale as 'nl' | 'en' | 'de'

  // Fetch user's saved addresses from database
  const sql = neon(process.env.DATABASE_URL!)
  const addressesRaw = await sql`
    SELECT
      id,
      user_id,
      name,
      street,
      city,
      postal_code,
      country,
      phone,
      is_default,
      created_at,
      updated_at
    FROM saved_addresses
    WHERE user_id = ${user.id}
    ORDER BY is_default DESC, created_at DESC
  `

  // Convert to typed addresses
  const addresses: Address[] = addressesRaw.map((row) => ({
    id: row.id as string,
    user_id: row.user_id as string,
    name: row.name as string,
    street: row.street as string,
    city: row.city as string,
    postal_code: row.postal_code as string,
    country: row.country as string,
    phone: row.phone as string | null,
    is_default: row.is_default as boolean,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }))

  const t = {
    title: locale === 'de' ? 'Meine Adressen' : locale === 'en' ? 'My Addresses' : 'Mijn Adressen',
    backToAccount: locale === 'de' ? 'Zurück zum Konto' : locale === 'en' ? 'Back to Account' : 'Terug naar Account',
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

        {/* Addresses List & Management */}
        <AddressesClient addresses={addresses} locale={locale} />
      </div>
    </div>
  )
}
