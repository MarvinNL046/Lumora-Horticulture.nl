import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireServerSecret } from "./lib/serverSecret";
import { blogPostValidator } from "./validators";

export const listPublished = query({
  args: {
    category: v.optional(v.string()),
  },
  returns: v.array(blogPostValidator),
  handler: async (ctx, { category }) => {
    if (category) {
      return await ctx.db
        .query("blogPosts")
        .withIndex("by_status_and_category", (q) =>
          q.eq("status", "published").eq("category", category),
        )
        .order("desc")
        .take(500);
    }

    return await ctx.db
      .query("blogPosts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .take(500);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  returns: v.union(blogPostValidator, v.null()),
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const create = mutation({
  args: {
    server_secret: v.string(),
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
  returns: v.id("blogPosts"),
  handler: async (ctx, { server_secret, ...args }) => {
    requireServerSecret(server_secret);
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
