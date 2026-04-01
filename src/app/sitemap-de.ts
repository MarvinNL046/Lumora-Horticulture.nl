import { MetadataRoute } from 'next'
import { fetchQuery } from 'convex/nextjs'
import { api } from '@/../convex/_generated/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lumorahorticulture.de'

  // Static pages for German (.de)
  const staticPages = [
    '',
    '/de',
    '/de/about',
    '/de/contact',
    '/de/products',
    '/de/products/ellepot-fp12',
    '/de/applications',
    '/de/paperbus-steenwol-pluggen',
    '/de/neemx-pro',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' || route === '/de' ? 1 : 0.8,
  }))

  // Dynamic product pages from database
  let dynamicPages: MetadataRoute.Sitemap = []

  try {
    const allProducts = await fetchQuery(api.products.listInStock)

    dynamicPages = allProducts.flatMap((product) => {
      if (!product.slug) return []

      return [
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
