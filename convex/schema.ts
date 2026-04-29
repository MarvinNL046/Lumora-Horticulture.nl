import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ─── Blog Posts ──────────────────────────────────────────────
  blogPosts: defineTable({
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
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_category", ["category"]),

  // ─── Products ───────────────────────────────────────────────
  products: defineTable({
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
  })
    .index("by_slug", ["slug"])
    .index("by_availability", ["availability"]),

  // ─── Orders ─────────────────────────────────────────────────
  orders: defineTable({
    order_number: v.optional(v.string()),
    user_id: v.optional(v.string()),
    customer_email: v.string(),
    customer_name: v.optional(v.string()),
    customer_phone: v.optional(v.string()),
    shipping_address: v.optional(v.any()),
    billing_address: v.optional(v.any()),
    total_amount: v.number(),
    status: v.string(), // pending, paid, processing, shipped, completed, cancelled
    payment_id: v.optional(v.string()),
    payment_status: v.optional(v.string()),
    locale: v.optional(v.string()),
    recovery_email_sent_at: v.optional(v.number()),
    recovery_attempts: v.optional(v.number()),
    delivery_preference: v.optional(v.any()),
    shipment_id: v.optional(v.string()),
    tracking_code: v.optional(v.string()),
    tracking_url: v.optional(v.string()),
    shipment_status: v.optional(v.string()),
    shipped_at: v.optional(v.number()),
    delivered_at: v.optional(v.number()),
    shipped_email_sent_at: v.optional(v.number()),
    created_at: v.number(),
    updated_at: v.number(),
    metadata: v.optional(v.any()),
  })
    .index("by_payment_id", ["payment_id"])
    .index("by_email", ["customer_email"])
    .index("by_status", ["status"])
    .index("by_shipment_id", ["shipment_id"]),

  // ─── Order Items ────────────────────────────────────────────
  orderItems: defineTable({
    order_id: v.id("orders"),
    product_id: v.id("products"),
    quantity: v.number(),
    price_at_purchase: v.number(),
    created_at: v.number(),
  })
    .index("by_order", ["order_id"]),

  // ─── Abandoned Carts ───────────────────────────────────────
  abandonedCarts: defineTable({
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
  })
    .index("by_email", ["customer_email"])
    .index("by_recovered", ["recovered"]),

  // ─── Saved Addresses ───────────────────────────────────────
  savedAddresses: defineTable({
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
  })
    .index("by_user", ["user_id"]),

  // ─── SEO Pages ─────────────────────────────────────────────
  seoPages: defineTable({
    pillar: v.string(),
    subpillar: v.string(),
    slug_nl: v.string(),
    slug_en: v.string(),
    slug_de: v.string(),
    pillar_number: v.number(),
    subpillar_number: v.number(),
    status: v.string(),
    published_at: v.optional(v.number()),
    created_at: v.number(),
    updated_at: v.number(),
  })
    .index("by_slug_nl", ["slug_nl"])
    .index("by_slug_en", ["slug_en"])
    .index("by_slug_de", ["slug_de"]),

  // ─── CTA Queries ───────────────────────────────────────────
  ctaQueries: defineTable({
    seo_page_id: v.id("seoPages"),
    page_slug: v.string(),
    locale: v.string(),
    cta_text_nl: v.optional(v.string()),
    cta_text_en: v.optional(v.string()),
    cta_text_de: v.optional(v.string()),
    cta_type: v.string(),
    cta_position: v.string(),
    cta_action: v.string(),
    target_url: v.optional(v.string()),
    created_at: v.number(),
  })
    .index("by_seo_page", ["seo_page_id"]),

  // ─── CTA Clicks ────────────────────────────────────────────
  ctaClicks: defineTable({
    cta_query_id: v.id("ctaQueries"),
    user_id: v.optional(v.string()),
    session_id: v.optional(v.string()),
    clicked_at: v.number(),
    referrer: v.optional(v.string()),
    user_agent: v.optional(v.string()),
    converted: v.optional(v.boolean()),
    conversion_order_id: v.optional(v.id("orders")),
  })
    .index("by_cta_query", ["cta_query_id"]),
});
