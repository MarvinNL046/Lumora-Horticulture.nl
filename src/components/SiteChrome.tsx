'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import HeaderNav from '@/components/HeaderNav'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'

const ExitIntentPopup = dynamic(
  () => import('@/components/ExitIntentPopup'),
  { ssr: false }
)

// Routes that opt out of the global Lumora chrome (header / footer /
// cart sidebar / exit intent). Used by standalone landing pages and
// design demos that ship their own chrome.
const STANDALONE_ROUTES = ['/lumora-premium']

function isStandalonePath(pathname: string | null): boolean {
  if (!pathname) return false
  return STANDALONE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  )
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const standalone = isStandalonePath(pathname)

  if (standalone) {
    return <main className="flex-grow">{children}</main>
  }

  return (
    <>
      <HeaderNav />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
      <CartSidebar />
      <ExitIntentPopup />
    </>
  )
}
