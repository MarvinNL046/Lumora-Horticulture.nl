/**
 * Manual sitemap generator as fallback
 * This generates sitemaps based on known page structure
 */

const fs = require('fs');
const path = require('path');

const domains = {
  nl: 'lumorahorticulture.nl',
  en: 'lumorahorticulture.com',
  de: 'lumorahorticulture.de'
};

// All sitemaps hosted on main domain for easier management
const sitemapHostDomain = 'lumorahorticulture.nl';

const pages = {
  nl: [
    { path: '/', priority: 1.0 },
    { path: '/producten/', priority: 0.9 },
    { path: '/producten/ellepot-fp12/', priority: 0.8 },
    { path: '/paperbus-steenwol-pluggen/', priority: 0.8 },
    { path: '/marketing/ellepot-flyer/', priority: 0.7 },
    { path: '/contact/', priority: 0.7 },
    { path: '/over-ons/', priority: 0.6 },
    { path: '/toepassingen/', priority: 0.6 },
    { path: '/privacy/', priority: 0.5 },
    { path: '/terms/', priority: 0.5 }
  ],
  en: [
    { path: '/', priority: 1.0 },
    { path: '/products/', priority: 0.9 },
    { path: '/products/ellepot-fp12/', priority: 0.8 },
    { path: '/paper-pot-rockwool-plugs/', priority: 0.8 },
    { path: '/marketing/ellepot-flyer/', priority: 0.7 },
    { path: '/contact/', priority: 0.7 },
    { path: '/about/', priority: 0.6 },
    { path: '/applications/', priority: 0.6 },
    { path: '/privacy/', priority: 0.5 },
    { path: '/terms/', priority: 0.5 }
  ],
  de: [
    { path: '/', priority: 1.0 },
    { path: '/produkte/', priority: 0.9 },
    { path: '/produkte/ellepot-fp12/', priority: 0.8 },
    { path: '/papiertopf-steinwollstecker/', priority: 0.8 },
    { path: '/marketing/ellepot-flyer/', priority: 0.7 },
    { path: '/kontakt/', priority: 0.7 },
    { path: '/uber-uns/', priority: 0.6 },
    { path: '/anwendungen/', priority: 0.6 },
    { path: '/privacy/', priority: 0.5 },
    { path: '/terms/', priority: 0.5 }
  ]
};

function generateSitemapXML(locale, domain) {
  const lastmod = new Date().toISOString().split('T')[0];
  const entries = pages[locale];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  entries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>https://${domain}${entry.path}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.priority >= 0.9 ? 'weekly' : 'monthly'}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

function generateSitemapIndex() {
  const lastmod = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  Object.entries(domains).forEach(([locale, domain]) => {
    xml += '  <sitemap>\n';
    xml += `    <loc>https://${sitemapHostDomain}/sitemap-${domain}.xml</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  return xml;
}

async function generateAllSitemaps() {
  const publicDir = path.join(__dirname, '../public');

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