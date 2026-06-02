import { DemoBanner } from "@/components/DemoBanner";
import { motion } from "framer-motion";
import { GitCompare, AlertTriangle, CheckCircle2 } from "lucide-react";

const DRIFT_ITEMS = [
  { id: "DR-001", object: "WORKORDER.CUSTOM_PRIORITY", baseline: "VARCHAR(10)", current: "VARCHAR(20)", env: "PROD vs UAT", severity: "medium" },
  { id: "DR-002", object: "WO_ESCALATION script", baseline: "v1.3", current: "v1.5", env: "PROD vs DEV", severity: "high" },
  { id: "DR-003", object: "APPROVAL_WF", baseline: "3-tier", current: "2-tier", env: "PROD vs TEST", severity: "high" },
  { id: "DR-004", object: "SCADA_ENDPOINT timeout", baseline: "30s", current: "45s", env: "PROD vs UAT", severity: "low" },
  { id: "DR-005", object: "PREVENTIVE_MAINT trigger", baseline: "Daily 06:00", current: "Daily 05:30", env: "PROD vs UAT", severity: "low" },
];

const SEV = {
  high: { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  medium: { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  low: { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
} as const;

export default function Drift() {
  return (
    <div className="min-h-screen">
      <DemoBanner variant="planning" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-medium mb-4">
            <GitCompare className="w-3 h-3" /> Configuration Drift
          </div>
          <h1 className="text-4xl font-bold mb-4">Drift Detection</h1>
          <p className="text-muted-foreground mb-10">
            Detected configuration drift between environments. All data is fictional.
            No real customer asset names are present.
          </p>

          <div className="space-y-3">
            {DRIFT_ITEMS.map((item, i) => {
              const cfg = SEV[item.severity as keyof typeof SEV];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-xl border ${cfg.border} ${cfg.bg} p-5`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs text-muted-foreground">{item.id}</span>
                        <span className="font-semibold text-foreground">{item.object}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span>Baseline: <code className="text-foreground font-mono">{item.baseline}</code></span>
                        <span>Current: <code className="text-amber-700 font-mono">{item.current}</code></span>
                        <span>{item.env}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold capitalize ${cfg.color} shrink-0`}>{item.severity}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="text-emerald-600 font-semibold">Read-only comparison. </span>
              Drift detection is non-destructive. No changes made to any environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
