import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  CheckCircle2, ChevronRight, ChevronLeft, Play, RotateCcw,
  Clock, User, Shield, Activity, Fingerprint, FileText, Users,
  Lock, BookOpen, AlertCircle, BarChart3, Settings, ArrowRight,
} from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

// ─── Easing ───────────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

// ─── Reusable animation components ───────────────────────────────────────────

/** Fade + slide up on scroll into view */
function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — children stagger with index */
function StaggerGroup({
  children,
  className = "",
  stagger = 0.06,
  delayStart = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayStart?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delayStart } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Single stagger item — use inside StaggerGroup */
function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Count-up number that triggers when scrolled into view */
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const duration = 900;
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * to));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Step data ────────────────────────────────────────────────────────────────

const STEPS = [
  {
    title: "Login + Customer Switch",
    role: "Admin", time: "1 min",
    icon: User, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200",
    summary: "Proves multi-tenant auth, customer scoping",
    detail: "Log in as the MAS9 Power tenant admin. Demonstrate how switching between customers scopes all data — requirements, patches, licences — to a single client. No cross-tenant data leakage.",
    proof: ["Multi-tenant login screen", "Customer selector dropdown", "Scoped dashboard refresh"],
  },
  {
    title: "Delivery Intelligence Dashboard",
    role: "Delivery Lead", time: "2 min",
    icon: Activity, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30",
    summary: "Proves unified confidence score, top-level posture",
    detail: "The delivery confidence score aggregates requirements coverage, patch risk, skill gaps, and licence headroom into one number. The score of 87/100 reflects the MAS9 Power environment fingerprint — 46 customisations detected, 7 patch impacts identified, 77% AppPoint utilisation, and 82% bot skill-pack coverage. In a live deployment, every contributing factor reflects your real environment.",
    proof: ["Intelligence Score: 87/100 — based on environment fingerprint", "Score breakdown by dimension", "Trend sparkline"],
  },
  {
    title: "Trust Center",
    role: "Admin", time: "1 min",
    icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200",
    summary: "Proves read-only design, no mutation confirmation",
    detail: "The Trust Center shows every integration in READ-ONLY mode. No SQL execution, no Jira write, no Maximo write. The platform is architecturally constrained — write operations are impossible by design, not just by configuration.",
    proof: ["Zero mutations — platform is architecturally read-only", "Read-only integration list", "Trust boundary = REVIEW ONLY"],
  },
  {
    title: "Integration Settings",
    role: "Admin", time: "1 min",
    icon: Settings, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200",
    summary: "Proves Jira read-only mode, no ADO/Maximo write",
    detail: "Open Integration Settings. Show that write toggles are disabled at the platform level — not just via UI. In a live customer deployment, Jira and Maximo tokens are stored as server-side environment variables and scoped to read-only. In this environment the integration is shown in unconfigured state — no live token is active.",
    proof: ["Write toggles disabled at platform level", "API tokens stored server-side only — never in browser", "Integration architecture is read-only by design"],
  },
  {
    title: "Requirement Uploads",
    role: "Delivery Lead", time: "1 min",
    icon: FileText, color: "text-accent", bg: "bg-accent/10", border: "border-accent/30",
    summary: "Proves structured intake, evidence linking",
    detail: "Upload a sample requirements spreadsheet. Show how MASReady parses, categorises, and links each requirement to Maximo objects, patches, and skills — creating an evidence trail automatically.",
    proof: ["CSV/XLSX upload accepted", "Auto-categorisation", "Evidence links generated"],
  },
  {
    title: "Maximo Fingerprint",
    role: "Asset Manager", time: "1 min",
    icon: Fingerprint, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200",
    summary: "Proves 46 customisations scanned, environment profile",
    detail: "The fingerprint scan reads the current Maximo 7.6.1.3 environment and identifies 46 customisations — BOs, screen changes, automation scripts, and workflow modifications. This snapshot becomes the baseline for MAS 9 readiness assessment. Non-destructive: zero mutations, zero SQL writes.",
    proof: ["46 customisations detected", "Current: Maximo 7.6.1.3 on-premise → Target: MAS 9.x", "Scan is non-destructive"],
  },
  {
    title: "Patch Impact Analysis",
    role: "Delivery Lead", time: "1 min",
    icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30",
    summary: "Proves 7 impacted items, 2 high severity",
    detail: "Cross-reference the patch manifest against the environment fingerprint. 7 customisations are impacted by the planned patch — 2 are high severity. Each item links to the affected BO and the patch note.",
    proof: ["7 impacted customisations", "2 high-severity flags", "Deep-link to patch notes"],
  },
  {
    title: "License Usage Planning",
    role: "Finance", time: "1 min",
    icon: BarChart3, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200",
    summary: "Proves AppPoint trend, 77% utilisation, planning only",
    detail: "Show the 12-month AppPoint trend (77% average utilisation). The planning view simulates adding mobile users and projects the headroom remaining — helping avoid overage before renewal.",
    proof: ["77% AppPoint utilisation", "12-month trend chart", "\"What-if\" planning mode"],
  },
  {
    title: "Skill Coverage",
    role: "Delivery Lead", time: "1 min",
    icon: Users, color: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200",
    summary: "Proves 82% bot skill-pack coverage across Maximo delivery domains",
    detail: "The skill-pack coverage map shows which bot skill packs are installed and active against the 46 customisations and patch requirements. 82% bot skill-pack coverage across Maximo delivery domains (system-defined — base packs) — 8 gaps are flagged with suggested remediation.",
    proof: ["82% bot skill-pack coverage across Maximo delivery domains (system-defined — base packs)", "8 identified gaps", "Gap → recommended action"],
  },
  {
    title: "No Contract Mobilisation",
    role: "Admin", time: "30s",
    icon: Lock, color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200",
    summary: "Proves contract mobilisation module disabled, feature flag respected",
    detail: "Toggle the \"Contract Mobilisation\" feature flag to OFF. Show that the Contract Mobilisation module section disappears across all views — proving feature-flag driven control.",
    proof: ["Contract mobilisation flag = OFF", "Module menu hidden", "No data residue"],
  },
  {
    title: "Audit Log",
    role: "Auditor", time: "30s",
    icon: BookOpen, color: "text-pink-700", bg: "bg-pink-50", border: "border-pink-200",
    summary: "Proves immutable trace, full activity history",
    detail: "Open the Audit Log. Every action in the session is recorded — logins, scans, uploads, report views. The log is immutable (append-only) and can be exported for client-facing evidence packages.",
    proof: ["Session fully traced", "Immutable append-only log", "Export to PDF/CSV"],
  },
  {
    title: "Help Center",
    role: "Any", time: "30s",
    icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200",
    summary: "Proves offline skill packs, guided onboarding",
    detail: "Open the Help Center. Skill packs are bundled offline — no internet required during a client workshop. Each module has step-by-step onboarding guides tailored to each role (Admin, Delivery Lead, Finance, Auditor).",
    proof: ["Offline skill pack available", "Role-filtered guides", "No external dependency"],
  },
];

