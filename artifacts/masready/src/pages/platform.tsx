import { motion } from "framer-motion";
import { Link } from "wouter";
import { Globe, Lock, Shield, ArrowRight, CheckCircle2, Database, Brain, FileText, Code2, Settings, Activity } from "lucide-react";

const MODES = [
  {
    icon: Globe,
    number: "01",
    title: "Public Synthetic Preview",
    subtitle: "Session-only · No production data · No persistence",
    color: "text-sky-600",
    border: "border-sky-300",
    bg: "from-sky-50",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    points: [
      "Fixed reusable synthetic industry datasets",
      "Runtime-only personalisation overlays",
      "No production data required or accepted",
      "No user data stored or persisted",
      "Browser session ends, preview resets",
      "Available across 10 industry sectors",
    ],
    cta: "Explore Previews",
    ctaHref: "/industry-previews",
  },
  {
    icon: Lock,
    number: "02",
    title: "Persisted Private Demo",
    subtitle: "Sales-assisted · Saved workspace · Controlled access",
    color: "text-primary",
    border: "border-primary/30",
    bg: "from-primary/10",
    badge: "bg-primary/10 text-primary border-primary/20",
    points: [
      "Created by MASReady after contact request",
      "Saved customer-specific demo workspace",
      "Can include secure synthetic customisation",
      "Private, access-controlled environment",
      "Sales-assisted workflow only",
      "Supports architecture and governance discussions",
    ],
    cta: "Request Demo",
    ctaHref: "/launch",
  },
  {
    icon: Shield,
    number: "03",
    title: "Secure Connected Assessment",
    subtitle: "Customer-approved · Real analysis · Controlled ingestion",
    color: "text-violet-600",
    border: "border-violet-300",
    bg: "from-violet-50",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    points: [
      "Customer-approved data ingestion only",
      "Real environment fingerprinting and analysis",
      "Maximo configuration and customisation scan",
      "Regression pack generation from real config",
      "Secure architecture and governance review",
      "Full audit trail and chain of custody",
    ],
    cta: "Book Assessment",
    ctaHref: "/contact",
  },
];

const INPUTS = [
  { label: "Industry template", icon: Globe },
  { label: "Maximo version", icon: Settings },
  { label: "Add-ons & integrations", icon: Database },
  { label: "Environment metadata", icon: Activity },
];

const OUTPUTS = [
  { label: "Readiness report", icon: FileText },
  { label: "Drift findings", icon: Activity },
  { label: "Regression pack", icon: Code2 },
  { label: "AI skill pack answers", icon: Brain },
  { label: "Architecture insights", icon: Settings },
  { label: "Governance checklist", icon: CheckCircle2 },
];

export default function Platform() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/6" />
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6"
          >
            <Shield className="w-3 h-3" /> Operational Intelligence Platform
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-5"
          >
            Three Operating{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Modes
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-10"
          >
            MASReady is an operational intelligence platform for IBM Maximo environments. Choose the mode
            that matches your readiness — from session-only synthetic previews through to secure connected assessments.
          </motion.p>
        </div>
      </section>

      {/* Three modes */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24">
            {MODES.map((mode, i) => (
              <motion.div
                key={mode.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border ${mode.border} bg-gradient-to-b ${mode.bg} to-card p-7 flex flex-col gap-6`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-card border ${mode.border}`}>
                    <mode.icon className={`w-5 h-5 ${mode.color}`} />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${mode.badge}`}>
                    Mode {mode.number}
                  </span>
                </div>
                <div>
                  <h3 className={`text-xl font-bold mb-1 ${mode.color}`}>{mode.title}</h3>
                  <p className="text-xs text-muted-foreground">{mode.subtitle}</p>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {mode.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className={`w-4 h-4 ${mode.color} shrink-0 mt-0.5`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={mode.ctaHref}
                  className={`mt-auto flex items-center justify-center gap-2 rounded-lg border ${mode.border} bg-card px-4 py-2.5 text-sm font-semibold ${mode.color} hover:bg-muted transition-colors`}
                >
                  {mode.cta} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Intelligence Engine diagram */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Intelligence Engine</h2>
              <p className="text-muted-foreground">From input signals to actionable delivery intelligence</p>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {/* Inputs */}
                <div className="p-8">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">Inputs</div>
                  <div className="space-y-4">
                    {INPUTS.map((inp) => (
                      <div key={inp.label} className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted border border-border">
                          <inp.icon className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-sm text-foreground">{inp.label}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="p-2 rounded-lg bg-muted border border-border">
                        <Lock className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-sm text-foreground">Screenshots / notes <span className="text-xs text-muted-foreground">(approved only)</span></span>
                    </div>
                  </div>
                </div>

                {/* Engine */}
                <div className="p-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-primary/8 to-accent/5">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 mb-4">
                    <Brain className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-lg font-bold mb-2">MASReady</div>
                  <div className="text-sm text-muted-foreground mb-4">Intelligence Engine</div>
                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">Environment Fingerprinting</div>
                    <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">Drift Detection</div>
                    <div className="px-3 py-1 rounded-full bg-violet-100 border border-violet-200 text-violet-600">Regression Intelligence</div>
                    <div className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600">AI Skill Packs</div>
                  </div>
                </div>

                {/* Outputs */}
                <div className="p-8">
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">Outputs</div>
                  <div className="space-y-4">
                    {OUTPUTS.map((out) => (
                      <div key={out.label} className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted border border-border">
                          <out.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">{out.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
