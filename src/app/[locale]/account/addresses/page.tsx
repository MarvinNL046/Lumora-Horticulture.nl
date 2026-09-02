import { redirect } from 'next/navigation'
import { stackServerApp } from '@/stack/server'
import Link from 'next/link'
import { localizePathForLocale } from '@/lib/url-localizations'
import AddressesClient from './AddressesClient'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/../convex/_generated/api'
import { convexServerAuth } from '@/lib/convex'
import AccountMobileNav from '../AccountMobileNav'
import styles from '../account.module.css'

type Locale = 'nl' | 'en' | 'de'

export default async function AddressesPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale
  const user = await stackServerApp.getUser()

  if (!user) {
    redirect(`/handler/sign-in?lang=${locale}`)
  }

  const addresses = await fetchQuery(api.savedAddresses.list, {
    ...convexServerAuth(),
    user_id: user.id,
  })

  const t = {
    eyebrow: locale === 'de' ? 'LIEFERADRESSEN' : locale === 'en' ? 'DELIVERY ADDRESSES' : 'BEZORGADRESSEN',
    title: locale === 'de' ? 'Ihre Adressen.' : locale === 'en' ? 'Your addresses.' : 'Je adressen.',
    intro: locale === 'de'
      ? 'Speichern Sie Lieferadressen, damit Sie beim Bezahlen schneller fertig sind.'
      : locale === 'en'
        ? 'Save delivery addresses so checkout is faster next time.'
        : 'Bewaar bezorgadressen zodat je de volgende keer sneller afrekent.',
    backToAccount: locale === 'de' ? 'Zum Konto' : locale === 'en' ? 'Back to account' : 'Terug naar account',
  }

  return (
    <div className={`${styles.accountPage} ${styles.addressesPage}`} data-account-dashboard>
      <div className={styles.accountContainer}>
        <Link className={styles.backLink} href={localizePathForLocale('/account', locale)}>← {t.backToAccount}</Link>
        <header className={styles.ordersHeader}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </header>

        <AddressesClient addresses={addresses as any} locale={locale} />
      </div>
      <AccountMobileNav locale={locale} active="account" />
    </div>
  )
}
