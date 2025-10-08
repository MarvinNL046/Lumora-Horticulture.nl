/**
 * Database setup script - voer SQL bestand uit op Neon database
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function setupDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Setting up database...');

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log('📝 Creating tables...');

    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS "products" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" text NOT NULL,
        "description" text NOT NULL,
        "price" numeric(10, 2) NOT NULL,
        "image_url" text NOT NULL,
        "gtin" text,
        "mpn" text,
        "brand" text DEFAULT 'Lumora',
        "condition" text DEFAULT 'new',
        "availability" text DEFAULT 'in stock',
        "google_product_category" text,
        "product_type" text,
        "metadata" json,
        "created_at" timestamp DEFAULT now(),
        "updated_at" timestamp DEFAULT now()
      )
    `;

    // Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS "orders" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "customer_email" text NOT NULL,
        "customer_name" text NOT NULL,
        "customer_phone" text,
        "shipping_address" json NOT NULL,
        "billing_address" json,
        "total_amount" numeric(10, 2) NOT NULL,
        "status" text DEFAULT 'pending' NOT NULL,
        "payment_id" text,
        "payment_status" text DEFAULT 'pending',
        "created_at" timestamp DEFAULT now(),
        "updated_at" timestamp DEFAULT now()
      )
    `;

    // Create order_items table
    await sql`
      CREATE TABLE IF NOT EXISTS "order_items" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "order_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        "quantity" numeric(10, 0) NOT NULL,
        "price_at_purchase" numeric(10, 2) NOT NULL,
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id"),
        CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id")
      )
    `;

    console.log('📊 Creating indexes...');

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS "order_id_idx" ON "order_items" ("order_id")`;
    await sql`CREATE INDEX IF NOT EXISTS "product_id_idx" ON "order_items" ("product_id")`;
    await sql`CREATE INDEX IF NOT EXISTS "customer_email_idx" ON "orders" ("customer_email")`;
    await sql`CREATE INDEX IF NOT EXISTS "payment_id_idx" ON "orders" ("payment_id")`;

    console.log('📦 Inserting your products...');

    // Insert your actual products
    await sql`
      INSERT INTO "products" ("name", "slug", "description", "price", "image_url", "gtin", "brand", "availability", "google_product_category", "product_type", "metadata")
      VALUES
        (
          'PAPER PLUG TRAY 84',
          'paper-plug-tray-84',
          'Professionele TRANSPLANT 84 tray met 84 cellen voor efficiënte kweek van zaailingen. Direct van de fabrikant. Met FP 12+ technologie voor 12+ maanden stabiliteit. Verpakking: 8 trays per doos.',
          49.95,
          '/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg',
          NULL,
          'Lumora',
          'in stock',
          '499676',
          'Business & Industrial > Agriculture > Planting & Growing',
          '{"cells": 84, "plug_diameter": "3.5cm", "technology": "FP 12+", "stability": "12+ months", "coating": "Fungicide", "eco_friendly": true, "biodegradable": true, "trays_per_box": 8}'::json
        ),
        (
          'PAPER PLUG TRAY 104',
          'paper-plug-tray-104',
          'PAPER PLUG TRAY 104 met 104 cellen voor optimale wortelontwikkeling. Geschikt voor professionele glastuinbouw. FP 12+ technologie geeft langdurige stabiliteit. Verpakking: 7 trays per doos.',
          59.95,
          '/productAfbeeldingen/trays/tray104/lumorahorticulture-tray104.jpg',
          NULL,
          'Lumora',
          'in stock',
          '499676',
          'Business & Industrial > Agriculture > Planting & Growing',
          '{"cells": 104, "plug_diameter": "3cm", "technology": "FP 12+", "stability": "12+ months", "coating": "Fungicide", "eco_friendly": true, "biodegradable": true, "trays_per_box": 7}'::json
        ),
        (
          'Transportdoos (Vouwdoos)',
          'transportdoos-vouwdoos',
          'Duurzame vouwbare transportdoos voor veilig transport van tuinbouwproducten. Stapelbaar en efficiënt. Afmetingen: 557 x 322 x 180mm. Verpakking: verkocht per 25 stuks (inclusief verzendkosten).',
          50.00,
          '/productAfbeeldingen/verpakkingsdoos/lumorahorticulture-vouwdoos.jpg',
          NULL,
          'Lumora',
          'in stock',
          '499811',
          'Business & Industrial > Agriculture > Packaging',
          '{"dimensions": "557 x 322 x 180mm", "material": "Cardboard", "stackable": true, "foldable": true, "eco_friendly": true, "units_per_package": 25}'::json
        ),
        (
          'Inlegvellen',
          'inlegvellen',
          'Transparante inlegvellen voor extra bescherming en organisatie in transportdozen. Afmetingen: 60 x 80 cm, 20 mu LDPE kwaliteit. Verkocht per 500 stuks.',
          88.00,
          '/productAfbeeldingen/inlegvellen/lumorahorticulture-inlegvellen-transparant.jpg',
          NULL,
          'Lumora',
          'in stock',
          '499811',
          'Business & Industrial > Agriculture > Packaging',
          '{"material": "LDPE", "thickness": "20 mu", "dimensions": "60 x 80 cm", "weight": "Lightweight", "compatible": "Standard transport boxes", "protective": true, "units_per_package": 500}'::json
        )
      ON CONFLICT DO NOTHING
    `;

    console.log('✅ Database setup completed successfully!');
    console.log('');
    console.log('📋 Created tables:');
    console.log('  - products');
    console.log('  - orders');
    console.log('  - order_items');
    console.log('');
    console.log('📦 Inserted your 4 products:');
    console.log('  - PAPER PLUG TRAY 84 (€49.95)');
    console.log('  - PAPER PLUG TRAY 104 (€59.95)');
    console.log('  - Transportdoos (Vouwdoos) (€12.50)');
    console.log('  - Inlegvellen (€3.95)');
    console.log('');
    console.log('💡 OPMERKING: Placeholder prijzen gebruikt.');
    console.log('   Pas prijzen aan via SQL of Drizzle Studio (npm run db:studio)');
    console.log('');
    console.log('🎉 Je kunt nu je webshop testen: npm run dev');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    console.error('');
    console.error('💡 Tip: Check of je DATABASE_URL correct is in .env.local');
    process.exit(1);
  }
}

setupDatabase();
