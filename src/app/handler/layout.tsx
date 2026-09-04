import AuthProvider from '@/components/AuthProvider'
import { getLocale } from 'next-intl/server'
import type {Metadata} from 'next'
import type {ReactNode} from 'react'

export const metadata: Metadata = {
  robots: {index: false, follow: false},
}

export default async function HandlerLayout({children}: {children: ReactNode}) {
  const locale = await getLocale()
  return <AuthProvider locale={locale}>{children}</AuthProvider>
}
