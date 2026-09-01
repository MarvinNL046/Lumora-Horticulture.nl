import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from '../_components/Icons'
import { ProductFamilyCard } from '../_components/ProductFamilyCard'
import { TrustStrip } from '../_components/TrustStrip'
import { neemx, productFamilies } from '../_data/products'
import styles from '../storefront.module.css'

export const metadata: Metadata = {
  title: 'Stekpluggen Steenwol & NeemX Pro | Lumora Horticulture',
  description: 'Vergelijk Stekpluggen Steenwol 84 en Stekpluggen Steenwol 104 met NeemX Pro en kies de uitvoering die bij je gebruik past.',
}

export default function ProductenPage() {
  return (
    <main>
      <section className={styles.collectionHero}>
        <div className={`${styles.container} ${styles.collectionHeroGrid}`}>
          <div>
            <span className={styles.eyebrow}>De Lumora collectie</span>
            <h1>Kies je productlijn.</h1>
            <p>Begin bij wat je wilt doen: opkweken met stekpluggen van steenwol of je planten verzorgen met NeemX Pro.</p>
            <Link className={styles.collectionHeroAction} href="#productlijnen">
              Bekijk beide productlijnen <ArrowRightIcon />
            </Link>
          </div>
          <div className={styles.collectionHeroVisual}>
            <div className={styles.collectionImageOne}>
              <Image
                src="/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-alternate.webp"
                alt="Stekpluggen Steenwol 84 met Paperbus-wikkel in een kweektray"
                fill
                priority
                sizes="260px"
              />
            </div>
            <div className={styles.collectionImageTwo}>
              <Image
                src={neemx.mainImage}
                alt={neemx.mainImageAlt}
                fill
                priority
                sizes="220px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.collectionProducts} id="productlijnen">
        <div className={styles.container}>
          <div className={styles.collectionCount}><span>2 productlijnen</span><span>5 uitvoeringen</span></div>
          <div className={styles.productGrid}>
            {productFamilies.map((product) => <ProductFamilyCard product={product} key={product.id} />)}
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className={styles.compareSection}>
        <div className={styles.container}>
          <div className={styles.compareIntro}>
            <span className={styles.eyebrow}>In één oogopslag</span>
            <h2>Van doel naar product.</h2>
            <p>Beide lijnen hebben een eigen toepassing. Vergelijk alleen wat je nodig hebt en kies daarna de juiste uitvoering.</p>
          </div>
          <div className={styles.compareTable} role="table" aria-label="Vergelijk Stekpluggen Steenwol en NeemX Pro">
            <div className={`${styles.compareRow} ${styles.compareHeader}`} role="row">
              <span role="columnheader">Je zoekt</span>
              <span role="columnheader">Stekpluggen Steenwol</span>
              <span role="columnheader">NeemX Pro</span>
            </div>
            <div className={styles.compareRow} role="row">
              <strong role="rowheader">Toepassing</strong>
              <span role="cell"><CheckIcon /> Zaaien en stekken</span>
              <span role="cell"><CheckIcon /> Plant- en bladverzorging</span>
            </div>
            <div className={styles.compareRow} role="row">
              <strong role="rowheader">Uitvoeringen</strong>
              <span role="cell">Stekpluggen Steenwol 84 of Stekpluggen Steenwol 104</span>
              <span role="cell">10 ml, 30 ml of 50 ml</span>
            </div>
            <div className={styles.compareRow} role="row">
              <strong role="rowheader">Volgende stap</strong>
              <span role="cell"><Link href="/lumora-premium/paperbus">Kies je stekpluggen <ArrowRightIcon /></Link></span>
              <span role="cell"><Link href="/lumora-premium/neemx-pro">Kies je formaat <ArrowRightIcon /></Link></span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.collectionHelp}>
        <div className={`${styles.container} ${styles.collectionHelpInner}`}>
          <div><span className={styles.eyebrow}>Nog niet zeker?</span><h2>Vertel ons wat je wilt bereiken.</h2></div>
          <p>Neem rechtstreeks contact op met Lumora voor hulp bij je product- of variantkeuze.</p>
          <a className={styles.primaryButton} href="mailto:info@lumorahorticulture.com">Vraag productadvies <ArrowRightIcon /></a>
        </div>
      </section>
    </main>
  )
}
