import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "wouter";
import {
  Clock, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp,
  Lock, RotateCcw, Zap, Activity, Fingerprint, Code2, Brain,
  ShieldCheck, FileText, Download, ExternalLink, RefreshCw
} from "lucide-react";
import {
  validatePreviewSession, getRemainingTime, clearPreviewSession,
  type PreviewSession, type RemainingTime
} from "@/lib/previewSession";
import { writeAuditEvent, getAuditEvents, exportAuditEvents, type AuditEvent } from "@/lib/previewAudit";
import { getIndustry, getSyntheticSnapshot } from "@/lib/industryData";
import { cn } from "@/lib/utils";

type SessionState = "valid" | "expired" | "invalid";

function CountdownBadge({ remaining, isWarning }: { remaining: RemainingTime; isWarning: boolean }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border transition-colors",
      isWarning
        ? "border-red-400/40 bg-red-400/10 text-red-400"
        : "border-accent/30 bg-accent/10 text-accent"
    )}>
      <Clock className="w-3 h-3" />
      {remaining.formatted}
    </span>
  );
}

function SessionBanner({ session, remaining, onPersistedDemo }: {
  session: PreviewSession;
  remaining: RemainingTime;
  onPersistedDemo: () => void;
}) {
  const industry = getIndustry(session.industry);
  const isWarning = remaining.ms < 15 * 60 * 1000;
  return (
    <div className={cn(
      "sticky top-16 z-40 w-full border-b backdrop-blur-md transition-colors",
      isWarning ? "border-red-400/20 bg-background/95" : "border-primary/15 bg-background/90"
    )}>
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            2-hour synthetic preview
          </span>
          {industry && (
            <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full border", industry.border, industry.color, "bg-card")}>
              {industry.title}
            </span>
          )}
          <span className="text-xs text-muted-foreground font-mono">
            #{session.id.slice(0, 8)}
          </span>
          <CountdownBadge remaining={remaining} isWarning={isWarning} />
          {isWarning && (
            <span className="text-xs text-red-400 animate-pulse font-medium">Expiring soon</span>
          )}
        </div>
        <button
          onClick={onPersistedDemo}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <Lock className="w-3 h-3" /> Request Persisted Demo
        </button>
      </div>
    </div>
  );
}

function Section({
  id, title, icon: Icon, color, sessionId, children
}: {
  id: string; title: string; icon: React.ElementType; color: string; sessionId: string; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) {
      writeAuditEvent("preview_section_opened", sessionId, { section: id, route: "/preview-session/" + sessionId });
    }
  }
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted transition-colors text-left"
      >
        <div className={cn("p-2 rounded-lg bg-muted border border-border")}>
          <Icon className={cn("w-4 h-4", color)} />
        </div>
        <span className="font-semibold text-sm flex-1">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-border">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    OPERATING: "text-emerald-700 bg-emerald-50 border-emerald-200",
    ACTIVE: "text-emerald-700 bg-emerald-50 border-emerald-200",
    INPRG: "text-blue-700 bg-blue-50 border-blue-200",
    WAPPR: "text-amber-700 bg-amber-50 border-amber-200",
    COMP: "text-slate-500 bg-slate-100 border-slate-200",
  };
  return (
    <span className={cn("text-xs font-bold px-2 py-0.5 rounded border", map[status] ?? "text-slate-500 bg-slate-100 border-slate-200")}>
      {status}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: "high" | "medium" | "low" }) {
  return (
    <span className={cn("text-xs font-bold px-2 py-0.5 rounded border", {
      "text-red-700 bg-red-50 border-red-200": severity === "high",
      "text-amber-700 bg-amber-50 border-amber-200": severity === "medium",
      "text-slate-500 bg-slate-100 border-slate-200": severity === "low",
    })}>
      {severity.toUpperCase()}
    </span>
  );
}

