import { redirect } from 'next/navigation';
import { stackServerApp } from '@/stack/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/../convex/_generated/api';

// ADMIN_EMAILS is a comma-separated list on the server (no NEXT_PUBLIC_ prefix
// so it doesn't leak to the client bundle). Anyone outside the list gets
// redirected to /account — no 403 page, no information leak.
function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS ?? '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  return allow.includes(email.toLowerCase());
}

function fmtEUR(n: number): string {
  return `€${n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function AdminMetricsPage({ params }: { params: { locale: string } }) {
  const user = await stackServerApp.getUser();
  if (!user) redirect('/handler/signin');
  if (!isAdmin(user.primaryEmail)) redirect(`/${params.locale}/account`);

  const data = await fetchQuery(api.analytics.baseline, {});
  const snapshotDate = new Date(data.snapshotAt).toLocaleString('nl-NL');

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-lumora-dark">Baseline metrics</h1>
          <p className="text-sm text-lumora-dark/60 mt-1">Snapshot genomen op {snapshotDate}. Screenshot deze pagina nu — in 30 dagen vergelijken we.</p>
        </div>

        {/* Window comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {data.windows.map((w) => (
            <div key={w.windowDays} className="bg-white rounded-2xl shadow-soft-lg p-6 border border-lumora-dark/10">
              <div className="text-xs font-mono uppercase tracking-wider text-lumora-dark/60 mb-1">Laatste {w.windowDays} dagen</div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Metric label="Omzet" value={fmtEUR(w.revenueEUR)} />
                <Metric label="Betaalde orders" value={String(w.paidOrders)} />
                <Metric label="AOV" value={fmtEUR(w.aovEUR)} />
                <Metric label="Totaal orders" value={String(w.totalOrders)} />
              </div>

              <div className="mt-5">
                <div className="text-xs font-mono uppercase tracking-wider text-lumora-dark/60 mb-2">Status</div>
                <ul className="text-sm space-y-1">
                  {Object.entries(w.statusBreakdown).map(([status, count]) => (
                    <li key={status} className="flex justify-between">
                      <span className="text-lumora-dark/70">{status}</span>
                      <span className="font-medium text-lumora-dark">{count}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <div className="text-xs font-mono uppercase tracking-wider text-lumora-dark/60 mb-2">Abandoned carts</div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-lumora-dark/70">aangemaakt</span><span>{w.abandonedCarts.created}</span></div>
                  <div className="flex justify-between"><span className="text-lumora-dark/70">mail verstuurd</span><span>{w.abandonedCarts.reminderSent}</span></div>
                  <div className="flex justify-between"><span className="text-lumora-dark/70">teruggewonnen</span><span>{w.abandonedCarts.recovered}</span></div>
                  <div className="flex justify-between font-semibold"><span className="text-lumora-dark">recovery %</span><span className="text-lumora-green-600">{w.abandonedCarts.recoveryRatePct}%</span></div>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-mono uppercase tracking-wider text-lumora-dark/60 mb-2">Bezorgkeuze (betaalde orders)</div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-lumora-dark/70">thuis</span><span>{w.delivery.home}</span></div>
                  <div className="flex justify-between"><span className="text-lumora-dark/70">afhaalpunt</span><span>{w.delivery.pickup}</span></div>
                  <div className="flex justify-between"><span className="text-lumora-dark/70">geen voorkeur</span><span>{w.delivery.noPreference}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top products */}
        <div className="bg-white rounded-2xl shadow-soft-lg p-6 border border-lumora-dark/10">
          <h2 className="text-xl font-display font-bold text-lumora-dark mb-4">Top 10 producten — laatste 90 dagen</h2>
          {data.topProducts90d.length === 0 ? (
            <p className="text-sm text-lumora-dark/60">Nog geen betaalde orders in deze periode.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-mono uppercase tracking-wider text-lumora-dark/60 border-b border-lumora-dark/10">
                    <th className="py-2">#</th>
                    <th className="py-2">Product</th>
                    <th className="py-2 text-right">Stuks</th>
                    <th className="py-2 text-right">Omzet</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topProducts90d.map((p, i) => (
                    <tr key={p.productId} className="border-b border-lumora-dark/5">
                      <td className="py-3 text-lumora-dark/50">{i + 1}</td>
                      <td className="py-3 text-lumora-dark">{p.name}</td>
                      <td className="py-3 text-right font-medium">{p.units}</td>
                      <td className="py-3 text-right font-bold text-lumora-green-600">{fmtEUR(p.revenueEUR)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-lumora-dark/40 mt-6">
          Ingelogd als {user.primaryEmail} · Admin · Pagina is alleen zichtbaar voor adressen in ADMIN_EMAILS.
        </p>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-lumora-dark/60">{label}</div>
      <div className="text-xl font-display font-bold text-lumora-dark">{value}</div>
    </div>
  );
}
