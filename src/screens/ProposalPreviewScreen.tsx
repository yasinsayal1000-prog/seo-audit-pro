import { ArrowLeft, Download, Send, FileText, CheckCircle2, Calendar, Target, Package, ArrowRight } from "lucide-react";
import type { Audit } from "@/types";
import { useBrand } from "@/brand";
import { AgencyLogo } from "@/components/AgencyLogo";
import { ScoreRing } from "@/components/ScoreRing";
import { scoreColor, formatDate } from "@/lib/seo";

export function ProposalPreviewScreen({ audit, onBack }: { audit: Audit; onBack: () => void }) {
  const { branding } = useBrand();
  const proposalBranding = {
    ...branding,
    logoUrl: audit.logoUrl || branding.logoUrl,
    brandColor: audit.brandColor || branding.brandColor,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sticky top-16 z-10 bg-ink-50/80 backdrop-blur-md py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors self-start">
          <ArrowLeft className="h-4 w-4" /> Back to Audit
        </button>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-ink-200 bg-white text-sm font-medium text-ink-700 hover:bg-ink-50 transition-colors">
            <Download className="h-4 w-4" /> Download PDF
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg brand-gradient text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-soft">
            <Send className="h-4 w-4" /> Send to Client
          </button>
        </div>
      </div>

      {/* Proposal document */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-elevated overflow-hidden max-w-4xl mx-auto">
        {/* Cover header */}
        <div className="brand-gradient text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 40%)" }} />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                {proposalBranding.logoUrl ? (
                  <img src={proposalBranding.logoUrl} alt={proposalBranding.agencyName} className="h-9 w-auto object-contain" />
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg">{proposalBranding.agencyName}</span>
                  </div>
                )}
              </div>
              <span className="text-sm text-white/70 hidden sm:block">SEO Proposal · {formatDate(audit.createdAt)}</span>
            </div>
            <p className="text-white/70 text-sm font-medium uppercase tracking-wide">Prepared for</p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-1">{audit.clientCompany}</h1>
            <p className="text-white/80 mt-2">{audit.clientName} · {audit.websiteUrl.replace("https://", "")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>SEO Audit & Strategy</Pill>
              <Pill>{audit.industry}</Pill>
              <Pill>{audit.targetCity || audit.targetCountry}</Pill>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-10">
          {/* Snapshot */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1 flex flex-col items-center justify-center bg-ink-50 rounded-xl p-5">
              <ScoreRing score={audit.overallScore} size={120} />
              <p className="mt-3 text-sm font-medium text-ink-600">Current SEO Score</p>
            </div>
            <div className="sm:col-span-2 space-y-3">
              <InfoRow label="Client" value={`${audit.clientName}`} />
              <InfoRow label="Company" value={audit.clientCompany} />
              <InfoRow label="Website" value={audit.websiteUrl.replace("https://", "")} />
              <InfoRow label="Industry" value={audit.industry} />
              <InfoRow label="Target Location" value={`${audit.targetCity}, ${audit.targetCountry}`} />
              <InfoRow label="Main Services" value={audit.mainServices} />
            </div>
          </section>

          {/* Executive summary */}
          <section>
            <SectionTitle icon={FileText} title="Executive Summary" />
            <p className="text-ink-700 leading-relaxed mt-3">{audit.executiveSummary}</p>
          </section>

          {/* Key problems */}
          <section>
            <SectionTitle icon={FileText} title="Key SEO Problems" />
            <div className="mt-4 space-y-3">
              {audit.keyProblems.map((prob, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100">
                  <span className="h-6 w-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="text-sm text-ink-700 leading-relaxed">{prob}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended solutions */}
          <section>
            <SectionTitle icon={CheckCircle2} title="Recommended Solutions" />
            <div className="mt-4 space-y-3">
              {audit.recommendedSolutions.map((sol, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-700 leading-relaxed">{sol}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SEO priorities roadmap */}
          <section>
            <SectionTitle icon={Calendar} title="SEO Priorities & Timeline" />
            <p className="text-sm text-ink-500 mt-2">A phased 12-week implementation plan.</p>
            <div className="mt-5 space-y-3">
              {audit.seoPriorities.map((phase, i) => (
                <div key={i} className="rounded-xl border border-ink-200 overflow-hidden">
                  <div className="brand-soft-bg px-4 py-2.5 flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full brand-bg text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="font-semibold brand-soft-text">{phase.phase}</span>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-1.5">
                      {phase.items.map((item, j) => (
                        <li key={j} className="text-sm text-ink-700 flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-ink-400 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Objectives */}
          <section>
            <SectionTitle icon={Target} title="Expected Objectives" />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {audit.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-ink-50 border border-ink-100">
                  <Target className="h-5 w-5 brand-text shrink-0 mt-0.5" />
                  <p className="text-sm text-ink-700">{obj}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended services */}
          <section>
            <SectionTitle icon={Package} title="Recommended SEO Services" />
            <div className="mt-4 space-y-3">
              {audit.recommendedServices.map((svc, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-ink-200 hover:border-ink-300 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-ink-900">{svc.name}</p>
                    <p className="text-sm text-ink-500 mt-0.5">{svc.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold brand-text">{svc.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="brand-gradient rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold">Ready to grow your organic traffic?</h3>
            <p className="text-white/80 mt-2 max-w-md mx-auto">Approve this proposal and we'll kick off Week 1 within 48 hours. Questions? We're a quick call away.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-white text-ink-900 font-semibold px-6 py-3 rounded-xl hover:bg-ink-50 transition-colors">
                Approve Proposal
              </button>
              <button className="border border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                Schedule a Call
              </button>
            </div>
            <p className="text-white/60 text-sm mt-6">
              {proposalBranding.contactEmail} · {proposalBranding.contactPhone}
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-ink-200 px-6 sm:px-10 py-6 bg-ink-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-500">
            <div className="flex items-center gap-2">
              <AgencyLogo size={24} />
            </div>
            <p>© 2026 {proposalBranding.agencyName}. {proposalBranding.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-white/15 text-white">{children}</span>;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-ink-100 last:border-0">
      <span className="text-sm text-ink-500">{label}</span>
      <span className="text-sm font-medium text-ink-900 text-right">{value}</span>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="h-8 w-8 rounded-lg brand-soft-bg flex items-center justify-center">
        <Icon className="h-4 w-4 brand-soft-text" />
      </div>
      <h2 className="text-lg font-bold text-ink-900">{title}</h2>
    </div>
  );
}
