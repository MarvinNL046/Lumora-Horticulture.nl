import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon, LeafIcon } from './_components/Icons'
import { ProductFamilyCard } from './_components/ProductFamilyCard'
import { TrustStrip } from './_components/TrustStrip'
import { StekplugPromoBand } from './_components/StekplugPromoBand'
import { getLocalizedProducts, homeCopy } from './_data/storefront-content'
import { previewStorefrontRoutes, publicStorefrontRoutes, type StorefrontRoutes } from './_data/routes'
import type { StorefrontLocale } from './_components/storefront-localization'
import styles from './storefront.module.css'

export function StorefrontHomePage({ routes = publicStorefrontRoutes, locale = 'nl' }: { routes?: StorefrontRoutes; locale?: StorefrontLocale }) {
  const copy = homeCopy[locale]
  const localized = getLocalizedProducts(locale)
  const localizedProducts = [localized.paperbus, localized.neemx]
  return (
    <main>
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <span /> Lumora Horticulture
            </span>
            <h1>{copy.title}</h1>
            <p className={styles.heroLead}>
              {copy.lead}
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href={routes.products}>
                {copy.products} <ArrowRightIcon />
              </Link>
              <a className={styles.secondaryButton} href="mailto:info@lumorahorticulture.com">
                {copy.help}
              </a>
            </div>
            <div className={styles.heroProof}>
              <span><CheckIcon /> {copy.proofOne}</span>
              <span><CheckIcon /> {copy.proofTwo}</span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <Image
              className={`${styles.heroImage} ${styles.heroImageDesktop}`}
              src={localized.paperbus.heroImage ?? localized.paperbus.secondaryImage}
              alt={localized.paperbus.heroImageAlt ?? localized.paperbus.secondaryImageAlt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 56vw"
            />
            <Image
              className={`${styles.heroImage} ${styles.heroImageMobile}`}
              src={localized.paperbus.heroMobileImage ?? localized.paperbus.heroImage ?? localized.paperbus.secondaryImage}
              alt={localized.paperbus.heroImageAlt ?? localized.paperbus.secondaryImageAlt}
              fill
              sizes="100vw"
            />
            <div className={styles.heroCaption}>
              <span className={styles.heroCaptionIcon}><LeafIcon /></span>
              <span><small>{copy.heroTitle}</small><strong>{copy.heroText}</strong></span>
            </div>
            <Link className={styles.heroMiniCard} href={routes.neemx}>
              <span className={styles.heroMiniImage}>
                <Image src={localized.neemx.mainImage} alt="" fill sizes="132px" />
              </span>
              <span>
                <small>{copy.miniTop}</small>
                <strong>{copy.miniTitle}</strong>
              </span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <StekplugPromoBand href={`${routes.stekpluggen}#koopblok`} locale={locale} />
      <TrustStrip locale={locale} />

      <section className={styles.section} id="producten">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>{copy.specialty}</span>
              <h2>{copy.chooseTitle}</h2>
            </div>
            <p>{copy.chooseText}</p>
          </div>
          <div className={styles.productGrid}>
            {localizedProducts.map((product) => (
              <ProductFamilyCard
                key={product.id}
                product={product}
                href={product.id === 'paperbus' ? routes.stekpluggen : routes.neemx}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.choiceSection} id="waarom-lumora">
        <div className={`${styles.container} ${styles.choiceGrid}`}>
          <div className={styles.choiceImage}>
            <Image
              src={localized.paperbus.tertiaryImage ?? localized.paperbus.mainImage}
              alt={localized.paperbus.tertiaryImageAlt ?? localized.paperbus.mainImageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
            />
            <span>{copy.adviceImage}</span>
          </div>
          <div className={styles.choiceCopy}>
            <span className={styles.eyebrow}>{copy.simple}</span>
            <h2>{copy.routeTitle}</h2>
            <p>{copy.routeText}</p>
            <ol className={styles.choiceSteps}>
              {copy.steps.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><small>{text}</small></div></li>)}
            </ol>
            <Link className={styles.textLink} href={routes.products}>{copy.compare} <ArrowRightIcon /></Link>
          </div>
        </div>
      </section>

      <section className={styles.helpBanner}>
        <div className={`${styles.container} ${styles.helpBannerInner}`}>
          <div>
            <span className={styles.eyebrow}>{copy.personal}</span>
            <h2>{copy.unsure}</h2>
            <p>{copy.helpText}</p>
          </div>
          <a className={styles.lightButton} href="mailto:info@lumorahorticulture.com">{copy.question} <ArrowRightIcon /></a>
        </div>
      </section>
    </main>
  )
}

export default function LumoraPremiumHomePage() {
  return <StorefrontHomePage routes={previewStorefrontRoutes} />
}
