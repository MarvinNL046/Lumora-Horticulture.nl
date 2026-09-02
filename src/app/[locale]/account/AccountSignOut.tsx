'use client'

import { useUser } from '@stackframe/stack'
import { localizePathForLocale } from '@/lib/url-localizations'
import styles from './account.module.css'

export default function AccountSignOut({ label, locale = 'nl' }: { label: string; locale?: 'nl' | 'en' | 'de' }) {
  const user = useUser()
  return (
    <button
      className={styles.signOut}
      type="button"
      onClick={async () => {
        await user?.signOut({ redirectUrl: localizePathForLocale('/', locale) })
        window.location.href = localizePathForLocale('/', locale)
      }}
    >
      {label}
    </button>
  )
}
