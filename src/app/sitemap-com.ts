import { MetadataRoute } from 'next'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/../convex/_generated/api'

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
    const allProducts = await fetchQuery(api.products.listInStock)

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
