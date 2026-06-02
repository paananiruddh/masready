import { DEMO_METRICS } from "@/lib/constants";
import { CheckCircle2, XCircle, AlertCircle, Shield } from "lucide-react";
import { Link } from "wouter";
import { DemoBanner } from "@/components/DemoBanner";

const WALKTHROUGH_ROUTES = [
  { scene: "S01", name: "Login + Customer Switch", route: "/", status: "ready" },
  { scene: "S02", name: "Delivery Intelligence", route: "/delivery-intelligence", status: "ready" },
  { scene: "S03", name: "Trust Center", route: "/trust-center", status: "ready" },
  { scene: "S04", name: "Integration Settings", route: "/integration-settings", status: "ready" },
  { scene: "S05", name: "Requirement Uploads", route: "/req-uploads", status: "ready" },
  { scene: "S06", name: "Maximo Inventory", route: "/maximo-inventory", status: "ready" },
  { scene: "S07", name: "Patch Impact", route: "/patch-impact", status: "ready" },
  { scene: "S08", name: "License Report", route: "/license-report", status: "ready" },
  { scene: "S09", name: "Skill Packs", route: "/skills", status: "ready" },
  { scene: "S10", name: "Contract Mobilisation (disabled)", route: null, status: "gated" },
  { scene: "S11", name: "Audit Log", route: "/audit", status: "auth-required" },
  { scene: "S12", name: "Help Center", route: "/help", status: "ready" },
] as const;

export default function DemoStatus() {
  return (
    <div className="min-h-screen">
    <DemoBanner variant="planning" />
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-medium mb-4">
          Demo Environment
        </div>
        <h1 className="text-4xl font-bold mb-3">Demo Status</h1>
        <p className="text-muted-foreground">
          Fictional tenant — Maximo 7.6.1.3 → MAS 9.x upgrade planning scenario.
          All data is fictional. No live Maximo connection active.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          Tenant Profile
        </h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: "Tenant", value: "Fictional tenant — Maximo 7.6.1.3 → MAS 9.x upgrade planning scenario" },
            { label: "Data mode", value: "Synthetic (fictional)" },
            { label: "Current platform", value: "Maximo 7.6.1.3" },
            { label: "Target platform", value: "IBM MAS Manage 9.x" },
            { label: "Trust boundary", value: "REVIEW ONLY" },
            { label: "Mutations", value: "0" },
            { label: "Data files", value: String(DEMO_METRICS.seedFiles) },
            { label: "Customisations", value: String(DEMO_METRICS.customisationsScanned) },
          ].map(row => (
            <div key={row.label} className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">12-Scene Walkthrough — Route Status</h2>
        <div className="space-y-2">
          {WALKTHROUGH_ROUTES.map(item => (
            <div key={item.scene} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground w-8">{item.scene}</span>
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.status === "ready" && (
                  <><CheckCircle2 className="w-4 h-4 text-emerald-600" /><span className="text-emerald-600 text-xs">Ready</span></>
                )}
                {item.status === "gated" && (
                  <><XCircle className="w-4 h-4 text-muted-foreground" /><span className="text-muted-foreground text-xs">Feature gated</span></>
                )}
                {item.status === "auth-required" && (
                  <><AlertCircle className="w-4 h-4 text-amber-600" /><span className="text-amber-600 text-xs">Auth required</span></>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-primary text-sm underline underline-offset-4">
          ← Back to demo home
        </Link>
      </div>
    </div>
    </div>
  );
}
