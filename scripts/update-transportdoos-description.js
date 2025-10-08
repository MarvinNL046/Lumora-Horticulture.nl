/**
 * Update Transportdoos beschrijvingen om verpakkingsinformatie toe te voegen
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function updateTransportdoosDescription() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Updating Transportdoos descriptions...');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Update de Nederlandse beschrijving
    await sql`
      UPDATE products
      SET
        description = 'Duurzame vouwbare transportdoos voor veilig transport van tuinbouwproducten. Stapelbaar en efficiënt. Afmetingen: 557 x 322 x 180mm. Verkocht per 25 stuks (inclusief verzendkosten).',
        description_en = 'Sustainable folding transport box for safe transport of horticultural products. Stackable and efficient. Dimensions: 557 x 322 x 180mm. Sold per 25 units (including shipping costs).',
        description_de = 'Nachhaltige faltbare Transportbox für sicheren Transport von Gartenbauprodukten. Stapelbar und effizient. Abmessungen: 557 x 322 x 180mm. Verkauft pro 25 Stück (inklusive Versandkosten).',
        name_en = 'Transport Box (Folding Box)',
        name_de = 'Transportbox (Faltbox)',
        metadata = '{"dimensions": "557 x 322 x 180mm", "material": "Cardboard", "stackable": true, "foldable": true, "eco_friendly": true, "units_per_package": 25}'::json,
        updated_at = NOW()
      WHERE slug = 'transportdoos-vouwdoos'
    `;

    console.log('✅ Transportdoos descriptions updated successfully!');
    console.log('');
    console.log('📦 Updated fields:');
    console.log('  - description (NL): Verkocht per 25 stuks toegevoegd');
    console.log('  - description_en (EN): Sold per 25 units toegevoegd');
    console.log('  - description_de (DE): Verkauft pro 25 Stück toegevoegd');
    console.log('  - name_en: Transport Box (Folding Box)');
    console.log('  - name_de: Transportbox (Faltbox)');
    console.log('  - metadata: units_per_package: 25 toegevoegd');
    console.log('');
  } catch (error) {
    console.error('❌ Update failed:', error);
    console.error('');
    process.exit(1);
  }
}

updateTransportdoosDescription();
