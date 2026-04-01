import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogPosts: defineTable({
    slug: v.string(),

    // Dutch (primary)
    title_nl: v.string(),
    excerpt_nl: v.string(),
    content_nl: v.string(),
    seo_title_nl: v.optional(v.string()),
    seo_description_nl: v.optional(v.string()),

    // German (translation)
    title_de: v.optional(v.string()),
    excerpt_de: v.optional(v.string()),
    content_de: v.optional(v.string()),
    seo_title_de: v.optional(v.string()),
    seo_description_de: v.optional(v.string()),

    // Metadata
    category: v.string(),
    tags: v.array(v.string()),
    featured_image: v.optional(v.string()),
    author: v.string(),
    status: v.string(), // draft, published
    published_at: v.optional(v.number()),
    updated_at: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_category", ["category"]),
});
