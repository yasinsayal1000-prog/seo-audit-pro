import { useState } from "react";
import { Upload, Palette, Check, Save, Building2, Mail, Phone, Globe, MapPin, Tag } from "lucide-react";
import { useBrand } from "@/brand";
import { AgencyLogo } from "@/components/AgencyLogo";

export function BrandingScreen() {
  const { branding, updateBranding } = useBrand();
  const [saved, setSaved] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>(branding.logoUrl || "");

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setLogoPreview(url);
      updateBranding({ logoUrl: url });
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Branding</h1>
        <p className="text-ink-500 mt-1">Customize how your agency appears across client-facing pages and proposals.</p>
      </div>

      {/* Live preview */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
        <h2 className="font-semibold text-ink-900 mb-4">Live Preview</h2>
        <div className="brand-gradient rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {branding.logoUrl ? (
                <img src={branding.logoUrl} alt={branding.agencyName} className="h-8 w-auto object-contain max-w-[160px]" />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center font-bold">{branding.agencyName.slice(0, 1)}</div>
                  <span className="font-bold">{branding.agencyName}</span>
                </div>
              )}
            </div>
            <button className="bg-white text-ink-900 text-sm font-semibold px-4 py-2 rounded-lg">Start Audit</button>
          </div>
          <p className="mt-4 text-white/80 text-sm">{branding.tagline}</p>
        </div>
      </div>

      {/* Agency details */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center">
            <Building2 className="h-5 w-5 brand-soft-text" />
          </div>
          <h2 className="font-semibold text-ink-900">Agency Details</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Agency Name">
            <input value={branding.agencyName} onChange={(e) => updateBranding({ agencyName: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Tagline">
            <input value={branding.tagline} onChange={(e) => updateBranding({ tagline: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Contact Email" icon={Mail}>
            <input value={branding.contactEmail} onChange={(e) => updateBranding({ contactEmail: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Contact Phone" icon={Phone}>
            <input value={branding.contactPhone} onChange={(e) => updateBranding({ contactPhone: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Website" icon={Globe}>
            <input value={branding.website} onChange={(e) => updateBranding({ website: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Address" icon={MapPin}>
            <input value={branding.address} onChange={(e) => updateBranding({ address: e.target.value })} className={inputCls} />
          </Field>
        </div>
      </div>

      {/* Logo & color */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center">
            <Palette className="h-5 w-5 brand-soft-text" />
          </div>
          <h2 className="font-semibold text-ink-900">Logo & Brand Color</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Agency Logo</label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-xl border-2 border-dashed border-ink-200 flex items-center justify-center bg-ink-50 overflow-hidden shrink-0">
                {logoPreview ? <img src={logoPreview} alt="Logo" className="h-full w-full object-contain" /> : <AgencyLogo size={32} />}
              </div>
              <div>
                <label className="cursor-pointer">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-ink-200 bg-white text-sm font-medium text-ink-700 hover:bg-ink-50 transition-colors">
                    <Upload className="h-4 w-4" /> Upload logo
                  </span>
                  <input type="file" accept="image/*" onChange={handleLogo} className="hidden" />
                </label>
                {branding.logoUrl && (
                  <button onClick={() => { updateBranding({ logoUrl: "" }); setLogoPreview(""); }} className="block text-xs text-ink-400 hover:text-red-500 mt-2">
                    Remove logo
                  </button>
                )}
                <p className="text-xs text-ink-400 mt-2">PNG or SVG recommended.</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Brand Color</label>
            <div className="flex items-center gap-3 mb-3">
              <input type="color" value={branding.brandColor} onChange={(e) => updateBranding({ brandColor: e.target.value })} className="h-11 w-14 rounded-lg border border-ink-200 cursor-pointer bg-white p-1" />
              <input value={branding.brandColor} onChange={(e) => updateBranding({ brandColor: e.target.value })} className={`${inputCls} max-w-[140px]`} />
            </div>
            <div className="flex flex-wrap gap-2">
              {["#0d9488", "#2563eb", "#dc2626", "#ea580c", "#7c3aed", "#0891b2", "#16a34a", "#db2777"].map((c) => (
                <button
                  key={c}
                  onClick={() => updateBranding({ brandColor: c })}
                  className={`h-9 w-9 rounded-lg border-2 transition-all ${branding.brandColor.toLowerCase() === c ? "border-ink-900 scale-110" : "border-white"}`}
                  style={{ backgroundColor: c }}
                >
                  {branding.brandColor.toLowerCase() === c && <Check className="h-4 w-4 text-white mx-auto" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium animate-fade-in">
            <Check className="h-4 w-4" /> Changes saved
          </span>
        )}
        <button onClick={save} className="brand-gradient text-white font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity shadow-soft">
          <Save className="h-4 w-4" /> Save Branding
        </button>
      </div>
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-lg border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent transition-all text-sm";

function Field({ label, icon: Icon, children }: { label: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none z-10" />}
        <div className={Icon ? "pl-9" : ""}>{children}</div>
      </div>
    </div>
  );
}
