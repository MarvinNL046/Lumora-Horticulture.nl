/**
 * Migration script - Add translations to products
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function addTranslations() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Adding translation columns to products...');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Add translation columns
    console.log('📝 Adding name_en, name_de, description_en, description_de columns...');

    await sql`
      ALTER TABLE "products"
      ADD COLUMN IF NOT EXISTS "name_en" text,
      ADD COLUMN IF NOT EXISTS "name_de" text,
      ADD COLUMN IF NOT EXISTS "description_en" text,
      ADD COLUMN IF NOT EXISTS "description_de" text
    `;

    // Update PAPER PLUG TRAY 84
    console.log('📝 Updating PAPER PLUG TRAY 84 translations...');
    await sql`
      UPDATE "products"
      SET
        "name_en" = 'PAPER PLUG TRAY 84',
        "name_de" = 'PAPIER PLUG TABLETT 84',
        "description_en" = 'Professional TRANSPLANT 84 tray with 84 cells for efficient seedling cultivation. Direct from manufacturer. With FP 12+ technology for 12+ months stability.',
        "description_de" = 'Professionelles TRANSPLANT 84 Tablett mit 84 Zellen für effiziente Sämlingszucht. Direkt vom Hersteller. Mit FP 12+ Technologie für 12+ Monate Stabilität.'
      WHERE "name" = 'PAPER PLUG TRAY 84'
    `;

    // Update PAPER PLUG TRAY 104
    console.log('📝 Updating PAPER PLUG TRAY 104 translations...');
    await sql`
      UPDATE "products"
      SET
        "name_en" = 'PAPER PLUG TRAY 104',
        "name_de" = 'PAPIER PLUG TABLETT 104',
        "description_en" = 'PAPER PLUG TRAY 104 with 104 cells for optimal root development. Suitable for professional horticulture. FP 12+ technology provides long-lasting stability.',
        "description_de" = 'PAPIER PLUG TABLETT 104 mit 104 Zellen für optimale Wurzelentwicklung. Geeignet für professionellen Gartenbau. FP 12+ Technologie bietet langanhaltende Stabilität.'
      WHERE "name" = 'PAPER PLUG TRAY 104'
    `;

    // Update Transportdoos (Vouwdoos)
    console.log('📝 Updating Transport Box translations...');
    await sql`
      UPDATE "products"
      SET
        "name_en" = 'Transport Box (Folding Box)',
        "name_de" = 'Transportbox (Faltbox)',
        "description_en" = 'Sustainable folding transport box for safe transport of horticultural products. Stackable and efficient. Dimensions: 557 x 322 x 180mm.',
        "description_de" = 'Nachhaltige faltbare Transportbox für sicheren Transport von Gartenprodukten. Stapelbar und effizient. Abmessungen: 557 x 322 x 180mm.'
      WHERE "name" = 'Transportdoos (Vouwdoos)'
    `;

    // Update Inlegvellen
    console.log('📝 Updating Insert Sheets translations...');
    await sql`
      UPDATE "products"
      SET
        "name_en" = 'Insert Sheets',
        "name_de" = 'Einlegebögen',
        "description_en" = 'Transparent insert sheets for extra protection and organization in transport boxes. Lightweight and compatible with standard transport boxes.',
        "description_de" = 'Transparente Einlegebögen für zusätzlichen Schutz und Organisation in Transportboxen. Leicht und kompatibel mit Standard-Transportboxen.'
      WHERE "name" = 'Inlegvellen'
    `;

    console.log('✅ Translation migration completed successfully!');
    console.log('');
    console.log('📋 Updated products with translations:');
    console.log('  - PAPER PLUG TRAY 84 (EN/DE)');
    console.log('  - PAPER PLUG TRAY 104 (EN/DE)');
    console.log('  - Transport Box (EN/DE)');
    console.log('  - Insert Sheets (EN/DE)');
    console.log('');
    console.log('💡 Products now support Dutch (default), English, and German!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('');
    console.error('💡 Tip: Check if columns already exist or if there are data conflicts');
    process.exit(1);
  }
}

addTranslations();
