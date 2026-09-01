import { v } from "convex/values";
import { query, mutation, type QueryCtx } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { requireServerSecret } from "./lib/serverSecret";
import { accountOrderWithItemsValidator, orderValidator } from "./validators";

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

const FAILED_PAYMENT_STATUSES = ["expired", "failed", "cancelled", "canceled"] as const;
const CHECKOUT_REQUEST_KEY_PATTERN = /^[A-Za-z0-9_-]{32,128}$/;
const MAX_CHECKOUT_ITEMS = 20;
const MAX_ITEM_QUANTITY = 100;
const MAX_CHECKOUT_TOTAL_CENTS = 25_000_000;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

async function listFailedPaymentsInWindow(
  ctx: QueryCtx,
  after: number,
  before: number,
  limitPerStatus: number,
) {
  const groups = await Promise.all(
    FAILED_PAYMENT_STATUSES.map((paymentStatus) =>
      ctx.db
        .query("orders")
        .withIndex("by_payment_status_and_created_at", (q) =>
          q
            .eq("payment_status", paymentStatus)
            .gt("created_at", after)
            .lt("created_at", before),
        )
        .order("desc")
        .take(limitPerStatus),
    ),
  );

  return groups.flat().sort((a, b) => a.created_at - b.created_at);
}

