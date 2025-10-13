const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function addUserIdColumns() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('🔄 Adding user_id columns to orders and abandoned_carts tables...');

    // Add user_id column to orders table
    await sql`
      ALTER TABLE orders
      ADD COLUMN IF NOT EXISTS user_id TEXT;
    `;
    console.log('✅ Added user_id column to orders table');

    // Add user_id column to abandoned_carts table
    await sql`
      ALTER TABLE abandoned_carts
      ADD COLUMN IF NOT EXISTS user_id TEXT;
    `;
    console.log('✅ Added user_id column to abandoned_carts table');

    // Add index on user_id for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
    `;
    console.log('✅ Added index on orders.user_id');

    await sql`
      CREATE INDEX IF NOT EXISTS idx_abandoned_carts_user_id ON abandoned_carts(user_id);
    `;
    console.log('✅ Added index on abandoned_carts.user_id');

    console.log('✨ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

addUserIdColumns();
