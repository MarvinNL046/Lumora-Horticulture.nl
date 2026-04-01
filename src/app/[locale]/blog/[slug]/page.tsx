import { unstable_setRequestLocale } from 'next-intl/server'
import { generatePageMetadata } from '@/lib/metadata'
import { db } from '@/db'
import { blogPosts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export async function generateStaticParams() {
  const posts = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.status, 'published'))

  const params: { locale: string; slug: string }[] = []
  for (const post of posts) {
    params.push({ locale: 'nl', slug: post.slug })
    params.push({ locale: 'de', slug: post.slug })
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, params.slug))
    .limit(1)

  const post = rows[0]
  if (!post) {
    return generatePageMetadata({
      title: 'Blog',
      description: '',
      locale: params.locale,
      path: `/blog/${params.slug}`,
    })
  }

  const locale = params.locale
  const title =
    locale === 'de' && post.seo_title_de
      ? post.seo_title_de
      : locale === 'de' && post.title_de
        ? post.title_de
        : post.seo_title_nl || post.title_nl
  const description =
    locale === 'de' && post.seo_description_de
      ? post.seo_description_de
      : locale === 'de' && post.excerpt_de
        ? post.excerpt_de
        : post.seo_description_nl || post.excerpt_nl

  return generatePageMetadata({
    title,
    description,
    locale,
    path: `/blog/${post.slug}`,
    ogImage: post.featured_image || undefined,
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

export default async function BlogDetailPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  unstable_setRequestLocale(params.locale)
  const locale = params.locale

  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, params.slug))
    .limit(1)

  const post = rows[0]
  if (!post || post.status !== 'published') {
    notFound()
  }

  const title =
    locale === 'de' && post.title_de ? post.title_de : post.title_nl
  const content =
    locale === 'de' && post.content_de ? post.content_de : post.content_nl
  const categoryLabel =
    categoryLabels[post.category]?.[locale] || post.category
  const tags = (post.tags as string[]) || []
  const backLabel = locale === 'de' ? 'Zur\u00fcck zum Blog' : 'Terug naar blog'

  // Article structured data (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description:
      locale === 'de' && post.excerpt_de ? post.excerpt_de : post.excerpt_nl,
    image: post.featured_image || undefined,
    author: {
      '@type': 'Organization',
      name: post.author || 'Lumora Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lumora Horticulture',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lumorahorticulture.nl/logo/lumura-horticulture-logo.jpeg',
      },
    },
    datePublished: post.published_at?.toISOString(),
    dateModified: post.updated_at?.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lumorahorticulture.${locale === 'de' ? 'de' : 'nl'}/blog/${post.slug}`,
    },
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* Featured image */}
        {post.featured_image && (
          <div className="relative h-64 w-full bg-gray-100 md:h-96">
            <Image
              src={post.featured_image}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        <article className="mx-auto max-w-3xl px-4 py-12">
          {/* Back link */}
          <a
            href={`/${locale}/blog`}
            className="mb-6 inline-flex items-center text-sm text-green-700 hover:text-green-900"
          >
            &larr; {backLabel}
          </a>

          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-block rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-800">
              {categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {title}
          </h1>

          {/* Meta row: author, date */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {post.author && <span>{post.author}</span>}
            {post.published_at && (
              <time dateTime={post.published_at.toISOString()}>
                {formatDate(post.published_at, locale)}
              </time>
            )}
          </div>

          {/* Content */}
          <div
            className="prose prose-green max-w-none prose-headings:text-gray-900 prose-a:text-green-700"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-10 border-t border-gray-200 pt-6">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  )
}
