'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  VOLUME_DISCOUNT_TIERS,
  calculateDiscountedPrice,
  calculateTotalPrice,
  getDiscountInfo,
} from '@/lib/volume-discount'
import type { ProductFamily } from '../_data/products'
import { formatPrice } from '../_data/products'
import styles from '../storefront.module.css'
import {
  ArrowRightIcon,
  BagIcon,
  CheckIcon,
  ChevronDownIcon,
  MessageIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
} from './Icons'
import { PaymentLogos } from './PaymentLogos'

const NEEMX_YIELD_BY_VARIANT = {
  'neemx-10': { solution: '1–4 liter', coverage: '10–40 m²' },
  'neemx-30': { solution: '3–12 liter', coverage: '30–120 m²' },
  'neemx-50': { solution: '5–20 liter', coverage: '50–200 m²' },
} as const

const NEEMX_DOSAGE_ROWS = [
  ['2,5 ml/L', '± 0,25 ml'],
  ['5 ml/L', '± 0,5 ml'],
  ['7 ml/L', '± 0,7 ml'],
  ['10 ml/L', '± 1 ml'],
] as const

function getTierLabel(minQuantity: number, maxQuantity: number | null) {
  return maxQuantity === null ? `${minQuantity}+` : `${minQuantity}–${maxQuantity}`
}

