import { v } from "convex/values";
import { mutation, query, type MutationCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";
import { requireServerSecret } from "./lib/serverSecret";
import { PAID_ORDER_EFFECT_TYPES } from "./lib/paidOrderEffectTypes";

const ACTIVE_ATTEMPT_STATUSES = new Set(["open", "pending", "authorized"]);
const RETRYABLE_TERMINAL_STATUSES = new Set(["failed", "canceled", "expired"]);
const PAID_ORDER_STATUSES = new Set(["paid", "processing", "shipped", "completed"]);

const reserveResultValidator = v.union(
  v.object({ kind: v.literal("not_found") }),
  v.object({ kind: v.literal("already_paid") }),
  v.object({
    kind: v.literal("not_retryable"),
    payment_status: v.union(v.string(), v.null()),
  }),
  v.object({
    kind: v.literal("in_progress"),
    attempt_id: v.id("paymentAttempts"),
  }),
  v.object({
    kind: v.literal("reusable"),
    attempt_id: v.id("paymentAttempts"),
    provider_payment_id: v.string(),
    checkout_url: v.string(),
  }),
  v.object({
    kind: v.literal("reserved"),
    attempt_id: v.id("paymentAttempts"),
    amount_cents: v.number(),
    currency: v.literal("EUR"),
  }),
);

const mollieStatusResultValidator = v.union(
  v.object({ kind: v.literal("rejected"), reason: v.string() }),
  v.object({
    kind: v.literal("noop"),
    order_id: v.id("orders"),
    attempt_id: v.id("paymentAttempts"),
  }),
  v.object({
    kind: v.literal("updated"),
    order_id: v.id("orders"),
    attempt_id: v.id("paymentAttempts"),
  }),
  v.object({
    kind: v.literal("first_paid"),
    order_id: v.id("orders"),
    attempt_id: v.id("paymentAttempts"),
  }),
);

type AttemptStatus = Doc<"paymentAttempts">["status"];

function isOrderPaid(order: Doc<"orders">): boolean {
  return (
    order.paid_at != null ||
    order.paid_payment_attempt_id != null ||
    order.payment_status === "paid" ||
    PAID_ORDER_STATUSES.has(order.status)
  );
}

function amountToCents(amount: number): number {
  const cents = Math.round((amount + Number.EPSILON) * 100);
  if (!Number.isSafeInteger(cents) || cents < 1) {
    throw new Error("Invalid order amount");
  }
  return cents;
}

function normalizeLegacyStatus(paymentStatus?: string): AttemptStatus {
  switch (paymentStatus) {
    case "pending":
    case "authorized":
    case "paid":
    case "failed":
    case "expired":
      return paymentStatus;
    case "cancelled":
    case "canceled":
      return "canceled";
    case "open":
    default:
      // Unknown legacy provider states are treated as active. Blocking a retry
      // is safer than accidentally creating two simultaneous payments.
      return "open";
  }
}

function orderStatusForProviderStatus(
  providerStatus: Exclude<AttemptStatus, "creating" | "paid">,
): "pending" | "cancelled" {
  return providerStatus === "failed" ||
    providerStatus === "canceled" ||
    providerStatus === "expired"
    ? "cancelled"
    : "pending";
}

function canApplyStatus(current: AttemptStatus, incoming: AttemptStatus): boolean {
  if (current === "paid") return false;
  if (incoming === "paid") return true;

  if (current === "failed" || current === "canceled" || current === "expired") {
    return false;
  }

  if (incoming === "failed" || incoming === "canceled" || incoming === "expired") {
    return true;
  }

  const rank: Record<"creating" | "open" | "pending" | "authorized", number> = {
    creating: 0,
    open: 1,
    pending: 2,
    authorized: 3,
  };

  return rank[incoming as keyof typeof rank] > rank[current as keyof typeof rank];
}

async function allocateOrderNumber(
  ctx: MutationCtx,
  order: Doc<"orders">,
  paidAt: number,
): Promise<string> {
  if (order.order_number) return order.order_number;

  const year = new Date(paidAt).getUTCFullYear();
  const existingCounter = await ctx.db
    .query("orderCounters")
    .withIndex("by_year", (q) => q.eq("year", year))
    .unique();

  let nextNumber: number;
  if (existingCounter) {
    nextNumber = existingCounter.last_number + 1;
    await ctx.db.patch(existingCounter._id, {
      last_number: nextNumber,
      updated_at: Date.now(),
    });
  } else {
    // Safe migration path for deployments that already issued order numbers
    // before the counter table existed.
    const prefix = `ORD-${year}-`;
    const existingOrders = await ctx.db
      .query("orders")
      .withIndex("by_order_number", (q) =>
        q.gte("order_number", prefix).lt("order_number", `${prefix}\uffff`),
      )
      .order("desc")
      .take(5_000);

    let largestExisting = 0;
    for (const existingOrder of existingOrders) {
      if (!existingOrder.order_number?.startsWith(prefix)) continue;
      const suffix = Number.parseInt(existingOrder.order_number.slice(prefix.length), 10);
      if (Number.isSafeInteger(suffix) && suffix > largestExisting) {
        largestExisting = suffix;
      }
    }

    nextNumber = largestExisting + 1;
    await ctx.db.insert("orderCounters", {
      year,
      last_number: nextNumber,
      updated_at: Date.now(),
    });
  }

  return `ORD-${year}-${String(nextNumber).padStart(4, "0")}`;
}

async function createPaidOrderEffects(
  ctx: MutationCtx,
  orderId: Id<"orders">,
  attemptId: Id<"paymentAttempts">,
  now: number,
): Promise<void> {
  for (const type of PAID_ORDER_EFFECT_TYPES) {
    const existing = await ctx.db
      .query("orderEffects")
      .withIndex("by_order_id_and_type", (q) =>
        q.eq("order_id", orderId).eq("type", type),
      )
      .unique();

    if (!existing) {
      await ctx.db.insert("orderEffects", {
        order_id: orderId,
        attempt_id: attemptId,
        type,
        status: "pending",
        attempt_count: 0,
        created_at: now,
        updated_at: now,
      });
    }
  }
}

async function insertCreatingAttempt(
  ctx: MutationCtx,
  orderId: Id<"orders">,
  kind: "checkout" | "retry",
  requestKey: string,
  amountCents: number,
  now: number,
): Promise<Id<"paymentAttempts">> {
  return await ctx.db.insert("paymentAttempts", {
    order_id: orderId,
    kind,
    request_key: requestKey,
    amount_cents: amountCents,
    currency: "EUR",
    status: "creating",
    created_at: now,
    updated_at: now,
  });
}

async function findBlockingCreatingAttempt(
  ctx: MutationCtx,
  attempts: Array<Doc<"paymentAttempts">>,
  now: number,
): Promise<Doc<"paymentAttempts"> | null> {
  let blocking: Doc<"paymentAttempts"> | null = null;

  for (const attempt of attempts) {
    if (attempt.status !== "creating") continue;
    const isStaleAndUnbound =
      attempt.provider_payment_id == null &&
      attempt.created_at <= now - 55 * 60 * 1_000;

    if (isStaleAndUnbound) {
      await ctx.db.patch(attempt._id, {
        request_key: `retired:${attempt._id}:${now}`,
        status: "failed",
        failure_reason: "Provider idempotency window elapsed",
        updated_at: now,
      });
    } else if (!blocking) {
      blocking = attempt;
    }
  }

  return blocking;
}

export const getRetryContext = query({
  args: {
    server_secret: v.string(),
    order_id: v.id("orders"),
  },
  returns: v.union(
    v.object({ kind: v.literal("not_found") }),
    v.object({ kind: v.literal("paid") }),
    v.object({
      kind: v.literal("retryable"),
      order: v.object({
        id: v.id("orders"),
        customer_name: v.union(v.string(), v.null()),
        total_amount: v.number(),
        payment_status: v.union(v.string(), v.null()),
      }),
    }),
  ),
  handler: async (ctx, { server_secret, order_id }) => {
    requireServerSecret(server_secret);
    const order = await ctx.db.get(order_id);
    if (!order) return { kind: "not_found" as const };
    if (isOrderPaid(order)) return { kind: "paid" as const };

    return {
      kind: "retryable" as const,
      order: {
        id: order._id,
        customer_name: order.customer_name ?? null,
        total_amount: order.total_amount,
        payment_status: order.payment_status ?? null,
      },
    };
  },
});

export const reserveAttempt = mutation({
  args: {
    server_secret: v.string(),
    order_id: v.id("orders"),
    kind: v.union(v.literal("checkout"), v.literal("retry")),
    request_key: v.string(),
  },
  returns: reserveResultValidator,
  handler: async (ctx, { server_secret, order_id, kind, request_key }) => {
    requireServerSecret(server_secret);
    if (request_key.length < 8 || request_key.length > 200) {
      throw new Error("Invalid request key");
    }

    const order = await ctx.db.get(order_id);
    if (!order) return { kind: "not_found" as const };
    if (isOrderPaid(order)) return { kind: "already_paid" as const };

    const amountCents = amountToCents(order.total_amount);
    const existingForRequest = await ctx.db
      .query("paymentAttempts")
      .withIndex("by_order_id_and_request_key", (q) =>
        q.eq("order_id", order_id).eq("request_key", request_key),
      )
      .unique();

    if (existingForRequest) {
      if (existingForRequest.status === "paid") {
        return { kind: "already_paid" as const };
      }

      const now = Date.now();
      // Mollie documents a one-hour idempotency retention window. Stay a few
      // minutes inside that boundary so every repeated create with this same
      // attempt ID is guaranteed to resolve to the same provider payment.
      const withinProviderIdempotencyWindow =
        existingForRequest.created_at > now - 55 * 60 * 1_000;
      const localCreationFailure =
        existingForRequest.status === "failed" &&
        existingForRequest.provider_payment_id == null;

      if (
        existingForRequest.provider_payment_id == null &&
        (existingForRequest.status === "creating" || localCreationFailure)
      ) {
        if (withinProviderIdempotencyWindow) {
          if (localCreationFailure) {
            await ctx.db.patch(existingForRequest._id, {
              status: "creating",
              failure_reason: undefined,
              updated_at: now,
            });
          }
          return {
            kind: "reserved" as const,
            attempt_id: existingForRequest._id,
            amount_cents: amountCents,
            currency: "EUR" as const,
          };
        }

        // After Mollie's retention window the same provider idempotency key
        // may legally create a second payment. Preserve the old attempt for a
        // late metadata-bound webhook, retire its request-key slot, and use a
        // fresh attempt identity for the next provider create.
        await ctx.db.patch(existingForRequest._id, {
          request_key: `retired:${existingForRequest._id}:${now}`,
          status: "failed",
          failure_reason: "Provider idempotency window elapsed",
          updated_at: now,
        });
        const replacementId = await insertCreatingAttempt(
          ctx,
          order_id,
          kind,
          request_key,
          amountCents,
          now,
        );
        return {
          kind: "reserved" as const,
          attempt_id: replacementId,
          amount_cents: amountCents,
          currency: "EUR" as const,
        };
      }

      if (RETRYABLE_TERMINAL_STATUSES.has(existingForRequest.status)) {
        const siblingAttempts = await ctx.db
          .query("paymentAttempts")
          .withIndex("by_order_id", (q) => q.eq("order_id", order_id))
          .order("desc")
          .take(50);

        if (siblingAttempts.some((attempt) => attempt.status === "paid")) {
          return { kind: "already_paid" as const };
        }
        const siblingCreating = await findBlockingCreatingAttempt(
          ctx,
          siblingAttempts.filter((attempt) => attempt._id !== existingForRequest._id),
          now,
        );
        if (siblingCreating) {
          return {
            kind: "in_progress" as const,
            attempt_id: siblingCreating._id,
          };
        }
        const siblingActive = siblingAttempts.find(
          (attempt) =>
            attempt._id !== existingForRequest._id &&
            ACTIVE_ATTEMPT_STATUSES.has(attempt.status),
        );
        if (siblingActive) {
          if (siblingActive.provider_payment_id && siblingActive.checkout_url) {
            return {
              kind: "reusable" as const,
              attempt_id: siblingActive._id,
              provider_payment_id: siblingActive.provider_payment_id,
              checkout_url: siblingActive.checkout_url,
            };
          }
          return {
            kind: "not_retryable" as const,
            payment_status: siblingActive.status,
          };
        }

        // The provider payment is terminal, but must remain bound for late or
        // duplicate webhooks. Only retire the caller request-key slot.
        await ctx.db.patch(existingForRequest._id, {
          request_key: `retired:${existingForRequest._id}:${now}`,
          updated_at: now,
        });
        const replacementId = await insertCreatingAttempt(
          ctx,
          order_id,
          kind,
          request_key,
          amountCents,
          now,
        );
        return {
          kind: "reserved" as const,
          attempt_id: replacementId,
          amount_cents: amountCents,
          currency: "EUR" as const,
        };
      }

      if (existingForRequest.status === "creating") {
        return {
          kind: "in_progress" as const,
          attempt_id: existingForRequest._id,
        };
      }
      if (
        ACTIVE_ATTEMPT_STATUSES.has(existingForRequest.status) &&
        existingForRequest.provider_payment_id &&
        existingForRequest.checkout_url
      ) {
        return {
          kind: "reusable" as const,
          attempt_id: existingForRequest._id,
          provider_payment_id: existingForRequest.provider_payment_id,
          checkout_url: existingForRequest.checkout_url,
        };
      }
      return {
        kind: "not_retryable" as const,
        payment_status: existingForRequest.status,
      };
    }

    const attempts = await ctx.db
      .query("paymentAttempts")
      .withIndex("by_order_id", (q) => q.eq("order_id", order_id))
      .order("desc")
      .take(50);

    if (attempts.some((attempt) => attempt.status === "paid")) {
      return { kind: "already_paid" as const };
    }

    // Backfill the provider identity used by pre-ledger orders before a retry
    // is allowed. This keeps late webhooks from the legacy payment resolvable.
    if (order.payment_id) {
      const boundAttempt = await ctx.db
        .query("paymentAttempts")
        .withIndex("by_provider_payment_id", (q) =>
          q.eq("provider_payment_id", order.payment_id),
        )
        .unique();

      if (!boundAttempt) {
        const legacyStatus = normalizeLegacyStatus(order.payment_status);
        await ctx.db.insert("paymentAttempts", {
          order_id,
          kind: "legacy",
          request_key: `legacy:${order.payment_id}`,
          amount_cents: amountCents,
          currency: "EUR",
          status: legacyStatus,
          provider_payment_id: order.payment_id,
          created_at: order.created_at,
          updated_at: Date.now(),
        });

        if (legacyStatus === "paid") {
          return { kind: "already_paid" as const };
        }
        if (ACTIVE_ATTEMPT_STATUSES.has(legacyStatus)) {
          return {
            kind: "not_retryable" as const,
            payment_status: order.payment_status ?? legacyStatus,
          };
        }
      } else if (boundAttempt.order_id !== order_id) {
        throw new Error("Provider payment is bound to another order");
      }
    }

    const inProgress = await findBlockingCreatingAttempt(ctx, attempts, Date.now());
    if (inProgress) {
      return { kind: "in_progress" as const, attempt_id: inProgress._id };
    }

    const active = attempts.find((attempt) => ACTIVE_ATTEMPT_STATUSES.has(attempt.status));
    if (active) {
      if (active.provider_payment_id && active.checkout_url) {
        return {
          kind: "reusable" as const,
          attempt_id: active._id,
          provider_payment_id: active.provider_payment_id,
          checkout_url: active.checkout_url,
        };
      }
      return {
        kind: "not_retryable" as const,
        payment_status: active.status,
      };
    }

    const now = Date.now();
    const attemptId = await insertCreatingAttempt(
      ctx,
      order_id,
      kind,
      request_key,
      amountCents,
      now,
    );

    return {
      kind: "reserved" as const,
      attempt_id: attemptId,
      amount_cents: amountCents,
      currency: "EUR" as const,
    };
  },
});

export const attachProviderPayment = mutation({
  args: {
    server_secret: v.string(),
    attempt_id: v.id("paymentAttempts"),
    provider_payment_id: v.string(),
    checkout_url: v.string(),
    provider_status: v.union(
      v.literal("open"),
      v.literal("pending"),
      v.literal("authorized"),
    ),
  },
  returns: v.object({
    kind: v.union(v.literal("attached"), v.literal("already_attached")),
    provider_payment_id: v.string(),
    checkout_url: v.string(),
  }),
  handler: async (
    ctx,
    { server_secret, attempt_id, provider_payment_id, checkout_url, provider_status },
  ) => {
    requireServerSecret(server_secret);
    if (!provider_payment_id || !checkout_url) {
      throw new Error("Invalid provider payment");
    }

    const attempt = await ctx.db.get(attempt_id);
    if (!attempt) throw new Error("Payment attempt not found");

    const existingBinding = await ctx.db
      .query("paymentAttempts")
      .withIndex("by_provider_payment_id", (q) =>
        q.eq("provider_payment_id", provider_payment_id),
      )
      .unique();
    if (existingBinding && existingBinding._id !== attempt_id) {
      throw new Error("Provider payment is already bound");
    }

    if (attempt.provider_payment_id) {
      if (attempt.provider_payment_id !== provider_payment_id) {
        throw new Error("Payment attempt is already bound");
      }
      const stableCheckoutUrl = attempt.checkout_url ?? checkout_url;
      if (!attempt.checkout_url) {
        await ctx.db.patch(attempt_id, {
          checkout_url: stableCheckoutUrl,
          updated_at: Date.now(),
        });
      }
      return {
        kind: "already_attached" as const,
        provider_payment_id,
        checkout_url: stableCheckoutUrl,
      };
    }

    if (attempt.status !== "creating") {
      throw new Error("Payment attempt cannot be attached");
    }

    const now = Date.now();
    await ctx.db.patch(attempt_id, {
      provider_payment_id,
      checkout_url,
      status: provider_status,
      updated_at: now,
    });

    const order = await ctx.db.get(attempt.order_id);
    if (!order) throw new Error("Order not found");
    if (!isOrderPaid(order)) {
      await ctx.db.patch(order._id, {
        status: "pending",
        payment_id: provider_payment_id,
        payment_status: provider_status,
        updated_at: now,
      });
    }

    return {
      kind: "attached" as const,
      provider_payment_id,
      checkout_url,
    };
  },
});

export const failAttemptCreation = mutation({
  args: {
    server_secret: v.string(),
    attempt_id: v.id("paymentAttempts"),
    reason: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, { server_secret, attempt_id, reason }) => {
    requireServerSecret(server_secret);
    const attempt = await ctx.db.get(attempt_id);
    if (attempt?.status === "creating" && attempt.provider_payment_id == null) {
      await ctx.db.patch(attempt_id, {
        status: "failed",
        failure_reason: reason.slice(0, 1_000),
        updated_at: Date.now(),
      });
    }
    return null;
  },
});

export const applyMollieStatus = mutation({
  args: {
    server_secret: v.string(),
    provider_payment_id: v.string(),
    provider_status: v.union(
      v.literal("open"),
      v.literal("pending"),
      v.literal("authorized"),
      v.literal("paid"),
      v.literal("failed"),
      v.literal("canceled"),
      v.literal("expired"),
    ),
    amount_cents: v.number(),
    currency: v.literal("EUR"),
    metadata_order_id: v.id("orders"),
    metadata_attempt_id: v.optional(v.id("paymentAttempts")),
    observed_at: v.number(),
  },
  returns: mollieStatusResultValidator,
  handler: async (
    ctx,
    {
      server_secret,
      provider_payment_id,
      provider_status,
      amount_cents,
      currency,
      metadata_order_id,
      metadata_attempt_id,
      observed_at,
    },
  ) => {
    requireServerSecret(server_secret);
    if (!Number.isSafeInteger(amount_cents) || amount_cents < 1) {
      return { kind: "rejected" as const, reason: "invalid_amount" };
    }
    if (!Number.isFinite(observed_at) || observed_at < 1) {
      return { kind: "rejected" as const, reason: "invalid_observed_at" };
    }

    let attempt = await ctx.db
      .query("paymentAttempts")
      .withIndex("by_provider_payment_id", (q) =>
        q.eq("provider_payment_id", provider_payment_id),
      )
      .unique();

    const order = await ctx.db.get(metadata_order_id);
    if (!order) {
      return { kind: "rejected" as const, reason: "order_not_found" };
    }

    // Crash recovery: Mollie may have created the payment while the follow-up
    // attach mutation failed. Verified provider metadata can bind that exact
    // still-creating attempt here, but never an arbitrary or terminal row.
    if (!attempt) {
      if (metadata_attempt_id) {
        const metadataAttempt = await ctx.db.get(metadata_attempt_id);
        if (
          !metadataAttempt ||
          (metadataAttempt.status !== "creating" && metadataAttempt.status !== "failed") ||
          metadataAttempt.provider_payment_id != null ||
          metadataAttempt.order_id !== metadata_order_id
        ) {
          return { kind: "rejected" as const, reason: "attempt_not_bound" };
        }
        attempt = metadataAttempt;
      } else {
        // Rollout compatibility for provider payments created before the
        // attempt ledger existed. The order's already stored provider ID plus
        // exact amount/currency form the one allowed legacy binding path.
        if (
          order.payment_id !== provider_payment_id ||
          amountToCents(order.total_amount) !== amount_cents ||
          currency !== "EUR"
        ) {
          return { kind: "rejected" as const, reason: "legacy_binding_mismatch" };
        }
        const now = Date.now();
        const legacyAttemptId = await ctx.db.insert("paymentAttempts", {
          order_id: order._id,
          kind: "legacy",
          request_key: `legacy:${provider_payment_id}`,
          amount_cents,
          currency: "EUR",
          status: "creating",
          provider_payment_id,
          created_at: order.created_at,
          updated_at: now,
        });
        attempt = await ctx.db.get(legacyAttemptId);
        if (!attempt) {
          return { kind: "rejected" as const, reason: "legacy_binding_failed" };
        }
      }
    }

    if (metadata_attempt_id && attempt._id !== metadata_attempt_id) {
      return { kind: "rejected" as const, reason: "attempt_metadata_mismatch" };
    }
    if (!metadata_attempt_id && attempt.kind !== "legacy") {
      return { kind: "rejected" as const, reason: "missing_attempt_metadata" };
    }
    if (attempt.order_id !== metadata_order_id) {
      return { kind: "rejected" as const, reason: "order_metadata_mismatch" };
    }
    if (attempt.amount_cents !== amount_cents || attempt.currency !== currency) {
      return { kind: "rejected" as const, reason: "amount_or_currency_mismatch" };
    }

    if (amountToCents(order.total_amount) !== amount_cents) {
      return { kind: "rejected" as const, reason: "order_amount_mismatch" };
    }

    if (!canApplyStatus(attempt.status, provider_status)) {
      return {
        kind: "noop" as const,
        order_id: order._id,
        attempt_id: attempt._id,
      };
    }

    const now = Date.now();
    await ctx.db.patch(attempt._id, {
      provider_payment_id,
      status: provider_status,
      observed_at,
      paid_at: provider_status === "paid" ? observed_at : undefined,
      updated_at: now,
    });

    if (provider_status === "paid") {
      const firstPaid = !isOrderPaid(order);
      if (firstPaid) {
        const orderNumber = await allocateOrderNumber(ctx, order, observed_at);
        await ctx.db.patch(order._id, {
          order_number: orderNumber,
          status: "processing",
          payment_id: provider_payment_id,
          payment_status: "paid",
          paid_at: observed_at,
          paid_payment_attempt_id: attempt._id,
          recovery_state: "recovered",
          updated_at: now,
        });
        await createPaidOrderEffects(ctx, order._id, attempt._id, now);
        return {
          kind: "first_paid" as const,
          order_id: order._id,
          attempt_id: attempt._id,
        };
      }

      return {
        kind: "updated" as const,
        order_id: order._id,
        attempt_id: attempt._id,
      };
    }

    // A late webhook from an older attempt may update that attempt, but never
    // replace the current provider identity or demote a paid order.
    if (!isOrderPaid(order) && (!order.payment_id || order.payment_id === provider_payment_id)) {
      await ctx.db.patch(order._id, {
        status: orderStatusForProviderStatus(provider_status),
        payment_id: provider_payment_id,
        payment_status: provider_status,
        updated_at: now,
      });
    }

    return {
      kind: "updated" as const,
      order_id: order._id,
      attempt_id: attempt._id,
    };
  },
});
