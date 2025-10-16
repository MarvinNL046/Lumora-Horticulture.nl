import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function addEanToPaperbus84() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('📦 Adding EAN to Paperbus steenwol plug 84...');

  const sql = neon(process.env.DATABASE_URL);

  try {
    await sql`
      UPDATE products
      SET gtin = '9508648216735',
          updated_at = NOW()
      WHERE slug = 'paper-plug-tray-84'
    `;

    console.log('✅ GTIN/EAN 9508648216735 toegevoegd aan PAPER PLUG TRAY 84');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addEanToPaperbus84();
