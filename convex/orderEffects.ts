import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireServerSecret } from "./lib/serverSecret";
import { orderEffectStatusValidator, orderEffectTypeValidator } from "./validators";

const effectSummaryValidator = v.object({
  effect_id: v.id("orderEffects"),
  type: orderEffectTypeValidator,
  status: orderEffectStatusValidator,
});

export const listForOrder = query({
  args: {
    server_secret: v.string(),
    order_id: v.id("orders"),
  },
  returns: v.array(effectSummaryValidator),
  handler: async (ctx, { server_secret, order_id }) => {
    requireServerSecret(server_secret);
    const effects = await ctx.db
      .query("orderEffects")
      .withIndex("by_order_id", (q) => q.eq("order_id", order_id))
      .take(10);

    return effects.map((effect) => ({
      effect_id: effect._id,
      type: effect.type,
      status: effect.status,
    }));
  },
});

export const claimEffect = mutation({
  args: {
    server_secret: v.string(),
    effect_id: v.id("orderEffects"),
    claim_token: v.string(),
    lease_ms: v.number(),
  },
  returns: v.union(
    v.object({
      kind: v.literal("claimed"),
      effect: v.object({
        order_id: v.id("orders"),
        attempt_id: v.id("paymentAttempts"),
        type: orderEffectTypeValidator,
      }),
    }),
    v.object({ kind: v.literal("busy") }),
    v.object({ kind: v.literal("succeeded") }),
  ),
  handler: async (ctx, { server_secret, effect_id, claim_token, lease_ms }) => {
    requireServerSecret(server_secret);
    if (claim_token.length < 8 || claim_token.length > 200) {
      throw new Error("Invalid claim token");
    }
    if (!Number.isFinite(lease_ms) || lease_ms < 5_000 || lease_ms > 15 * 60 * 1_000) {
      throw new Error("Invalid effect lease");
    }

    const effect = await ctx.db.get(effect_id);
    if (!effect) return { kind: "busy" as const };
    if (effect.status === "succeeded") return { kind: "succeeded" as const };

    const now = Date.now();
    if (
      (effect.status === "processing" && (effect.lease_expires_at ?? 0) > now) ||
      (effect.status === "failed" && effect.retryable === false)
    ) {
      return { kind: "busy" as const };
    }

    await ctx.db.patch(effect_id, {
      status: "processing",
      claim_token,
      lease_expires_at: now + Math.floor(lease_ms),
      attempt_count: effect.attempt_count + 1,
      updated_at: now,
    });

    return {
      kind: "claimed" as const,
      effect: {
        order_id: effect.order_id,
        attempt_id: effect.attempt_id,
        type: effect.type,
      },
    };
  },
});

export const completeEffect = mutation({
  args: {
    server_secret: v.string(),
    effect_id: v.id("orderEffects"),
    claim_token: v.string(),
    provider_reference: v.optional(v.string()),
  },
  returns: v.boolean(),
  handler: async (
    ctx,
    { server_secret, effect_id, claim_token, provider_reference },
  ) => {
    requireServerSecret(server_secret);
    const effect = await ctx.db.get(effect_id);
    const now = Date.now();
    if (
      !effect ||
      effect.status !== "processing" ||
      effect.claim_token !== claim_token ||
      (effect.lease_expires_at ?? 0) < now
    ) {
      return false;
    }

    await ctx.db.patch(effect_id, {
      status: "succeeded",
      provider_reference: provider_reference?.slice(0, 500),
      retryable: false,
      completed_at: now,
      updated_at: now,
    });
    return true;
  },
});

export const failEffect = mutation({
  args: {
    server_secret: v.string(),
    effect_id: v.id("orderEffects"),
    claim_token: v.string(),
    error: v.string(),
    retryable: v.boolean(),
  },
  returns: v.boolean(),
  handler: async (
    ctx,
    { server_secret, effect_id, claim_token, error, retryable },
  ) => {
    requireServerSecret(server_secret);
    const effect = await ctx.db.get(effect_id);
    const now = Date.now();
    if (
      !effect ||
      effect.status !== "processing" ||
      effect.claim_token !== claim_token ||
      (effect.lease_expires_at ?? 0) < now
    ) {
      return false;
    }

    await ctx.db.patch(effect_id, {
      status: "failed",
      last_error: error.slice(0, 1_000),
      retryable,
      lease_expires_at: now,
      updated_at: now,
    });
    return true;
  },
});

