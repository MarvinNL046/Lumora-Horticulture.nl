import AuthProvider from '@/components/AuthProvider'
import { getLocale } from 'next-intl/server'
import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import { StoreShell } from '@/app/lumora-premium/_components/StoreShell'

const titles = {
  nl: 'Mijn account | Lumora Horticulture',
  en: 'My account | Lumora Horticulture',
  de: 'Mein Konto | Lumora Horticulture',
} as const

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params
  return {
    title: titles[locale === 'en' || locale === 'de' ? locale : 'nl'],
    robots: {index: false, follow: false},
  }
}

export default async function AccountLayout({children}: {children: ReactNode}) {
  const locale = await getLocale()
  return <AuthProvider locale={locale}><StoreShell>{children}</StoreShell></AuthProvider>
}
