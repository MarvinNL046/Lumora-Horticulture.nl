import { MetadataRoute } from 'next'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lumorahorticulture.com'

  // Static pages for English (.com)
  const staticPages = [
    '',
    '/en',
    '/en/about',
    '/en/contact',
    '/en/products',
    '/en/products/ellepot-fp12',
    '/en/applications',
    '/en/paperbus-steenwol-pluggen',
    '/en/neemx-pro',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' || route === '/en' ? 1 : 0.8,
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
          url: `${baseUrl}/en/shop/${product.slug}`,
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
