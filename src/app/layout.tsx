import '@/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import TrackingScripts from '@/components/TrackingScripts'
import { Inter, Playfair_Display } from 'next/font/google'
import { OrganizationSchema } from '@/components/StructuredData'
import { CartProvider } from '@/contexts/CartContext'
import SiteChrome from '@/components/SiteChrome'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

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
  metadataBase: new URL('https://lumorahorticulture.nl'),
  title: 'Stekpluggen Steenwol & NeemXPRO | Lumora Horticulture',
  description: 'Lumora Horticulture levert Paper Plug Trays (84 en 104 cellen) met steenwol stekpluggen en NeemXPRO plantaardig olieconcentraat aan professionele kwekers en hobbytelers.',
  keywords: 'stekpluggen steenwol, paper plug trays, steenwol pluggen, NeemXPRO, neemolie planten, professionele tuinbouw, kweektrays',
  verification: {
    google: 'SpcTizFlTiNDDn9CpPqJ6O5Xjz2ivcEWKt3QHtxQgpQ',
    other: {
      // Facebook domain verification (.com via meta tag).
      // .nl is verified via DNS TXT (Vercel DNS) and .de can be added here too.
      'facebook-domain-verification': 'smn9gxgs2xuwrlx034u33s9srn94z8',
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()])

  return (
    <html lang={locale} className={`scrollbar-thin ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-white antialiased font-sans">
        <NextIntlClientProvider messages={{site: messages.site}}>
          <CartProvider>
            {/* Third-party tracking is suppressed on credential-bearing routes. */}
            <TrackingScripts />

            {/* Organization structured data */}
            <OrganizationSchema locale={locale} />

            {/* Header / main / footer / cart / exit-intent. SiteChrome
            hides the global Lumora chrome on standalone routes such as
            the /lumora-premium design demo so they can ship their own. */}
            <SiteChrome>{children}</SiteChrome>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
