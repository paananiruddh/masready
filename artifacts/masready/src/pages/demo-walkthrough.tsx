import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  CheckCircle2, Circle, ChevronRight, ChevronLeft, Play, RotateCcw,
  Clock, User, Shield, Activity, Fingerprint, FileText, Users,
  Lock, BookOpen, AlertCircle, BarChart3, Settings
} from "lucide-react";

const STEPS = [
  {
    title: "Login + Customer Switch",
    role: "Admin",
    time: "1 min",
    icon: User,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    summary: "Proves multi-tenant auth, customer scoping",
    detail: "Log in as the MAS9 Power tenant admin. Demonstrate how switching between customers scopes all data — requirements, patches, licences — to a single client. No cross-tenant data leakage.",
    proof: ["Multi-tenant login screen", "Customer selector dropdown", "Scoped dashboard refresh"],
  },
  {
    title: "Delivery Intelligence Dashboard",
    role: "Delivery Lead",
    time: "2 min",
    icon: Activity,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
    summary: "Proves unified confidence score, top-level posture",
    detail: "The delivery confidence score aggregates requirements coverage, patch risk, skill gaps, and licence headroom into one number. In this demo the score is 87/100 from seeded data. In a live deployment, every contributing factor reflects your real environment. Walk through each dimension to explain the methodology.",
    proof: ["Intelligence Score: 87/100 (demo seed data)", "Score breakdown by dimension", "Trend sparkline"],
  },
  {
    title: "Trust Center",
    role: "Admin",
    time: "1 min",
    icon: Shield,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/30",
    summary: "Proves read-only design, no mutation confirmation",
    detail: "The Trust Center shows every integration in READ-ONLY mode. No SQL execution, no Jira write, no Maximo write. The platform is architecturally constrained — write operations are impossible by design, not just by configuration.",
    proof: ["Zero mutations — platform is architecturally read-only", "Read-only integration list", "Trust boundary = REVIEW ONLY"],
  },
  {
    title: "Integration Settings",
    role: "Admin",
    time: "1 min",
    icon: Settings,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
    summary: "Proves Jira read-only mode, no ADO/Maximo write",
    detail: "Open Integration Settings. Show that write toggles are disabled at the platform level — not just via UI. In a live customer deployment, Jira and Maximo tokens are stored as server-side environment variables and scoped to read-only. In this demo environment the integration is shown in unconfigured state — no live token is active.",
    proof: ["Write toggles disabled at platform level", "API tokens stored server-side only — never in browser", "Integration architecture is read-only by design"],
  },
  {
    title: "Requirement Uploads",
    role: "Delivery Lead",
    time: "1 min",
    icon: FileText,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
    summary: "Proves structured intake, evidence linking",
    detail: "Upload a sample requirements spreadsheet. Show how MASReady parses, categorises, and links each requirement to Maximo objects, patches, and skills — creating an evidence trail automatically.",
    proof: ["CSV/XLSX upload accepted", "Auto-categorisation", "Evidence links generated"],
  },
  {
    title: "Maximo Fingerprint",
    role: "Asset Manager",
    time: "1 min",
    icon: Fingerprint,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/30",
    summary: "Proves 46 customisations scanned, environment profile",
    detail: "The fingerprint scan reads the current Maximo 7.6.1.3 environment and identifies 46 customisations — BOs, screen changes, automation scripts, and workflow modifications. This snapshot becomes the baseline for MAS 9 readiness assessment. Non-destructive: zero mutations, zero SQL writes.",
    proof: ["46 customisations detected", "Current: Maximo 7.6.1.3 on-premise → Target: MAS 9.x", "Scan is non-destructive"],
  },
  {
    title: "Patch Impact Analysis",
    role: "Delivery Lead",
    time: "1 min",
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    summary: "Proves 7 impacted items, 2 high severity",
    detail: "Cross-reference the patch manifest against the environment fingerprint. 7 customisations are impacted by the planned patch — 2 are high severity. Each item links to the affected BO and the patch note.",
    proof: ["7 impacted customisations", "2 high-severity flags", "Deep-link to patch notes"],
  },
  {
    title: "License Usage Planning",
    role: "Finance",
    time: "1 min",
    icon: BarChart3,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/30",
    summary: "Proves AppPoint trend, 77% utilisation, planning only",
    detail: "Show the 12-month AppPoint trend (77% average utilisation). The planning view simulates adding mobile users and projects the headroom remaining — helping avoid overage before renewal.",
    proof: ["77% AppPoint utilisation", "12-month trend chart", "\"What-if\" planning mode"],
  },
  {
    title: "Skill Coverage",
    role: "Delivery Lead",
    time: "1 min",
    icon: Users,
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    border: "border-teal-400/30",
    summary: "Proves 82% bot skill-pack coverage across Maximo delivery domains",
    detail: "The skill-pack coverage map shows which bot skill packs are installed and active against the 46 customisations and patch requirements. 82% bot skill-pack coverage across Maximo delivery domains (system-defined — base packs) — 8 gaps are flagged with suggested remediation.",
    proof: ["82% bot skill-pack coverage across Maximo delivery domains (system-defined — base packs)", "8 identified gaps", "Gap → recommended action"],
  },
  {
    title: "No Contract Mobilisation",
    role: "Admin",
    time: "30s",
    icon: Lock,
    color: "text-slate-400",
    bg: "bg-slate-400/10",
    border: "border-slate-400/30",
    summary: "Proves contract mobilisation module disabled, feature flag respected",
    detail: "Toggle the \"Contract Mobilisation\" feature flag to OFF. Show that the Contract Mobilisation module section disappears across all views — proving feature-flag driven control.",
    proof: ["Contract mobilisation flag = OFF", "Module menu hidden", "No data residue"],
  },
  {
    title: "Audit Log",
    role: "Auditor",
    time: "30s",
    icon: BookOpen,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/30",
    summary: "Proves immutable trace, full activity history",
    detail: "Open the Audit Log. Every action in the session is recorded — logins, scans, uploads, report views. The log is immutable (append-only) and can be exported for client-facing evidence packages.",
    proof: ["Session fully traced", "Immutable append-only log", "Export to PDF/CSV"],
  },
  {
    title: "Help Center",
    role: "Any",
    time: "30s",
    icon: BookOpen,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/30",
    summary: "Proves offline skill packs, guided onboarding",
    detail: "Open the Help Center. Skill packs are bundled offline — no internet required during a client workshop. Each module has step-by-step onboarding guides tailored to each role (Admin, Delivery Lead, Finance, Auditor).",
    proof: ["Offline skill pack available", "Role-filtered guides", "No external dependency"],
  },
];

