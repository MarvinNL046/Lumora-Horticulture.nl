/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Important for static image serving with Netlify
    domains: ['lumorahorticulture.netlify.app'], // Add Netlify domain
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
      {
        protocol: 'https',
        hostname: 'lumorahorticulture.netlify.app',
        pathname: '/**',
      },
    ],
  },
  // Ensure trailing slashes for better compatibility
  trailingSlash: true,
  
  // Make sure static assets are properly handled
  async rewrites() {
    return [
      {
        source: '/productAfbeeldingen/:path*',
        destination: '/productAfbeeldingen/:path*',
      },
    ]
  }
}

module.exports = nextConfig
