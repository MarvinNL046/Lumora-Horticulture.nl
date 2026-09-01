import type { Metadata } from 'next'
import { ProductDetail } from '../_components/ProductDetail'
import { paperbus } from '../_data/products'

export const metadata: Metadata = {
  title: 'Stekpluggen Steenwol 84 & Stekpluggen Steenwol 104 | Lumora',
  description: 'Vergelijk Stekpluggen Steenwol 84 en Stekpluggen Steenwol 104 met Paperbus-wikkel. Kies de tray voor zaaien, stekken en professionele opkweek.',
}

export default function PaperbusPage() {
  return <ProductDetail product={paperbus} />
}
