import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon, LeafIcon } from './_components/Icons'
import { ProductFamilyCard } from './_components/ProductFamilyCard'
import { TrustStrip } from './_components/TrustStrip'
import { StekplugPromoBand } from './_components/StekplugPromoBand'
import { neemx, paperbus, productFamilies } from './_data/products'
import styles from './storefront.module.css'

export default function LumoraPremiumHomePage() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <span /> Lumora Horticulture
            </span>
            <h1>Gerichte producten voor sterke, verzorgde planten.</h1>
            <p className={styles.heroLead}>
              Stekpluggen van steenwol voor zaaien en stekken. NeemX Pro voor gerichte plantverzorging. Twee heldere productlijnen, direct online te bestellen.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/lumora-premium/producten">
                Bekijk de producten <ArrowRightIcon />
              </Link>
              <a className={styles.secondaryButton} href="mailto:info@lumorahorticulture.com">
                Hulp bij kiezen
              </a>
            </div>
            <div className={styles.heroProof}>
              <span><CheckIcon /> Slechts twee productlijnen</span>
              <span><CheckIcon /> iDEAL, Wero &amp; creditcard</span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <Image
              className={`${styles.heroImage} ${styles.heroImageDesktop}`}
              src={paperbus.heroImage ?? paperbus.secondaryImage}
              alt={paperbus.heroImageAlt ?? paperbus.secondaryImageAlt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 56vw"
            />
            <Image
              className={`${styles.heroImage} ${styles.heroImageMobile}`}
              src={paperbus.heroMobileImage ?? paperbus.heroImage ?? paperbus.secondaryImage}
              alt={paperbus.heroImageAlt ?? paperbus.secondaryImageAlt}
              fill
              sizes="100vw"
            />
            <div className={styles.heroCaption}>
              <span className={styles.heroCaptionIcon}><LeafIcon /></span>
              <span><small>Stekpluggen Steenwol</small><strong>Voor een overzichtelijke opkweek</strong></span>
            </div>
            <Link className={styles.heroMiniCard} href={neemx.href}>
              <span className={styles.heroMiniImage}>
                <Image src={neemx.mainImage} alt="" fill sizes="132px" />
              </span>
              <span>
                <small>Ook voor plantverzorging</small>
                <strong>Ontdek NeemX Pro</strong>
              </span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <StekplugPromoBand />
      <TrustStrip />

      <section className={styles.section} id="producten">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.eyebrow}>Twee specialismen</span>
              <h2>Kies wat je plant nu nodig heeft.</h2>
            </div>
            <p>Begin bij je doel. De juiste uitvoering kies je pas daarna, zonder een overvolle catalogus.</p>
          </div>
          <div className={styles.productGrid}>
            {productFamilies.map((product) => <ProductFamilyCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className={styles.choiceSection} id="waarom-lumora">
        <div className={`${styles.container} ${styles.choiceGrid}`}>
          <div className={styles.choiceImage}>
            <Image
              src={paperbus.tertiaryImage ?? paperbus.mainImage}
              alt={paperbus.tertiaryImageAlt ?? paperbus.mainImageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
            />
            <span>Productadvies zonder omwegen</span>
          </div>
          <div className={styles.choiceCopy}>
            <span className={styles.eyebrow}>Eenvoudig kiezen</span>
            <h2>Van teeltvraag naar het juiste product.</h2>
            <p>Geen eindeloze productlijst. Kies eerst tussen opkweek en plantverzorging en vergelijk daarna alleen de uitvoeringen die relevant zijn.</p>
            <ol className={styles.choiceSteps}>
              <li><span>01</span><div><strong>Kies je toepassing</strong><small>Opkweek met stekpluggen van steenwol of verzorging met NeemX Pro.</small></div></li>
              <li><span>02</span><div><strong>Selecteer de uitvoering</strong><small>Vergelijk tray-indeling of inhoudsmaat in één overzicht.</small></div></li>
              <li><span>03</span><div><strong>Bestel met duidelijkheid</strong><small>Bekijk levering, totaal en voorwaarden vóór je betaalt.</small></div></li>
            </ol>
            <Link className={styles.textLink} href="/lumora-premium/producten">Vergelijk beide producten <ArrowRightIcon /></Link>
          </div>
        </div>
      </section>

      <section className={styles.helpBanner}>
        <div className={`${styles.container} ${styles.helpBannerInner}`}>
          <div>
            <span className={styles.eyebrow}>Persoonlijk contact</span>
            <h2>Niet zeker welke uitvoering past?</h2>
            <p>Stuur je vraag rechtstreeks naar Lumora. Zo kies je met de productinformatie die voor jouw situatie relevant is.</p>
          </div>
          <a className={styles.lightButton} href="mailto:info@lumorahorticulture.com">Stel je productvraag <ArrowRightIcon /></a>
        </div>
      </section>
    </main>
  )
}
