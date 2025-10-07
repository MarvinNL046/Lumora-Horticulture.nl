/**
 * Migration script - Add display_order column and set product order
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function updateProductOrder() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Updating product display order...');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Add display_order column
    console.log('📝 Adding display_order column...');
    await sql`
      ALTER TABLE "products"
      ADD COLUMN IF NOT EXISTS "display_order" numeric(10, 0) DEFAULT 999
    `;

    // Set order: Paper Plug Trays first (1, 2), then Transport Box (3), Insert Sheets (4)
    console.log('📝 Setting PAPER PLUG TRAY 84 as #1...');
    await sql`
      UPDATE "products"
      SET "display_order" = 1
      WHERE "name" = 'PAPER PLUG TRAY 84'
    `;

    console.log('📝 Setting PAPER PLUG TRAY 104 as #2...');
    await sql`
      UPDATE "products"
      SET "display_order" = 2
      WHERE "name" = 'PAPER PLUG TRAY 104'
    `;

    console.log('📝 Setting Transportdoos as #3...');
    await sql`
      UPDATE "products"
      SET "display_order" = 3
      WHERE "name" = 'Transportdoos (Vouwdoos)'
    `;

    console.log('📝 Setting Inlegvellen as #4...');
    await sql`
      UPDATE "products"
      SET "display_order" = 4
      WHERE "name" = 'Inlegvellen'
    `;

    console.log('✅ Product order updated successfully!');
    console.log('');
    console.log('📋 New product order:');
    console.log('  1. PAPER PLUG TRAY 84');
    console.log('  2. PAPER PLUG TRAY 104');
    console.log('  3. Transportdoos (Vouwdoos)');
    console.log('  4. Inlegvellen');
    console.log('');
    console.log('💡 Shop page will now display products in this order!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('');
    console.error('💡 Tip: Check if the column already exists or if there are data conflicts');
    process.exit(1);
  }
}

updateProductOrder();
