import type { Audit, Client, Proposal, BrandingSettings, User, Issue, PriorityIssueSummary, AuditFormData } from "./types";

export const mockUser: User = {
  name: "Alex Morgan",
  email: "alex@northstarseo.com",
  role: "Agency Admin",
};

export const defaultBranding: BrandingSettings = {
  agencyName: "Northstar SEO",
  logoUrl: "",
  brandColor: "#0d9488",
  tagline: "Data-driven SEO that moves rankings and revenue.",
  contactEmail: "hello@northstarseo.com",
  contactPhone: "+1 (415) 555-0182",
  website: "www.northstarseo.com",
  address: "548 Market Street, Suite 1200, San Francisco, CA 94104",
};

const issuesCritical: Issue[] = [
  {
    id: "c1",
    title: "Missing meta descriptions on 42 pages",
    description: "42 pages are missing meta descriptions, which are essential for search engine snippets and click-through rates.",
    whyItMatters: "Pages without meta descriptions let search engines auto-generate snippets, often resulting in lower CTR and lost organic traffic.",
    recommendedAction: "Write unique, compelling meta descriptions (140-160 characters) for each affected page, including primary keywords and a call to action.",
    priority: "critical",
    affectedPages: 42,
    affectedExamples: ["/about", "/services/consulting", "/blog/2023-trends"],
  },
  {
    id: "c2",
    title: "Broken internal links detected",
    description: "18 internal links point to pages returning 404 status codes, disrupting crawl paths and user navigation.",
    whyItMatters: "Broken links waste crawl budget, frustrate users, and prevent link equity from flowing to important pages.",
    recommendedAction: "Identify all 404 links via a site crawl, update or remove the broken links, and add 301 redirects where appropriate.",
    priority: "critical",
    affectedPages: 18,
    affectedExamples: ["/old-services", "/team/legacy", "/products/v1"],
  },
  {
    id: "c3",
    title: "No XML sitemap submitted",
    description: "The website does not have a valid XML sitemap submitted to Google Search Console.",
    whyItMatters: "Without a sitemap, search engines may miss important pages or index them slowly, delaying content discovery.",
    recommendedAction: "Generate an XML sitemap covering all indexable pages and submit it via Google Search Console and Bing Webmaster Tools.",
    priority: "critical",
    affectedPages: 1,
    affectedExamples: ["/sitemap.xml"],
  },
];

const issuesHigh: Issue[] = [
  {
    id: "h1",
    title: "Title tags exceed 60 characters",
    description: "27 page titles exceed the recommended 60-character limit and may be truncated in search results.",
    whyItMatters: "Truncated titles reduce visibility and CTR, meaning fewer clicks even when you rank well.",
    recommendedAction: "Rewrite titles to 50-60 characters, front-loading primary keywords and brand name.",
    priority: "high",
    affectedPages: 27,
    affectedExamples: ["/services", "/case-studies", "/blog/seo-guide"],
  },
  {
    id: "h2",
    title: "Slow Largest Contentful Paint (LCP)",
    description: "LCP on key landing pages averages 4.2s, well above the 2.5s threshold for good Core Web Vitals.",
    whyItMatters: "Slow LCP correlates with higher bounce rates and is a confirmed Google ranking factor.",
    recommendedAction: "Optimize hero images, enable lazy loading, defer non-critical JS, and upgrade to a CDN.",
    priority: "high",
    affectedPages: 12,
    affectedExamples: ["/", "/pricing", "/services/audit"],
  },
  {
    id: "h3",
    title: "Missing H1 tags on landing pages",
    description: "9 key landing pages have no H1 heading, weakening topical relevance signals.",
    whyItMatters: "H1 tags help search engines understand the primary topic of a page and improve accessibility.",
    recommendedAction: "Add a single descriptive H1 to each page containing the primary target keyword.",
    priority: "high",
    affectedPages: 9,
    affectedExamples: ["/contact", "/faq", "/partners"],
  },
  {
    id: "h4",
    title: "Thin content on blog posts",
    description: "15 blog posts have fewer than 300 words, offering little value to users or search engines.",
    whyItMatters: "Thin content rarely ranks and can pull down overall site quality scores.",
    recommendedAction: "Expand each post to 800+ words with original research, examples, and internal links to cornerstone content.",
    priority: "high",
    affectedPages: 15,
    affectedExamples: ["/blog/welcome", "/blog/updates", "/blog/news-1"],
  },
];

