const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function updateNeemxProSizes() {
  console.log('Updating NEEMX PRO product sizes...\n');

  // First, let's see what NEEMX PRO products exist
  const existingProducts = await sql`
    SELECT id, name, slug, price FROM products WHERE slug LIKE 'neemx-pro%' ORDER BY price
  `;

  console.log('Current NEEMX PRO products:');
  existingProducts.forEach(p => console.log(`  - ${p.slug}: €${p.price}`));
  console.log('');

  // Update 15ml to 50ml product
  const result15to50 = await sql`
    UPDATE products
    SET
      name = 'NEEMX PRO 50ml',
      name_en = 'NEEMX PRO 50ml',
      name_de = 'NEEMX PRO 50ml',
      slug = 'neemx-pro-50ml',
      price = 59.95,
      description = 'NEEMX PRO 50ml - 100% natuurlijk botanisch olieconcentraat voor professionele bladverzorging. Voor intensief gebruik en commerciële telers. Opbrengst: 5-20 liter verdunning.',
      description_en = 'NEEMX PRO 50ml - 100% natural botanical oil concentrate for professional leaf care. For intensive use and commercial growers. Yield: 5-20 liters diluted solution.',
      description_de = 'NEEMX PRO 50ml - 100% natürliches botanisches Ölkonzentrat für professionelle Blattpflege. Für intensiven Einsatz und kommerzielle Züchter. Ertrag: 5-20 Liter verdünnte Lösung.'
    WHERE slug = 'neemx-pro-15ml'
    RETURNING name, slug, price
  `;

  if (result15to50.length > 0) {
    console.log('✅ Updated 15ml to 50ml:', result15to50[0]);
  } else {
    console.log('ℹ️ No 15ml product found to update');
  }

  // Update 10ml product description
  const result10ml = await sql`
    UPDATE products
    SET
      description = 'NEEMX PRO 10ml - 100% natuurlijk botanisch olieconcentraat voor professionele bladverzorging. Ideaal om te starten. Opbrengst: 1-4 liter verdunning.',
      description_en = 'NEEMX PRO 10ml - 100% natural botanical oil concentrate for professional leaf care. Ideal starter size. Yield: 1-4 liters diluted solution.',
      description_de = 'NEEMX PRO 10ml - 100% natürliches botanisches Ölkonzentrat für professionelle Blattpflege. Ideale Startergröße. Ertrag: 1-4 Liter verdünnte Lösung.'
    WHERE slug = 'neemx-pro-10ml'
    RETURNING name, slug, price
  `;

  if (result10ml.length > 0) {
    console.log('✅ Updated 10ml description:', result10ml[0]);
  }

  // Update 30ml product description
  const result30ml = await sql`
    UPDATE products
    SET
      description = 'NEEMX PRO 30ml - 100% natuurlijk botanisch olieconcentraat voor professionele bladverzorging. Beste prijs per ml. Opbrengst: 3-12 liter verdunning.',
      description_en = 'NEEMX PRO 30ml - 100% natural botanical oil concentrate for professional leaf care. Best value per ml. Yield: 3-12 liters diluted solution.',
      description_de = 'NEEMX PRO 30ml - 100% natürliches botanisches Ölkonzentrat für professionelle Blattpflege. Bestes Preis-Leistungs-Verhältnis pro ml. Ertrag: 3-12 Liter verdünnte Lösung.'
    WHERE slug = 'neemx-pro-30ml'
    RETURNING name, slug, price
  `;

  if (result30ml.length > 0) {
    console.log('✅ Updated 30ml description:', result30ml[0]);
  }

  // Show final state
  console.log('\n--- Final NEEMX PRO products ---');
  const finalProducts = await sql`
    SELECT id, name, slug, price FROM products WHERE slug LIKE 'neemx-pro%' ORDER BY price
  `;
  finalProducts.forEach(p => console.log(`  - ${p.slug}: €${p.price}`));
}

updateNeemxProSizes().catch(console.error);
