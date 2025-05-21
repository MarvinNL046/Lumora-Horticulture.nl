
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useParams } from 'next/navigation'
import { 
  domainLocaleMap, 
  localizePathForLocale,
  basePathFromLocalizedPath
} from '@/lib/url-localizations'

// Define the locales we support directly in this file and their corresponding domains
const localeMap = {
  nl: 'lumorahorticulture.nl',
  en: 'lumorahorticulture.com',
  de: 'lumorahorticulture.de'
}

const defaultLocale = 'nl'

// Helper function to get current locale from domain
const getLocaleFromDomain = (domain?: string): string => {
  if (!domain) return defaultLocale;
  
  // Check which domain matches
  for (const [locale, domainValue] of Object.entries(localeMap)) {
    if (domain.includes(domainValue)) {
      return locale;
    }
  }
  
  // Default to nl if no match found
  return defaultLocale;
}

// Helper function to create a link for a different locale
const createLocalizedUrl = (locale: string, pathname: string): string => {
  // Get the domain for this locale
  const domain = localeMap[locale as keyof typeof localeMap];
  
  // First get the base path (in case this is already a localized path)
  const basePath = basePathFromLocalizedPath(pathname, locale);
  
  // Then localize it for the target locale
  const localizedPath = localizePathForLocale(basePath, locale);
  
  // For local development, use locale in path
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return `/${locale}${localizedPath.startsWith('/') ? localizedPath : `/${localizedPath}`}`;
  }
  
  // For production, use full domain
  return `https://${domain}${localizedPath.startsWith('/') ? localizedPath : `/${localizedPath}`}`;
}

