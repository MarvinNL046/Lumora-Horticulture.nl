import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireServerSecret } from "./lib/serverSecret";
import { orderItemValidator, productValidator } from "./validators";

export const createMany = mutation({
  args: {
    server_secret: v.string(),
    items: v.array(
      v.object({
        order_id: v.id("orders"),
        product_id: v.id("products"),
        quantity: v.number(),
        price_at_purchase: v.number(),
      })
    ),
  },
  returns: v.array(v.id("orderItems")),
  handler: async (ctx, { server_secret, items }) => {
    requireServerSecret(server_secret);
    if (items.length === 0 || items.length > 100) {
      throw new Error("Invalid order item count");
    }
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
  args: { server_secret: v.string(), order_id: v.id("orders") },
  returns: v.array(orderItemValidator),
  handler: async (ctx, { server_secret, order_id }) => {
    requireServerSecret(server_secret);
    return await ctx.db
      .query("orderItems")
      .withIndex("by_order", (q) => q.eq("order_id", order_id))
      .take(100);
  },
});

export const getByOrderWithProducts = query({
  args: { server_secret: v.string(), order_id: v.id("orders") },
  returns: v.array(
    v.object({
      order_item: orderItemValidator,
      product: v.union(productValidator, v.null()),
    }),
  ),
  handler: async (ctx, { server_secret, order_id }) => {
    requireServerSecret(server_secret);
    const items = await ctx.db
      .query("orderItems")
      .withIndex("by_order", (q) => q.eq("order_id", order_id))
      .take(100);

    const result = [];
    for (const item of items) {
      const product = await ctx.db.get(item.product_id);
      result.push({ order_item: item, product });
    }
    return result;
  },
});
