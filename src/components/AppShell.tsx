import { useState, type ReactNode } from "react";
import { LayoutDashboard, FileSearch, FileText, Users, Palette, Settings, Search, Bell, Menu, X, Plus, ChevronDown } from "lucide-react";
import { AgencyLogo } from "@/components/AgencyLogo";
import { useBrand } from "@/brand";
import { mockUser } from "@/mockData";

export type NavKey = "dashboard" | "audits" | "proposals" | "clients" | "branding" | "settings";

interface ShellProps {
  active: NavKey;
  onNavigate: (key: NavKey) => void;
  onNewAudit: () => void;
  onLogoClick: () => void;
  children: ReactNode;
}

const navItems: { key: NavKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "audits", label: "Audits", icon: FileSearch },
  { key: "proposals", label: "Proposals", icon: FileText },
  { key: "clients", label: "Clients", icon: Users },
  { key: "branding", label: "Branding", icon: Palette },
  { key: "settings", label: "Settings", icon: Settings },
];

export function AppShell({ active, onNavigate, onNewAudit, onLogoClick, children }: ShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { branding } = useBrand();

  return (
    <div className="min-h-screen bg-ink-50 flex">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 bg-white border-r border-ink-200 z-30">
        <SidebarContent
          active={active}
          onNavigate={(k) => { onNavigate(k); onLogoClick(); }}
          onNewAudit={onNewAudit}
          onLogoClick={onLogoClick}
        />
      </aside>

      {/* Sidebar - mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-white flex flex-col animate-slide-in">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-ink-100">
              <X className="h-5 w-5 text-ink-500" />
            </button>
            <SidebarContent
              active={active}
              onNavigate={(k) => { onNavigate(k); setMobileOpen(false); }}
              onNewAudit={() => { onNewAudit(); setMobileOpen(false); }}
              onLogoClick={() => { onLogoClick(); setMobileOpen(false); }}
            />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-ink-200">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3 flex-1">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-ink-100">
                <Menu className="h-5 w-5 text-ink-600" />
              </button>
              <div className="relative max-w-md w-full hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <input
                  type="text"
                  placeholder="Search audits, clients, proposals…"
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-2 rounded-lg hover:bg-ink-100 relative">
                <Bell className="h-5 w-5 text-ink-600" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>
              <div className="flex items-center gap-2.5 pl-2 sm:pl-3 sm:border-l sm:border-ink-200">
                <div className="h-9 w-9 rounded-full brand-gradient flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {mockUser.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-ink-900 leading-tight">{mockUser.name}</p>
                  <p className="text-xs text-ink-500">{mockUser.role}</p>
                </div>
                <ChevronDown className="hidden sm:block h-4 w-4 text-ink-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );

  function SidebarContent({ active, onNavigate, onNewAudit, onLogoClick }: { active: NavKey; onNavigate: (k: NavKey) => void; onNewAudit: () => void; onLogoClick: () => void }) {
    return (
      <>
        <div className="h-16 flex items-center px-5 border-b border-ink-200">
          <button onClick={onLogoClick} className="flex items-center">
            <AgencyLogo size={30} />
          </button>
        </div>
        <div className="p-4">
          <button
            onClick={onNewAudit}
            className="w-full brand-gradient text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-soft"
          >
            <Plus className="h-4 w-4" /> New SEO Audit
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "brand-soft-bg brand-soft-text" : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full brand-bg" />}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-ink-200">
          <div className="rounded-xl bg-ink-50 p-4">
            <p className="text-sm font-semibold text-ink-900">{branding.agencyName}</p>
            <p className="text-xs text-ink-500 mt-0.5">{branding.website}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-ink-500">Workspace active</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
