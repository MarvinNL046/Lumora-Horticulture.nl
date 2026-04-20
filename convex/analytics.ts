import { query } from "./_generated/server";
import { v } from "convex/values";

const DAY = 24 * 60 * 60 * 1000;

// Read-only snapshots for the audit. Exposed as queries (not actions) so they
// return live data with no side effects. Call via `npx convex run analytics:aov`
// or render through the /admin/metrics page.

const PAID_STATUSES = new Set(["paid", "processing", "shipped", "completed"]);

export const aov = query({
  args: { days: v.optional(v.number()) },
  handler: async (ctx, { days = 90 }) => {
    const cutoff = Date.now() - days * DAY;
    const all = await ctx.db
      .query("orders")
      .filter((q) => q.gte(q.field("created_at"), cutoff))
      .collect();

    const paid = all.filter((o) => PAID_STATUSES.has(o.status));

    const count = paid.length;
    const revenue = paid.reduce((s, o) => s + o.total_amount, 0);
    const aov = count > 0 ? revenue / count : 0;

    // Distribution of order values — helps pick a free-shipping threshold.
    const buckets = [0, 25, 50, 75, 100, 150, 200, 300, 500];
    const distribution = buckets.map((lower, i) => {
      const upper = buckets[i + 1] ?? Number.POSITIVE_INFINITY;
      const c = paid.filter((o) => o.total_amount >= lower && o.total_amount < upper).length;
      return {
        range: upper === Number.POSITIVE_INFINITY ? `≥€${lower}` : `€${lower}–€${upper}`,
        count: c,
      };
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

// Comprehensive baseline — everything we need to measure the CRO work's impact
// in 30 days. Returns three rolling windows (7/30/90 d) side by side.
export const baseline = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const windows = [7, 30, 90] as const;

    const allOrders = await ctx.db.query("orders").collect();
    const allCarts = await ctx.db.query("abandonedCarts").collect();

    const windowStats = windows.map((days) => {
      const cutoff = now - days * DAY;
      const orders = allOrders.filter((o) => o.created_at >= cutoff);
      const paid = orders.filter((o) => PAID_STATUSES.has(o.status));
      const revenue = paid.reduce((s, o) => s + o.total_amount, 0);
      const aovCents = paid.length > 0 ? revenue / paid.length : 0;

      // Status distribution — catches "tonnes of pending that never converted".
      const byStatus: Record<string, number> = {};
      for (const o of orders) byStatus[o.status] = (byStatus[o.status] ?? 0) + 1;

      // Recovery funnel — how many abandoned carts actually came back.
      const carts = allCarts.filter((c) => c.created_at >= cutoff);
      const recovered = carts.filter((c) => c.recovered).length;
      const reminded = carts.filter((c) => c.reminded_at != null).length;

      // Delivery preference split — are people picking pickup points?
      const pickupCount = paid.filter(
        (o) => (o as any).delivery_preference?.kind === "pickup",
      ).length;
      const homeCount = paid.filter(
        (o) => (o as any).delivery_preference?.kind === "home",
      ).length;

      return {
        windowDays: days,
        totalOrders: orders.length,
        paidOrders: paid.length,
        revenueEUR: Number(revenue.toFixed(2)),
        aovEUR: Number(aovCents.toFixed(2)),
        statusBreakdown: byStatus,
        abandonedCarts: {
          created: carts.length,
          reminderSent: reminded,
          recovered,
          recoveryRatePct:
            reminded > 0 ? Number(((recovered / reminded) * 100).toFixed(1)) : 0,
        },
        delivery: {
          pickup: pickupCount,
          home: homeCount,
          noPreference: paid.length - pickupCount - homeCount,
        },
      };
    });

    // Trailing 90d top products — which SKUs actually move.
    const cutoff90 = now - 90 * DAY;
    const paid90 = allOrders.filter(
      (o) => PAID_STATUSES.has(o.status) && o.created_at >= cutoff90,
    );
    const itemsTable: Record<string, { units: number; revenueEUR: number; name: string }> = {};
    for (const order of paid90) {
      const items = await ctx.db
        .query("orderItems")
        .withIndex("by_order", (q) => q.eq("order_id", order._id))
        .collect();
      for (const item of items) {
        const p = await ctx.db.get(item.product_id);
        const key = String(item.product_id);
        const row = itemsTable[key] ?? {
          units: 0,
          revenueEUR: 0,
          name: p?.name ?? "?",
        };
        row.units += item.quantity;
        row.revenueEUR += item.quantity * item.price_at_purchase;
        itemsTable[key] = row;
      }
    }
    const topProducts = Object.entries(itemsTable)
      .map(([id, v]) => ({
        productId: id,
        name: v.name,
        units: v.units,
        revenueEUR: Number(v.revenueEUR.toFixed(2)),
      }))
      .sort((a, b) => b.revenueEUR - a.revenueEUR)
      .slice(0, 10);

    return {
      snapshotAt: now,
      windows: windowStats,
      topProducts90d: topProducts,
    };
  },
});
