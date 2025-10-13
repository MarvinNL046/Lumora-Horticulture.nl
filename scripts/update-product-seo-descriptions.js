/**
 * Update product descriptions to include "paperbus steenwol pluggen" keyword for SEO
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function updateProductSEO() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🔍 Updating product SEO descriptions with "paperbus steenwol pluggen" keyword...\n');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Update Tray-84 description
    await sql`
      UPDATE products
      SET
        description = 'Professionele paperbus steenwol pluggen TRANSPLANT 84 tray met 84 cellen voor efficiënte kweek van zaailingen. Ellepot FP 12+ paper plug technologie met 12+ maanden stabiliteit. Direct van de fabrikant. Verpakking: 8 trays per doos.',
        description_en = 'Professional paper plug TRANSPLANT 84 tray with 84 cells for efficient seedling cultivation. Ellepot FP 12+ paper plug technology with 12+ months stability. Direct from manufacturer. Packaging: 8 trays per box.',
        description_de = 'Professionelles Papier-Plug TRANSPLANT 84 Tablett mit 84 Zellen für effiziente Sämlingsanzucht. Ellepot FP 12+ Papier-Plug-Technologie mit 12+ Monaten Stabilität. Direkt vom Hersteller. Verpackung: 8 Tabletts pro Karton.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    console.log('✅ Updated paper-plug-tray-84 SEO description');

    // Update Tray-104 description
    await sql`
      UPDATE products
      SET
        description = 'Paperbus steenwol pluggen PAPER PLUG TRAY 104 met 104 cellen voor optimale wortelontwikkeling. Ellepot FP 12+ paper plug technologie geeft langdurige stabiliteit. Geschikt voor professionele glastuinbouw. Verpakking: 7 trays per doos.',
        description_en = 'Paper plug PAPER PLUG TRAY 104 with 104 cells for optimal root development. Ellepot FP 12+ paper plug technology provides long-lasting stability. Suitable for professional greenhouse horticulture. Packaging: 7 trays per box.',
        description_de = 'Papier-Plug PAPER PLUG TRAY 104 mit 104 Zellen für optimale Wurzelentwicklung. Ellepot FP 12+ Papier-Plug-Technologie bietet langanhaltende Stabilität. Geeignet für professionellen Gewächshausgartenbau. Verpackung: 7 Tabletts pro Karton.',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
    `;

    console.log('✅ Updated paper-plug-tray-104 SEO description');

    console.log('\n🎉 SEO descriptions updated successfully!');
    console.log('\nKeyword integration: "paperbus steenwol pluggen" + "Ellepot FP 12+"');
    console.log('');
  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('');
    process.exit(1);
  }
}

updateProductSEO();
