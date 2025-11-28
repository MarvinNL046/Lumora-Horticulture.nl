import '@/styles/globals.css'
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import type { Metadata } from 'next'
import HeaderNav from '@/components/HeaderNav'
import Footer from '@/components/Footer'
import GoogleAds from '@/components/GoogleAds'
import MicrosoftClarity from '@/components/MicrosoftClarity'
import { Inter, Playfair_Display } from 'next/font/google'
import { OrganizationSchema } from '@/components/StructuredData'
import { CartProvider } from '@/contexts/CartContext'
import CartSidebar from '@/components/CartSidebar'
import dynamic from 'next/dynamic'

// Dynamically import WelcomeEmailTrigger and CartSync with SSR disabled
const WelcomeEmailTrigger = dynamic(() => import('@/components/WelcomeEmailTrigger'), { ssr: false })
const CartSync = dynamic(() => import('@/components/CartSync'), { ssr: false })

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
  title: 'Lumora Horticulture | B2B Leverancier Paperbus Steenwol Pluggen & Kweektrays',
  description: 'Lumora Horticulture - B2B leverancier van paperbus steenwol pluggen, kweektrays en tuinbouw verpakkingen. Ellepot FP 12+ paper plugs met 12+ maanden stabiliteit. Directe fabrikant voor groothandel en professionele kwekers.',
  keywords: 'paperbus steenwol pluggen, steenwol pluggen groothandel, ellepot paper plugs, kweektrays B2B, tuinbouw verpakkingen, professionele kweektrays, glastuinbouw benodigdheden, paperpot trays, rockwool paper plugs, horticulture wholesale, transplant trays',
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

          {/* Cart sync temporarily disabled - causing SSR issues */}
          {/* <CartSync /> */}

          {/* Google Ads tracking */}
          <GoogleAds />

          {/* Microsoft Clarity heatmaps & analytics */}
          <MicrosoftClarity />

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
