import { motion } from "framer-motion";
import { ArrowRight, Settings, Database, Search, Package, Cpu, FileText, CheckCircle } from "lucide-react";

const PIPELINE = [
  {
    label: "Customer Config",
    icon: Settings,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    summary: "Per-tenant configuration defining data mode, integration credentials, and enabled feature flags.",
    details: [
      "Data mode setting: customer_hosted or assetize_managed",
      "Integration credentials stored backend-only — never exposed to the client",
      "Feature flags: enable or disable License Planning, Patch Impact, and Premium Actions per tenant",
      "Jira integration mode: read-only / jira_only — no ticket creation or mutation",
      "Azure DevOps integration mode: read-only — no pipeline triggers",
      "Customer context isolates all data at the tenant boundary — no cross-tenant leakage",
    ],
    example: "MAS9 Power: customer_hosted · Jira read-only · License Planning ON · Premium Actions OFF"
  },
  {
    label: "Seed Data",
    icon: Database,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    summary: "23 structured JSON seed files defining the fictional demo tenant environment, users, assets, and work orders.",
    details: [
      "23 seed data files covering users, assets, work orders, customisations, and integrations",
      "All data is fictional — no real customer, site, or asset information is present",
      "Seed data drives the simulator, charts, patch impact analysis, and license planning outputs",
      "7 demo user roles seeded: Admin, Delivery Lead, Asset Manager, Scheduler, Field Tech, Finance, Auditor",
      "Energy & Utilities asset classes: substations, transformers, transmission lines, smart meters, control systems",
      "Seed data is version-locked per demo tenant — updates are explicit and auditable",
    ],
    example: "23 files · 7 users · 5 asset classes · fictional MAS9 Power energy tenant"
  },
  {
    label: "Evidence Services",
    icon: Search,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    summary: "Read-only connectors that pull evidence from Jira and Maximo without writing, mutating, or retaining data.",
    details: [
      "Maximo API: read-only — scans installed objects, customisations, version, capabilities, and endpoints",
      "Jira integration: read-only / jira_only — pulls ticket evidence to enrich requirements, never creates or edits tickets",
      "46 customisations scanned in the MAS9 Power environment fingerprint",
      "No SQL execution — all Maximo reads use the documented REST API",
      "No Maximo mutation — no object creation, modification, or deletion",
      "No Jira mutation — no comment, status, or field write operations",
      "Evidence is captured as structured trace files for internal review only — not published",
    ],
    example: "46 customisations scanned · 0 SQL statements · 0 mutations across all integrations"
  },
  {
    label: "Skill Packs",
    icon: Package,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    summary: "Offline, version-locked skill modules covering every Maximo delivery domain — no internet required.",
    details: [
      "Self-contained ZIP modules — fully functional in air-gapped environments",
      "Covers: automation scripts, relationships, workflow, escalation, integration framework, patch impact, license planning, mobilisation",
      "Each pack is version-locked to a specific Maximo / MAS version to prevent drift",
      "Skill coverage engine maps installed packs against delivery requirement gaps",
      "82% bot skill-pack coverage across Maximo delivery domains (system-defined — base packs): Requirements 91%, Maximo Core 87%, Integration 74%, Mobile 68%, Reporting 79%",
      "Skill packs are curated and reviewed — no auto-generated or unvalidated content",
      "Gap report identifies which packs are missing before delivery begins",
    ],
    example: "82% bot skill-pack coverage · 8 pack domains · gap report auto-generated against requirement set"
  },
  {
    label: "Delivery Engine",
    icon: Cpu,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
    summary: "The core analysis layer — cross-references fingerprint, patch content, license data, and bot skill-pack coverage to produce a unified delivery confidence score.",
    details: [
      "Patch / iFix impact engine: cross-references patch content against 46 scanned customisations — 7 impacted items found",
      "Severity distribution: 0 Critical · 2 High · 3 Medium · 2 Low",
      "License usage planner: 12-month AppPoint trend — 1847 used / 2400 entitled (77% utilisation, 84% peak)",
      "Named user analysis: 94 users — 71 active, 23 inactive. Mobile pool at 89% peak",
      "Delivery confidence score (87/100) aggregates patch impact, license health, bot skill-pack coverage, and requirement completeness",
      "All computations run locally — no cloud processing, no data exfiltration",
      "Audit trail captures every engine run with timestamp, user role, and input digest",
    ],
    example: "Score 87/100 · 7 patch impacts · 77% AppPoint utilisation · 82% bot skill-pack coverage"
  },
  {
    label: "Reports & Media",
    icon: FileText,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
    summary: "8 generated SVG charts, 6 architecture diagrams, and review-ready output packages — all fictional, all auditable.",
    details: [
      "8 SVG charts generated: AppPoint Trend, User Role Distribution, Asset Class Distribution, Patch Impact Risk, Skill Coverage, Generation Run Status, Work Risk Summary, Outage Readiness Score",
      "6 architecture diagrams in Mermaid format: Overall Architecture, Data Flow, Trust Boundary, Customer Onboarding, Skill Pack Lifecycle, License Planning Pipeline",
      "Outputs are review-ready packages — not live dashboards — designed to be shared with customers, delivery leads, and auditors",
      "All charts use fictional MAS9 Power data — clearly labelled as demo outputs",
      "Media manifest (media-manifest.json) tracks every generated asset with provenance and generation timestamp",
      "Playwright trace files are internal-only and never published to the public site",
      "No output is ever written back to Maximo, Jira, or Azure DevOps",
    ],
    example: "8 SVG charts · 6 diagrams · review package · media manifest · 0 write-backs"
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

export default function Architecture() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">How MASReady is Built</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A secure, modular pipeline that synthesises evidence without retaining data, mutating systems, or leaving a trace in your environment.
        </p>
      </div>

      {/* Pipeline flow */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PIPELINE.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={i} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${node.border} ${node.bg}`}
                >
                  <Icon className={`w-4 h-4 ${node.color}`} />
                  <span className={`text-sm font-semibold ${node.color}`}>{node.label}</span>
                </motion.div>
                {i < PIPELINE.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed stage cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-8"
      >
        {PIPELINE.map((stage, i) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`rounded-2xl border ${stage.border} bg-card overflow-hidden`}
            >
              {/* Card header */}
              <div className={`flex items-start gap-4 p-6 ${stage.bg} border-b ${stage.border}`}>
                <div className={`p-3 rounded-xl border ${stage.border} bg-card/60`}>
                  <Icon className={`w-6 h-6 ${stage.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                      Stage {i + 1}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${stage.border} ${stage.bg} ${stage.color}`}>
                      {stage.label}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-1 text-foreground">{stage.label}</h2>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{stage.summary}</p>
                </div>
              </div>

              {/* Detail list */}
              <div className="p-6">
                <ul className="space-y-3">
                  {stage.details.map((point, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${stage.color}`} />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Example pill */}
                <div className={`mt-5 inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg border ${stage.border} ${stage.bg} ${stage.color}`}>
                  <span className="opacity-60">MAS9 Power →</span>
                  <span>{stage.example}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Trust footer */}
      <div className="max-w-5xl mx-auto mt-16">
        <div className="rounded-2xl border border-white/10 bg-card p-8 text-center">
          <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl mx-auto">
            <strong className="text-foreground">No data leaves the pipeline.</strong>{" "}
            Every stage operates read-only. No SQL execution. No Maximo mutation. No Jira mutation. No Azure DevOps mutation.
            Trace files are internal-only and are never published to the public site.
            All MAS9 Power data shown here is entirely fictional.
          </p>
        </div>
      </div>
    </div>
  );
}
