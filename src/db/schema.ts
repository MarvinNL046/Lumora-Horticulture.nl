import { pgTable, uuid, text, numeric, timestamp, boolean, json } from 'drizzle-orm/pg-core';

// Products table
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(), // SEO-friendly URL slug
  name: text('name').notNull(),
  name_en: text('name_en'), // English product name
  name_de: text('name_de'), // German product name
  description: text('description').notNull(),
  description_en: text('description_en'), // English description
  description_de: text('description_de'), // German description
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  image_url: text('image_url').notNull(),
  gtin: text('gtin'), // EAN/GTIN code voor Google Merchant
  mpn: text('mpn'), // Manufacturer Part Number
  brand: text('brand').default('Lumora'),
  condition: text('condition').default('new'),
  availability: text('availability').default('in stock'), // in stock, out of stock, preorder
  google_product_category: text('google_product_category'), // Google product category ID
  product_type: text('product_type'), // Eigen categorisering
  metadata: json('metadata'), // Extra velden zoals specificaties, afmetingen, etc.
  display_order: numeric('display_order', { precision: 10, scale: 0 }).default('999'), // Display order for shop page
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Orders table
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  order_number: text('order_number'), // Human-readable order number like ORD-2025-0001
  customer_email: text('customer_email').notNull(),
  customer_name: text('customer_name').notNull(),
  customer_phone: text('customer_phone'),
  shipping_address: json('shipping_address').notNull(), // { street, city, postal_code, country }
  billing_address: json('billing_address'), // { street, city, postal_code, country }
  total_amount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  status: text('status').default('pending').notNull(), // pending, paid, processing, shipped, completed, cancelled
  payment_id: text('payment_id'), // Mollie payment ID
  payment_status: text('payment_status').default('pending'), // pending, paid, failed, cancelled
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Order items table
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  order_id: uuid('order_id')
    .references(() => orders.id)
    .notNull(),
  product_id: uuid('product_id')
    .references(() => products.id)
    .notNull(),
  quantity: numeric('quantity', { precision: 10, scale: 0 }).notNull(),
  price_at_purchase: numeric('price_at_purchase', { precision: 10, scale: 2 }).notNull(), // Prijs op moment van aankoop
  created_at: timestamp('created_at').defaultNow(),
});

// Abandoned carts table
export const abandonedCarts = pgTable('abandoned_carts', {
  id: uuid('id').primaryKey().defaultRandom(),
  customer_email: text('customer_email').notNull(),
  customer_name: text('customer_name'),
  cart_data: json('cart_data').notNull(), // Array of cart items
  total_amount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  locale: text('locale').default('nl'), // nl, en, de
  created_at: timestamp('created_at').defaultNow(),
  reminded_at: timestamp('reminded_at'), // When reminder email was sent
  recovered: boolean('recovered').default(false), // If cart led to purchase
  recovered_at: timestamp('recovered_at'),
  recovery_order_id: uuid('recovery_order_id').references(() => orders.id),
});

// Types voor TypeScript
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
export type AbandonedCart = typeof abandonedCarts.$inferSelect;
export type NewAbandonedCart = typeof abandonedCarts.$inferInsert;