// ─── StepDot ──────────────────────────────────────────────────────────────────

function StepDot({ index, state }: { index: number; state: "done" | "active" | "future" }) {
  return (
    <motion.div
      animate={state === "active" ? { scale: 1.15 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex-shrink-0 w-7 h-7 flex items-center justify-center border-2 transition-colors duration-300
        ${state === "done"   ? "bg-emerald-500 border-emerald-500" : ""}
        ${state === "active" ? "bg-primary border-primary shadow-sm shadow-primary/30" : ""}
        ${state === "future" ? "bg-background border-border" : ""}
      `}
    >
      {state === "done"
        ? <CheckCircle2 className="w-3.5 h-3.5 text-white" />
        : <span className={`text-xs font-semibold ${state === "active" ? "text-white" : "text-muted-foreground"}`}>{index + 1}</span>
      }
    </motion.div>
  );
}

// ─── Pre-start screen ─────────────────────────────────────────────────────────

function PreStart({ onStart }: { onStart: () => void }) {
  const METRICS = [
    { label: "Demo steps",    to: 12,  suffix: "" },
    { label: "Total time",    to: 12,  suffix: " min" },
    { label: "Roles covered", to: 5,   suffix: "" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 lg:px-16 max-w-5xl pt-28 pb-20">

        {/* Hero */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-5"
          >
            Guided Demo Walkthrough
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-5 leading-[1.1]"
            style={serif}
          >
            The 12-Minute Demo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.17 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            A perfectly paced guided walkthrough of the MAS9 Power tenant. Step through each module, see the evidence, mark it complete.
          </motion.p>
        </div>

        {/* KPI metrics with count-up */}
        <StaggerGroup className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-16" stagger={0.12} delayStart={0.25}>
          {METRICS.map((m) => (
            <StaggerItem key={m.label}>
              <div className="border border-border bg-card p-6 text-center">
                <div className="text-3xl font-semibold text-foreground mb-1" style={serif}>
                  <AnimatedCounter to={m.to} suffix={m.suffix} />
                </div>
                <div className="text-xs text-muted-foreground font-medium">{m.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Step list */}
        <StaggerGroup className="space-y-2 mb-14 max-w-3xl mx-auto" stagger={0.045} delayStart={0.4}>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={i}>
                <div className="flex items-center gap-4 border border-border bg-card px-5 py-3.5 hover:bg-muted transition-colors">
                  <div className={`w-7 h-7 ${s.bg} border ${s.border} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm text-foreground">{s.title}</span>
                    <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">{s.summary}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-muted-foreground border border-border px-2 py-0.5">{s.role}</span>
                    <span className="text-xs text-primary font-medium">{s.time}</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.9 }}
          className="text-center"
        >
          <button
            onClick={onStart}
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/20"
          >
            <Play className="w-4 h-4" /> Start 12-Minute Walkthrough
          </button>
          <p className="text-xs text-muted-foreground mt-4">Read-only · Zero mutations · No production access required</p>
        </motion.div>

      </div>
    </div>
  );
}