export const create = mutation({
  args: {
    server_secret: v.string(),
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
  returns: v.id("orders"),
  handler: async (ctx, { server_secret, ...args }) => {
    requireServerSecret(server_secret);
    const now = Date.now();
    return await ctx.db.insert("orders", {
      ...args,
      created_at: now,
      updated_at: now,
    });
  },
});

/**
 * Atomically creates the order and its items exactly once for a client-owned
 * checkout request key. Reading the unique index range and inserting in one
 * Convex mutation makes concurrent calls serializable: a conflicting retry is
 * rerun and observes the order created by the winning transaction.
 */
export const createCheckoutIdempotent = mutation({
  args: {
    server_secret: v.string(),
    request_key: v.string(),
    order: v.object({
      user_id: v.optional(v.string()),
      customer_email: v.string(),
      customer_name: v.string(),
      customer_phone: v.optional(v.string()),
      shipping_address: v.any(),
      billing_address: v.optional(v.any()),
      total_amount_cents: v.number(),
      discount_cents: v.optional(v.number()),
      locale: v.optional(
        v.union(v.literal("nl"), v.literal("en"), v.literal("de")),
      ),
      delivery_preference: v.optional(v.any()),
      metadata: v.optional(v.any()),
    }),
    items: v.array(
      v.object({
        product_id: v.id("products"),
        quantity: v.number(),
        unit_price_cents: v.number(),
      }),
    ),
  },
  returns: v.object({
    order_id: v.id("orders"),
    created: v.boolean(),
  }),
  handler: async (ctx, { server_secret, request_key, order, items }) => {
    requireServerSecret(server_secret);

    if (!CHECKOUT_REQUEST_KEY_PATTERN.test(request_key)) {
      throw new Error("Invalid checkout request key");
    }

    const existing = await ctx.db
      .query("orders")
      .withIndex("by_checkout_request_key", (q) =>
        q.eq("checkout_request_key", request_key),
      )
      .unique();
    if (existing) {
      return { order_id: existing._id, created: false };
    }

    const customerEmail = order.customer_email.trim().toLowerCase();
    const customerName = order.customer_name.trim();
    const customerPhone = order.customer_phone?.trim();
    const userId = order.user_id?.trim();

    if (
      customerEmail.length < 3 ||
      customerEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
    ) {
      throw new Error("Invalid customer email");
    }
    if (customerName.length < 2 || customerName.length > 100) {
      throw new Error("Invalid customer name");
    }
    if (customerPhone && customerPhone.length > 40) {
      throw new Error("Invalid customer phone");
    }
    if (userId && userId.length > 200) {
      throw new Error("Invalid user ID");
    }
    if (!isPlainObject(order.shipping_address)) {
      throw new Error("Invalid shipping address");
    }
    if (order.billing_address !== undefined && !isPlainObject(order.billing_address)) {
      throw new Error("Invalid billing address");
    }
    if (items.length < 1 || items.length > MAX_CHECKOUT_ITEMS) {
      throw new Error("Invalid checkout item count");
    }

    const seenProductIds = new Set<string>();
    let subtotalCents = 0;
    for (const item of items) {
      if (
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > MAX_ITEM_QUANTITY
      ) {
        throw new Error("Invalid item quantity");
      }
      if (
        !Number.isSafeInteger(item.unit_price_cents) ||
        item.unit_price_cents < 1 ||
        item.unit_price_cents > MAX_CHECKOUT_TOTAL_CENTS
      ) {
        throw new Error("Invalid item price");
      }

      const productKey = String(item.product_id);
      if (seenProductIds.has(productKey)) {
        throw new Error("Duplicate checkout product");
      }
      seenProductIds.add(productKey);

      const product = await ctx.db.get(item.product_id);
      if (!product) {
        throw new Error("Checkout product not found");
      }
      if (product.availability && product.availability !== "in stock") {
        throw new Error("Checkout product is unavailable");
      }

      const lineTotalCents = item.quantity * item.unit_price_cents;
      if (!Number.isSafeInteger(lineTotalCents)) {
        throw new Error("Invalid checkout line total");
      }
      subtotalCents += lineTotalCents;
      if (!Number.isSafeInteger(subtotalCents)) {
        throw new Error("Invalid checkout subtotal");
      }
    }

    const discountCents = order.discount_cents ?? 0;
    if (
      !Number.isSafeInteger(discountCents) ||
      discountCents < 0 ||
      discountCents > subtotalCents
    ) {
      throw new Error("Invalid checkout discount");
    }
    if (
      !Number.isSafeInteger(order.total_amount_cents) ||
      order.total_amount_cents < 1 ||
      order.total_amount_cents > MAX_CHECKOUT_TOTAL_CENTS ||
      subtotalCents - discountCents !== order.total_amount_cents
    ) {
      throw new Error("Checkout total does not match items");
    }

    const now = Date.now();
    const orderId = await ctx.db.insert("orders", {
      checkout_request_key: request_key,
      user_id: userId || undefined,
      customer_email: customerEmail,
      customer_name: customerName,
      customer_phone: customerPhone || undefined,
      shipping_address: order.shipping_address,
      billing_address: order.billing_address ?? order.shipping_address,
      total_amount: order.total_amount_cents / 100,
      status: "pending",
      payment_status: "pending",
      locale: order.locale ?? "nl",
      delivery_preference: order.delivery_preference,
      metadata: order.metadata,
      created_at: now,
      updated_at: now,
    });

    for (const item of items) {
      await ctx.db.insert("orderItems", {
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.unit_price_cents / 100,
        created_at: now,
      });
    }

    return { order_id: orderId, created: true };
  },
});

export const update = mutation({
  args: {
    server_secret: v.string(),
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
  returns: v.null(),
  handler: async (ctx, { server_secret, id, ...fields }) => {
    requireServerSecret(server_secret);
    // Remove undefined fields
    const patch: Record<string, unknown> = { updated_at: Date.now() };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }
    await ctx.db.patch(id, patch);
    return null;
  },
});

export const getById = query({
  args: { server_secret: v.string(), id: v.id("orders") },
  returns: v.union(orderValidator, v.null()),
  handler: async (ctx, { server_secret, id }) => {
    requireServerSecret(server_secret);
    return await ctx.db.get(id);
  },
});

export const getByPaymentId = query({
  args: { server_secret: v.string(), payment_id: v.string() },
  returns: v.union(orderValidator, v.null()),
  handler: async (ctx, { server_secret, payment_id }) => {
    requireServerSecret(server_secret);
    return await ctx.db
      .query("orders")
      .withIndex("by_payment_id", (q) => q.eq("payment_id", payment_id))
      .first();
  },
});

export const getByShipmentId = query({
  args: { server_secret: v.string(), shipment_id: v.string() },
  returns: v.union(orderValidator, v.null()),
  handler: async (ctx, { server_secret, shipment_id }) => {
    requireServerSecret(server_secret);
    return await ctx.db
      .query("orders")
      .withIndex("by_shipment_id", (q) => q.eq("shipment_id", shipment_id))
      .first();
  },
});

export const getByEmail = query({
  args: { server_secret: v.string(), customer_email: v.string() },
  returns: v.union(orderValidator, v.null()),
  handler: async (ctx, { server_secret, customer_email }) => {
    requireServerSecret(server_secret);
    return await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("customer_email", customer_email))
      .order("desc")
      .first();
  },
});

export const listByStatus = query({
  args: { server_secret: v.string(), status: v.string() },
  returns: v.array(orderValidator),
  handler: async (ctx, { server_secret, status }) => {
    requireServerSecret(server_secret);
    return await ctx.db
      .query("orders")
      .withIndex("by_status", (q) => q.eq("status", status))
      .order("desc")
      .take(500);
  },
});

export const listForFirstRecovery = query({
  args: { server_secret: v.string() },
  returns: v.array(orderValidator),
  handler: async (ctx, { server_secret }) => {
    requireServerSecret(server_secret);
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const failedOrders = await listFailedPaymentsInWindow(
      ctx,
      sevenDaysAgo,
      oneHourAgo,
      100,
    );

    return failedOrders
      .filter((order) => effectiveRecoveryState(order) === "none")
      .slice(0, 30);
  },
});