const TOTAL_SECONDS = 12 * 60;

function StepDot({ index, state }: { index: number; state: "done" | "active" | "future" }) {
  return (
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
      ${state === "done" ? "bg-green-500 border-green-500" : ""}
      ${state === "active" ? "bg-primary border-primary shadow-lg shadow-primary/40 scale-110" : ""}
      ${state === "future" ? "bg-background border-white/20" : ""}
    `}>
      {state === "done"
        ? <CheckCircle2 className="w-4 h-4 text-white" />
        : <span className={`text-xs font-bold ${state === "active" ? "text-white" : "text-muted-foreground"}`}>{index + 1}</span>
      }
    </div>
  );
}

export default function DemoWalkthrough() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (started && current < STEPS.length) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, current]);

  function start() { setStarted(true); setCurrent(0); setCompleted(new Set()); setElapsed(0); }

  function next() {
    setCompleted(prev => new Set([...prev, current]));
    if (current < STEPS.length - 1) setCurrent(c => c + 1);
    else finish();
  }

  function back() { if (current > 0) setCurrent(c => c - 1); }

  function finish() {
    if (timerRef.current) clearInterval(timerRef.current);
    setCompleted(prev => new Set([...prev, current]));
    setCurrent(STEPS.length);
  }

  function reset() { setStarted(false); setCurrent(0); setCompleted(new Set()); setElapsed(0); }

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const isFinished = current >= STEPS.length;
  const step = STEPS[current];

  if (!started) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">The 12-Minute Demo</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A perfectly paced guided walkthrough of the MAS9 Power tenant. Step through each module, see the evidence, then mark it complete.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { label: "Steps", value: STEPS.length },
            { label: "Total time", value: "12 min" },
            { label: "Roles covered", value: "5" },
          ].map(m => (
            <div key={m.label} className="rounded-xl border border-white/10 bg-card p-5">
              <div className="text-3xl font-bold text-white mb-1">{m.value}</div>
              <div className="text-sm text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-3 mb-12">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-card/60 px-5 py-3"
              >
                <div className={`w-7 h-7 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-sm text-white">{s.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">{s.summary}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded">{s.role}</span>
                  <span className="text-xs text-primary">{s.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <button onClick={start}
            className="inline-flex items-center gap-3 rounded-xl bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all hover:-translate-y-0.5 hover:shadow-primary/50">
            <Play className="w-5 h-5" /> Start 12-Minute Walkthrough
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Walkthrough Complete</h1>
          <p className="text-xl text-muted-foreground mb-4">
            All {STEPS.length} modules demonstrated in {mins}m {secs.toString().padStart(2, "0")}s.
          </p>
          <p className="text-sm text-muted-foreground mb-10">Every step was read-only. Zero mutations. Zero production risk.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all">
              <RotateCcw className="w-4 h-4" /> Restart Walkthrough
            </button>
            <Link href="/mas9-power"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-all">
              Explore MAS9 Power <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const Icon = step.icon;
  const progress = ((completed.size) / STEPS.length) * 100;

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">12-Minute Walkthrough</h1>
          <p className="text-sm text-muted-foreground">Step {current + 1} of {STEPS.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card border border-white/10 rounded-lg px-3 py-2">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{mins}:{secs.toString().padStart(2, "0")}</span>
          </div>
          <button onClick={reset} className="text-xs text-muted-foreground hover:text-white transition-colors flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/10 mb-8">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-1.5 mb-10 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 shrink-0">
            <button onClick={() => setCurrent(i)}>
              <StepDot index={i}
                state={completed.has(i) ? "done" : i === current ? "active" : "future"} />
            </button>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-4 transition-colors ${completed.has(i) ? "bg-green-500" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Main step card */}
      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className={`rounded-2xl border ${step.border} bg-card/80 backdrop-blur overflow-hidden mb-6`}
        >
          {/* Card header */}
          <div className={`${step.bg} border-b ${step.border} px-8 py-6`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center shrink-0`}>
                <Icon className={`w-6 h-6 ${step.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                </div>
                <div className="flex gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${step.bg} ${step.color} border ${step.border}`}>{step.role}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white border border-white/10 flex items-center gap-1">
                    <Clock className="w-3 h-3" />{step.time}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card body */}
          <div className="px-8 py-6 space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">{step.detail}</p>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">What to show</div>
              <ul className="space-y-2">
                {step.proof.map((p, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-white">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${step.color}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={back} disabled={current === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="text-sm text-muted-foreground">{completed.size} / {STEPS.length} complete</div>

        <button onClick={next}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow hover:bg-primary/90 transition-all hover:-translate-y-0.5">
          {current === STEPS.length - 1 ? "Finish" : "Mark Done & Next"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
