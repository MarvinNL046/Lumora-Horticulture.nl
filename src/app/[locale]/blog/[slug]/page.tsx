import { generatePageMetadata } from '@/lib/metadata'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/../convex/_generated/api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { blogHtmlToPlainText } from '@/lib/blog-content'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import { localizePathForLocale } from '@/lib/url-localizations'

const BLOG_LOCALES = ['nl', 'de'] as const
type BlogLocale = (typeof BLOG_LOCALES)[number]

function isBlogLocale(locale: string): locale is BlogLocale {
  return BLOG_LOCALES.includes(locale as BlogLocale)
}

function hasGermanTranslation(post: {
  title_de?: string
  content_de?: string
}): boolean {
  return Boolean(post.title_de?.trim() && post.content_de?.trim())
}

export async function generateStaticParams() {
  try {
    const posts = await fetchQuery(api.blogPosts.listPublished, {})
    const params: { locale: string; slug: string }[] = []
    for (const post of posts) {
      params.push({ locale: 'nl', slug: post.slug })
      if (hasGermanTranslation(post)) {
        params.push({ locale: 'de', slug: post.slug })
      }
    }
    return params
  } catch (error) {
    console.error('Skipping static blog paths because Convex is unavailable:', error)
    return []
  }
}

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string; slug: string }>
  }
) {
  const params = await props.params;
  if (!isBlogLocale(params.locale)) {
    notFound()
  }

  const post = await fetchQuery(api.blogPosts.getBySlug, { slug: params.slug })

  if (
    !post ||
    post.status !== 'published' ||
    (params.locale === 'de' && !hasGermanTranslation(post))
  ) {
    notFound()
  }

  const locale = params.locale
  const title =
    locale === 'de'
      ? post.seo_title_de || post.title_de!
      : post.seo_title_nl || post.title_nl
  const description =
    locale === 'de'
      ? post.seo_description_de || post.excerpt_de || post.title_de!
      : post.seo_description_nl || post.excerpt_nl
  const availableLocales = hasGermanTranslation(post)
    ? BLOG_LOCALES
    : (['nl'] as const)

  return generatePageMetadata({
    title,
    description,
    locale,
    path: `/blog/${post.slug}`,
    ogImage: post.featured_image || undefined,
    availableLocales,
  })
}

function formatDate(timestamp: number | undefined, locale: string): string {
  if (!timestamp) return ''
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(timestamp))
}

const categoryLabels: Record<string, Record<string, string>> = {
  kweektechnieken: { nl: 'Kweektechnieken', de: 'Anbautechniken' },
  duurzaamheid: { nl: 'Duurzaamheid', de: 'Nachhaltigkeit' },
  producten: { nl: 'Producten', de: 'Produkte' },
  tips: { nl: 'Tips', de: 'Tipps' },
}

export default async function BlogDetailPage(
  props: {
    params: Promise<{ locale: string; slug: string }>
  }
) {
  const params = await props.params;
  const locale = params.locale
  if (!isBlogLocale(locale)) {
    notFound()
  }

  const post = await fetchQuery(api.blogPosts.getBySlug, { slug: params.slug })

  if (
    !post ||
    post.status !== 'published' ||
    (locale === 'de' && !hasGermanTranslation(post))
  ) {
    notFound()
  }

  const title =
    locale === 'de' ? post.title_de! : post.title_nl
  const content =
    locale === 'de' ? post.content_de! : post.content_nl
  const plainContent = blogHtmlToPlainText(content)
  const categoryLabel =
    categoryLabels[post.category]?.[locale] || post.category
  const tags = (post.tags as string[]) || []
  const backLabel = locale === 'de' ? 'Zurück zum Blog' : 'Terug naar blog'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description:
      locale === 'de' ? post.excerpt_de || post.title_de! : post.excerpt_nl,
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
    datePublished: post.published_at ? new Date(post.published_at).toISOString() : undefined,
    dateModified: post.updated_at ? new Date(post.updated_at).toISOString() : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lumorahorticulture.nl${localizePathForLocale(`/blog/${post.slug}`, locale)}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {post.featured_image && (
          <div className="relative h-64 w-full bg-gray-100 md:h-96">
            <Image
              src={post.featured_image}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              preload
            />
          </div>
        )}

        <article className="mx-auto max-w-3xl px-4 py-12">
          <a
            href={localizePathForLocale('/blog', locale)}
            className="mb-6 inline-flex items-center text-sm text-green-700 hover:text-green-900"
          >
            &larr; {backLabel}
          </a>

          <div className="mb-4">
            <span className="inline-block rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-800">
              {categoryLabel}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {post.author && <span>{post.author}</span>}
            {post.published_at && (
              <time>{formatDate(post.published_at, locale)}</time>
            )}
          </div>

          <div className="prose prose-green max-w-none whitespace-pre-wrap prose-headings:text-gray-900 prose-a:text-green-700">
            {plainContent}
          </div>

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