export const listForSecondRecovery = query({
  args: { server_secret: v.string() },
  returns: v.array(orderValidator),
  handler: async (ctx, { server_secret }) => {
    requireServerSecret(server_secret);
    const now = Date.now();
    const fortyEightHoursAgo = Date.now() - 48 * 60 * 60 * 1000;
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const failedOrders = await listFailedPaymentsInWindow(
      ctx,
      sevenDaysAgo,
      now,
      100,
    );

    return failedOrders
      .filter(
        (order) =>
          effectiveRecoveryState(order) === "reminder_1_sent" &&
          order.recovery_email_sent_at != null &&
          order.recovery_email_sent_at < fortyEightHoursAgo,
      )
      .slice(0, 20);
  },
});

// Atomic state transition for the recovery flow. The cron MUST call this
// BEFORE sending an email so a parallel/retried run sees the new state and
// skips. Returns true if the transition was applied, false if another caller
// already moved the state (idempotency guard).
export const markRecoveryState = mutation({
  args: {
    server_secret: v.string(),
    id: v.id("orders"),
    expected_from: v.optional(
      v.union(
        v.literal("none"),
        v.literal("reminder_1_sent"),
        v.literal("reminder_2_sent"),
        v.literal("given_up"),
        v.literal("recovered"),
      ),
    ),
    to: v.union(
      v.literal("none"),
      v.literal("reminder_1_sent"),
      v.literal("reminder_2_sent"),
      v.literal("given_up"),
      v.literal("recovered"),
    ),
    set_email_sent_at: v.optional(v.boolean()),
  },
  returns: v.boolean(),
  handler: async (ctx, { server_secret, id, expected_from, to, set_email_sent_at }) => {
    requireServerSecret(server_secret);
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
  args: { server_secret: v.string(), year: v.number() },
  returns: v.array(orderValidator),
  handler: async (ctx, { server_secret, year }) => {
    requireServerSecret(server_secret);
    const startOfYear = new Date(year, 0, 1).getTime();
    const endOfYear = new Date(year + 1, 0, 1).getTime();

    const ordersThisYear = await ctx.db
      .query("orders")
      .withIndex("by_created_at", (q) =>
        q.gte("created_at", startOfYear).lt("created_at", endOfYear),
      )
      .order("desc")
      .take(1_000);

    return ordersThisYear.filter((order) => order.order_number != null);
  },
});

export const listByUserWithItems = query({
  args: { server_secret: v.string(), user_id: v.string() },
  returns: v.array(accountOrderWithItemsValidator),
  handler: async (ctx, { server_secret, user_id }) => {
    requireServerSecret(server_secret);
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user_id", (q) => q.eq("user_id", user_id))
      .order("desc")
      .take(100);

    return await Promise.all(
      orders.map(async (order) => {
        const items = await ctx.db
          .query("orderItems")
          .withIndex("by_order", (q) => q.eq("order_id", order._id))
          .take(100);

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

async function hydrateOrdersWithItems(ctx: QueryCtx, orders: Doc<"orders">[]) {
  return await Promise.all(
    orders.map(async (order) => {
      const items = await ctx.db
        .query("orderItems")
        .withIndex("by_order", (q) => q.eq("order_id", order._id))
        .take(100);

      const itemsWithProducts = await Promise.all(
        items.map(async (item) => {
          const product = await ctx.db.get(item.product_id);
          return {
            ...item,
            product_name: product?.name || "Onbekend product",
            product_slug: product?.slug || "",
          };
        }),
      );

      return { ...order, items: itemsWithProducts };
    }),
  );
}

/**
 * Account order history. Orders created while signed in are matched by the
 * immutable Stack user id. Older guest orders may additionally be matched by
 * a verified account email; only the trusted Next.js server calls this query.
 */
export const listByAccountWithItems = query({
  args: {
    server_secret: v.string(),
    user_id: v.string(),
    verified_email: v.optional(v.string()),
  },
  returns: v.array(accountOrderWithItemsValidator),
  handler: async (ctx, { server_secret, user_id, verified_email }) => {
    requireServerSecret(server_secret);

    const normalizedEmail = verified_email?.trim().toLowerCase();
    const [userOrders, emailOrders] = await Promise.all([
      ctx.db
        .query("orders")
        .withIndex("by_user_id", (q) => q.eq("user_id", user_id))
        .order("desc")
        .take(100),
      normalizedEmail
        ? ctx.db
            .query("orders")
            .withIndex("by_email", (q) => q.eq("customer_email", normalizedEmail))
            .order("desc")
            .take(100)
        : Promise.resolve([]),
    ]);

    const uniqueOrders = new Map<string, Doc<"orders">>();
    for (const order of [...userOrders, ...emailOrders]) {
      uniqueOrders.set(String(order._id), order);
    }

    const orders = Array.from(uniqueOrders.values())
      .sort((a, b) => b.created_at - a.created_at)
      .slice(0, 100);

    return await hydrateOrdersWithItems(ctx, orders);
  },
});
