import { generatePageMetadata } from '@/lib/metadata'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/../convex/_generated/api'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { localizePathForLocale } from '@/lib/url-localizations'

export const dynamic = 'force-dynamic'

const BLOG_LOCALES = ['nl', 'en', 'de'] as const
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

export function generateStaticParams() {
  return BLOG_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  if (!isBlogLocale(params.locale)) {
    notFound()
  }

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
    en: {
      title: 'Blog - Horticulture & Propagation Knowledge',
      description:
        'Read Lumora articles about propagation, rockwool plugs, sustainability and practical growing techniques.',
      keywords: [
        'horticulture blog',
        'propagation techniques',
        'rockwool plug guide',
        'professional growing',
        'sustainable horticulture',
      ],
    },
  }

  const localeMeta = meta[params.locale]

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: '/blog',
    availableLocales: BLOG_LOCALES,
  })
}

function formatDate(timestamp: number | undefined, locale: string): string {
  if (!timestamp) return ''
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : locale === 'en' ? 'en-GB' : 'nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(timestamp))
}

const categoryLabels: Record<string, Record<string, string>> = {
  kweektechnieken: { nl: 'Kweektechnieken', en: 'Growing techniques', de: 'Anbautechniken' },
  duurzaamheid: { nl: 'Duurzaamheid', en: 'Sustainability', de: 'Nachhaltigkeit' },
  producten: { nl: 'Producten', en: 'Products', de: 'Produkte' },
  tips: { nl: 'Tips', en: 'Tips', de: 'Tipps' },
}

const englishGuides = [
  {
    category: 'Propagation',
    title: 'Choosing the right plug density for your crop',
    excerpt: 'Compare the 84-cell and 104-cell Paper Plug trays by cell size, plant density and box contents.',
    href: '/stekpluggen-steenwol',
  },
  {
    category: 'Leaf care',
    title: 'A clear routine for botanical leaf care',
    excerpt: 'Learn how NeemXPRO is mixed, prepared and used as a fresh spray solution for even leaf coverage.',
    href: '/neemx-pro',
  },
  {
    category: 'About Lumora',
    title: 'Two specialist product lines, one practical approach',
    excerpt: 'Discover why Lumora keeps its range focused and supports growers with direct product advice.',
    href: '/about',
  },
] as const

export default async function BlogListingPage(
  props: {
    params: Promise<{ locale: string }>
  }
) {
  const params = await props.params;
  const locale = params.locale
  if (!isBlogLocale(locale)) {
    notFound()
  }

  const publishedPosts = await fetchQuery(api.blogPosts.listPublished, {}).catch((error) => {
    console.error('Unable to load blog posts from Convex:', error)
    return []
  })
  const posts = locale === 'de'
    ? publishedPosts.filter(hasGermanTranslation)
    : locale === 'en'
      ? []
      : publishedPosts

  const subtitle =
    locale === 'de'
      ? 'Fachwissen und Einblicke für professionelle Züchter'
      : locale === 'en'
        ? 'Practical knowledge and insights for professional growers'
        : 'Vakkennis en inzichten voor professionele kwekers'
  const noPosts =
    locale === 'de'
      ? 'Noch keine Artikel verfügbar. Schauen Sie bald wieder vorbei!'
      : locale === 'en'
        ? 'English articles are being prepared. Please check back soon.'
        : 'Nog geen artikelen beschikbaar. Kom snel terug!'

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-[#dce5df] bg-gradient-to-b from-[#f4f7f4] to-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#2d7d46]">Lumora Horticulture</span>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.04em] text-[#1d2a25] md:text-7xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#596861]">{subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
        {locale === 'en' ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {englishGuides.map((guide) => (
              <Link
                key={guide.title}
                href={localizePathForLocale(guide.href, locale)}
                className="group flex min-h-64 flex-col rounded-3xl border border-[#dce5df] bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="mb-5 inline-block w-fit rounded-full bg-[#eaf2ec] px-3 py-1 text-xs font-bold text-[#2d7d46]">
                  {guide.category}
                </span>
                <h2 className="mb-3 font-display text-2xl font-semibold leading-tight text-[#1d2a25] group-hover:text-[#2d7d46]">
                  {guide.title}
                </h2>
                <p className="flex-1 text-sm leading-relaxed text-[#596861]">{guide.excerpt}</p>
                <span className="mt-6 text-sm font-bold text-[#2d7d46]">Read the guide →</span>
              </Link>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-3xl border border-[#dce5df] bg-[#f4f7f4] px-6 py-16 text-center shadow-sm">
            <p className="text-[#596861]">{noPosts}</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const title =
                locale === 'de' ? post.title_de! : post.title_nl
              const excerpt =
                locale === 'de' ? post.excerpt_de || '' : post.excerpt_nl
              const categoryLabel =
                categoryLabels[post.category]?.[locale] || post.category

              return (
                <Link
                  key={post._id}
                  href={localizePathForLocale(`/blog/${post.slug}`, locale)}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-[#dce5df] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
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
                    <span className="mb-3 inline-block w-fit rounded-full bg-[#eaf2ec] px-3 py-1 text-xs font-bold text-[#2d7d46]">
                      {categoryLabel}
                    </span>
                    <h2 className="mb-2 font-display text-xl font-semibold leading-tight text-[#1d2a25] group-hover:text-[#2d7d46]">
                      {title}
                    </h2>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-[#596861] line-clamp-3">
                      {excerpt}
                    </p>
                    {post.published_at && (
                      <time className="text-xs text-gray-400">
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
