import { notFound } from 'next/navigation'
import { generatePageMetadata } from '@/lib/metadata'
import { KnowledgePage } from '@/app/lumora-premium/_components/KnowledgePage'
import { opkweekGuides } from '@/app/lumora-premium/_data/opkweek-guides'

const article = opkweekGuides['paprika-zaaien']

export function generateStaticParams() {
  return [{ locale: 'nl' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== 'nl') notFound()
  return generatePageMetadata({
    title: 'Paprika zaaien: wanneer en hoe?',
    description: 'Paprika zaaien en opkweken: kies je zaaimoment, lees hoe diep je zaait en wanneer je verspeent. Met praktische uitleg en teeltbronnen.',
    locale: 'nl',
    path: '/paprika-zaaien',
    availableLocales: ['nl'],
  })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== 'nl') notFound()
  return <KnowledgePage locale="nl" slug="paprika-zaaien" article={article} />
}
