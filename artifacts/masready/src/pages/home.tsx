import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, ArrowRight, Activity, FileText, Fingerprint, Lock, Box, Users, ClipboardCheck, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useEffect, useState, useRef } from "react";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 1800;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) { clearInterval(timer); setCount(end); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const SCENARIOS = [
  { label: "Patch Impact", value: "7 items found", color: "text-destructive", dot: "bg-destructive" },
  { label: "Bot Skill-Pack Coverage", value: "82% mapped", color: "text-primary", dot: "bg-primary" },
  { label: "AppPoints", value: "77% utilised", color: "text-accent", dot: "bg-accent" },
  { label: "Trust Boundary", value: "REVIEW ONLY", color: "text-green-400", dot: "bg-green-400" },
];

function LiveDashboard() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % SCENARIOS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="relative"
    >
      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-primary/30 rounded-3xl blur-3xl pointer-events-none" />
      <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl pointer-events-none" />
      <div className="relative rounded-2xl border border-white/20 bg-card backdrop-blur-xl shadow-2xl shadow-primary/20 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-background/80">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="mx-auto text-xs text-muted-foreground font-medium">MASReady Workbench — MAS9 Power</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Score row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 p-4">
              <div className="text-xs text-primary/80 font-medium mb-1">Intelligence Score</div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">87<span className="text-base text-muted-foreground">/100</span></div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }} animate={{ width: "87%" }} transition={{ delay: 0.8, duration: 1 }} />
              </div>
            </div>
            <div className="rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/15 to-green-500/5 p-4">
              <div className="text-xs text-green-400/80 font-medium mb-1">Trust Boundary</div>
              <div className="flex items-center gap-1.5 mt-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm font-bold text-green-400">REVIEW ONLY</span>
              </div>
              <div className="text-xs text-green-400/50 mt-2">0 mutations · read-only</div>
            </div>
          </div>

          {/* Live cycling metric */}
          <div className="rounded-xl border border-white/15 bg-background/60 p-4">
            <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">Live Status</div>
            <div className="space-y-2">
              {SCENARIOS.map((s, i) => (
                <motion.div key={s.label}
                  animate={{ opacity: active === i ? 1 : 0.35, scale: active === i ? 1.02 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className="text-muted-foreground">{s.label}</span>
                  </div>
                  <span className={`font-mono font-bold ${s.color}`}>{s.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Zero mutations badge */}
          <div className="flex items-center gap-3 rounded-xl border border-primary/40 bg-gradient-to-r from-primary/15 to-accent/10 px-4 py-3">
            <Lock className="w-4 h-4 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white">Zero Production Mutations</div>
              <div className="text-xs text-muted-foreground">No SQL exec · No Jira write · No Maximo write</div>
            </div>
            <span className="text-xs font-mono font-bold text-primary bg-primary/20 border border-primary/40 px-2 py-1 rounded shrink-0">SAFE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="pointer-events-none absolute top-0 left-0 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.38) 0%, transparent 70%)" }}
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,220,255,0.30) 0%, transparent 70%)" }}
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)" }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                MAS 9 Delivery Intelligence · MAS9 Power Demo
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.05]"
              >
                Maximo delivery{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
                  intelligence
                </span>
                ,<br />without the chaos.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg text-muted-foreground mb-8 leading-relaxed"
              >
                Evidence-backed delivery automation for IBM Maximo teams — combining requirements, environment fingerprints, patch impact, license planning, bot skill-pack coverage, and trust boundaries into one review-ready workbench.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <Link href="/mas9-power" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:shadow-primary/40 hover:-translate-y-0.5">
                  Explore MAS9 Power <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/trust" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 backdrop-blur px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all hover:-translate-y-0.5">
                  See Trust Model
                </Link>
                <Link href="/simulator" className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent hover:bg-accent/20 transition-all hover:-translate-y-0.5">
                  Run Simulator
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
              >
                <span>Design variants:</span>
                <Link href="/" className="px-2 py-0.5 rounded bg-white/10 text-white text-xs font-medium">Design 1</Link>
                <Link href="/design2" className="px-2 py-0.5 rounded hover:bg-white/10 text-xs transition-colors">Design 2 (social)</Link>
                <Link href="/design3" className="px-2 py-0.5 rounded hover:bg-white/10 text-xs transition-colors">Design 3 (command center)</Link>
              </motion.div>
            </div>

            {/* Right — animated dashboard */}
            <LiveDashboard />
          </div>
        </div>
      </section>

      {/* ── Capability Strip ── */}
      <section className="border-y border-white/10 bg-gradient-to-r from-primary/8 via-card/80 to-accent/8 backdrop-blur-sm py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
            {[
              { label: "Modules", value: 6, suffix: "" },
              { label: "Read-only", value: 100, suffix: "%" },
              { label: "Mutations", value: 0, suffix: "" },
              { label: "Roles supported", value: 5, suffix: "" },
              { label: "Demo walkthrough", value: 12, suffix: "min" },
              { label: "Trust boundaries", value: 4, suffix: "" },
              { label: "Design variants", value: 3, suffix: "" },
              { label: "Prod risk", value: 0, suffix: "" },
            ].map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center"
              >
                <div className="text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">What the Workbench Does</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A unified approach to Maximo delivery, combining disjointed processes into a single source of truth.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Delivery Intelligence", icon: Activity, desc: "Unified delivery confidence score across all project dimensions.", href: "/features", accent: "text-primary", border: "border-primary/25", bg: "bg-primary/12", glow: "from-primary/10" },
              { title: "Maximo Fingerprint", icon: Fingerprint, desc: "Automated scan of installed objects, customisations, and version data.", href: "/features", accent: "text-accent", border: "border-accent/25", bg: "bg-accent/10", glow: "from-accent/10" },
              { title: "License Planning", icon: FileText, desc: "AppPoint trends, named users, and mobile pool analysis for capacity planning.", href: "/features", accent: "text-violet-400", border: "border-violet-400/25", bg: "bg-violet-400/10", glow: "from-violet-400/10" },
              { title: "Adaptive Regression", icon: Shield, desc: "Fingerprint your Maximo environment and generate the regression tests it actually needs.", href: "/adaptive-regression", accent: "text-amber-400", border: "border-amber-400/25", bg: "bg-amber-400/10", glow: "from-amber-400/10" },
            ].map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border ${f.border} bg-gradient-to-b ${f.glow} to-card/80 p-6 flex flex-col gap-4 hover:border-opacity-60 hover:-translate-y-1 transition-all duration-200 cursor-default`}
              >
                <div className={`p-3 rounded-lg ${f.bg} ${f.accent} w-fit`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-semibold mb-2 ${f.accent}`}>{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audit Checklist Spotlight ── */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-accent/8" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left — copy */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
                  <ClipboardCheck className="w-3 h-3" /> New · MAS 9 Environment Audit
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
                  52 checks.<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Is your Maximo ready for MAS 9?
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  The MASReady Environment Audit Checklist walks you through 7 domains — from delivery intelligence and trust centre compliance through to AppPoints licence planning and post-migration validation. Fully owned. No external tools.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <Link
                    href="/audit-checklist"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    Run the Environment Audit
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "52", label: "Audit Checks", color: "from-primary to-accent" },
                    { value: "7",  label: "Domains",      color: "from-accent to-primary" },
                    { value: "23", label: "SQL Hints",    color: "from-violet-400 to-primary" },
                  ].map((s, i) => (
                    <div key={i} className="text-center rounded-xl border border-white/15 bg-card py-5 hover:border-primary/40 transition-colors">
                      <div className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${s.color}`}>{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right — domain cards */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-2.5"
              >
                {[
                  { label: "Delivery Intelligence",       count: 7,  status: "pass",  icon: CheckCircle2 },
                  { label: "Trust Centre Compliance",     count: 8,  status: "warn",  icon: AlertTriangle },
                  { label: "Patch & iFix Impact",         count: 8,  status: "fail",  icon: AlertTriangle },
                  { label: "Licence Planning Readiness",  count: 9,  status: "pass",  icon: CheckCircle2 },
                  { label: "OpenShift & Infrastructure",  count: 7,  status: "warn",  icon: AlertTriangle },
                  { label: "Integration & API Readiness", count: 6,  status: "pass",  icon: CheckCircle2 },
                  { label: "Post-Migration Validation",   count: 7,  status: "na",    icon: ClipboardCheck },
                ].map((domain, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-4 rounded-xl border border-white/15 bg-card/80 backdrop-blur px-4 py-3 hover:border-primary/30 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      domain.status === "pass" ? "bg-green-400" :
                      domain.status === "warn" ? "bg-amber-400" :
                      domain.status === "fail" ? "bg-red-400" :
                      "bg-white/30"
                    }`} />
                    <span className="text-sm font-medium text-white flex-1">{domain.label}</span>
                    <span className="text-xs text-muted-foreground">{domain.count} checks</span>
                    <div className={`w-16 h-1.5 rounded-full bg-white/10 overflow-hidden`}>
                      <div className={`h-full rounded-full ${
                        domain.status === "pass" ? "bg-green-400 w-full" :
                        domain.status === "warn" ? "bg-amber-400 w-3/5" :
                        domain.status === "fail" ? "bg-red-400 w-2/5" :
                        "bg-white/20 w-0"
                      }`} />
                    </div>
                  </motion.div>
                ))}
                <p className="text-xs text-muted-foreground text-center pt-1">Sample audit — your results depend on your environment</p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Demo Spotlight ── */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-card to-background p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
                <Box className="w-3 h-3" /> Demo Tenant Active
              </div>
              <h2 className="text-4xl font-bold mb-5">MAS9 Power Spotlight</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Step into a fully populated fictional energy/utilities company running IBM Maximo Application Suite Manage 9.x. See how MASReady handles complex environments without touching production data.
              </p>
              <Link href="/mas9-power" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                Explore the Demo Scenario <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Who is this for ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for your team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each role in a Maximo delivery programme has a different question. MASReady answers all of them from one platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              {
                role: "Delivery Manager",
                question: "How confident am I in this delivery? What evidence do I have?",
                answer: "MASReady aggregates bot-generated delivery intelligence into a single review-ready view — so you can walk into a steering committee with evidence, not estimates.",
                href: "/mas9-power",
                color: "text-primary",
                border: "border-primary/20",
                bg: "bg-primary/5",
              },
              {
                role: "Maximo Administrator",
                question: "Which parts of the Maximo configuration have we actually validated?",
                answer: "MASReady maps installed bot skill packs against your Maximo configuration fingerprint, showing exactly what has been assessed and what hasn't.",
                href: "/features",
                color: "text-orange-400",
                border: "border-orange-400/20",
                bg: "bg-orange-400/5",
              },
              {
                role: "Solution Architect",
                question: "Where are the integration gaps between our current Maximo and the MAS 9 target?",
                answer: "MASReady's layered skill-pack model cross-references your as-is configuration against the upgrade target, surfacing gaps the bot has evidence for and flagging what still needs assessment.",
                href: "/features",
                color: "text-yellow-400",
                border: "border-yellow-400/20",
                bg: "bg-yellow-400/5",
              },
              {
                role: "Security / Governance Lead",
                question: "Can I prove that no unapproved data left the customer boundary?",
                answer: "MASReady's zero-trust governance log records every evidence ingestion event, approval action, and export — providing an auditable chain of custody.",
                href: "/trust",
                color: "text-green-400",
                border: "border-green-400/20",
                bg: "bg-green-400/5",
              },
              {
                role: "Business Analyst",
                question: "What Maximo functional areas are covered by the current delivery scope?",
                answer: "MASReady skill-pack coverage maps directly to Maximo functional domains — so scope decisions are grounded in what the bot has actually assessed.",
                href: "/architecture",
                color: "text-violet-400",
                border: "border-violet-400/20",
                bg: "bg-violet-400/5",
              },
              {
                role: "IT Asset Manager",
                question: "What is our licence exposure going into the MAS 9 upgrade?",
                answer: "MASReady's licence planning view surfaces Maximo licence consumption patterns from available evidence — for planning purposes, not IBM-certified advice.",
                href: "/mas9-power",
                color: "text-accent",
                border: "border-accent/20",
                bg: "bg-accent/5",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className={`rounded-xl border ${item.border} ${item.bg} p-6 block hover:border-opacity-60 transition-colors`}
              >
                <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${item.color}`}>{item.role}</div>
                <div className="font-semibold text-white mb-2 text-sm">"{item.question}"</div>
                <div className="text-muted-foreground text-xs leading-relaxed">{item.answer}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead capture ── */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <LeadCaptureForm />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-gradient-to-br from-primary/20 via-background to-accent/15 text-center border-t border-primary/30 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 100%)" }} />
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-5">Ready to see MASReady in action?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Experience the precision of the Maximo Delivery Automation Workbench.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo-walkthrough" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-0.5">
                Take the 12-Minute Walkthrough
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-background px-8 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-all hover:-translate-y-0.5">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
