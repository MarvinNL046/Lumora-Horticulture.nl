import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireServerSecret } from "./lib/serverSecret";
import { abandonedCartValidator } from "./validators";

export const save = mutation({
  args: {
    server_secret: v.string(),
    user_id: v.optional(v.string()),
    customer_email: v.string(),
    customer_name: v.optional(v.string()),
    cart_data: v.any(),
    total_amount: v.number(),
    locale: v.optional(v.string()),
  },
  returns: v.id("abandonedCarts"),
  handler: async (ctx, { server_secret, ...args }) => {
    requireServerSecret(server_secret);
    // Check if email has an existing non-recovered cart
    const existing = await ctx.db
      .query("abandonedCarts")
      .withIndex("by_email", (q) => q.eq("customer_email", args.customer_email))
      .order("desc")
      .take(50);

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
  args: { server_secret: v.string(), id: v.id("abandonedCarts") },
  returns: v.union(abandonedCartValidator, v.null()),
  handler: async (ctx, { server_secret, id }) => {
    requireServerSecret(server_secret);
    return await ctx.db.get(id);
  },
});

export const load = query({
  args: { server_secret: v.string(), user_id: v.string() },
  returns: v.union(abandonedCartValidator, v.null()),
  handler: async (ctx, { server_secret, user_id }) => {
    requireServerSecret(server_secret);
    const carts = await ctx.db
      .query("abandonedCarts")
      .withIndex("by_user_id", (q) => q.eq("user_id", user_id))
      .order("desc")
      .take(50);

    // Filter for this user's non-recovered carts, return most recent
    const userCarts = carts
      .filter((c) => c.user_id === user_id && !c.recovered)
      .sort((a, b) => b.created_at - a.created_at);

    return userCarts[0] ?? null;
  },
});

export const getUnreminded = query({
  args: { server_secret: v.string() },
  returns: v.array(abandonedCartValidator),
  handler: async (ctx, { server_secret }) => {
    requireServerSecret(server_secret);
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    return await ctx.db
      .query("abandonedCarts")
      .withIndex("by_recovered_and_created_at", (q) =>
        q.eq("recovered", false).lt("created_at", twentyFourHoursAgo),
      )
      .order("asc")
      .take(100)
      .then((carts) => carts.filter((cart) => cart.reminded_at == null));
  },
});

export const markReminded = mutation({
  args: { server_secret: v.string(), id: v.id("abandonedCarts") },
  returns: v.null(),
  handler: async (ctx, { server_secret, id }) => {
    requireServerSecret(server_secret);
    await ctx.db.patch(id, { reminded_at: Date.now() });
    return null;
  },
});

export const markRecovered = mutation({
  args: {
    server_secret: v.string(),
    id: v.id("abandonedCarts"),
    recovery_order_id: v.id("orders"),
  },
  returns: v.null(),
  handler: async (ctx, { server_secret, id, recovery_order_id }) => {
    requireServerSecret(server_secret);
    await ctx.db.patch(id, {
      recovered: true,
      recovered_at: Date.now(),
      recovery_order_id,
    });
    return null;
  },
});

export const markRecoveredByEmail = mutation({
  args: {
    server_secret: v.string(),
    customer_email: v.string(),
    recovery_order_id: v.id("orders"),
  },
  returns: v.null(),
  handler: async (ctx, { server_secret, customer_email, recovery_order_id }) => {
    requireServerSecret(server_secret);
    const carts = await ctx.db
      .query("abandonedCarts")
      .withIndex("by_email", (q) => q.eq("customer_email", customer_email))
      .take(50);

    for (const cart of carts) {
      if (!cart.recovered) {
        await ctx.db.patch(cart._id, {
          recovered: true,
          recovered_at: Date.now(),
          recovery_order_id,
        });
      }
    }
    return null;
  },
});
