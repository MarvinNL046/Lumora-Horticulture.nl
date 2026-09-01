'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useCart } from '@/contexts/CartContext'
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
  const { getTotalItems, getTotalPrice } = useCart()
  const cartCount = getTotalItems()
  const cartTotal = getTotalPrice()
  const routes = getStorefrontRoutes(pathname)
  const isCheckout = pathname === routes.checkout
  const isPdp = pathname === routes.stekpluggen || pathname === routes.neemx
  const isCart = pathname === routes.cart

  if (isCheckout) {
    return (
      <div className={`${styles.site} ${styles.checkoutSite}`} data-lumora-storefront>
        <header className={styles.checkoutHeader}>
          <div className={styles.shellRow}>
            <Link href={routes.home} className={styles.logoLink} aria-label="Terug naar Lumora">
              <Wordmark priority />
            </Link>
            <span className={styles.secureLabel}>
              <LockIcon /> Veilig afrekenen
            </span>
          </div>
        </header>
        {children}
        <div className={styles.checkoutDock}>
          <div className={styles.checkoutDockMain}>
            <span>
              <small>Totaal</small>
              <strong>{formatPrice(cartTotal)}</strong>
            </span>
            <a href="#bestelling-plaatsen" className={styles.dockPrimaryAction}>
              Naar betaling
            </a>
          </div>
          <div className={styles.checkoutDockTrust} aria-label="Beschikbare betaalmethoden">
            <span>Betaal met</span>
            <PaymentLogos />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.site} data-lumora-storefront>
      <div className={styles.utilityBar}>
        <div className={styles.shellRow}>
          <span>Specialistische producten voor plant en opkweek</span>
          <a href="mailto:info@lumorahorticulture.com">Productadvies nodig? Neem contact op</a>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.shellRow}>
          <Link href={routes.home} className={styles.logoLink} aria-label="Lumora homepage">
            <Wordmark priority />
          </Link>

          <nav className={styles.desktopNav} aria-label="Hoofdnavigatie">
            <Link className={pathname === routes.products ? styles.activeNav : ''} href={routes.products}>
              Producten
            </Link>
            <a href={`${routes.home === '/' ? '' : routes.home}/#waarom-lumora`}>Waarom Lumora</a>
            <a href="mailto:info@lumorahorticulture.com">Hulp & contact</a>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.languageButton} type="button" aria-label="Taal: Nederlands">
              NL <span aria-hidden="true">⌄</span>
            </button>
            <Link className={styles.accountButton} href="/account" aria-label="Mijn account">
              <UserIcon />
              <span className={styles.cartLabel}>Account</span>
            </Link>
            <Link className={styles.cartButton} href={routes.cart} aria-label={`Winkelwagen met ${cartCount} artikelen`}>
              <BagIcon />
              <span className={styles.cartLabel}>Winkelwagen</span>
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
            <p>Twee specialistische productfamilies, met aandacht geselecteerd voor plant en opkweek.</p>
          </div>
          <div>
            <h2>Producten</h2>
            <Link href={routes.stekpluggen}>Stekpluggen Steenwol</Link>
            <Link href={routes.neemx}>NeemX Pro</Link>
          </div>
          <div>
            <h2>Service</h2>
            <a href="mailto:info@lumorahorticulture.com">Contact</a>
            <Link href="/retourbeleid">Retourbeleid</Link>
            <Link href="/algemene-voorwaarden">Voorwaarden</Link>
          </div>
          <div>
            <h2>Bereikbaar</h2>
            <a href="mailto:info@lumorahorticulture.com">info@lumorahorticulture.com</a>
            <p>KvK 96669772</p>
          </div>
        </div>
        <div className={`${styles.container} ${styles.footerBottom}`}>
          <span>© 2026 Lumora Horticulture</span>
          <span>Veilig online betalen met bekende betaalmethoden</span>
        </div>
      </footer>

      {isPdp || isCart ? null : (
        <nav className={styles.mobileNav} aria-label="Mobiele navigatie">
          <Link
            aria-current={pathname === routes.home ? 'page' : undefined}
            className={pathname === routes.home ? styles.mobileNavActive : ''}
            href={routes.home}
          >
            <span className={styles.mobileNavIcon}><HomeIcon /></span>
            <span>Home</span>
          </Link>
          <Link
            aria-current={pathname === routes.products ? 'page' : undefined}
            className={pathname === routes.products ? styles.mobileNavActive : ''}
            href={routes.products}
          >
            <span className={styles.mobileNavIcon}><GridIcon /></span>
            <span>Producten</span>
          </Link>
          <a href="mailto:info@lumorahorticulture.com">
            <span className={styles.mobileNavIcon}><HelpIcon /></span>
            <span>Hulp</span>
          </a>
          <Link href="/account">
            <span className={styles.mobileNavIcon}><UserIcon /></span>
            <span>Account</span>
          </Link>
          <Link className={pathname === routes.cart ? styles.mobileNavActive : ''} href={routes.cart}>
            <span className={`${styles.mobileNavIcon} ${styles.mobileBagWrap}`}>
              <BagIcon />
              <small>{cartCount}</small>
            </span>
            <span>Mandje</span>
          </Link>
        </nav>
      )}
    </div>
  )
}