const issuesMedium: Issue[] = [
  {
    id: "m1",
    title: "Images missing alt text",
    description: "64 images across the site lack descriptive alt attributes.",
    whyItMatters: "Alt text improves accessibility and helps images appear in image search results.",
    recommendedAction: "Add concise, descriptive alt text to all meaningful images; use empty alt for decorative images.",
    priority: "medium",
    affectedPages: 64,
    affectedExamples: ["/blog/img/hero.jpg", "/team/img/ceo.png"],
  },
  {
    id: "m2",
    title: "No structured data (schema markup)",
    description: "The site has no JSON-LD schema markup for organization, breadcrumbs, or articles.",
    whyItMatters: "Schema markup enables rich results, increasing SERP visibility and CTR.",
    recommendedAction: "Implement Organization, BreadcrumbList, and Article schema via JSON-LD on relevant pages.",
    priority: "medium",
    affectedPages: 1,
    affectedExamples: ["site-wide"],
  },
  {
    id: "m3",
    title: "Low text-to-HTML ratio",
    description: "23 pages have a text-to-HTML ratio below 10%, indicating heavy code bloat.",
    whyItMatters: "Low ratio can signal to search engines that a page is light on content.",
    recommendedAction: "Minify HTML, remove inline styles, and increase content density on affected pages.",
    priority: "medium",
    affectedPages: 23,
    affectedExamples: ["/landing/promo", "/landing/webinar"],
  },
  {
    id: "m4",
    title: "Inconsistent heading hierarchy",
    description: "Several pages skip heading levels (e.g., H2 to H4), confusing screen readers and crawlers.",
    whyItMatters: "Proper heading hierarchy improves accessibility and helps search engines parse content structure.",
    recommendedAction: "Audit heading order on each template and ensure logical H1 → H2 → H3 nesting.",
    priority: "medium",
    affectedPages: 14,
    affectedExamples: ["/about", "/careers", "/legal/privacy"],
  },
];

const issuesLow: Issue[] = [
  {
    id: "l1",
    title: "URLs contain underscores",
    description: "8 URLs use underscores instead of hyphens, which are less search-friendly.",
    whyItMatters: "Hyphens are the word separator Google recommends; underscores can split keywords incorrectly.",
    recommendedAction: "Redirect underscore URLs to hyphenated versions using 301 redirects.",
    priority: "low",
    affectedPages: 8,
    affectedExamples: ["/our_team", "/case_studies"],
  },
  {
    id: "l2",
    title: "Favicon not optimized",
    description: "The favicon is a single 16x16 file without modern sizes for various devices.",
    whyItMatters: "Missing favicon sizes can affect branding in browser tabs and bookmarks.",
    recommendedAction: "Generate a multi-size favicon set (16, 32, 180, 192, 512) and reference them in the head.",
    priority: "low",
    affectedPages: 1,
    affectedExamples: ["site-wide"],
  },
  {
    id: "l3",
    title: "No hreflang tags for international pages",
    description: "The site targets multiple regions but lacks hreflang annotations.",
    whyItMatters: "Without hreflang, Google may serve the wrong regional version to users.",
    recommendedAction: "Add hreflang tags to all regional pages and submit via sitemap.",
    priority: "low",
    affectedPages: 6,
    affectedExamples: ["/uk/", "/au/", "/ca/"],
  },
];

