import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const createMany = mutation({
  args: {
    items: v.array(
      v.object({
        order_id: v.id("orders"),
        product_id: v.id("products"),
        quantity: v.number(),
        price_at_purchase: v.number(),
      })
    ),
  },
  handler: async (ctx, { items }) => {
    const now = Date.now();
    const ids = [];
    for (const item of items) {
      const id = await ctx.db.insert("orderItems", {
        ...item,
        created_at: now,
      });
      ids.push(id);
    }
    return ids;
  },
});

export const getByOrder = query({
  args: { order_id: v.id("orders") },
  handler: async (ctx, { order_id }) => {
    return await ctx.db
      .query("orderItems")
      .withIndex("by_order", (q) => q.eq("order_id", order_id))
      .collect();
  },
});
