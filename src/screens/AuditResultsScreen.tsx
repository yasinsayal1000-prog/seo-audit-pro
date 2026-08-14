import { useState } from "react";
import { ArrowLeft, Download, Share2, FileText, AlertTriangle, CheckCircle2, AlertOctagon, Info, Wrench, FileText as FileTextIcon, PenLine, Gauge, Smartphone, Code2, Link2, Sparkles } from "lucide-react";
import type { Audit, ScoreCategory } from "@/types";
import { ScoreRing } from "@/components/ScoreRing";
import { IssueGroup } from "@/components/IssueCard";
import { scoreColor, scoreLabel, categoryMeta, severityConfig, formatDate } from "@/lib/seo";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wrench, FileText: FileTextIcon, PenLine, Gauge, Smartphone, Code2, Link2, Sparkles,
};

export function AuditResultsScreen({ audit, onBack, onNavigate, onViewIssues, onViewRecommendations, onViewStrategy, onViewProposal }: {
  audit: Audit;
  onBack: () => void;
  onNavigate: (key: "issues" | "recommendations" | "strategy" | "proposal") => void;
  onViewIssues: () => void;
  onViewRecommendations: () => void;
  onViewStrategy: () => void;
  onViewProposal: () => void;
}) {
  const [tab, setTab] = useState<"overview" | "issues" | "recommendations" | "strategy">("overview");

  const critical = audit.issues.filter((i) => i.priority === "critical");
  const high = audit.issues.filter((i) => i.priority === "high");
  const medium = audit.issues.filter((i) => i.priority === "medium");
  const low = audit.issues.filter((i) => i.priority === "low");
  const passed = audit.issues.filter((i) => i.priority === "passed");

  const scoreEntries = Object.entries(audit.scores) as [ScoreCategory, number][];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors self-start">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-ink-200 bg-white text-sm font-medium text-ink-700 hover:bg-ink-50 transition-colors">
            <Download className="h-4 w-4" /> Export PDF
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-ink-200 bg-white text-sm font-medium text-ink-700 hover:bg-ink-50 transition-colors">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button onClick={onViewProposal} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-soft">
            <FileText className="h-4 w-4" /> View Proposal
          </button>
        </div>
      </div>

      {/* Client header */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="h-14 w-14 rounded-xl brand-soft-bg flex items-center justify-center text-lg font-bold brand-soft-text shrink-0">
              {audit.clientCompany.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-ink-900 truncate">{audit.clientCompany}</h1>
              <p className="text-sm text-ink-500 truncate">{audit.clientName} · {audit.websiteUrl.replace("https://", "")}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Tag>{audit.industry}</Tag>
                <Tag>{audit.targetCity || audit.targetCountry}</Tag>
                <Tag>Audited {formatDate(audit.createdAt)}</Tag>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 lg:border-l lg:border-ink-200 lg:pl-6">
            <ScoreRing score={audit.overallScore} size={110} />
            <div>
              <p className="text-sm text-ink-500">Overall SEO Score</p>
              <p className="text-lg font-bold" style={{ color: scoreColor(audit.overallScore) }}>{scoreLabel(audit.overallScore)}</p>
              <p className="text-xs text-ink-400 mt-1 max-w-[180px]">{audit.overallScore >= 70 ? "Strong base with targeted wins available." : audit.overallScore >= 50 ? "Clear opportunities to improve rankings." : "Critical fixes needed to compete."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-ink-200 overflow-x-auto">
        {([
          { key: "overview", label: "Overview" },
          { key: "issues", label: `Issues (${audit.issues.length})` },
          { key: "recommendations", label: "Recommendations" },
          { key: "strategy", label: "Strategy / Roadmap" },
        ] as const).map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); if (t.key === "issues") onViewIssues(); if (t.key === "recommendations") onViewRecommendations(); if (t.key === "strategy") onViewStrategy(); }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${
              tab === t.key ? "brand-border brand-text" : "border-transparent text-ink-500 hover:text-ink-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {tab === "overview" && (
        <div className="space-y-6 animate-fade-in">
          {/* Score grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {scoreEntries.map(([cat, score]) => {
              const meta = categoryMeta[cat];
              const Icon = iconMap[meta.icon] || Wrench;
              return (
                <div key={cat} className="bg-white rounded-2xl border border-ink-200 shadow-card p-4 hover:shadow-elevated transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-lg brand-soft-bg flex items-center justify-center">
                      <Icon className="h-4 w-4 brand-soft-text" />
                    </div>
                    <span className="text-xs font-medium text-ink-600 truncate">{meta.short}</span>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold" style={{ color: scoreColor(score) }}>{score}</span>
                    <span className="text-sm text-ink-400 mb-1">/100</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: scoreColor(score) }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Issue summary */}
          <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
            <h2 className="font-semibold text-ink-900 text-lg mb-1">Issue Summary</h2>
            <p className="text-sm text-ink-500 mb-5">Issues grouped by severity. Click a group to expand details.</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <SeverityStat icon={AlertOctagon} label="Critical" count={critical.length} severity="critical" />
              <SeverityStat icon={AlertTriangle} label="High" count={high.length} severity="high" />
              <SeverityStat icon={Info} label="Medium" count={medium.length} severity="medium" />
              <SeverityStat icon={Info} label="Low" count={low.length} severity="low" />
              <SeverityStat icon={CheckCircle2} label="Passed" count={passed.length} severity="passed" />
            </div>
          </div>

          {/* Executive summary */}
          <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
            <h2 className="font-semibold text-ink-900 text-lg mb-3">Executive Summary</h2>
            <p className="text-sm text-ink-700 leading-relaxed">{audit.executiveSummary}</p>
          </div>

          {/* Quick issue groups */}
          <div className="space-y-3">
            <IssueGroup title="Critical Issues" severity="critical" issues={critical} defaultOpen />
            <IssueGroup title="High Priority" severity="high" issues={high} />
            <IssueGroup title="Medium Priority" severity="medium" issues={medium} />
            <IssueGroup title="Low Priority" severity="low" issues={low} />
            <IssueGroup title="Passed Checks" severity="passed" issues={passed} />
          </div>
        </div>
      )}

      {/* Issues tab */}
      {tab === "issues" && (
        <div className="space-y-3 animate-fade-in">
          <IssueGroup title="Critical Issues" severity="critical" issues={critical} defaultOpen />
          <IssueGroup title="High Priority" severity="high" issues={high} defaultOpen />
          <IssueGroup title="Medium Priority" severity="medium" issues={medium} />
          <IssueGroup title="Low Priority" severity="low" issues={low} />
          <IssueGroup title="Passed Checks" severity="passed" issues={passed} />
        </div>
      )}

      {/* Recommendations tab */}
      {tab === "recommendations" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
            <h2 className="font-semibold text-ink-900 text-lg mb-1">Recommended Solutions</h2>
            <p className="text-sm text-ink-500 mb-5">Actionable fixes tied to the audit findings.</p>
            <div className="space-y-3">
              {audit.recommendedSolutions.map((sol, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-ink-50 border border-ink-100">
                  <div className="h-7 w-7 rounded-lg brand-bg flex items-center justify-center text-white text-xs font-bold shrink-0">{i + 1}</div>
                  <p className="text-sm text-ink-700 leading-relaxed">{sol}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
            <h2 className="font-semibold text-ink-900 text-lg mb-1">Key SEO Problems</h2>
            <p className="text-sm text-ink-500 mb-5">The most impactful issues found on this site.</p>
            <div className="space-y-3">
              {audit.keyProblems.map((prob, i) => (
                <div key={i} className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-700 leading-relaxed">{prob}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Strategy tab */}
      {tab === "strategy" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
            <h2 className="font-semibold text-ink-900 text-lg mb-1">SEO Roadmap</h2>
            <p className="text-sm text-ink-500 mb-5">12-week implementation plan, phased by priority.</p>
            <div className="space-y-4">
              {audit.seoPriorities.map((phase, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-9 w-9 rounded-full brand-gradient flex items-center justify-center text-white text-sm font-bold shrink-0">{i + 1}</div>
                    {i < audit.seoPriorities.length - 1 && <div className="w-px flex-1 bg-ink-200 my-1" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-ink-900">{phase.phase}</p>
                    <ul className="mt-1.5 space-y-1">
                      {phase.items.map((item, j) => (
                        <li key={j} className="text-sm text-ink-600 flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full brand-bg mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
            <h2 className="font-semibold text-ink-900 text-lg mb-1">Expected Objectives</h2>
            <p className="text-sm text-ink-500 mb-5">Measurable goals we expect to achieve.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {audit.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-700">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={onViewProposal} className="w-full brand-gradient text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-soft">
            <FileText className="h-4 w-4" /> Generate Client Proposal
          </button>
        </div>
      )}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-md bg-ink-100 text-ink-600">{children}</span>;
}

function SeverityStat({ icon: Icon, label, count, severity }: { icon: React.ComponentType<{ className?: string }>; label: string; count: number; severity: import("@/types").IssueSeverity }) {
  const cfg = severityConfig(severity);
  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} p-3 text-center`}>
      <Icon className={`h-5 w-5 mx-auto ${cfg.icon}`} />
      <p className="text-2xl font-bold mt-1 text-ink-900">{count}</p>
      <p className={`text-xs font-medium ${cfg.text}`}>{label}</p>
    </div>
  );
}
