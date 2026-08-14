import { useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowRight as ArrowRightIcon, Upload, Palette, User, Building2, Globe, Mail, Phone, Briefcase, MapPin, MapPinned, ListChecks, Sparkles, Check, CheckCircle2, Zap, Layers, Eye } from "lucide-react";
import { industries, countries } from "@/mockData";
import { useBrand } from "@/brand";
import { AgencyLogo } from "@/components/AgencyLogo";
import type { AuditFormData, AuditDepth } from "@/types";

const inputCls = "w-full px-3 py-2.5 rounded-lg border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent transition-all text-sm";

const auditDepths: { value: AuditDepth; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "quick", label: "Quick Audit", desc: "Surface-level scan of key pages (~30 sec)", icon: Zap },
  { value: "standard", label: "Standard Audit", desc: "Balanced depth across all SEO areas (~1 min)", icon: Layers },
  { value: "comprehensive", label: "Comprehensive Audit", desc: "Deep crawl with full issue detection (~2 min)", icon: Eye },
];

const pageOptions = [25, 50, 100, 250, 500];

const auditAreas = [
  { key: "technical", label: "Technical SEO", icon: "Wrench" },
  { key: "onpage", label: "On-Page SEO", icon: "FileText" },
  { key: "content", label: "Content", icon: "PenLine" },
  { key: "performance", label: "Performance", icon: "Gauge" },
  { key: "mobile", label: "Mobile SEO", icon: "Smartphone" },
  { key: "schema", label: "Schema / Structured Data", icon: "Code2" },
  { key: "linking", label: "Internal Linking", icon: "Link2" },
  { key: "images", label: "Images", icon: "Image" },
  { key: "local", label: "Local SEO", icon: "MapPin" },
  { key: "geo", label: "AI Search / GEO", icon: "Sparkles" },
];

const stepLabels = ["Client Information", "Audit Settings", "Branding", "Review"];

