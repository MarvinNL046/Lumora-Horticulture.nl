/**
 * Fix Tray-84 to use webp instead of png
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function fixTray84ToWebp() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🔍 Updating Tray-84 to use webp instead of png...\n');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Update Tray-84 to webp
    const tray84NewMetadata = {
      "images": [
        "/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.webp",
        "/productAfbeeldingen/trays/tray84/pluggen84-opendoos-schuinvoorkant-transparant.webp"
      ],
      "specifications": {
        "cells": "84",
        "dimensions": "54 x 28 cm",
        "material": "Papier",
        "packaging": "8 trays per doos"
      }
    };

    await sql`
      UPDATE products
      SET
        image_url = '/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.webp',
        metadata = ${JSON.stringify(tray84NewMetadata)}::jsonb,
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    console.log('✅ Updated paper-plug-tray-84 to webp');
    console.log('   Main image: tray84-pluggen-transparant1.webp');
    console.log('   Gallery: 2 webp images');
    console.log('');
  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('');
    process.exit(1);
  }
}

fixTray84ToWebp();
