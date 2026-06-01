import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, ArrowRight, Activity, FileText, Fingerprint, Lock, Box, Users } from "lucide-react";
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
      <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl pointer-events-none" />
      <div className="relative rounded-2xl border border-white/10 bg-card/70 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-background/60">
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
            <div className="rounded-xl border border-white/5 bg-background/40 p-4">
              <div className="text-xs text-muted-foreground mb-1">Intelligence Score</div>
              <div className="text-3xl font-bold text-accent">87<span className="text-base text-muted-foreground">/100</span></div>
              <div className="mt-2 h-1.5 rounded-full bg-white/5">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }} animate={{ width: "87%" }} transition={{ delay: 0.8, duration: 1 }} />
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-background/40 p-4">
              <div className="text-xs text-muted-foreground mb-1">Trust Boundary</div>
              <div className="flex items-center gap-1.5 mt-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm font-bold text-green-400">REVIEW ONLY</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">0 mutations · read-only</div>
            </div>
          </div>

          {/* Live cycling metric */}
          <div className="rounded-xl border border-white/10 bg-background/30 p-4">
            <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Live Status</div>
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
          <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
            <Lock className="w-4 h-4 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Zero Production Mutations</div>
              <div className="text-xs text-muted-foreground">No SQL exec · No Jira write · No Maximo write</div>
            </div>
            <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded shrink-0">SAFE</span>
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
          className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }}
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.16) 0%, transparent 70%)" }}
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
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
      <section className="border-y border-white/10 bg-card/50 backdrop-blur-sm py-8">
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
                <div className="text-2xl font-bold text-white mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">What the Workbench Does</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A unified approach to Maximo delivery, combining disjointed processes into a single source of truth.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Delivery Intelligence", icon: Activity, desc: "Unified delivery confidence score across all project dimensions.", href: "/features" },
              { title: "Maximo Fingerprint", icon: Fingerprint, desc: "Automated scan of installed objects, customisations, and version data.", href: "/features" },
              { title: "License Planning", icon: FileText, desc: "AppPoint trends, named users, and mobile pool analysis for capacity planning.", href: "/features" },
              { title: "Adaptive Regression Intelligence", icon: Shield, desc: "Fingerprint your Maximo environment and generate the regression tests it actually needs.", href: "/adaptive-regression" },
            ].map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-background/50 p-6 flex flex-col gap-4 hover:bg-white/5 hover:border-white/20 transition-all hover:-translate-y-1 cursor-default"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit">
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
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

      {/* ── CTA ── */}
      <section className="py-28 bg-primary/10 text-center border-t border-primary/20">
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
