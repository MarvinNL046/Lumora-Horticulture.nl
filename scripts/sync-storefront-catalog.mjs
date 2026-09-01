#!/usr/bin/env node
/**
 * Synchronise the five public storefront SKUs from convex/seed.ts.
 *
 * Usage:
 *   npm run catalog:sync
 *   npm run catalog:sync -- --prod
 *
 * Production requires NEXT_PUBLIC_CONVEX_URL_PROD so a developer cannot
 * accidentally target production through a reused development URL.
 */
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api.js';
import fs from 'node:fs';
import path from 'node:path';

const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/i);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  }
}

const production = process.argv.includes('--prod');
const url = production
  ? process.env.NEXT_PUBLIC_CONVEX_URL_PROD
  : process.env.NEXT_PUBLIC_CONVEX_URL;
const serverSecret = process.env.CONVEX_SERVER_SECRET;

if (!url) {
  console.error(
    production
      ? 'NEXT_PUBLIC_CONVEX_URL_PROD is required for a production catalog sync.'
      : 'NEXT_PUBLIC_CONVEX_URL is required for a development catalog sync.',
  );
  process.exit(1);
}

if (!serverSecret || serverSecret.length < 32) {
  console.error('CONVEX_SERVER_SECRET must be set to at least 32 characters.');
  process.exit(1);
}

const client = new ConvexHttpClient(url);
console.log(`Synchronising storefront catalog on ${production ? 'PRODUCTION' : 'development'}…`);

try {
  const result = await client.mutation(api.seed.seedProducts, {
    server_secret: serverSecret,
  });
  console.log(`Catalog synchronised: ${result.added} added, ${result.updated} updated, ${result.total} total.`);
} catch (error) {
  console.error('Catalog sync failed:', error instanceof Error ? error.message : error);
  process.exit(1);
}
