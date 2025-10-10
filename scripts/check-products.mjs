import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

const products = await sql`SELECT slug, name FROM products ORDER BY slug`;

console.log('📋 Available products in database:\n');
products.forEach(p => {
  console.log(`  ${p.slug} -> ${p.name}`);
});
