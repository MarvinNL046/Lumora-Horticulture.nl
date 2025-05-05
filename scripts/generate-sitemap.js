#!/usr/bin/env node

/**
 * Sitemap Generator Script for Lumora Horticulture
 * 
 * This script generates a sitemap.xml file with all pages of the website
 * across all supported locales (nl, en, de).
 */

const fs = require('fs');
const path = require('path');

// Domain-locale configuration
const DOMAINS = {
  'nl': 'https://lumorahorticulture.nl',
  'en': 'https://lumorahorticulture.com',
  'de': 'https://lumorahorticulture.de'
};

// Routes to include in each sitemap (no locale prefix needed now)
const ROUTES = [
  '', // Homepage
  '/products/',
  '/contact/',
];

// Generate sitemap content
function generateSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Generate URLs for each domain
  for (const [locale, domain] of Object.entries(DOMAINS)) {
    ROUTES.forEach(route => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${domain}${route}</loc>\n`;
      sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `  </url>\n`;
    });
  }

  sitemap += '</urlset>';
  return sitemap;
}

// Write sitemap to file
function writeSitemap() {
  const sitemap = generateSitemap();
  
  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write the sitemap.xml file
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log(`Sitemap generated at ${sitemapPath}`);
}

// Execute
writeSitemap();
