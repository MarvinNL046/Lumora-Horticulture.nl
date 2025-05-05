#!/usr/bin/env node

/**
 * Sitemap Generator Script for Lumora Horticulture
 * 
 * This script generates a sitemap.xml file with all pages of the website
 * across all supported locales (nl, en, de).
 */

const fs = require('fs');
const path = require('path');

// Site configuration
const SITE_URL = 'https://lumorahorticulture.nl';
const LOCALES = ['nl', 'en', 'de'];
const DEFAULT_LOCALE = 'nl';

// Routes to include in the sitemap (without locale prefix)
const ROUTES = [
  '', // Homepage
  '/products/',
  '/contact/',
];

// Generate sitemap content
function generateSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add each route for each locale
  LOCALES.forEach(locale => {
    ROUTES.forEach(route => {
      // For default locale, we don't need the locale prefix in the URL
      // but we still want to include both versions (with and without prefix)
      if (locale === DEFAULT_LOCALE) {
        // Add route without locale prefix
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${SITE_URL}${route}</loc>\n`;
        sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        sitemap += `    <changefreq>weekly</changefreq>\n`;
        sitemap += `  </url>\n`;
      }
      
      // Add route with locale prefix
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${SITE_URL}/${locale}${route}</loc>\n`;
      sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `  </url>\n`;
    });
  });

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
