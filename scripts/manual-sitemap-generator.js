/**
 * Dynamic sitemap generator - automatically discovers all pages
 * Scans the src/app/[locale] directory for page.tsx files
 */

const fs = require('fs');
const path = require('path');

const domains = {
  nl: 'lumorahorticulture.nl',
  en: 'lumorahorticulture.com',
  de: 'lumorahorticulture.de'
};

// URL localizations for each locale
const localizedPaths = {
  nl: {
    'about': 'over-ons',
    'products': 'producten',
    'shop': 'winkel',
    'applications': 'toepassingen',
    'privacy-policy': 'privacybeleid',
    'terms-conditions': 'algemene-voorwaarden',
    'return-policy': 'retourbeleid',
    // Landing pages (NL uses base paths)
    'paperbus-pluggen': 'paperbus-pluggen',
    'steenwol-pluggen': 'steenwol-pluggen',
    'stekpluggen': 'stekpluggen',
    // FAQ pages (NL uses base paths)
    'steenwol-vs-rockwool': 'steenwol-vs-rockwool',
    'voordelen-nadelen-steenwol': 'voordelen-nadelen-steenwol',
    'steenwol-vastzetten': 'steenwol-vastzetten',
    'steenwol-longen': 'steenwol-longen',
    'glaswol-aanraken': 'glaswol-aanraken',
    'levensduur-steenwol': 'levensduur-steenwol',
  },
  en: {
    'about': 'about',
    'products': 'products',
    'shop': 'shop',
    'applications': 'applications',
    'privacy-policy': 'privacy-policy',
    'terms-conditions': 'terms-conditions',
    'return-policy': 'return-policy',
    // Landing pages
    'paperbus-pluggen': 'paper-pot-plugs',
    'steenwol-pluggen': 'rockwool-plugs',
    'stekpluggen': 'cutting-plugs',
    // FAQ pages
    'steenwol-vs-rockwool': 'rockwool-vs-stone-wool',
    'voordelen-nadelen-steenwol': 'rockwool-pros-cons',
    'steenwol-vastzetten': 'securing-rockwool',
    'steenwol-longen': 'rockwool-lungs',
    'glaswol-aanraken': 'touching-fiberglass',
    'levensduur-steenwol': 'rockwool-lifespan',
  },
  de: {
    'about': 'uber-uns',
    'products': 'produkte',
    'shop': 'shop',
    'applications': 'anwendungen',
    'privacy-policy': 'datenschutz',
    'terms-conditions': 'allgemeine-geschaftsbedingungen',
    'return-policy': 'ruckgaberecht',
    // Landing pages
    'paperbus-pluggen': 'papiertopf-stecker',
    'steenwol-pluggen': 'steinwolle-stecklinge',
    'stekpluggen': 'stecklingsplugs',
    // FAQ pages
    'steenwol-vs-rockwool': 'steinwolle-vs-rockwool',
    'voordelen-nadelen-steenwol': 'steinwolle-vor-nachteile',
    'steenwol-vastzetten': 'steinwolle-befestigen',
    'steenwol-longen': 'steinwolle-lunge',
    'glaswol-aanraken': 'glaswolle-beruehren',
    'levensduur-steenwol': 'steinwolle-lebensdauer',
  }
};

// Page priorities and changefreq
const pageConfig = {
  '/': { priority: 1.0, changefreq: 'weekly' },
  '/products': { priority: 0.9, changefreq: 'weekly' },
  '/shop': { priority: 0.9, changefreq: 'weekly' },
  '/products/ellepot-fp12': { priority: 0.8, changefreq: 'monthly' },
  '/paperbus-steenwol-pluggen': { priority: 0.8, changefreq: 'monthly' },
  // SEO Landing pages
  '/paperbus-pluggen': { priority: 0.85, changefreq: 'weekly' },
  '/steenwol-pluggen': { priority: 0.85, changefreq: 'weekly' },
  '/stekpluggen': { priority: 0.85, changefreq: 'weekly' },
  // FAQ pages
  '/steenwol-vs-rockwool': { priority: 0.75, changefreq: 'monthly' },
  '/voordelen-nadelen-steenwol': { priority: 0.75, changefreq: 'monthly' },
  '/steenwol-vastzetten': { priority: 0.75, changefreq: 'monthly' },
  '/steenwol-longen': { priority: 0.75, changefreq: 'monthly' },
  '/glaswol-aanraken': { priority: 0.75, changefreq: 'monthly' },
  '/levensduur-steenwol': { priority: 0.75, changefreq: 'monthly' },
  // Other pages
  '/contact': { priority: 0.7, changefreq: 'monthly' },
  '/about': { priority: 0.6, changefreq: 'monthly' },
  '/applications': { priority: 0.6, changefreq: 'monthly' },
  '/privacy-policy': { priority: 0.5, changefreq: 'monthly' },
  '/terms-conditions': { priority: 0.5, changefreq: 'monthly' },
  '/return-policy': { priority: 0.5, changefreq: 'monthly' }
};

