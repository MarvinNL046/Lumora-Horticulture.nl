#!/usr/bin/env node

/**
 * Watch for page changes and regenerate sitemaps automatically
 * Run with: node scripts/watch-pages.js
 */

const fs = require('fs');
const path = require('path');
const { generateAllSitemaps } = require('./manual-sitemap-generator');

const appDir = path.join(__dirname, '../src/app');
let debounceTimer;

console.log('👀 Watching for page changes...');
console.log('🔄 Sitemaps will be regenerated automatically when pages are added/removed');

// Debounce function to avoid multiple regenerations
function debounce(func, delay) {
  return function(...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Regenerate sitemaps with debouncing
const regenerateSitemaps = debounce(async () => {
  console.log('🔄 Page change detected, regenerating sitemaps...');
  try {
    await generateAllSitemaps();
    console.log('✅ Sitemaps regenerated successfully!');
  } catch (error) {
    console.error('❌ Error regenerating sitemaps:', error);
  }
}, 1000);

// Watch for changes
fs.watch(appDir, { recursive: true }, (eventType, filename) => {
  if (filename && filename.endsWith('page.tsx')) {
    console.log(`📄 ${eventType}: ${filename}`);
    regenerateSitemaps();
  }
});

// Keep the process running
process.stdin.resume();