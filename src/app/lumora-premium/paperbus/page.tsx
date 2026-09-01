import type { Metadata } from 'next'
import { ProductDetail } from '../_components/ProductDetail'
import { paperbus } from '../_data/products'

export const metadata: Metadata = {
  title: 'Professionele stekpluggen 84 & 104 | Lumora Horticulture',
  description: 'Vergelijk Paper Plug Tray 84 en 104 met Ellepot FP 12+ papertechnologie. Bekijk plugmaat, cellen per tray en exacte doosinhoud voor professionele zaailingenkweek.',
}

export default function PaperbusPage() {
  return <ProductDetail product={paperbus} />
}
