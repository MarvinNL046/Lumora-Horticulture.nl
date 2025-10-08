/**
 * Update Tray product beschrijvingen om verpakkingsinformatie toe te voegen
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function updateTrayDescriptions() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Updating Tray product descriptions...');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Update Tray-84
    await sql`
      UPDATE products
      SET
        description = 'Professionele TRANSPLANT 84 tray met 84 cellen voor efficiënte kweek van zaailingen. Direct van de fabrikant. Met FP 12+ technologie voor 12+ maanden stabiliteit. Verpakking: 8 trays per doos.',
        description_en = 'Professional TRANSPLANT 84 tray with 84 cells for efficient seedling cultivation. Direct from manufacturer. With FP 12+ technology for 12+ months stability. Packaging: 8 trays per box.',
        description_de = 'Professionelles TRANSPLANT 84 Tablett mit 84 Zellen für effiziente Sämlingsanzucht. Direkt vom Hersteller. Mit FP 12+ Technologie für 12+ Monate Stabilität. Verpackung: 8 Tabletts pro Karton.',
        name_en = 'PAPER PLUG TRAY 84',
        name_de = 'PAPER PLUG TRAY 84',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    // Update Tray-104
    await sql`
      UPDATE products
      SET
        description = 'PAPER PLUG TRAY 104 met 104 cellen voor optimale wortelontwikkeling. Geschikt voor professionele glastuinbouw. FP 12+ technologie geeft langdurige stabiliteit. Verpakking: 7 trays per doos.',
        description_en = 'PAPER PLUG TRAY 104 with 104 cells for optimal root development. Suitable for professional greenhouse horticulture. FP 12+ technology provides long-lasting stability. Packaging: 7 trays per box.',
        description_de = 'PAPER PLUG TRAY 104 mit 104 Zellen für optimale Wurzelentwicklung. Geeignet für professionellen Gewächshausgartenbau. FP 12+ Technologie bietet langanhaltende Stabilität. Verpackung: 7 Tabletts pro Karton.',
        name_en = 'PAPER PLUG TRAY 104',
        name_de = 'PAPER PLUG TRAY 104',
        updated_at = NOW()
      WHERE slug = 'paper-plug-tray-104'
    `;

    console.log('✅ Tray descriptions updated successfully!');
    console.log('');
    console.log('📦 Updated products:');
    console.log('  - PAPER PLUG TRAY 84: Verpakking: 8 trays per doos toegevoegd');
    console.log('  - PAPER PLUG TRAY 104: Verpakking: 7 trays per doos toegevoegd');
    console.log('');
    console.log('🌍 Updated in all languages: NL, EN, DE');
    console.log('');
  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('');
    process.exit(1);
  }
}

updateTrayDescriptions();