const issuesPassed: Issue[] = [
  {
    id: "p1",
    title: "HTTPS enabled site-wide",
    description: "All pages are served over HTTPS with a valid SSL certificate.",
    whyItMatters: "HTTPS is a confirmed ranking signal and essential for user trust.",
    recommendedAction: "No action needed. Maintain certificate renewal and enforce HSTS.",
    priority: "passed",
    affectedPages: 0,
    affectedExamples: [],
  },
  {
    id: "p2",
    title: "Mobile-responsive layout",
    description: "The site uses a responsive design that adapts to all viewport sizes.",
    whyItMatters: "Mobile-friendliness is a ranking factor and affects the majority of users.",
    recommendedAction: "No action needed. Continue testing new templates on mobile devices.",
    priority: "passed",
    affectedPages: 0,
    affectedExamples: [],
  },
  {
    id: "p3",
    title: "Robots.txt configured correctly",
    description: "The robots.txt file allows crawling of important pages and blocks irrelevant paths.",
    whyItMatters: "A correct robots.txt ensures efficient crawl budget usage.",
    recommendedAction: "No action needed.",
    priority: "passed",
    affectedPages: 0,
    affectedExamples: [],
  },
  {
    id: "p4",
    title: "Canonical tags present",
    description: "All indexable pages have self-referencing canonical tags.",
    whyItMatters: "Canonical tags prevent duplicate-content issues and consolidate ranking signals.",
    recommendedAction: "No action needed.",
    priority: "passed",
    affectedPages: 0,
    affectedExamples: [],
  },
];

const allIssues: Issue[] = [
  ...issuesCritical,
  ...issuesHigh,
  ...issuesMedium,
  ...issuesLow,
  ...issuesPassed,
];

function makeAudit(partial: Partial<Audit> & { id: string }): Audit {
  const overallScore = partial.overallScore ?? 62;
  return {
    clientName: "Jordan Reyes",
    clientCompany: "Brightpath Consulting",
    websiteUrl: "https://www.brightpathconsulting.com",
    clientEmail: "jordan@brightpathconsulting.com",
    industry: "Business Consulting",
    targetCountry: "United States",
    targetCity: "Austin, TX",
    mainServices: "Strategy consulting, leadership coaching, market research",
    status: "completed",
    overallScore,
    scores: {
      technical: Math.min(100, overallScore + 8),
      onpage: Math.max(20, overallScore - 5),
      content: Math.max(25, overallScore - 10),
      performance: Math.max(20, overallScore - 12),
      mobile: Math.min(100, overallScore + 15),
      schema: Math.max(10, overallScore - 30),
      linking: Math.max(20, overallScore - 8),
      geo: Math.max(15, overallScore - 25),
    },
    createdAt: "2026-08-10T14:22:00Z",
    completedAt: "2026-08-10T14:28:00Z",
    issues: allIssues,
    executiveSummary:
      "Brightpath Consulting has a solid technical foundation with HTTPS, responsive design, and correct canonical tags in place. However, the site is losing significant organic visibility due to missing meta descriptions, broken internal links, slow Core Web Vitals, and a complete absence of structured data. On-page optimization is inconsistent, with title tags exceeding recommended lengths and several key landing pages missing H1 headings. Content depth is a concern, with 15 blog posts under 300 words. Addressing the critical and high-priority issues below can realistically lift organic traffic by 35-55% within two quarters.",
    keyProblems: [
      "42 pages missing meta descriptions, slashing click-through rates",
      "18 broken internal links disrupting crawl paths and user navigation",
      "No XML sitemap submitted, slowing indexation of new content",
      "LCP of 4.2s on key landing pages, failing Core Web Vitals",
      "No structured data markup, missing rich-result opportunities",
      "15 thin blog posts under 300 words offering little ranking potential",
    ],
    recommendedSolutions: [
      "Author unique meta descriptions for all 42 affected pages within week 1",
      "Crawl and fix all broken internal links, add 301 redirects for removed URLs",
      "Generate and submit XML sitemap to Google Search Console and Bing Webmaster Tools",
      "Optimize hero images, defer non-critical JS, and configure a CDN to reduce LCP below 2.5s",
      "Implement Organization, BreadcrumbList, and Article JSON-LD schema across templates",
      "Expand thin blog posts to 800+ words with original insights and internal links",
    ],
    seoPriorities: [
      { phase: "Week 1", items: ["Fix broken internal links", "Submit XML sitemap", "Write meta descriptions for top 20 pages"] },
      { phase: "Week 2", items: ["Rewrite oversized title tags", "Add missing H1 headings", "Begin image alt text audit"] },
      { phase: "Week 3", items: ["Implement JSON-LD schema", "Optimize LCP on top landing pages", "Set up CDN"] },
      { phase: "Week 4", items: ["Expand 5 thin blog posts", "Fix heading hierarchy", "Redirect underscore URLs"] },
      { phase: "Weeks 5-8", items: ["Content production sprint: 12 new cornerstone articles", "Internal linking campaign", "Begin digital PR outreach"] },
      { phase: "Weeks 9-12", items: ["Technical re-audit", "Authority link building", "Conversion-rate optimization on top pages", "Monthly reporting cadence established"] },
    ],
    objectives: [
      "Increase organic traffic by 40% within 90 days",
      "Improve average keyword ranking from position 18 to position 9",
      "Achieve Core Web Vitals 'Good' status across all key landing pages",
      "Earn 3+ rich results in the top 10 priority keywords",
      "Grow organic conversions by 25% quarter-over-quarter",
    ],
    recommendedServices: [
      { name: "Technical SEO Fix Sprint", description: "Resolve all critical and high-priority technical issues identified in the audit within 30 days.", price: "$3,200" },
      { name: "Content & On-Page Optimization", description: "Rewrite meta data, expand thin content, and optimize 20 priority pages for target keywords.", price: "$4,800/mo" },
      { name: "Schema & Rich Results Setup", description: "Implement and validate structured data across the site for enhanced SERP visibility.", price: "$1,500" },
      { name: "Ongoing SEO Retainer", description: "Monthly technical monitoring, content production, link building, and reporting.", price: "$3,500/mo" },
    ],
    ...partial,
  };
}

