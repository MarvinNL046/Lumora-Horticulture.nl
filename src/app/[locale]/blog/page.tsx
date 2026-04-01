import { unstable_setRequestLocale } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import { db } from '@/db'
import { blogPosts } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import Link from 'next/link'
import Image from 'next/image'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'de' }]
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const meta = {
    nl: {
      title: 'Blog - Kennis over Tuinbouw & Kweektechnieken',
      description:
        'Lees onze artikelen over steenwol pluggen, kweektechnieken, duurzaamheid en tips voor professionele kwekers. Vakkennis direct van de fabrikant.',
      keywords: [
        'tuinbouw blog',
        'kweektechnieken',
        'steenwol pluggen tips',
        'professioneel kweken',
        'duurzame tuinbouw',
      ],
    },
    de: {
      title: 'Blog - Wissen über Gartenbau & Anbautechniken',
      description:
        'Lesen Sie unsere Artikel über Steinwollstecker, Anbautechniken, Nachhaltigkeit und Tipps für professionelle Züchter. Fachwissen direkt vom Hersteller.',
      keywords: [
        'Gartenbau Blog',
        'Anbautechniken',
        'Steinwollstecker Tipps',
        'professionelles Züchten',
        'nachhaltiger Gartenbau',
      ],
    },
  }

  const localeMeta = meta[params.locale as keyof typeof meta] || meta.nl

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: '/blog/',
  })
}

function formatDate(date: Date | null, locale: string): string {
  if (!date) return ''
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

const categoryLabels: Record<string, Record<string, string>> = {
  kweektechnieken: { nl: 'Kweektechnieken', de: 'Anbautechniken' },
  duurzaamheid: { nl: 'Duurzaamheid', de: 'Nachhaltigkeit' },
  producten: { nl: 'Producten', de: 'Produkte' },
  tips: { nl: 'Tips', de: 'Tipps' },
}

export default async function BlogListingPage({
  params,
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(params.locale)
  const locale = params.locale

  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, 'published'))
    .orderBy(desc(blogPosts.published_at))

  const heading = locale === 'de' ? 'Blog' : 'Blog'
  const subtitle =
    locale === 'de'
      ? 'Fachwissen und Einblicke f\u00fcr professionelle Z\u00fcchter'
      : 'Vakkennis en inzichten voor professionele kwekers'
  const noPosts =
    locale === 'de'
      ? 'Noch keine Artikel verf\u00fcgbar. Schauen Sie bald wieder vorbei!'
      : 'Nog geen artikelen beschikbaar. Kom snel terug!'

  return (
    <main className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            {heading}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">{noPosts}</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const title =
                locale === 'de' && post.title_de
                  ? post.title_de
                  : post.title_nl
              const excerpt =
                locale === 'de' && post.excerpt_de
                  ? post.excerpt_de
                  : post.excerpt_nl
              const categoryLabel =
                categoryLabels[post.category]?.[locale] || post.category

              return (
                <Link
                  key={post.id}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Featured image */}
                  {post.featured_image && (
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={post.featured_image}
                        alt={title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    {/* Category badge */}
                    <span className="mb-2 inline-block w-fit rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-800">
                      {categoryLabel}
                    </span>

                    {/* Title */}
                    <h2 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-green-700">
                      {title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-3">
                      {excerpt}
                    </p>

                    {/* Date */}
                    {post.published_at && (
                      <time
                        dateTime={post.published_at.toISOString()}
                        className="text-xs text-gray-400"
                      >
                        {formatDate(post.published_at, locale)}
                      </time>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
