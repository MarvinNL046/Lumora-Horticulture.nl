import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from '../_components/Icons'
import { ProductFamilyCard } from '../_components/ProductFamilyCard'
import { TrustStrip } from '../_components/TrustStrip'
import { StekplugPromoBand } from '../_components/StekplugPromoBand'
import { getLocalizedProducts, productsPageCopy, sharedCopy } from '../_data/storefront-content'
import { previewStorefrontRoutes, publicStorefrontRoutes, type StorefrontRoutes } from '../_data/routes'
import type { StorefrontLocale } from '../_components/storefront-localization'
import styles from '../storefront.module.css'

export const metadata: Metadata = {
  title: 'Stekpluggen Steenwol & NeemXPRO | Lumora Horticulture',
  description: 'Vergelijk professionele Stekpluggen Steenwol 84 en 104 met exacte tray- en doosinhoud, of kies NeemXPRO voor botanische bladverzorging.',
}

export function StorefrontProductsPage({ routes = publicStorefrontRoutes, locale = 'nl' }: { routes?: StorefrontRoutes; locale?: StorefrontLocale }) {
  const copy = productsPageCopy[locale]
  const localized = getLocalizedProducts(locale)
  const localizedProducts = [localized.paperbus, localized.neemx]
  return (
    <main>
      <section className={styles.collectionHero}>
        <div className={`${styles.container} ${styles.collectionHeroGrid}`}>
          <div>
            <span className={styles.eyebrow}>{copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <Link className={styles.collectionHeroAction} href="#productlijnen">
              {copy.action} <ArrowRightIcon />
            </Link>
          </div>
          <div className={styles.collectionHeroVisual}>
            <div className={styles.collectionImageOne}>
              <Image
                src="/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-alternate.webp"
                alt={localized.paperbus.secondaryImageAlt}
                fill
                priority
                sizes="260px"
              />
            </div>
            <div className={styles.collectionImageTwo}>
              <Image
                src={localized.neemx.mainImage}
                alt={localized.neemx.mainImageAlt}
                fill
                priority
                sizes="220px"
              />
            </div>
            <Link className={styles.collectionMobileOffer} href={`${routes.stekpluggen}#koopblok`}>
              <span>{sharedCopy[locale].promoBadge}</span>
              <strong>{sharedCopy[locale].promoPrice}</strong>
              <small>{sharedCopy[locale].promoShipping}</small>
            </Link>
          </div>
        </div>
      </section>

      <StekplugPromoBand href={`${routes.stekpluggen}#koopblok`} locale={locale} />

      <section className={styles.collectionProducts} id="productlijnen">
        <div className={styles.container}>
          <div className={styles.collectionCount}><span>{copy.lines}</span><span>{copy.variants}</span></div>
          <div className={styles.productGrid}>
            {localizedProducts.map((product) => (
              <ProductFamilyCard
                product={product}
                key={product.id}
                href={product.id === 'paperbus' ? routes.stekpluggen : routes.neemx}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <TrustStrip locale={locale} />

      <section className={styles.compareSection}>
        <div className={styles.container}>
          <div className={styles.compareIntro}>
            <span className={styles.eyebrow}>{copy.glance}</span>
            <h2>{copy.compareTitle}</h2>
            <p>{copy.compareIntro}</p>
          </div>
          <div className={styles.compareTable} role="table" aria-label={`${localized.paperbus.name} / NeemXPRO`}>
            <div className={`${styles.compareRow} ${styles.compareHeader}`} role="row">
              <span role="columnheader">{copy.seek}</span>
              <span role="columnheader">{localized.paperbus.name}</span>
              <span role="columnheader">NeemXPRO</span>
            </div>
            <div className={styles.compareRow} role="row">
              <strong role="rowheader">{copy.application}</strong>
              <span role="cell"><CheckIcon /> {copy.growing}</span>
              <span role="cell"><CheckIcon /> {copy.care}</span>
            </div>
            <div className={styles.compareRow} role="row">
              <strong role="rowheader">{copy.versions}</strong>
              <span role="cell">{localized.paperbus.variants[0].label} / {localized.paperbus.variants[1].label}</span>
              <span role="cell">{locale === 'en' ? '10 ml, 30 ml or 50 ml' : locale === 'de' ? '10 ml, 30 ml oder 50 ml' : '10 ml, 30 ml of 50 ml'}</span>
            </div>
            <div className={styles.compareRow} role="row">
              <strong role="rowheader">{copy.next}</strong>
              <span role="cell"><Link href={routes.stekpluggen}>{copy.choosePlugs} <ArrowRightIcon /></Link></span>
              <span role="cell"><Link href={routes.neemx}>{copy.chooseSize} <ArrowRightIcon /></Link></span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.collectionHelp}>
        <div className={`${styles.container} ${styles.collectionHelpInner}`}>
          <div><span className={styles.eyebrow}>{copy.uncertain}</span><h2>{copy.tell}</h2></div>
          <p>{copy.help}</p>
          <a className={styles.primaryButton} href="mailto:info@lumorahorticulture.com">{copy.advice} <ArrowRightIcon /></a>
        </div>
      </section>
    </main>
  )
}

export default function ProductenPage() {
  return <StorefrontProductsPage routes={previewStorefrontRoutes} />
}
