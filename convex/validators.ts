import { v } from "convex/values";

export const productValidator = v.object({
  _id: v.id("products"),
  _creationTime: v.number(),
  slug: v.string(),
  name: v.string(),
  name_en: v.optional(v.string()),
  name_de: v.optional(v.string()),
  description: v.string(),
  description_en: v.optional(v.string()),
  description_de: v.optional(v.string()),
  price: v.number(),
  image_url: v.string(),
  gtin: v.optional(v.string()),
  mpn: v.optional(v.string()),
  brand: v.optional(v.string()),
  condition: v.optional(v.string()),
  availability: v.optional(v.string()),
  google_product_category: v.optional(v.string()),
  product_type: v.optional(v.string()),
  metadata: v.optional(v.any()),
  display_order: v.optional(v.number()),
});

export const orderFields = {
  _id: v.id("orders"),
  _creationTime: v.number(),
  checkout_request_key: v.optional(v.string()),
  order_number: v.optional(v.string()),
  user_id: v.optional(v.string()),
  customer_email: v.string(),
  customer_name: v.optional(v.string()),
  customer_phone: v.optional(v.string()),
  shipping_address: v.optional(v.any()),
  billing_address: v.optional(v.any()),
  total_amount: v.number(),
  status: v.string(),
  payment_id: v.optional(v.string()),
  payment_status: v.optional(v.string()),
  locale: v.optional(v.string()),
  recovery_email_sent_at: v.optional(v.number()),
  recovery_attempts: v.optional(v.number()),
  recovery_state: v.optional(v.string()),
  delivery_preference: v.optional(v.any()),
  shipment_id: v.optional(v.string()),
  tracking_code: v.optional(v.string()),
  tracking_url: v.optional(v.string()),
  shipment_status: v.optional(v.string()),
  shipped_at: v.optional(v.number()),
  delivered_at: v.optional(v.number()),
  shipped_email_sent_at: v.optional(v.number()),
  paid_at: v.optional(v.number()),
  paid_payment_attempt_id: v.optional(v.id("paymentAttempts")),
  created_at: v.number(),
  updated_at: v.number(),
  metadata: v.optional(v.any()),
} as const;

export const orderValidator = v.object(orderFields);

export const orderItemFields = {
  _id: v.id("orderItems"),
  _creationTime: v.number(),
  order_id: v.id("orders"),
  product_id: v.id("products"),
  quantity: v.number(),
  price_at_purchase: v.number(),
  created_at: v.number(),
} as const;

export const orderItemValidator = v.object(orderItemFields);

export const paymentAttemptKindValidator = v.union(
  v.literal("checkout"),
  v.literal("retry"),
  v.literal("legacy"),
);

export const paymentAttemptStatusValidator = v.union(
  v.literal("creating"),
  v.literal("open"),
  v.literal("pending"),
  v.literal("authorized"),
  v.literal("paid"),
  v.literal("failed"),
  v.literal("canceled"),
  v.literal("expired"),
);

export const paymentAttemptValidator = v.object({
  _id: v.id("paymentAttempts"),
  _creationTime: v.number(),
  order_id: v.id("orders"),
  kind: paymentAttemptKindValidator,
  request_key: v.string(),
  amount_cents: v.number(),
  currency: v.literal("EUR"),
  status: paymentAttemptStatusValidator,
  provider_payment_id: v.optional(v.string()),
  checkout_url: v.optional(v.string()),
  failure_reason: v.optional(v.string()),
  observed_at: v.optional(v.number()),
  paid_at: v.optional(v.number()),
  created_at: v.number(),
  updated_at: v.number(),
});

export const orderEffectTypeValidator = v.union(
  v.literal("customer_confirmation"),
  v.literal("admin_notification"),
  v.literal("recovery_notification"),
  v.literal("myparcel_shipment"),
  v.literal("meta_purchase"),
  v.literal("google_purchase"),
);

export const orderEffectStatusValidator = v.union(
  v.literal("pending"),
  v.literal("processing"),
  v.literal("succeeded"),
  v.literal("failed"),
);

export const orderEffectValidator = v.object({
  _id: v.id("orderEffects"),
  _creationTime: v.number(),
  order_id: v.id("orders"),
  attempt_id: v.id("paymentAttempts"),
  type: orderEffectTypeValidator,
  status: orderEffectStatusValidator,
  claim_token: v.optional(v.string()),
  lease_expires_at: v.optional(v.number()),
  attempt_count: v.number(),
  last_error: v.optional(v.string()),
  retryable: v.optional(v.boolean()),
  provider_reference: v.optional(v.string()),
  completed_at: v.optional(v.number()),
  created_at: v.number(),
  updated_at: v.number(),
});

export const accountOrderWithItemsValidator = v.object({
  ...orderFields,
  items: v.array(
    v.object({
      ...orderItemFields,
      product_name: v.string(),
      product_slug: v.string(),
    }),
  ),
});

export const savedAddressValidator = v.object({
  _id: v.id("savedAddresses"),
  _creationTime: v.number(),
  user_id: v.string(),
  name: v.string(),
  street: v.string(),
  city: v.string(),
  postal_code: v.string(),
  country: v.string(),
  phone: v.optional(v.string()),
  is_default: v.optional(v.boolean()),
  created_at: v.number(),
  updated_at: v.number(),
});

export const abandonedCartValidator = v.object({
  _id: v.id("abandonedCarts"),
  _creationTime: v.number(),
  user_id: v.optional(v.string()),
  customer_email: v.string(),
  customer_name: v.optional(v.string()),
  cart_data: v.any(),
  total_amount: v.number(),
  locale: v.optional(v.string()),
  created_at: v.number(),
  reminded_at: v.optional(v.number()),
  recovered: v.optional(v.boolean()),
  recovered_at: v.optional(v.number()),
  recovery_order_id: v.optional(v.id("orders")),
});

export const blogPostValidator = v.object({
  _id: v.id("blogPosts"),
  _creationTime: v.number(),
  slug: v.string(),
  title_nl: v.string(),
  excerpt_nl: v.string(),
  content_nl: v.string(),
  seo_title_nl: v.optional(v.string()),
  seo_description_nl: v.optional(v.string()),
  title_de: v.optional(v.string()),
  excerpt_de: v.optional(v.string()),
  content_de: v.optional(v.string()),
  seo_title_de: v.optional(v.string()),
  seo_description_de: v.optional(v.string()),
  category: v.string(),
  tags: v.array(v.string()),
  featured_image: v.optional(v.string()),
  author: v.string(),
  status: v.string(),
  published_at: v.optional(v.number()),
  updated_at: v.number(),
});
