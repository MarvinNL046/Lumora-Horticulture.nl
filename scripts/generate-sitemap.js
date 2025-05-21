#!/usr/bin/env node

/**
 * Sitemap Generator Script for Lumora Horticulture
 * 
 * This script generates domain-specific sitemap.xml files for each supported domain.
 * Each sitemap only contains URLs for its specific domain, which resolves Google Search
 * Console errors for cross-domain URLs in sitemaps.
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
  '/applications/',
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
    '/applications/': '/toepassingen/',
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
    '/applications/': '/anwendungen/',
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

// Generate sitemap content for a specific domain/locale
function generateSitemapForLocale(locale, domain) {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Generate URLs only for this domain with localized paths
  BASE_ROUTES.forEach(route => {
    // Get the localized version of this route for this locale
    const localizedRoute = getLocalizedPath(route, locale);
    
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${domain}${localizedRoute}</loc>\n`;
    sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `  </url>\n`;
  });

  sitemap += '</urlset>';
  return sitemap;
}

// Write sitemap to file
function writeSitemaps() {
  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Generate the default sitemap.xml for the primary domain (NL)
  const defaultSitemap = generateSitemapForLocale('nl', DOMAINS['nl']);
  const defaultSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(defaultSitemapPath, defaultSitemap);
  console.log(`Default sitemap generated at ${defaultSitemapPath} (for ${DOMAINS['nl']})`);
  
  // Generate domain-specific sitemaps
  for (const [locale, domain] of Object.entries(DOMAINS)) {
    const sitemap = generateSitemapForLocale(locale, domain);
    const domainPrefix = domain.replace(/https?:\/\//, '').replace(/\/$/, '');
    const sitemapFileName = `sitemap-${domainPrefix}.xml`;
    const sitemapPath = path.join(publicDir, sitemapFileName);
    
    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`Domain-specific sitemap generated at ${sitemapPath} (for ${domain})`);
  }
}

// Execute
writeSitemaps();
