/**
 * Dynamic Sitemap Generator for Lumora Horticulture
 * Automatically generates sitemaps for all locales based on existing pages
 */

import fs from 'fs';
import path from 'path';
import { localizePathForLocale, domainLocaleMap } from './url-localizations';

export interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Configuration for different page types
const pageConfig: Record<string, { changefreq: string; priority: number }> = {
  '/': { changefreq: 'weekly', priority: 1.0 },
  '/products': { changefreq: 'weekly', priority: 0.9 },
  '/products/ellepot-fp12': { changefreq: 'monthly', priority: 0.8 },
  '/contact': { changefreq: 'monthly', priority: 0.7 },
  '/about': { changefreq: 'monthly', priority: 0.6 },
  '/applications': { changefreq: 'monthly', priority: 0.6 },
};

/**
 * Get all valid pages from the app directory
 */
export async function discoverPages(): Promise<string[]> {
  const pages: string[] = [];
  const appDir = path.join(process.cwd(), 'src/app/[locale]');
  
  async function scanDirectory(dir: string, basePath: string = ''): Promise<void> {
    try {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const dirPath = path.join(dir, entry.name);
          const routePath = basePath ? `${basePath}/${entry.name}` : entry.name;
          
          // Skip special Next.js directories
          if (entry.name.startsWith('_') || entry.name.startsWith('(')) {
            continue;
          }
          
          // Check if this directory has a page.tsx file
          const pageFile = path.join(dirPath, 'page.tsx');
          if (fs.existsSync(pageFile)) {
            pages.push(basePath ? `/${basePath}` : '/');
            if (entry.name !== 'page.tsx') {
              pages.push(`/${routePath}`);
            }
          }
          
          // Recursively scan subdirectories
          await scanDirectory(dirPath, routePath);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }
  
  await scanDirectory(appDir);
  
  // Remove duplicates and sort
  return Array.from(new Set(pages)).sort();
}

/**
 * Generate sitemap XML content
 */
export function generateSitemapXML(entries: SitemapEntry[], domain: string): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => {
    const config = pageConfig[entry.path] || { changefreq: 'monthly', priority: 0.5 };
    return `  <url>
    <loc>https://${domain}${entry.path}</loc>
    <lastmod>${entry.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${entry.changefreq || config.changefreq}</changefreq>
    <priority>${entry.priority || config.priority}</priority>
  </url>`;
  }).join('\n')}
</urlset>`;
  
  return xml;
}

/**
 * Generate sitemap for a specific locale
 */
export async function generateSitemapForLocale(locale: string, domain: string): Promise<string> {
  const pages = await discoverPages();
  const entries: SitemapEntry[] = [];
  
  for (const page of pages) {
    // Skip marketing pages from sitemap
    if (page.includes('/marketing/')) {
      continue;
    }
    
    // Localize the path for this locale
    const localizedPath = localizePathForLocale(page, locale);
    
    entries.push({
      path: localizedPath,
      lastmod: new Date().toISOString().split('T')[0],
    });
  }
  
  return generateSitemapXML(entries, domain);
}

/**
 * Generate all sitemaps for all locales
 */
export async function generateAllSitemaps(): Promise<void> {
  const publicDir = path.join(process.cwd(), 'public');
  
  // Generate individual sitemaps for each domain
  for (const [domain, locale] of Object.entries(domainLocaleMap)) {
    if (domain === 'localhost') continue;
    
    try {
      const sitemap = await generateSitemapForLocale(locale, domain);
      const filename = domain === 'lumorahorticulture.netlify.app' 
        ? 'sitemap-netlify.xml' 
        : `sitemap-${domain}.xml`;
      
      await fs.promises.writeFile(
        path.join(publicDir, filename),
        sitemap,
        'utf-8'
      );
      
      console.log(`Generated ${filename}`);
    } catch (error) {
      console.error(`Error generating sitemap for ${domain}:`, error);
    }
  }
  
  // Generate sitemap index file
  await generateSitemapIndex();
}

/**
 * Generate sitemap index file that references all locale-specific sitemaps
 */
export async function generateSitemapIndex(): Promise<void> {
  const publicDir = path.join(process.cwd(), 'public');
  const lastmod = new Date().toISOString().split('T')[0];
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://lumorahorticulture.nl/sitemap-lumorahorticulture.nl.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://lumorahorticulture.com/sitemap-lumorahorticulture.com.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://lumorahorticulture.de/sitemap-lumorahorticulture.de.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;
  
  await fs.promises.writeFile(
    path.join(publicDir, 'sitemap.xml'),
    sitemapIndex,
    'utf-8'
  );
  
  console.log('Generated sitemap index file');
}

/**
 * Watch for changes and regenerate sitemaps
 */
export function watchAndRegenerate(): void {
  const appDir = path.join(process.cwd(), 'src/app');
  
  console.log('Watching for page changes...');
  
  fs.watch(appDir, { recursive: true }, async (eventType, filename) => {
    if (filename && filename.endsWith('page.tsx')) {
      console.log(`Page change detected: ${filename}`);
      await generateAllSitemaps();
    }
  });
}