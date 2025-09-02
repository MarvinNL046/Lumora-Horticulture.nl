#!/usr/bin/env node

/**
 * Script to generate sitemaps for all locales
 * Run with: node scripts/generate-sitemaps.js
 */

const { generateAllSitemaps } = require('../dist/lib/sitemap-generator');

async function main() {
  try {
    console.log('Generating sitemaps...');
    await generateAllSitemaps();
    console.log('Sitemaps generated successfully!');
  } catch (error) {
    console.error('Error generating sitemaps:', error);
    process.exit(1);
  }
}

// Check if TypeScript is compiled
const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist/lib/sitemap-generator.js');
if (!fs.existsSync(distPath)) {
  console.log('TypeScript files not compiled. Compiling first...');
  const { execSync } = require('child_process');
  execSync('npm run build', { stdio: 'inherit' });
}

main();