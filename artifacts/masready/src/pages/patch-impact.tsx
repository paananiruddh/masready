import { DemoBanner } from "@/components/DemoBanner";
import { motion } from "framer-motion";
import { Crosshair, AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DEMO_METRICS } from "@/lib/constants";

const IMPACTS = [
  { id: "PI-001", customisation: "WO_ESCALATION", type: "Automation Script", fixPack: "MAS 9.1.2", severity: "high", description: "WOSTATUS change event signature modified — script requires parameter mapping update." },
  { id: "PI-002", customisation: "APPROVAL_WF", type: "Workflow", fixPack: "MAS 9.1.2", severity: "high", description: "Multi-tier approval node structure changed in MAS 9 workflow engine. Full workflow re-test required." },
  { id: "PI-003", customisation: "BO-001", type: "Business Object", fixPack: "MAS 9.0.8", severity: "medium", description: "WORKORDER schema migration may require custom field re-mapping." },
  { id: "PI-004", customisation: "SCADA_ENDPOINT", type: "Integration", fixPack: "MAS 9.1.0", severity: "medium", description: "OSLC endpoint authentication model changed. Token re-issuance required." },
  { id: "PI-005", customisation: "ASSET_LIFECYCLE", type: "Automation Script", fixPack: "MAS 9.1.2", severity: "low", description: "Asset state machine change is backward-compatible but script should be reviewed." },
  { id: "PI-006", customisation: "WOTRACK", type: "Screen Change", fixPack: "MAS 9.0.6", severity: "low", description: "Custom tab may need repositioning after UI framework update." },
  { id: "PI-007", customisation: "PREVENTIVE_MAINT", type: "Workflow", fixPack: "MAS 9.1.1", severity: "low", description: "PM trigger change is non-breaking but should be validated in UAT." },
];

const SEV_CONFIG = {
  high: { label: "High", icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  medium: { label: "Medium", icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  low: { label: "Low", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
} as const;

export default function PatchImpact() {
  return (
    <div className="min-h-screen">
      <DemoBanner variant="planning" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium mb-4">
            <Crosshair className="w-3 h-3" /> Patch Impact Analysis
          </div>
          <h1 className="text-4xl font-bold mb-4">Patch Impact</h1>
          <p className="text-muted-foreground mb-10">
            Cross-reference of patch/iFix content against the {DEMO_METRICS.customisationsScanned} scanned customisations.
            All data is fictional.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Impacted", value: DEMO_METRICS.patchImpacts, color: "text-foreground" },
              { label: "Critical", value: DEMO_METRICS.criticalImpacts, color: "text-destructive" },
              { label: "High", value: DEMO_METRICS.highImpacts, color: "text-orange-600" },
              { label: "Medium + Low", value: DEMO_METRICS.mediumImpacts + DEMO_METRICS.lowImpacts, color: "text-amber-600" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 text-center">
                <div className={`text-2xl font-bold mb-1 ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {IMPACTS.map((item, i) => {
              const cfg = SEV_CONFIG[item.severity as keyof typeof SEV_CONFIG];
              const Icon = cfg.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-xl border ${cfg.border} ${cfg.bg} p-5`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${cfg.color}`} />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-mono text-xs text-muted-foreground">{item.id}</span>
                          <span className="font-semibold text-foreground">{item.customisation}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{item.type}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">{item.fixPack}</span>
                      <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
