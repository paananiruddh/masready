import { Link, useParams } from "wouter";
import {
  ArrowRight, Shield, Database, LayoutGrid, CheckCircle2, XCircle,
  Server, Users, MapPin, Lock, ExternalLink, FileText, Activity, Play,
} from "lucide-react";
import { DemoBanner } from "@/components/DemoBanner";
import { getIndustry, getSyntheticSnapshot } from "@/lib/industryData";
import type { IndustryInfo, SyntheticSnapshot } from "@/lib/industryData";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };

/* ─── data helpers ─── */

function computeScore(snap: SyntheticSnapshot): number {
  let s = 88;
  s -= snap.driftFindings * 3;
  s += Math.floor(snap.regressionCoverage / 10) - 7;
  return Math.max(55, Math.min(95, Math.round(s)));
}

function buildCustomisationTypes(snap: SyntheticSnapshot, industry: IndustryInfo) {
  const boCount   = Math.max(1, Math.ceil(snap.customObjects * 0.36));
  const scrCount  = Math.max(1, Math.ceil(snap.customObjects * 0.20));
  const wfCount   = Math.max(1, Math.ceil(snap.customObjects * 0.12));
  const cronCount = Math.max(1, Math.ceil(snap.automationScripts * 0.55));
  const rptCount  = Math.max(1, Math.ceil(snap.customObjects * 0.14));
  return [
    { type: "BO Extension",      count: boCount,                    risk_high: Math.ceil(boCount * 0.18),                          desc: `Custom fields on ${industry.assets.slice(0, 2).join(", ")} and related objects` },
    { type: "Automation Script", count: snap.automationScripts,     risk_high: Math.ceil(snap.automationScripts * 0.40),            desc: industry.workTypes.slice(0, 3).join(", ") + " scripts and triggers" },
    { type: "Screen Change",     count: scrCount,                   risk_high: Math.ceil(scrCount * 0.25),                          desc: `Custom screens for ${industry.workTypes[0]} and compliance workflows` },
    { type: "Workflow",          count: wfCount,                    risk_high: Math.ceil(wfCount * 0.33),                           desc: `${industry.workTypes[0]} approval, escalation, and exception flows` },
    { type: "Integration",       count: snap.integrationCount,      risk_high: Math.ceil(snap.integrationCount * 0.60),             desc: industry.integrations.join(", ") },
    { type: "Cron Task",         count: cronCount,                  risk_high: Math.ceil(cronCount * 0.30),                         desc: "PM escalation, sync jobs, report generation, alert dispatching" },
    { type: "Security Group",    count: 3,                          risk_high: 0,                                                   desc: "Role-based access groups: field, supervisor, read-only" },
    { type: "Report",            count: rptCount,                   risk_high: 0,                                                   desc: "Operational KPI, compliance summary, and AppPoint extract reports" },
  ];
}

function buildPatchImpacts(snap: SyntheticSnapshot, industry: IndustryInfo) {
  const integrationsStr = industry.integrations;
  const base = snap.driftItems.map((item, i) => ({
    id: `IMP-${String(i + 1).padStart(3, "0")}`,
    severity: item.severity.toUpperCase() as "HIGH" | "MEDIUM" | "LOW",
    title: derivePatchTitle(item.description, integrationsStr),
    description: item.description,
    effort: item.severity === "high" ? "6h" : item.severity === "medium" ? "2h" : "0.5h",
  }));
  return base;
}

function derivePatchTitle(desc: string, _ints: string[]): string {
  const lower = desc.toLowerCase();
  if (lower.includes("scada"))              return "SCADA Integration Adapter — compatibility review required";
  if (lower.includes("integration") || lower.includes("endpoint")) return "Integration Endpoint — configuration update required";
  if (lower.includes("automation") || lower.includes("script"))    return "Automation Script — version and regression review needed";
  if (lower.includes("pm") || lower.includes("frequency"))         return "PM Job Plan — frequency change requires re-baseline";
  if (lower.includes("user") || lower.includes("permission"))      return "Security Group — permission delta detected";
  if (lower.includes("credential") || lower.includes("connect"))   return "Integration Credentials — Maximo config refresh required";
  if (lower.includes("sap"))                return "SAP Integration — reconciliation required before upgrade";
  if (lower.includes("gis") || lower.includes("mapping"))          return "GIS Layer Mapping — attribute alignment required";
  if (lower.includes("safety") || lower.includes("permit"))        return "Safety/Permit Workflow — validation required";
  if (lower.includes("billing") || lower.includes("batch"))        return "Billing Integration — batch schedule alignment needed";
  return "Configuration Change — pre-upgrade review required";
}

