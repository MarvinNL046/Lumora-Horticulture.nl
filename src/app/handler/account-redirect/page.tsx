import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { localizePathForLocale } from '@/lib/url-localizations'

export default async function AccountRedirectPage() {
  const locale = await getLocale()
  redirect(localizePathForLocale('/account', locale))
}
