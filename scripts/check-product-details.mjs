import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

const products = await sql`
  SELECT slug, name, description 
  FROM products 
  WHERE slug LIKE '%plug%' OR slug LIKE '%tray%'
  ORDER BY slug
`;

console.log('📋 Plug/Tray products:\n');
products.forEach(p => {
  console.log(`Slug: ${p.slug}`);
  console.log(`Name: ${p.name}`);
  console.log(`Description: ${p.description.substring(0, 100)}...`);
  console.log('');
});
