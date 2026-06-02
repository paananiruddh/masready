import { motion } from "framer-motion";
import { Link } from "wouter";
import { Fingerprint, Activity, Code2, Brain, PieChart, PackageCheck, ShieldCheck, Globe, ArrowRight, CheckCircle2 } from "lucide-react";

const CAPABILITIES = [
  {
    id: "fingerprinting",
    icon: Fingerprint,
    title: "Environment Fingerprinting",
    color: "text-accent",
    border: "border-accent/30",
    bg: "from-accent/8",
    desc: "Discover configuration, integrations, automation, add-ons, industry solutions, and operational dependencies before major change.",
    points: ["Installed object and customisation scan", "Integration and automation mapping", "Add-on and industry solution detection", "Version and capability baseline", "Read-only — no mutations"],
    href: "/architecture",
  },
  {
    id: "drift",
    icon: Activity,
    title: "Drift Intelligence",
    color: "text-orange-600",
    border: "border-orange-200",
    bg: "from-orange-50",
    desc: "Compare environments and detect unexpected configuration or operational differences between known baselines.",
    points: ["Cross-environment comparison", "Configuration drift alerts", "Operational difference detection", "Baseline deviation reporting", "Timeline and trend tracking"],
    href: "/drift",
  },
  {
    id: "regression",
    icon: Code2,
    title: "Regression Intelligence",
    color: "text-violet-600",
    border: "border-violet-200",
    bg: "from-violet-50",
    desc: "Generate and evolve Playwright-based regression packs as your Maximo environment changes — coverage grows with your config.",
    points: ["Fingerprint-driven test generation", "Coverage adapts to add-on changes", "Human review before any CI/CD push", "Exported as standard TypeScript", "Gap report against requirement set"],
    href: "/adaptive-regression",
  },
  {
    id: "skillpacks",
    icon: Brain,
    title: "AI Skill Packs",
    color: "text-primary",
    border: "border-primary/25",
    bg: "from-primary/10",
    desc: "Deploy specialised Maximo assistants for technical support, upgrade readiness, governance, documentation, and delivery workflows.",
    points: ["Upgrade readiness Q&A", "Governance and compliance answers", "Technical support assistance", "Delivery workflow automation", "Air-gapped offline operation"],
    href: "/features",
  },
  {
    id: "licensing",
    icon: PieChart,
    title: "Licensing Intelligence",
    color: "text-amber-600",
    border: "border-amber-200",
    bg: "from-amber-50",
    desc: "Turn licensing complexity into understandable reports, entitlement insights, and optimisation opportunities.",
    points: ["AppPoints trend analysis", "Named user tracking", "Mobile pool analysis", "Capacity planning reports", "Entitlement optimisation insights"],
    href: "/license-report",
  },
  {
    id: "mobilization",
    icon: PackageCheck,
    title: "Mobilisation Readiness",
    color: "text-emerald-600",
    border: "border-emerald-200",
    bg: "from-emerald-50",
    desc: "Assess readiness for new sites, contracts, assets, PMs, job plans, integrations, and operational teams.",
    points: ["Site and contract readiness", "Asset and PM coverage", "Job plan validation", "Integration readiness gaps", "Operational team assessment"],
    href: "/features",
  },
  {
    id: "governance",
    icon: ShieldCheck,
    title: "Delivery Governance",
    color: "text-rose-700",
    border: "border-rose-200",
    bg: "from-rose-50",
    desc: "Track delivery risk, readiness, evidence, auditability, and operational confidence across the full delivery lifecycle.",
    points: ["52-point environment audit checklist", "Immutable audit trail", "Evidence chain of custody", "Risk and readiness scoring", "Governance report generation"],
    href: "/audit-checklist",
  },
  {
    id: "demomodes",
    icon: Globe,
    title: "Secure Demo Modes",
    color: "text-indigo-600",
    border: "border-indigo-200",
    bg: "from-indigo-50",
    desc: "Use synthetic previews, persisted private workspaces, or secure connected assessments depending on customer readiness.",
    points: ["10 industry synthetic previews", "Session-only — no data stored", "Persisted demo by request", "Secure connected assessment", "Zero production data required"],
    href: "/platform",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/6" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6"
          >
            <ShieldCheck className="w-3 h-3" /> Platform Capabilities
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-5"
          >
            Everything your Maximo team{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">needs</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Eight integrated capability areas — from environment fingerprinting and regression intelligence
            through to AI skill packs, licensing, and secure demo modes — all built for IBM Maximo environments.
          </motion.p>
        </div>
      </section>

      {/* Capability cards */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-2xl border ${cap.border} bg-gradient-to-b ${cap.bg} to-card p-7 flex flex-col gap-5`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-card border ${cap.border} shrink-0`}>
                    <cap.icon className={`w-5 h-5 ${cap.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-bold mb-1 ${cap.color}`}>{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {cap.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${cap.color} shrink-0`} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link
                  href={cap.href}
                  className={`self-start inline-flex items-center gap-1.5 text-xs font-semibold ${cap.color} hover:opacity-80 transition-opacity`}
                >
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-6">See these capabilities in a synthetic industry environment — no production data required.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/industry-previews" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5">
                Explore Industry Previews <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/launch" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all hover:-translate-y-0.5">
                Request Enterprise Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
