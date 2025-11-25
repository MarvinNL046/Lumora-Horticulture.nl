import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from '../src/db/schema.js';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function viewProducts() {
  try {
    const allProducts = await db.select().from(schema.products);

    console.log('=== CURRENT PRODUCT DESCRIPTIONS ===\n');

    for (const product of allProducts) {
      console.log(`\n📦 ${product.name} (${product.slug})`);
      console.log('─'.repeat(80));

      console.log('\n🇳🇱 DUTCH:');
      console.log(product.description);

      if (product.description_en) {
        console.log('\n🇬🇧 ENGLISH:');
        console.log(product.description_en);
      }

      if (product.description_de) {
        console.log('\n🇩🇪 GERMAN:');
        console.log(product.description_de);
      }

      console.log('\n' + '='.repeat(80));
    }

  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    await pool.end();
  }
}

viewProducts();
