import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const listPublished = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx, { category }) => {
    let posts = await ctx.db
      .query("blogPosts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();

    if (category) {
      posts = posts.filter((p) => p.category === category);
    }

    return posts;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    // Prevent duplicates
    const existing = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      console.log(`Post "${args.slug}" already exists, skipping`);
      return existing._id;
    }

    const now = Date.now();
    return await ctx.db.insert("blogPosts", {
      ...args,
      author: "Lumora Team",
      status: "published",
      published_at: now,
      updated_at: now,
    });
  },
});
