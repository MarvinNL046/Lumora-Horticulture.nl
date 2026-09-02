import Image from 'next/image'
import Link from 'next/link'
import type { ProductFamily } from '../_data/products'
import { formatPrice } from '../_data/products'
import styles from '../storefront.module.css'
import { ArrowRightIcon } from './Icons'
import { sharedCopy } from '../_data/storefront-content'
import type { StorefrontLocale } from './storefront-localization'

export function ProductFamilyCard({ product, href = product.href, locale = 'nl' }: { product: ProductFamily; href?: string; locale?: StorefrontLocale }) {
  const copy = sharedCopy[locale]
  return (
    <article className={`${styles.productCard} ${styles[`productCard_${product.id}`]}`}>
      <Link href={href} className={styles.productCardMedia} aria-label={`${copy.view} ${product.name}`}>
        <Image
          className={styles.productCardImage}
          src={product.mainImage}
          alt={product.mainImageAlt}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <span className={styles.productCardBadge}>{product.useCases[0]}</span>
      </Link>
      <div className={styles.productCardBody}>
        <div className={styles.productCardTopline}>
          <span>{product.eyebrow}</span>
          <span>{copy.from} {formatPrice(product.fromPrice, locale)}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.statement}</p>
        <div className={styles.productCardFooter}>
          <span>{product.variants.map((variant) => variant.label).join(' · ')}</span>
          <Link href={href} className={styles.productCardAction}>
            <span>{copy.view} {product.name}</span>
            <span className={styles.roundArrow}><ArrowRightIcon /></span>
          </Link>
        </div>
      </div>
    </article>
  )
}
