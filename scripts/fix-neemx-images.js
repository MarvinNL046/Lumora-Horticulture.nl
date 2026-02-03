const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function fix() {
  // Get all NEEMX PRO products
  const products = await sql`SELECT id, slug, metadata FROM products WHERE slug LIKE 'neemx-pro%'`;

  for (const product of products) {
    const metadata = product.metadata || {};
    const images = metadata.images || [];

    // Filter out the non-existent bottle.png image
    const validImages = images.filter(img => img.indexOf('neemxpro-bottle.png') === -1);

    if (images.length !== validImages.length) {
      metadata.images = validImages;
      await sql`UPDATE products SET metadata = ${JSON.stringify(metadata)} WHERE id = ${product.id}`;
      console.log('Fixed:', product.slug, '- removed non-existent image');
    } else {
      console.log('OK:', product.slug);
    }
  }

  // Verify
  const check = await sql`SELECT slug, metadata FROM products WHERE slug = 'neemx-pro-10ml'`;
  console.log('\nVerified images for neemx-pro-10ml:', check[0].metadata?.images);
}

fix().catch(console.error);
