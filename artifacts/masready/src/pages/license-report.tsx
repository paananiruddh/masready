import { DemoBanner } from "@/components/DemoBanner";
import { motion } from "framer-motion";
import { PieChart, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { DEMO_METRICS } from "@/lib/constants";

const MONTHLY_TREND = [
  { month: "Jun '25", used: 1620, entitled: 2400 },
  { month: "Jul '25", used: 1695, entitled: 2400 },
  { month: "Aug '25", used: 1710, entitled: 2400 },
  { month: "Sep '25", used: 1750, entitled: 2400 },
  { month: "Oct '25", used: 1780, entitled: 2400 },
  { month: "Nov '25", used: 1800, entitled: 2400 },
  { month: "Dec '25", used: 1820, entitled: 2400 },
  { month: "Jan '26", used: 1835, entitled: 2400 },
  { month: "Feb '26", used: 1830, entitled: 2400 },
  { month: "Mar '26", used: 1840, entitled: 2400 },
  { month: "Apr '26", used: 1847, entitled: 2400 },
  { month: "May '26", used: 1847, entitled: 2400 },
];

export default function LicenseReport() {
  const maxUsed = Math.max(...MONTHLY_TREND.map(m => m.used));

  return (
    <div className="min-h-screen">
      <DemoBanner variant="planning" />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-medium mb-4">
            <PieChart className="w-3 h-3" /> License Planning
          </div>
          <h1 className="text-4xl font-bold mb-4">License Report</h1>
          <p className="text-muted-foreground mb-10">
            AppPoint usage trends, named user analysis, and mobile pool planning. All figures are fictional and for planning purposes only — not IBM-certified or contractual advice.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "AppPoints Used", value: DEMO_METRICS.appPointsUsed.toLocaleString(), sub: `of ${DEMO_METRICS.appPointsEntitled.toLocaleString()} entitled` },
              { label: "Utilisation", value: `${DEMO_METRICS.utilisation}%`, sub: `Peak: ${DEMO_METRICS.peakUtilisation}%` },
              { label: "Named Users", value: DEMO_METRICS.namedUsers, sub: `${DEMO_METRICS.activeUsers} active` },
              { label: "Inactive Users", value: DEMO_METRICS.inactiveUsers, sub: "Potential reclaim" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-0.5">{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* 12-month trend chart */}
          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h2 className="font-semibold">12-Month AppPoint Trend</h2>
            </div>
            <div className="flex items-end gap-1.5 h-32">
              {MONTHLY_TREND.map((m, i) => {
                const pct = (m.used / m.entitled) * 100;
                const height = (m.used / maxUsed) * 100;
                return (
                  <motion.div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ originY: 1 }}
                  >
                    <div
                      className={`w-full rounded-t ${pct > 85 ? "bg-destructive/70" : pct > 75 ? "bg-amber-500/70" : "bg-primary/70"}`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground" style={{ fontSize: "9px", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                      {m.month.split(" ")[0]}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Users breakdown */}
          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">User Activity Breakdown</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Active users", value: DEMO_METRICS.activeUsers, pct: Math.round((DEMO_METRICS.activeUsers / DEMO_METRICS.namedUsers) * 100), color: "bg-primary" },
                { label: "Inactive users", value: DEMO_METRICS.inactiveUsers, pct: Math.round((DEMO_METRICS.inactiveUsers / DEMO_METRICS.namedUsers) * 100), color: "bg-muted-foreground/30" },
                { label: "Mobile pool (peak)", value: `${DEMO_METRICS.mobilePoolPeak}% utilisation`, pct: DEMO_METRICS.mobilePoolPeak, color: "bg-accent" },
              ].map((row, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium">{row.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted">
                    <motion.div
                      className={`h-full rounded-full ${row.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${row.pct}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="text-amber-600 font-semibold">Planning visibility only. </span>
              These figures are fictional and for planning purposes only. Not IBM-certified, not contractual, and not compliance advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
