#!/usr/bin/env ts-node

/**
 * TypeScript script to generate sitemaps
 * Run with: npx ts-node scripts/generate-sitemaps-ts.ts
 */

import { generateAllSitemaps } from '../src/lib/sitemap-generator';

async function main() {
  try {
    console.log('Generating sitemaps...');
    await generateAllSitemaps();
    console.log('✅ Sitemaps generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    process.exit(1);
  }
}

main();