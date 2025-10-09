import { MetadataRoute } from 'next'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lumorahorticulture.nl'

  // Static pages
  const staticPages = [
    '',
    '/nl',
    '/en',
    '/de',
    '/nl/about',
    '/en/about',
    '/de/about',
    '/nl/contact',
    '/en/contact',
    '/de/contact',
    '/nl/products',
    '/en/products',
    '/de/products',
    '/nl/products/ellepot-fp12',
    '/en/products/ellepot-fp12',
    '/de/products/ellepot-fp12',
    '/nl/applications',
    '/en/applications',
    '/de/applications',
    '/nl/paperbus-steenwol-pluggen',
    '/en/paperbus-steenwol-pluggen',
    '/de/paperbus-steenwol-pluggen',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic product pages from database
  let dynamicPages: MetadataRoute.Sitemap = []

  try {
    const allProducts = await db
      .select({ slug: products.slug })
      .from(products)
      .where(eq(products.availability, 'in stock'))

    dynamicPages = allProducts.flatMap((product) => {
      if (!product.slug) return []

      return [
        {
          url: `${baseUrl}/nl/shop/${product.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.9,
        },
        {
          url: `${baseUrl}/en/shop/${product.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.9,
        },
        {
          url: `${baseUrl}/de/shop/${product.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily' as const,
          priority: 0.9,
        },
      ]
    })
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
  }

  return [...staticPages, ...dynamicPages]
}
