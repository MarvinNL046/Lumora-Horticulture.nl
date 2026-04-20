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

/**
 * Idempotent one-shot: populate the `spray_coverage_m2` + `dosage_table` blocks
 * on the three NEEMX PRO SKUs so the PDP can render the coverage calculator.
 * Numbers are derived from the official Lumora dosage sheet:
 *   2,5 ml/L preventief · 5 ml/L normaal · 7 ml/L intensief · 10 ml/L professioneel
 * Spray basis: 0,1 L per m². Run with: npx convex run products:populateNeemxCoverage
 */
export const populateNeemxCoverage = mutation({
  args: {},
  handler: async (ctx) => {
    const coverageFor = (bottleMl: number) => {
      const tiers = [
        { dosage: "2,5 ml/L — preventief", ml_per_l: 2.5 },
        { dosage: "5 ml/L — normaal", ml_per_l: 5 },
        { dosage: "7 ml/L — intensief", ml_per_l: 7 },
        { dosage: "10 ml/L — professioneel / zware druk", ml_per_l: 10 },
      ];
      const breakdown = tiers.map((t) => {
        const liters = bottleMl / t.ml_per_l;
        const m2 = liters * 10; // 0,1 L per m² → 10 m²/L
        const round = (x: number) => (x >= 10 ? Math.round(x) : Math.round(x * 10) / 10);
        return {
          dosage: t.dosage,
          spray_liters: String(round(liters)).replace(".", ","),
          m2_range: `${round(m2)} m²`,
        };
      });
      return {
        min: Math.round((bottleMl / 10) * 10), // 10 ml/L at 0,1 L/m² (low end)
        max: Math.round((bottleMl / 2.5) * 10), // 2,5 ml/L at 0,1 L/m² (high end)
        breakdown,
      };
    };

    const updates: { slug: string; bottleMl: number }[] = [
      { slug: "neemx-pro-10ml", bottleMl: 10 },
      { slug: "neemx-pro-30ml", bottleMl: 30 },
      { slug: "neemx-pro-50ml", bottleMl: 50 },
    ];

    const results: { slug: string; patched: boolean }[] = [];
    for (const { slug, bottleMl } of updates) {
      const product = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      if (!product) {
        results.push({ slug, patched: false });
        continue;
      }
      const metadata = { ...(product.metadata ?? {}), spray_coverage_m2: coverageFor(bottleMl) };
      await ctx.db.patch(product._id, { metadata });
      results.push({ slug, patched: true });
    }
    return results;
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
