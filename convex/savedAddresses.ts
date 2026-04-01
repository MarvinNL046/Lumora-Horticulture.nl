import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: { user_id: v.string() },
  handler: async (ctx, { user_id }) => {
    const addresses = await ctx.db
      .query("savedAddresses")
      .withIndex("by_user", (q) => q.eq("user_id", user_id))
      .collect();

    // Sort by is_default descending (defaults first)
    addresses.sort((a, b) => {
      const aDefault = a.is_default ? 1 : 0;
      const bDefault = b.is_default ? 1 : 0;
      return bDefault - aDefault;
    });

    return addresses;
  },
});

export const create = mutation({
  args: {
    user_id: v.string(),
    name: v.string(),
    street: v.string(),
    city: v.string(),
    postal_code: v.string(),
    country: v.string(),
    phone: v.optional(v.string()),
    is_default: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // If this address is default, unset other defaults for this user
    if (args.is_default) {
      const existing = await ctx.db
        .query("savedAddresses")
        .withIndex("by_user", (q) => q.eq("user_id", args.user_id))
        .collect();

      for (const addr of existing) {
        if (addr.is_default) {
          await ctx.db.patch(addr._id, { is_default: false });
        }
      }
    }

    const now = Date.now();
    return await ctx.db.insert("savedAddresses", {
      ...args,
      created_at: now,
      updated_at: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("savedAddresses"),
    user_id: v.string(),
    name: v.optional(v.string()),
    street: v.optional(v.string()),
    city: v.optional(v.string()),
    postal_code: v.optional(v.string()),
    country: v.optional(v.string()),
    phone: v.optional(v.string()),
    is_default: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, user_id, ...fields }) => {
    // Verify ownership
    const address = await ctx.db.get(id);
    if (!address || address.user_id !== user_id) {
      throw new Error("Address not found or not owned by user");
    }

    // If setting as default, unset other defaults
    if (fields.is_default) {
      const existing = await ctx.db
        .query("savedAddresses")
        .withIndex("by_user", (q) => q.eq("user_id", user_id))
        .collect();

      for (const addr of existing) {
        if (addr._id !== id && addr.is_default) {
          await ctx.db.patch(addr._id, { is_default: false });
        }
      }
    }

    const patch: Record<string, unknown> = { updated_at: Date.now() };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    await ctx.db.patch(id, patch);
  },
});

export const remove = mutation({
  args: {
    id: v.id("savedAddresses"),
    user_id: v.string(),
  },
  handler: async (ctx, { id, user_id }) => {
    const address = await ctx.db.get(id);
    if (!address || address.user_id !== user_id) {
      throw new Error("Address not found or not owned by user");
    }
    await ctx.db.delete(id);
  },
});
