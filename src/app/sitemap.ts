import type {MetadataRoute} from 'next'
import {fetchQuery} from 'convex/nextjs'
import {api} from '@/../convex/_generated/api'
import {localizePathForLocale} from '@/lib/url-localizations'

export const dynamic = 'force-dynamic'

const SITE_ORIGIN = 'https://lumorahorticulture.nl'
const LOCALES = ['nl', 'en', 'de'] as const
const BLOG_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
function absoluteUrl(basePath: string, locale: string): string {
  return `${SITE_ORIGIN}${localizePathForLocale(basePath, locale)}`
}

function alternateLanguages(basePath: string, locales: readonly string[] = LOCALES) {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, absoluteUrl(basePath, locale)]),
    ),
    'x-default': absoluteUrl(basePath, 'nl'),
  }
}

function localizedEntries(
  basePath: string,
  priority: number,
  changeFrequency: 'daily' | 'weekly' | 'monthly',
  locales: readonly string[] = LOCALES,
  lastModified?: Date,
): MetadataRoute.Sitemap {
  const languages = alternateLanguages(basePath, locales)

  return locales.map((locale) => ({
    url: absoluteUrl(basePath, locale),
    changeFrequency,
    priority,
    alternates: {languages},
    ...(lastModified ? {lastModified} : {}),
  }))
}

function blogLastModified(post: {
  updated_at?: number
  published_at?: number
}): Date | undefined {
  const timestamp = post.updated_at || post.published_at
  if (!timestamp || !Number.isFinite(timestamp)) return undefined

  const date = new Date(timestamp)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    '/',
    '/about',
    '/contact',
    '/products',
    '/applications',
    '/paperbus-pluggen',
    '/paperbus-steenwol-pluggen',
    '/privacy',
    '/terms',
  ]

  const staticEntries = staticPaths.flatMap((path) =>
    localizedEntries(path, path === '/' ? 1 : 0.8, 'weekly'),
  )
  const returnPolicyEntries = localizedEntries('/return-policy', 0.5, 'monthly')
  const knowledgePaths = [
    '/paper-plug-trays-uitgelegd',
    '/voordelen-nadelen-steenwol',
    '/steenwol-vs-rockwool',
    '/levensduur-steenwol',
    '/steenwol-vastzetten',
    '/steenwol-longen',
    '/glaswol-aanraken',
  ]
  const knowledgeEntries = knowledgePaths.flatMap((path) => localizedEntries(path, 0.6, 'monthly'))
  const blogEntries = localizedEntries('/blog', 0.7, 'weekly')
  const storefrontProductEntries = [
    ...localizedEntries('/stekpluggen-steenwol', 0.95, 'daily'),
    ...localizedEntries('/neemx-pro', 0.95, 'daily'),
  ]

  let blogArticleEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await fetchQuery(api.blogPosts.listPublished, {})
    const seenSlugs = new Set<string>()

    blogArticleEntries = posts.flatMap((post) => {
      if (!BLOG_SLUG.test(post.slug) || seenSlugs.has(post.slug)) return []
      seenSlugs.add(post.slug)

      const locales = post.title_de?.trim() && post.content_de?.trim()
        ? (['nl', 'de'] as const)
        : (['nl'] as const)

      return localizedEntries(
        `/blog/${post.slug}`,
        0.7,
        'monthly',
        locales,
        blogLastModified(post),
      )
    })
  } catch (error) {
    console.error('Unable to add Convex blog posts to the sitemap:', error)
  }

  return [
    ...staticEntries,
    ...returnPolicyEntries,
    ...knowledgeEntries,
    ...['/zaailingen-verspenen', '/tomaten-zaaien', '/paprika-zaaien'].flatMap((path) =>
      localizedEntries(path, 0.6, 'monthly', ['nl']),
    ),
    ...storefrontProductEntries,
    ...blogEntries,
    ...blogArticleEntries,
  ]
}
