/**
 * Add NeemX Pro products to database
 * Run with: node scripts/add-neemxpro-products.js
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function addNeemxProProducts() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🌿 Adding NeemX Pro products to database...');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Product descriptions in 3 languages
    const descriptions = {
      nl: {
        '10ml': `NEEMX PRO 10ml - Premium botanisch olieconcentraat voor professionele bladverzorging. Dit krachtige, 100% natuurlijke product ondersteunt gezonde planten en helpt bij het voorkomen en verminderen van insectendruk zoals spint en andere zuigende insecten. Vormt een beschermende oliefilm op het blad. Zeer geconcentreerd - een beetje gaat een lange weg. Perfect voor starters en kleinschalige toepassingen.`,
        '15ml': `NEEMX PRO 15ml - Premium botanisch olieconcentraat voor professionele bladverzorging. Dit krachtige, 100% natuurlijke product ondersteunt gezonde planten en helpt bij het voorkomen en verminderen van insectendruk zoals spint en andere zuigende insecten. Vormt een beschermende oliefilm op het blad. Zeer geconcentreerd formule - beste prijs-kwaliteitverhouding voor particulieren en kleine kwekerijen.`,
        '30ml': `NEEMX PRO 30ml - Premium botanisch olieconcentraat voor professionele bladverzorging. Dit krachtige, 100% natuurlijke product ondersteunt gezonde planten en helpt bij het voorkomen en verminderen van insectendruk zoals spint en andere zuigende insecten. Vormt een beschermende oliefilm op het blad. Professionele verpakking voor serieuze gebruikers en intensieve gewasverzorging.`
      },
      en: {
        '10ml': `NEEMX PRO 10ml - Premium botanical oil concentrate for professional leaf care. This powerful, 100% natural product supports healthy plants and helps prevent and reduce insect pressure such as spider mites and other sucking insects. Forms a protective oil film on the leaf. Highly concentrated - a little goes a long way. Perfect for beginners and small-scale applications.`,
        '15ml': `NEEMX PRO 15ml - Premium botanical oil concentrate for professional leaf care. This powerful, 100% natural product supports healthy plants and helps prevent and reduce insect pressure such as spider mites and other sucking insects. Forms a protective oil film on the leaf. Highly concentrated formula - best value for home users and small nurseries.`,
        '30ml': `NEEMX PRO 30ml - Premium botanical oil concentrate for professional leaf care. This powerful, 100% natural product supports healthy plants and helps prevent and reduce insect pressure such as spider mites and other sucking insects. Forms a protective oil film on the leaf. Professional packaging for serious users and intensive crop care.`
      },
      de: {
        '10ml': `NEEMX PRO 10ml - Premium botanisches Ölkonzentrat für professionelle Blattpflege. Dieses kraftvolle, 100% natürliche Produkt unterstützt gesunde Pflanzen und hilft, Insektendruck wie Spinnmilben und andere saugende Insekten zu verhindern und zu reduzieren. Bildet einen schützenden Ölfilm auf dem Blatt. Hochkonzentriert - ein wenig reicht weit. Perfekt für Einsteiger und kleine Anwendungen.`,
        '15ml': `NEEMX PRO 15ml - Premium botanisches Ölkonzentrat für professionelle Blattpflege. Dieses kraftvolle, 100% natürliche Produkt unterstützt gesunde Pflanzen und hilft, Insektendruck wie Spinnmilben und andere saugende Insekten zu verhindern und zu reduzieren. Bildet einen schützenden Ölfilm auf dem Blatt. Hochkonzentrierte Formel - bestes Preis-Leistungs-Verhältnis für Heimanwender und kleine Gärtnereien.`,
        '30ml': `NEEMX PRO 30ml - Premium botanisches Ölkonzentrat für professionelle Blattpflege. Dieses kraftvolle, 100% natürliche Produkt unterstützt gesunde Pflanzen und hilft, Insektendruck wie Spinnmilben und andere saugende Insekten zu verhindern und zu reduzieren. Bildet einen schützenden Ölfilm auf dem Blatt. Professionelle Verpackung für ernsthafte Anwender und intensive Pflanzenpflege.`
      }
    };

    // Insert NeemX Pro 10ml
    await sql`
      INSERT INTO "products" (
        "name", "name_en", "name_de",
        "slug",
        "description", "description_en", "description_de",
        "price",
        "image_url",
        "brand",
        "availability",
        "google_product_category",
        "product_type",
        "metadata",
        "display_order"
      )
      VALUES (
        'NEEMX PRO 10ml', 'NEEMX PRO 10ml', 'NEEMX PRO 10ml',
        'neemx-pro-10ml',
        ${descriptions.nl['10ml']},
        ${descriptions.en['10ml']},
        ${descriptions.de['10ml']},
        24.95,
        '/productAfbeeldingen/neemxpro/neemxpro-logo.webp',
        'NeemX',
        'in stock',
        '2988',
        'Business & Industrial > Agriculture > Plant Care',
        ${JSON.stringify({
          volume: '10ml',
          type: 'Botanical oil concentrate',
          natural: true,
          concentrated: true,
          usage: ['preventive', 'curative'],
          targets: ['spider mites', 'sucking insects', 'mildew'],
          suitable_for: ['home use', 'small gardens', 'indoor plants'],
          application: 'Dilute with water, spray on leaves',
          eco_friendly: true
        })}::json,
        10
      )
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        name_en = EXCLUDED.name_en,
        name_de = EXCLUDED.name_de,
        description = EXCLUDED.description,
        description_en = EXCLUDED.description_en,
        description_de = EXCLUDED.description_de,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        metadata = EXCLUDED.metadata,
        updated_at = now()
    `;
    console.log('✅ Added NEEMX PRO 10ml');

    // Insert NeemX Pro 15ml
    await sql`
      INSERT INTO "products" (
        "name", "name_en", "name_de",
        "slug",
        "description", "description_en", "description_de",
        "price",
        "image_url",
        "brand",
        "availability",
        "google_product_category",
        "product_type",
        "metadata",
        "display_order"
      )
      VALUES (
        'NEEMX PRO 15ml', 'NEEMX PRO 15ml', 'NEEMX PRO 15ml',
        'neemx-pro-15ml',
        ${descriptions.nl['15ml']},
        ${descriptions.en['15ml']},
        ${descriptions.de['15ml']},
        29.95,
        '/productAfbeeldingen/neemxpro/neemxpro-logo.webp',
        'NeemX',
        'in stock',
        '2988',
        'Business & Industrial > Agriculture > Plant Care',
        ${JSON.stringify({
          volume: '15ml',
          type: 'Botanical oil concentrate',
          natural: true,
          concentrated: true,
          usage: ['preventive', 'curative'],
          targets: ['spider mites', 'sucking insects', 'mildew'],
          suitable_for: ['home use', 'small nurseries', 'hobby growers'],
          application: 'Dilute with water, spray on leaves',
          eco_friendly: true,
          best_value: true
        })}::json,
        11
      )
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        name_en = EXCLUDED.name_en,
        name_de = EXCLUDED.name_de,
        description = EXCLUDED.description,
        description_en = EXCLUDED.description_en,
        description_de = EXCLUDED.description_de,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        metadata = EXCLUDED.metadata,
        updated_at = now()
    `;
    console.log('✅ Added NEEMX PRO 15ml');

    // Insert NeemX Pro 30ml
    await sql`
      INSERT INTO "products" (
        "name", "name_en", "name_de",
        "slug",
        "description", "description_en", "description_de",
        "price",
        "image_url",
        "brand",
        "availability",
        "google_product_category",
        "product_type",
        "metadata",
        "display_order"
      )
      VALUES (
        'NEEMX PRO 30ml', 'NEEMX PRO 30ml', 'NEEMX PRO 30ml',
        'neemx-pro-30ml',
        ${descriptions.nl['30ml']},
        ${descriptions.en['30ml']},
        ${descriptions.de['30ml']},
        44.95,
        '/productAfbeeldingen/neemxpro/neemxpro-logo.webp',
        'NeemX',
        'in stock',
        '2988',
        'Business & Industrial > Agriculture > Plant Care',
        ${JSON.stringify({
          volume: '30ml',
          type: 'Botanical oil concentrate',
          natural: true,
          concentrated: true,
          usage: ['preventive', 'curative'],
          targets: ['spider mites', 'sucking insects', 'mildew'],
          suitable_for: ['professional use', 'greenhouses', 'nurseries', 'intensive care'],
          application: 'Dilute with water, spray on leaves',
          eco_friendly: true,
          professional: true
        })}::json,
        12
      )
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        name_en = EXCLUDED.name_en,
        name_de = EXCLUDED.name_de,
        description = EXCLUDED.description,
        description_en = EXCLUDED.description_en,
        description_de = EXCLUDED.description_de,
        price = EXCLUDED.price,
        image_url = EXCLUDED.image_url,
        metadata = EXCLUDED.metadata,
        updated_at = now()
    `;
    console.log('✅ Added NEEMX PRO 30ml');

    console.log('');
    console.log('🎉 All NeemX Pro products added successfully!');
    console.log('');
    console.log('📦 Products added:');
    console.log('  - NEEMX PRO 10ml (€24,95) - Premium instap / bestseller');
    console.log('  - NEEMX PRO 15ml (€29,95) - Beste waarde voor particulier');
    console.log('  - NEEMX PRO 30ml (€44,95) - Voor serieuze gebruikers');
    console.log('');
    console.log('⚠️  BELANGRIJK: Plaats de productafbeelding in:');
    console.log('    public/productAfbeeldingen/neemxpro/neemxpro-logo.webp');
    console.log('');
    console.log('🔄 Start de dev server opnieuw om de producten te zien: npm run dev');

  } catch (error) {
    console.error('❌ Failed to add NeemX Pro products:', error);
    process.exit(1);
  }
}

addNeemxProProducts();
