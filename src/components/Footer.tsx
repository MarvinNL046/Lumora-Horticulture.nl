'use client'

import { useState, useEffect } from 'react'
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
// isLocalDev parameter is passed from component to ensure hydration-safe rendering
const createLocalizedUrl = (locale: string, pathname: string, isLocalDev: boolean = false): string => {
  // Get the domain for this locale
  const domain = localeMap[locale as keyof typeof localeMap];

  // First get the base path (in case this is already a localized path)
  const currentLocale = getCurrentLocaleFromPath(pathname);
  const basePath = basePathFromLocalizedPath(pathname, currentLocale);

  // Then localize it for the target locale
  const localizedPath = localizePathForLocale(basePath, locale);

  // For local development, use locale in path (only when isLocalDev is explicitly true)
  if (isLocalDev) {
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

  // Track if component is mounted (for hydration-safe rendering)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Get current locale from URL or domain
  const getCurrentLocale = (): string => {
    // If we have a locale in the URL params, use that
    if (params?.locale) {
      return params.locale as string;
    }

    // Otherwise try to determine from domain (only after mount to avoid hydration issues)
    if (isMounted && typeof window !== 'undefined') {
      return getLocaleFromDomain(window.location.hostname);
    }

    return defaultLocale;
  }

  // Get the current locale
  const currentLocale = getCurrentLocale()

  // Determine if we're in local development (hydration-safe)
  const isLocalDev = isMounted && typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname.includes('netlify.app'))

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

  const description = getDescription();
  const copyright = getCopyright();

  return (
    <footer className="relative bg-lumora-dark text-lumora-cream border-t border-lumora-cream/10 pt-16 pb-8 mt-16 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-50 mix-blend-overlay">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-grain opacity-30" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-grain opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-lumora-cream/5 opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-lumora-cream/5 opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: Branding */}
          <div className="lg:col-span-1">
            <Link href={localizePathForLocale('/', currentLocale)} className="inline-block group relative mb-4">
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
            <p className="text-sm text-lumora-cream/70 max-w-xs leading-relaxed mb-6">
              {description}
            </p>

            <div className="flex space-x-3">
              <SocialIcon type="facebook" />
              <SocialIcon type="linkedin" />
              <SocialIcon type="instagram" />
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4">
              {currentLocale === 'nl' ? 'Navigatie' : currentLocale === 'de' ? 'Navigation' : 'Navigation'}
            </h3>
            <ul className="space-y-2.5">
              <FooterLink
                href={localizePathForLocale('/', currentLocale)}
                label={currentLocale === 'nl' ? 'Home' : currentLocale === 'de' ? 'Home' : 'Home'}
              />
              <FooterLink
                href={localizePathForLocale('/products', currentLocale)}
                label={currentLocale === 'nl' ? 'Producten' : currentLocale === 'de' ? 'Produkte' : 'Products'}
              />
              <FooterLink
                href={localizePathForLocale('/shop', currentLocale)}
                label={currentLocale === 'nl' ? 'Webshop' : currentLocale === 'de' ? 'Webshop' : 'Webshop'}
              />
              <FooterLink
                href={localizePathForLocale('/about', currentLocale)}
                label={currentLocale === 'nl' ? 'Over Ons' : currentLocale === 'de' ? 'Über Uns' : 'About'}
              />
              <FooterLink
                href={localizePathForLocale('/applications', currentLocale)}
                label={currentLocale === 'nl' ? 'Toepassingen' : currentLocale === 'de' ? 'Anwendungen' : 'Applications'}
              />
              <FooterLink
                href={localizePathForLocale('/contact', currentLocale)}
                label={currentLocale === 'nl' ? 'Contact' : currentLocale === 'de' ? 'Kontakt' : 'Contact'}
              />
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4">
              {currentLocale === 'nl' ? 'Producten' : currentLocale === 'de' ? 'Produkte' : 'Products'}
            </h3>
            <ul className="space-y-2.5">
              <FooterLink
                href={localizePathForLocale('/products/ellepot-fp12', currentLocale)}
                label="Ellepot FP 12+"
              />
              <FooterLink
                href={localizePathForLocale('/neemx-pro', currentLocale)}
                label="NEEMX PRO"
              />
              <FooterLink
                href={localizePathForLocale('/shop/paper-plug-tray-84', currentLocale)}
                label={currentLocale === 'nl' ? 'Paper Plug Tray 84' : 'Paper Plug Tray 84'}
              />
              <FooterLink
                href={localizePathForLocale('/shop/paper-plug-tray-104', currentLocale)}
                label={currentLocale === 'nl' ? 'Paper Plug Tray 104' : 'Paper Plug Tray 104'}
              />
            </ul>

            {/* Downloads */}
            <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4 mt-6">
              {currentLocale === 'nl' ? 'Downloads' : currentLocale === 'de' ? 'Downloads' : 'Downloads'}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="/downloads/Lumora-Ellepot-FP12-Folder.pdf"
                  download="Lumora-Ellepot-FP12-Folder.pdf"
                  className="text-sm text-lumora-cream/70 transition-colors duration-200 hover:text-lumora-cream group flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 text-lumora-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Ellepot FP12+ Folder (PDF)
                </a>
              </li>
              <li>
                <a
                  href={`/downloads/NEEMX-PRO-Folder-${currentLocale === 'de' ? 'DE' : 'NL'}.pdf`}
                  download={`NEEMX-PRO-Folder-${currentLocale === 'de' ? 'DE' : 'NL'}.pdf`}
                  className="text-sm text-lumora-cream/70 transition-colors duration-200 hover:text-lumora-cream group flex items-center"
                >
                  <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  NEEMX PRO Folder (PDF)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Knowledge Base (SEO Content Hub) */}
          <div>
            <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4">
              {currentLocale === 'nl' ? 'Kennisbank' : currentLocale === 'de' ? 'Wissensdatenbank' : 'Knowledge Base'}
            </h3>
            <ul className="space-y-2.5">
              {/* Propagatie Technologie */}
              <FooterLink
                href={localizePathForLocale('/propagatie-technologie/fp-12-technologie', currentLocale)}
                label={currentLocale === 'nl' ? 'FP 12+ Technologie' : currentLocale === 'de' ? 'FP 12+ Technologie' : 'FP 12+ Technology'}
              />
              <FooterLink
                href={localizePathForLocale('/propagatie-technologie/biologisch-afbreekbaar', currentLocale)}
                label={currentLocale === 'nl' ? 'Biologisch Afbreekbaar' : currentLocale === 'de' ? 'Biologisch Abbaubar' : 'Biodegradable'}
              />
              {/* Praktische Toepassingen */}
              <FooterLink
                href={localizePathForLocale('/praktische-toepassingen/paper-plugs-groenteteelt', currentLocale)}
                label={currentLocale === 'nl' ? 'Groenteteelt Gids' : currentLocale === 'de' ? 'Gemüseanbau Leitfaden' : 'Vegetable Growing Guide'}
              />
              {/* Duurzaamheid */}
              <FooterLink
                href={localizePathForLocale('/duurzaamheid/carbon-footprint-kweekmateriaal', currentLocale)}
                label={currentLocale === 'nl' ? 'Carbon Footprint' : currentLocale === 'de' ? 'CO2-Fußabdruck' : 'Carbon Footprint'}
              />
              {/* FAQ */}
              <FooterLink
                href={localizePathForLocale('/steenwol-vs-rockwool', currentLocale)}
                label={currentLocale === 'nl' ? 'Steenwol vs ROCKWOOL' : currentLocale === 'de' ? 'Steinwolle vs ROCKWOOL' : 'Rockwool vs Stone Wool'}
              />
              <FooterLink
                href={localizePathForLocale('/voordelen-nadelen-steenwol', currentLocale)}
                label={currentLocale === 'nl' ? 'Voor- & Nadelen' : currentLocale === 'de' ? 'Vor- & Nachteile' : 'Pros & Cons'}
              />
            </ul>
          </div>

          {/* Column 5: Legal + Language */}
          <div>
            <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4">
              {currentLocale === 'nl' ? 'Juridisch' : currentLocale === 'de' ? 'Rechtliches' : 'Legal'}
            </h3>
            <ul className="space-y-2.5 mb-6">
              <FooterLink
                href={localizePathForLocale('/privacy-policy', currentLocale)}
                label={currentLocale === 'nl' ? 'Privacybeleid' : currentLocale === 'de' ? 'Datenschutz' : 'Privacy Policy'}
              />
              <FooterLink
                href={localizePathForLocale('/terms-conditions', currentLocale)}
                label={currentLocale === 'nl' ? 'Algemene Voorwaarden' : currentLocale === 'de' ? 'AGB' : 'Terms & Conditions'}
              />
              <FooterLink
                href={localizePathForLocale('/return-policy', currentLocale)}
                label={currentLocale === 'nl' ? 'Retourbeleid' : currentLocale === 'de' ? 'Rückgaberecht' : 'Return Policy'}
              />
            </ul>

            <h3 className="text-sm font-semibold text-lumora-cream uppercase tracking-wider mb-4">
              {currentLocale === 'nl' ? 'Taal' : currentLocale === 'de' ? 'Sprache' : 'Language'}
            </h3>
            <ul className="space-y-2.5">
              <FooterLangLink
                locale="nl"
                label="🇳🇱 Nederlands"
                active={currentLocale === 'nl'}
                path={pathWithoutLocale}
                isLocalDev={isLocalDev}
              />
              <FooterLangLink
                locale="en"
                label="🇬🇧 English"
                active={currentLocale === 'en'}
                path={pathWithoutLocale}
                isLocalDev={isLocalDev}
              />
              <FooterLangLink
                locale="de"
                label="🇩🇪 Deutsch"
                active={currentLocale === 'de'}
                path={pathWithoutLocale}
                isLocalDev={isLocalDev}
              />
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-lumora-cream/10 pt-10 pb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-lumora-cream mb-2">
              {currentLocale === 'nl' ? '📬 Blijf op de hoogte' :
               currentLocale === 'en' ? '📬 Stay Updated' :
               '📬 Bleiben Sie informiert'}
            </h3>
            <p className="text-lumora-cream/70 text-sm mb-6">
              {currentLocale === 'nl' ? 'Ontvang de laatste updates over producten, tips en tuinbouwkennis.' :
               currentLocale === 'en' ? 'Get the latest updates on products, tips and horticultural knowledge.' :
               'Erhalten Sie die neuesten Updates zu Produkten, Tipps und Gartenbau-Wissen.'}
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="flex-1 bg-lumora-dark-700 border border-lumora-cream/20 text-lumora-cream px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-lumora-cream/30 focus:outline-none text-sm"
                placeholder={currentLocale === 'nl' ? 'je@email.nl' :
                             currentLocale === 'en' ? 'your@email.com' :
                             'deine@email.de'}
              />
              <button
                type="submit"
                className="bg-lumora-green-500 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-lumora-green-600 transition-all duration-300 flex items-center justify-center whitespace-nowrap text-sm"
              >
                {currentLocale === 'nl' ? 'Aanmelden' :
                 currentLocale === 'en' ? 'Subscribe' :
                 'Anmelden'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-lumora-cream/10 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-lumora-cream/60 text-center md:text-left">
              {copyright}
            </p>

            <div className="flex items-center justify-center md:justify-end gap-4 text-xs text-lumora-cream/60">
              <a href="mailto:info@lumorahorticulture.com" className="hover:text-lumora-cream transition-colors">
                ✉️ info@lumorahorticulture.com
              </a>
              <a href="https://lumorahorticulture.nl" className="hover:text-lumora-cream transition-colors">
                🌐 lumorahorticulture.nl
              </a>
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
        className="text-sm text-lumora-cream/70 transition-colors duration-200 hover:text-lumora-cream group flex items-center relative"
      >
        <span className="absolute left-0 w-0 h-0.5 bg-lumora-green-500/60 group-hover:w-3 transition-all duration-200"></span>
        <span className="group-hover:pl-4 transition-all duration-200">{label}</span>
      </Link>
    </li>
  )
}

// Footer language link component
function FooterLangLink({ locale, label, active, path, isLocalDev }: { locale: string; label: string; active: boolean; path: string; isLocalDev: boolean }) {
  return (
    <li>
      <a
        href={createLocalizedUrl(locale, path, isLocalDev)}
        className={`text-sm transition-colors duration-200 flex items-center ${
          active ? 'text-lumora-cream font-medium' : 'text-lumora-cream/70 hover:text-lumora-cream'
        }`}
      >
        {active && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 mr-1.5 text-lumora-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
        {label}
      </a>
    </li>
  )
}

// Social icon component
function SocialIcon({ type }: { type: 'facebook' | 'linkedin' | 'instagram' }) {
  const icons = {
    facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }

  return (
    <a
      href="#"
      className="rounded-full bg-lumora-dark-700 p-2.5 text-lumora-cream/70 hover:text-lumora-cream hover:bg-lumora-green-500/20 transition-all duration-300 border border-lumora-cream/10 hover:border-lumora-green-500/30"
      aria-label={type}
    >
      {icons[type]}
    </a>
  )
}
