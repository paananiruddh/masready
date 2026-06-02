import { useState } from "react";
import { Link, useParams } from "wouter";
import {
  ArrowLeft, ArrowRight, ExternalLink, Lock, Shield, AlertTriangle,
  CheckCircle2, XCircle, Clock, AlertCircle, ChevronRight, X,
  LayoutDashboard, ClipboardList, Box, CalendarCheck, BarChart3,
  Plug, Users, RefreshCw,
} from "lucide-react";
import {
  getIndustry, getSyntheticSnapshot,
  getWorkOrders, getAssetRegister, getPMRecords, getSLARecords,
  getIntegrationRecords, getPersonas,
} from "@/lib/industryData";
import type {
  IndustryInfo, WorkOrderRecord, AssetRecord, PMRecord,
  SLARecord, IntegrationRecord, PersonaRecord,
} from "@/lib/industryData";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" };
const PUBLIC_DEMO_MODE = true;

// ─── Utility badges ───────────────────────────────────────────────────────────

function WOStatusBadge({ status }: { status: WorkOrderRecord["status"] }) {
  const cfg: Record<string, string> = {
    OPEN:  "bg-blue-50 text-blue-700 border-blue-200",
    INPRG: "bg-amber-50 text-amber-700 border-amber-200",
    WAPPR: "bg-orange-50 text-orange-700 border-orange-200",
    COMP:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    WSCH:  "bg-slate-50 text-slate-600 border-slate-200",
  };
  const labels: Record<string, string> = {
    OPEN: "OPEN", INPRG: "IN PROGRESS", WAPPR: "WAITING APPROVAL",
    COMP: "COMPLETE", WSCH: "WAITING SCHEDULE",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 border ${cfg[status] ?? ""}`}>
      {labels[status] ?? status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const cls: Record<string, string> = { "1": "text-red-600", "2": "text-amber-600", "3": "text-foreground", "4": "text-muted-foreground" };
  return <span className={`text-xs font-bold ${cls[priority] ?? ""}`}>P{priority}</span>;
}

function PMStatusBadge({ status }: { status: PMRecord["status"] }) {
  const cfg: Record<string, string> = {
    COMPLIANT: "bg-emerald-50 text-emerald-700 border-emerald-200",
    OVERDUE:   "bg-red-50 text-red-700 border-red-200",
    "DUE SOON": "bg-amber-50 text-amber-700 border-amber-200",
    SCHEDULED: "bg-slate-50 text-slate-600 border-slate-200",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 border ${cfg[status] ?? ""}`}>{status}</span>
  );
}

function SLAStatusBadge({ status }: { status: SLARecord["status"] }) {
  const cfg: Record<string, string> = {
    "ON TRACK": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "AT RISK":  "bg-amber-50 text-amber-700 border-amber-200",
    "BREACHED": "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 border ${cfg[status] ?? ""}`}>{status}</span>
  );
}

