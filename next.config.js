/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  
  // Optimize for serverless deployment
  experimental: {
    serverMinification: false,
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
  
  // Reduce bundle size
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'sharp'];
    }
    return config;
  },
  
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
