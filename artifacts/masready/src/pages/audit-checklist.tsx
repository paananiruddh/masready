import { motion } from "framer-motion";
import { ClipboardCheck, ExternalLink, ShieldCheck, Code2, Key, Layers, Brain, Server, Workflow } from "lucide-react";
import { DemoBanner } from "@/components/DemoBanner";

const AUDIT_URL = "https://www.perplexity.ai/computer/a/masready-environment-audit-che-zazaJLkyQtueRMXs9KMfhA";

const SECTIONS = [
  { icon: Brain,          label: "Delivery Intelligence",       count: 7,  desc: "Source version, automation scripts, cron tasks, BIRT reports, Doclinks, customisation archive" },
  { icon: ShieldCheck,    label: "Trust Center Compliance",      count: 8,  desc: "SSL/TLS, LDAP/SAML, ISO-27001, RBAC, penetration testing, database auditing, e-signature" },
  { icon: Layers,         label: "Patch & iFix Impact Analysis", count: 8,  desc: "Integrity Checker, MAXOBJECTCFG/MAXSYSINDEXES, custom triggers, DB backup, JMS→Kafka" },
  { icon: Key,            label: "License Planning Readiness",   count: 9,  desc: "AppPoints sizing, peak concurrent usage, tier mapping, install AppPoints, non-prod exemptions" },
  { icon: Server,         label: "OpenShift & Infrastructure",   count: 7,  desc: "Cluster HA, MongoDB, Suite License Service, PVC storage classes, wildcard certificates" },
  { icon: Workflow,       label: "Integration & API Readiness",  count: 6,  desc: "JMS→Kafka migration, API key model, SAP/Oracle connectors, App Connect VPC entitlement" },
  { icon: ClipboardCheck, label: "Post-Migration Validation",    count: 7,  desc: "Test plan, UAT environment, mobile validation, rollback procedure, stakeholder sign-off" },
];

export default function AuditChecklist() {
  return (
    <div className="min-h-screen">
      <DemoBanner variant="planning" />

      <div className="container mx-auto px-4 py-16">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <ClipboardCheck className="w-3 h-3" /> MAS 9 · Environment Audit
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            MASReady<br />
            <span className="text-accent">Environment Audit</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            52 structured checks across 7 domains. Assess your Maximo 7.6.x environment's readiness for
            MAS Manage 9 — covering delivery intelligence, trust center compliance, patch impact, and AppPoints license planning.
          </p>

          <a
            href={AUDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            <ClipboardCheck className="w-4 h-4" />
            Launch Audit Checklist
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16 text-center"
        >
          {[
            { value: "52", label: "Audit Checks" },
            { value: "7",  label: "Domains" },
            { value: "23", label: "SQL Diagnostic Hints" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-card/50 p-6">
              <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Section cards */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What's covered</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-6 flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white text-sm">{s.label}</h3>
                    <span className="text-xs text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">
                      {s.count} checks
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature callouts */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Code2,
                title: "SQL Diagnostic Hints",
                desc: "Every applicable check includes a read-only SQL query to run directly in your Maximo environment for evidence collection. Not executed by MASReady — assessor-controlled.",
              },
              {
                icon: ClipboardCheck,
                title: "Pass / Warn / Fail / N/A",
                desc: "Mark each check against your environment findings. Notes fields capture assessor evidence. Score updates in real time as you progress through sections.",
              },
              {
                icon: ShieldCheck,
                title: "Export as Markdown Report",
                desc: "One-click export of the full audit as a structured Markdown report, ready for stakeholder review, change management, or project governance gates.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-6"
              >
                <f.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <a
            href={AUDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors text-base"
          >
            <ClipboardCheck className="w-5 h-5" />
            Open Environment Audit Checklist
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>

          <p className="text-xs text-muted-foreground mt-4 max-w-lg mx-auto">
            Review-only assessment. No SQL execution, no Maximo mutations performed by this tool.
            License planning outputs are for internal visibility only and do not constitute
            IBM-certified or legal compliance advice.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
