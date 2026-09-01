import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireServerSecret } from "./lib/serverSecret";

const MINIMUM_WINDOW_MS = 10_000;
const MAXIMUM_WINDOW_MS = 60 * 60 * 1_000;
const MAXIMUM_LIMIT = 1_000;
const MAXIMUM_CLEANUP_ROWS = 25;

export const consume = mutation({
  args: {
    server_secret: v.string(),
    route: v.string(),
    key_hash: v.string(),
    limit: v.number(),
    window_ms: v.number(),
  },
  handler: async (ctx, { server_secret, route, key_hash, limit, window_ms }) => {
    requireServerSecret(server_secret);

    if (
      !/^[a-z0-9:_/-]{1,80}$/i.test(route) ||
      !/^[a-f0-9]{64}$/.test(key_hash) ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > MAXIMUM_LIMIT ||
      !Number.isInteger(window_ms) ||
      window_ms < MINIMUM_WINDOW_MS ||
      window_ms > MAXIMUM_WINDOW_MS
    ) {
      throw new Error("Invalid rate-limit configuration");
    }

    const now = Date.now();
    const windowStart = Math.floor(now / window_ms) * window_ms;
    const windowEnd = windowStart + window_ms;

    const expired = await ctx.db
      .query("requestRateLimits")
      .withIndex("by_expires_at", (query) => query.lt("expires_at", now))
      .take(MAXIMUM_CLEANUP_ROWS);
    for (const row of expired) {
      await ctx.db.delete(row._id);
    }

    const existing = await ctx.db
      .query("requestRateLimits")
      .withIndex("by_route_key_window", (query) =>
        query
          .eq("route", route)
          .eq("key_hash", key_hash)
          .eq("window_start", windowStart),
      )
      .unique();

    const retryAfterSeconds = Math.max(1, Math.ceil((windowEnd - now) / 1_000));

    if (existing && existing.count >= limit) {
      return {
        allowed: false,
        limit,
        remaining: 0,
        retry_after_seconds: retryAfterSeconds,
      };
    }

    const nextCount = (existing?.count ?? 0) + 1;
    if (existing) {
      await ctx.db.patch(existing._id, {
        count: nextCount,
        updated_at: now,
      });
    } else {
      await ctx.db.insert("requestRateLimits", {
        route,
        key_hash,
        window_start: windowStart,
        count: nextCount,
        expires_at: windowEnd + window_ms,
        updated_at: now,
      });
    }

    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - nextCount),
      retry_after_seconds: retryAfterSeconds,
    };
  },
});
