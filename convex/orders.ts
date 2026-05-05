import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Recovery state machine. Treat legacy orders (no recovery_state field) by
// inferring from the old recovery_attempts counter so the migration is silent
// and runaway loops stop immediately on deploy.
type RecoveryState =
  | "none"
  | "reminder_1_sent"
  | "reminder_2_sent"
  | "given_up"
  | "recovered";

function effectiveRecoveryState(o: {
  recovery_state?: string;
  recovery_attempts?: number;
  recovery_email_sent_at?: number;
}): RecoveryState {
  if (o.recovery_state) return o.recovery_state as RecoveryState;
  const attempts = o.recovery_attempts ?? 0;
  if (attempts >= 2) return "given_up";
  if (attempts === 1 || o.recovery_email_sent_at) return "reminder_1_sent";
  return "none";
}

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
    delivery_preference: v.optional(v.any()),
    metadata: v.optional(v.any()),
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
    recovery_state: v.optional(v.string()),
    delivery_preference: v.optional(v.any()),
    shipment_id: v.optional(v.string()),
    tracking_code: v.optional(v.string()),
    tracking_url: v.optional(v.string()),
    shipment_status: v.optional(v.string()),
    shipped_at: v.optional(v.number()),
    delivered_at: v.optional(v.number()),
    shipped_email_sent_at: v.optional(v.number()),
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

export const getByShipmentId = query({
  args: { shipment_id: v.string() },
  handler: async (ctx, { shipment_id }) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_shipment_id", (q) => q.eq("shipment_id", shipment_id))
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

export const listForFirstRecovery = query({
  args: {},
  handler: async (ctx) => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const allOrders = await ctx.db.query("orders").collect();

    return allOrders.filter((o) => {
      const ps = o.payment_status;
      return (
        (ps === "expired" || ps === "failed" || ps === "cancelled") &&
        o.created_at < oneHourAgo &&
        o.created_at > sevenDaysAgo &&
        effectiveRecoveryState(o) === "none"
      );
    }).slice(0, 30);
  },
});

export const listForSecondRecovery = query({
  args: {},
  handler: async (ctx) => {
    const fortyEightHoursAgo = Date.now() - 48 * 60 * 60 * 1000;
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const allOrders = await ctx.db.query("orders").collect();

    return allOrders.filter((o) => {
      const ps = o.payment_status;
      return (
        (ps === "expired" || ps === "failed" || ps === "cancelled") &&
        o.created_at > sevenDaysAgo &&
        effectiveRecoveryState(o) === "reminder_1_sent" &&
        o.recovery_email_sent_at != null &&
        o.recovery_email_sent_at < fortyEightHoursAgo
      );
    }).slice(0, 20);
  },
});

// Atomic state transition for the recovery flow. The cron MUST call this
// BEFORE sending an email so a parallel/retried run sees the new state and
// skips. Returns true if the transition was applied, false if another caller
// already moved the state (idempotency guard).
export const markRecoveryState = mutation({
  args: {
    id: v.id("orders"),
    expected_from: v.optional(v.string()),
    to: v.string(),
    set_email_sent_at: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, expected_from, to, set_email_sent_at }) => {
    const order = await ctx.db.get(id);
    if (!order) return false;
    if (expected_from !== undefined) {
      const current = effectiveRecoveryState(order);
      if (current !== expected_from) return false;
    }
    const patch: Record<string, unknown> = {
      recovery_state: to,
      updated_at: Date.now(),
    };
    if (set_email_sent_at) {
      patch.recovery_email_sent_at = Date.now();
      // Keep the legacy counter in sync so old code paths and analytics
      // don't see stale numbers during the migration window.
      patch.recovery_attempts =
        to === "reminder_1_sent" ? 1 : to === "reminder_2_sent" ? 2 : (order.recovery_attempts ?? 0);
    }
    await ctx.db.patch(id, patch);
    return true;
  },
});

export const listWithOrderNumber = query({
  args: { year: v.number() },
  handler: async (ctx, { year }) => {
    const startOfYear = new Date(year, 0, 1).getTime();
    const endOfYear = new Date(year + 1, 0, 1).getTime();

    const allOrders = await ctx.db.query("orders").collect();

    return allOrders
      .filter(
        (o) =>
          o.order_number != null &&
          o.created_at >= startOfYear &&
          o.created_at < endOfYear
      )
      .sort((a, b) => b.created_at - a.created_at);
  },
});

export const listByUserWithItems = query({
  args: { user_id: v.string() },
  handler: async (ctx, { user_id }) => {
    const orders = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("user_id"), user_id))
      .order("desc")
      .collect();

    return await Promise.all(
      orders.map(async (order) => {
        const items = await ctx.db
          .query("orderItems")
          .withIndex("by_order", (q) => q.eq("order_id", order._id))
          .collect();

        const itemsWithProducts = await Promise.all(
          items.map(async (item) => {
            const product = await ctx.db.get(item.product_id);
            return {
              ...item,
              product_name: product?.name || "Unknown",
              product_slug: product?.slug || "",
            };
          })
        );

        return { ...order, items: itemsWithProducts };
      })
    );
  },
});
