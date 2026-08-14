import { useState } from "react";
import { Search, Mail, Lock, ArrowRight, ShieldCheck, BarChart3, Sparkles } from "lucide-react";
import { AgencyLogo } from "@/components/AgencyLogo";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("alex@northstarseo.com");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => onLogin(), 700);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 brand-gradient relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)" }} />
        <div className="relative z-10 flex items-center gap-2">
          <AgencyLogo size={36} className="[&_span]:text-white" />
        </div>
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            AI-powered SEO audits that win clients.
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Crawl, analyze, and generate client-ready proposals in minutes — not days. Turn audit findings into signed contracts.
          </p>
          <div className="mt-10 space-y-4">
            <Feature icon={BarChart3} title="Deep SEO scoring" desc="8 categories from technical to AI/GEO, scored 0-100" />
            <Feature icon={Sparkles} title="AI-generated proposals" desc="Auto-drafted executive summaries, roadmaps, and pricing" />
            <Feature icon={ShieldCheck} title="White-label branding" desc="Your logo and colors on every client-facing page" />
          </div>
        </div>
        <div className="relative z-10 text-white/60 text-sm">
          © 2026 Northstar SEO. All rights reserved.
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-ink-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <AgencyLogo size={40} />
          </div>
          <div className="bg-white rounded-2xl shadow-elevated p-8 border border-ink-100">
            <h2 className="text-2xl font-bold text-ink-900">Welcome back</h2>
            <p className="text-ink-500 mt-1.5">Sign in to your SEO Audit Pro workspace.</p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent transition-all"
                    placeholder="you@agency.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-ink-200 bg-ink-50 focus:bg-white focus:outline-none focus:ring-2 brand-ring focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-ink-600">
                  <input type="checkbox" defaultChecked className="rounded border-ink-300 text-teal-600 focus:ring-teal-500" />
                  Remember me
                </label>
                <a href="#" className="brand-text font-medium hover:underline">Forgot password?</a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full brand-gradient text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? (
                  <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign in <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-ink-500 mt-6">
              Don't have an account? <a href="#" className="brand-text font-medium hover:underline">Start free trial</a>
            </p>
          </div>
          <p className="text-center text-xs text-ink-400 mt-6">
            Demo mode — credentials are pre-filled. Just click Sign in.
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/15 shrink-0">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-white/70 text-sm">{desc}</p>
      </div>
    </div>
  );
}
