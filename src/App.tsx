import { useState } from "react";
import { BrandProvider } from "@/brand";
import { LoginScreen } from "@/screens/LoginScreen";
import { AppShell, type NavKey } from "@/components/AppShell";
import { DashboardScreen } from "@/screens/DashboardScreen";
import { NewAuditScreen } from "@/screens/NewAuditScreen";
import { AuditProcessingScreen } from "@/screens/AuditProcessingScreen";
import { AuditResultsScreen } from "@/screens/AuditResultsScreen";
import { ProposalPreviewScreen } from "@/screens/ProposalPreviewScreen";
import { AuditsScreen } from "@/screens/AuditsScreen";
import { ProposalsScreen } from "@/screens/ProposalsScreen";
import { ClientsScreen } from "@/screens/ClientsScreen";
import { BrandingScreen } from "@/screens/BrandingScreen";
import { SettingsScreen } from "@/screens/SettingsScreen";
import { mockAudits, generateMockAudit } from "@/mockData";
import type { Audit, AuditFormData } from "@/types";

type Screen =
  | { name: "dashboard" }
  | { name: "audits" }
  | { name: "proposals" }
  | { name: "clients" }
  | { name: "branding" }
  | { name: "settings" }
  | { name: "new-audit" }
  | { name: "processing"; form: AuditFormData }
  | { name: "results"; auditId: string }
  | { name: "proposal"; auditId: string };

function AppContent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>({ name: "dashboard" });
  const [customAudits, setCustomAudits] = useState<Audit[]>([]);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  const allAudits = [...customAudits, ...mockAudits];

  const navKey: NavKey = (() => {
    switch (screen.name) {
      case "dashboard": return "dashboard";
      case "audits": return "audits";
      case "proposals": return "proposals";
      case "clients": return "clients";
      case "branding": return "branding";
      case "settings": return "settings";
      case "new-audit":
      case "processing":
      case "results":
      case "proposal":
        return "audits";
    }
  })();

  const navigate = (key: NavKey) => setScreen({ name: key } as Screen);

  const startAudit = (form: AuditFormData) => setScreen({ name: "processing", form });

  const finishProcessing = () => {
    if (screen.name !== "processing") return;
    const audit = generateMockAudit(screen.form);
    setCustomAudits((prev) => [audit, ...prev]);
    setScreen({ name: "results", auditId: audit.id });
  };

  const openAudit = (id: string) => setScreen({ name: "results", auditId: id });
  const openProposal = (auditId: string) => setScreen({ name: "proposal", auditId });

  const currentAudit = screen.name === "results" || screen.name === "proposal" ? allAudits.find((a) => a.id === screen.auditId) : undefined;

  return (
    <AppShell
      active={navKey}
      onNavigate={navigate}
      onNewAudit={() => setScreen({ name: "new-audit" })}
      onLogoClick={() => setScreen({ name: "dashboard" })}
    >
      {screen.name === "dashboard" && (
        <DashboardScreen
          onNewAudit={() => setScreen({ name: "new-audit" })}
          onOpenAudit={openAudit}
          onNavigate={(k) => setScreen({ name: k } as Screen)}
          onAddClient={() => setScreen({ name: "clients" })}
          onGenerateProposal={() => setScreen({ name: "proposals" })}
        />
      )}

      {screen.name === "audits" && (
        <AuditsScreen onNewAudit={() => setScreen({ name: "new-audit" })} onOpenAudit={openAudit} />
      )}

      {screen.name === "proposals" && (
        <ProposalsScreen onOpenProposal={openProposal} onGenerateProposal={() => setScreen({ name: "audits" })} />
      )}

      {screen.name === "clients" && (
        <ClientsScreen
          onOpenClientAudit={(email) => {
            const audit = allAudits.find((a) => a.clientEmail === email);
            if (audit) openAudit(audit.id);
          }}
          onAddClient={() => setScreen({ name: "clients" })}
        />
      )}

      {screen.name === "branding" && <BrandingScreen />}

      {screen.name === "settings" && <SettingsScreen />}

      {screen.name === "new-audit" && (
        <NewAuditScreen onStart={startAudit} onBack={() => setScreen({ name: "dashboard" })} />
      )}

      {screen.name === "processing" && (
        <AuditProcessingScreen onComplete={finishProcessing} websiteUrl={screen.form.websiteUrl} />
      )}

      {screen.name === "results" && currentAudit && (
        <AuditResultsScreen
          audit={currentAudit}
          onBack={() => setScreen({ name: "audits" })}
          onNavigate={() => {}}
          onViewIssues={() => {}}
          onViewRecommendations={() => {}}
          onViewStrategy={() => {}}
          onViewProposal={() => setScreen({ name: "proposal", auditId: currentAudit.id })}
        />
      )}

      {screen.name === "proposal" && currentAudit && (
        <ProposalPreviewScreen audit={currentAudit} onBack={() => setScreen({ name: "results", auditId: currentAudit.id })} />
      )}

      {(screen.name === "results" || screen.name === "proposal") && !currentAudit && (
        <div className="p-12 text-center text-ink-500">Audit not found.</div>
      )}
    </AppShell>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <AppContent />
    </BrandProvider>
  );
}
