import type { IssueSeverity, ScoreCategory, AuditStatus } from "@/types";

export function scoreColor(score: number): string {
  if (score >= 80) return "#16a34a";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#f97316";
  return "#dc2626";
}

export function scoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Needs Work";
  return "Critical";
}

export function severityConfig(sev: IssueSeverity): {
  label: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
  icon: string;
} {
  switch (sev) {
    case "critical":
      return { label: "Critical", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500", icon: "text-red-500" };
    case "high":
      return { label: "High", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500", icon: "text-orange-500" };
    case "medium":
      return { label: "Medium", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-400", icon: "text-amber-500" };
    case "low":
      return { label: "Low", bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200", dot: "bg-sky-400", icon: "text-sky-500" };
    case "passed":
      return { label: "Passed", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", icon: "text-emerald-500" };
  }
}

export const categoryMeta: Record<ScoreCategory, { label: string; short: string; icon: string }> = {
  technical: { label: "Technical SEO", short: "Technical", icon: "Wrench" },
  onpage: { label: "On-Page SEO", short: "On-Page", icon: "FileText" },
  content: { label: "Content", short: "Content", icon: "PenLine" },
  performance: { label: "Performance", short: "Performance", icon: "Gauge" },
  mobile: { label: "Mobile SEO", short: "Mobile", icon: "Smartphone" },
  schema: { label: "Schema", short: "Schema", icon: "Code2" },
  linking: { label: "Internal Linking", short: "Linking", icon: "Link2" },
  geo: { label: "AI / GEO", short: "AI/GEO", icon: "Sparkles" },
};

export function statusConfig(status: AuditStatus): { label: string; bg: string; text: string; dot: string } {
  switch (status) {
    case "completed":
      return { label: "Completed", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" };
    case "processing":
      return { label: "Processing", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" };
    case "queued":
      return { label: "Queued", bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" };
    case "failed":
      return { label: "Failed", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" };
  }
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function relativeTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date("2026-08-13T12:00:00Z");
  const diff = (now.getTime() - d.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
