const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function addSavedAddressesTable() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('🔄 Creating saved_addresses table...');

    // Create saved_addresses table
    await sql`
      CREATE TABLE IF NOT EXISTS saved_addresses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        street TEXT NOT NULL,
        city TEXT NOT NULL,
        postal_code TEXT NOT NULL,
        country TEXT NOT NULL DEFAULT 'NL',
        phone TEXT,
        is_default BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    console.log('✅ Created saved_addresses table');

    // Add index on user_id for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_saved_addresses_user_id ON saved_addresses(user_id);
    `;
    console.log('✅ Added index on saved_addresses.user_id');

    console.log('✨ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

addSavedAddressesTable();
