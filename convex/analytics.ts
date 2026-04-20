import { query } from "./_generated/server";
import { v } from "convex/values";

// Read-only snapshots for the audit. Exposed as queries (not actions) so they
// return live data with no side effects. Call via `npx convex run analytics:aov`.

export const aov = query({
  args: { days: v.optional(v.number()) },
  handler: async (ctx, { days = 90 }) => {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const all = await ctx.db
      .query("orders")
      .filter((q) => q.gte(q.field("created_at"), cutoff))
      .collect();

    const paid = all.filter((o) => o.status === "paid" || o.status === "processing" || o.status === "shipped" || o.status === "completed");

    const count = paid.length;
    const revenue = paid.reduce((s, o) => s + o.total_amount, 0);
    const aov = count > 0 ? revenue / count : 0;

    // Distribution of order values — helps pick a free-shipping threshold.
    const buckets = [0, 25, 50, 75, 100, 150, 200, 300, 500];
    const distribution = buckets.map((lower, i) => {
      const upper = buckets[i + 1] ?? Number.POSITIVE_INFINITY;
      const c = paid.filter((o) => o.total_amount >= lower && o.total_amount < upper).length;
      return { range: upper === Number.POSITIVE_INFINITY ? `≥€${lower}` : `€${lower}–€${upper}`, count: c };
    });

    return {
      windowDays: days,
      totalOrders: all.length,
      paidOrders: count,
      revenueEUR: revenue,
      aovEUR: Number(aov.toFixed(2)),
      distribution,
    };
  },
});
