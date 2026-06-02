import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { DemoBanner } from "@/components/DemoBanner";

const MODES = [
  {
    id: "customer-hosted",
    icon: "🏢",
    title: "Customer Hosted",
    description:
      "Customer controls the deployment environment. Data retained in customer-owned infrastructure.",
    badge: null,
    warning: null,
  },
  {
    id: "assetize-managed",
    icon: "☁️",
    title: "Assetize Managed",
    description:
      "Assetize hosts and manages the platform on behalf of the customer. Governed data retention.",
    badge: null,
    warning: null,
  },
  {
    id: "byo-storage",
    icon: "🪣",
    title: "BYO Storage",
    description:
      "Customer brings their own S3-compatible storage. Assetize writes to customer-owned bucket only.",
    badge: null,
    warning: null,
  },
  {
    id: "zero-retention",
    icon: "🔒",
    title: "Zero Retention (Runtime Module)",
    description:
      "No data is stored by Assetize. All processing is in-memory only. Customer data never persisted to disk.",
    badge: "Zero Retention",
    warning: true,
  },
] as const;

const COMPARE_ROWS = [
  {
    label: "Data stays in customer environment",
    values: ["✔", "✘", "✔", "✔"],
  },
  {
    label: "Assetize manages infrastructure",
    values: ["✘", "✔", "~", "✘"],
  },
  {
    label: "Customer controls storage bucket",
    values: ["✔", "✘", "✔", "—"],
  },
  {
    label: "Data persisted to disk",
    values: ["✔", "✔", "✔", "✘"],
  },
  {
    label: "Suitable for air-gapped / high-security",
    values: ["✔", "✘", "~", "✔"],
  },
];

function cellColor(v: string) {
  if (v === "✔") return "text-emerald-600";
  if (v === "✘") return "text-destructive";
  if (v === "~") return "text-amber-600";
  return "text-muted-foreground";
}

export default function DataModes() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <DemoBanner variant="planning" />
      <div className="container mx-auto px-4 py-16 max-w-2xl">

        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            Platform configuration
          </span>
          <h1 className="text-4xl font-bold mb-4">Data Modes</h1>
          <p className="text-muted-foreground">
            Choose the data handling model that fits your security, infrastructure, and retention requirements.
          </p>
        </div>

        {/* Radio cards */}
        <div className="flex flex-col gap-3 mb-12">
          {MODES.map((mode, i) => {
            const isSelected = selected === mode.id;
            return (
              <motion.label
                key={mode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                htmlFor={mode.id}
                className={`flex items-start gap-4 rounded-2xl border p-5 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                {/* Radio button */}
                <div className="mt-0.5 shrink-0">
                  <input
                    type="radio"
                    id={mode.id}
                    name="data-mode"
                    value={mode.id}
                    checked={isSelected}
                    onChange={() => setSelected(mode.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected ? "border-primary" : "border-border"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-lg leading-none">{mode.icon}</span>
                    <span className="font-bold text-base text-foreground">{mode.title}</span>
                    {mode.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-destructive/10 text-destructive border border-destructive/20">
                        {mode.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex items-start gap-1.5">
                    {mode.warning && (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    {mode.description}
                  </p>
                </div>
              </motion.label>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-bold text-sm text-foreground">Mode comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-6 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider w-1/2">
                    Capability
                  </th>
                  {MODES.map((m) => (
                    <th
                      key={m.id}
                      className="px-3 py-3 text-center text-muted-foreground font-medium text-xs uppercase tracking-wider"
                    >
                      <span className="hidden sm:inline">{m.title.split(" ")[0]}</span>
                      <span className="sm:hidden">{m.icon}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    className={i < COMPARE_ROWS.length - 1 ? "border-b border-border/50" : ""}
                  >
                    <td className="px-6 py-3 text-muted-foreground">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className={`px-3 py-3 text-center font-bold ${cellColor(v)}`}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-border/50 text-xs text-muted-foreground flex gap-4 flex-wrap">
            <span><span className="text-emerald-600 font-bold">✔</span> Yes</span>
            <span><span className="text-destructive font-bold">✘</span> No</span>
            <span><span className="text-amber-600 font-bold">~</span> Partial</span>
            <span><span className="font-bold">—</span> N/A</span>
          </div>
        </div>

      </div>
    </div>
  );
}
