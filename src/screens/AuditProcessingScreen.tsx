import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Search, Globe, FileText, Code2, Link2, Sparkles, Gauge, Smartphone, FileSearch, Network, ScanLine } from "lucide-react";

const steps = [
  { icon: Globe, label: "Connecting to website", detail: "Establishing connection and resolving DNS" },
  { icon: FileText, label: "Checking robots.txt", detail: "Reviewing crawl directives and access rules" },
  { icon: ScanLine, label: "Checking XML sitemap", detail: "Validating sitemap structure and URLs" },
  { icon: Network, label: "Crawling pages", detail: "Rendering and extracting page content" },
  { icon: FileSearch, label: "Checking technical SEO", detail: "Canonicals, redirects, HTTPS, indexability" },
  { icon: Sparkles, label: "Analyzing on-page SEO", detail: "Titles, meta, headings, content depth" },
  { icon: Gauge, label: "Checking performance", detail: "Core Web Vitals, LCP, CLS, TBT" },
  { icon: Code2, label: "Checking structured data", detail: "Schema markup validation and coverage" },
  { icon: Link2, label: "Checking internal links", detail: "Broken links, anchor text, link depth" },
  { icon: FileText, label: "Preparing SEO score", detail: "Aggregating scores and generating report" },
];

export function AuditProcessingScreen({ onComplete, websiteUrl }: { onComplete: () => void; websiteUrl?: string }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (current >= steps.length) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCurrent((c) => c + 1);
      setProgress(Math.round(((current + 1) / steps.length) * 100));
    }, 750);
    return () => clearTimeout(t);
  }, [current, onComplete]);

  const displayUrl = websiteUrl ? websiteUrl.replace("https://", "").replace("http://", "") : "your client's website";

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-lg">
        {/* Animated radar */}
        <div className="flex justify-center mb-8">
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 rounded-full brand-soft-bg" />
            <div className="absolute inset-2 rounded-full border-2 brand-border opacity-30 animate-pulse-ring" />
            <div className="absolute inset-6 rounded-full border-2 brand-border opacity-20 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full brand-gradient flex items-center justify-center">
                <Search className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-ink-900">Preparing SEO Audit</h1>
          <p className="text-ink-500 mt-2 text-sm">
            Analyzing <span className="font-medium text-ink-700">{displayUrl}</span> across {steps.length} stages.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-ink-500">Progress</span>
            <span className="text-xs font-bold text-ink-700">{Math.min(progress, 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
            <div className="h-full rounded-full brand-gradient transition-all duration-500 ease-out" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-4 sm:p-5 space-y-1 max-h-[420px] overflow-y-auto">
          {steps.map((step, i) => {
            const done = i < current;
            const active = i === current;
            const Icon = step.icon;
            return (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${active ? "brand-soft-bg" : ""}`}>
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                  done ? "bg-emerald-100" : active ? "brand-bg" : "bg-ink-100"
                }`}>
                  {done ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : active ? (
                    <Loader2 className="h-5 w-5 text-white animate-spin" />
                  ) : (
                    <Icon className="h-5 w-5 text-ink-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${done || active ? "text-ink-900" : "text-ink-400"}`}>{step.label}</p>
                  <p className={`text-xs ${active ? "text-ink-500" : "text-ink-400"}`}>{step.detail}</p>
                </div>
                {done && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-ink-400 mt-6">
          Keep this tab open. You'll be redirected automatically when the audit is ready.
        </p>
      </div>
    </div>
  );
}
