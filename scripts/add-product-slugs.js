/**
 * Migration script - Add slugs to products table
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function addProductSlugs() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Adding slug column to products table...');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Add slug column
    console.log('📝 Adding slug column...');
    await sql`
      ALTER TABLE "products"
      ADD COLUMN IF NOT EXISTS "slug" text
    `;

    // Update existing products with slugs
    console.log('📝 Updating products with SEO-friendly slugs...');

    await sql`
      UPDATE "products"
      SET "slug" = 'paper-plug-tray-84'
      WHERE "name" = 'PAPER PLUG TRAY 84'
    `;

    await sql`
      UPDATE "products"
      SET "slug" = 'paper-plug-tray-104'
      WHERE "name" = 'PAPER PLUG TRAY 104'
    `;

    await sql`
      UPDATE "products"
      SET "slug" = 'transportdoos-vouwdoos'
      WHERE "name" = 'Transportdoos (Vouwdoos)'
    `;

    await sql`
      UPDATE "products"
      SET "slug" = 'inlegvellen'
      WHERE "name" = 'Inlegvellen'
    `;

    // Add NOT NULL constraint
    console.log('📝 Adding NOT NULL constraint...');
    await sql`
      ALTER TABLE "products"
      ALTER COLUMN "slug" SET NOT NULL
    `;

    // Add unique constraint
    console.log('📝 Adding unique constraint...');
    await sql`
      ALTER TABLE "products"
      ADD CONSTRAINT "products_slug_unique" UNIQUE ("slug")
    `;

    console.log('✅ Migration completed successfully!');
    console.log('');
    console.log('📋 Updated slugs:');
    console.log('  - paper-plug-tray-84');
    console.log('  - paper-plug-tray-104');
    console.log('  - transportdoos-vouwdoos');
    console.log('  - inlegvellen');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('');
    console.error('💡 Tip: Check if the column already exists or if there are duplicate slugs');
    process.exit(1);
  }
}

addProductSlugs();