export default function HeaderNav() {
  const pathname = usePathname() || ''
  const params = useParams()
  
  // Get current locale from URL or domain
  const getCurrentLocale = (): string => {
    // If we have a locale in the URL params, use that
    if (params?.locale) {
      return params.locale as string;
    }
    
    // Otherwise try to determine from domain
    if (typeof window !== 'undefined') {
      return getLocaleFromDomain(window.location.hostname);
    }
    
    return defaultLocale;
  }
  
  // Get the current locale
  const currentLocale = getCurrentLocale()
  
  // Get the path without the locale prefix
  const getPathWithoutLocale = (): string => {
    if (pathname.startsWith('/' + currentLocale + '/')) {
      return pathname.substring(('/' + currentLocale).length);
    }
    return pathname;
  }
  
  const pathWithoutLocale = getPathWithoutLocale()
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
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-lumora-dark/95 py-3 shadow-md' : 'bg-lumora-dark/90 py-5'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group relative">
              <div className={`relative transition-all duration-300 
                ${scrolled ? 'h-12 w-auto' : 'h-16 w-auto'}`}>
                <Image 
                  src="/logo/lumura-horticulture-logo.jpeg" 
                  alt="Lumora Horticulture Logo"
                  width={160} 
                  height={64}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="absolute inset-0 rounded-xl scale-75 opacity-0 group-hover:opacity-100 
                transition-opacity duration-700 bg-gradient-to-r from-lumora-green-500/20 to-lumora-gold-500/20 
                blur-xl -z-10"></span>
            </Link>
          </div>
          
          {/* Desktop navigation with localized links */}
          <nav className="hidden md:flex md:items-center md:space-x-1">
            <NavLink 
              href="/" 
              label={currentLocale === 'de' ? 'Startseite' : 'Home'} 
              color="text-lumora-cream" 
              activeColor="text-lumora-cream bg-lumora-dark-700" 
              hoverColor="text-lumora-cream/90 hover:bg-lumora-dark-800/80" 
            />
            <NavLink 
              href="/products" 
              label={
                currentLocale === 'nl' ? 'Producten' : 
                currentLocale === 'de' ? 'Produkte' : 
                'Products'
              } 
              color="text-lumora-cream" 
              activeColor="text-lumora-cream bg-lumora-dark-700" 
              hoverColor="text-lumora-cream/90 hover:bg-lumora-dark-800/80" 
            />
            <NavLink 
              href="/contact" 
              label={currentLocale === 'de' ? 'Kontakt' : 'Contact'} 
              color="text-lumora-cream" 
              activeColor="text-lumora-cream bg-lumora-dark-700" 
              hoverColor="text-lumora-cream/90 hover:bg-lumora-dark-800/80" 
            />
            
            {/* Language switcher - with domain switching */}
            <div className="relative ml-6 border-l border-lumora-cream/20 pl-6">
              <div className="flex space-x-3">
                {Object.keys(localeMap).map((locale) => (
                  <a
                    key={locale}
                    href={createLocalizedUrl(locale, pathWithoutLocale)}
                    className={`uppercase text-sm font-medium px-2 py-1 rounded-md transition-all duration-300 ${
                      locale === currentLocale
                        ? 'bg-lumora-dark-700/80 text-lumora-cream font-semibold shadow-soft-sm border border-lumora-cream/30'
                        : 'text-lumora-cream/70 hover:text-lumora-cream hover:bg-lumora-dark-700/50'
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
                bg-lumora-dark-700/50 text-lumora-cream hover:bg-lumora-dark-700 hover:text-lumora-cream
                focus:outline-none border border-lumora-cream/20`}
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
        <div className="bg-lumora-dark-800/95 mt-2 mx-4 rounded-2xl overflow-hidden border border-lumora-cream/10 shadow-lg">
          <div className="pt-2 pb-3 space-y-1 p-4">
            <MobileNavLink 
              href="/" 
              label={currentLocale === 'de' ? 'Startseite' : 'Home'} 
              onClick={() => setMobileMenuOpen(false)} 
            />
            <MobileNavLink 
              href="/products" 
              label={
                currentLocale === 'nl' ? 'Producten' : 
                currentLocale === 'de' ? 'Produkte' : 
                'Products'
              }
              onClick={() => setMobileMenuOpen(false)} 
            />
            <MobileNavLink 
              href="/contact" 
              label={currentLocale === 'de' ? 'Kontakt' : 'Contact'} 
              onClick={() => setMobileMenuOpen(false)} 
            />
            
            {/* Language switcher (mobile) - with domain switching */}
            <div className="border-t border-lumora-cream/10 pt-4 pb-2">
              <div className="flex justify-center space-x-4">
                {Object.keys(localeMap).map((locale) => (
                  <a
                    key={locale}
                    href={createLocalizedUrl(locale, pathWithoutLocale)}
                    className={`uppercase text-sm font-medium px-3 py-2 rounded-xl transition-all duration-300 ${
                      locale === currentLocale
                        ? 'bg-lumora-dark-700 text-lumora-cream font-semibold shadow-soft-sm border border-lumora-cream/30'
                        : 'text-lumora-cream/70 hover:text-lumora-cream hover:bg-lumora-dark-700/50'
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
  color?: string;
  activeColor?: string;
  hoverColor?: string;
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

// Desktop navigation link component
function NavLink({ href, label, color, activeColor, hoverColor }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  // Default styling if custom colors are not provided
  const defaultActiveStyle = 'text-lumora-cream bg-lumora-dark-700/80 shadow-soft-sm'
  const defaultInactiveStyle = 'text-lumora-cream/80 hover:text-lumora-cream hover:bg-lumora-dark-700/50'
  
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 group
        ${isActive 
          ? activeColor || defaultActiveStyle
          : hoverColor || defaultInactiveStyle
        }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-1/2 bg-lumora-cream rounded-full"></span>
      )}
      <span className="absolute inset-0 rounded-xl scale-90 opacity-0 group-hover:opacity-100 
        transition-opacity duration-500 bg-lumora-dark-700/40 
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
          ? 'text-lumora-cream bg-lumora-dark-700/90 border border-lumora-cream/20 shadow-inner-soft' 
          : 'text-lumora-cream/70 hover:text-lumora-cream hover:bg-lumora-dark-700/70'
        }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {label}
        {isActive && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2 text-lumora-cream" 
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
