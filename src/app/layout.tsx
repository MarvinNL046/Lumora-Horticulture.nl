import '@/styles/globals.css'
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import type { Metadata } from 'next'
import HeaderNav from '@/components/HeaderNav'
import Footer from '@/components/Footer'
import GoogleAds from '@/components/GoogleAds'
import { Inter, Playfair_Display } from 'next/font/google'
import { OrganizationSchema } from '@/components/StructuredData'
import { CartProvider } from '@/contexts/CartContext'
import CartSidebar from '@/components/CartSidebar'
import dynamic from 'next/dynamic'

// Dynamically import WelcomeEmailTrigger with SSR disabled
const WelcomeEmailTrigger = dynamic(() => import('@/components/WelcomeEmailTrigger'), { ssr: false })

// Initialize fonts
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lumora Horticulture | B2B Leverancier Steenwol Pluggen & Kweektrays',
  description: 'Lumora Horticulture - B2B leverancier van steenwol pluggen, kweektrays en tuinbouw verpakkingen. Directe fabrikant voor groothandel en professionele kwekers. Eigen productie.',
  keywords: 'steenwol pluggen groothandel, kweektrays B2B, tuinbouw verpakkingen, professionele kweektrays, glastuinbouw benodigdheden, paperpot trays, horticulture wholesale, rockwool plugs supplier',
  viewport: 'width=device-width, initial-scale=1',
  verification: {
    google: 'SpcTizFlTiNDDn9CpPqJ6O5Xjz2ivcEWKt3QHtxQgpQ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`scrollbar-thin ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-white antialiased font-sans"><StackProvider app={stackClientApp}><StackTheme>
        <CartProvider>
          {/* Welcome email trigger for new users */}
          <WelcomeEmailTrigger />

          {/* Google Ads tracking */}
          <GoogleAds />

          {/* Organization structured data */}
          <OrganizationSchema locale="nl" />

          {/* Fixed header with transparent background that becomes solid on scroll */}
          <HeaderNav />

          {/* Main content with padding top to account for fixed header */}
          <main className="flex-grow pt-24">
            {children}
          </main>

          {/* Enhanced footer with modern design */}
          <Footer />

          {/* Shopping cart sidebar */}
          <CartSidebar />
        </CartProvider>
      </StackTheme></StackProvider></body>
    </html>
  )
}
