import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/metadata'
import { KnowledgePage } from '@/app/lumora-premium/_components/KnowledgePage'
import { opkweekGuides } from '@/app/lumora-premium/_data/opkweek-guides'

const article = opkweekGuides['tomaten-zaaien']

export function generateStaticParams() {
  return [{ locale: 'nl' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== 'nl') notFound()
  return generatePageMetadata({
    title: 'Tomaten zaaien: wanneer en hoe diep?',
    description: 'Zelf tomaten zaaien? Lees wanneer je binnen begint, hoe diep je zaait en hoe je zaailingen verder opkweekt in potjes of steenwol pluggen.',
    locale: 'nl',
    path: '/tomaten-zaaien',
    availableLocales: ['nl'],
  })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== 'nl') notFound()
  return <KnowledgePage locale="nl" slug="tomaten-zaaien" article={article} />
}