/**
 * Discover all pages from the app directory
 */
function discoverPages() {
  const pages = [];
  const appDir = path.join(__dirname, '../src/app/[locale]');

  function scanDirectory(dir, basePath = '') {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const dirPath = path.join(dir, entry.name);
          const routePath = basePath ? `${basePath}/${entry.name}` : entry.name;

          // Skip special Next.js directories and dynamic routes
          if (entry.name.startsWith('_') || entry.name.startsWith('(') || entry.name.startsWith('[')) {
            continue;
          }

          // Check if this directory has a page.tsx file
          const pageFile = path.join(dirPath, 'page.tsx');
          if (fs.existsSync(pageFile)) {
            pages.push(`/${routePath}`);
          }

          // Recursively scan subdirectories
          scanDirectory(dirPath, routePath);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }

  // Add homepage
  pages.push('/');

  // Scan for all other pages
  scanDirectory(appDir);

  // Remove duplicates and sort
  return Array.from(new Set(pages)).sort();
}

/**
 * Localize a path for a specific locale
 */
function localizePathForLocale(path, locale) {
  // Clean the path
  const cleanPath = path.replace(/^\/|\/$/g, '');

  // If homepage, return as is
  if (!cleanPath) {
    return '/';
  }

  // Check for full path match first
  if (localizedPaths[locale] && localizedPaths[locale][cleanPath]) {
    return '/' + localizedPaths[locale][cleanPath] + '/';
  }

  // Try to localize the first segment
  const segments = cleanPath.split('/');
  const firstSegment = segments[0];

  if (localizedPaths[locale] && localizedPaths[locale][firstSegment]) {
    segments[0] = localizedPaths[locale][firstSegment];
  }

  return '/' + segments.join('/') + '/';
}

/**
 * Generate sitemap XML for a specific locale
 */
function generateSitemapXML(locale, domain) {
  const lastmod = new Date().toISOString().split('T')[0];
  const discoveredPages = discoverPages();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  discoveredPages.forEach(page => {
    // Skip marketing pages from sitemap
    if (page.includes('/marketing/')) {
      return;
    }

    // Localize the path
    const localizedPath = localizePathForLocale(page, locale);

    // Get config for this page (use base path without locale)
    const config = pageConfig[page] || { priority: 0.5, changefreq: 'monthly' };

    xml += '  <url>\n';
    xml += `    <loc>https://${domain}${localizedPath}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${config.changefreq}</changefreq>\n`;
    xml += `    <priority>${config.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

/**
 * Generate sitemap index
 */
function generateSitemapIndex() {
  const lastmod = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  Object.entries(domains).forEach(([locale, domain]) => {
    xml += '  <sitemap>\n';
    xml += `    <loc>https://lumorahorticulture.nl/sitemap-${domain}.xml</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });

  xml += '</sitemapindex>';
  return xml;
}

/**
 * Generate all sitemaps
 */
async function generateAllSitemaps() {
  const publicDir = path.join(__dirname, '../public');

  console.log('Discovering pages...');
  const discoveredPages = discoverPages();
  console.log(`Found ${discoveredPages.length} pages:`, discoveredPages);

  // Generate individual sitemaps
  for (const [locale, domain] of Object.entries(domains)) {
    const sitemap = generateSitemapXML(locale, domain);
    const filename = `sitemap-${domain}.xml`;
    await fs.promises.writeFile(path.join(publicDir, filename), sitemap, 'utf-8');
    console.log(`Generated ${filename}`);
  }

  // Generate sitemap index
  const sitemapIndex = generateSitemapIndex();
  await fs.promises.writeFile(path.join(publicDir, 'sitemap.xml'), sitemapIndex, 'utf-8');
  console.log('Generated sitemap index');
}

// Run if called directly
if (require.main === module) {
  generateAllSitemaps()
    .then(() => console.log('✓ All sitemaps generated successfully'))
    .catch(err => {
      console.error('Error generating sitemaps:', err);
      process.exit(1);
    });
}

module.exports = { generateAllSitemaps };
