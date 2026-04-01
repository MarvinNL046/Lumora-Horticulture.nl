import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const create = mutation({
  args: {
    order_number: v.optional(v.string()),
    user_id: v.optional(v.string()),
    customer_email: v.string(),
    customer_name: v.optional(v.string()),
    customer_phone: v.optional(v.string()),
    shipping_address: v.optional(v.any()),
    billing_address: v.optional(v.any()),
    total_amount: v.number(),
    status: v.string(),
    payment_id: v.optional(v.string()),
    payment_status: v.optional(v.string()),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("orders", {
      ...args,
      created_at: now,
      updated_at: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("orders"),
    order_number: v.optional(v.string()),
    customer_email: v.optional(v.string()),
    customer_name: v.optional(v.string()),
    customer_phone: v.optional(v.string()),
    shipping_address: v.optional(v.any()),
    billing_address: v.optional(v.any()),
    total_amount: v.optional(v.number()),
    status: v.optional(v.string()),
    payment_id: v.optional(v.string()),
    payment_status: v.optional(v.string()),
    locale: v.optional(v.string()),
    recovery_email_sent_at: v.optional(v.number()),
    recovery_attempts: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...fields }) => {
    // Remove undefined fields
    const patch: Record<string, unknown> = { updated_at: Date.now() };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }
    await ctx.db.patch(id, patch);
  },
});

export const getById = query({
  args: { id: v.id("orders") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getByPaymentId = query({
  args: { payment_id: v.string() },
  handler: async (ctx, { payment_id }) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_payment_id", (q) => q.eq("payment_id", payment_id))
      .first();
  },
});

export const getByEmail = query({
  args: { customer_email: v.string() },
  handler: async (ctx, { customer_email }) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("customer_email", customer_email))
      .order("desc")
      .first();
  },
});

export const listByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, { status }) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_status", (q) => q.eq("status", status))
      .collect();
  },
});
