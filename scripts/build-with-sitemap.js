#!/usr/bin/env node

/**
 * Build script that generates sitemaps after building the Next.js app
 * This ensures sitemaps are always up-to-date with the latest pages
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

async function generateSitemapsDirectly() {
  console.log('📍 Generating sitemaps directly...');
  
  // Import the functions after compilation
  const sitemapGeneratorPath = path.join(__dirname, '../.next/server/chunks/sitemap-generator.js');
  
  // Use the TypeScript source directly with ts-node
  try {
    execSync('npx ts-node scripts/generate-sitemaps-ts.ts', { stdio: 'inherit' });
  } catch (error) {
    console.warn('Could not generate sitemaps with ts-node, trying alternative method...');
    
    // Alternative: manually create sitemaps based on known structure
    const { generateAllSitemaps } = require('./manual-sitemap-generator');
    await generateAllSitemaps();
  }
}

async function main() {
  try {
    // Step 1: Build the Next.js app
    console.log('🏗️  Building Next.js application...');
    execSync('next build', { stdio: 'inherit' });
    
    // Step 2: Generate sitemaps
    await generateSitemapsDirectly();
    
    console.log('✅ Build complete with updated sitemaps!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run the build process
main();