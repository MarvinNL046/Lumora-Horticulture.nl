'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import styles from '../storefront.module.css'
import {
  BagIcon,
  GridIcon,
  HelpIcon,
  HomeIcon,
  LeafIcon,
  LockIcon,
} from './Icons'

const ROOT = '/lumora-premium'

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={styles.wordmark} aria-label="Lumora Horticulture">
      <span className={styles.wordmarkMark}>
        <LeafIcon />
      </span>
      <span className={styles.wordmarkText}>
        <strong>Lumora</strong>
        {!compact && <small>Horticulture</small>}
      </span>
    </span>
  )
}

export function StoreShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isCheckout = pathname === `${ROOT}/afrekenen`
  const isPdp = pathname === `${ROOT}/paperbus` || pathname === `${ROOT}/neemx-pro`
  const isCart = pathname === `${ROOT}/winkelmand`

  if (isCheckout) {
    return (
      <div className={`${styles.site} ${styles.checkoutSite}`}>
        <header className={styles.checkoutHeader}>
          <div className={styles.shellRow}>
            <Link href={ROOT} className={styles.logoLink} aria-label="Terug naar Lumora">
              <Wordmark />
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
              <strong>€ 108,95</strong>
            </span>
            <a href="#contactgegevens" className={styles.dockPrimaryAction}>
              Gegevens invullen
            </a>
          </div>
          <div className={styles.checkoutDockTrust} aria-label="Veiligheid en service">
            <span>Via Mollie</span>
            <Link href="/return-policy">14 dagen bedenktijd</Link>
            <a href="mailto:info@lumorahorticulture.com">Contact</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.site}>
      <div className={styles.utilityBar}>
        <div className={styles.shellRow}>
          <span>Specialistische producten voor plant en opkweek</span>
          <a href="mailto:info@lumorahorticulture.com">Productadvies nodig? Neem contact op</a>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.shellRow}>
          <Link href={ROOT} className={styles.logoLink} aria-label="Lumora homepage">
            <Wordmark />
          </Link>

          <nav className={styles.desktopNav} aria-label="Hoofdnavigatie">
            <Link className={pathname === `${ROOT}/producten` ? styles.activeNav : ''} href={`${ROOT}/producten`}>
              Producten
            </Link>
            <a href={`${ROOT}/#waarom-lumora`}>Waarom Lumora</a>
            <a href="mailto:info@lumorahorticulture.com">Hulp & contact</a>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.languageButton} type="button" aria-label="Taal: Nederlands">
              NL <span aria-hidden="true">⌄</span>
            </button>
            <Link className={styles.cartButton} href={`${ROOT}/winkelmand`} aria-label="Winkelwagen met 2 artikelen">
              <BagIcon />
              <span className={styles.cartLabel}>Winkelwagen</span>
              <span className={styles.cartCount}>2</span>
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
            <Link href={`${ROOT}/paperbus`}>Paperbus Pluggen</Link>
            <Link href={`${ROOT}/neemx-pro`}>NeemX Pro</Link>
          </div>
          <div>
            <h2>Service</h2>
            <a href="mailto:info@lumorahorticulture.com">Contact</a>
            <Link href="/return-policy">Retourbeleid</Link>
            <Link href="/terms">Voorwaarden</Link>
          </div>
          <div>
            <h2>Bereikbaar</h2>
            <a href="mailto:info@lumorahorticulture.com">info@lumorahorticulture.com</a>
            <p>KvK 96669772</p>
          </div>
        </div>
        <div className={`${styles.container} ${styles.footerBottom}`}>
          <span>© 2026 Lumora Horticulture</span>
          <span>Betaling wordt veilig verwerkt via Mollie</span>
        </div>
      </footer>

      {isPdp || isCart ? null : (
        <nav className={styles.mobileNav} aria-label="Mobiele navigatie">
          <Link className={pathname === ROOT ? styles.mobileNavActive : ''} href={ROOT}>
            <HomeIcon />
            <span>Home</span>
          </Link>
          <Link className={pathname === `${ROOT}/producten` ? styles.mobileNavActive : ''} href={`${ROOT}/producten`}>
            <GridIcon />
            <span>Producten</span>
          </Link>
          <a href="mailto:info@lumorahorticulture.com">
            <HelpIcon />
            <span>Hulp</span>
          </a>
          <Link className={pathname === `${ROOT}/winkelmand` ? styles.mobileNavActive : ''} href={`${ROOT}/winkelmand`}>
            <span className={styles.mobileBagWrap}>
              <BagIcon />
              <small>2</small>
            </span>
            <span>Mandje</span>
          </Link>
        </nav>
      )}
    </div>
  )
}
