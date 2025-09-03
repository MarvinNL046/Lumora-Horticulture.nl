'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
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
  return domainLocaleMap[domain] || defaultLocale;
}

// Helper function to create a link for a different locale
const createLocalizedUrl = (locale: string, pathname: string): string => {
  // Get the domain for this locale
  const domain = localeMap[locale as keyof typeof localeMap];
  
  // First get the base path (in case this is already a localized path)
  const currentLocale = getCurrentLocaleFromPath(pathname);
  const basePath = basePathFromLocalizedPath(pathname, currentLocale);
  
  // Then localize it for the target locale
  const localizedPath = localizePathForLocale(basePath, locale);
  
  // For local development, use locale in path
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('netlify.app'))) {
    return `/${locale}${localizedPath}`;
  }
  
  // For production, use full domain
  return `https://${domain}${localizedPath}`;
}

// Helper to get current locale from pathname
const getCurrentLocaleFromPath = (pathname: string): string => {
  const match = pathname.match(/^\/(nl|en|de)/);
  return match ? match[1] : defaultLocale;
}

export default function Footer() {
  // Get current year for copyright
  const currentYear = new Date().getFullYear()
  
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

  // Get translations for the current locale, or use fallbacks
  const getDescription = () => {
    try {
      const t = useTranslations('site');
      return t('description');
    } catch (error) {
      return currentLocale === 'nl' ? 'Professionele tuinbouw oplossingen voor de moderne teler' :
             currentLocale === 'en' ? 'Professional horticulture solutions for the modern grower' :
             'Professionelle Gartenbaulösungen für den modernen Anbauer';
    }
  }

  const getCopyright = () => {
    try {
      const t = useTranslations('site');
      return t('copyright', { year: currentYear });
    } catch (error) {
      return currentLocale === 'nl' ? `© ${currentYear} Lumora Horticulture. Alle rechten voorbehouden.` :
             currentLocale === 'en' ? `© ${currentYear} Lumora Horticulture. All rights reserved.` :
             `© ${currentYear} Lumora Horticulture. Alle Rechte vorbehalten.`;
    }
  }

  const getNavLabels = () => {
    try {
      const t = useTranslations('nav');
      return {
        home: t('home'),
        products: t('products'),
        contact: t('contact')
      };
    } catch (error) {
      return {
        home: currentLocale === 'nl' ? 'Home' : 
              currentLocale === 'en' ? 'Home' : 
              'Home',
        products: currentLocale === 'nl' ? 'Producten' : 
                  currentLocale === 'en' ? 'Products' : 
                  'Produkte',
        contact: currentLocale === 'nl' ? 'Contact' : 
                currentLocale === 'en' ? 'Contact' : 
                'Kontakt'
      };
    }
  }

  const navLabels = getNavLabels();
  const description = getDescription();
  const copyright = getCopyright();
  
  return (
    <footer className="relative bg-lumora-dark text-lumora-cream border-t border-lumora-cream/10 pt-16 pb-10 mt-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-50 mix-blend-overlay">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-grain opacity-30" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-grain opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-lumora-cream/5 opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-lumora-cream/5 opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div className="lg:col-span-1">
            <Link href={localizePathForLocale('/', currentLocale)} className="flex items-center group relative">
              <div className="relative overflow-hidden w-32 h-auto">
                <Image 
                  src="/logo/lumura-horticulture-logo.jpeg" 
                  alt="Lumora Horticulture Logo"
                  width={120} 
                  height={48}
                  className="object-contain"
                />
              </div>
              <span className="absolute inset-0 rounded-xl scale-75 opacity-0 group-hover:opacity-100 
                transition-opacity duration-700 bg-gradient-to-r from-lumora-green-500/20 to-lumora-gold-500/20 
                blur-xl -z-10"></span>
            </Link>
            <p className="mt-4 text-base text-lumora-cream/80 max-w-md leading-relaxed">
              {description}
            </p>
            
            <div className="mt-6 flex space-x-4">
              <SocialIcon type="facebook" />
              <SocialIcon type="linkedin" />
              <SocialIcon type="instagram" />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4">
                  Navigation
                </h3>
                <ul className="space-y-3">
                  <FooterLink href={localizePathForLocale('/', currentLocale)} label={navLabels.home} />
                  <FooterLink href={localizePathForLocale('/products', currentLocale)} label={navLabels.products} />
                  <FooterLink 
                    href={localizePathForLocale('/products/ellepot-fp12', currentLocale)} 
                    label={currentLocale === 'nl' ? '• Ellepot FP 12+' : '• Ellepot FP 12+'} 
                  />
                  <FooterLink 
                    href={localizePathForLocale(
                      currentLocale === 'nl' ? '/paperbus-steenwol-pluggen' : 
                      currentLocale === 'en' ? '/paper-pot-rockwool-plugs' : 
                      '/papiertopf-steinwollstecker', 
                      currentLocale
                    )} 
                    label={
                      currentLocale === 'nl' ? '• Paperbus Steenwol Pluggen' : 
                      currentLocale === 'en' ? '• Paper Pot Rockwool Plugs' : 
                      '• Papiertopf Steinwollstecker'
                    } 
                  />
                  <FooterLink 
                    href={localizePathForLocale('/marketing/ellepot-flyer', currentLocale)} 
                    label={
                      currentLocale === 'nl' ? '• Marketing Materiaal' : 
                      currentLocale === 'en' ? '• Marketing Material' : 
                      '• Marketing Material'
                    } 
                  />
                  <FooterLink 
                    href={localizePathForLocale(
                      currentLocale === 'nl' ? '/over-ons' : 
                      currentLocale === 'en' ? '/about' : 
                      '/uber-uns', 
                      currentLocale
                    )} 
                    label={
                      currentLocale === 'nl' ? 'Over Ons' : 
                      currentLocale === 'en' ? 'About' : 
                      'Über Uns'
                    } 
                  />
                  <FooterLink 
                    href={localizePathForLocale(
                      currentLocale === 'nl' ? '/toepassingen' : 
                      currentLocale === 'en' ? '/applications' : 
                      '/anwendungen', 
                      currentLocale
                    )} 
                    label={
                      currentLocale === 'nl' ? 'Toepassingen' : 
                      currentLocale === 'en' ? 'Applications' : 
                      'Anwendungen'
                    } 
                  />
                  <FooterLink href={localizePathForLocale('/contact', currentLocale)} label={navLabels.contact} />
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4">
                  Contact
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-lumora-cream/80 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lumora-cream mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@lumorahorticulture.com" className="transition-colors duration-300 group-hover:text-lumora-cream break-all text-sm">
                      info@lumorahorticulture.com
                    </a>
                  </li>
                  <li className="flex items-start text-lumora-cream/80 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lumora-cream mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <a href="https://lumorahorticulture.nl" className="transition-colors duration-300 group-hover:text-lumora-cream">
                      lumorahorticulture.nl
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4">
                  {currentLocale === 'nl' ? 'Downloads' : currentLocale === 'de' ? 'Downloads' : 'Downloads'}
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="/downloads/Lumora-Ellepot-FP12-Folder.pdf"
                      download="Lumora-Ellepot-FP12-Folder.pdf"
                      className="text-lumora-cream/70 transition-colors duration-300 hover:text-lumora-cream group flex items-center relative"
                    >
                      <span className="absolute w-0 h-0.5 bg-lumora-cream/60 group-hover:w-4 transition-all duration-300"></span>
                      <span className="group-hover:pl-5 transition-all duration-300 block">
                        {currentLocale === 'nl' ? 'Lumora Productfolder (PDF)' : currentLocale === 'de' ? 'Lumora Produktbroschüre (PDF)' : 'Lumora Product Brochure (PDF)'}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4">
                  Taal / Language
                </h3>
                <ul className="space-y-3">
                  <FooterLangLink 
                    locale="nl" 
                    label="Nederlands" 
                    active={currentLocale === 'nl'} 
                    path={pathWithoutLocale} 
                  />
                  <FooterLangLink 
                    locale="en" 
                    label="English" 
                    active={currentLocale === 'en'} 
                    path={pathWithoutLocale} 
                  />
                  <FooterLangLink 
                    locale="de" 
                    label="Deutsch" 
                    active={currentLocale === 'de'} 
                    path={pathWithoutLocale} 
                  />
                </ul>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4">
              {currentLocale === 'nl' ? 'Nieuwsbrief' : 
               currentLocale === 'en' ? 'Newsletter' : 
               'Newsletter'}
            </h3>
            <p className="text-lumora-cream/80 mb-4">
              {currentLocale === 'nl' ? 'Blijf op de hoogte van onze producten en diensten.' : 
               currentLocale === 'en' ? 'Stay updated with our products and services.' : 
               'Bleiben Sie über unsere Produkte und Dienstleistungen auf dem Laufenden.'}
            </p>
            <form className="space-y-2">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full bg-lumora-dark-700 border border-lumora-cream/20 text-lumora-cream px-4 py-2 rounded-lg focus:ring-1 focus:ring-lumora-cream/30 focus:outline-none"
                  placeholder={currentLocale === 'nl' ? 'Email adres' : 
                               currentLocale === 'en' ? 'Email address' : 
                               'E-Mail-Adresse'}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-lumora-cream text-lumora-dark font-medium py-2 px-4 rounded-lg hover:bg-lumora-cream/90 transition-all duration-300 flex items-center justify-center"
                >
                  {currentLocale === 'nl' ? 'Aanmelden' : 
                   currentLocale === 'en' ? 'Subscribe' : 
                   'Anmelden'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <hr className="my-10 border-lumora-cream/10" />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-lumora-cream/70">
            {copyright}
          </p>
          
          <div className="mt-4 sm:mt-0">
            <div className="flex space-x-6">
              <Link href={localizePathForLocale('/privacy', currentLocale)} className="text-sm text-lumora-cream/70 hover:text-lumora-cream transition-colors duration-300">
                {currentLocale === 'nl' ? 'Privacybeleid' : 
                 currentLocale === 'en' ? 'Privacy Policy' : 
                 'Datenschutz'}
              </Link>
              <Link href={localizePathForLocale('/terms', currentLocale)} className="text-sm text-lumora-cream/70 hover:text-lumora-cream transition-colors duration-300">
                {currentLocale === 'nl' ? 'Algemene Voorwaarden' : 
                 currentLocale === 'en' ? 'Terms & Conditions' : 
                 'Allgemeine Geschäftsbedingungen'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Footer link component
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-lumora-cream/70 transition-colors duration-300 hover:text-lumora-cream group flex items-center relative"
      >
        <span className="absolute left-0 w-0 h-0.5 bg-lumora-cream/60 group-hover:w-4 transition-all duration-300"></span>
        <span className="group-hover:pl-5 transition-all duration-300 block">{label}</span>
      </Link>
    </li>
  )
}

// Footer language link component
function FooterLangLink({ locale, label, active, path }: { locale: string; label: string; active: boolean; path: string }) {
  return (
    <li>
      <a 
        href={createLocalizedUrl(locale, path)} 
        className={`transition-colors duration-300 group flex items-center ${
          active ? 'text-lumora-cream font-medium' : 'text-lumora-cream/70 hover:text-lumora-cream'
        }`}
      >
        {active && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1.5 text-lumora-cream" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
        <span className={active ? '' : 'group-hover:pl-5 transition-all duration-300'}>{label}</span>
      </a>
    </li>
  )
}

// Social icon component
function SocialIcon({ type }: { type: 'facebook' | 'linkedin' | 'instagram' }) {
  const icons = {
    facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }

  return (
    <a href="#" className="rounded-full bg-lumora-dark-700 p-2 text-lumora-cream/70 hover:text-lumora-cream hover:bg-lumora-dark-800 transition-all duration-300 border border-lumora-cream/10">
      {icons[type]}
    </a>
  )
}
