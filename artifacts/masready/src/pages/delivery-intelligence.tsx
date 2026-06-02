import { DemoBanner } from "@/components/DemoBanner";
import { motion } from "framer-motion";
import { Activity, Shield, CheckCircle2, AlertTriangle } from "lucide-react";
import { DEMO_METRICS } from "@/lib/constants";

const DIMENSIONS = [
  { label: "Requirement Coverage", score: 91, color: "bg-primary" },
  { label: "Patch Impact Readiness", score: 74, color: "bg-amber-500" },
  { label: "Bot Skill-Pack Coverage", score: 82, color: "bg-accent" },
  { label: "License Headroom", score: 88, color: "bg-primary" },
  { label: "Trust Boundary", score: 100, color: "bg-emerald-500" },
  { label: "Evidence Completeness", score: 79, color: "bg-accent" },
];

export default function DeliveryIntelligence() {
  return (
    <div className="min-h-screen">
      <DemoBanner variant="planning" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
            <Activity className="w-3 h-3" /> Delivery Intelligence
          </div>
          <h1 className="text-4xl font-bold mb-4">Delivery Intelligence</h1>
          <p className="text-muted-foreground mb-10">
            Review bot-generated delivery intelligence reports — evidence-backed, not AI-speculative.
            All figures reflect the fictional MAS9 Power environment profile.
          </p>

          {/* Confidence score */}
          <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 p-8 mb-8 text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Delivery Confidence Score</div>
            <div className="text-7xl font-black text-accent mb-2">87<span className="text-3xl text-muted-foreground">/100</span></div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Trust boundary: REVIEW ONLY · Zero mutations</span>
            </div>
          </div>

          {/* Dimension breakdown */}
          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <h2 className="font-semibold mb-4">Score Breakdown by Dimension</h2>
            <div className="space-y-4">
              {DIMENSIONS.map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">{d.label}</span>
                    <span className="font-medium">{d.score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted">
                    <motion.div
                      className={`h-full rounded-full ${d.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${d.score}%` }}
                      transition={{ delay: i * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key findings */}
          <div className="space-y-3 mb-6">
            <h2 className="font-semibold">Key Findings</h2>
            {[
              { type: "ok", text: `${DEMO_METRICS.customisationsScanned} customisations scanned — fingerprint complete` },
              { type: "ok", text: `${DEMO_METRICS.patchImpacts} patch impacts identified — ${DEMO_METRICS.highImpacts} high severity` },
              { type: "ok", text: `AppPoint utilisation at ${DEMO_METRICS.utilisation}% — within planning threshold` },
              { type: "warn", text: `${DEMO_METRICS.inactiveUsers} inactive users identified — potential licence reclaim opportunity` },
              { type: "ok", text: "Trust boundary confirmed — zero mutations, full audit trail active" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"
              >
                {f.type === "ok"
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  : <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                <span className="text-sm text-muted-foreground">{f.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
