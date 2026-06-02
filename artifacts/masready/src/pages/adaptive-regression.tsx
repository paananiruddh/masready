import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Fingerprint, Shield, CheckCircle2, XCircle, ArrowRight, AlertTriangle,
  Database, Download, RefreshCw, Code2, Layers, ChevronRight, Activity,
  GitBranch, UserCheck, Target, History, PackageCheck
} from "lucide-react";

const WORKFLOW_STEPS = [
  {
    num: "01",
    title: "Maximo Fingerprint Captured",
    desc: "Read-only scan of installed applications, add-ons, automation scripts, workflows, escalations, integrations, cron tasks, security groups, and UI customisations.",
    icon: Fingerprint,
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
  },
  {
    num: "02",
    title: "Component & Change Detection",
    desc: "MASReady identifies what is installed, what has changed since the last fingerprint, and what has been removed — at the component level.",
    icon: Activity,
    color: "text-accent",
    border: "border-accent/30",
    bg: "bg-accent/10",
  },
  {
    num: "03",
    title: "Regression Scope Analysis",
    desc: "Each detected component, customisation, integration, and workflow is mapped to its test risk profile. High-risk areas drive higher test density.",
    icon: Target,
    color: "text-orange-600",
    border: "border-orange-300",
    bg: "bg-orange-50",
  },
  {
    num: "04",
    title: "Playwright Test Pack Generated",
    desc: "MASReady produces customer-specific TypeScript Playwright tests grouped by Maximo domain and risk tier. No generic scripts — everything reflects the actual environment.",
    icon: Code2,
    color: "text-violet-600",
    border: "border-violet-200",
    bg: "bg-violet-50",
  },
  {
    num: "05",
    title: "Human Review & Approval",
    desc: "Generated tests are presented as recommendations only. QA engineers review the scope, modify as needed, and approve before any test is used in a pipeline.",
    icon: UserCheck,
    color: "text-amber-600",
    border: "border-amber-200",
    bg: "bg-amber-50",
  },
  {
    num: "06",
    title: "CI/CD Handoff",
    desc: "Approved tests are exported as standard TypeScript Playwright files with a pipeline guide for GitHub Actions, Azure Pipelines, Jenkins, or GitLab CI.",
    icon: GitBranch,
    color: "text-emerald-600",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
  },
  {
    num: "07",
    title: "Drift-Triggered Updates",
    desc: "When significant environment drift is detected — new add-on, removed workflow, changed integration — MASReady recommends targeted test additions, removals, or updates.",
    icon: RefreshCw,
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
  },
];

const OUTPUTS = [
  { icon: Code2, title: "Playwright Test Pack", desc: "TypeScript Playwright test files, grouped by Maximo domain and risk tier. Customer-controlled, exportable, ready for CI/CD." },
  { icon: Target, title: "Regression Scope Report", desc: "What is tested, what is not tested, and why. Traceability from fingerprint component to generated test." },
  { icon: Layers, title: "Test Coverage Map", desc: "Visual map of which Maximo functional domains, applications, and integrations have regression coverage." },
  { icon: AlertTriangle, title: "Risk-Based Test Matrix", desc: "Tests ranked by component risk — patch-impacted scripts, changed integrations, and new add-ons surface first." },
  { icon: Activity, title: "Changed-Feature Impact List", desc: "Which detected changes triggered new test recommendations and why each change was considered significant." },
  { icon: History, title: "Obsolete Test Recommendations", desc: "When a component is removed from the fingerprint, related tests are flagged for removal with a rationale." },
  { icon: PackageCheck, title: "CI/CD Handoff Guide", desc: "Pipeline configuration examples for GitHub Actions, Azure Pipelines, Jenkins, and GitLab CI with environment variables and run instructions." },
  { icon: UserCheck, title: "Human Approval Checklist", desc: "Structured review checklist for QA engineers to verify, modify, and approve generated tests before production use." },
];

const COMPARE_ROWS = [
  { aspect: "Test basis", generic: "Manually authored scripts", ari: "Generated from environment fingerprint" },
  { aspect: "Environment awareness", generic: "Low — written once, rarely updated", ari: "High — reflects installed components at every scan" },
  { aspect: "Add-on detection", generic: "None — must be manually tracked", ari: "Detects and maps installed add-ons automatically" },
  { aspect: "Customisation awareness", generic: "Manual effort to identify scope", ari: "Reads directly from Maximo customisation scan" },
  { aspect: "Drift response", generic: "None — tests become stale silently", ari: "Automatic drift detection with recommendations" },
  { aspect: "Human review", generic: "Not structurally enforced", ari: "Required — approval gate before CI/CD use" },
  { aspect: "CI/CD handoff", generic: "Manual pipeline setup", ari: "Guided export with pipeline configuration guide" },
  { aspect: "Obsolete test detection", generic: "None — dead tests accumulate", ari: "Flagged when fingerprinted components are removed" },
];

