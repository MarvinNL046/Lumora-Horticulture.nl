import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function addAllEanNumbers() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('📦 Adding EAN numbers to products...\n');

  const sql = neon(process.env.DATABASE_URL);

  const products = [
    { slug: 'paper-plug-tray-104', ean: '9508277144584', name: 'Paperbus steenwol plug 104' },
    { slug: 'inlegvellen-40x60-hdpe', ean: '9504762867495', name: 'Inlegvellen 40x60cm HDPE' },
    { slug: 'inlegvellen-60x80-ldpe', ean: '9505293234657', name: 'Inlegvellen 60x80cm LDPE' },
    { slug: 'transportdoos-vouwdoos', ean: '9504398341949', name: 'Transportdoos (Vouwdoos)' }
  ];

  try {
    for (const product of products) {
      await sql`
        UPDATE products
        SET gtin = ${product.ean},
            updated_at = NOW()
        WHERE slug = ${product.slug}
      `;
      console.log(`✅ ${product.ean} → ${product.name}`);
    }

    console.log('\n🎉 Alle EAN-nummers succesvol toegevoegd!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addAllEanNumbers();
