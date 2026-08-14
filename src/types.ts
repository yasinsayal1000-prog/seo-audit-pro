export type AuditStatus = "completed" | "processing" | "queued" | "failed";

export type AuditDepth = "quick" | "standard" | "comprehensive";

export interface AuditFormData {
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  websiteUrl: string;
  industry: string;
  targetCountry: string;
  targetCity: string;
  primaryService: string;
  secondaryServices: string;
  auditDepth: AuditDepth;
  pagesToCrawl: number | "custom";
  customPages: number;
  auditAreas: string[];
  logoUrl: string;
  agencyName: string;
  brandColor: string;
  secondaryBrandColor: string;
  useDefaultBranding: boolean;
}

export type IssueSeverity = "critical" | "high" | "medium" | "low" | "passed";

export type ScoreCategory =
  | "technical"
  | "onpage"
  | "content"
  | "performance"
  | "mobile"
  | "schema"
  | "linking"
  | "geo";

export interface ScoreBreakdown {
  technical: number;
  onpage: number;
  content: number;
  performance: number;
  mobile: number;
  schema: number;
  linking: number;
  geo: number;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  whyItMatters: string;
  recommendedAction: string;
  priority: IssueSeverity;
  affectedPages: number;
  affectedExamples: string[];
}

export interface Audit {
  id: string;
  clientName: string;
  clientCompany: string;
  websiteUrl: string;
  clientEmail: string;
  industry: string;
  targetCountry: string;
  targetCity: string;
  mainServices: string;
  logoUrl?: string;
  brandColor?: string;
  status: AuditStatus;
  overallScore: number;
  scores: ScoreBreakdown;
  createdAt: string;
  completedAt?: string;
  issues: Issue[];
  executiveSummary: string;
  keyProblems: string[];
  recommendedSolutions: string[];
  seoPriorities: { phase: string; items: string[] }[];
  objectives: string[];
  recommendedServices: { name: string; description: string; price: string }[];
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  website: string;
  industry: string;
  audits: number;
  lastAuditDate: string;
  avgScore: number;
  status: "active" | "pending" | "churned";
}

export interface PriorityIssueSummary {
  client: string;
  critical: number;
  high: number;
  medium: number;
  total: number;
}

export interface Proposal {
  id: string;
  auditId: string;
  clientName: string;
  company: string;
  website: string;
  score: number;
  createdAt: string;
  status: "draft" | "sent" | "viewed" | "accepted";
}

export interface BrandingSettings {
  agencyName: string;
  logoUrl?: string;
  brandColor: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  address: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}
