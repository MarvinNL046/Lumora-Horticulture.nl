import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {
    locale: v.optional(v.string()),
  },
  handler: async (ctx, { locale }) => {
    const products = await ctx.db.query("products").collect();

    // Sort by display_order ascending (nulls last)
    products.sort((a, b) => {
      const orderA = a.display_order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.display_order ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });

    if (!locale || locale === "nl") {
      return products;
    }

    // Return localized name/description based on locale
    return products.map((product) => {
      const nameKey = `name_${locale}` as keyof typeof product;
      const descKey = `description_${locale}` as keyof typeof product;
      return {
        ...product,
        name: (product[nameKey] as string) ?? product.name,
        description: (product[descKey] as string) ?? product.description,
      };
    });
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const updateBySlug = mutation({
  args: {
    slug: v.string(),
    price: v.optional(v.number()),
    description: v.optional(v.string()),
    description_en: v.optional(v.string()),
    description_de: v.optional(v.string()),
  },
  handler: async (ctx, { slug, ...patch }) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!product) throw new Error(`Product not found: ${slug}`);
    const clean = Object.fromEntries(
      Object.entries(patch).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(product._id, clean);
    return product._id;
  },
});

export const listInStock = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_availability", (q) => q.eq("availability", "in stock"))
      .collect();
  },
});
