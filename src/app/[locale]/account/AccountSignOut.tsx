'use client'

import { useUser } from '@stackframe/stack'
import styles from './account.module.css'

export default function AccountSignOut({ label }: { label: string }) {
  const user = useUser()
  return <button className={styles.signOut} type="button" onClick={async () => { await user?.signOut(); window.location.href = '/' }}>{label}</button>
}