const FAQ = [
  {
    q: "What is Adaptive Regression Intelligence?",
    a: "A MASReady feature that uses the Maximo environment fingerprint to generate, maintain, and recommend a customer-specific Playwright regression suite — reflecting the actual installed components, not a generic Maximo template.",
  },
  {
    q: "Does MASReady run tests against production?",
    a: "No. MASReady generates test files for customer use. Tests are exported and run by the customer in their own pipeline. MASReady never executes tests against customer systems.",
  },
  {
    q: "Does it replace QA teams?",
    a: "No. MASReady generates a starting point and a recommended scope. Human QA review and approval is required before the suite is used. QA teams own the decision to accept, modify, or reject generated tests.",
  },
  {
    q: "How does MASReady know which tests to generate?",
    a: "From the environment fingerprint — installed applications, add-ons, automation scripts, workflows, escalations, integrations, cron tasks, security groups, application designer changes, and UI customisations.",
  },
  {
    q: "What happens when the Maximo environment changes?",
    a: "MASReady detects drift between the captured fingerprint and the current environment. When significant changes are found, it recommends test additions, removals, or updates — which human QA reviews before adoption.",
  },
  {
    q: "Can customers export the Playwright suite?",
    a: "Yes. The generated test pack is fully exportable as TypeScript Playwright files, ready for the customer's own CI/CD pipeline. MASReady does not retain or run these files.",
  },
  {
    q: "Can it work with CI/CD?",
    a: "Yes. Exported tests run in standard CI/CD environments (GitHub Actions, Azure Pipelines, Jenkins, GitLab CI). A CI/CD handoff guide with pipeline configuration is included with every export.",
  },
  {
    q: "Does it mutate Maximo?",
    a: "No. Fingerprinting uses read-only APIs exclusively. MASReady cannot write to, modify, or trigger any action in Maximo or any connected system.",
  },
];

const MAS9_RECOMMENDATIONS = [
  { label: "Core navigation smoke tests", reason: "12 applications enabled in MAS 9.x scope", icon: "🧭", risk: "Baseline" },
  { label: "Automation script regression", reason: "10 key scripts detected — 4 flagged with patch risk", icon: "⚙️", risk: "High" },
  { label: "Escalation schedule tests", reason: "5 outage escalation workflows active", icon: "📋", risk: "Medium" },
  { label: "MIF endpoint validation", reason: "3 active integrations: Jira, ADO, Maximo API", icon: "🔗", risk: "High" },
  { label: "Patch-impact test scope", reason: "7 patch impacts found in latest iFix assessment", icon: "🎯", risk: "High" },
  { label: "Mobile workflow checks", reason: "Mobile configuration active — MAS Mobile enabled", icon: "📱", risk: "Medium" },
];

