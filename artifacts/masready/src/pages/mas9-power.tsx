import { Link } from "wouter";
import { ArrowRight, Shield, Database, LayoutGrid, CheckCircle2, XCircle, AlertTriangle, Server, Users, MapPin, Zap, Lock, ExternalLink, FileText, Activity } from "lucide-react";
import { DemoBanner } from "@/components/DemoBanner";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

const PATCH_IMPACTS = [
  { id: "IMP-001", severity: "HIGH",   title: "WO Start Validation Script — API signature change", description: "The WOSTART_ENERGY_ISOLATION script uses the MboRemote.getString() method which has a deprecated signature in 9.1.0. The script must be updated before patch application.", effort: "4h" },
  { id: "IMP-002", severity: "HIGH",   title: "GIS Sync Script — REST client library replaced", description: "The ASSET_GIS_SYNC script uses the internal Maximo HTTP client class which is replaced in 9.1.0 with a new external library. Script must be rewritten.", effort: "8h" },
  { id: "IMP-003", severity: "MEDIUM", title: "MAXIMO-GIS OSLC Integration — endpoint path change", description: "The GIS OSLC integration endpoint path changes in 9.1.0. Integration configuration must be updated.", effort: "1h" },
  { id: "IMP-004", severity: "MEDIUM", title: "SCADA→Maximo Alarm Feed — message format update", description: "The SCADA alarm work request feed uses a message format that is revised in 9.1.0. Queue configuration update required.", effort: "3h" },
  { id: "IMP-005", severity: "MEDIUM", title: "AMI Head-end Meter Import — batch size limit change", description: "The meter reading import integration has a reduced batch size limit in 9.1.0. Current batch of 5000 must be reduced to 2000.", effort: "0.5h" },
  { id: "IMP-006", severity: "LOW",    title: "Energy Safety Checklist Screen — tab order reset", description: "Screen customisations on the WO Start tab may have their tab order reset during the 9.1.0 upgrade. Post-upgrade visual review required.", effort: "1h" },
  { id: "IMP-007", severity: "LOW",    title: "SCADA WO Generate Cron — scheduler class update", description: "The cron task uses a scheduler class that is renamed in 9.1.0. Cron task registration must be refreshed.", effort: "0.5h" },
];

const CUSTOMISATION_TYPES = [
  { type: "BO Extension",       count: 11, risk_high: 1,  desc: "Custom fields on WORKORDER, ASSET, LOCATIONS, CREW, INVOICE, WOACTIVITY" },
  { type: "Automation Script",  count: 10, risk_high: 4,  desc: "WOSTART validation, GIS sync, PM overrides, anomaly detection, crew auto-populate" },
  { type: "Screen Change",      count:  8, risk_high: 2,  desc: "Energy Safety Checklist, GIS map embed, compliance tabs, crew qualification banner" },
  { type: "Workflow",           count:  4, risk_high: 1,  desc: "HV isolation approval, asset decommission, transformer oil test, emergency procurement" },
  { type: "Integration",        count:  4, risk_high: 3,  desc: "MAXIMO-GIS, MAXIMO-SCADA, MAXIMO-BILLING, AMI head-end meter import" },
  { type: "Cron Task",          count:  4, risk_high: 2,  desc: "PM overdue escalation, SCADA WO generation, smart meter sync, critical asset escalation" },
  { type: "Security Group",     count:  3, risk_high: 0,  desc: "Energy audit sig options, restricted mobile start center, delivery lead reporting" },
  { type: "Report",             count:  5, risk_high: 0,  desc: "Energy Isolation Certificate, compliance summary, overdue PM dashboard, AppPoint extract" },
];

const SITES = [
  { id: "SITE_HQ",     name: "Headquarters — Control Centre",      region: "CBD",   assets: 12,  wos: 3  },
  { id: "SITE_NORTH",  name: "Northern Grid Substation Complex",    region: "North", assets: 78,  wos: 14 },
  { id: "SITE_WEST",   name: "Western Transmission Corridor",       region: "West",  assets: 112, wos: 22 },
  { id: "SITE_SOUTH",  name: "Southern Distribution Network",       region: "South", assets: 94,  wos: 18 },
  { id: "SITE_DEPOT",  name: "Central Depot & Warehouse",           region: "CBD",   assets: 45,  wos: 6  },
];