export const mockAudits: Audit[] = [
  makeAudit({
    id: "a1",
    clientName: "Dr. Sarah Mitchell",
    clientCompany: "Acme Dental",
    websiteUrl: "https://acmedental.com",
    clientEmail: "sarah@acmedental.com",
    industry: "Healthcare / Dental",
    targetCountry: "United States",
    targetCity: "Portland, OR",
    mainServices: "Cosmetic dentistry, implants, orthodontics, family dentistry",
    overallScore: 72,
    createdAt: "2026-08-12T14:22:00Z",
    completedAt: "2026-08-12T14:28:00Z",
    status: "completed",
  }),
  makeAudit({
    id: "a2",
    clientName: "Robert Hayes",
    clientCompany: "Green Valley Realty",
    websiteUrl: "https://greenvalleyrealty.com",
    clientEmail: "robert@greenvalleyrealty.com",
    industry: "Real Estate",
    targetCountry: "United States",
    targetCity: "Phoenix, AZ",
    mainServices: "Residential sales, property management, commercial leasing",
    overallScore: 58,
    createdAt: "2026-08-11T09:10:00Z",
    completedAt: "2026-08-11T09:16:00Z",
    status: "completed",
  }),
  makeAudit({
    id: "a3",
    clientName: "Marcus Chen",
    clientCompany: "Urban Fitness",
    websiteUrl: "https://urbanfitness.com",
    clientEmail: "marcus@urbanfitness.com",
    industry: "Health & Fitness",
    targetCountry: "United States",
    targetCity: "Seattle, WA",
    mainServices: "Personal training, group classes, nutrition coaching",
    overallScore: 84,
    createdAt: "2026-08-10T11:00:00Z",
    completedAt: "2026-08-10T11:07:00Z",
    status: "completed",
  }),
  makeAudit({
    id: "a4",
    clientName: "Elena Volkov",
    clientCompany: "TechNova Solutions",
    websiteUrl: "https://technovasolutions.com",
    clientEmail: "elena@technovasolutions.com",
    industry: "B2B SaaS",
    targetCountry: "United States",
    targetCity: "Austin, TX",
    mainServices: "Cloud migration, DevOps consulting, managed infrastructure",
    overallScore: 65,
    createdAt: "2026-08-13T08:30:00Z",
    status: "processing",
  }),
  makeAudit({
    id: "a5",
    clientName: "Priya Sharma",
    clientCompany: "Lumen Dental Group",
    websiteUrl: "https://lumendental.com",
    clientEmail: "priya@lumendental.com",
    industry: "Healthcare / Dental",
    targetCountry: "United States",
    targetCity: "San Diego, CA",
    mainServices: "Cosmetic dentistry, implants, orthodontics",
    overallScore: 78,
    createdAt: "2026-08-08T16:45:00Z",
    completedAt: "2026-08-08T16:51:00Z",
    status: "completed",
  }),
  makeAudit({
    id: "a6",
    clientName: "Tom Becker",
    clientCompany: "Greenleaf Law LLP",
    websiteUrl: "https://greenleaflaw.com",
    clientEmail: "tom@greenleaflaw.com",
    industry: "Legal Services",
    targetCountry: "United States",
    targetCity: "Chicago, IL",
    mainServices: "Corporate law, IP, employment litigation",
    overallScore: 0,
    createdAt: "2026-08-13T10:15:00Z",
    status: "queued",
  }),
  makeAudit({
    id: "a7",
    clientName: "Sofia Almeida",
    clientCompany: "Atelier Bloom",
    websiteUrl: "https://atelierbloom.com",
    clientEmail: "sofia@atelierbloom.com",
    industry: "E-commerce / Fashion",
    targetCountry: "United Kingdom",
    targetCity: "London",
    mainServices: "Sustainable womenswear, accessories, seasonal collections",
    overallScore: 45,
    createdAt: "2026-08-04T13:20:00Z",
    completedAt: "2026-08-04T13:27:00Z",
    status: "completed",
  }),
];

