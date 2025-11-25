import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function viewDescriptions() {
  const sql = neon(process.env.DATABASE_URL);

  try {
    const products = await sql`
      SELECT slug, name, description, description_en, description_de
      FROM products
      ORDER BY display_order
    `;

    console.log('\n=== CURRENT PRODUCT DESCRIPTIONS ===\n');

    for (const product of products) {
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
    console.error('Error:', error);
  }
}

viewDescriptions();
