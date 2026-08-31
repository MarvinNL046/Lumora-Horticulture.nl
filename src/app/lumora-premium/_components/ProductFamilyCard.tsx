import Image from 'next/image'
import Link from 'next/link'
import type { ProductFamily } from '../_data/products'
import { formatPrice } from '../_data/products'
import styles from '../storefront.module.css'
import { ArrowRightIcon } from './Icons'

export function ProductFamilyCard({ product }: { product: ProductFamily }) {
  return (
    <article className={`${styles.productCard} ${styles[`productCard_${product.id}`]}`}>
      <Link href={product.href} className={styles.productCardMedia} aria-label={`Bekijk ${product.name}`}>
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
          <span>vanaf {formatPrice(product.fromPrice)}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.statement}</p>
        <div className={styles.productCardFooter}>
          <span>{product.variants.map((variant) => variant.label).join(' · ')}</span>
          <Link href={product.href} className={styles.roundArrow} aria-label={`Kies ${product.name}`}>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </article>
  )
}