export const mockClients: Client[] = [
  { id: "c1", name: "Dr. Sarah Mitchell", company: "Acme Dental", email: "sarah@acmedental.com", website: "acmedental.com", industry: "Healthcare / Dental", audits: 3, lastAuditDate: "2026-08-12", avgScore: 72, status: "active" },
  { id: "c2", name: "Robert Hayes", company: "Green Valley Realty", email: "robert@greenvalleyrealty.com", website: "greenvalleyrealty.com", industry: "Real Estate", audits: 2, lastAuditDate: "2026-08-11", avgScore: 58, status: "active" },
  { id: "c3", name: "Marcus Chen", company: "Urban Fitness", email: "marcus@urbanfitness.com", website: "urbanfitness.com", industry: "Health & Fitness", audits: 4, lastAuditDate: "2026-08-10", avgScore: 84, status: "active" },
  { id: "c4", name: "Elena Volkov", company: "TechNova Solutions", email: "elena@technovasolutions.com", website: "technovasolutions.com", industry: "B2B SaaS", audits: 1, lastAuditDate: "2026-08-13", avgScore: 65, status: "pending" },
  { id: "c5", name: "Priya Sharma", company: "Lumen Dental Group", email: "priya@lumendental.com", website: "lumendental.com", industry: "Healthcare / Dental", audits: 2, lastAuditDate: "2026-08-08", avgScore: 78, status: "active" },
  { id: "c6", name: "Tom Becker", company: "Greenleaf Law LLP", email: "tom@greenleaflaw.com", website: "greenleaflaw.com", industry: "Legal Services", audits: 1, lastAuditDate: "2026-08-13", avgScore: 0, status: "pending" },
  { id: "c7", name: "Sofia Almeida", company: "Atelier Bloom", email: "sofia@atelierbloom.com", website: "atelierbloom.com", industry: "E-commerce / Fashion", audits: 2, lastAuditDate: "2026-08-04", avgScore: 45, status: "churned" },
];

