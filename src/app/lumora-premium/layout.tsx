import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { StoreShell } from './_components/StoreShell'

export const metadata: Metadata = {
  title: 'Lumora Storefront Design Preview',
  description: 'Niet-geïndexeerde ontwerpomgeving voor de nieuwe Lumora-webshop.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}
export default function LumoraPremiumLayout({ children }: { children: ReactNode }) {
  return <StoreShell>{children}</StoreShell>
}
