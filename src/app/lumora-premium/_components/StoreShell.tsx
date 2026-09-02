'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@stackframe/stack'
import { useLocale } from 'next-intl'
import { useState, type MouseEvent, type ReactNode } from 'react'
import { useCart } from '@/contexts/CartContext'
import { localizePathForLocale } from '@/lib/url-localizations'
import { formatPrice } from '../_data/products'
import { getStorefrontRoutes } from '../_data/routes'
import styles from '../storefront.module.css'
import {
  BagIcon,
  GridIcon,
  HelpIcon,
  HomeIcon,
  LockIcon,
  UserIcon,
} from './Icons'
import { PaymentLogos } from './PaymentLogos'
import {
  getStorefrontLanguageHref,
  localizeStorefrontRoutes,
  resolveStorefrontLocale,
  storefrontLanguages,
  storefrontShellCopy,
} from './storefront-localization'

function Wordmark({ priority = false }: { priority?: boolean }) {
  return (
    <span className={styles.wordmark} aria-label="Lumora Horticulture">
      <Image
        className={styles.wordmarkImage}
        src="/brand/lumora-horticulture-logo.avif"
        alt=""
        width={64}
        height={64}
        priority={priority}
      />
    </span>
  )
}

export function StoreShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const locale = resolveStorefrontLocale(useLocale())
  const copy = storefrontShellCopy[locale]
  const [languageOpen, setLanguageOpen] = useState(false)
  const user = useUser({ or: 'return-null' })
  const { getTotalItems, getTotalPrice } = useCart()
  const cartCount = getTotalItems()
  const cartTotal = getTotalPrice()
  const routes = localizeStorefrontRoutes(getStorefrontRoutes(pathname), locale)
  const isCheckout = pathname === routes.checkout
  const localeAgnosticPath = pathname.replace(/^\/(?:nl|en|de)(?=\/)/, '')
  const isCheckoutReturn = ['/checkout/success', '/checkout/conversion'].some((route) => localeAgnosticPath.startsWith(route))
  const isCheckoutFlow = isCheckout || isCheckoutReturn
  const isAccount = localeAgnosticPath === '/account' || localeAgnosticPath.startsWith('/account/')
  const isPdp = pathname === routes.stekpluggen || pathname === routes.neemx
  const isCart = pathname === routes.cart
  const accountHref = user
    ? localizePathForLocale('/account', locale)
    : `/handler/sign-in?lang=${locale}`

  if (isCheckoutFlow) {
    return (
      <div className={`${styles.site} ${styles.checkoutSite} ${isCheckout ? styles.checkoutDockSite : ''}`} data-lumora-storefront>
        <header className={styles.checkoutHeader}>
          <div className={styles.shellRow}>
            <Link href={routes.home} className={styles.logoLink} aria-label={copy.checkoutHomeLabel}>
              <Wordmark priority />
            </Link>
            <span className={styles.secureLabel}>
              <LockIcon /> {copy.secureCheckout}
            </span>
          </div>
        </header>
        {children}
        {isCheckout ? (
          <div className={styles.checkoutDock}>
            <div className={styles.checkoutDockMain}>
              <span>
                <small>{copy.total}</small>
                <strong>{formatPrice(cartTotal)}</strong>
              </span>
              <a href="#bestelling-plaatsen" className={styles.dockPrimaryAction}>
                {copy.toPayment}
              </a>
            </div>
            <div className={styles.checkoutDockTrust} aria-label={copy.paymentMethods}>
              <span>{copy.payWith}</span>
              <PaymentLogos />
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className={styles.site} data-lumora-storefront>
      <div className={styles.utilityBar}>
        <div className={styles.shellRow}>
          <span>{copy.utilityLine}</span>
          <a href="mailto:info@lumorahorticulture.com">{copy.utilityContact}</a>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.shellRow}>
          <Link href={routes.home} className={styles.logoLink} aria-label={copy.homepageLabel}>
            <Wordmark priority />
          </Link>

          <nav className={styles.desktopNav} aria-label={copy.mainNavigation}>
            <Link className={pathname === routes.products ? styles.activeNav : ''} href={routes.products}>
              {copy.products}
            </Link>
            <a href={`${routes.home === '/' ? '' : routes.home}/#waarom-lumora`}>{copy.whyLumora}</a>
            <a href="mailto:info@lumorahorticulture.com">{copy.helpContact}</a>
          </nav>

          <div className={styles.headerActions}>
            <div
              className={styles.languagePicker}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setLanguageOpen(false)
                }
              }}
            >
              <button
                className={styles.languageButton}
                type="button"
                aria-label={copy.languageLabel}
                aria-haspopup="menu"
                aria-expanded={languageOpen}
                onClick={() => setLanguageOpen((open) => !open)}
              >
                {locale.toUpperCase()} <span aria-hidden="true">⌄</span>
              </button>
              {languageOpen ? (
                <div className={styles.languageMenu} role="menu" aria-label={copy.languageLabel}>
                  {storefrontLanguages.map((language) => (
                    <a
                      key={language.locale}
                      href={getStorefrontLanguageHref(pathname, locale, language.locale)}
                      role="menuitem"
                      aria-current={language.locale === locale ? 'true' : undefined}
                      onClick={() => setLanguageOpen(false)}
                    >
                      <span>{language.locale.toUpperCase()}</span>
                      {language.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <Link className={styles.accountButton} href={accountHref} aria-label={copy.accountLabel} onClick={openAccountWithFreshDocument}>
              <UserIcon />
              <span className={styles.cartLabel}>{copy.account}</span>
            </Link>
            <Link className={styles.cartButton} href={routes.cart} aria-label={`${copy.cart}: ${cartCount}`}>
              <BagIcon />
              <span className={styles.cartLabel}>{copy.cart}</span>
              <span className={styles.cartCount}>{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div className={styles.footerBrand}>
            <Wordmark />
            <p>{copy.footerLead}</p>
          </div>
          <div>
            <h2>{copy.products}</h2>
            <Link href={routes.stekpluggen}>{copy.cuttingPlugs}</Link>
            <Link href={routes.neemx}>NeemX Pro</Link>
          </div>
          <div>
            <h2>{copy.service}</h2>
            <a href="mailto:info@lumorahorticulture.com">{copy.contact}</a>
            <Link href={localizePathForLocale('/return-policy', locale)}>{copy.returnPolicy}</Link>
            <Link href={localizePathForLocale('/terms', locale)}>{copy.terms}</Link>
          </div>
          <div>
            <h2>{copy.reachable}</h2>
            <a href="mailto:info@lumorahorticulture.com">info@lumorahorticulture.com</a>
            <p>KvK 96669772</p>
          </div>
        </div>
        <div className={`${styles.container} ${styles.footerBottom}`}>
          <span>© 2026 Lumora Horticulture</span>
          <span>{copy.safePayment}</span>
        </div>
      </footer>

      {isPdp || isCart || isAccount ? null : (
        <nav className={styles.mobileNav} aria-label={copy.mobileNavigation}>
          <Link
            aria-current={pathname === routes.home ? 'page' : undefined}
            className={pathname === routes.home ? styles.mobileNavActive : ''}
            href={routes.home}
          >
            <span className={styles.mobileNavIcon}><HomeIcon /></span>
            <span>{copy.home}</span>
          </Link>
          <Link
            aria-current={pathname === routes.products ? 'page' : undefined}
            className={pathname === routes.products ? styles.mobileNavActive : ''}
            href={routes.products}
          >
            <span className={styles.mobileNavIcon}><GridIcon /></span>
            <span>{copy.products}</span>
          </Link>
          <a href="mailto:info@lumorahorticulture.com">
            <span className={styles.mobileNavIcon}><HelpIcon /></span>
            <span>{copy.help}</span>
          </a>
          <Link href={accountHref} onClick={openAccountWithFreshDocument}>
            <span className={styles.mobileNavIcon}><UserIcon /></span>
            <span>{copy.account}</span>
          </Link>
          <Link className={pathname === routes.cart ? styles.mobileNavActive : ''} href={routes.cart}>
            <span className={`${styles.mobileNavIcon} ${styles.mobileBagWrap}`}>
              <BagIcon />
              <small>{cartCount}</small>
            </span>
            <span>{copy.bag}</span>
          </Link>
        </nav>
      )}
    </div>
  )
}

// The account lives in a separate authenticated route tree. Loading a fresh
// document avoids reusing a storefront shell cached before a deployment.
function openAccountWithFreshDocument(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) return

  event.preventDefault()
  window.location.assign(event.currentTarget.href)
}
