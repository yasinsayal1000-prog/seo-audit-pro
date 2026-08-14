import { useState, useMemo } from "react";
import { FileText, Search, ArrowRight, Eye, Send, CheckCircle2, Clock, Plus, Sparkles } from "lucide-react";
import { mockProposals } from "@/mockData";
import { scoreColor, formatDate } from "@/lib/seo";
import type { Proposal } from "@/types";

const statusMeta: Record<Proposal["status"], { label: string; bg: string; text: string; dot: string; icon: React.ComponentType<{ className?: string }> }> = {
  draft: { label: "Draft", bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400", icon: FileText },
  sent: { label: "Sent", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500", icon: Send },
  viewed: { label: "Viewed", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", icon: Eye },
  accepted: { label: "Accepted", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", icon: CheckCircle2 },
};

export function ProposalsScreen({ onOpenProposal, onGenerateProposal }: { onOpenProposal: (auditId: string) => void; onGenerateProposal: () => void }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return mockProposals.filter((p) => {
      const q = query.toLowerCase();
      return query === "" || p.company.toLowerCase().includes(q) || p.clientName.toLowerCase().includes(q) || p.website.toLowerCase().includes(q);
    });
  }, [query]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Proposals</h1>
          <p className="text-ink-500 mt-1">Client-facing SEO proposals generated from audit findings.</p>
        </div>
        <button onClick={onGenerateProposal} className="brand-gradient text-white font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-soft self-start sm:self-auto">
          <Sparkles className="h-4 w-4" /> Generate Proposal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat label="Total" value={mockProposals.length} icon={FileText} />
        <MiniStat label="Sent" value={mockProposals.filter((p) => p.status === "sent").length} icon={Send} />
        <MiniStat label="Viewed" value={mockProposals.filter((p) => p.status === "viewed").length} icon={Eye} />
        <MiniStat label="Accepted" value={mockProposals.filter((p) => p.status === "accepted").length} icon={CheckCircle2} />
      </div>

      <div className="bg-white rounded-2xl border border-ink-200 shadow-card">
        <div className="p-4 border-b border-ink-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search proposals…" className="w-full sm:max-w-md pl-9 pr-3 py-2 text-sm rounded-lg border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent" />
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-200 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Website</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Created</th>
                <th className="px-5 py-3">SEO Score</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const sm = statusMeta[p.status];
                const Icon = sm.icon;
                return (
                  <tr key={p.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center text-sm font-bold brand-soft-text shrink-0">{p.company.slice(0, 2).toUpperCase()}</div>
                        <div className="min-w-0">
                          <p className="font-medium text-ink-900 truncate">{p.company}</p>
                          <p className="text-xs text-ink-500 truncate">{p.clientName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-600 truncate max-w-[180px]">{p.website}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${sm.bg} ${sm.text}`}>
                        <Icon className="h-3 w-3" />{sm.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-ink-500">{formatDate(p.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <span className="font-bold" style={{ color: scoreColor(p.score) }}>{p.score}</span>
                      <span className="text-ink-400 text-sm">/100</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => onOpenProposal(p.auditId)}
                        className="text-sm font-medium brand-text hover:underline flex items-center gap-1"
                      >
                        View Proposal <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-ink-100">
          {filtered.map((p) => {
            const sm = statusMeta[p.status];
            const Icon = sm.icon;
            return (
              <button key={p.id} onClick={() => onOpenProposal(p.auditId)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-ink-50 transition-colors">
                <div className="h-10 w-10 rounded-lg brand-soft-bg flex items-center justify-center text-sm font-bold brand-soft-text shrink-0">{p.company.slice(0, 2).toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ink-900 truncate">{p.company}</p>
                  <p className="text-xs text-ink-500 truncate">{p.website}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${sm.bg} ${sm.text}`}><Icon className="h-3 w-3" />{sm.label}</span>
                    <span className="text-xs font-semibold" style={{ color: scoreColor(p.score) }}>{p.score}/100</span>
                    <span className="text-xs text-ink-400">{formatDate(p.createdAt)}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-400 shrink-0" />
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && <div className="p-12 text-center text-ink-500">No proposals match your search.</div>}
      </div>
    </div>
  );
}

function MiniStat({ label, value, icon: Icon }: { label: string; value: number; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl brand-soft-bg flex items-center justify-center">
        <Icon className="h-5 w-5 brand-soft-text" />
      </div>
      <div>
        <p className="text-2xl font-bold text-ink-900">{value}</p>
        <p className="text-xs text-ink-500">{label}</p>
      </div>
    </div>
  );
}
