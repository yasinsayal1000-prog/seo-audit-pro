import { useState, useMemo } from "react";
import { FileSearch, CheckCircle2, Gauge, Users, ArrowRight, Plus, Search, Filter, Zap, UserPlus, FileText, AlertOctagon, AlertTriangle, Info } from "lucide-react";
import { mockAudits, mockPriorityIssues } from "@/mockData";
import { statusConfig, scoreColor, relativeTime } from "@/lib/seo";
import { ScoreRing } from "@/components/ScoreRing";
import { useBrand } from "@/brand";
import type { AuditStatus } from "@/types";

export function DashboardScreen({ onNewAudit, onOpenAudit, onNavigate, onAddClient, onGenerateProposal }: {
  onNewAudit: () => void;
  onOpenAudit: (id: string) => void;
  onNavigate: (k: "audits" | "proposals" | "clients") => void;
  onAddClient: () => void;
  onGenerateProposal: () => void;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AuditStatus>("all");
  const { branding } = useBrand();

  const completed = mockAudits.filter((a) => a.status === "completed");
  const totalAudits = mockAudits.length;
  const completedCount = completed.length;
  const avgScore = completed.length > 0 ? Math.round(completed.reduce((s, a) => s + a.overallScore, 0) / completed.length) : 0;
  const activeClients = new Set(mockAudits.filter((a) => a.status !== "queued").map((a) => a.clientEmail)).size;

  const recent = useMemo(() => {
    return mockAudits
      .filter((a) => {
        const matchesQuery = query === "" || a.clientCompany.toLowerCase().includes(query.toLowerCase()) || a.clientName.toLowerCase().includes(query.toLowerCase()) || a.websiteUrl.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = statusFilter === "all" || a.status === statusFilter;
        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [query, statusFilter]);

  const totalCritical = mockPriorityIssues.reduce((s, p) => s + p.critical, 0);
  const totalHigh = mockPriorityIssues.reduce((s, p) => s + p.high, 0);
  const totalMedium = mockPriorityIssues.reduce((s, p) => s + p.medium, 0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome section */}
      <div className="brand-gradient rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 85% 15%, white 0%, transparent 45%)" }} />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium">{greeting},</p>
            <h1 className="text-2xl sm:text-3xl font-bold mt-0.5">{branding.agencyName}</h1>
            <p className="text-white/80 mt-2 max-w-lg">Manage SEO audits, client reports and proposals from one place.</p>
          </div>
          <button
            onClick={onNewAudit}
            className="bg-white text-ink-900 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-ink-50 transition-colors shadow-soft shrink-0"
          >
            <Plus className="h-4 w-4" /> New SEO Audit
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileSearch} label="Total Audits" value={totalAudits} sub="All-time" tone="brand" onClick={() => onNavigate("audits")} />
        <StatCard icon={CheckCircle2} label="Completed Audits" value={completedCount} sub={`${Math.round((completedCount / totalAudits) * 100)}% of total`} tone="emerald" onClick={() => onNavigate("audits")} />
        <StatCard icon={Gauge} label="Average SEO Score" value={avgScore} sub="Across completed" tone="amber" />
        <StatCard icon={Users} label="Active Clients" value={activeClients} sub="Unique clients" tone="violet" onClick={() => onNavigate("clients")} />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-4 w-4 brand-text" />
          <h2 className="font-semibold text-ink-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <QuickAction icon={Plus} label="New SEO Audit" desc="Start a fresh audit" onClick={onNewAudit} />
          <QuickAction icon={UserPlus} label="Add Client" desc="Onboard a new client" onClick={onAddClient} />
          <QuickAction icon={FileText} label="Create Proposal" desc="Generate a proposal" onClick={onGenerateProposal} />
        </div>
      </div>

      {/* Main grid: recent audits + score chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent audits */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-ink-200 shadow-card">
          <div className="p-5 border-b border-ink-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="font-semibold text-ink-900 text-lg">Recent Audits</h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search audits…"
                    className="pl-9 pr-3 py-2 text-sm rounded-lg border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent w-full sm:w-48"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as "all" | AuditStatus)}
                    className="pl-9 pr-8 py-2 text-sm rounded-lg border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent appearance-none w-full sm:w-auto"
                  >
                    <option value="all">All statuses</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                    <option value="queued">Queued</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table - desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink-200 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Website</th>
                  <th className="px-5 py-3">SEO Score</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((audit) => {
                  const sc = statusConfig(audit.status);
                  return (
                    <tr key={audit.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center text-sm font-bold brand-soft-text shrink-0">
                            {audit.clientCompany.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-ink-900 truncate">{audit.clientCompany}</p>
                            <p className="text-xs text-ink-500 truncate">{audit.clientName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-ink-600 truncate max-w-[180px]">{audit.websiteUrl.replace("https://", "")}</td>
                      <td className="px-5 py-3.5">
                        {audit.status === "completed" ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg" style={{ color: scoreColor(audit.overallScore) }}>{audit.overallScore}</span>
                            <div className="w-14 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${audit.overallScore}%`, backgroundColor: scoreColor(audit.overallScore) }} />
                            </div>
                          </div>
                        ) : (
                          <span className="text-ink-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-ink-500">{relativeTime(audit.createdAt)}</td>
                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => onOpenAudit(audit.id)}
                          className="text-sm font-medium brand-text hover:underline flex items-center gap-1"
                        >
                          View <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cards - mobile */}
          <div className="md:hidden divide-y divide-ink-100">
            {recent.map((audit) => {
              const sc = statusConfig(audit.status);
              return (
                <button key={audit.id} onClick={() => onOpenAudit(audit.id)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-ink-50 transition-colors">
                  <div className="h-10 w-10 rounded-lg brand-soft-bg flex items-center justify-center text-sm font-bold brand-soft-text shrink-0">
                    {audit.clientCompany.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink-900 truncate">{audit.clientCompany}</p>
                    <p className="text-xs text-ink-500 truncate">{audit.websiteUrl.replace("https://", "")}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />{sc.label}
                      </span>
                      {audit.status === "completed" && (
                        <span className="text-xs font-semibold" style={{ color: scoreColor(audit.overallScore) }}>{audit.overallScore}/100</span>
                      )}
                      <span className="text-xs text-ink-400">{relativeTime(audit.createdAt)}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink-400 shrink-0" />
                </button>
              );
            })}
          </div>

          {recent.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-ink-500">No audits match your search.</p>
            </div>
          )}
        </div>

        {/* Score overview chart */}
        <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5">
          <h2 className="font-semibold text-ink-900 text-lg mb-1">SEO Score Overview</h2>
          <p className="text-sm text-ink-500 mb-5">Average score across all completed audits.</p>
          <div className="flex flex-col items-center justify-center py-2">
            <ScoreRing score={avgScore} size={130} />
            <p className="mt-4 text-sm text-ink-600 text-center px-4">
              {avgScore >= 70 ? "Solid foundation with targeted wins available." : avgScore >= 50 ? "Significant optimization opportunities identified." : "Critical issues need immediate attention."}
            </p>
          </div>
          <div className="mt-5 pt-5 border-t border-ink-100 space-y-2.5">
            {completed.sort((a, b) => b.overallScore - a.overallScore).slice(0, 4).map((audit) => (
              <div key={audit.id} className="flex items-center gap-2">
                <span className="text-xs text-ink-600 w-20 truncate">{audit.clientCompany}</span>
                <div className="flex-1 h-2 rounded-full bg-ink-100 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${audit.overallScore}%`, backgroundColor: scoreColor(audit.overallScore) }} />
                </div>
                <span className="text-xs font-bold w-7 text-right" style={{ color: scoreColor(audit.overallScore) }}>{audit.overallScore}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Issues */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-ink-900 text-lg">Priority Issues</h2>
            <p className="text-sm text-ink-500 mt-0.5">Issues found across all completed audits, by severity.</p>
          </div>
          <div className="flex items-center gap-3">
            <PriorityBadge icon={AlertOctagon} label="Critical" count={totalCritical} color="red" />
            <PriorityBadge icon={AlertTriangle} label="High" count={totalHigh} color="orange" />
            <PriorityBadge icon={Info} label="Medium" count={totalMedium} color="amber" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-200 text-left text-xs font-semibold uppercase tracking-wide text-ink-500">
                <th className="px-3 py-2.5">Client</th>
                <th className="px-3 py-2.5 text-center">Critical</th>
                <th className="px-3 py-2.5 text-center">High</th>
                <th className="px-3 py-2.5 text-center">Medium</th>
                <th className="px-3 py-2.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {mockPriorityIssues.map((p) => (
                <tr key={p.client} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50 transition-colors">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg brand-soft-bg flex items-center justify-center text-xs font-bold brand-soft-text shrink-0">{p.client.slice(0, 2).toUpperCase()}</div>
                      <span className="font-medium text-ink-900 text-sm">{p.client}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600">{p.critical}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-600">{p.high}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-600">{p.medium}</span>
                  </td>
                  <td className="px-3 py-3 text-right font-bold text-ink-900">{p.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, tone, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number | string; sub: string; tone: "brand" | "emerald" | "amber" | "violet"; onClick?: () => void }) {
  const tones: Record<string, { bg: string; text: string }> = {
    brand: { bg: "brand-soft-bg", text: "brand-soft-text" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
    amber: { bg: "bg-amber-50", text: "text-amber-600" },
    violet: { bg: "bg-violet-50", text: "text-violet-600" },
  };
  const t = tones[tone];
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`bg-white rounded-2xl border border-ink-200 shadow-card p-4 sm:p-5 text-left ${onClick ? "hover:shadow-elevated hover:border-ink-300 transition-all cursor-pointer" : ""}`}
    >
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${t.bg} mb-3`}>
        <Icon className={`h-5 w-5 ${t.text}`} />
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-ink-900">{value}</p>
      <p className="text-sm font-medium text-ink-700 mt-1">{label}</p>
      <p className="text-xs text-ink-400 mt-0.5">{sub}</p>
    </button>
  );
}

function QuickAction({ icon: Icon, label, desc, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-3.5 rounded-xl border border-ink-200 hover:border-ink-300 hover:bg-ink-50 transition-all text-left group"
    >
      <div className="h-10 w-10 rounded-lg brand-soft-bg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
        <Icon className="h-5 w-5 brand-soft-text" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-ink-900 text-sm">{label}</p>
        <p className="text-xs text-ink-500">{desc}</p>
      </div>
    </button>
  );
}

function PriorityBadge({ icon: Icon, label, count, color }: { icon: React.ComponentType<{ className?: string }>; label: string; count: number; color: "red" | "orange" | "amber" }) {
  const colors = {
    red: { bg: "bg-red-50", text: "text-red-600", icon: "text-red-500" },
    orange: { bg: "bg-orange-50", text: "text-orange-600", icon: "text-orange-500" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", icon: "text-amber-500" },
  };
  const c = colors[color];
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${c.bg}`}>
      <Icon className={`h-4 w-4 ${c.icon}`} />
      <span className={`text-sm font-bold ${c.text}`}>{count}</span>
      <span className={`text-xs font-medium ${c.text} hidden sm:inline`}>{label}</span>
    </div>
  );
}
