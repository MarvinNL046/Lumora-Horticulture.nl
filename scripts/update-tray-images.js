/**
 * Update Tray product images naar nieuwe webp afbeeldingen
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function updateTrayImages() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🔍 Checking current tray product images...\n');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Check current images
    const currentProducts = await sql`
      SELECT slug, name, image_url
      FROM products
      WHERE slug IN ('paper-plug-tray-84', 'paper-plug-tray-104')
      ORDER BY slug
    `;

    console.log('Current tray products:');
    currentProducts.forEach((product) => {
      console.log(`  - ${product.slug}: ${product.image_url}`);
    });

    console.log('\n📝 Updating images to new webp files...\n');

    // Update Tray-84 image
    await sql`
      UPDATE products
      SET
        image_url = '/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant.webp',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    console.log('✅ Updated paper-plug-tray-84 image');

    // Update Tray-104 image
    await sql`
      UPDATE products
      SET
        image_url = '/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.webp',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
    `;

    console.log('✅ Updated paper-plug-tray-104 image');

    console.log('\n🎉 All tray images updated successfully!');
    console.log('\nNew image paths:');
    console.log('  - paper-plug-tray-84: /productAfbeeldingen/trays/tray84/tray84-pluggen-transparant.webp');
    console.log('  - paper-plug-tray-104: /productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.webp');
    console.log('');
  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('');
    process.exit(1);
  }
}

updateTrayImages();