export function ProductDetail({ product }: { product: ProductFamily }) {
  const [variantId, setVariantId] = useState(product.variants[0].id)
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const variant = product.variants.find((item) => item.id === variantId) ?? product.variants[0]
  const fallbackGallery = [
    { src: product.mainImage, alt: product.mainImageAlt },
    { src: product.secondaryImage, alt: product.secondaryImageAlt },
    ...(product.tertiaryImage && product.tertiaryImageAlt
      ? [{ src: product.tertiaryImage, alt: product.tertiaryImageAlt, fit: 'cover' as const }]
      : []),
  ]
  const gallery = variant.images?.length ? variant.images : fallbackGallery
  const activeImageIndex = Math.min(imageIndex, gallery.length - 1)
  const activeImage = gallery[activeImageIndex]
  const isPaperbus = product.id === 'paperbus'
  const compactVariantLabel = variant.shortLabel ?? variant.label
  const originalTotal = variant.price * quantity
  const discountInfo = getDiscountInfo(quantity)
  const discountedUnitPrice = calculateDiscountedPrice(variant.price, quantity)
  const discountedTotal = calculateTotalPrice(variant.price, quantity)
  const productTotal = isPaperbus ? originalTotal : discountedTotal
  const savings = Math.max(0, originalTotal - discountedTotal)
  const nextTierQuantity = discountInfo.nextTier?.quantity ?? null
  const bottlesToNextTier = nextTierQuantity === null ? 0 : nextTierQuantity - quantity
  const neemxYield = NEEMX_YIELD_BY_VARIANT[variant.id as keyof typeof NEEMX_YIELD_BY_VARIANT]
  const usageImage = product.usageImage ?? product.tertiaryImage ?? product.secondaryImage
  const usageImageAlt = product.usageImageAlt ?? product.tertiaryImageAlt ?? product.secondaryImageAlt
  const usageSteps = isPaperbus
    ? [
        ['Kweek in de gekozen tray', 'Gebruik de tray voor zaad of stek en stem de teeltomstandigheden af op je gewas.'],
        ['Verzorg per teeltfase', 'Pas watergift en overige verzorging aan op de ontwikkeling van de jonge plant.'],
        ['Plant de complete plug uit', 'De papieren omhulling blijft bij het uitplanten om de plug zitten.'],
      ]
    : [
        ['Breng op kamertemperatuur', 'Is het concentraat door kou dikker geworden? Laat het eerst op kamertemperatuur komen en schud daarna goed.'],
        ['Verdun volgens de gebruiksaanwijzing', 'Meng de juiste hoeveelheid concentraat met water en zorg voor een gelijkmatige verdeling.'],
        ['Maak alleen aan wat je gebruikt', 'Bereid alleen de benodigde hoeveelheid en gebruik de aangemaakte spuitoplossing dezelfde dag.'],
      ]
  const highlightDescriptions = isPaperbus
    ? product.highlights.map(() => 'Vergelijk de tray-indeling in het koopblok en kies op basis van je teeltplan.')
    : [
        'Door de hoge concentratie heb je per liter spuitoplossing slechts een kleine hoeveelheid nodig.',
        'Het emulgatorsysteem helpt de botanische olieblend goed en gelijkmatig met water te mengen.',
        'De aangemaakte oplossing is bedoeld voor een gelijkmatige bedekking van het bladoppervlak.',
      ]

  return (
    <main>
      <div className={`${styles.container} ${styles.breadcrumbs}`}>
        <Link href="/lumora-premium">Home</Link><span>/</span>
        <Link href="/lumora-premium/producten">Producten</Link><span>/</span>
        <strong>{product.name}</strong>
      </div>

      <section className={`${styles.container} ${styles.pdpGrid}`}>
        <div className={styles.gallery}>
          <div className={styles.galleryStage}>
            <div className={styles.galleryThumbs} aria-label="Productafbeeldingen">
              {gallery.map((image, index) => (
                <button
                  type="button"
                  className={activeImageIndex === index ? styles.galleryThumbActive : ''}
                  key={image.src}
                  onClick={() => setImageIndex(index)}
                  aria-label={`Toon productafbeelding ${index + 1}`}
                  aria-pressed={activeImageIndex === index}
                >
                  <Image src={image.src} alt="" fill sizes="80px" />
                </button>
              ))}
            </div>
            <div className={`${styles.galleryMain} ${styles[`galleryMain_${product.id}`]}`}>
              <Image
                className={activeImage.fit === 'cover'
                  ? styles.galleryDetailImage
                  : activeImage.fit === 'portrait'
                    ? styles.galleryPortraitImage
                    : undefined}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 50vw"
              />
              <span className={styles.galleryTag}>{isPaperbus ? 'Voor zaaien & stekken' : 'Voor bladverzorging'}</span>
            </div>
          </div>
        </div>

        <div className={`${styles.productSummary} ${styles[`productSummary_${product.id}`]}`} id="koopblok">
          <span className={styles.eyebrow}>{product.eyebrow}</span>
          <h1>{isPaperbus ? 'Kies je stekpluggen van steenwol.' : 'NeemXPRO'}</h1>

          <div className={styles.priceLine}>
            <strong>{formatPrice(variant.price)}</strong>
            <span>Prijs voor {variant.label}</span>
          </div>

          <fieldset className={styles.variantFieldset}>
            <legend>{isPaperbus ? 'Kies 84 of 104' : 'Kies 10, 30 of 50 ml'}</legend>
            <div className={styles.variantGrid}>
              {product.variants.map((item) => (
                <button
                  key={item.id}
                  id={`variant-${item.id}`}
                  type="button"
                  className={variantId === item.id ? styles.variantActive : ''}
                  onClick={() => {
                    setVariantId(item.id)
                    setImageIndex(0)
                  }}
                  aria-pressed={variantId === item.id}
                >
                  <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                  <span>{formatPrice(item.price)}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className={styles.purchasePanel}>
            <div className={styles.buyRow}>
              <div className={styles.selectedDecision}>
                <span className={styles.selectedDecisionCopy}>
                  <strong>{variant.label} × {quantity}</strong>
                  <small>
                    {!isPaperbus && discountInfo.hasDiscount
                      ? `${discountInfo.currentDiscount}% staffelkorting · ${formatPrice(discountedUnitPrice)} per fles`
                      : variant.detail}
                  </small>
                  {!isPaperbus && discountInfo.hasDiscount && <em>Je bespaart {formatPrice(savings)}</em>}
                </span>
                <span className={styles.selectedDecisionPrice}>
                  {!isPaperbus && discountInfo.hasDiscount && <del>{formatPrice(originalTotal)}</del>}
                  <strong>{formatPrice(productTotal)}</strong>
                </span>
              </div>
              <span className={styles.buyRowLabel}>Aantal</span>
              <div className={styles.quantityControl} aria-label="Aantal">
                <button type="button" aria-label="Aantal verlagen" onClick={() => setQuantity((current) => Math.max(1, current - 1))}><MinusIcon /></button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" aria-label="Aantal verhogen" onClick={() => setQuantity((current) => current + 1)}><PlusIcon /></button>
              </div>
              <Link href="/lumora-premium/winkelmand" className={styles.addButton}>
                <BagIcon /> {compactVariantLabel} in winkelwagen
              </Link>
            </div>

            <div className={styles.purchaseProof}>
              <span><TruckIcon /><strong>Gratis verzending</strong><small>NL, BE en DE</small></span>
              <span className={styles.paymentBrandProof}>
                <strong>Betaalmethoden</strong>
                <PaymentLogos />
              </span>
              <span><MessageIcon /><strong>Productvraag?</strong><small>Neem contact op</small></span>
            </div>
          </div>

          {!isPaperbus && (
            <section className={styles.volumeDiscount} aria-labelledby="neemx-staffelkorting">
              <div className={styles.volumeDiscountHeader}>
                <div>
                  <strong id="neemx-staffelkorting">Staffelkorting</strong>
                  <span>Per gelijk flesformaat</span>
                </div>
                {discountInfo.hasDiscount && (
                  <span className={styles.volumeDiscountBadge}>−{discountInfo.currentDiscount}%</span>
                )}
              </div>
              <div className={styles.volumeTierGrid} role="group" aria-label="Kies een staffel en aantal">
                {VOLUME_DISCOUNT_TIERS.map((tier) => {
                  const isActive = quantity >= tier.minQuantity
                    && (tier.maxQuantity === null || quantity <= tier.maxQuantity)
                  const tierLabel = getTierLabel(tier.minQuantity, tier.maxQuantity)

                  return (
                    <button
                      key={tier.minQuantity}
                      id={`neemx-tier-${tier.minQuantity}`}
                      type="button"
                      className={isActive ? styles.volumeTierActive : ''}
                      onClick={() => setQuantity(tier.minQuantity)}
                      aria-pressed={isActive}
                      aria-label={tier.discountPercentage === 0
                        ? `Kies ${tierLabel} flessen zonder staffelkorting`
                        : `Kies ${tierLabel} flessen voor ${tier.discountPercentage}% staffelkorting`}
                    >
                      <span>{tierLabel}</span>
                      <strong>{tier.discountPercentage === 0 ? '0%' : `−${tier.discountPercentage}%`}</strong>
                    </button>
                  )
                })}
              </div>
              <div className={styles.volumeDiscountStatus} aria-live="polite">
                <strong>
                  {discountInfo.hasDiscount
                    ? `${discountInfo.currentDiscount}% staffelkorting actief · ${formatPrice(discountedUnitPrice)} per fles.`
                    : `${formatPrice(variant.price)} per fles.`}
                </strong>
                {discountInfo.nextTier && (
                  <span>
                    Nog {bottlesToNextTier} {bottlesToNextTier === 1 ? 'fles' : 'flessen'} tot {discountInfo.nextTier.discount}% staffelkorting.
                  </span>
                )}
              </div>
            </section>
          )}

          <p className={styles.productIntro}>{product.description}</p>

          <div className={styles.productAccordions}>
            {isPaperbus ? (
              <details open><summary>Productinformatie <ChevronDownIcon /></summary><p>{product.statement} Kies hierboven de uitvoering die aansluit op je gebruik.</p></details>
            ) : (
              <details open>
                <summary>Dosering &amp; opbrengst <ChevronDownIcon /></summary>
                <div className={styles.dosageContent}>
                  <p className={styles.dosageIntro}>Gebruik de actuele gebruiksaanwijzing om de passende dosering te bepalen. Begin altijd met de laagste dosering.</p>
                  <table className={styles.dosageTable}>
                    <caption className={styles.srOnly}>NEEMX PRO dosering per liter en per vierkante meter</caption>
                    <thead>
                      <tr><th>Dosering per liter</th><th>Concentraat per m²*</th></tr>
                    </thead>
                    <tbody>
                      {NEEMX_DOSAGE_ROWS.map(([perLiter, perSquareMeter]) => (
                        <tr key={perLiter}><th scope="row">{perLiter}</th><td>{perSquareMeter}</td></tr>
                      ))}
                    </tbody>
                  </table>
                  {neemxYield && (
                    <p className={styles.dosageResult}>
                      <strong>{variant.label} geselecteerd</strong>
                      <span>Met {variant.label} maak je {neemxYield.solution} spuitoplossing voor indicatief {neemxYield.coverage}.</span>
                    </p>
                  )}
                  <p className={styles.dosageFootnote}>*Gebaseerd op circa 100 ml aangemaakte spuitoplossing per m².</p>
                  <p className={styles.dosageUseNote}>Test eerst op een klein deel van de plant en spuit niet in direct zonlicht.</p>
                </div>
              </details>
            )}
            {!isPaperbus && (
              <>
                <details>
                  <summary>Wat is NEEMX PRO? <ChevronDownIcon /></summary>
                  <p>NEEMX PRO combineert hoogwaardige plantaardige oliën met een natuurlijke antioxidant en emulgatoren. Het emulgatorsysteem helpt de olieblend gelijkmatig met water te mengen voor de verzorging van het bladoppervlak.</p>
                </details>
                <details>
                  <summary>Bewaren &amp; voorbereiden <ChevronDownIcon /></summary>
                  <p>Bij lage temperaturen kan het concentraat dikker worden. Breng het product voor gebruik op kamertemperatuur en schud goed. Maak alleen de hoeveelheid spuitoplossing aan die je direct nodig hebt en gebruik deze dezelfde dag.</p>
                </details>
              </>
            )}
            <details>
              <summary>Levering & retour <ChevronDownIcon /></summary>
              <p>
                {isPaperbus
                  ? 'Verzending binnen Nederland, België en Duitsland is gratis. Voor consumenten geldt 14 dagen bedenktijd; bekijk vóór aankoop altijd het volledige retourbeleid.'
                  : 'Verzending binnen Nederland, België en Duitsland is gratis. NEEMX PRO kan alleen retour als de fles ongeopend is, de verzegeling van de draaidop volledig intact is en de fles inclusief etiket in originele staat verkeert.'}
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className={styles.productHighlights}>
        <div className={styles.container}>
          <div className={styles.highlightIntro}>
            <span className={styles.eyebrow}>{isPaperbus ? 'Helder uitgelegd' : 'Waarom NEEMX PRO'}</span>
            <h2>{isPaperbus ? 'Eén productlijn, twee traykeuzes.' : 'Ontwikkeld voor gelijkmatige bladverzorging.'}</h2>
          </div>
          <div className={styles.highlightGrid}>
            {product.highlights.map((highlight, index) => (
              <article key={highlight}><span>0{index + 1}</span><CheckIcon /><h3>{highlight}</h3><p>{isPaperbus ? 'Vergelijk de tray-indeling in het koopblok en kies op basis van je teeltplan.' : highlightDescriptions[index]}</p></article>
            ))}
          </div>
          {!isPaperbus && <a className={styles.highlightAction} href="#koopblok">Kies je flesformaat <ArrowRightIcon /></a>}
        </div>
      </section>

      <section className={styles.usageSection}>
        <div className={`${styles.container} ${styles.usageGrid}`}>
          <div className={`${styles.usageImage} ${styles[`usageImage_${product.id}`]}`}>
            <Image src={usageImage} alt={usageImageAlt} fill sizes="(max-width: 767px) 100vw, 50vw" />
          </div>
          <div className={styles.usageCopy}>
            <span className={styles.eyebrow}>{isPaperbus ? 'Zo gebruik je de plug' : 'Zo gebruik je NEEMX PRO'}</span>
            <h2>{isPaperbus ? 'Van tray naar uitplanten.' : 'Van concentraat naar verse spuitoplossing.'}</h2>
            <div className={styles.usageSteps}>
              {usageSteps.map(([title, text], index) => (
                <div key={title}><span>{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>
              ))}
            </div>
            <a className={styles.textLink} href="mailto:info@lumorahorticulture.com">Stel je productvraag <ArrowRightIcon /></a>
          </div>
        </div>
      </section>

      <div className={styles.mobileBuyDock}>
        <div className={styles.dockQuantity} aria-label="Aantal">
          <button type="button" aria-label="Aantal verlagen" onClick={() => setQuantity((current) => Math.max(1, current - 1))}><MinusIcon /></button>
          <span aria-live="polite">{quantity}</span>
          <button type="button" aria-label="Aantal verhogen" onClick={() => setQuantity((current) => current + 1)}><PlusIcon /></button>
        </div>
        <Link href="/lumora-premium/winkelmand" className={styles.dockPrimaryAction}>
          <span>
            <small>{compactVariantLabel} × {quantity} · {formatPrice(productTotal)}</small>
            <strong>In winkelwagen</strong>
          </span>
        </Link>
      </div>
    </main>
  )
}