// ─── Active walkthrough screen ────────────────────────────────────────────────

function ActiveWalkthrough({
  current,
  completed,
  elapsed,
  onNext,
  onBack,
  onJump,
  onFinish,
  onReset,
}: {
  current: number;
  completed: Set<number>;
  elapsed: number;
  onNext: () => void;
  onBack: () => void;
  onJump: (i: number) => void;
  onFinish: () => void;
  onReset: () => void;
}) {
  const step = STEPS[current];
  const Icon = step.icon;
  const progress = (completed.size / STEPS.length) * 100;
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const isLast = current === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 lg:px-16 max-w-4xl pt-24 pb-16">

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-0.5">12-Minute Walkthrough</p>
            <p className="text-sm text-muted-foreground">Step {current + 1} of {STEPS.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground border border-border bg-card px-3 py-2">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-mono text-foreground">{mins}:{secs.toString().padStart(2, "0")}</span>
            </div>
            <button onClick={onReset} className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-border mb-6">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1 flex-shrink-0">
              <button onClick={() => onJump(i)} title={s.title}>
                <StepDot
                  index={i}
                  state={completed.has(i) ? "done" : i === current ? "active" : "future"}
                />
              </button>
              {i < STEPS.length - 1 && (
                <motion.div
                  className="h-px w-3"
                  animate={{ backgroundColor: completed.has(i) ? "#10b981" : "#e2e8f0" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Animated step card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.3, ease }}
            className={`border ${step.border} bg-card overflow-hidden mb-6`}
          >
            {/* Card header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className={`${step.bg} border-b ${step.border} px-8 py-6`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.12, ease }}
                  className={`w-11 h-11 ${step.bg} border ${step.border} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${step.color}`} />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15, ease }}
                    className="text-xl font-semibold text-foreground mb-2"
                    style={serif}
                  >
                    {step.title}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-2"
                  >
                    <span className={`text-xs font-semibold px-2 py-0.5 border ${step.border} ${step.color} ${step.bg}`}>{step.role}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 border border-border bg-background text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {step.time}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card body */}
            <div className="px-8 py-6 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2, ease }}
                className="text-base text-muted-foreground leading-relaxed"
              >
                {step.detail}
              </motion.p>

              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28 }}
                  className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3"
                >
                  What to show
                </motion.p>
                <ul className="space-y-2.5">
                  {step.proof.map((p, j) => (
                    <motion.li
                      key={`${current}-${j}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.32 + j * 0.1, ease }}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${step.color}`} />
                      {p}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={current === 0}
            className="inline-flex items-center gap-2 border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <span className="text-sm text-muted-foreground">{completed.size} / {STEPS.length} complete</span>

          <button
            onClick={isLast ? onFinish : onNext}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-all hover:-translate-y-0.5"
          >
            {isLast ? "Finish" : "Mark Done & Next"} <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Complete screen ──────────────────────────────────────────────────────────

function CompleteScreen({ elapsed, onReset }: { elapsed: number; onReset: () => void }) {
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="w-20 h-20 border border-emerald-200 bg-emerald-50 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="text-3xl font-semibold mb-3"
          style={serif}
        >
          Walkthrough Complete
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground mb-2"
        >
          All {STEPS.length} modules demonstrated in {mins}m {secs.toString().padStart(2, "0")}s.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="text-sm text-muted-foreground mb-10"
        >
          Every step was read-only. Zero mutations. Zero production risk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, ease }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Restart Walkthrough
          </button>
          <Link
            href="/mas9-power"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            Explore MAS9 Power <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DemoWalkthrough() {
  const [started,   setStarted]   = useState(false);
  const [current,   setCurrent]   = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [elapsed,   setElapsed]   = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFinished = current >= STEPS.length;

  useEffect(() => {
    if (started && !isFinished) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, isFinished]);

  function start()  { setStarted(true); setCurrent(0); setCompleted(new Set()); setElapsed(0); }
  function reset()  { setStarted(false); setCurrent(0); setCompleted(new Set()); setElapsed(0); }
  function jump(i: number) { setCurrent(i); }

  function next() {
    const next = new Set([...completed, current]);
    setCompleted(next);
    if (current < STEPS.length - 1) setCurrent(c => c + 1);
    else finish(next);
  }

  function back() { if (current > 0) setCurrent(c => c - 1); }

  function finish(comp = completed) {
    if (timerRef.current) clearInterval(timerRef.current);
    setCompleted(new Set([...comp, current]));
    setCurrent(STEPS.length);
  }

  if (!started) return <PreStart onStart={start} />;
  if (isFinished) return <CompleteScreen elapsed={elapsed} onReset={reset} />;

  return (
    <ActiveWalkthrough
      current={current}
      completed={completed}
      elapsed={elapsed}
      onNext={next}
      onBack={back}
      onJump={jump}
      onFinish={finish}
      onReset={reset}
    />
  );
}
