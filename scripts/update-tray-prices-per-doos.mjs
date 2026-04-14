#!/usr/bin/env node
/**
 * Update Paper Plug Tray products to per-doos pricing.
 *   tray-84  → €84,00 per doos (8 trays)
 *   tray-104 → €80,00 per doos (7 trays)
 *
 * Run:  node scripts/update-tray-prices-per-doos.mjs
 *       (uses CONVEX dev deployment from .env.local by default)
 *       add --prod to hit production
 */
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api.js';
import fs from 'node:fs';
import path from 'node:path';

// Minimal .env.local loader (avoid extra deps)
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/i);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
}

const PROD = process.argv.includes('--prod');
const url = PROD
  ? process.env.NEXT_PUBLIC_CONVEX_URL_PROD || process.env.NEXT_PUBLIC_CONVEX_URL
  : process.env.NEXT_PUBLIC_CONVEX_URL;

if (!url) {
  console.error('❌ NEXT_PUBLIC_CONVEX_URL not set');
  process.exit(1);
}

const client = new ConvexHttpClient(url);

const updates = [
  {
    slug: 'paper-plug-tray-84',
    price: 84.0,
    description:
      'Professionele Paper Plug Tray 84 met Ellepot FP 12+ technologie voor efficiënte zaailingenkweek in de glastuinbouw. 84 cellen per tray, Ø38mm x 42mm diep, 100% biologisch afbreekbaar papier. Direct plantbaar – geen transplantatieschok. Verkocht per doos van 8 trays (672 cellen totaal).',
    description_en:
      'Professional Paper Plug Tray 84 with Ellepot FP 12+ technology for efficient seedling cultivation in greenhouse horticulture. 84 cells per tray, Ø38mm x 42mm deep, 100% biodegradable paper. Directly plantable – no transplant shock. Sold per box of 8 trays (672 cells total).',
    description_de:
      'Professionelles Paper Plug Tray 84 mit Ellepot FP 12+ Technologie für effiziente Sämlingszucht im Gewächshausgartenbau. 84 Zellen pro Tray, Ø38mm x 42mm tief, 100% biologisch abbaubares Papier. Direkt pflanzbar – kein Transplantationsschock. Verkauft pro Karton mit 8 Trays (672 Zellen gesamt).',
  },
  {
    slug: 'paper-plug-tray-104',
    price: 80.0,
    description:
      'Professionele Paper Plug Tray 104 met Ellepot FP 12+ technologie voor intensieve zaailingenkweek. 104 cellen per tray, Ø32mm x 40mm diep, 100% biologisch afbreekbaar papier. Hogere plantdichtheid voor maximale ruimtebenutting. Verkocht per doos van 7 trays (728 cellen totaal).',
    description_en:
      'Professional Paper Plug Tray 104 with Ellepot FP 12+ technology for intensive seedling cultivation. 104 cells per tray, Ø32mm x 40mm deep, 100% biodegradable paper. Higher plant density for maximum space utilisation. Sold per box of 7 trays (728 cells total).',
    description_de:
      'Professionelles Paper Plug Tray 104 mit Ellepot FP 12+ Technologie für intensive Sämlingszucht. 104 Zellen pro Tray, Ø32mm x 40mm tief, 100% biologisch abbaubares Papier. Höhere Pflanzdichte für maximale Raumnutzung. Verkauft pro Karton mit 7 Trays (728 Zellen gesamt).',
  },
];

console.log(`🚀 Updating tray prices on ${PROD ? 'PRODUCTION' : 'DEV'} (${url})`);

for (const u of updates) {
  try {
    const id = await client.mutation(api.products.updateBySlug, u);
    console.log(`✅ ${u.slug} → €${u.price.toFixed(2)} per doos (id=${id})`);
  } catch (err) {
    console.error(`❌ ${u.slug}:`, err.message || err);
    process.exitCode = 1;
  }
}
console.log('Done.');
