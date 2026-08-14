import { useState } from "react";
import { User, Bell, Shield, Globe, Save, Check } from "lucide-react";
import { mockUser } from "@/mockData";

export function SettingsScreen() {
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ auditComplete: true, proposalViewed: true, weeklyDigest: false, productUpdates: true });

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Settings</h1>
        <p className="text-ink-500 mt-1">Manage your account, notifications, and workspace preferences.</p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center"><User className="h-5 w-5 brand-soft-text" /></div>
          <h2 className="font-semibold text-ink-900">Profile</h2>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div className="h-16 w-16 rounded-full brand-gradient flex items-center justify-center text-white font-bold text-xl">{mockUser.name.split(" ").map((n) => n[0]).join("")}</div>
          <div>
            <p className="font-semibold text-ink-900">{mockUser.name}</p>
            <p className="text-sm text-ink-500">{mockUser.role}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name"><input defaultValue={mockUser.name} className={inputCls} /></Field>
          <Field label="Email"><input defaultValue={mockUser.email} className={inputCls} /></Field>
          <Field label="Role"><input defaultValue={mockUser.role} className={inputCls} disabled /></Field>
          <Field label="Timezone"><select className={inputCls}><option>America/Los_Angeles</option><option>America/New_York</option><option>Europe/London</option><option>Asia/Singapore</option></select></Field>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center"><Bell className="h-5 w-5 brand-soft-text" /></div>
          <h2 className="font-semibold text-ink-900">Notifications</h2>
        </div>
        <div className="space-y-3">
          <Toggle label="Audit complete" desc="Get notified when an audit finishes processing" checked={notifications.auditComplete} onChange={(v) => setNotifications((n) => ({ ...n, auditComplete: v }))} />
          <Toggle label="Proposal viewed" desc="Get notified when a client opens a proposal" checked={notifications.proposalViewed} onChange={(v) => setNotifications((n) => ({ ...n, proposalViewed: v }))} />
          <Toggle label="Weekly digest" desc="Receive a weekly summary of audit activity" checked={notifications.weeklyDigest} onChange={(v) => setNotifications((n) => ({ ...n, weeklyDigest: v }))} />
          <Toggle label="Product updates" desc="Be the first to know about new features" checked={notifications.productUpdates} onChange={(v) => setNotifications((n) => ({ ...n, productUpdates: v }))} />
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center"><Shield className="h-5 w-5 brand-soft-text" /></div>
          <h2 className="font-semibold text-ink-900">Security</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Current Password"><input type="password" placeholder="••••••••" className={inputCls} /></Field>
          <Field label="New Password"><input type="password" placeholder="••••••••" className={inputCls} /></Field>
        </div>
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-ink-50">
          <div>
            <p className="text-sm font-medium text-ink-900">Two-factor authentication</p>
            <p className="text-xs text-ink-500">Add an extra layer of security to your account</p>
          </div>
          <button className="text-sm font-medium brand-text hover:underline">Enable</button>
        </div>
      </div>

      {/* Workspace */}
      <div className="bg-white rounded-2xl border border-ink-200 shadow-card p-5 sm:p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-9 w-9 rounded-lg brand-soft-bg flex items-center justify-center"><Globe className="h-5 w-5 brand-soft-text" /></div>
          <h2 className="font-semibold text-ink-900">Workspace</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Workspace Name"><input defaultValue="Northstar SEO" className={inputCls} /></Field>
          <Field label="Default Country"><select className={inputCls}><option>United States</option><option>Canada</option><option>United Kingdom</option></select></Field>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        {saved && <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium animate-fade-in"><Check className="h-4 w-4" /> Settings saved</span>}
        <button onClick={save} className="brand-gradient text-white font-semibold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity shadow-soft">
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}

const inputCls = "w-full px-3 py-2.5 rounded-lg border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent transition-all text-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-ink-50 transition-colors">
      <div>
        <p className="text-sm font-medium text-ink-900">{label}</p>
        <p className="text-xs text-ink-500">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "brand-bg" : "bg-ink-200"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}
