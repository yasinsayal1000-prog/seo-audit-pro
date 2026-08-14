import { useState, useMemo } from "react";
import { Search, Mail, Globe, ArrowRight, UserPlus, Plus } from "lucide-react";
import { mockClients } from "@/mockData";
import { scoreColor, formatDate } from "@/lib/seo";

const clientStatusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  active: { label: "Active", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  pending: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  churned: { label: "Churned", bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
};

export function ClientsScreen({ onOpenClientAudit, onAddClient }: { onOpenClientAudit: (clientEmail: string) => void; onAddClient: () => void }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return mockClients.filter((c) => {
      const q = query.toLowerCase();
      return query === "" || c.company.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
    });
  }, [query]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Clients</h1>
          <p className="text-ink-500 mt-1">All clients you've audited. Click a client to view their latest audit.</p>
        </div>
        <button onClick={onAddClient} className="brand-gradient text-white font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-soft self-start sm:self-auto">
          <UserPlus className="h-4 w-4" /> Add Client
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox label="Total Clients" value={mockClients.length} />
        <StatBox label="Active" value={mockClients.filter((c) => c.status === "active").length} />
        <StatBox label="Pending" value={mockClients.filter((c) => c.status === "pending").length} />
        <StatBox label="Avg Score" value={Math.round(mockClients.filter((c) => c.avgScore > 0).reduce((s, c) => s + c.avgScore, 0) / mockClients.filter((c) => c.avgScore > 0).length)} />
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 shadow-card">
        <div className="p-4 border-b border-ink-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search clients…" className="w-full sm:max-w-md pl-9 pr-3 py-2 text-sm rounded-lg border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent" />
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-200 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Website</th>
                <th className="px-5 py-3">Industry</th>
                <th className="px-5 py-3">Last Audit</th>
                <th className="px-5 py-3">SEO Score</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const sc = clientStatusConfig[c.status];
                return (
                  <tr key={c.id} onClick={() => onOpenClientAudit(c.email)} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50 transition-colors cursor-pointer">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center text-sm font-bold brand-soft-text shrink-0">{c.company.slice(0, 2).toUpperCase()}</div>
                        <div className="min-w-0">
                          <p className="font-medium text-ink-900 truncate">{c.company}</p>
                          <p className="text-xs text-ink-500 truncate">{c.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-600 truncate max-w-[160px]">{c.website}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-600 truncate max-w-[140px]">{c.industry}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-500">{c.lastAuditDate ? formatDate(c.lastAuditDate) : "—"}</td>
                    <td className="px-5 py-3.5">
                      {c.avgScore > 0 ? (
                        <span className="font-bold" style={{ color: scoreColor(c.avgScore) }}>{c.avgScore}</span>
                      ) : <span className="text-ink-400 text-sm">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />{sc.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5"><ArrowRight className="h-4 w-4 text-ink-400" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-ink-100">
          {filtered.map((c) => {
            const sc = clientStatusConfig[c.status];
            return (
              <button key={c.id} onClick={() => onOpenClientAudit(c.email)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-ink-50 transition-colors">
                <div className="h-10 w-10 rounded-lg brand-soft-bg flex items-center justify-center text-sm font-bold brand-soft-text shrink-0">{c.company.slice(0, 2).toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink-900 truncate">{c.company}</p>
                  <p className="text-xs text-ink-500 truncate">{c.website}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}><span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />{sc.label}</span>
                    {c.avgScore > 0 && <span className="text-xs font-semibold" style={{ color: scoreColor(c.avgScore) }}>{c.avgScore}/100</span>}
                    <span className="text-xs text-ink-400">{c.industry}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-400 shrink-0" />
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && <div className="p-12 text-center text-ink-500">No clients match your search.</div>}
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-4">
      <p className="text-2xl font-bold text-ink-900">{value}</p>
      <p className="text-xs text-ink-500 mt-0.5">{label}</p>
    </div>
  );
}
