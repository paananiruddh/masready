import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck, CheckCircle2, XCircle, AlertTriangle, Minus, Clock,
  ChevronDown, ChevronRight, Code2, Wrench, Download, Plus, Trash2,
  Brain, ShieldCheck, Layers, Key, Server, Workflow, BarChart3
} from "lucide-react";
import { DemoBanner } from "@/components/DemoBanner";
import {
  AUDIT_SECTIONS,
  TOTAL_CHECKS,
  CheckState,
  CheckStatus,
  CheckSection,
  CheckItem,
  CheckSeverity,
  getCheckKey,
  getSectionScore,
  getOverallScore,
  exportMarkdown,
} from "@/lib/auditChecklist";

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTION_ICONS: Record<string, React.FC<{ className?: string }>> = {
  delivery_intelligence: Brain,
  trust_center: ShieldCheck,
  patch_impact: Layers,
  license_planning: Key,
  openshift_infra: Server,
  integration_readiness: Workflow,
  post_migration: ClipboardCheck,
};

const STATUS_CONFIG: Record<CheckStatus, { label: string; Icon: React.FC<{ size?: number; className?: string }>; activeCls: string; ringCls: string }> = {
  pass: { label: "Pass",    Icon: CheckCircle2,   activeCls: "bg-green-500/15 text-green-300 border-green-600",  ringCls: "text-green-400" },
  fail: { label: "Fail",    Icon: XCircle,        activeCls: "bg-red-500/15 text-red-300 border-red-600",        ringCls: "text-red-400" },
  warn: { label: "Warn",    Icon: AlertTriangle,  activeCls: "bg-amber-500/15 text-amber-300 border-amber-600",  ringCls: "text-amber-400" },
  na:   { label: "N/A",     Icon: Minus,          activeCls: "bg-white/5 text-white/50 border-white/20",         ringCls: "text-white/40" },
  pending: { label: "Pending", Icon: Clock,        activeCls: "bg-white/5 text-white/30 border-white/10",        ringCls: "text-white/30" },
};

const SEV_DOT: Record<CheckSeverity, string> = {
  critical: "bg-red-500",
  high:     "bg-orange-500",
  medium:   "bg-amber-400",
  low:      "bg-green-500",
};

// ─── Audit Session Types ───────────────────────────────────────────────────────