function buildSites(snap: SyntheticSnapshot, industry: IndustryInfo) {
  const total = snap.locationCount;
  const siteTemplates = [
    { suffix: "— Headquarters & Operations Centre", region: "CBD"   },
    { suffix: `— Primary ${industry.assets[0]} Complex`,  region: "North"  },
    { suffix: `— ${industry.assets[1] ?? "Secondary"} Hub`,         region: "West"   },
    { suffix: `— ${industry.assets[0]} Network South`,              region: "South"  },
    { suffix: "— Central Depot & Warehouse",                         region: "CBD"   },
  ];
  const count = Math.min(5, Math.max(3, Math.ceil(total / 7)));
  const perSite = Math.ceil(snap.assetCount / count);
  const perSiteWOs = Math.ceil(snap.openWOs / count);
  return siteTemplates.slice(0, count).map((t, i) => ({
    id: `SITE_${i + 1}`,
    name: `${industry.title} ${t.suffix}`,
    region: t.region,
    assets: perSite - i * 5,
    wos: Math.max(1, perSiteWOs - i * 2),
  }));
}

function buildMonthlyTrend(snap: SyntheticSnapshot) {
  const basePoints = snap.activeUsers * 22;
  const months = ["Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov"];
  return months.map((month, i) => ({
    month,
    used: Math.round(basePoints * (0.88 + i * 0.008 + Math.sin(i * 0.7) * 0.015)),
  }));
}

function buildUserBreakdown(snap: SyntheticSnapshot) {
  const base    = Math.round(snap.activeUsers * 0.65);
  const limited = Math.round(snap.activeUsers * 0.19);
  const mobile  = snap.activeUsers - base - limited;
  return { base, limited, mobile };
}

/* ─── sub-components ─── */

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