const ROLES = [
  {
    name: "Alex Chen", role: "Platform Administrator", badge: "PLATFORM ADMIN",
    desc: "Full platform access — configure integrations, manage platform settings, review the Trust Centre, and access all MASReady modules.",
    startAt: "Delivery Intelligence dashboard → Trust Centre → Integrations",
  },
  {
    name: "Priya Nair", role: "Customer Admin", badge: "CUSTOMER ADMIN",
    desc: "Customer environment management — view the delivery programme, environment health, organisational settings, and user access.",
    startAt: "Home dashboard → Environment Profile → Licence Planning",
  },
  {
    name: "Ethan Brooks", role: "Solution Architect", badge: "SOLUTION ARCHITECT",
    desc: "Upgrade architecture view — review the customisation inventory, patch impacts, integration design, and technical upgrade path.",
    startAt: "Maximo Fingerprint → Patch Impact Analysis → Architecture",
  },
  {
    name: "Maya Kelly", role: "Maximo Developer", badge: "DEVELOPER",
    desc: "Developer deep-dive — inspect automation scripts, custom objects, screen changes, and the full environment fingerprint detail.",
    startAt: "Maximo Inventory → Skill Packs → Automation Script detail",
  },
  {
    name: "Oliver Grant", role: "Release Manager", badge: "RELEASE MANAGER",
    desc: "Delivery oversight — track the delivery confidence score, patch remediation progress, regression coverage, and release readiness gates.",
    startAt: "Delivery Intelligence → Patch Impact → Adaptive Regression",
  },
  {
    name: "Sofia Rivera", role: "Work Requester", badge: "REQUESTER",
    desc: "End-user perspective — raise work requests, view asset records, and access operational dashboards with limited module scope.",
    startAt: "Home dashboard → Work Order view → Asset records",
  },
  {
    name: "Hannah Wright", role: "Viewer / Auditor", badge: "VIEWER / AUDITOR",
    desc: "Governance read-only — review audit trails, trust boundary reports, compliance evidence, and delivery assurance across all modules.",
    startAt: "Trust Centre → Audit Log → Delivery Intelligence (read-only)",
  },
];

const INTEGRATIONS = [
  { name: "Jira (Read-only)",                    type: "Atlassian Jira",             status: "connected", scopes: "read:issue · read:project · read:sprint",        write: false },
  { name: "Azure DevOps (Read-only)",            type: "Azure DevOps",               status: "connected", scopes: "vso.workitems · vso.project",                    write: false },
  { name: "IBM Maximo (Fingerprint Read-only)",  type: "Maximo OSLC",                status: "connected", scopes: "mbo.read · security.read · script.read",         write: false },
];

const MONTHLY_TREND = [
  { month: "Dec", used: 1600 }, { month: "Jan", used: 1650 }, { month: "Feb", used: 1620 },
  { month: "Mar", used: 1700 }, { month: "Apr", used: 1750 }, { month: "May", used: 1780 },
  { month: "Jun", used: 1800 }, { month: "Jul", used: 1820 }, { month: "Aug", used: 1810 },
  { month: "Sep", used: 1830 }, { month: "Oct", used: 1820 }, { month: "Nov", used: 1847 },
];