export const mockPriorityIssues: PriorityIssueSummary[] = [
  { client: "Acme Dental", critical: 3, high: 4, medium: 6, total: 13 },
  { client: "Green Valley Realty", critical: 5, high: 7, medium: 9, total: 21 },
  { client: "Urban Fitness", critical: 1, high: 2, medium: 5, total: 8 },
  { client: "TechNova Solutions", critical: 2, high: 5, medium: 8, total: 15 },
  { client: "Lumen Dental Group", critical: 2, high: 3, medium: 4, total: 9 },
  { client: "Atelier Bloom", critical: 6, high: 8, medium: 11, total: 25 },
];

export const mockProposals: Proposal[] = [
  { id: "p1", auditId: "a1", clientName: "Dr. Sarah Mitchell", company: "Acme Dental", website: "acmedental.com", score: 72, createdAt: "2026-08-12", status: "draft" },
  { id: "p2", auditId: "a2", clientName: "Robert Hayes", company: "Green Valley Realty", website: "greenvalleyrealty.com", score: 58, createdAt: "2026-08-11", status: "sent" },
  { id: "p3", auditId: "a3", clientName: "Marcus Chen", company: "Urban Fitness", website: "urbanfitness.com", score: 84, createdAt: "2026-08-10", status: "accepted" },
  { id: "p4", auditId: "a5", clientName: "Priya Sharma", company: "Lumen Dental Group", website: "lumendental.com", score: 78, createdAt: "2026-08-08", status: "viewed" },
  { id: "p5", auditId: "a7", clientName: "Sofia Almeida", company: "Atelier Bloom", website: "atelierbloom.com", score: 45, createdAt: "2026-08-04", status: "sent" },
];

export const industries = [
  "Business Consulting",
  "Healthcare / Dental",
  "Home Services / Construction",
  "E-commerce / Fashion",
  "Health & Fitness",
  "B2B SaaS",
  "Legal Services",
  "Real Estate",
  "Hospitality / Travel",
  "Education / E-learning",
  "Finance / Accounting",
  "Other",
];

export const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "United Arab Emirates",
  "Singapore",
  "Other",
];

export const auditAreaLabels: Record<string, string> = {
  technical: "Technical SEO",
  onpage: "On-Page SEO",
  content: "Content",
  performance: "Performance",
  mobile: "Mobile SEO",
  schema: "Schema / Structured Data",
  linking: "Internal Linking",
  images: "Images",
  local: "Local SEO",
  geo: "AI Search / GEO",
};

const depthScoreMap: Record<string, number> = { quick: 68, standard: 62, comprehensive: 55 };

