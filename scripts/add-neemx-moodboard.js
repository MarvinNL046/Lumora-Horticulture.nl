const { neon } = require('@neondatabase/serverless');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const products = await sql`SELECT id, slug, metadata FROM products WHERE slug LIKE 'neemx-pro%'`;

  const moodboardImage = '/productAfbeeldingen/neemxpro/neemxpro-product-moodboard.webp';

  for (const product of products) {
    const metadata = product.metadata || {};
    const images = metadata.images || [];

    // Add moodboard image if not already present
    if (!images.includes(moodboardImage)) {
      images.push(moodboardImage);
      metadata.images = images;

      await sql`UPDATE products SET metadata = ${JSON.stringify(metadata)} WHERE id = ${product.id}`;
      console.log('Updated:', product.slug);
    } else {
      console.log('Already has moodboard:', product.slug);
    }
  }

  console.log('Done!');
}
main().catch(console.error);
