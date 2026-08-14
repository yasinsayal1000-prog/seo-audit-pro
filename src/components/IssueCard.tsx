import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { severityConfig } from "@/lib/seo";
import type { Issue, IssueSeverity } from "@/types";

export function IssueCard({ issue }: { issue: Issue }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = severityConfig(issue.priority);

  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} overflow-hidden transition-all`}>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/40 transition-colors"
      >
        <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot} shrink-0`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold uppercase tracking-wide ${cfg.text}`}>{cfg.label}</span>
            <span className="text-xs text-ink-400">·</span>
            <span className="text-xs text-ink-500">{issue.affectedPages} page{issue.affectedPages !== 1 ? "s" : ""}</span>
          </div>
          <h4 className="font-semibold text-ink-900 mt-0.5 truncate">{issue.title}</h4>
        </div>
        <ChevronDown className={`h-5 w-5 text-ink-400 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-1 space-y-3 animate-fade-in">
          <Detail label="Description" value={issue.description} />
          <Detail label="Why it matters" value={issue.whyItMatters} />
          <Detail label="Recommended action" value={issue.recommendedAction} />
          {issue.affectedExamples.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500 mb-1.5">Affected pages</p>
              <div className="flex flex-wrap gap-1.5">
                {issue.affectedExamples.map((p) => (
                  <code key={p} className="text-xs bg-white border border-ink-200 rounded-md px-2 py-1 text-ink-700">{p}</code>
                ))}
                {issue.affectedPages > issue.affectedExamples.length && (
                  <span className="text-xs text-ink-400 px-2 py-1">+{issue.affectedPages - issue.affectedExamples.length} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500 mb-0.5">{label}</p>
      <p className="text-sm text-ink-700 leading-relaxed">{value}</p>
    </div>
  );
}

export function IssueGroup({ title, severity, issues, defaultOpen = false }: { title: string; severity: IssueSeverity; issues: Issue[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const cfg = severityConfig(severity);
  if (issues.length === 0) return null;

  return (
    <div className="rounded-2xl border border-ink-200 bg-white overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-ink-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${cfg.dot}`} />
          <span className="font-semibold text-ink-900">{title}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>{issues.length}</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2.5 animate-fade-in">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}
