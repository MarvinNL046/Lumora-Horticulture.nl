'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Define the locales we support directly in this file
const locales = ['nl', 'en', 'de']
const defaultLocale = 'nl'

export default function HeaderNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Handle scroll for transparent/solid header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                from-lumora-green-500 to-lumora-green-700 transition-all duration-300
                ${scrolled ? 'scale-90' : 'scale-100'}`}>
                Lumora
              </span>
              <span className={`text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r 
                from-lumora-gold-500 to-lumora-gold-700 transition-all duration-300
                ${scrolled ? 'scale-90' : 'scale-100'}`}>
                Horticulture
              </span>
              <span className="absolute inset-0 rounded-xl scale-75 opacity-0 group-hover:opacity-100 
                transition-opacity duration-700 bg-gradient-to-r from-lumora-green-500/20 to-lumora-gold-500/20 
                blur-xl -z-10"></span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-1">
            <NavLink href="/" label="Home" />
            <NavLink href="/products" label="Producten" />
            <NavLink href="/contact" label="Contact" />
            
            {/* Language switcher - enhanced version */}
            <div className="relative ml-6 border-l border-gray-200/30 pl-6">
              <div className="flex space-x-3">
                {locales.map((locale) => (
                  <a
                    key={locale}
                    href="#"
                    className={`uppercase text-sm font-medium px-2 py-1 rounded-md transition-all duration-300 ${
                      locale === defaultLocale
                        ? 'bg-lumora-green-50 text-lumora-green-700 font-semibold shadow-soft-sm'
                        : 'text-gray-500 hover:text-lumora-green-600 hover:bg-lumora-green-50/50'
                    }`}
                  >
                    {locale}
                  </a>
                ))}
              </div>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 
                ${scrolled 
                  ? 'bg-white/10 text-gray-700 hover:bg-lumora-green-50 hover:text-lumora-green-700'
                  : 'bg-white/20 backdrop-blur-sm text-gray-700 hover:bg-white/30'
                } focus:outline-none`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass mt-2 mx-4 rounded-2xl overflow-hidden">
          <div className="pt-2 pb-3 space-y-1 p-4">
            <MobileNavLink href="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink href="/products" label="Producten" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink href="/contact" label="Contact" onClick={() => setMobileMenuOpen(false)} />
            
            {/* Language switcher (mobile) */}
            <div className="border-t border-gray-200/30 pt-4 pb-2">
              <div className="flex justify-center space-x-4">
                {locales.map((locale) => (
                  <a
                    key={locale}
                    href="#"
                    className={`uppercase text-sm font-medium px-3 py-2 rounded-xl transition-all duration-300 ${
                      locale === defaultLocale
                        ? 'bg-lumora-green-50 text-lumora-green-700 font-semibold shadow-soft-sm'
                        : 'text-gray-500 hover:text-lumora-green-600 hover:bg-lumora-green-50/50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {locale}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// TypeScript interfaces for our components
interface NavLinkProps {
  href: string;
  label: string;
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

// Desktop navigation link component
function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group
        ${isActive 
          ? 'text-lumora-green-700 bg-lumora-green-50/80 shadow-soft-sm' 
          : 'text-gray-700 hover:text-lumora-green-600 hover:bg-lumora-green-50/50'
        }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-1/2 bg-lumora-green-500 rounded-full"></span>
      )}
      <span className="absolute inset-0 rounded-xl scale-90 opacity-0 group-hover:opacity-100 
        transition-opacity duration-500 bg-gradient-to-r from-lumora-green-100/30 to-lumora-green-50/30 
        blur-sm -z-10"></span>
    </Link>
  )
}

// Mobile navigation link component
function MobileNavLink({ href, label, onClick }: MobileNavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link
      href={href}
      className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300
        ${isActive 
          ? 'text-lumora-green-700 bg-lumora-green-50/80 shadow-inner-soft' 
          : 'text-gray-700 hover:text-lumora-green-600 hover:bg-lumora-green-50/50'
        }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {label}
        {isActive && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2 text-lumora-green-500" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </Link>
  )
}
