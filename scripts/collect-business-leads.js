#!/usr/bin/env node
/**
 * Business Lead Collector for Lumora Horticulture
 *
 * Searches for growshops, headshops, smartshops in DE/NL/BE
 * and extracts contact emails to CSV
 *
 * Usage: node scripts/collect-business-leads.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  outputDir: path.join(process.cwd(), 'leads'),
  outputFile: 'business-leads.csv',
  jinaApiKey: process.env.JINA_API_KEY || '', // Optional for enhanced results
  delayBetweenRequests: 2000, // 2 seconds to be respectful
};

// Search queries per country and category
const SEARCH_QUERIES = [
  // Germany - Primary focus
  { country: 'DE', category: 'Growshop', queries: [
    'growshop deutschland kontakt email',
    'grow shop berlin email',
    'growshop münchen kontakt',
    'growshop hamburg email',
    'growshop köln kontakt',
    'indoor growing shop deutschland',
    'pflanzen grow shop email',
    'hydrokultur shop deutschland kontakt',
  ]},
  { country: 'DE', category: 'Headshop', queries: [
    'headshop deutschland email kontakt',
    'headshop berlin kontakt',
    'headshop münchen email',
    'headshop online deutschland',
  ]},
  { country: 'DE', category: 'Smartshop', queries: [
    'smartshop deutschland kontakt',
    'smartshop berlin email',
  ]},
  { country: 'DE', category: 'Gärtnerei', queries: [
    'gärtnerei großhandel deutschland email',
    'pflanzenzucht betrieb kontakt',
    'jungpflanzen gärtnerei email',
  ]},

  // Netherlands
  { country: 'NL', category: 'Growshop', queries: [
    'growshop nederland contact email',
    'growshop amsterdam email',
    'indoor grow shop nederland',
    'kweekbenodigdheden winkel email',
  ]},
  { country: 'NL', category: 'Headshop', queries: [
    'headshop nederland contact',
    'headshop amsterdam email',
  ]},
  { country: 'NL', category: 'Smartshop', queries: [
    'smartshop nederland email contact',
    'smartshop amsterdam',
  ]},

  // Belgium
  { country: 'BE', category: 'Growshop', queries: [
    'growshop belgie contact email',
    'grow shop antwerpen',
    'growshop brussel email',
  ]},
];

// Email regex pattern
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Domains to exclude (generic, spam, examples)
const EXCLUDED_DOMAINS = [
  'example.com', 'test.com', 'email.com', 'domain.com',
  'yourcompany.com', 'company.com', 'website.com',
  'sentry.io', 'wixpress.com', 'wordpress.com',
  'facebook.com', 'instagram.com', 'twitter.com',
  'google.com', 'gmail.com', 'hotmail.com', 'outlook.com',
  'yahoo.com', 'icloud.com', 'live.com',
];

// Store collected leads
const leads = new Map(); // Use Map to avoid duplicates

/**
 * Fetch URL content using Jina.ai Reader
 */
async function fetchWithJina(url) {
  try {
    const jinaUrl = `https://r.jina.ai/${url}`;
    const headers = {
      'Accept': 'text/plain',
    };

    if (CONFIG.jinaApiKey) {
      headers['Authorization'] = `Bearer ${CONFIG.jinaApiKey}`;
    }

    const response = await fetch(jinaUrl, { headers });

    if (!response.ok) {
      console.log(`  ⚠️  Failed to fetch ${url}: ${response.status}`);
      return null;
    }

    return await response.text();
  } catch (error) {
    console.log(`  ❌ Error fetching ${url}: ${error.message}`);
    return null;
  }
}

/**
 * Search using Jina.ai Search
 */
async function searchWithJina(query) {
  try {
    const jinaUrl = `https://s.jina.ai/${encodeURIComponent(query)}`;
    const headers = {
      'Accept': 'application/json',
    };

    if (CONFIG.jinaApiKey) {
      headers['Authorization'] = `Bearer ${CONFIG.jinaApiKey}`;
    }

    const response = await fetch(jinaUrl, { headers });

    if (!response.ok) {
      console.log(`  ⚠️  Search failed for "${query}": ${response.status}`);
      return [];
    }

    const text = await response.text();

    // Extract URLs from the response
    const urlRegex = /https?:\/\/[^\s\])"'<>]+/g;
    const urls = text.match(urlRegex) || [];

    // Filter to relevant domains (exclude social media, etc.)
    const relevantUrls = urls.filter(url => {
      const domain = new URL(url).hostname;
      return !EXCLUDED_DOMAINS.some(ex => domain.includes(ex)) &&
             !domain.includes('google.') &&
             !domain.includes('facebook.') &&
             !domain.includes('youtube.');
    });

    return [...new Set(relevantUrls)].slice(0, 10); // Max 10 unique URLs per query
  } catch (error) {
    console.log(`  ❌ Search error for "${query}": ${error.message}`);
    return [];
  }
}

