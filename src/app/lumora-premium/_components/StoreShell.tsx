'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, type ReactNode } from 'react'
import { calculatePaperbusPromotion } from '@/lib/paperbus-promo'
import { formatPrice } from '../_data/products'
import styles from '../storefront.module.css'
import {
  BagIcon,
  GridIcon,
  HelpIcon,
  HomeIcon,
  LockIcon,
  UserIcon,
} from './Icons'

const ROOT = '/lumora-premium'

function readActionCart(searchParams: ReturnType<typeof useSearchParams>) {
  if (searchParams.get('action') !== 'stekpluggen-3-voor-180') return null
  const quantity = Math.min(100, Math.max(1, Number.parseInt(searchParams.get('quantity') ?? '3', 10) || 3))
  const is104 = searchParams.get('variant') === 'tray-104'
  const promotion = calculatePaperbusPromotion(
    is104 ? 'paper-plug-tray-104' : 'paper-plug-tray-84',
    is104 ? 80 : 84,
    quantity,
  )
  return { quantity, total: promotion.total }
}

function CheckoutActionTotal() {
  const actionCart = readActionCart(useSearchParams())
  return <strong>{actionCart ? formatPrice(actionCart.total) : '€ 108,95'}</strong>
}

function ActionCartLink() {
  const searchParams = useSearchParams()
  const actionCart = readActionCart(searchParams)
  const actionQuery = actionCart ? `?${searchParams.toString()}` : ''
  const quantity = actionCart?.quantity ?? 2

  return (
    <Link className={styles.cartButton} href={`${ROOT}/winkelmand${actionQuery}`} aria-label={`Winkelwagen met ${quantity} artikelen`}>
      <BagIcon />
      <span className={styles.cartLabel}>Winkelwagen</span>
      <span className={styles.cartCount}>{quantity}</span>
    </Link>
  )
}

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
  const isCheckout = pathname === `${ROOT}/afrekenen`
  const isPdp = pathname === `${ROOT}/paperbus` || pathname === `${ROOT}/neemx-pro`
  const isCart = pathname === `${ROOT}/winkelmand`

  if (isCheckout) {
    return (
      <div className={`${styles.site} ${styles.checkoutSite}`} data-lumora-storefront>
        <header className={styles.checkoutHeader}>
          <div className={styles.shellRow}>
            <Link href={ROOT} className={styles.logoLink} aria-label="Terug naar Lumora">
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
              <Suspense fallback={<strong>€ 108,95</strong>}><CheckoutActionTotal /></Suspense>
            </span>
            <a href="#contactgegevens" className={styles.dockPrimaryAction}>
              Gegevens invullen
            </a>
          </div>
          <div className={styles.checkoutDockTrust} aria-label="Veiligheid en service">
            <span>Veilig online betalen</span>
            <Link href="/retourbeleid">14 dagen bedenktijd</Link>
            <a href="mailto:info@lumorahorticulture.com">Contact</a>
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
          <Link href={ROOT} className={styles.logoLink} aria-label="Lumora homepage">
            <Wordmark priority />
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
            <Link className={styles.accountButton} href="/account" aria-label="Mijn account">
              <UserIcon />
              <span className={styles.cartLabel}>Account</span>
            </Link>
            <Suspense fallback={(
              <Link className={styles.cartButton} href={`${ROOT}/winkelmand`} aria-label="Winkelwagen met 2 artikelen">
                <BagIcon />
                <span className={styles.cartLabel}>Winkelwagen</span>
                <span className={styles.cartCount}>2</span>
              </Link>
            )}>
              <ActionCartLink />
            </Suspense>
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
            <Link href={`${ROOT}/paperbus`}>Stekpluggen Steenwol</Link>
            <Link href={`${ROOT}/neemx-pro`}>NeemX Pro</Link>
          </div>
          <div>
            <h2>Service</h2>
            <a href="mailto:info@lumorahorticulture.com">Contact</a>
            <Link href="/retourbeleid">Retourbeleid</Link>
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
          <span>Veilig online betalen met bekende betaalmethoden</span>
        </div>
      </footer>

      {isPdp || isCart ? null : (
        <nav className={styles.mobileNav} aria-label="Mobiele navigatie">
          <Link
            aria-current={pathname === ROOT ? 'page' : undefined}
            className={pathname === ROOT ? styles.mobileNavActive : ''}
            href={ROOT}
          >
            <span className={styles.mobileNavIcon}><HomeIcon /></span>
            <span>Home</span>
          </Link>
          <Link
            aria-current={pathname === `${ROOT}/producten` ? 'page' : undefined}
            className={pathname === `${ROOT}/producten` ? styles.mobileNavActive : ''}
            href={`${ROOT}/producten`}
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
          <Link className={pathname === `${ROOT}/winkelmand` ? styles.mobileNavActive : ''} href={`${ROOT}/winkelmand`}>
            <span className={`${styles.mobileNavIcon} ${styles.mobileBagWrap}`}>
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
