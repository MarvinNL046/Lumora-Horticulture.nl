const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lumorahorticulture.nl',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lumorahorticulture.de',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lumorahorticulture.com',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: false,

  // Resolve retired content before streaming layouts can commit a 200 response.
  async redirects() {
    const oldBlog = '/blog/neem-olie-in-de-tuinbouw-natuurlijke-gewasbescherming-die-werkt'
    const newBlog = '/blog/neemxpro-bladverzorging-gebruik'
    return [
      ...['', '/nl', '/de'].map((prefix) => ({
        source: `${prefix}${oldBlog}`,
        destination: `${prefix === '/nl' ? '' : prefix}${newBlog}`,
        permanent: true,
      })),
      ...['', '/nl', '/en', '/de'].flatMap((prefix) =>
        ['/neemxpro-2-plus-1-gratis', '/marketing/neemx-pro-flyer', '/marketing/neemx-pro-spuitschema'].map((path) => ({
          source: `${prefix}${path}`,
          destination: `${prefix === '/nl' ? '' : prefix}/neemx-pro`,
          permanent: true,
        })),
      ),
    ]
  },

  outputFileTracingExcludes: {
    '/*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000',
          },
        ],
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)
