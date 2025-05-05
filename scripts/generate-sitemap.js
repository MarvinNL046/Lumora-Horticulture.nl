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

// Base routes to include in sitemap (English versions, will be localized)
const BASE_ROUTES = [
  '', // Homepage
  '/products/',
  '/contact/',
  // Individual product pages
  '/products/tray84/',
  '/products/tray104/',
  '/products/transportbox/',
  '/products/insertsheets/',
];

// Localized path mapping
const LOCALIZED_PATHS = {
  // Dutch paths
  'nl': {
    '/products/': '/producten/',
    '/products/tray84/': '/producten/tray84/',
    '/products/tray104/': '/producten/tray104/',
    '/products/transportbox/': '/producten/transportdoos/',
    '/products/insertsheets/': '/producten/inlegvellen/',
    // contact is the same in Dutch
  },
  // English paths (same as base)
  'en': {
    // No need to transform
  },
  // German paths
  'de': {
    '/products/': '/produkte/',
    '/contact/': '/kontakt/',
    '/products/tray84/': '/produkte/tray84/',
    '/products/tray104/': '/produkte/tray104/',
    '/products/transportbox/': '/produkte/transportbox/',
    '/products/insertsheets/': '/produkte/einlegebogen/',
  }
};

// Function to get localized path
function getLocalizedPath(basePath, locale) {
  // Home page doesn't need translation
  if (basePath === '') return '';
  
  // Check if we have a localized version for this path and locale
  const localizedPathMap = LOCALIZED_PATHS[locale] || {};
  return localizedPathMap[basePath] || basePath;
}

// Generate sitemap content
function generateSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Generate URLs for each domain with localized paths
  for (const [locale, domain] of Object.entries(DOMAINS)) {
    BASE_ROUTES.forEach(route => {
      // Get the localized version of this route for this locale
      const localizedRoute = getLocalizedPath(route, locale);
      
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${domain}${localizedRoute}</loc>\n`;
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
