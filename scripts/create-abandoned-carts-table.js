/**
 * Create abandoned_carts table in Neon PostgreSQL
 * Run: node scripts/create-abandoned-carts-table.js
 */

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { sql } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL not found in environment variables');
  process.exit(1);
}

const client = neon(connectionString);
const db = drizzle(client);

async function createAbandonedCartsTable() {
  console.log('🚀 Creating abandoned_carts table...\n');

  try {
    // Create abandoned_carts table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS abandoned_carts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_email VARCHAR(255) NOT NULL,
        customer_name VARCHAR(255),
        cart_data JSONB NOT NULL,
        total_amount NUMERIC(10, 2) NOT NULL,
        locale VARCHAR(10) DEFAULT 'nl',
        created_at TIMESTAMP DEFAULT NOW(),
        reminded_at TIMESTAMP,
        recovered BOOLEAN DEFAULT FALSE,
        recovered_at TIMESTAMP,
        recovery_order_id UUID REFERENCES orders(id)
      );
    `);

    console.log('✅ abandoned_carts table created successfully');

    // Create index on customer_email for faster lookups
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_abandoned_carts_email
      ON abandoned_carts(customer_email);
    `);

    console.log('✅ Index on customer_email created');

    // Create index on created_at for scheduled job queries
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_abandoned_carts_created_at
      ON abandoned_carts(created_at);
    `);

    console.log('✅ Index on created_at created');

    // Create index on reminded_at for reminder tracking
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_abandoned_carts_reminded_at
      ON abandoned_carts(reminded_at);
    `);

    console.log('✅ Index on reminded_at created');

    console.log('\n🎉 All done! Abandoned carts table is ready.');
  } catch (error) {
    console.error('❌ Error creating table:', error);
    process.exit(1);
  }
}

createAbandonedCartsTable();
