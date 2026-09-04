import Link from 'next/link'
import type { ProductFamily } from '../_data/products'
import { formatPrice } from '../_data/products'
import { localizePathForLocale } from '@/lib/url-localizations'
import { productVariantHref } from '@/lib/storefront-product-seo'
import type { StorefrontLocale } from './storefront-localization'
import styles from './PlugComparison.module.css'

const text = {
  nl: {
    title: 'Stekpluggen 84 of 104: welke tray kies je?',
    intro: 'Je ontvangt gevulde trays met steenwol stekpluggen in een Ellepot FP 12+ papierwikkel. Kies 84 voor grotere pluggen of 104 voor meer kweekplaatsen per tray. Beide uitvoeringen worden per complete doos verkocht.',
    caption: 'Vergelijk de twee uitvoeringen van de steenwol stekpluggen',
    feature: 'Kenmerk', cells: 'Pluggen per tray', size: 'Plugmaat (diameter × diepte)', trays: 'Trays per doos', total: 'Pluggen per doos', price: 'Prijs per losse doos', choose: 'Kies',
    note: 'De juiste maat hangt af van je gewas, opkweekduur en teeltsysteem. Twijfel je over de toepassing? Vraag ons om productadvies.',
    guide: 'Steenwol stekpluggen gebruiken: van bevochtigen tot uitplanten',
    material: 'Paperbus: wat is de papierwikkel?',
  },
  en: {
    title: '84 or 104 cells: which propagation tray should you choose?',
    intro: 'Each tray is filled with rockwool plugs in an Ellepot FP 12+ paper sleeve. Choose 84 for larger plugs or 104 for more growing positions per tray. Both versions are sold by the complete box.',
    caption: 'Compare the two rockwool plug tray sizes', feature: 'Specification', cells: 'Plugs per tray', size: 'Plug size (diameter × depth)', trays: 'Trays per box', total: 'Plugs per box', price: 'Price per single box', choose: 'Choose',
    note: 'The right size depends on your crop, propagation period and growing system. Contact us for help choosing a suitable size.',
    guide: 'Using rockwool plugs: from moistening to transplanting', material: 'Paper pot plugs: the paper sleeve explained',
  },
  de: {
    title: '84 oder 104 Zellen: Welche Anzuchtplatte passt?',
    intro: 'Sie erhalten gefüllte Anzuchtplatten mit Steinwollsteckern in einer Ellepot FP 12+ Papierhülle. Wählen Sie 84 für größere Stecker oder 104 für mehr Anzuchtplätze pro Platte. Beide Varianten werden im kompletten Karton verkauft.',
    caption: 'Vergleich der zwei Steinwollstecker-Varianten', feature: 'Merkmal', cells: 'Stecker pro Platte', size: 'Steckermaß (Durchmesser × Tiefe)', trays: 'Platten pro Karton', total: 'Stecker pro Karton', price: 'Preis pro einzelnem Karton', choose: 'Wählen',
    note: 'Die passende Größe hängt von Kultur, Anzuchtdauer und Anbausystem ab. Kontaktieren Sie uns bei Fragen zur Auswahl.',
    guide: 'Steinwollstecker verwenden: vom Befeuchten bis zum Auspflanzen', material: 'Papiertopf-Stecker: die Papierhülle erklärt',
  },
} as const

export function PlugComparison({ product, locale }: { product: ProductFamily; locale: StorefrontLocale }) {
  const t = text[locale]
  const rows = [
    [t.cells, ...product.variants.map((v) => v.cellsPerTray)],
    [t.size, ...product.variants.map((v) => `Ø${v.cellDiameterMm} × ${v.cellDepthMm} mm`)],
    [t.trays, ...product.variants.map((v) => v.traysPerBox)],
    [t.total, ...product.variants.map((v) => v.cellsPerBox)],
    [t.price, ...product.variants.map((v) => formatPrice(v.price, locale))],
  ]
  return (
    <section className={styles.section} aria-labelledby="tray-vergelijking">
      <h2 id="tray-vergelijking">{t.title}</h2>
      <p>{t.intro}</p>
      <div className={styles.scroll} role="region" aria-label={t.caption} tabIndex={0}>
        <table>
          <caption>{t.caption}</caption>
          <thead><tr><th scope="col">{t.feature}</th>{product.variants.map((v) => <th scope="col" key={v.id}>{v.cellsPerTray}</th>)}</tr></thead>
          <tbody>{rows.map(([label, ...values]) => <tr key={label}><th scope="row">{label}</th>{values.map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody>
          <tfoot><tr><td />{product.variants.map((v) => <td key={v.id}><Link href={`${productVariantHref(localizePathForLocale(product.href, locale), v.id)}#koopblok`}>{t.choose} {v.cellsPerTray}</Link></td>)}</tr></tfoot>
        </table>
      </div>
      <p>{t.note}</p>
      <ul>
        <li><Link href={localizePathForLocale('/paper-plug-trays-uitgelegd', locale)}>{t.guide}</Link></li>
        <li><Link href={localizePathForLocale('/paperbus-pluggen', locale)}>{t.material}</Link></li>
      </ul>
    </section>
  )
}