function AuditPanel({ sessionId, session }: { sessionId: string; session: PreviewSession }) {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<AuditEvent[]>([]);
  useEffect(() => {
    if (open) setEvents(getAuditEvents(sessionId));
  }, [open, sessionId]);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted transition-colors text-left"
      >
        <ShieldCheck className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground flex-1">Session details & audit trail</span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-2 border-t border-border space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: "Session ID", value: sessionId.slice(0, 16) + "…" },
              { label: "Industry", value: getIndustry(session.industry)?.title ?? session.industry },
              { label: "Created", value: new Date(session.createdAt).toLocaleString() },
              { label: "Expires", value: new Date(session.expiresAt).toLocaleString() },
              { label: "Source", value: session.source },
              { label: "Events recorded", value: String(events.length) },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg bg-muted border border-border px-3 py-2">
                <div className="text-muted-foreground mb-0.5">{label}</div>
                <div className="font-mono text-foreground">{value}</div>
              </div>
            ))}
          </div>
          {events.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recent events</div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {[...events].reverse().slice(0, 10).map((e) => (
                  <div key={e.eventId} className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground font-mono">{new Date(e.timestamp).toLocaleTimeString()}</span>
                    <span className="text-foreground/80">{e.eventType.replace(/_/g, " ")}</span>
                    {e.section && <span className="text-primary">— {e.section}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => exportAuditEvents(sessionId)}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Download className="w-3 h-3" /> Export Session Audit
            </button>
            <p className="text-xs text-muted-foreground self-center">
              Audit export contains only non-sensitive event metadata.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ValidPreview({ session, sessionId, remaining, onPersistedDemo }: {
  session: PreviewSession; sessionId: string; remaining: RemainingTime; onPersistedDemo: () => void;
}) {
  const industry = getIndustry(session.industry);
  const snap = getSyntheticSnapshot(session.industry);
  const overlay = session.overlay;
  const displayVersion = overlay.currentMaximoVersion || snap.currentVersion;
  const targetVersion = overlay.targetMasVersion || snap.targetVersion;

  return (
    <div>
      <SessionBanner session={session} remaining={remaining} onPersistedDemo={onPersistedDemo} />

      <div className="container mx-auto px-4 py-10 max-w-4xl space-y-5">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            {industry && <span className={cn("text-sm font-bold px-3 py-1 rounded-full border", industry.border, industry.color, "bg-card")}>{industry.title}</span>}
            <span className="text-xs text-muted-foreground">Synthetic industry baseline</span>
            <span className="text-xs px-2 py-0.5 rounded border border-amber-400/25 bg-amber-400/10 text-amber-400 font-semibold">SYNTHETIC DATA</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {overlay.companyLabel || (industry?.title ?? session.industry)} — MASReady Preview
          </h1>
          <p className="text-muted-foreground text-sm">
            {displayVersion} → {targetVersion} · {snap.assetCount.toLocaleString()} assets · {snap.activeUsers} users
          </p>
        </div>

        {/* Stats grid */}
        <Section id="environment-snapshot" title="Environment Snapshot" icon={Activity} color="text-accent" sessionId={sessionId}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            {[
              { label: "Total Assets", value: snap.assetCount.toLocaleString() },
              { label: "Locations", value: snap.locationCount },
              { label: "Open Work Orders", value: snap.openWOs },
              { label: "Critical Priority", value: snap.criticalWOs, hi: true },
              { label: "Active Users", value: snap.activeUsers },
              { label: "Custom Objects", value: snap.customObjects },
              { label: "Automation Scripts", value: snap.automationScripts },
              { label: "Integrations", value: snap.integrationCount },
            ].map(({ label, value, hi }) => (
              <div key={label} className="rounded-xl border border-border bg-muted/40 p-3 text-center">
                <div className={cn("text-2xl font-bold mb-0.5", hi ? "text-red-600" : "text-foreground")}>{value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-primary/20 bg-accent px-4 py-3">
              <div className="text-xs text-muted-foreground mb-1">Current environment</div>
              <div className="font-mono text-sm text-foreground font-semibold">{displayVersion}</div>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3">
              <div className="text-xs text-muted-foreground mb-1">Target version</div>
              <div className="font-mono text-sm text-primary font-semibold">{targetVersion}</div>
            </div>
          </div>
          {overlay.mainConcern && (
            <div className="mt-3 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-3 text-sm">
              <span className="text-amber-700 font-semibold">Main concern: </span>
              <span className="text-muted-foreground">{overlay.mainConcern}</span>
            </div>
          )}
        </Section>

        {/* Assets and Locations */}
        <Section id="assets-locations" title="Assets and Locations" icon={FileText} color="text-blue-600" sessionId={sessionId}>
          <div className="mt-2 rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Asset ID", "Description", "Type", "Status", "Priority"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {snap.sampleAssets.map((a) => (
                  <tr key={a.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-3 py-2 font-mono text-xs text-accent">{a.id}</td>
                    <td className="px-3 py-2 text-xs text-foreground">{a.description}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{a.type}</td>
                    <td className="px-3 py-2"><StatusBadge status={a.status} /></td>
                    <td className="px-3 py-2 text-center text-xs font-bold text-foreground">{a.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Showing {snap.sampleAssets.length} of {snap.assetCount.toLocaleString()} synthetic assets. All records are fictional — no real asset data.
          </p>
        </Section>

        {/* Work Management */}
        <Section id="work-management" title="Work Management Preview" icon={CheckCircle2} color="text-emerald-600" sessionId={sessionId}>
          <div className="mt-2 rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["WO Number", "Description", "Type", "Status", "Priority"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {snap.sampleWOs.map((wo) => (
                  <tr key={wo.woNum} className="hover:bg-muted/50 transition-colors">
                    <td className="px-3 py-2 font-mono text-xs text-accent">{wo.woNum}</td>
                    <td className="px-3 py-2 text-xs text-foreground">{wo.description}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">{wo.type}</td>
                    <td className="px-3 py-2"><StatusBadge status={wo.status} /></td>
                    <td className="px-3 py-2 text-center text-xs font-bold text-foreground">{wo.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Showing {snap.sampleWOs.length} of {snap.openWOs} open synthetic work orders.
          </p>
        </Section>

        {/* Environment Fingerprint */}
        <Section id="fingerprint" title="Environment Fingerprint" icon={Fingerprint} color="text-accent" sessionId={sessionId}>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label: "Custom Objects", value: snap.customObjects },
              { label: "Automation Scripts", value: snap.automationScripts },
              { label: "Active Integrations", value: snap.integrationCount },
              { label: "Cron Tasks (est.)", value: Math.floor(snap.customObjects * 0.4) },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-accent/20 bg-accent/5 p-3 text-center">
                <div className="text-2xl font-bold text-accent mb-0.5">{value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
          {industry && (
            <div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Detected integrations</div>
              <div className="flex flex-wrap gap-2">
                {industry.integrations.map((int) => (
                  <span key={int} className="text-xs px-2.5 py-1 rounded-full border border-accent/20 bg-accent/8 text-accent">{int}</span>
                ))}
                {overlay.integrationTypes && (
                  <span className="text-xs px-2.5 py-1 rounded-full border border-primary/20 bg-primary/8 text-primary">{overlay.integrationTypes}</span>
                )}
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-3">
            Fingerprint is read-only and synthetic. No Maximo mutations occur during preview. Real environment fingerprinting is available in secure connected assessment mode.
          </p>
        </Section>

        {/* Drift Intelligence */}
        <Section id="drift" title="Drift Intelligence" icon={Activity} color="text-orange-600" sessionId={sessionId}>
          <div className="mt-2 space-y-2.5">
            {snap.driftItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5">
                <SeverityBadge severity={item.severity} />
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-orange-400/20 bg-orange-400/5 px-4 py-3 text-xs text-muted-foreground">
            <span className="text-orange-700 font-semibold">{snap.driftFindings} drift findings </span>
            detected in this synthetic baseline. Real drift analysis requires environment fingerprint data from your Maximo instance.
          </div>
        </Section>

        {/* Regression Intelligence */}
        <Section id="regression" title="Regression Intelligence" icon={Code2} color="text-violet-600" sessionId={sessionId}>
          <div className="mt-2 grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Scenarios in pack", value: snap.regressionScenarios },
              { label: "Coverage %", value: snap.regressionCoverage + "%" },
              { label: "Drift-triggered", value: snap.driftFindings },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-violet-400/20 bg-violet-400/5 p-3 text-center">
                <div className="text-2xl font-bold text-violet-700 mb-0.5">{value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {(industry?.workTypes ?? []).map((wt) => (
              <div key={wt} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                <span className="text-muted-foreground">{wt} workflow coverage</span>
                <span className="ml-auto text-xs text-violet-700 font-mono">{Math.floor(60 + Math.random() * 35)}%</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Regression pack is generated from environment fingerprint. Real pack requires your Maximo configuration. Exported as standard TypeScript Playwright files.
          </p>
        </Section>

        {/* AI Skill Pack */}
        <Section id="skillpack" title="AI Skill Pack Preview" icon={Brain} color="text-primary" sessionId={sessionId}>
          <div className="mt-2 space-y-4">
            {snap.skillPackQuestions.map((qa, i) => (
              <div key={i} className="rounded-xl border border-primary/15 bg-primary/5 overflow-hidden">
                <div className="px-4 py-3 border-b border-primary/10">
                  <p className="text-sm font-semibold text-foreground">{qa.q}</p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{qa.a}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Skill pack answers are from the synthetic baseline. Real skill pack coverage adapts to your environment fingerprint, Maximo version, add-ons, and configuration.
          </p>
        </Section>

        {/* Recommendations */}
        <Section id="recommendations" title="Recommendations" icon={ShieldCheck} color="text-emerald-600" sessionId={sessionId}>
          <div className="mt-2 space-y-2.5">
            {snap.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full border border-green-400/30 bg-green-400/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-emerald-700">{i + 1}</span>
                </div>
                <p className="text-muted-foreground leading-snug">{rec}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 border-t border-border pt-3">
            Recommendations are generated from the synthetic baseline. A real MASReady assessment produces recommendations from your actual environment fingerprint, drift findings, and AI skill pack gap analysis.
          </p>
        </Section>

        {/* Audit panel */}
        <AuditPanel sessionId={sessionId} session={session} />

        {/* Persisted Demo CTA */}
        <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Ready for a persisted private demo?</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            Public synthetic previews use fixed baseline data and expire after 2 hours. Persisted private demos are saved, privately hosted, and can include secure customer-specific synthetic data and architecture discussions.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/launch?mode=persisted#demo-form"
              onClick={() => writeAuditEvent("persisted_demo_clicked", sessionId, { section: "bottom-cta", route: "/preview-session/" + sessionId })}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
            >
              <Lock className="w-4 h-4" /> Request Persisted Demo
            </Link>
            <Link
              href="/preview-studio"
              onClick={() => writeAuditEvent("preview_new_session_requested", sessionId, { section: "bottom-cta" })}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all hover:-translate-y-0.5"
            >
              <RefreshCw className="w-4 h-4" /> Start New Preview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpiredScreen({ sessionId, session }: { sessionId: string; session: PreviewSession | null }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-orange-400/30 bg-orange-400/10 mb-6">
          <Clock className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-2xl font-bold mb-3">This MASReady synthetic preview link has expired.</h1>
        <p className="text-muted-foreground leading-relaxed mb-2">
          Public synthetic previews are intentionally time-limited so MASReady can keep public demo access controlled and auditable.
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Public previews are valid for 2 hours. Start a new preview session or request a persisted private demo.
        </p>
        {session && (
          <p className="text-xs text-muted-foreground font-mono mb-6">
            Session #{sessionId.slice(0, 8)} · Expired {new Date(session.expiresAt).toLocaleString()}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/preview-studio" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5">
            <Zap className="w-4 h-4" /> Start New Preview
          </Link>
          <Link href="/launch?mode=persisted#demo-form" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all hover:-translate-y-0.5">
            <Lock className="w-4 h-4" /> Request Persisted Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

function InvalidScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-red-400/30 bg-red-400/10 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Preview session not found</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          This preview link is invalid, has expired, or was created in a different browser session. MASReady preview sessions are browser-scoped for your privacy.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/preview-studio" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5">
            <Zap className="w-4 h-4" /> Start Preview Studio
          </Link>
          <Link href="/launch?mode=persisted#demo-form" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all hover:-translate-y-0.5">
            <Lock className="w-4 h-4" /> Request Persisted Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PreviewSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [sessionState, setSessionState] = useState<SessionState>("valid");
  const [session, setSession] = useState<PreviewSession | null>(null);
  const [remaining, setRemaining] = useState<RemainingTime>({ ms: 0, hours: 0, minutes: 0, seconds: 0, formatted: "0h 00m 00s" });

  useEffect(() => {
    if (!sessionId) { setSessionState("invalid"); return; }
    const { valid, session: s, reason } = validatePreviewSession(sessionId);
    if (reason === "not_found") {
      writeAuditEvent("preview_session_invalid", sessionId || "unknown", { route: "/preview-session/" + sessionId });
      setSessionState("invalid");
      return;
    }
    if (reason === "expired" && s) {
      writeAuditEvent("preview_session_expired", sessionId, { industry: s.industry });
      setSession(s);
      setSessionState("expired");
      return;
    }
    if (valid && s) {
      writeAuditEvent("preview_session_opened", sessionId, { industry: s.industry, route: "/preview-session/" + sessionId });
      setSession(s);
      setRemaining(getRemainingTime(s));
      setSessionState("valid");
    }
  }, [sessionId]);

  useEffect(() => {
    if (sessionState !== "valid" || !session) return;
    const interval = setInterval(() => {
      const r = getRemainingTime(session);
      setRemaining(r);
      if (r.ms === 0) {
        writeAuditEvent("preview_session_expired", session.id, { industry: session.industry });
        setSessionState("expired");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionState, session]);

  function handlePersistedDemo() {
    if (sessionId) writeAuditEvent("persisted_demo_clicked", sessionId, { section: "session-banner" });
    window.location.href = "/launch?mode=persisted#demo-form";
  }

  if (sessionState === "invalid") return <InvalidScreen />;
  if (sessionState === "expired") return <ExpiredScreen sessionId={sessionId || ""} session={session} />;
  if (!session) return null;

  return <ValidPreview session={session} sessionId={sessionId!} remaining={remaining} onPersistedDemo={handlePersistedDemo} />;
}
