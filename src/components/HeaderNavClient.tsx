'use client'

import { useUser, useStackApp } from '@stackframe/stack'
import Link from 'next/link'
import { useState } from 'react'
import { localizePathForLocale } from '@/lib/url-localizations'

interface HeaderNavClientProps {
  currentLocale: 'nl' | 'en' | 'de'
  setMobileMenuOpen?: (open: boolean) => void
}

export default function HeaderNavClient({ currentLocale, setMobileMenuOpen }: HeaderNavClientProps) {
  const user = useUser()
  const app = useStackApp()
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Account Section */}
      <div className="hidden lg:block">
        {user ? (
          <div className="relative ml-4">
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="flex items-center gap-2 p-2 text-lumora-cream hover:text-lumora-gold transition-colors rounded-lg hover:bg-lumora-dark-700/50"
              aria-label="Account menu"
            >
              <div className="w-8 h-8 rounded-full bg-lumora-gold flex items-center justify-center text-lumora-dark font-bold">
                {user.displayName?.[0]?.toUpperCase() || user.primaryEmail?.[0]?.toUpperCase() || 'U'}
              </div>
            </button>

            {/* Account Dropdown */}
            {accountMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-lumora-dark/95 backdrop-blur-sm shadow-lg border border-lumora-cream/10 overflow-hidden z-50">
                <div className="p-4 border-b border-lumora-cream/10">
                  <p className="text-sm font-semibold text-lumora-cream">{user.displayName || 'Account'}</p>
                  <p className="text-xs text-lumora-cream/60 truncate">{user.primaryEmail}</p>
                </div>
                <div className="py-2">
                  <Link
                    href={localizePathForLocale('/account', currentLocale)}
                    className="block px-4 py-2 text-sm text-lumora-cream/80 hover:text-lumora-cream hover:bg-lumora-dark-700/50 transition-colors"
                    onClick={() => setAccountMenuOpen(false)}
                  >
                    {currentLocale === 'de' ? 'Mein Konto' : currentLocale === 'en' ? 'My Account' : 'Mijn Account'}
                  </Link>
                  <Link
                    href={localizePathForLocale('/account/orders', currentLocale)}
                    className="block px-4 py-2 text-sm text-lumora-cream/80 hover:text-lumora-cream hover:bg-lumora-dark-700/50 transition-colors"
                    onClick={() => setAccountMenuOpen(false)}
                  >
                    {currentLocale === 'de' ? 'Bestellungen' : currentLocale === 'en' ? 'Orders' : 'Bestellingen'}
                  </Link>
                  <button
                    onClick={async () => {
                      await user?.signOut()
                      setAccountMenuOpen(false)
                      window.location.href = '/'
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-lumora-dark-700/50 transition-colors"
                  >
                    {currentLocale === 'de' ? 'Abmelden' : currentLocale === 'en' ? 'Sign Out' : 'Uitloggen'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 ml-4">
            <Link
              href="/handler/signin"
              className="px-4 py-2 text-sm font-medium text-lumora-cream hover:text-lumora-gold transition-colors"
            >
              {currentLocale === 'de' ? 'Anmelden' : currentLocale === 'en' ? 'Sign In' : 'Inloggen'}
            </Link>
            <Link
              href="/handler/signup"
              className="px-4 py-2 text-sm font-medium bg-lumora-gold text-lumora-dark rounded-lg hover:bg-lumora-gold-600 transition-colors"
            >
              {currentLocale === 'de' ? 'Registrieren' : currentLocale === 'en' ? 'Sign Up' : 'Registreren'}
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Account Section */}
      <div className="lg:hidden border-t border-lumora-cream/10 pt-4">
        {user ? (
          <div className="space-y-2">
            <div className="px-4 py-2 bg-lumora-dark-700/50 rounded-xl">
              <p className="text-sm font-semibold text-lumora-cream">{user.displayName || 'Account'}</p>
              <p className="text-xs text-lumora-cream/60 truncate">{user.primaryEmail}</p>
            </div>
            <Link
              href={localizePathForLocale('/account', currentLocale)}
              className="block px-4 py-3 text-base font-medium text-lumora-cream/80 hover:text-lumora-cream hover:bg-lumora-dark-700/70 rounded-xl transition-all duration-300"
              onClick={() => setMobileMenuOpen?.(false)}
            >
              {currentLocale === 'de' ? 'Mein Konto' : currentLocale === 'en' ? 'My Account' : 'Mijn Account'}
            </Link>
            <Link
              href={localizePathForLocale('/account/orders', currentLocale)}
              className="block px-4 py-3 text-base font-medium text-lumora-cream/80 hover:text-lumora-cream hover:bg-lumora-dark-700/70 rounded-xl transition-all duration-300"
              onClick={() => setMobileMenuOpen?.(false)}
            >
              {currentLocale === 'de' ? 'Bestellungen' : currentLocale === 'en' ? 'Orders' : 'Bestellingen'}
            </Link>
            <button
              onClick={async () => {
                await user?.signOut()
                setMobileMenuOpen?.(false)
                window.location.href = '/'
              }}
              className="w-full text-left px-4 py-3 text-base font-medium text-red-400 hover:text-red-300 hover:bg-lumora-dark-700/70 rounded-xl transition-all duration-300"
            >
              {currentLocale === 'de' ? 'Abmelden' : currentLocale === 'en' ? 'Sign Out' : 'Uitloggen'}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link
              href="/handler/signin"
              onClick={() => setMobileMenuOpen?.(false)}
              className="block px-4 py-3 text-center bg-lumora-dark-700/50 text-lumora-cream font-medium rounded-xl hover:bg-lumora-dark-700/70 transition-all duration-300"
            >
              {currentLocale === 'de' ? 'Anmelden' : currentLocale === 'en' ? 'Sign In' : 'Inloggen'}
            </Link>
            <Link
              href="/handler/signup"
              onClick={() => setMobileMenuOpen?.(false)}
              className="block px-4 py-3 text-center bg-lumora-gold text-lumora-dark font-semibold rounded-xl hover:bg-lumora-gold-600 transition-all duration-300"
            >
              {currentLocale === 'de' ? 'Registrieren' : currentLocale === 'en' ? 'Sign Up' : 'Registreren'}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