const ENTITLED = 2400;
const maxTrend = Math.max(...MONTHLY_TREND.map(m => m.used));

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    HIGH:   "bg-red-100 text-red-700 border border-red-200",
    MEDIUM: "bg-amber-100 text-amber-700 border border-amber-200",
    LOW:    "bg-emerald-100 text-emerald-700 border border-emerald-200",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 ${styles[severity] ?? ""}`}>
      {severity}
    </span>
  );
}

export default function MAS9Power() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      {/* ── Hero / Company Profile ── */}
      <section className="border-b border-border pt-28 pb-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <DemoBanner variant="seed-data" />
          <div className="mt-8 grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">Demo Tenant · Fictional Scenario</p>
              <h1 className="text-5xl lg:text-6xl font-semibold leading-[1.05] mb-6" style={serif}>
                MAS9 Power
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A fictional energy and utilities organisation currently running <strong className="text-foreground font-semibold">Maximo 7.6.1.3 on-premise</strong>, planning its upgrade path to <strong className="text-foreground font-semibold">IBM MAS Manage 9.x</strong>. The workbench demonstrates full pre-upgrade readiness: fingerprinting the current estate, scoring patch impact, reviewing licence headroom, and validating delivery confidence — before a single change is made to production.
              </p>
              <a
                href="https://mas9power.masready.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open the Live Demo Tenant
              </a>
            </div>
            <div className="lg:col-span-5">
              {/* Intelligence Score Card */}
              <div className="border border-border bg-card p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Delivery Intelligence Score</p>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-7xl font-semibold text-primary" style={serif}>87</span>
                  <span className="text-2xl text-muted-foreground mb-3">/100</span>
                </div>
                <div className="w-full h-2 bg-border rounded-none mb-6">
                  <div className="h-full bg-primary" style={{ width: "87%" }} />
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                  {[
                    { label: "Customisations scanned", value: "46" },
                    { label: "Patch impacts found",    value: "7" },
                    { label: "Trust boundary",         value: "REVIEW ONLY" },
                    { label: "Production mutations",   value: "0" },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="text-sm font-semibold text-foreground">{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Environment Profile ── */}
      <section className="border-b border-border py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Environment Profile</p>
              <h2 className="text-3xl font-semibold leading-snug mb-4" style={serif}>
                The fictional estate.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A realistic energy & utilities Maximo environment with 341 assets across 5 operational sites, 94 named users, and a complex customisation footprint accumulated over years of operation.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border border-border bg-background p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Server className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-widest">Platform</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Current",     value: "Maximo 7.6.1.3 on-premise" },
                      { label: "Target",      value: "IBM MAS Manage 9.x" },
                      { label: "Deployment",  value: "Customer-hosted" },
                      { label: "Region",      value: "AU-East" },
                      { label: "Data mode",   value: "Demo seed (locked)" },
                    ].map((r, i) => (
                      <div key={i} className="flex justify-between text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                        <span className="text-muted-foreground">{r.label}</span>
                        <span className="font-medium text-right">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-border bg-background p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <LayoutGrid className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-widest">Feature Flags</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Delivery intelligence",       on: true },
                      { label: "Patch impact analysis",       on: true },
                      { label: "Licence tracking & planning", on: true },
                      { label: "Maximo fingerprint",          on: true },
                      { label: "Trust centre",                on: true },
                      { label: "SQL execution",               on: false },
                      { label: "Jira write",                  on: false },
                      { label: "Premium actions",             on: false },
                    ].map((f, i) => (
                      <div key={i} className="flex items-center justify-between text-sm py-1">
                        <span className={f.on ? "text-foreground" : "text-muted-foreground"}>{f.label}</span>
                        {f.on
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          : <XCircle className="w-4 h-4 text-border flex-shrink-0" />
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sites */}
              <div className="border border-border bg-background">
                <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-widest">Operational Sites</span>
                  <span className="ml-auto text-xs text-muted-foreground">341 total assets · 63 active WOs</span>
                </div>
                {SITES.map((site, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-border last:border-0 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                    <span className="flex-1 font-medium">{site.name}</span>
                    <span className="text-xs text-muted-foreground">{site.region}</span>
                    <span className="text-xs text-muted-foreground w-20 text-right">{site.assets} assets</span>
                    <span className="text-xs text-muted-foreground w-16 text-right">{site.wos} WOs</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Patch Impact Analysis ── */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Patch Impact Analysis</p>
              <h2 className="text-3xl font-semibold leading-snug mb-4" style={serif}>
                7 impacts found across the upgrade path.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                MASReady cross-references the environment fingerprint against the MAS 9.1.0 change log, surfacing exactly what needs to be resolved before the upgrade — and how long it will take.
              </p>
              <div className="border border-border bg-card p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Critical", count: 0, color: "text-muted-foreground" },
                    { label: "High",     count: 2, color: "text-red-600" },
                    { label: "Medium",   count: 3, color: "text-amber-600" },
                    { label: "Low",      count: 2, color: "text-emerald-600" },
                  ].map((s, i) => (
                    <div key={i} className="border border-border bg-background p-4 text-center">
                      <div className={`text-3xl font-semibold mb-1 ${s.color}`} style={serif}>{s.count}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border text-center">
                  <div className="text-xs text-muted-foreground">Estimated total remediation effort</div>
                  <div className="text-xl font-semibold text-primary mt-1" style={serif}>~18 hours</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="border border-border">
                {PATCH_IMPACTS.map((item, i) => (
                  <div key={i} className="border-b border-border last:border-0 p-6 hover:bg-card transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-0.5">
                        <SeverityBadge severity={item.severity} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-sm font-semibold leading-snug">{item.title}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{item.id}</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-2">{item.description}</p>
                        <div className="text-xs text-muted-foreground">
                          Estimated effort: <span className="font-semibold text-foreground">{item.effort}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">Fictional scenario — for demonstration only. Not a real IBM patch note.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Maximo Fingerprint / Customisation Inventory ── */}
      <section className="border-b border-border py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Maximo Fingerprint</p>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <h2 className="text-3xl font-semibold" style={serif}>
                46 customisations detected across 8 types.
              </h2>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-500 inline-block" />12 high risk</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-400 inline-block" />15 medium risk</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 inline-block" />19 low risk</span>
              </div>
            </div>
          </div>
          <div className="border border-border bg-background">
            <div className="grid grid-cols-12 px-6 py-3 border-b border-border text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <div className="col-span-3">Type</div>
              <div className="col-span-1 text-center">Count</div>
              <div className="col-span-1 text-center">High risk</div>
              <div className="col-span-7 pl-6">Examples</div>
            </div>
            {CUSTOMISATION_TYPES.map((ct, i) => (
              <div key={i} className="grid grid-cols-12 px-6 py-4 border-b border-border last:border-0 items-start hover:bg-card transition-colors">
                <div className="col-span-3 text-sm font-semibold">{ct.type}</div>
                <div className="col-span-1 text-center text-sm font-semibold text-primary">{ct.count}</div>
                <div className="col-span-1 text-center">
                  {ct.risk_high > 0
                    ? <span className="text-xs font-semibold text-red-600">{ct.risk_high}</span>
                    : <span className="text-xs text-muted-foreground">—</span>
                  }
                </div>
                <div className="col-span-7 pl-6 text-xs text-muted-foreground leading-relaxed">{ct.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Licence Planning ── */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Licence Planning</p>
              <h2 className="text-3xl font-semibold leading-snug mb-4" style={serif}>
                1,847 of 2,400 AppPoints in use.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                MASReady surfaces AppPoint utilisation trends, named user breakdowns, and mobile pool peaks — so licence headroom is understood well before the IBM renewal conversation.
              </p>
              <div className="space-y-4">
                {[
                  { label: "AppPoints used",        value: "1,847 / 2,400", sub: "77% of entitlement" },
                  { label: "Peak utilisation",      value: "84%",           sub: "15 Oct 2025" },
                  { label: "Headroom",              value: "553 points",    sub: "23% remaining" },
                  { label: "Named users",           value: "94 total",      sub: "71 active in last 30 days" },
                  { label: "Mobile pool peak",      value: "89%",           sub: "14 Oct 2025" },
                  { label: "Renewal",               value: "30 Jun 2026",   sub: "IBM MAS AppPoints" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-border pb-4 last:border-0 last:pb-0">
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              {/* Usage bar */}
              <div className="border border-border bg-card p-6 mb-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-3">
                  <span>AppPoint utilisation — November 2025</span>
                  <span>1,847 / 2,400 (77%)</span>
                </div>
                <div className="w-full h-3 bg-border">
                  <div className="h-full bg-primary" style={{ width: "77%" }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0</span>
                  <span className="text-amber-600 font-medium">Peak: 84%</span>
                  <span>2,400</span>
                </div>
              </div>

              {/* Trend chart */}
              <div className="border border-border bg-card p-6 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">12-Month AppPoint Trend</p>
                <div className="flex items-end gap-1 h-28">
                  {MONTHLY_TREND.map((m, i) => {
                    const pct = (m.used / ENTITLED) * 100;
                    const barH = (m.used / maxTrend) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full relative flex items-end" style={{ height: "80px" }}>
                          <div
                            className={`w-full ${i === 11 ? "bg-primary" : "bg-primary/30"} transition-all`}
                            style={{ height: `${barH}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{m.month}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 pt-3 border-t border-border flex justify-between text-xs text-muted-foreground">
                  <span>Dec 2024 — Nov 2025</span>
                  <span>Entitlement: 2,400 points</span>
                </div>
              </div>

              {/* Named user breakdown */}
              <div className="border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Named User Breakdown</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Base users",         value: "61" },
                    { label: "Limited users",      value: "18" },
                    { label: "Mobile pool users",  value: "15" },
                  ].map((s, i) => (
                    <div key={i} className="border border-border bg-background p-4 text-center">
                      <div className="text-3xl font-semibold text-primary mb-1" style={serif}>{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 italic">For planning purposes only — not IBM-certified licence advice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="border-b border-border py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Integrations</p>
              <h2 className="text-3xl font-semibold leading-snug mb-4" style={serif}>
                3 read-only connections. Zero write access.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                MASReady connects to Jira, Azure DevOps, and Maximo via read-only credentials. Every scope is explicitly constrained. No mutations, no side effects.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="border border-border bg-background">
                {INTEGRATIONS.map((int, i) => (
                  <div key={i} className="border-b border-border last:border-0 p-6">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="text-sm font-semibold mb-0.5">{int.name}</div>
                        <div className="text-xs text-muted-foreground">{int.type}</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                        <span className="text-xs text-emerald-600 font-medium">Connected</span>
                        <span className="text-xs border border-border px-2 py-0.5 text-muted-foreground ml-2">Read-only</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono mt-2 bg-background border border-border px-3 py-2">
                      {int.scopes}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-5 p-4 border border-border bg-background">
                <Lock className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Trust boundary: REVIEW ONLY.</span> All connection credentials are scoped read-only. MASReady records every sync event in the audit log. 0 mutations across all integrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Demo Access ── */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Left — how to login */}
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Demo Access</p>
              <h2 className="text-3xl font-semibold leading-snug mb-4" style={serif}>
                7 roles.<br />No password required.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Each role gives a different view of the MAS9 / MAS9Power environment. Click any card to enter the live demo as that persona.
              </p>

              <div className="space-y-5 mb-8">
                {[
                  { n: "1", label: "Click any role card →",     detail: "Choose the persona you want to explore" },
                  { n: "2", label: "Opens in a new tab",         detail: "You'll land on mas9power.masready.com.au" },
                  { n: "3", label: 'Select "Demo Mode" tab',    detail: "Top-left of the login screen — it's the default" },
                  { n: "4", label: "Click your chosen role",     detail: "No password needed — you're straight in" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{s.n}</div>
                    <div>
                      <div className="text-sm font-semibold">{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://mas9power.masready.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open MAS9 / MAS9Power Demo
              </a>
              <p className="text-xs text-muted-foreground mt-2">All data is fictional · No password required</p>
            </div>

            {/* Right — role cards */}
            <div className="lg:col-span-8">
              <div className="border border-border bg-background">
                {ROLES.map((r, i) => (
                  <a
                    key={i}
                    href="https://mas9power.masready.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 px-6 py-5 border-b border-border last:border-0 hover:bg-card transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-0.5">
                      {r.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold mb-1">{r.name} — MAS9 Power {r.role}</div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{r.badge}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs font-mono text-muted-foreground">MAS9_POWER</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-1">{r.desc}</p>
                      <p className="text-xs font-medium text-primary/80">Start at: {r.startAt}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
                  </a>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                All data is fictional · No password required ·{" "}
                <a href="https://mas9power.masready.com.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mas9power.masready.com.au</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Safety disclaimer ── */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="flex items-start gap-5 p-6 border border-border bg-background">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">Safety Disclaimer</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All data in the MAS9 Power tenant — including user names, asset records, sites, patch scenarios, and licence figures — is entirely fictional and generated for demonstration purposes only. The environment operates in strict read-only mode, guaranteeing zero mutations to any source system. This is not a real IBM patch note, not real licence advice, and not a real organisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">Next steps</p>
              <h2 className="text-4xl font-semibold leading-[1.1]" style={serif}>
                Seen enough?<br />
                <em>Let's talk about your environment.</em>
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                The MAS9 Power demo is one scenario. Your Maximo environment will have its own fingerprint, its own patch risks, and its own licence story.
              </p>
              <Link href="/launch" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
                Request an Enterprise Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/industry-previews" className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-card transition-colors">
                Explore Industry Previews
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
