import { DemoBanner } from "@/components/DemoBanner";
import { motion } from "framer-motion";
import { PackageCheck, CheckCircle2, XCircle, AlertTriangle, Clock } from "lucide-react";

const PAGE_DESCRIPTION =
  "Shows which Maximo bot skill packs are installed, active, blocked, disabled, " +
  "version-compatible, customer-specific, or feature-gated for this tenant. " +
  "Coverage is measured across Maximo technical, functional, integration, upgrade, " +
  "testing, governance, and customer-specific domains.";

const SKILL_LAYERS = [
  {
    layer: "Layer 1",
    type: "Base Maximo Knowledge Skill Packs",
    key: "base_maximo_skill_pack",
    description: "Ships with MASReady core. Offline-capable. No customer data required.",
  },
  {
    layer: "Layer 2",
    type: "Customer Evidence Packs",
    key: "customer_evidence_pack",
    description: "Approved evidence inputs. Customer approval mandatory before ingestion.",
  },
  {
    layer: "Layer 3",
    type: "Customer-Specific Skill Pack Overlays",
    key: "customer_skill_overlay",
    description: "Generated from customer evidence. Deployed inside the customer boundary only.",
  },
  {
    layer: "Layer 4",
    type: "Runtime Product Skills",
    key: "runtime_product_skill",
    description: "Generate review-ready outputs from available evidence at runtime.",
  },
  {
    layer: "Layer 5",
    type: "Future Skills",
    key: "future_skill_pack",
    description: "Roadmap only — not yet available.",
  },
];

type PackStatus = 'active' | 'blocked' | 'disabled' | 'future';

const SKILL_PACKS: Array<{ name: string; domain: string; layer: number; status: PackStatus; version: string }> = [
  { name: "Maximo Core Configuration", domain: "Technical", layer: 1, status: "active", version: "7.6.1.3" },
  { name: "Automation Scripts", domain: "Technical", layer: 1, status: "active", version: "7.6.1.3" },
  { name: "Workflow Engine", domain: "Technical", layer: 1, status: "active", version: "7.6.1.3" },
  { name: "Integration Framework", domain: "Integration", layer: 1, status: "active", version: "7.6.1.3" },
  { name: "Patch Impact Analyser", domain: "Upgrade", layer: 1, status: "active", version: "MAS9.x" },
  { name: "Requirement Intake Processor", domain: "Functional", layer: 1, status: "active", version: "MAS9.x" },
  { name: "License Usage Planner", domain: "Governance", layer: 1, status: "active", version: "MAS9.x" },
  { name: "Environment Fingerprint", domain: "Technical", layer: 1, status: "active", version: "7.6.1.3" },
  { name: "Delivery Confidence Scorer", domain: "Governance", layer: 4, status: "active", version: "MAS9.x" },
  { name: "Mobile Integration Pack", domain: "Integration", layer: 1, status: "blocked", version: "MAS9.x" },
  { name: "Reporting Domain Pack", domain: "Technical", layer: 1, status: "active", version: "7.6.1.3" },
  { name: "Contract Mobilisation Pack", domain: "Functional", layer: 1, status: "disabled", version: "MAS9.x" },
  { name: "Customer Evidence Ingestion", domain: "Customer-Specific", layer: 2, status: "active", version: "MAS9.x" },
  { name: "Customer Config Overlay", domain: "Customer-Specific", layer: 3, status: "active", version: "MAS9.x" },
  { name: "Regression Test Generator", domain: "Testing", layer: 5, status: "future", version: "Roadmap" },
  { name: "AI Evidence Synthesis", domain: "Governance", layer: 5, status: "future", version: "Roadmap" },
];

const STATUS_CONFIG = {
  active: { label: "Active", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  blocked: { label: "Blocked", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  disabled: { label: "Disabled", icon: XCircle, color: "text-muted-foreground", bg: "bg-muted", border: "border-border" },
  future: { label: "Roadmap", icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
} as const;

export default function Skills() {
  const active = SKILL_PACKS.filter(p => p.status === "active").length;
  const total = SKILL_PACKS.filter(p => p.status !== "future").length;
  const coverage = Math.round((active / total) * 100);

  return (
    <div className="min-h-screen">
      <DemoBanner variant="planning" />
      <p className="text-xs text-center text-muted-foreground bg-muted/50 py-1 px-4 border-b border-border">
        System-defined skill pack metadata above is not demo data.
      </p>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            <PackageCheck className="w-3 h-3" /> Bot Skill-Pack Coverage
          </div>
          <h1 className="text-4xl font-bold mb-4">Skill Pack Registry</h1>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{PAGE_DESCRIPTION}</p>
        </div>

        {/* Coverage summary */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Total Packs", value: SKILL_PACKS.length },
            { label: "Active", value: active },
            { label: "Base Coverage", value: `${coverage}%` },
            { label: "Roadmap", value: SKILL_PACKS.filter(p => p.status === "future").length },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">{s.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* How Skill Packs Are Organised */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-xl font-bold mb-4">How Skill Packs Are Organised</h2>
          <p className="text-muted-foreground text-sm mb-6">
            MASReady uses a five-layer model to separate static knowledge from customer-specific evidence:
          </p>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Layer</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Type</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Key</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SKILL_LAYERS.map((row, i) => (
                  <tr key={i} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-primary whitespace-nowrap">{row.layer}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{row.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-accent hidden md:table-cell">{row.key}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pack list */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Installed Packs — MAS9 Power Tenant</h2>
          <div className="space-y-2">
            {SKILL_PACKS.map((pack, i) => {
              const cfg = STATUS_CONFIG[pack.status];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border ${cfg.border} ${cfg.bg}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${cfg.color}`} />
                    <div className="min-w-0">
                      <span className="font-medium text-sm text-foreground">{pack.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">{pack.domain}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground font-mono hidden md:inline">L{pack.layer}</span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">{pack.version}</span>
                    <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="text-amber-600 font-semibold">Coverage note: </span>
              82% bot skill-pack coverage across Maximo delivery domains (system-defined — base packs).
              This metric measures installed and active base packs against defined Maximo delivery domains.
              It is not an HR, staffing, or headcount measure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
