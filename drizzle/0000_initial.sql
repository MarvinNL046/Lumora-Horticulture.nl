-- Create products table
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
);

-- Create orders table
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
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS "order_items" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "order_id" uuid NOT NULL,
  "product_id" uuid NOT NULL,
  "quantity" numeric(10, 0) NOT NULL,
  "price_at_purchase" numeric(10, 2) NOT NULL,
  "created_at" timestamp DEFAULT now(),
  CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id"),
  CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id")
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "order_id_idx" ON "order_items" ("order_id");
CREATE INDEX IF NOT EXISTS "product_id_idx" ON "order_items" ("product_id");
CREATE INDEX IF NOT EXISTS "customer_email_idx" ON "orders" ("customer_email");
CREATE INDEX IF NOT EXISTS "payment_id_idx" ON "orders" ("payment_id");

-- Insert sample products (je 2 producten)
INSERT INTO "products" ("name", "description", "price", "image_url", "gtin", "brand", "availability", "google_product_category", "product_type", "metadata")
VALUES
  (
    'LED Groeilamp - Full Spectrum 600W',
    'Professionele LED groeilamp met volledig spectrum voor optimale plantengroei. Perfect voor binnen kweken met hoge energie-efficiëntie.',
    299.99,
    '/productAfbeeldingen/led-groeilamp-600w.jpg',
    '8719326123456',
    'Lumora',
    'in stock',
    '1626', -- Home & Garden > Lighting > Light Bulbs
    'Grow Lights > LED Grow Lights',
    '{"power": "600W", "spectrum": "Full Spectrum", "coverage": "120x120cm", "lifespan": "50000 hours", "warranty": "3 years"}'::json
  ),
  (
    'Smart Klimaatregelaar - Pro Series',
    'Intelligente klimaatregelaar met app-bediening voor temperatuur, luchtvochtigheid en ventilatie controle. Ideaal voor kassen en groeitenten.',
    189.99,
    '/productAfbeeldingen/klimaatregelaar-pro.jpg',
    '8719326123463',
    'Lumora',
    'in stock',
    '729', -- Electronics > Smart Home
    'Growing Equipment > Climate Control',
    '{"features": ["App control", "Temperature sensor", "Humidity sensor", "WiFi enabled"], "compatibility": "iOS/Android", "warranty": "2 years"}'::json
  )
ON CONFLICT DO NOTHING;
