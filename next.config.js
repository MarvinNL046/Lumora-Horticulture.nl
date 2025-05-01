/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Voor statische site generatie
  images: {
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
    unoptimized: true, // Nodig voor statische exports
  },
  // Voeg trailing slashes toe voor betere compatibiliteit
  trailingSlash: true
}

module.exports = nextConfig
