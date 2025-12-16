const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function updateImages() {
  // Update all NEEMX PRO products with the sfeer images
  const result = await sql`
    UPDATE products 
    SET image_url = '/productAfbeeldingen/neemxpro/neemxpro-sfeer-1.webp'
    WHERE slug LIKE 'neemx-pro%'
    RETURNING name, slug, image_url
  `;
  
  console.log('Updated products:');
  result.forEach(p => console.log(`- ${p.name}: ${p.image_url}`));
}

updateImages().catch(console.error);