function AssetStatusDot({ status }: { status: AssetRecord["status"] }) {
  const cls: Record<string, string> = {
    OPERATING:      "bg-emerald-500",
    "NOT READY":    "bg-orange-400",
    INACTIVE:       "bg-slate-400",
    DECOMMISSIONED: "bg-red-500",
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${cls[status] ?? "bg-slate-400"}`} />;
}

function CritBadge({ crit }: { crit: AssetRecord["criticality"] }) {
  const cls: Record<string, string> = { HIGH: "text-red-600", MED: "text-amber-600", LOW: "text-muted-foreground" };
  return <span className={`text-xs font-bold ${cls[crit] ?? ""}`}>{crit}</span>;
}

function DemoModeBanner() {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 bg-amber-50 border border-amber-200 text-xs text-amber-800">
      <Lock className="w-3.5 h-3.5 flex-shrink-0" />
      <span>
        <span className="font-semibold">Public Demo Mode — seed data only.</span>{" "}
        Live API connections, write actions, and Maximo URL access are disabled.
        All records are synthetic and fictional. Request a provisioned private demo for real environment access.
      </span>
    </div>
  );
}

// ─── WO Detail Drawer ─────────────────────────────────────────────────────────

function WODrawer({ wo, onClose }: { wo: WorkOrderRecord; onClose: () => void }) {
  const activities = [
    { time: wo.reportedDate + " 08:14", actor: "System", text: "Work order created and assigned" },
    { time: wo.reportedDate + " 09:02", actor: wo.assignedTo, text: "Technician accepted assignment" },
    ...(wo.status === "INPRG" ? [{ time: wo.targetDate.slice(0, 7) + "-01 07:30", actor: wo.assignedTo, text: "Work commenced on site" }] : []),
    ...(wo.status === "WAPPR" ? [{ time: wo.targetDate.slice(0, 7) + "-01 14:22", actor: wo.assignedTo, text: "Work completed — awaiting supervisor approval" }] : []),
    ...(wo.status === "COMP" ? [{ time: wo.targetDate + " 16:45", actor: "Supervisor", text: "Work order approved and closed" }] : []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-md bg-background h-full overflow-y-auto border-l border-border shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
          <div>
            <p className="font-mono text-xs text-primary font-semibold">{wo.id}</p>
            <p className="text-sm font-semibold mt-0.5 leading-snug">{wo.description}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-muted transition-colors flex-shrink-0 ml-4">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5 flex-1">
          <div className="flex flex-wrap gap-2">
            <WOStatusBadge status={wo.status} />
            <PriorityBadge priority={wo.priority} />
            {wo.overdue && <span className="text-xs font-semibold text-red-600 border border-red-200 bg-red-50 px-2 py-0.5">OVERDUE</span>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Work class",   value: wo.woClass },
              { label: "Work type",    value: wo.type },
              { label: "Asset",        value: wo.asset },
              { label: "Assigned to",  value: wo.assignedTo },
              { label: "Site",         value: wo.site.split(" — ")[1] ?? wo.site },
              { label: "Reported",     value: wo.reportedDate },
              { label: "Target date",  value: wo.targetDate },
              { label: "Priority",     value: `P${wo.priority}` },
            ].map((r, i) => (
              <div key={i}>
                <p className="text-xs text-muted-foreground mb-0.5">{r.label}</p>
                <p className="text-sm font-medium">{r.value}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Activity Log</p>
            <div className="space-y-3">
              {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time} · {a.actor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {wo.status === "COMP" && (
            <div className="border border-border bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Resolution Notes</p>
              <p className="text-sm text-muted-foreground">
                Work completed as per job plan. Asset inspected and returned to service.
                No further action required. Next scheduled maintenance recorded.
              </p>
            </div>
          )}

          <div className="border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
            <span className="font-semibold">Demo mode.</span>{" "}
            Write actions (save, update, close, approve) are disabled in the public demo.
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-card flex gap-3 flex-shrink-0">
          <button disabled className="flex-1 px-4 py-2 text-xs font-medium border border-border text-muted-foreground cursor-not-allowed opacity-60">
            Update WO
          </button>
          <button disabled className="flex-1 px-4 py-2 text-xs font-medium border border-border text-muted-foreground cursor-not-allowed opacity-60">
            Approve / Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Asset Detail Drawer ──────────────────────────────────────────────────────

function AssetDrawer({ asset, relatedWOs, onClose }: {
  asset: AssetRecord;
  relatedWOs: WorkOrderRecord[];
  onClose: () => void;
}) {
  const condCls = { GOOD: "text-emerald-600", FAIR: "text-amber-600", POOR: "text-red-600" };
  const matched = relatedWOs.filter(wo => wo.asset === asset.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-md bg-background h-full overflow-y-auto border-l border-border shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card flex-shrink-0">
          <div>
            <p className="font-mono text-xs text-primary font-semibold">{asset.id}</p>
            <p className="text-sm font-semibold mt-0.5 leading-snug">{asset.description}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-muted transition-colors flex-shrink-0 ml-4">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5 flex-1">
          <div className="flex flex-wrap gap-2 items-center">
            <span className={`text-xs font-semibold px-2 py-0.5 border ${
              asset.status === "OPERATING" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
              asset.status === "NOT READY" ? "bg-orange-50 text-orange-700 border-orange-200" :
              "bg-slate-50 text-slate-600 border-slate-200"
            }`}>{asset.status}</span>
            <CritBadge crit={asset.criticality} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Asset type",   value: asset.assetType },
              { label: "Condition",    value: asset.condition, cls: condCls[asset.condition] },
              { label: "Location",     value: asset.location },
              { label: "Criticality",  value: asset.criticality },
              { label: "Install date", value: asset.installDate },
              { label: "Last PM",      value: asset.lastPM },
              { label: "Next PM due",  value: asset.nextPM },
              { label: "Status",       value: asset.status },
            ].map((r, i) => (
              <div key={i}>
                <p className="text-xs text-muted-foreground mb-0.5">{r.label}</p>
                <p className={`text-sm font-medium ${r.cls ?? ""}`}>{r.value}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Related Work Orders</p>
            {matched.length === 0 ? (
              <p className="text-sm text-muted-foreground">No work orders directly matched to this asset ID in the demo dataset.</p>
            ) : (
              <div className="space-y-2">
                {matched.map((wo, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border border-border bg-card">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-primary font-semibold">{wo.id}</p>
                      <p className="text-xs text-muted-foreground truncate">{wo.description}</p>
                    </div>
                    <WOStatusBadge status={wo.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
            <span className="font-semibold">Demo mode.</span>{" "}
            Asset record editing, meter readings, and create-WO actions are disabled in the public demo.
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border bg-card flex gap-3 flex-shrink-0">
          <button disabled className="flex-1 px-4 py-2 text-xs font-medium border border-border text-muted-foreground cursor-not-allowed opacity-60">
            Create Work Order
          </button>
          <button disabled className="flex-1 px-4 py-2 text-xs font-medium border border-border text-muted-foreground cursor-not-allowed opacity-60">
            Edit Asset Record
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Tab ────────────────────────────────────────────────────────────

function DashboardTab({
  industry, snap, workOrders, assetRegister, pmRecords, slaRecords, score,
}: {
  industry: IndustryInfo;
  snap: ReturnType<typeof getSyntheticSnapshot>;
  workOrders: WorkOrderRecord[];
  assetRegister: AssetRecord[];
  pmRecords: PMRecord[];
  slaRecords: SLARecord[];
  score: number;
  onSelectWO: (wo: WorkOrderRecord) => void;
  onSelectAsset: (a: AssetRecord) => void;
}) {
  const openWOs    = workOrders.filter(wo => ["OPEN", "INPRG", "WAPPR"].includes(wo.status)).length;
  const overdueWOs = workOrders.filter(wo => wo.overdue).length;
  const highCrit   = assetRegister.filter(a => a.criticality === "HIGH").length;
  const pmCompliant = pmRecords.filter(p => p.status === "COMPLIANT").length;
  const pmPct      = Math.round((pmCompliant / pmRecords.length) * 100);
  const slaBreached = slaRecords.filter(s => s.status === "BREACHED").length;

  const kpis = [
    { label: "Total Assets",      value: snap.assetCount.toLocaleString(), color: "text-primary",    sub: `${snap.locationCount} sites` },
    { label: "Open Work Orders",  value: String(openWOs),                  color: openWOs > 5 ? "text-amber-600" : "text-foreground", sub: `${overdueWOs} overdue` },
    { label: "Overdue WOs",       value: String(overdueWOs),               color: overdueWOs > 0 ? "text-red-600" : "text-emerald-600", sub: "Require immediate action" },
    { label: "High Crit. Assets", value: String(highCrit),                 color: "text-red-600",    sub: "Criticality = HIGH" },
    { label: "PM Compliance",     value: `${pmPct}%`,                      color: pmPct >= 90 ? "text-emerald-600" : "text-amber-600", sub: `${pmCompliant}/${pmRecords.length} on schedule` },
    { label: "SLA Breached",      value: String(slaBreached),              color: slaBreached > 0 ? "text-red-600" : "text-emerald-600", sub: "This period" },
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl space-y-7">

        {/* KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {kpis.map((k, i) => (
            <div key={i} className="border border-border bg-card p-4">
              <div className={`text-2xl font-semibold mb-0.5 ${k.color}`} style={serif}>{k.value}</div>
              <div className="text-xs font-medium text-foreground mb-0.5">{k.label}</div>
              <div className="text-xs text-muted-foreground">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-6">

          {/* Recent Work Orders */}
          <div className="lg:col-span-7">
            <div className="border border-border bg-background">
              <div className="px-5 py-3.5 border-b border-border bg-card flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest">Recent Work Orders</span>
                <span className="text-xs text-muted-foreground">{openWOs} active · {overdueWOs} overdue</span>
              </div>
              {workOrders.slice(0, 6).map((wo, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-card transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-mono text-xs text-primary font-semibold">{wo.id}</span>
                      {wo.overdue && <span className="text-xs font-bold text-red-600">OVERDUE</span>}
                    </div>
                    <p className="text-sm font-medium leading-snug">{wo.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{wo.site}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <WOStatusBadge status={wo.status} />
                    <PriorityBadge priority={wo.priority} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-5 space-y-4">

            {/* Delivery score */}
            <div className="border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Delivery Intelligence Score</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-semibold text-primary" style={serif}>{score}</span>
                <span className="text-lg text-muted-foreground mb-1">/100</span>
              </div>
              <div className="w-full h-2 bg-border mb-3">
                <div className="h-full bg-primary" style={{ width: `${score}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center border-t border-border pt-3">
                <div>
                  <div className="text-sm font-semibold text-red-600">{snap.driftFindings}</div>
                  <div className="text-xs text-muted-foreground">Drift</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary">{snap.regressionCoverage}%</div>
                  <div className="text-xs text-muted-foreground">Regression</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">{snap.activeUsers}</div>
                  <div className="text-xs text-muted-foreground">Users</div>
                </div>
              </div>
            </div>

            {/* Asset status */}
            <div className="border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Asset Status</p>
              <div className="space-y-2.5">
                {[
                  { label: "Operating",  count: assetRegister.filter(a => a.status === "OPERATING").length,   dot: "bg-emerald-500" },
                  { label: "Not Ready",  count: assetRegister.filter(a => a.status === "NOT READY").length,   dot: "bg-orange-400" },
                  { label: "Inactive",   count: assetRegister.filter(a => a.status === "INACTIVE").length,    dot: "bg-slate-400" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${s.dot} flex-shrink-0`} />
                    <span className="text-sm text-muted-foreground flex-1">{s.label}</span>
                    <span className="text-sm font-semibold">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA summary */}
            <div className="border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">SLA Summary</p>
              <div className="space-y-2.5">
                {[
                  { label: "On track",  count: slaRecords.filter(s => s.status === "ON TRACK").length,  cls: "text-emerald-600" },
                  { label: "At risk",   count: slaRecords.filter(s => s.status === "AT RISK").length,   cls: "text-amber-600" },
                  { label: "Breached",  count: slaRecords.filter(s => s.status === "BREACHED").length,  cls: "text-red-600" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                    <span className={`text-sm font-semibold ${s.cls}`}>{s.count}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Work Orders Tab ──────────────────────────────────────────────────────────

function WorkOrdersTab({ workOrders, industry, onSelect }: {
  workOrders: WorkOrderRecord[];
  industry: IndustryInfo;
  onSelect: (wo: WorkOrderRecord) => void;
}) {
  const [statusFilter, setStatusFilter]     = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [typeFilter, setTypeFilter]         = useState("ALL");

  const filtered = workOrders.filter(wo =>
    (statusFilter   === "ALL" || wo.status   === statusFilter) &&
    (priorityFilter === "ALL" || wo.priority === priorityFilter) &&
    (typeFilter     === "ALL" || wo.type     === typeFilter)
  );

  const open    = workOrders.filter(wo => ["OPEN", "INPRG", "WAPPR"].includes(wo.status)).length;
  const overdue = workOrders.filter(wo => wo.overdue).length;

  return (
    <div className="py-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl space-y-5">

        {/* Header */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Work Orders</p>
            <h2 className="text-xl font-semibold" style={serif}>{industry.title} — Work Order Register</h2>
          </div>
          <div className="flex gap-5 text-sm">
            <div className="text-center"><div className="text-xl font-semibold">{open}</div><div className="text-xs text-muted-foreground">Active</div></div>
            <div className="text-center"><div className="text-xl font-semibold text-red-600">{overdue}</div><div className="text-xs text-muted-foreground">Overdue</div></div>
            <div className="text-center"><div className="text-xl font-semibold">{workOrders.length}</div><div className="text-xs text-muted-foreground">Total</div></div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 p-4 border border-border bg-card">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Filter:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {["ALL", "OPEN", "INPRG", "WAPPR", "COMP", "WSCH"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === s ? "bg-primary text-white" : "border border-border hover:bg-muted"}`}>
                {s === "ALL" ? "All Status" : s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {["ALL", "1", "2", "3", "4"].map(p => (
              <button key={p} onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${priorityFilter === p ? "bg-primary text-white" : "border border-border hover:bg-muted"}`}>
                {p === "ALL" ? "All Priority" : `P${p}`}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {["ALL", "PM", "CM", "INS", "SAFE", "CAP"].map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${typeFilter === t ? "bg-primary text-white" : "border border-border hover:bg-muted"}`}>
                {t === "ALL" ? "All Types" : t}
              </button>
            ))}
          </div>
          <span className="ml-auto text-xs text-muted-foreground">{filtered.length} work orders</span>
        </div>

        {/* Table */}
        <div className="border border-border bg-background">
          <div className="grid grid-cols-12 px-5 py-3 border-b border-border text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-card">
            <div className="col-span-2">WO Number</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-1 text-center">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-center">Priority</div>
            <div className="col-span-2">Assigned To</div>
            <div className="col-span-1 text-center">Target</div>
          </div>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground text-sm">
              No work orders match the selected filters.
            </div>
          )}
          {filtered.map((wo, i) => (
            <div
              key={i}
              onClick={() => onSelect(wo)}
              className="grid grid-cols-12 px-5 py-4 border-b border-border last:border-0 items-center hover:bg-card transition-colors cursor-pointer group"
            >
              <div className="col-span-2">
                <span className="font-mono text-xs text-primary font-semibold">{wo.id}</span>
                {wo.overdue && <div className="text-xs font-bold text-red-600 mt-0.5">OVERDUE</div>}
              </div>
              <div className="col-span-3 text-sm font-medium leading-snug pr-3">{wo.description}</div>
              <div className="col-span-1 text-center">
                <span className="text-xs text-muted-foreground font-medium">{wo.type}</span>
              </div>
              <div className="col-span-2"><WOStatusBadge status={wo.status} /></div>
              <div className="col-span-1 text-center"><PriorityBadge priority={wo.priority} /></div>
              <div className="col-span-2 text-xs text-muted-foreground">{wo.assignedTo}</div>
              <div className="col-span-1 text-center flex items-center justify-center gap-1">
                <span className="text-xs text-muted-foreground">{wo.targetDate.slice(5)}</span>
                <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <DemoModeBanner />
      </div>
    </div>
  );
}

// ─── Assets Tab ───────────────────────────────────────────────────────────────

function AssetsTab({ assetRegister, industry, onSelect }: {
  assetRegister: AssetRecord[];
  industry: IndustryInfo;
  onSelect: (a: AssetRecord) => void;
}) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [critFilter, setCritFilter]     = useState("ALL");

  const filtered = assetRegister.filter(a =>
    (statusFilter === "ALL" || a.status      === statusFilter) &&
    (critFilter   === "ALL" || a.criticality === critFilter)
  );

  const operating = assetRegister.filter(a => a.status === "OPERATING").length;
  const notReady  = assetRegister.filter(a => a.status === "NOT READY").length;
  const high      = assetRegister.filter(a => a.criticality === "HIGH").length;

  return (
    <div className="py-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl space-y-5">

        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Asset Register</p>
            <h2 className="text-xl font-semibold" style={serif}>{industry.title} — Asset Record</h2>
          </div>
          <div className="flex gap-5 text-sm">
            <div className="text-center"><div className="text-xl font-semibold text-emerald-600">{operating}</div><div className="text-xs text-muted-foreground">Operating</div></div>
            <div className="text-center"><div className="text-xl font-semibold text-orange-600">{notReady}</div><div className="text-xs text-muted-foreground">Not Ready</div></div>
            <div className="text-center"><div className="text-xl font-semibold text-red-600">{high}</div><div className="text-xs text-muted-foreground">High Crit.</div></div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-4 border border-border bg-card">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Filter:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {["ALL", "OPERATING", "NOT READY", "INACTIVE"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === s ? "bg-primary text-white" : "border border-border hover:bg-muted"}`}>
                {s === "ALL" ? "All Status" : s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {["ALL", "HIGH", "MED", "LOW"].map(c => (
              <button key={c} onClick={() => setCritFilter(c)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${critFilter === c ? "bg-primary text-white" : "border border-border hover:bg-muted"}`}>
                {c === "ALL" ? "All Criticality" : c}
              </button>
            ))}
          </div>
          <span className="ml-auto text-xs text-muted-foreground">{filtered.length} assets</span>
        </div>

        <div className="border border-border bg-background">
          <div className="grid grid-cols-12 px-5 py-3 border-b border-border text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-card">
            <div className="col-span-2">Asset ID</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-center">Crit.</div>
            <div className="col-span-1">Last PM</div>
            <div className="col-span-1">Next PM</div>
          </div>
          {filtered.map((asset, i) => (
            <div
              key={i}
              onClick={() => onSelect(asset)}
              className="grid grid-cols-12 px-5 py-4 border-b border-border last:border-0 items-center hover:bg-card transition-colors cursor-pointer group"
            >
              <div className="col-span-2">
                <span className="font-mono text-xs text-primary font-semibold">{asset.id}</span>
              </div>
              <div className="col-span-3 text-sm font-medium leading-snug pr-3">{asset.description}</div>
              <div className="col-span-2 text-xs text-muted-foreground">{asset.assetType}</div>
              <div className="col-span-2 flex items-center gap-2">
                <AssetStatusDot status={asset.status} />
                <span className="text-xs">{asset.status}</span>
              </div>
              <div className="col-span-1 text-center"><CritBadge crit={asset.criticality} /></div>
              <div className="col-span-1 text-xs text-muted-foreground">{asset.lastPM.slice(5)}</div>
              <div className="col-span-1 flex items-center gap-1">
                <span className="text-xs text-muted-foreground">{asset.nextPM.slice(5)}</span>
                <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <DemoModeBanner />
      </div>
    </div>
  );
}

// ─── PM Compliance Tab ────────────────────────────────────────────────────────

function PMComplianceTab({ pmRecords, industry }: { pmRecords: PMRecord[]; industry: IndustryInfo }) {
  const compliant  = pmRecords.filter(p => p.status === "COMPLIANT").length;
  const overdue    = pmRecords.filter(p => p.status === "OVERDUE").length;
  const dueSoon    = pmRecords.filter(p => p.status === "DUE SOON").length;
  const scheduled  = pmRecords.filter(p => p.status === "SCHEDULED").length;
  const pct        = Math.round((compliant / pmRecords.length) * 100);

  return (
    <div className="py-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl space-y-6">

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">PM Compliance</p>
          <h2 className="text-xl font-semibold" style={serif}>{industry.title} — Planned Maintenance Schedule</h2>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Compliant",  count: compliant, color: "text-emerald-600", bg: "border-emerald-200 bg-emerald-50" },
            { label: "Overdue",    count: overdue,   color: "text-red-600",     bg: "border-red-200 bg-red-50" },
            { label: "Due Soon",   count: dueSoon,   color: "text-amber-600",   bg: "border-amber-200 bg-amber-50" },
            { label: "Scheduled",  count: scheduled, color: "text-slate-600",   bg: "border-slate-200 bg-slate-50" },
          ].map((s, i) => (
            <div key={i} className={`border p-5 ${s.bg}`}>
              <div className={`text-3xl font-semibold mb-1 ${s.color}`} style={serif}>{s.count}</div>
              <div className="text-xs font-medium text-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Compliance bar */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">Overall PM Compliance</span>
            <span className={`text-lg font-semibold ${pct >= 90 ? "text-emerald-600" : pct >= 80 ? "text-amber-600" : "text-red-600"}`}>{pct}%</span>
          </div>
          <div className="w-full h-3 bg-border">
            <div className={`h-full ${pct >= 90 ? "bg-emerald-500" : pct >= 80 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${pct}%` }} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0%</span>
            <span className="text-amber-600">Target: 95%</span>
            <span>100%</span>
          </div>
        </div>

        {/* PM Table */}
        <div className="border border-border bg-background">
          <div className="grid grid-cols-12 px-5 py-3 border-b border-border text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-card">
            <div className="col-span-2">PM ID</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-2">Asset</div>
            <div className="col-span-1 text-center">Frequency</div>
            <div className="col-span-1">Last Done</div>
            <div className="col-span-1">Next Due</div>
            <div className="col-span-2 text-center">Status</div>
          </div>
          {pmRecords.map((pm, i) => (
            <div key={i} className="grid grid-cols-12 px-5 py-4 border-b border-border last:border-0 items-center hover:bg-card transition-colors">
              <div className="col-span-2 font-mono text-xs text-primary font-semibold">{pm.id}</div>
              <div className="col-span-3 text-sm font-medium leading-snug pr-3">{pm.description}</div>
              <div className="col-span-2">
                <div className="font-mono text-xs text-primary">{pm.assetId}</div>
                <div className="text-xs text-muted-foreground truncate">{pm.assetDescription.split(" — ")[0]}</div>
              </div>
              <div className="col-span-1 text-center text-xs text-muted-foreground">{pm.frequency}</div>
              <div className="col-span-1 text-xs text-muted-foreground">{pm.lastCompleted.slice(5)}</div>
              <div className="col-span-1 text-xs text-muted-foreground">{pm.nextDue.slice(5)}</div>
              <div className="col-span-2 text-center"><PMStatusBadge status={pm.status} /></div>
            </div>
          ))}
        </div>

        <DemoModeBanner />
      </div>
    </div>
  );
}

// ─── SLA / Risk Tab ───────────────────────────────────────────────────────────

function SLARiskTab({ slaRecords, industry, workOrders }: {
  slaRecords: SLARecord[];
  industry: IndustryInfo;
  workOrders: WorkOrderRecord[];
}) {
  const onTrack  = slaRecords.filter(s => s.status === "ON TRACK").length;
  const atRisk   = slaRecords.filter(s => s.status === "AT RISK").length;
  const breached = slaRecords.filter(s => s.status === "BREACHED").length;
  const p1WOs    = workOrders.filter(wo => wo.priority === "1" && !["COMP"].includes(wo.status)).length;
  const overdueWOs = workOrders.filter(wo => wo.overdue).length;

  return (
    <div className="py-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl space-y-6">

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">SLA / Risk</p>
          <h2 className="text-xl font-semibold" style={serif}>{industry.title} — Service Level & Risk Register</h2>
        </div>

        {/* SLA summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "SLAs On Track", count: onTrack,  color: "text-emerald-600", bg: "border-emerald-200 bg-emerald-50" },
            { label: "SLAs At Risk",  count: atRisk,   color: "text-amber-600",   bg: "border-amber-200 bg-amber-50" },
            { label: "SLAs Breached", count: breached, color: "text-red-600",     bg: "border-red-200 bg-red-50" },
          ].map((s, i) => (
            <div key={i} className={`border p-6 ${s.bg}`}>
              <div className={`text-4xl font-semibold mb-2 ${s.color}`} style={serif}>{s.count}</div>
              <div className="text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* SLA table */}
        <div className="border border-border bg-background">
          <div className="px-5 py-3.5 border-b border-border bg-card">
            <span className="text-xs font-semibold uppercase tracking-widest">SLA Performance</span>
          </div>
          <div className="grid grid-cols-12 px-5 py-3 border-b border-border text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-card/50">
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1 text-center">Target</div>
            <div className="col-span-1 text-center">Actual</div>
            <div className="col-span-2 text-center">Compliance</div>
            <div className="col-span-2 text-center">Status</div>
          </div>
          {slaRecords.map((sla, i) => (
            <div key={i} className="grid grid-cols-12 px-5 py-4 border-b border-border last:border-0 items-center hover:bg-card transition-colors">
              <div className="col-span-4 text-sm font-medium leading-snug pr-3">{sla.description}</div>
              <div className="col-span-2 text-xs text-muted-foreground">{sla.category}</div>
              <div className="col-span-1 text-center text-xs font-semibold">{sla.target}</div>
              <div className="col-span-1 text-center text-xs">{sla.actual}</div>
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-16 h-1.5 bg-border">
                    <div className={`h-full ${sla.compliance >= 95 ? "bg-emerald-500" : sla.compliance >= 85 ? "bg-amber-400" : "bg-red-500"}`} style={{ width: `${sla.compliance}%` }} />
                  </div>
                  <span className="text-xs font-semibold">{sla.compliance}%</span>
                </div>
              </div>
              <div className="col-span-2 text-center"><SLAStatusBadge status={sla.status} /></div>
            </div>
          ))}
        </div>

        {/* Risk indicators */}
        <div className="border border-border bg-background">
          <div className="px-5 py-3.5 border-b border-border bg-card">
            <span className="text-xs font-semibold uppercase tracking-widest">Operational Risk Indicators</span>
          </div>
          <div className="divide-y divide-border">
            {[
              { label: "Open P1 Work Orders",   value: String(p1WOs),    risk: p1WOs > 0 ? "HIGH" : "LOW", riskCls: p1WOs > 0 ? "text-red-600" : "text-emerald-600" },
              { label: "Overdue Work Orders",    value: String(overdueWOs), risk: overdueWOs > 0 ? "AT RISK" : "LOW", riskCls: overdueWOs > 0 ? "text-amber-600" : "text-emerald-600" },
              { label: "SLA Breaches This Period", value: String(breached), risk: breached > 0 ? "HIGH" : "LOW", riskCls: breached > 0 ? "text-red-600" : "text-emerald-600" },
              { label: "Assets Not Ready",       value: String(0),       risk: "LOW", riskCls: "text-emerald-600" },
            ].map((r, i) => (
              <div key={i} className="flex items-center px-5 py-4 gap-4">
                <div className="flex-1 text-sm font-medium">{r.label}</div>
                <div className="text-sm font-semibold">{r.value}</div>
                <div className={`text-xs font-bold w-20 text-right ${r.riskCls}`}>{r.risk}</div>
              </div>
            ))}
          </div>
        </div>

        <DemoModeBanner />
      </div>
    </div>
  );
}

// ─── Integrations Tab ─────────────────────────────────────────────────────────

function IntegrationsTab({ integrations, industry }: { integrations: IntegrationRecord[]; industry: IndustryInfo }) {
  return (
    <div className="py-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl space-y-5">

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Integrations</p>
          <h2 className="text-xl font-semibold" style={serif}>{industry.title} — Integration Connections</h2>
        </div>

        {/* PUBLIC_DEMO_MODE enforcement notice */}
        <div className="border border-amber-300 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Public Demo Mode — Integrations Disabled</p>
              <p className="text-sm text-amber-700 leading-relaxed">
                All API connections, connection tests, credential fields, and endpoint writes are disabled in the public demo.
                Data shown is synthetic seed data only. No live Maximo URL or external API is contacted.
                Request a provisioned private demo for real integration access.
              </p>
            </div>
          </div>
        </div>

        {/* Integration cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {integrations.map((int, i) => (
            <div key={i} className="border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${int.status === "CONNECTED" ? "bg-emerald-500" : int.status === "DEGRADED" ? "bg-amber-400" : "bg-slate-300"}`} />
                    <span className="text-sm font-semibold">{int.name}</span>
                  </div>
                  <span className={`text-xs font-semibold ${int.status === "CONNECTED" ? "text-emerald-600" : int.status === "DEGRADED" ? "text-amber-600" : "text-muted-foreground"}`}>
                    {int.status}
                  </span>
                </div>
                <span className="text-xs border border-border px-2 py-0.5 text-muted-foreground flex-shrink-0">Read-only</span>
              </div>

              {/* Endpoint — read-only */}
              <div className="mb-3">
                <label className="text-xs text-muted-foreground font-medium block mb-1">Endpoint URL</label>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={int.endpoint}
                    className="flex-1 font-mono text-xs border border-border bg-background px-3 py-2 text-muted-foreground"
                  />
                </div>
              </div>

              {/* API Key — masked + disabled */}
              <div className="mb-3">
                <label className="text-xs text-muted-foreground font-medium block mb-1">API Credential</label>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value="••••••••••••••••••••••••"
                    disabled
                    className="flex-1 font-mono text-xs border border-border bg-muted px-3 py-2 text-muted-foreground cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Scopes */}
              <div className="font-mono text-xs border border-border bg-background px-3 py-2 text-muted-foreground mb-4">
                {int.scopes}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>Last sync: {int.lastSync}</span>
                <span className="text-xs">0 mutations</span>
              </div>

              {/* Disabled action buttons */}
              <div className="flex gap-2">
                <button
                  disabled
                  title="Disabled in public demo mode"
                  className="flex-1 px-3 py-2 text-xs font-medium border border-border text-muted-foreground cursor-not-allowed opacity-50"
                >
                  Test Connection
                </button>
                <button
                  disabled
                  title="Disabled in public demo mode"
                  className="flex-1 px-3 py-2 text-xs font-medium border border-border text-muted-foreground cursor-not-allowed opacity-50"
                >
                  Force Sync
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">All actions disabled — public demo mode</p>
            </div>
          ))}
        </div>

        {/* Zero Trust notice */}
        <div className="border border-border bg-card p-5 flex items-start gap-4">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold mb-1">Zero Trust · Review Only</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MASReady operates on a Zero Trust boundary in all public demo environments.
              Every connection is scoped read-only. There are zero write operations, zero mutations,
              and zero side effects across all integrations. Every sync event is recorded in the audit log.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Demo Access Tab ──────────────────────────────────────────────────────────

function DemoAccessTab({ personas }: { personas: PersonaRecord[] }) {
  return (
    <div className="py-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl space-y-6">

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Demo Access</p>
            <h2 className="text-2xl font-semibold leading-snug mb-4" style={serif}>7 roles.<br />No password required.</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              The MAS9 / MAS9Power demo opens in a new tab. Select any role — no account needed.
            </p>

            <div className="border border-border bg-card p-5 mb-5">
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

            <a
              href="https://mas9power.masready.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open MAS9 / MAS9Power Demo
            </a>
            <p className="text-xs text-muted-foreground mt-3">All data is fictional · No password required</p>
          </div>

          <div className="lg:col-span-8">
            <div className="border border-border">
              {personas.map((p, i) => (
                <a
                  key={i}
                  href="https://mas9power.masready.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 px-6 py-5 border-b border-border last:border-0 hover:bg-card transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-0.5">
                    {p.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <span className="text-sm font-semibold leading-snug">{p.name} — {p.role}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{p.badge}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs font-mono text-muted-foreground">MAS9_POWER</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-1.5">{p.desc}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">Start at:</span> {p.startAt}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1.5" />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              All data is fictional · No password required in Demo Mode ·{" "}
              <a href="https://mas9power.masready.com.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                mas9power.masready.com.au
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Demo App ────────────────────────────────────────────────────────────

const TABS = [
  { id: "dashboard",   label: "Dashboard",     icon: LayoutDashboard },
  { id: "workorders",  label: "Work Orders",   icon: ClipboardList },
  { id: "assets",      label: "Assets",        icon: Box },
  { id: "pm",          label: "PM Compliance", icon: CalendarCheck },
  { id: "sla",         label: "SLA / Risk",    icon: BarChart3 },
  { id: "integrations",label: "Integrations",  icon: Plug },
  { id: "demoaccess",  label: "Demo Access",   icon: Users },
];

export default function IndustryDemoApp() {
  const { industrySlug } = useParams<{ industrySlug: string }>();
  const [activeTab,     setActiveTab]     = useState("dashboard");
  const [selectedWO,    setSelectedWO]    = useState<WorkOrderRecord | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetRecord | null>(null);

  const industry    = getIndustry(industrySlug ?? "");
  const snap        = getSyntheticSnapshot(industrySlug ?? "");
  const workOrders  = getWorkOrders(industrySlug ?? "");
  const assets      = getAssetRegister(industrySlug ?? "");
  const pmRecords   = getPMRecords(industrySlug ?? "");
  const slaRecords  = getSLARecords(industrySlug ?? "");
  const integrations = getIntegrationRecords(industrySlug ?? "");
  const personas    = getPersonas();

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center pt-20">
        <div>
          <h1 className="text-2xl font-bold mb-3">Industry not found</h1>
          <p className="text-muted-foreground mb-6">That industry demo does not exist.</p>
          <Link href="/industry-previews" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
            View All Industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  let score = 88 - snap.driftFindings * 3 + Math.floor(snap.regressionCoverage / 10) - 7;
  score = Math.max(55, Math.min(95, Math.round(score)));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* Demo app shell bar */}
      <div className="pt-16 border-b border-border bg-card">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={`/industry/${industrySlug}`}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Industry Brief
            </Link>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-xs font-semibold text-foreground">{industry.title} — MASReady Demo Environment</span>
            <span className="text-xs text-muted-foreground">{snap.currentVersion} → IBM {snap.targetVersion}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1">
              <Lock className="w-3 h-3" /> PUBLIC DEMO MODE
            </span>
            <a
              href="https://mas9power.masready.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-white px-3 py-1.5 hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="w-3 h-3" /> MAS9 / MAS9Power
            </a>
          </div>
        </div>
      </div>

      {/* Demo mode banner */}
      <div className="border-b border-amber-200 bg-amber-50 px-6 lg:px-8 py-2">
        <div className="container mx-auto max-w-7xl flex items-center gap-2.5 text-xs text-amber-800">
          <Lock className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            <span className="font-semibold">Public Demo Mode — seed data only.</span>{" "}
            All records are synthetic. Live API connections, write actions, and Maximo URL access are disabled.{" "}
            <Link href="/launch" className="underline hover:no-underline">Request a private provisioned demo.</Link>
          </span>
        </div>
      </div>

      {/* Sticky tab nav */}
      <div className="sticky top-0 z-20 border-b border-border bg-background shadow-sm">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="flex overflow-x-auto -mb-px">
            {TABS.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1">
        {activeTab === "dashboard" && (
          <DashboardTab
            industry={industry} snap={snap} workOrders={workOrders}
            assetRegister={assets} pmRecords={pmRecords} slaRecords={slaRecords}
            score={score} onSelectWO={setSelectedWO} onSelectAsset={setSelectedAsset}
          />
        )}
        {activeTab === "workorders" && (
          <WorkOrdersTab workOrders={workOrders} industry={industry} onSelect={setSelectedWO} />
        )}
        {activeTab === "assets" && (
          <AssetsTab assetRegister={assets} industry={industry} onSelect={setSelectedAsset} />
        )}
        {activeTab === "pm" && (
          <PMComplianceTab pmRecords={pmRecords} industry={industry} />
        )}
        {activeTab === "sla" && (
          <SLARiskTab slaRecords={slaRecords} industry={industry} workOrders={workOrders} />
        )}
        {activeTab === "integrations" && (
          <IntegrationsTab integrations={integrations} industry={industry} />
        )}
        {activeTab === "demoaccess" && (
          <DemoAccessTab personas={personas} />
        )}
      </div>

      {/* Always-visible footer CTA */}
      <div className="border-t border-border bg-card py-6 mt-auto">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-foreground mb-0.5">This {industry.title} demo uses entirely fictional synthetic data.</p>
            <p className="text-xs text-muted-foreground">
              No real assets, users, or work orders · No Maximo connection · Zero mutations · All data fictional
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href={`/industry/${industrySlug}`} className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-medium hover:bg-muted transition-colors">
              View Industry Brief
            </Link>
            <Link href="/launch" className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 text-xs font-medium hover:bg-primary/90 transition-colors">
              Request Enterprise Demo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Detail drawers */}
      {selectedWO && (
        <WODrawer wo={selectedWO} onClose={() => setSelectedWO(null)} />
      )}
      {selectedAsset && (
        <AssetDrawer asset={selectedAsset} relatedWOs={workOrders} onClose={() => setSelectedAsset(null)} />
      )}
    </div>
  );
}