/* ─── page ─── */

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustry(slug ?? "");
  const snap     = getSyntheticSnapshot(slug ?? "");

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-3">Industry not found</h1>
          <p className="text-muted-foreground mb-6">That industry preview does not exist.</p>
          <Link href="/industry-previews" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
            View All Industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const score         = computeScore(snap);
  const custTypes     = buildCustomisationTypes(snap, industry);
  const patchImpacts  = buildPatchImpacts(snap, industry);
  const sites         = buildSites(snap, industry);
  const monthlyTrend  = buildMonthlyTrend(snap);
  const userBreakdown = buildUserBreakdown(snap);

  const totalCustomisations = custTypes.reduce((a, c) => a + c.count, 0);
  const totalHighRisk       = custTypes.reduce((a, c) => a + c.risk_high, 0);
  const totalMedRisk        = Math.round(totalCustomisations * 0.32);
  const totalLowRisk        = totalCustomisations - totalHighRisk - totalMedRisk;

  const highImpacts   = patchImpacts.filter(p => p.severity === "HIGH").length;
  const medImpacts    = patchImpacts.filter(p => p.severity === "MEDIUM").length;
  const lowImpacts    = patchImpacts.filter(p => p.severity === "LOW").length;
  const totalEffortH  = patchImpacts.reduce((a, p) => a + parseFloat(p.effort), 0);

  const basePoints  = snap.activeUsers * 22;
  const ENTITLED    = Math.ceil(basePoints * 1.38 / 100) * 100;
  const latestUsed  = monthlyTrend[monthlyTrend.length - 1].used;
  const utilPct     = Math.round((latestUsed / ENTITLED) * 100);
  const maxTrend    = Math.max(...monthlyTrend.map(m => m.used));
  const headroom    = ENTITLED - latestUsed;
  const peakPct     = Math.round((maxTrend / ENTITLED) * 100);

  const totalSiteAssets = sites.reduce((a, s) => a + s.assets, 0);
  const totalSiteWOs    = sites.reduce((a, s) => a + s.wos, 0);

  const integrationList = industry.integrations.map((name, i) => ({
    name:   `${name} (Read-only)`,
    type:   name,
    scopes: `mbo.read · ${name.toLowerCase().replace(/\s+/g, ".")}.read · audit.read`,
  }));

  const roles = [
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

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      {/* ── Hero / Company Profile ── */}
      <section className="border-b border-border pt-28 pb-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <DemoBanner variant="seed-data" />
          <div className="mt-8 grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
                Demo Tenant · {industry.title} Sector
              </p>
              <h1 className="text-5xl lg:text-6xl font-semibold leading-[1.05] mb-6" style={serif}>
                {industry.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A fictional {industry.title.toLowerCase()} organisation currently running{" "}
                <strong className="text-foreground font-semibold">{snap.currentVersion} on-premise</strong>,
                planning its upgrade path to{" "}
                <strong className="text-foreground font-semibold">IBM {snap.targetVersion}</strong>.
                The workbench demonstrates full pre-upgrade readiness: fingerprinting the current estate,
                scoring patch impact, reviewing licence headroom, and validating delivery confidence —
                before a single change is made to production.
              </p>
              <Link
                href="/launch"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Request an Enterprise Demo
              </Link>
            </div>
            <div className="lg:col-span-5">
              <div className="border border-border bg-card p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Delivery Intelligence Score</p>
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-7xl font-semibold text-primary" style={serif}>{score}</span>
                  <span className="text-2xl text-muted-foreground mb-3">/100</span>
                </div>
                <div className="w-full h-2 bg-border rounded-none mb-6">
                  <div className="h-full bg-primary" style={{ width: `${score}%` }} />
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                  {[
                    { label: "Customisations scanned", value: String(totalCustomisations) },
                    { label: "Patch impacts found",    value: String(patchImpacts.length) },
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
                A realistic {industry.title.toLowerCase()} Maximo environment with{" "}
                {snap.assetCount.toLocaleString()} assets across {snap.locationCount} operational locations,{" "}
                {snap.activeUsers} named users, and a customisation footprint accumulated over years of operation.
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
                      { label: "Current",    value: snap.currentVersion + " on-premise" },
                      { label: "Target",     value: "IBM " + snap.targetVersion },
                      { label: "Deployment", value: "Customer-hosted" },
                      { label: "Region",     value: "AU-East" },
                      { label: "Data mode",  value: "Demo seed (locked)" },
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
                      { label: "Delivery intelligence",       on: true  },
                      { label: "Patch impact analysis",       on: true  },
                      { label: "Licence tracking & planning", on: true  },
                      { label: "Maximo fingerprint",          on: true  },
                      { label: "Trust centre",                on: true  },
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

              <div className="border border-border bg-background">
                <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-widest">Operational Sites</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {totalSiteAssets.toLocaleString()} total assets · {totalSiteWOs} active WOs
                  </span>
                </div>
                {sites.map((site, i) => (
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
                {patchImpacts.length} impact{patchImpacts.length !== 1 ? "s" : ""} found across the upgrade path.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                MASReady cross-references the environment fingerprint against the {snap.targetVersion} change log,
                surfacing exactly what needs to be resolved before the upgrade — and how long it will take.
              </p>
              <div className="border border-border bg-card p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Critical", count: 0,           color: "text-muted-foreground" },
                    { label: "High",     count: highImpacts,  color: "text-red-600" },
                    { label: "Medium",   count: medImpacts,   color: "text-amber-600" },
                    { label: "Low",      count: lowImpacts,   color: "text-emerald-600" },
                  ].map((s, i) => (
                    <div key={i} className="border border-border bg-background p-4 text-center">
                      <div className={`text-3xl font-semibold mb-1 ${s.color}`} style={serif}>{s.count}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border text-center">
                  <div className="text-xs text-muted-foreground">Estimated total remediation effort</div>
                  <div className="text-xl font-semibold text-primary mt-1" style={serif}>~{totalEffortH}h</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="border border-border">
                {patchImpacts.map((item, i) => (
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

      {/* ── Maximo Fingerprint ── */}
      <section className="border-b border-border py-20 bg-card">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Maximo Fingerprint</p>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <h2 className="text-3xl font-semibold" style={serif}>
                {totalCustomisations} customisations detected across {custTypes.length} types.
              </h2>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-500 inline-block" />{totalHighRisk} high risk</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-400 inline-block" />{totalMedRisk} medium risk</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 inline-block" />{totalLowRisk} low risk</span>
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
            {custTypes.map((ct, i) => (
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
                {latestUsed.toLocaleString()} of {ENTITLED.toLocaleString()} AppPoints in use.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                MASReady surfaces AppPoint utilisation trends, named user breakdowns, and mobile pool peaks —
                so licence headroom is understood well before the IBM renewal conversation.
              </p>
              <div className="space-y-4">
                {[
                  { label: "AppPoints used",   value: `${latestUsed.toLocaleString()} / ${ENTITLED.toLocaleString()}`, sub: `${utilPct}% of entitlement` },
                  { label: "Peak utilisation", value: `${peakPct}%`,                                                   sub: "Rolling 12-month high" },
                  { label: "Headroom",         value: `${headroom.toLocaleString()} points`,                           sub: `${100 - utilPct}% remaining` },
                  { label: "Named users",      value: `${snap.activeUsers} active`,                                    sub: `${Math.round(snap.activeUsers * 1.1)} total allocated` },
                  { label: "Mobile pool peak", value: `${Math.min(99, peakPct + 7)}%`,                                 sub: "Rolling 12-month high" },
                  { label: "Renewal",          value: "30 Jun 2026",                                                   sub: "IBM MAS AppPoints" },
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
              <div className="border border-border bg-card p-6 mb-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-3">
                  <span>AppPoint utilisation — {monthlyTrend[monthlyTrend.length - 1].month} 2025</span>
                  <span>{latestUsed.toLocaleString()} / {ENTITLED.toLocaleString()} ({utilPct}%)</span>
                </div>
                <div className="w-full h-3 bg-border">
                  <div className="h-full bg-primary" style={{ width: `${utilPct}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0</span>
                  <span className="text-amber-600 font-medium">Peak: {peakPct}%</span>
                  <span>{ENTITLED.toLocaleString()}</span>
                </div>
              </div>

              <div className="border border-border bg-card p-6 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">12-Month AppPoint Trend</p>
                <div className="flex items-end gap-1 h-28">
                  {monthlyTrend.map((m, i) => {
                    const barH = (m.used / maxTrend) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full relative flex items-end" style={{ height: "80px" }}>
                          <div
                            className={`w-full ${i === monthlyTrend.length - 1 ? "bg-primary" : "bg-primary/30"} transition-all`}
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
                  <span>Entitlement: {ENTITLED.toLocaleString()} points</span>
                </div>
              </div>

              <div className="border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Named User Breakdown</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Base users",        value: String(userBreakdown.base)    },
                    { label: "Limited users",      value: String(userBreakdown.limited) },
                    { label: "Mobile pool users",  value: String(userBreakdown.mobile)  },
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
                {integrationList.length} read-only connections. Zero write access.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                MASReady connects to {industry.integrations.join(", ")} and Maximo via read-only credentials.
                Every scope is explicitly constrained. No mutations, no side effects.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="border border-border bg-background">
                {integrationList.map((int, i) => (
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
                  <span className="font-semibold text-foreground">Trust boundary: REVIEW ONLY.</span>{" "}
                  All connection credentials are scoped read-only. MASReady records every sync event in the audit log.
                  0 mutations across all integrations.
                </p>
              </div>
              <div className="mt-3 p-4 border border-amber-200 bg-amber-50 text-xs text-amber-800">
                <span className="font-semibold">Demo mode: real Maximo / API connection disabled.</span>{" "}
                Integration reads shown above use synthetic seed data only. Live connection to Maximo and external systems is available in a provisioned private demo.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Demo Access ── */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Left — instructions */}
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Demo Access</p>
              <h2 className="text-3xl font-semibold leading-snug mb-4" style={serif}>
                7 roles.<br />No password required.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                The MAS9 / MAS9Power demo opens in a new tab. Select any role — no account needed.
              </p>

              <div className="border border-border bg-card p-6 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4">How to enter</p>
                <ol className="space-y-3">
                  {[
                    "Click any role card on the right.",
                    "The MAS9Power demo opens in a new tab.",
                    "On the login screen, select the Demo Mode tab.",
                    "Click the matching demo role.",
                    "No password is required in Demo Mode.",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://mas9power.masready.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open MAS9 / MAS9Power Demo
                </a>
                <Link
                  href={`/demos/industries/${slug}`}
                  className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 text-sm font-medium hover:bg-primary/5 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Launch {industry.title} Full Demo
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-3">All data is fictional · No password required</p>
            </div>

            {/* Right — role cards */}
            <div className="lg:col-span-8">
              <div className="border border-border">
                {roles.map((r, i) => (
                  <a
                    key={i}
                    href="https://mas9power.masready.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 px-6 py-5 border-b border-border last:border-0 hover:bg-card transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-0.5">
                      {r.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <span className="text-sm font-semibold leading-snug">{r.name} — MAS9 Power {r.role}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{r.badge}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs font-mono text-muted-foreground">MAS9_POWER</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-1.5">{r.desc}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Start at:</span> {r.startAt}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1.5" />
                  </a>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                All data is fictional · No password required in Demo Mode ·{" "}
                <a href="https://mas9power.masready.com.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mas9power.masready.com.au</a>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Safety Disclaimer ── */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="flex items-start gap-5 p-6 border border-border bg-background">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">Safety Disclaimer</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All data in this {industry.title} synthetic tenant — including user names, asset records, sites, patch scenarios, and licence figures —
                is entirely fictional and generated for demonstration purposes only. The environment operates in strict read-only mode,
                guaranteeing zero mutations to any source system. This is not a real IBM patch note, not real licence advice, and not a real organisation.
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
                This {industry.title} demo is one scenario. Your Maximo environment will have its own fingerprint,
                its own patch risks, and its own licence story.
              </p>
              <Link href="/launch" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
                Request an Enterprise Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/industry-previews" className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-card transition-colors">
                Explore All Industry Previews
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
