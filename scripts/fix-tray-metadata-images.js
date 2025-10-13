/**
 * Fix Tray product metadata.images arrays - convert .png to .webp extensions
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function fixTrayMetadataImages() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🔍 Fixing tray product metadata.images arrays...\n');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Get current tray products
    const trayProducts = await sql`
      SELECT id, slug, name, metadata
      FROM products
      WHERE slug IN ('paper-plug-tray-84', 'paper-plug-tray-104')
      ORDER BY slug
    `;

    console.log('Current tray products metadata:');
    trayProducts.forEach((product) => {
      console.log(`\n${product.slug}:`);
      console.log(JSON.stringify(product.metadata, null, 2));
    });

    console.log('\n📝 Updating image_url and metadata.images...\n');

    // Update Tray-84 - main image and gallery
    const tray84NewMetadata = {
      "images": [
        "/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.png",
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
        image_url = '/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.png',
        metadata = ${JSON.stringify(tray84NewMetadata)}::jsonb,
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    console.log('✅ Updated paper-plug-tray-84');
    console.log('   Main image: tray84-pluggen-transparant1.png');
    console.log('   Gallery: 2 images');

    // Update Tray-104 - main image and gallery
    const tray104NewMetadata = {
      "images": [
        "/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.webp",
        "/productAfbeeldingen/trays/tray104/pluggen104-dichtdoos-schuinvoorkant-transparant.webp",
        "/productAfbeeldingen/trays/tray104/pluggen104-opendoos-schuinvoorkant-transparant.webp"
      ],
      "specifications": {
        "cells": "104",
        "dimensions": "54 x 28 cm",
        "material": "Papier",
        "packaging": "8 trays per doos"
      }
    };

    await sql`
      UPDATE products
      SET
        image_url = '/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.webp',
        metadata = ${JSON.stringify(tray104NewMetadata)}::jsonb,
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
    `;

    console.log('✅ Updated paper-plug-tray-104');
    console.log('   Main image: tray104-pluggen-transparant.webp');
    console.log('   Gallery: 3 images');

    console.log('\n🎉 All tray images updated successfully!');
    console.log('\nNew structure:');
    console.log('  - Tray-84: main=png, gallery=2 images (1 png + 1 webp)');
    console.log('  - Tray-104: main=webp, gallery=3 images (3 webp)');
    console.log('');
  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('');
    process.exit(1);
  }
}

fixTrayMetadataImages();
