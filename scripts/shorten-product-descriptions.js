/**
 * Shorten product descriptions for better readability
 * Removes SEO-heavy text and keeps only essential information
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function shortenDescriptions() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Shortening product descriptions...');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Update Tray 84 - Short description
    await sql`
      UPDATE products
      SET
        description = 'Paper Plug Tray met 84 cellen (38mm Ø). Ellepot FP 12+ technologie voor 12+ maanden stabiliteit. 100% biologisch afbreekbaar, direct plantbaar zonder transplantatieschok. Verpakking: 8 trays per doos.',
        description_en = 'Paper Plug Tray with 84 cells (38mm Ø). Ellepot FP 12+ technology for 12+ months stability. 100% biodegradable, directly plantable without transplant shock. Packaging: 8 trays per box.',
        description_de = 'Paper Plug Tray mit 84 Zellen (38mm Ø). Ellepot FP 12+ Technologie für 12+ Monate Stabilität. 100% biologisch abbaubar, direkt pflanzbar ohne Transplantationsschock. Verpackung: 8 Trays pro Karton.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;
    console.log('✅ Tray 84 description updated');

    // Update Tray 104 - Short description
    await sql`
      UPDATE products
      SET
        description = 'Paper Plug Tray met 104 cellen (32mm Ø). Ellepot FP 12+ technologie voor 12+ maanden stabiliteit. 100% biologisch afbreekbaar, direct plantbaar zonder transplantatieschok. Verpakking: 7 trays per doos.',
        description_en = 'Paper Plug Tray with 104 cells (32mm Ø). Ellepot FP 12+ technology for 12+ months stability. 100% biodegradable, directly plantable without transplant shock. Packaging: 7 trays per box.',
        description_de = 'Paper Plug Tray mit 104 Zellen (32mm Ø). Ellepot FP 12+ Technologie für 12+ Monate Stabilität. 100% biologisch abbaubar, direkt pflanzbar ohne Transplantationsschock. Verpackung: 7 Trays pro Karton.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
    `;
    console.log('✅ Tray 104 description updated');

    // Transportdoos is already short, but let's make sure it's consistent
    await sql`
      UPDATE products
      SET
        description = 'Stevige vouwbare transportdoos voor veilig transport van planten en tuinbouwproducten. Afmetingen: 557 x 322 x 180mm. Stapelbaar en herbruikbaar. Verpakking: 25 stuks.',
        description_en = 'Sturdy foldable transport box for safe transport of plants and horticultural products. Dimensions: 557 x 322 x 180mm. Stackable and reusable. Packaging: 25 pieces.',
        description_de = 'Stabile faltbare Transportbox für den sicheren Transport von Pflanzen und Gartenprodukten. Maße: 557 x 322 x 180mm. Stapelbar und wiederverwendbar. Verpackung: 25 Stück.',
        updated_at = NOW()
      WHERE slug = 'transportdoos-vouwdoos'
    `;
    console.log('✅ Transportdoos description updated');

    // Inlegvellen 40x60
    await sql`
      UPDATE products
      SET
        description = 'Transparante HDPE inlegvellen voor bescherming in transportdozen. Afmetingen: 40 x 60 cm. Verpakking: 500 stuks.',
        description_en = 'Transparent HDPE liner sheets for protection in transport boxes. Dimensions: 40 x 60 cm. Packaging: 500 pieces.',
        description_de = 'Transparente HDPE Einlegefolien zum Schutz in Transportboxen. Maße: 40 x 60 cm. Verpackung: 500 Stück.',
        updated_at = NOW()
      WHERE slug = 'inlegvellen-40x60-hdpe'
    `;
    console.log('✅ Inlegvellen 40x60 description updated');

    // Inlegvellen 60x80
    await sql`
      UPDATE products
      SET
        description = 'Transparante LDPE inlegvellen (20 mu) voor bescherming in transportdozen. Afmetingen: 60 x 80 cm. Verpakking: 500 stuks.',
        description_en = 'Transparent LDPE liner sheets (20 mu) for protection in transport boxes. Dimensions: 60 x 80 cm. Packaging: 500 pieces.',
        description_de = 'Transparente LDPE Einlegefolien (20 mu) zum Schutz in Transportboxen. Maße: 60 x 80 cm. Verpackung: 500 Stück.',
        updated_at = NOW()
      WHERE slug = 'inlegvellen-60x80-ldpe'
    `;
    console.log('✅ Inlegvellen 60x80 description updated');

    console.log('');
    console.log('🎉 All product descriptions shortened successfully!');
    console.log('');
    console.log('📝 Summary:');
    console.log('  - Tray 84: Shortened from ~1500 chars to ~250 chars');
    console.log('  - Tray 104: Shortened from ~1600 chars to ~250 chars');
    console.log('  - Transportdoos: Cleaned up');
    console.log('  - Inlegvellen: Cleaned up');
    console.log('');

  } catch (error) {
    console.error('❌ Update failed:', error);
    process.exit(1);
  }
}

shortenDescriptions();
