/**
 * Fix Tray-84 product image naar beschikbare afbeelding
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function fixTray84Image() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🔍 Fixing tray84 product image...\n');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Update Tray-84 image to existing PNG or available webp
    await sql`
      UPDATE products
      SET
        image_url = '/productAfbeeldingen/trays/tray84/pluggen84-opendoos-schuinvoorkant-transparant.webp',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    console.log('✅ Updated paper-plug-tray-84 image to available webp file');
    console.log('\nNew image path: /productAfbeeldingen/trays/tray84/pluggen84-opendoos-schuinvoorkant-transparant.webp');
    console.log('');
  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('');
    process.exit(1);
  }
}

fixTray84Image();