export function NewAuditScreen({ onStart, onBack }: { onStart: (form: AuditFormData) => void; onBack: () => void }) {
  const { branding } = useBrand();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<AuditFormData>({
    clientName: "",
    clientCompany: "",
    clientEmail: "",
    clientPhone: "",
    websiteUrl: "",
    industry: "",
    targetCountry: "",
    targetCity: "",
    primaryService: "",
    secondaryServices: "",
    auditDepth: "standard",
    pagesToCrawl: 50,
    customPages: 100,
    auditAreas: ["technical", "onpage", "content", "performance", "mobile", "schema", "linking", "geo"],
    logoUrl: "",
    agencyName: branding.agencyName,
    brandColor: branding.brandColor,
    secondaryBrandColor: branding.secondaryColor || "#1e293b",
    useDefaultBranding: true,
  });
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof AuditFormData>(key: K, value: AuditFormData[K]) => setForm((f) => ({ ...f, [key]: value }));

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setLogoPreview(url);
      set("logoUrl", url);
    };
    reader.readAsDataURL(file);
  };

  const step1Valid = form.clientName.trim() && form.websiteUrl.trim() && form.industry && form.targetCountry;
  const step2Valid = form.auditDepth && form.pagesToCrawl && form.auditAreas.length > 0;
  const step3Valid = true;
  const canContinue = step === 1 ? !!step1Valid : step === 2 ? !!step2Valid : step === 3 ? step3Valid : true;

  const toggleArea = (key: string) => {
    setForm((f) => ({
      ...f,
      auditAreas: f.auditAreas.includes(key) ? f.auditAreas.filter((a) => a !== key) : [...f.auditAreas, key],
    }));
  };

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => onStart(form), 400);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">New SEO Audit</h1>
        <p className="text-ink-500 mt-1">Set up a comprehensive SEO audit for your client in a few steps.</p>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center">
          {stepLabels.map((label, i) => {
            const num = i + 1;
            const isDone = num < step;
            const isActive = num === step;
            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isDone ? "brand-gradient text-white" : isActive ? "brand-gradient text-white ring-4 brand-soft-bg" : "bg-ink-100 text-ink-400"
                  }`}>
                    {isDone ? <Check className="h-4 w-4" /> : num}
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${isActive || isDone ? "text-ink-900" : "text-ink-400"}`}>{label}</span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 -mt-5 rounded-full overflow-hidden bg-ink-100">
                    <div className={`h-full transition-all duration-500 ${num < step ? "brand-bg w-full" : "w-0"}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Client Information */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <Section title="Client Information" icon={User} subtitle="Tell us about the client you're auditing.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field icon={User} label="Client Name" required>
                <input value={form.clientName} onChange={(e) => set("clientName", e.target.value)} placeholder="Dr. Sarah Mitchell" className={inputCls} required />
              </Field>
              <Field icon={Building2} label="Company Name">
                <input value={form.clientCompany} onChange={(e) => set("clientCompany", e.target.value)} placeholder="Acme Dental" className={inputCls} />
              </Field>
              <Field icon={Mail} label="Client Email">
                <input type="email" value={form.clientEmail} onChange={(e) => set("clientEmail", e.target.value)} placeholder="sarah@acmedental.com" className={inputCls} />
              </Field>
              <Field icon={Phone} label="Client Phone">
                <input value={form.clientPhone} onChange={(e) => set("clientPhone", e.target.value)} placeholder="(555) 123-4567" className={inputCls} />
              </Field>
              <Field icon={Globe} label="Website URL" required>
                <input value={form.websiteUrl} onChange={(e) => set("websiteUrl", e.target.value)} placeholder="https://acmedental.com" className={inputCls} required />
              </Field>
              <Field icon={Briefcase} label="Industry" required>
                <select value={form.industry} onChange={(e) => set("industry", e.target.value)} className={inputCls} required>
                  <option value="">Select industry…</option>
                  {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </Field>
              <Field icon={Globe} label="Target Country" required>
                <select value={form.targetCountry} onChange={(e) => set("targetCountry", e.target.value)} className={inputCls} required>
                  <option value="">Select country…</option>
                  {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field icon={MapPinned} label="Target City">
                <input value={form.targetCity} onChange={(e) => set("targetCity", e.target.value)} placeholder="Portland, OR" className={inputCls} />
              </Field>
              <Field icon={ListChecks} label="Primary Business Service">
                <input value={form.primaryService} onChange={(e) => set("primaryService", e.target.value)} placeholder="Cosmetic dentistry, implants" className={inputCls} />
              </Field>
              <Field icon={ListChecks} label="Secondary Services">
                <input value={form.secondaryServices} onChange={(e) => set("secondaryServices", e.target.value)} placeholder="Orthodontics, family dentistry" className={inputCls} />
              </Field>
            </div>
          </Section>

          <StepNav onBack={() => setStep(1)} onContinue={() => canContinue && setStep(2)} canContinue={!!step1Valid} backLabel="Back" continueLabel="Continue" />
        </div>
      )}

      {/* Step 2: Audit Settings */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <Section title="Audit Settings" icon={Layers} subtitle="Configure the depth and scope of the audit.">
            {/* Audit depth */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-3">Audit Depth</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {auditDepths.map((d) => {
                  const Icon = d.icon;
                  const selected = form.auditDepth === d.value;
                  return (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => set("auditDepth", d.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selected ? "brand-border brand-soft-bg" : "border-ink-200 hover:border-ink-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${selected ? "brand-bg" : "bg-ink-100"}`}>
                          <Icon className={`h-4 w-4 ${selected ? "text-white" : "text-ink-500"}`} />
                        </div>
                        {selected && <CheckCircle2 className="h-4 w-4 brand-text ml-auto" />}
                      </div>
                      <p className="font-semibold text-ink-900 text-sm">{d.label}</p>
                      <p className="text-xs text-ink-500 mt-0.5">{d.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pages to crawl */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-ink-700 mb-3">Pages to Crawl</label>
              <div className="flex flex-wrap gap-2">
                {pageOptions.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => set("pagesToCrawl", n)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                      form.pagesToCrawl === n ? "brand-border brand-soft-bg brand-soft-text" : "border-ink-200 text-ink-600 hover:border-ink-300"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => set("pagesToCrawl", "custom")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                    form.pagesToCrawl === "custom" ? "brand-border brand-soft-bg brand-soft-text" : "border-ink-200 text-ink-600 hover:border-ink-300"
                  }`}
                >
                  Custom
                </button>
              </div>
              {form.pagesToCrawl === "custom" && (
                <div className="mt-3 max-w-xs">
                  <input
                    type="number"
                    min={1}
                    value={form.customPages}
                    onChange={(e) => set("customPages", parseInt(e.target.value) || 1)}
                    className={inputCls}
                    placeholder="Enter number of pages"
                  />
                </div>
              )}
            </div>

            {/* Audit areas */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-ink-700 mb-1">SEO Areas to Audit</label>
              <p className="text-xs text-ink-500 mb-3">Select all areas you want the audit to cover.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {auditAreas.map((area) => {
                  const selected = form.auditAreas.includes(area.key);
                  return (
                    <button
                      key={area.key}
                      type="button"
                      onClick={() => toggleArea(area.key)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        selected ? "brand-border brand-soft-bg" : "border-ink-200 hover:border-ink-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 ${selected ? "brand-bg border-transparent" : "border-ink-300"}`}>
                          {selected && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className={`text-xs font-medium ${selected ? "brand-soft-text" : "text-ink-600"}`}>{area.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Section>

          <StepNav onBack={() => setStep(1)} onContinue={() => canContinue && setStep(3)} canContinue={!!step2Valid} backLabel="Back" continueLabel="Continue" />
        </div>
      )}

      {/* Step 3: Branding */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <Section title="Branding" icon={Palette} subtitle="Customize how the audit report and proposal appear to your client.">
            {/* Use default toggle */}
            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-ink-200 hover:border-ink-300 cursor-pointer transition-all mb-5">
              <input
                type="checkbox"
                checked={form.useDefaultBranding}
                onChange={(e) => set("useDefaultBranding", e.target.checked)}
                className="h-5 w-5 rounded brand-accent"
              />
              <div className="flex-1">
                <p className="font-medium text-ink-900 text-sm">Use default agency branding</p>
                <p className="text-xs text-ink-500 mt-0.5">Apply your workspace branding settings to this audit.</p>
              </div>
              <div className="flex items-center gap-2">
                <AgencyLogo size={32} />
                <span className="text-sm font-medium text-ink-700">{branding.agencyName}</span>
              </div>
            </label>

            {/* Custom branding */}
            {!form.useDefaultBranding && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Agency Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl border-2 border-dashed border-ink-200 flex items-center justify-center bg-ink-50 overflow-hidden shrink-0">
                      {logoPreview ? <img src={logoPreview} alt="Logo preview" className="h-full w-full object-contain" /> : <Upload className="h-6 w-6 text-ink-400" />}
                    </div>
                    <label className="cursor-pointer">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-ink-200 bg-white text-sm font-medium text-ink-700 hover:bg-ink-50 transition-colors">
                        <Upload className="h-4 w-4" /> Upload logo
                      </span>
                      <input type="file" accept="image/*" onChange={handleLogo} className="hidden" />
                    </label>
                  </div>
                  <p className="text-xs text-ink-400 mt-2">PNG or SVG, up to 2MB. Used on client-facing pages.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Agency Name</label>
                  <input value={form.agencyName} onChange={(e) => set("agencyName", e.target.value)} className={inputCls} placeholder="Northstar SEO" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Primary Brand Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={form.brandColor} onChange={(e) => set("brandColor", e.target.value)} className="h-11 w-14 rounded-lg border border-ink-200 cursor-pointer bg-white p-1" />
                    <input value={form.brandColor} onChange={(e) => set("brandColor", e.target.value)} className={`${inputCls} max-w-[140px]`} placeholder="#0d9488" />
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {["#0d9488", "#2563eb", "#dc2626", "#ea580c", "#7c3aed"].map((c) => (
                      <button key={c} type="button" onClick={() => set("brandColor", c)} className="h-7 w-7 rounded-lg border-2 border-white shadow-soft" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Secondary Brand Color</label>
                  <div className="flex items-center gap-3">
                    <input type="color" value={form.secondaryBrandColor} onChange={(e) => set("secondaryBrandColor", e.target.value)} className="h-11 w-14 rounded-lg border border-ink-200 cursor-pointer bg-white p-1" />
                    <input value={form.secondaryBrandColor} onChange={(e) => set("secondaryBrandColor", e.target.value)} className={`${inputCls} max-w-[140px]`} placeholder="#1e293b" />
                  </div>
                </div>
              </div>
            )}

            {form.useDefaultBranding && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-ink-50 border border-ink-100">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500 mb-2">Current Agency Branding</p>
                  <div className="flex items-center gap-3">
                    <AgencyLogo size={36} />
                    <div>
                      <p className="font-semibold text-ink-900">{branding.agencyName}</p>
                      <p className="text-xs text-ink-500">{branding.website}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-ink-50 border border-ink-100">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500 mb-2">Brand Colors</p>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-8 w-8 rounded-lg shadow-soft" style={{ backgroundColor: branding.brandColor }} />
                      <span className="text-xs text-ink-500">Primary</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-8 w-8 rounded-lg shadow-soft" style={{ backgroundColor: branding.secondaryColor || "#1e293b" }} />
                      <span className="text-xs text-ink-500">Secondary</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Section>

          <StepNav onBack={() => setStep(2)} onContinue={() => canContinue && setStep(4)} canContinue={step3Valid} backLabel="Back" continueLabel="Continue" />
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div className="space-y-6 animate-fade-in">
          <Section title="Review & Confirm" icon={CheckCircle2} subtitle="Check everything looks right before starting the audit.">
            <div className="space-y-5">
              <ReviewGroup title="Client">
                <ReviewItem label="Client Name" value={form.clientName} />
                <ReviewItem label="Company" value={form.clientCompany || "—"} />
                <ReviewItem label="Email" value={form.clientEmail || "—"} />
                <ReviewItem label="Phone" value={form.clientPhone || "—"} />
                <ReviewItem label="Website" value={form.websiteUrl} />
                <ReviewItem label="Industry" value={form.industry} />
                <ReviewItem label="Primary Service" value={form.primaryService || "—"} />
                <ReviewItem label="Secondary Services" value={form.secondaryServices || "—"} />
              </ReviewGroup>

              <ReviewGroup title="Target Location">
                <ReviewItem label="Country" value={form.targetCountry} />
                <ReviewItem label="City" value={form.targetCity || "—"} />
              </ReviewGroup>

              <ReviewGroup title="Audit Configuration">
                <ReviewItem label="Audit Depth" value={auditDepths.find((d) => d.value === form.auditDepth)?.label || form.auditDepth} />
                <ReviewItem label="Pages to Crawl" value={form.pagesToCrawl === "custom" ? `${form.customPages} pages` : `${form.pagesToCrawl} pages`} />
                <ReviewItem label="Audit Areas" value={form.auditAreas.map((a) => auditAreas.find((ar) => ar.key === a)?.label || a).join(", ")} />
              </ReviewGroup>

              <ReviewGroup title="Agency Branding">
                <ReviewItem label="Branding" value={form.useDefaultBranding ? "Default agency branding" : "Custom branding"} />
                {!form.useDefaultBranding && (
                  <>
                    <ReviewItem label="Agency Name" value={form.agencyName} />
                    <ReviewItem label="Primary Color" value={form.brandColor} color={form.brandColor} />
                    <ReviewItem label="Secondary Color" value={form.secondaryBrandColor} color={form.secondaryBrandColor} />
                  </>
                )}
              </ReviewGroup>
            </div>
          </Section>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-ink-200 bg-white text-sm font-medium text-ink-700 hover:bg-ink-50 transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={submit}
              disabled={submitting}
              className="brand-gradient text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-soft w-full sm:w-auto justify-center"
            >
              {submitting ? (
                <><span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Starting…</>
              ) : (
                <>Start SEO Audit <Sparkles className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, icon: Icon, subtitle, children }: { title: string; icon: React.ComponentType<{ className?: string }>; subtitle?: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center">
          <Icon className="h-5 w-5 brand-soft-text" />
        </div>
        <h2 className="font-semibold text-ink-900">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-ink-500 mb-5 ml-11">{subtitle}</p>}
      <div className={subtitle ? "" : "mt-5"}>{children}</div>
    </div>
  );
}

function Field({ icon: Icon, label, required, children }: { icon: React.ComponentType<{ className?: string }>; label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none" />
        <div className="pl-9">{children}</div>
      </div>
    </div>
  );
}

function StepNav({ onBack, onContinue, canContinue, backLabel, continueLabel }: { onBack: () => void; onContinue: () => void; canContinue: boolean; backLabel: string; continueLabel: string }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-ink-200 bg-white text-sm font-medium text-ink-700 hover:bg-ink-50 transition-colors w-full sm:w-auto justify-center"
      >
        <ArrowLeft className="h-4 w-4" /> {backLabel}
      </button>
      <button
        onClick={onContinue}
        disabled={!canContinue}
        className="brand-gradient text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-soft w-full sm:w-auto justify-center"
      >
        {continueLabel} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ReviewGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink-900 mb-2 pb-2 border-b border-ink-100">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">{children}</div>
    </div>
  );
}

function ReviewItem({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1">
      <span className="text-sm text-ink-500 shrink-0">{label}</span>
      <div className="flex items-center gap-2 min-w-0">
        {color && <span className="h-4 w-4 rounded shrink-0" style={{ backgroundColor: color }} />}
        <span className="text-sm font-medium text-ink-900 text-right truncate">{value}</span>
      </div>
    </div>
  );
}