/**
 * Extract emails from content
 */
function extractEmails(content) {
  if (!content) return [];

  const matches = content.match(EMAIL_REGEX) || [];

  // Filter out excluded domains and clean up
  return [...new Set(matches)]
    .map(email => email.toLowerCase().trim())
    .filter(email => {
      const domain = email.split('@')[1];
      return domain && !EXCLUDED_DOMAINS.some(ex => domain.includes(ex));
    });
}

/**
 * Extract business name from URL or content
 */
function extractBusinessName(url, content) {
  try {
    const hostname = new URL(url).hostname;
    // Remove www. and TLD
    let name = hostname.replace(/^www\./, '').split('.')[0];
    // Capitalize first letter
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return 'Unknown';
  }
}

/**
 * Add lead to collection
 */
function addLead(data) {
  const key = data.email.toLowerCase();

  if (!leads.has(key)) {
    leads.set(key, {
      ...data,
      addedAt: new Date().toISOString(),
    });
    console.log(`  ✅ Found: ${data.email} (${data.businessName})`);
    return true;
  }
  return false;
}

/**
 * Process a single URL
 */
async function processUrl(url, country, category) {
  console.log(`  📖 Reading: ${url}`);

  const content = await fetchWithJina(url);
  if (!content) return 0;

  const emails = extractEmails(content);
  const businessName = extractBusinessName(url, content);

  let added = 0;
  for (const email of emails) {
    if (addLead({
      email,
      businessName,
      website: url,
      country,
      category,
      source: 'jina-search',
    })) {
      added++;
    }
  }

  return added;
}

/**
 * Save leads to CSV
 */
function saveToCSV() {
  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  const outputPath = path.join(CONFIG.outputDir, CONFIG.outputFile);

  // CSV header
  const header = 'Email,Business Name,Website,Country,Category,Source,Added At\n';

  // CSV rows
  const rows = Array.from(leads.values())
    .map(lead => [
      lead.email,
      `"${lead.businessName.replace(/"/g, '""')}"`,
      lead.website,
      lead.country,
      lead.category,
      lead.source,
      lead.addedAt,
    ].join(','))
    .join('\n');

  fs.writeFileSync(outputPath, header + rows, 'utf-8');

  console.log(`\n💾 Saved ${leads.size} leads to: ${outputPath}`);
  return outputPath;
}

/**
 * Save leads to JSON (backup)
 */
function saveToJSON() {
  const outputPath = path.join(CONFIG.outputDir, 'business-leads.json');

  const data = {
    generatedAt: new Date().toISOString(),
    totalLeads: leads.size,
    leads: Array.from(leads.values()),
  };

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`💾 Backup saved to: ${outputPath}`);
}

/**
 * Delay helper
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Lumora Horticulture - Business Lead Collector\n');
  console.log('Target: Growshops, Headshops, Smartshops in DE/NL/BE\n');
  console.log('=' .repeat(60) + '\n');

  let totalUrls = 0;
  let totalEmails = 0;

  for (const searchGroup of SEARCH_QUERIES) {
    console.log(`\n🔍 ${searchGroup.country} - ${searchGroup.category}`);
    console.log('-'.repeat(40));

    for (const query of searchGroup.queries) {
      console.log(`\n📌 Searching: "${query}"`);

      // Search for URLs
      const urls = await searchWithJina(query);
      console.log(`   Found ${urls.length} URLs`);
      totalUrls += urls.length;

      // Process each URL
      for (const url of urls) {
        const emailsFound = await processUrl(url, searchGroup.country, searchGroup.category);
        totalEmails += emailsFound;

        // Respectful delay between requests
        await delay(CONFIG.delayBetweenRequests);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Summary:');
  console.log(`   URLs processed: ${totalUrls}`);
  console.log(`   Unique emails found: ${leads.size}`);

  // Save results
  if (leads.size > 0) {
    saveToCSV();
    saveToJSON();

    // Show breakdown by country
    console.log('\n📈 Breakdown by country:');
    const byCountry = {};
    leads.forEach(lead => {
      byCountry[lead.country] = (byCountry[lead.country] || 0) + 1;
    });
    Object.entries(byCountry).forEach(([country, count]) => {
      console.log(`   ${country}: ${count} leads`);
    });

    // Show breakdown by category
    console.log('\n📈 Breakdown by category:');
    const byCategory = {};
    leads.forEach(lead => {
      byCategory[lead.category] = (byCategory[lead.category] || 0) + 1;
    });
    Object.entries(byCategory).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} leads`);
    });
  } else {
    console.log('\n⚠️  No leads found. Try adjusting search queries.');
  }

  console.log('\n✅ Done!\n');
}

// Run
main().catch(console.error);
