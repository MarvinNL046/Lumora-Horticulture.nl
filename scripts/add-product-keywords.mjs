/**
 * Add keywords to PAPER PLUG TRAY products (paperbus pluggen)
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function addProductKeywords() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🔍 Adding keywords to PAPER PLUG TRAY products...');
  console.log('');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Keywords voor Paper Plug Trays (Paperbus Pluggen + Steenwol Pluggen + Stekpluggen)
    const paperbusKeywords = {
      nl: ['paperbus pluggen', 'steenwol pluggen', 'stekpluggen', 'paper plug', 'biologisch afbreekbaar', 'duurzaam', 'zaai pluggen', 'propagatie', 'kweekmateriaal', 'kweken', 'stekken', 'teelt', 'hydrocultuur'],
      en: ['paper plug', 'paper plugs', 'rockwool plugs', 'cutting plugs', 'propagation plugs', 'biodegradable', 'sustainable', 'growing plugs', 'cultivation media', 'seedling tray', 'plant propagation', 'hydroponics'],
      de: ['papier stecklinge', 'papier plugs', 'steinwolle stecklinge', 'stecklingsplugs', 'biologisch abbaubar', 'nachhaltig', 'anzucht plugs', 'anbaumedium', 'pflanzenvermehrung', 'sämlingsschale', 'hydrokultur']
    };

    // Update PAPER PLUG TRAY 84
    const tray84Result = await sql`
      UPDATE products
      SET
        metadata = COALESCE(metadata::jsonb, '{}'::jsonb) || jsonb_build_object('keywords', ${JSON.stringify(paperbusKeywords)}::jsonb),
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
      RETURNING name
    `;

    if (tray84Result.length > 0) {
      console.log('✅ Added keywords to:', tray84Result[0].name);
      console.log('   Keywords (NL):', paperbusKeywords.nl.join(', '));
      console.log('');
    } else {
      console.log('⚠️  PAPER PLUG TRAY 84 not found');
      console.log('');
    }

    // Update PAPER PLUG TRAY 104
    const tray104Result = await sql`
      UPDATE products
      SET
        metadata = COALESCE(metadata::jsonb, '{}'::jsonb) || jsonb_build_object('keywords', ${JSON.stringify(paperbusKeywords)}::jsonb),
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
      RETURNING name
    `;

    if (tray104Result.length > 0) {
      console.log('✅ Added keywords to:', tray104Result[0].name);
      console.log('   Keywords (NL):', paperbusKeywords.nl.join(', '));
      console.log('');
    } else {
      console.log('⚠️  PAPER PLUG TRAY 104 not found');
      console.log('');
    }

    console.log('✨ Keyword update completed!');
    console.log('🌍 Keywords added in all languages: NL, EN, DE');
    console.log('');

  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('');
    process.exit(1);
  }
}

addProductKeywords();