interface AuditSession {
  id: string;
  name: string;
  customerName: string;
  maximoVersion: string;
  createdAt: string;
  state: CheckState;
}

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreRing({ score, size = 64 }: { score: number; size?: number }) {
  const r = (size / 2) - 6;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : score > 0 ? "#f97316" : "#6b7280";
  const label = score >= 80 ? "Ready" : score >= 50 ? "Progressing" : score > 0 ? "Needs Work" : "Not Started";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle
          cx={size/2} cy={size/2} r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.4s ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-lg font-bold text-white leading-none">{score}</div>
        <div className="text-[9px] text-white/40 leading-none mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function StatusBtn({
  current, status, onChange,
}: { current: CheckStatus; status: CheckStatus; onChange: (s: CheckStatus) => void }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.Icon;
  const isActive = current === status;
  return (
    <button
      onClick={() => onChange(isActive ? "pending" : status)}
      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border transition-all duration-150 cursor-pointer ${
        isActive ? cfg.activeCls : "border-white/10 text-white/30 hover:border-white/25 hover:text-white/60"
      }`}
      title={cfg.label}
    >
      <Icon size={10} />
      {cfg.label}
    </button>
  );
}

function CheckRow({
  item, sectionKey, checkState, onUpdate,
}: {
  item: CheckItem;
  sectionKey: string;
  checkState: CheckState;
  onUpdate: (sectionKey: string, itemKey: string, status: CheckStatus, notes: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const key = getCheckKey(sectionKey, item.key);
  const cs = checkState[key] ?? { status: "pending" as CheckStatus, notes: "" };

  return (
    <div className="border-b border-white/5 last:border-0">
      {/* Main row */}
      <div className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-0.5 text-white/30 hover:text-white/70 flex-shrink-0 transition-colors"
        >
          {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </button>

        {/* Severity dot */}
        <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${SEV_DOT[item.severity]}`} title={`${item.severity} severity`} />

        {/* Label */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <span className="text-sm text-white/85 leading-snug">{item.label}</span>
            <span className="text-[10px] text-white/30 capitalize mt-0.5">({item.severity})</span>
            {item.autoCheck === "sql" && (
              <span className="flex items-center gap-0.5 text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded">
                <Code2 size={8} /> SQL hint
              </span>
            )}
          </div>
        </div>

        {/* Status buttons */}
        <div className="flex items-center gap-1 flex-shrink-0 flex-wrap">
          {(["pass", "warn", "fail", "na"] as CheckStatus[]).map(s => (
            <StatusBtn
              key={s}
              current={cs.status}
              status={s}
              onChange={(newStatus) => onUpdate(sectionKey, item.key, newStatus, cs.notes)}
            />
          ))}
        </div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-10 pb-4 space-y-3">
              <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>

              {item.sqlHint && (
                <div>
                  <p className="text-xs font-medium text-blue-400 flex items-center gap-1.5 mb-1.5">
                    <Code2 size={10} /> SQL diagnostic hint — run in your Maximo environment (read-only)
                  </p>
                  <pre className="text-[11px] font-mono bg-white/5 border border-white/10 rounded px-3 py-2 text-blue-200/70 overflow-x-auto whitespace-pre-wrap break-all">
                    {item.sqlHint}
                  </pre>
                </div>
              )}

              {item.remediation && (
                <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 px-3 py-2.5">
                  <p className="text-xs font-medium text-amber-400 flex items-center gap-1.5 mb-1">
                    <Wrench size={10} /> Remediation guidance
                  </p>
                  <p className="text-xs text-amber-200/60 leading-relaxed">{item.remediation}</p>
                </div>
              )}

              {item.masRef && (
                <p className="text-xs text-white/25 italic">Ref: {item.masRef}</p>
              )}

              {/* Notes */}
              <div>
                <p className="text-xs font-medium text-white/50 mb-1.5">Assessor notes</p>
                <textarea
                  value={cs.notes}
                  onChange={e => onUpdate(sectionKey, item.key, cs.status, e.target.value)}
                  placeholder="Add findings, evidence, or action items..."
                  rows={2}
                  className="w-full text-xs rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/70 placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionCard({
  section, checkState, onUpdate,
}: {
  section: CheckSection;
  checkState: CheckState;
  onUpdate: (sectionKey: string, itemKey: string, status: CheckStatus, notes: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const Icon = SECTION_ICONS[section.key] ?? BarChart3;
  const sp = getSectionScore(section, checkState);

  const barColor = sp.pct >= 80 ? "bg-green-500" : sp.pct >= 50 ? "bg-amber-500" : sp.pct > 0 ? "bg-red-500" : "bg-white/10";

  return (
    <div className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur overflow-hidden" id={`section-${section.key}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white mb-1.5">{section.title}</h3>
          <div className="flex items-center gap-3">
            <div className="h-1 flex-1 max-w-32 rounded-full bg-white/10 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${sp.pct}%` }} />
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              {sp.pass > 0  && <span className="text-green-400">{sp.pass}✓</span>}
              {sp.fail > 0  && <span className="text-red-400">{sp.fail}✗</span>}
              {sp.warn > 0  && <span className="text-amber-400">{sp.warn}!</span>}
              {sp.na > 0    && <span className="text-white/30">{sp.na} N/A</span>}
              <span className="text-white/25">{sp.pending} pending</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-bold text-primary">{sp.pct}%</span>
          {open ? <ChevronDown size={14} className="text-white/30" /> : <ChevronRight size={14} className="text-white/30" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-2 text-xs text-white/40">{section.description}</div>
            <div className="border-t border-white/5">
              {section.items.map(item => (
                <CheckRow
                  key={item.key}
                  item={item}
                  sectionKey={section.key}
                  checkState={checkState}
                  onUpdate={onUpdate}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── New Audit Modal ──────────────────────────────────────────────────────────

function NewAuditModal({ onClose, onCreate }: {
  onClose: () => void;
  onCreate: (name: string, customer: string, version: string) => void;
}) {
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState("");
  const [version, setVersion] = useState("7.6.1.3");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !customer.trim()) return;
    onCreate(name.trim(), customer.trim(), version);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-white mb-1">New Environment Audit</h2>
        <p className="text-sm text-muted-foreground mb-5">Start a new MASReady audit session for a Maximo 7.6.x environment.</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-white/60 block mb-1.5">Audit Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Q3 2026 – MAS 9 Pre-Migration Assessment"
              className="w-full text-sm rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-white/60 block mb-1.5">Customer / Project</label>
            <input
              value={customer}
              onChange={e => setCustomer(e.target.value)}
              placeholder="e.g. Infrastructure Operator Co."
              className="w-full text-sm rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-white/60 block mb-1.5">Current Maximo Version</label>
            <select
              value={version}
              onChange={e => setVersion(e.target.value)}
              className="w-full text-sm rounded-lg border border-white/10 bg-card px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-primary/50"
            >
              <option value="7.6.1.3">7.6.1.3</option>
              <option value="7.6.1.2">7.6.1.2</option>
              <option value="7.6.1.1">7.6.1.1 (interim step needed)</option>
              <option value="7.6.1.0">7.6.1.0 (interim step needed)</option>
              <option value="7.6.0.x">7.6.0.x (interim step needed)</option>
            </select>
          </div>

          <div className="rounded-lg bg-primary/10 border border-primary/20 px-3 py-2.5">
            <p className="text-xs text-primary font-medium mb-0.5">Review-only</p>
            <p className="text-xs text-white/40">No SQL execution, no Maximo mutations. SQL hints are for manual use in your environment.</p>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Create Audit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AuditChecklist() {
  const [sessions, setSessions] = useState<AuditSession[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [view, setView] = useState<"dashboard" | "audit">("dashboard");

  const activeSession = sessions.find(s => s.id === activeId) ?? null;

  const createSession = useCallback((name: string, customerName: string, maximoVersion: string) => {
    const session: AuditSession = {
      id: makeId(),
      name,
      customerName,
      maximoVersion,
      createdAt: new Date().toISOString(),
      state: {},
    };
    setSessions(prev => [...prev, session]);
    setActiveId(session.id);
    setView("audit");
  }, []);

  const updateCheck = useCallback((sessionId: string, sectionKey: string, itemKey: string, status: CheckStatus, notes: string) => {
    setSessions(prev => prev.map(s =>
      s.id !== sessionId ? s : {
        ...s,
        state: {
          ...s.state,
          [getCheckKey(sectionKey, itemKey)]: { status, notes },
        },
      }
    ));
  }, []);

  const deleteSession = useCallback((id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeId === id) { setActiveId(null); setView("dashboard"); }
  }, [activeId]);

  const handleExport = (session: AuditSession) => {
    const md = exportMarkdown(session.name, session.customerName, session.maximoVersion, session.state);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `masready-audit-${session.customerName.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Dashboard view ──
  if (view === "dashboard") {
    return (
      <div className="min-h-screen">
        <DemoBanner variant="planning" />
        <div className="container mx-auto px-4 py-16">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-5">
              <ClipboardCheck className="w-3 h-3" /> MAS 9 · Environment Audit
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 text-white">
              MASReady<br /><span className="text-accent">Environment Audit</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {TOTAL_CHECKS} structured checks across {AUDIT_SECTIONS.length} domains. Assess your Maximo 7.6.x environment's
              readiness for MAS Manage 9 — fully owned and operated by MASReady.
            </p>
            <button
              onClick={() => setShowNewModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" /> New Audit Session
            </button>
          </motion.div>

          {/* Domain pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 max-w-5xl mx-auto mb-12">
            {AUDIT_SECTIONS.map((s, i) => {
              const Icon = SECTION_ICONS[s.key] ?? BarChart3;
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-white/10 bg-card/50 p-3 text-center"
                >
                  <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                  <div className="text-xl font-bold text-white">{s.items.length}</div>
                  <div className="text-[10px] text-white/40 leading-tight">{s.title.split(" ")[0]}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Existing sessions */}
          {sessions.length > 0 && (
            <div className="max-w-4xl mx-auto mb-10">
              <h2 className="text-base font-semibold text-white mb-4">{sessions.length} Audit Session{sessions.length !== 1 ? "s" : ""}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {sessions.map(s => {
                  const score = getOverallScore(s.state);
                  const pct = Math.round(((TOTAL_CHECKS - score.pending) / TOTAL_CHECKS) * 100);
                  return (
                    <div
                      key={s.id}
                      onClick={() => { setActiveId(s.id); setView("audit"); }}
                      className="rounded-2xl border border-white/10 bg-card/50 p-4 cursor-pointer hover:border-primary/40 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <ScoreRing score={score.score} size={52} />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white truncate">{s.name}</h3>
                          <p className="text-xs text-white/40 mb-2">{s.customerName} · Maximo {s.maximoVersion}</p>
                          <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
                          </div>
                          <div className="flex gap-3 mt-1.5 text-[10px]">
                            {score.fail > 0 && <span className="text-red-400">{score.fail} fail</span>}
                            {score.warn > 0 && <span className="text-amber-400">{score.warn} warn</span>}
                            {score.pass > 0 && <span className="text-green-400">{score.pass} pass</span>}
                            <span className="text-white/25">{pct}% complete</span>
                          </div>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); deleteSession(s.id); }}
                          className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {sessions.length === 0 && (
            <div className="max-w-md mx-auto text-center py-10 text-white/30 border border-dashed border-white/10 rounded-2xl">
              <ClipboardCheck className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm text-white/40 mb-1">No audit sessions yet</p>
              <p className="text-xs text-white/25">Create one above to begin your pre-migration assessment.</p>
            </div>
          )}

          {/* Feature callouts */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">How it works</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Code2,         title: "SQL Diagnostic Hints", desc: "Every applicable check includes a read-only SQL query to run in your Maximo environment for evidence collection. Assessor-controlled, never executed by MASReady." },
                { icon: ClipboardCheck, title: "Pass / Warn / Fail / N/A", desc: "Mark each check against your environment findings. Notes fields capture assessor evidence. Readiness score updates in real time as you progress." },
                { icon: Download,       title: "Export as Markdown Report", desc: "One-click export of the full audit as a structured Markdown report, ready for stakeholder review, change management, or project governance gates." },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-6"
                >
                  <f.icon className="w-7 h-7 text-primary mb-4" />
                  <h3 className="font-bold text-white mb-2 text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="max-w-2xl mx-auto mt-10 rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-center">
            <p className="text-xs text-destructive-foreground/70">
              Audit checks are review-only. No SQL execution, no Maximo mutations are performed by this tool.
              Licence planning outputs are for internal planning visibility only and do not constitute IBM-certified,
              contractual, or legal compliance advice.
            </p>
          </div>
        </div>

        {showNewModal && <NewAuditModal onClose={() => setShowNewModal(false)} onCreate={createSession} />}
      </div>
    );
  }

  // ── Audit detail view ──
  if (!activeSession) { setView("dashboard"); return null; }

  const overallScore = getOverallScore(activeSession.state);
  const criticalFails = AUDIT_SECTIONS.flatMap(s =>
    s.items
      .filter(item => item.severity === "critical" && activeSession.state[getCheckKey(s.key, item.key)]?.status === "fail")
      .map(item => ({ section: s.title, item }))
  );

  return (
    <div className="min-h-screen">
      <DemoBanner variant="planning" />
      <div className="container mx-auto px-4 py-10">

        {/* Back + header */}
        <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
          <div>
            <button
              onClick={() => setView("dashboard")}
              className="text-xs text-white/40 hover:text-white flex items-center gap-1.5 mb-3 transition-colors"
            >
              <ChevronRight size={12} className="rotate-180" /> All audits
            </button>
            <h1 className="text-2xl font-bold text-white mb-1">{activeSession.name}</h1>
            <p className="text-sm text-muted-foreground">{activeSession.customerName} · Maximo {activeSession.maximoVersion}</p>
          </div>
          <button
            onClick={() => handleExport(activeSession)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm text-white/70 hover:border-white/30 hover:text-white transition-colors"
          >
            <Download size={14} /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Score */}
            <div className="rounded-2xl border border-white/10 bg-card/50 p-5 text-center">
              <p className="text-xs text-white/40 mb-3">Readiness Score</p>
              <ScoreRing score={overallScore.score} size={96} />
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-2.5">
                  <div className="text-xl font-bold text-green-400">{overallScore.pass}</div>
                  <div className="text-green-700">Pass</div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-2.5">
                  <div className="text-xl font-bold text-red-400">{overallScore.fail}</div>
                  <div className="text-red-700">Fail</div>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5">
                  <div className="text-xl font-bold text-amber-400">{overallScore.warn}</div>
                  <div className="text-amber-700">Warn</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-xl font-bold text-white/40">{overallScore.pending}</div>
                  <div className="text-white/25">Pending</div>
                </div>
              </div>
            </div>

            {/* Section nav */}
            <div className="rounded-2xl border border-white/10 bg-card/50 p-3">
              <p className="text-xs text-white/30 px-1 mb-2">Jump to section</p>
              {AUDIT_SECTIONS.map(s => {
                const Icon = SECTION_ICONS[s.key] ?? BarChart3;
                const sp = getSectionScore(s, activeSession.state);
                return (
                  <button
                    key={s.key}
                    onClick={() => document.getElementById(`section-${s.key}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                  >
                    <Icon className="w-3 h-3 text-white/30 flex-shrink-0" />
                    <span className="text-xs text-white/40 flex-1 leading-tight truncate">{s.title.split(" ")[0]}</span>
                    <span className={`text-xs font-medium flex-shrink-0 ${sp.pct >= 80 ? "text-green-400" : sp.pct >= 50 ? "text-amber-400" : sp.pct > 0 ? "text-orange-400" : "text-white/20"}`}>
                      {sp.pct}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3">
              <p className="text-xs text-amber-400 font-medium mb-1">Review-only</p>
              <p className="text-xs text-white/30 leading-relaxed">
                No SQL execution or Maximo mutations. SQL hints are for manual review. Licence planning data is for visibility only.
              </p>
            </div>
          </div>

          {/* Main checklist */}
          <div className="lg:col-span-3 space-y-4">
            {/* Critical fails banner */}
            {criticalFails.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-red-500/40 bg-red-500/10 px-5 py-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={14} className="text-red-400" />
                  <p className="text-xs font-semibold text-red-400">
                    {criticalFails.length} critical check{criticalFails.length !== 1 ? "s" : ""} failed — upgrade activation not recommended
                  </p>
                </div>
                <ul className="space-y-0.5">
                  {criticalFails.map((f, i) => (
                    <li key={i} className="text-xs text-red-300/60">{f.section}: {f.item.label}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {AUDIT_SECTIONS.map(section => (
              <SectionCard
                key={section.key}
                section={section}
                checkState={activeSession.state}
                onUpdate={(sk, ik, status, notes) => updateCheck(activeSession.id, sk, ik, status, notes)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
