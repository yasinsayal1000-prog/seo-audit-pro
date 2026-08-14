import { useState, useMemo } from "react";
import { Plus, Search, Filter, ArrowRight } from "lucide-react";
import { mockAudits } from "@/mockData";
import { statusConfig, scoreColor, relativeTime } from "@/lib/seo";
import type { AuditStatus } from "@/types";

export function AuditsScreen({ onNewAudit, onOpenAudit }: { onNewAudit: () => void; onOpenAudit: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AuditStatus>("all");

  const filtered = useMemo(() => {
    return mockAudits
      .filter((a) => {
        const q = query.toLowerCase();
        const matchesQuery = query === "" || a.clientCompany.toLowerCase().includes(q) || a.clientName.toLowerCase().includes(q) || a.websiteUrl.toLowerCase().includes(q);
        const matchesStatus = statusFilter === "all" || a.status === statusFilter;
        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [query, statusFilter]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Audits</h1>
          <p className="text-ink-500 mt-1">All SEO audits across your clients.</p>
        </div>
        <button onClick={onNewAudit} className="brand-gradient text-white font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-soft self-start sm:self-auto">
          <Plus className="h-4 w-4" /> New SEO Audit
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 shadow-card">
        <div className="p-4 border-b border-ink-200 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by client, company, or website…" className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent" />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "all" | AuditStatus)} className="pl-9 pr-8 py-2 text-sm rounded-lg border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent appearance-none w-full sm:w-auto">
              <option value="all">All statuses</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="queued">Queued</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-200 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Website</th>
                <th className="px-5 py-3">Industry</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((audit) => {
                const sc = statusConfig(audit.status);
                return (
                  <tr key={audit.id} onClick={() => onOpenAudit(audit.id)} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50 transition-colors cursor-pointer">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center text-sm font-bold brand-soft-text shrink-0">{audit.clientCompany.slice(0, 2).toUpperCase()}</div>
                        <div className="min-w-0">
                          <p className="font-medium text-ink-900 truncate">{audit.clientCompany}</p>
                          <p className="text-xs text-ink-500 truncate">{audit.clientName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-600 truncate max-w-[180px]">{audit.websiteUrl.replace("https://", "")}</td>
                    <td className="px-5 py-3.5 text-sm text-ink-600 truncate max-w-[140px]">{audit.industry}</td>
                    <td className="px-5 py-3.5">
                      {audit.status === "completed" ? (
                        <span className="font-bold" style={{ color: scoreColor(audit.overallScore) }}>{audit.overallScore}</span>
                      ) : <span className="text-ink-400">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />{sc.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-500">{relativeTime(audit.createdAt)}</td>
                    <td className="px-5 py-3.5"><ArrowRight className="h-4 w-4 text-ink-400" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-ink-100">
          {filtered.map((audit) => {
            const sc = statusConfig(audit.status);
            return (
              <button key={audit.id} onClick={() => onOpenAudit(audit.id)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-ink-50 transition-colors">
                <div className="h-10 w-10 rounded-lg brand-soft-bg flex items-center justify-center text-sm font-bold brand-soft-text shrink-0">{audit.clientCompany.slice(0, 2).toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink-900 truncate">{audit.clientCompany}</p>
                  <p className="text-xs text-ink-500 truncate">{audit.websiteUrl.replace("https://", "")}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}><span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />{sc.label}</span>
                    {audit.status === "completed" && <span className="text-xs font-semibold" style={{ color: scoreColor(audit.overallScore) }}>{audit.overallScore}/100</span>}
                    <span className="text-xs text-ink-400">{relativeTime(audit.createdAt)}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-400 shrink-0" />
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && <div className="p-12 text-center text-ink-500">No audits match your filters.</div>}
      </div>
    </div>
  );
}
