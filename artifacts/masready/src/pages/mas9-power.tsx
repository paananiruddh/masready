import { DEMO_METRICS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Server, Shield, Database, LayoutGrid, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { DemoBanner } from "@/components/DemoBanner";
import React from "react";

export default function MAS9Power() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <DemoBanner variant="seed-data" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            Demo Tenant
          </div>
          <h1 className="text-5xl font-bold mb-6">MAS9 Power</h1>
          <p className="text-xl text-muted-foreground mb-12">
            A fictional energy and utilities company currently running Maximo 7.6.1.3 on-premise,
            planning its upgrade path to IBM MAS Manage 9.x. The workbench demonstrates full
            pre-upgrade readiness: fingerprinting the current estate, scoring patch impact,
            reviewing licence headroom, and validating delivery confidence — before a single
            change is made to production.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-white/10 bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Server className="w-6 h-6 text-accent" />
              <h2 className="text-xl font-semibold">Environment Profile</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-muted-foreground">Platform</span>
                <span className="font-medium text-white">Maximo 7.6.1.3 on-premise</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-muted-foreground">Target Platform</span>
                <span className="font-medium text-accent">IBM MAS Manage 9.x</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-muted-foreground">Data Mode</span>
                <span className="font-medium text-accent">customer_hosted</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-white/5">
                <span className="text-muted-foreground">Jira Integration</span>
                <span className="font-medium text-accent">read_only / jira_only</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customisations</span>
                <span className="font-medium text-white">{DEMO_METRICS.customisationsScanned} Scanned</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-white/10 bg-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <LayoutGrid className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Feature Flags</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "License tracking/planning", active: true },
                { label: "Patch impact analysis", active: true },
                { label: "Delivery intelligence", active: true },
                { label: "Contract mobilisation module", active: false },
                { label: "Premium actions", active: false },
                { label: "SQL execution", active: false },
              ].map((flag, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/5">
                  <span className="text-sm font-medium">{flag.label}</span>
                  {flag.active ? (
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                  ) : (
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ARI Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
              <Database className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-violet-400/70">Adaptive Regression Intelligence — Fictional Demo</div>
              <div className="text-base font-semibold text-white mt-0.5">Recommended regression pack for MAS9 Power</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Based on the fictional MAS9 Power fingerprint, MASReady would surface the following regression test recommendations for human QA review. All data is fictional — for demonstration only.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: "Core navigation smoke tests", reason: "12 applications enabled in MAS 9.x scope", risk: "Baseline" },
              { label: "Automation script regression", reason: "10 key scripts — 4 flagged with patch risk", risk: "High" },
              { label: "Escalation schedule tests", reason: "5 outage escalation workflows active", risk: "Medium" },
              { label: "MIF endpoint validation", reason: "3 integrations: Jira, ADO, Maximo API", risk: "High" },
              { label: "Patch-impact test scope", reason: "7 patch impacts found in latest iFix", risk: "High" },
              { label: "Mobile workflow checks", reason: "MAS Mobile configuration active", risk: "Medium" },
            ].map((rec, i) => (
              <div key={i} className="flex items-start justify-between gap-3 rounded-lg border border-white/8 bg-background/40 px-4 py-3">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white mb-0.5">{rec.label}</div>
                  <div className="text-xs text-muted-foreground">{rec.reason}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${
                  rec.risk === "High"
                    ? "bg-destructive/15 text-destructive border border-destructive/20"
                    : rec.risk === "Medium"
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                    : "bg-green-500/15 text-green-400 border border-green-500/20"
                }`}>{rec.risk}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-amber-400/70 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            All recommendations above are fictional examples for demonstration only. No real test files are generated or executed in this demo.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 mb-16">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-destructive/20 rounded-full mt-1">
              <Shield className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-destructive mb-2">Safety Disclaimer</h3>
              <p className="text-destructive-foreground/80 leading-relaxed">
                All data in the MAS9 Power tenant is completely fictional and generated for demonstration purposes.
                The environment operates in strict read-only mode, guaranteeing zero mutations to source systems.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