export function generateMockAudit(form: AuditFormData): Audit {
  const baseScore = depthScoreMap[form.auditDepth] ?? 62;
  const variance = Math.floor(Math.random() * 12) - 6;
  const overallScore = Math.max(30, Math.min(95, baseScore + variance));
  const company = form.clientCompany || form.clientName || "New Client";
  const website = form.websiteUrl.startsWith("http") ? form.websiteUrl : `https://${form.websiteUrl}`;
  const now = new Date().toISOString();

  const selectedAreas = form.auditAreas.length > 0 ? form.auditAreas : ["technical", "onpage", "content", "performance", "mobile", "schema", "linking", "geo"];

  const scores: Audit["scores"] = {
    technical: 0, onpage: 0, content: 0, performance: 0, mobile: 0, schema: 0, linking: 0, geo: 0,
  };
  if (selectedAreas.includes("technical")) scores.technical = Math.min(100, overallScore + 8);
  if (selectedAreas.includes("onpage")) scores.onpage = Math.max(20, overallScore - 5);
  if (selectedAreas.includes("content")) scores.content = Math.max(25, overallScore - 10);
  if (selectedAreas.includes("performance")) scores.performance = Math.max(20, overallScore - 12);
  if (selectedAreas.includes("mobile")) scores.mobile = Math.min(100, overallScore + 15);
  if (selectedAreas.includes("schema")) scores.schema = Math.max(10, overallScore - 30);
  if (selectedAreas.includes("linking")) scores.linking = Math.max(20, overallScore - 8);
  if (selectedAreas.includes("geo")) scores.geo = Math.max(15, overallScore - 25);

  return {
    id: `new-${Date.now()}`,
    clientName: form.clientName,
    clientCompany: company,
    websiteUrl: website,
    clientEmail: form.clientEmail,
    industry: form.industry,
    targetCountry: form.targetCountry,
    targetCity: form.targetCity,
    mainServices: form.primaryService || form.secondaryServices || "",
    status: "completed",
    overallScore,
    scores,
    createdAt: now,
    completedAt: now,
    issues: allIssues,
    executiveSummary: `${company} has a ${overallScore >= 70 ? "solid" : overallScore >= 50 ? "moderate" : "weak"} SEO foundation. ${overallScore >= 70 ? "Technical basics like HTTPS, responsive design, and canonicals are in place." : "Several critical technical issues are holding back organic performance."} Key opportunities include fixing meta data, improving Core Web Vitals, implementing structured data, and expanding thin content. Addressing the issues below can lift organic traffic by 30-50% within two quarters.`,
    keyProblems: [
      "Missing meta descriptions on key pages, reducing click-through rates",
      "Broken internal links disrupting crawl paths and user navigation",
      "Slow Largest Contentful Paint failing Core Web Vitals thresholds",
      "No structured data markup, missing rich-result opportunities",
      "Thin blog content under 300 words offering little ranking potential",
      "Inconsistent heading hierarchy confusing search engine crawlers",
    ],
    recommendedSolutions: [
      "Author unique meta descriptions for all affected pages within week 1",
      "Crawl and fix all broken internal links, add 301 redirects for removed URLs",
      "Optimize hero images, defer non-critical JS, and configure a CDN",
      "Implement Organization, BreadcrumbList, and Article JSON-LD schema",
      "Expand thin blog posts to 800+ words with original insights",
      "Fix heading hierarchy and add missing H1 tags to landing pages",
    ],
    seoPriorities: [
      { phase: "Week 1", items: ["Fix broken internal links", "Write meta descriptions for top 20 pages", "Submit XML sitemap"] },
      { phase: "Week 2", items: ["Rewrite oversized title tags", "Add missing H1 headings", "Begin image alt text audit"] },
      { phase: "Week 3", items: ["Implement JSON-LD schema", "Optimize LCP on top landing pages", "Set up CDN"] },
      { phase: "Week 4", items: ["Expand 5 thin blog posts", "Fix heading hierarchy", "Redirect underscore URLs"] },
      { phase: "Weeks 5-8", items: ["Content production sprint: 12 cornerstone articles", "Internal linking campaign", "Digital PR outreach"] },
      { phase: "Weeks 9-12", items: ["Technical re-audit", "Authority link building", "CRO on top pages", "Monthly reporting cadence"] },
    ],
    objectives: [
      "Increase organic traffic by 40% within 90 days",
      "Improve average keyword ranking from position 18 to position 9",
      "Achieve Core Web Vitals 'Good' status across all key landing pages",
      "Earn 3+ rich results in the top 10 priority keywords",
      "Grow organic conversions by 25% quarter-over-quarter",
    ],
    recommendedServices: [
      { name: "Technical SEO Fix Sprint", description: "Resolve all critical and high-priority technical issues within 30 days.", price: "$3,200" },
      { name: "Content & On-Page Optimization", description: "Rewrite meta data, expand thin content, and optimize 20 priority pages.", price: "$4,800/mo" },
      { name: "Schema & Rich Results Setup", description: "Implement and validate structured data across the site.", price: "$1,500" },
      { name: "Ongoing SEO Retainer", description: "Monthly technical monitoring, content production, link building, and reporting.", price: "$3,500/mo" },
    ],
    logoUrl: form.useDefaultBranding ? "" : form.logoUrl,
    brandColor: form.useDefaultBranding ? "" : form.brandColor,
  };
}
