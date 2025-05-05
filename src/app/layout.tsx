import '@/styles/globals.css'
import type { Metadata } from 'next'
import HeaderNav from '@/components/HeaderNav'
import Footer from '@/components/Footer'
import AnnouncementBar from '@/components/AnnouncementBar'
import { Inter, Playfair_Display } from 'next/font/google'

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
  title: 'Lumora Horticulture | Professionele Tuinbouw Oplossingen',
  description: 'Duurzame en professionele tuinbouw oplossingen voor de moderne teler',
  keywords: 'tuinbouw, horticulture, trays, transportdoos, duurzaam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`scrollbar-thin ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-white antialiased font-sans">
        {/* Top Announcement Bar */}
        <AnnouncementBar position="top" />
        
        {/* Fixed header with transparent background that becomes solid on scroll */}
        <HeaderNav />
        
        {/* Main content with padding top to account for fixed header and announcement bar */}
        <main className="flex-grow pt-24">
          {children}
        </main>
        
        {/* Bottom Announcement Bar above footer */}
        <AnnouncementBar position="bottom" />
        
        {/* Enhanced footer with modern design */}
        <Footer />
      </body>
    </html>
  )
}