export default function AdaptiveRegression() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden border-b border-border/50">
        <motion.div
          className="pointer-events-none absolute top-0 left-0 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)" }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              New Feature — MASReady
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl leading-[1.08]"
          >
            Adaptive{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-600 to-accent">
              Regression Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-muted-foreground mb-4 max-w-2xl leading-relaxed"
          >
            Your Maximo environment changes. Your regression suite should change with it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-base text-muted-foreground mb-10 max-w-3xl leading-relaxed"
          >
            MASReady turns the Maximo environment fingerprint into a customer-specific Playwright regression pack. Regression coverage grows or shrinks as installed components, add-ons, integrations, and customisations change — all with human review before any test reaches a pipeline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/features" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5">
              All Features <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/trust" className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/80 transition-all hover:-translate-y-0.5">
              Trust Model
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent hover:bg-accent/20 transition-all hover:-translate-y-0.5">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Workflow ── */}
      <section className="py-24 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Seven stages from Maximo fingerprint to CI/CD-ready Playwright suite — with mandatory human review before any generated test is used.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {WORKFLOW_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-5 mb-6 last:mb-0"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-12 h-12 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center`}>
                    <step.icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  {i < WORKFLOW_STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-border my-2 min-h-[20px]" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-widest ${step.color}`}>{step.num}</span>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Outputs ── */}
      <section className="py-24 bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">What you receive</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every output is reviewable, exportable, and customer-controlled. MASReady produces evidence — customers decide what to use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {OUTPUTS.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-border bg-card p-6 flex flex-col gap-4 hover:bg-muted/50 hover:border-border transition-all hover:-translate-y-1 cursor-default group"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform">
                  <o.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2 text-sm">{o.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{o.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-24 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Generic testing vs Adaptive Regression Intelligence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stop running generic scripts against a highly customised Maximo environment.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="p-4 text-sm font-semibold text-muted-foreground w-1/3">Aspect</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground text-center">Generic Regression Testing</th>
                  <th className="p-4 text-sm font-bold text-primary text-center">MASReady — ARI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 text-sm font-medium text-foreground">{row.aspect}</td>
                    <td className="p-4 text-sm text-muted-foreground text-center">{row.generic}</td>
                    <td className="p-4 text-sm text-primary font-medium text-center">{row.ari}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Trust / Architecture ── */}
      <section className="py-24 bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">Architecture & trust boundaries</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Adaptive Regression Intelligence inherits MASReady's core trust model. Fingerprinting is always read-only. Generated tests are always customer-controlled.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Read-only fingerprinting",
                  color: "text-emerald-600",
                  border: "border-emerald-200",
                  bg: "bg-emerald-50",
                  points: [
                    "Maximo API access uses read-only credentials",
                    "Zero mutations to source system at any stage",
                    "Fingerprint reads environment state only",
                    "No data written to Maximo during scanning",
                  ],
                },
                {
                  icon: UserCheck,
                  title: "Human review gate",
                  color: "text-primary",
                  border: "border-primary/20",
                  bg: "bg-primary/5",
                  points: [
                    "Generated tests are recommendations, not automations",
                    "QA engineers review all proposed test additions",
                    "No test reaches a pipeline without explicit approval",
                    "Rejection or modification is always an option",
                  ],
                },
                {
                  icon: Download,
                  title: "Customer-controlled export",
                  color: "text-accent",
                  border: "border-accent/20",
                  bg: "bg-accent/5",
                  points: [
                    "Exported test files are plain TypeScript — no lock-in",
                    "Customer runs tests in their own pipeline",
                    "MASReady does not execute tests on customer systems",
                    "Export includes full source — nothing is hidden",
                  ],
                },
                {
                  icon: Database,
                  title: "Data boundary",
                  color: "text-violet-600",
                  border: "border-violet-200",
                  bg: "bg-violet-50",
                  points: [
                    "Fingerprint data stays within the customer data boundary",
                    "No environment data shared between tenants",
                    "Generated tests reference no proprietary environment data",
                    "Customer chooses data mode (hosted, zero-retention, BYO)",
                  ],
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-xl border ${item.border} ${item.bg} p-6`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <h3 className={`font-semibold ${item.color}`}>{item.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {item.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className={`w-4 h-4 ${item.color} shrink-0 mt-0.5`} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAS9 Power Demo Section ── */}
      <section className="py-24 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5 overflow-hidden">

              {/* Banner */}
              <div className="flex items-center gap-4 px-8 py-5 border-b border-accent/20 bg-accent/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-accent/70 mb-0.5">Fictional Demo</div>
                    <div className="text-xl font-bold text-foreground">MAS9 Power — ARI Example</div>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-600">All data is fictional</span>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-7">
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  MAS9 Power is a fictional energy and utilities company running Maximo 7.6.1.3 on-premise, upgrading to IBM MAS Manage 9.x. After fingerprinting, MASReady would recommend the following regression pack — entirely fictional and generated for demonstration purposes only.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {MAS9_RECOMMENDATIONS.map((rec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{rec.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-semibold text-foreground">{rec.label}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            rec.risk === "High"
                              ? "bg-destructive/15 text-destructive border border-destructive/20"
                              : rec.risk === "Medium"
                              ? "bg-amber-50 text-amber-600 border border-amber-200"
                              : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          }`}>{rec.risk}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-snug">{rec.reason}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <p className="mt-6 text-xs text-amber-600 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  All recommendations above are fictitious examples generated for demonstration. No real Maximo environment, customer data, or test files are present in this demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-4">Frequently asked questions</h2>
            </div>

            <div className="space-y-4">
              {FAQ.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="font-semibold text-foreground mb-3 flex items-start gap-2">
                    <span className="text-primary shrink-0">Q.</span>
                    {item.q}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-5">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-primary/10 text-center border-t border-primary/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-5">Ready to see MASReady in action?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Explore the MAS9 Power demo tenant or take the 12-minute walkthrough to see delivery intelligence end to end.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/mas9-power" className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-0.5">
                Explore MAS9 Power <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/demo-walkthrough" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-8 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all hover:-translate-y-0.5">
                Take the Walkthrough
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-8 py-3 text-sm font-semibold text-accent hover:bg-accent/20 transition-all hover:-translate-y-0.5">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
