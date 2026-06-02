import { DemoBanner } from "@/components/DemoBanner";
import { motion } from "framer-motion";
import { Fingerprint, CheckCircle2, AlertTriangle, Server } from "lucide-react";
import { DEMO_METRICS } from "@/lib/constants";

const CUSTOMISATIONS = [
  { id: "BO-001", type: "Business Object", name: "WORKORDER", change: "Added custom field CUSTOM_PRIORITY", impact: "high", env: "PROD" },
  { id: "BO-002", type: "Business Object", name: "ASSET", change: "Extended with ASSET_TIER attribute", impact: "medium", env: "PROD" },
  { id: "AS-001", type: "Automation Script", name: "WO_ESCALATION", change: "Custom escalation logic on WO status change", impact: "high", env: "PROD" },
  { id: "AS-002", type: "Automation Script", name: "ASSET_LIFECYCLE", change: "Asset lifecycle state machine extension", impact: "medium", env: "PROD" },
  { id: "WF-001", type: "Workflow", name: "APPROVAL_WF", change: "Multi-tier approval workflow for capital WOs", impact: "high", env: "PROD" },
  { id: "WF-002", type: "Workflow", name: "PREVENTIVE_MAINT", change: "PM trigger logic customisation", impact: "low", env: "PROD" },
  { id: "SC-001", type: "Screen Change", name: "WOTRACK", change: "Custom tab added to Work Order Tracking", impact: "low", env: "PROD" },
  { id: "IN-001", type: "Integration", name: "SCADA_ENDPOINT", change: "Custom OSLC endpoint for SCADA read-out", impact: "medium", env: "PROD" },
];

const IMPACT_CONFIG = {
  high: { label: "High", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  medium: { label: "Medium", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  low: { label: "Low", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
} as const;

export default function MaximoInventory() {
  return (
    <div className="min-h-screen">
      <DemoBanner variant="planning" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            <Fingerprint className="w-3 h-3" /> Environment Fingerprint
          </div>
          <h1 className="text-4xl font-bold mb-4">Maximo Inventory &amp; Fingerprint</h1>
          <p className="text-muted-foreground mb-10">
            Review the detected Maximo configuration fingerprint — version, installed products, and configuration baseline.
            Scan is non-destructive. Zero mutations. Zero SQL writes.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs text-muted-foreground mb-1">Current Platform</div>
              <div className="text-lg font-bold text-foreground">Maximo 7.6.1.3</div>
              <div className="text-xs text-muted-foreground mt-1">On-premise deployment</div>
            </div>
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <div className="text-xs text-muted-foreground mb-1">Upgrade Target</div>
              <div className="text-lg font-bold text-accent">IBM MAS Manage 9.x</div>
              <div className="text-xs text-muted-foreground mt-1">Planning stage</div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="text-xs text-muted-foreground mb-1">Customisations Scanned</div>
              <div className="text-lg font-bold text-foreground">{DEMO_METRICS.customisationsScanned}</div>
              <div className="text-xs text-muted-foreground mt-1">Across DEV / TEST / PROD</div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-border flex items-center gap-3">
              <Server className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Customisation Baseline</h2>
              <span className="ml-auto text-xs text-muted-foreground">{CUSTOMISATIONS.length} shown of {DEMO_METRICS.customisationsScanned}</span>
            </div>
            <div className="divide-y divide-border">
              {CUSTOMISATIONS.map((c, i) => {
                const cfg = IMPACT_CONFIG[c.impact as keyof typeof IMPACT_CONFIG];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start justify-between px-6 py-4 gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{c.type}</span>
                        <span className="font-medium text-sm text-foreground">{c.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{c.change}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">{c.env}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${cfg.border} ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="text-emerald-600 font-semibold">Read-only scan complete. </span>
              Zero mutations. Zero SQL writes. No changes made to any Maximo environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
