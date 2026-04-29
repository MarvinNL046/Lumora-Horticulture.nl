import '@/styles/globals.css'
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import type { Metadata } from 'next'
import GoogleAds from '@/components/GoogleAds'
import MicrosoftClarity from '@/components/MicrosoftClarity'
import MetaPixel from '@/components/MetaPixel'
import { Inter, Playfair_Display } from 'next/font/google'
import { OrganizationSchema } from '@/components/StructuredData'
import { CartProvider } from '@/contexts/CartContext'
import SiteChrome from '@/components/SiteChrome'
import dynamic from 'next/dynamic'

// Dynamically import client-side components with SSR disabled
const WelcomeEmailTrigger = dynamic(() => import('@/components/WelcomeEmailTrigger'), { ssr: false })
const CartSync = dynamic(() => import('@/components/CartSync'), { ssr: false })
const InAppBrowserBanner = dynamic(() => import('@/components/InAppBrowserBanner'), { ssr: false })

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
    other: {
      // Facebook domain verification (.com via meta tag).
      // .nl is verified via DNS TXT (Vercel DNS) and .de can be added here too.
      'facebook-domain-verification': 'smn9gxgs2xuwrlx034u33s9srn94z8',
    },
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
          {/* Warn Meta-ads traffic landing in the FB/IG in-app webview that
              iDEAL / Apple Pay won't work there, and offer an "Open in
              browser" jump-out. Invisible for normal browsers. */}
          <InAppBrowserBanner />

          {/* Welcome email trigger for new users */}
          <WelcomeEmailTrigger />

          {/* Cart sync temporarily disabled - causing SSR issues */}
          {/* <CartSync /> */}

          {/* Google Ads tracking */}
          <GoogleAds />

          {/* Microsoft Clarity heatmaps & analytics */}
          <MicrosoftClarity />

          {/* Meta (Facebook) Pixel tracking */}
          <MetaPixel />

          {/* Organization structured data */}
          <OrganizationSchema locale="nl" />

          {/* Header / main / footer / cart / exit-intent. SiteChrome
              hides the global Lumora chrome on standalone routes such as
              the /lumora-premium design demo so they can ship their own. */}
          <SiteChrome>{children}</SiteChrome>
        </CartProvider>
      </StackTheme></StackProvider></body>
    </html>
  )
}
