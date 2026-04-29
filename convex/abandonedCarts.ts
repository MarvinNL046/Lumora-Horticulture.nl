import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const save = mutation({
  args: {
    user_id: v.optional(v.string()),
    customer_email: v.string(),
    customer_name: v.optional(v.string()),
    cart_data: v.any(),
    total_amount: v.number(),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if email has an existing non-recovered cart
    const existing = await ctx.db
      .query("abandonedCarts")
      .withIndex("by_email", (q) => q.eq("customer_email", args.customer_email))
      .collect();

    const activeCart = existing.find((c) => !c.recovered);

    if (activeCart) {
      // Update existing cart
      await ctx.db.patch(activeCart._id, {
        cart_data: args.cart_data,
        total_amount: args.total_amount,
        customer_name: args.customer_name,
        user_id: args.user_id,
        locale: args.locale,
      });
      return activeCart._id;
    }

    // Insert new cart
    return await ctx.db.insert("abandonedCarts", {
      ...args,
      created_at: Date.now(),
      recovered: false,
    });
  },
});

export const getById = query({
  args: { id: v.id("abandonedCarts") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const load = query({
  args: { user_id: v.string() },
  handler: async (ctx, { user_id }) => {
    const carts = await ctx.db
      .query("abandonedCarts")
      .collect();

    // Filter for this user's non-recovered carts, return most recent
    const userCarts = carts
      .filter((c) => c.user_id === user_id && !c.recovered)
      .sort((a, b) => b.created_at - a.created_at);

    return userCarts[0] ?? null;
  },
});

export const getUnreminded = query({
  args: {},
  handler: async (ctx) => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    const carts = await ctx.db
      .query("abandonedCarts")
      .withIndex("by_recovered", (q) => q.eq("recovered", false))
      .collect();

    return carts.filter(
      (c) => c.created_at < twentyFourHoursAgo && !c.reminded_at
    );
  },
});

export const markReminded = mutation({
  args: { id: v.id("abandonedCarts") },
  handler: async (ctx, { id }) => {
    await ctx.db.patch(id, { reminded_at: Date.now() });
  },
});

export const markRecovered = mutation({
  args: {
    id: v.id("abandonedCarts"),
    recovery_order_id: v.id("orders"),
  },
  handler: async (ctx, { id, recovery_order_id }) => {
    await ctx.db.patch(id, {
      recovered: true,
      recovered_at: Date.now(),
      recovery_order_id,
    });
  },
});

export const markRecoveredByEmail = mutation({
  args: {
    customer_email: v.string(),
    recovery_order_id: v.id("orders"),
  },
  handler: async (ctx, { customer_email, recovery_order_id }) => {
    const carts = await ctx.db
      .query("abandonedCarts")
      .withIndex("by_email", (q) => q.eq("customer_email", customer_email))
      .collect();

    for (const cart of carts) {
      if (!cart.recovered) {
        await ctx.db.patch(cart._id, {
          recovered: true,
          recovered_at: Date.now(),
          recovery_order_id,
        });
      }
    }
  },
});
