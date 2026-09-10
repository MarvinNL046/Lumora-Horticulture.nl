import { generatePageMetadata } from '@/lib/metadata'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/../convex/_generated/api'
import { notFound, permanentRedirect } from 'next/navigation'
import Image from 'next/image'
import { getBlogSections, getBlogLinks } from '@/lib/blog-content'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import { localizePathForLocale } from '@/lib/url-localizations'

const OLD_NEEM_SLUG = 'neem-olie-in-de-tuinbouw-natuurlijke-gewasbescherming-die-werkt';
const NEW_NEEM_SLUG = 'neemxpro-bladverzorging-gebruik';
function redirectLegacyArticle(slug: string, locale: string) {
  if (slug === OLD_NEEM_SLUG) permanentRedirect(localizePathForLocale(`/blog/${NEW_NEEM_SLUG}`, locale));
}

// Keep the new URL available while the CMS slug and frontend are rolled out.
async function loadPost(slug: string) {
  const post = await fetchQuery(api.blogPosts.getBySlug, { slug });
  if (post || slug !== NEW_NEEM_SLUG) return post;
  const legacy = await fetchQuery(api.blogPosts.getBySlug, { slug: OLD_NEEM_SLUG });
  return legacy ? { ...legacy, slug: NEW_NEEM_SLUG } : null;
}

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

  redirectLegacyArticle(params.slug, params.locale)
  const post = await loadPost(params.slug)

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

  redirectLegacyArticle(params.slug, params.locale)
  const post = await loadPost(params.slug)

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
  const contentSections = getBlogSections(content)
  const readingLinks = getBlogLinks(content)
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
              <time dateTime={new Date(post.published_at).toISOString()}>{formatDate(post.published_at, locale)}</time>
            )}
            {post.updated_at > (post.published_at || 0) && (
              <span>{locale === 'de' ? 'Aktualisiert: ' : 'Bijgewerkt: '}<time dateTime={new Date(post.updated_at).toISOString()}>{formatDate(post.updated_at, locale)}</time></span>
            )}
          </div>

          <div className="space-y-5 leading-8 text-gray-700">
            {contentSections.map((section, index) => section.kind === 'h2'
              ? <h2 key={index} className="pt-5 text-2xl font-semibold leading-snug text-gray-900">{section.text}</h2>
              : section.kind === 'h3'
                ? <h3 key={index} className="pt-2 text-lg font-semibold text-gray-900">{section.text}</h3>
                : <div key={index} className="whitespace-pre-line">{section.text}</div>)}
          </div>

          {readingLinks.length > 0 && (
            <nav aria-label={locale === 'de' ? 'Weiterlesen und Quellen' : 'Verder lezen en bronnen'} className="mt-8 rounded-xl bg-green-50 p-6">
              <h2 className="mb-3 text-xl font-semibold text-gray-900">{locale === 'de' ? 'Weiterlesen und Quellen' : 'Verder lezen en bronnen'}</h2>
              <ul className="space-y-3">
                {readingLinks.map(link => <li key={link.href}><a href={link.href} className="break-words text-green-800 underline underline-offset-4">{link.label}</a></li>)}
              </ul>
            </nav>
          )}

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
