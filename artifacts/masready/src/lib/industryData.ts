export interface IndustryInfo {
  slug: string;
  title: string;
  color: string;
  border: string;
  bg: string;
  assets: string[];
  workTypes: string[];
  integrations: string[];
  insights: string[];
  description: string;
}

export interface SyntheticSnapshot {
  assetCount: number;
  locationCount: number;
  openWOs: number;
  criticalWOs: number;
  activeUsers: number;
  currentVersion: string;
  targetVersion: string;
  customObjects: number;
  automationScripts: number;
  integrationCount: number;
  driftFindings: number;
  regressionScenarios: number;
  regressionCoverage: number;
  sampleAssets: { id: string; description: string; type: string; status: string; priority: string }[];
  sampleWOs: { woNum: string; description: string; status: string; priority: string; type: string }[];
  driftItems: { severity: "high" | "medium" | "low"; description: string }[];
  skillPackQuestions: { q: string; a: string }[];
  recommendations: string[];
}

// ─── Demo App Types ───────────────────────────────────────────────────────────

export interface WorkOrderRecord {
  id: string;
  description: string;
  status: "OPEN" | "INPRG" | "WAPPR" | "COMP" | "WSCH";
  priority: "1" | "2" | "3" | "4";
  type: "PM" | "CM" | "INS" | "SAFE" | "CAP";
  woClass: string;
  site: string;
  asset: string;
  assignedTo: string;
  reportedDate: string;
  targetDate: string;
  overdue: boolean;
}

export interface AssetRecord {
  id: string;
  description: string;
  assetType: string;
  status: "OPERATING" | "NOT READY" | "INACTIVE" | "DECOMMISSIONED";
  location: string;
  criticality: "HIGH" | "MED" | "LOW";
  condition: "GOOD" | "FAIR" | "POOR";
  lastPM: string;
  nextPM: string;
  installDate: string;
}

export interface PMRecord {
  id: string;
  description: string;
  assetId: string;
  assetDescription: string;
  frequency: "Monthly" | "Quarterly" | "6-Monthly" | "Annual";
  lastCompleted: string;
  nextDue: string;
  status: "COMPLIANT" | "OVERDUE" | "DUE SOON" | "SCHEDULED";
  assignedTo: string;
}

export interface SLARecord {
  id: string;
  description: string;
  category: "Response" | "Resolution" | "PM Completion" | "Compliance";
  target: string;
  actual: string;
  status: "ON TRACK" | "AT RISK" | "BREACHED";
  compliance: number;
}

export interface IntegrationRecord {
  name: string;
  system: string;
  endpoint: string;
  scopes: string;
  status: "CONNECTED" | "DEGRADED" | "DISABLED";
  lastSync: string;
}

export interface PersonaRecord {
  name: string;
  role: string;
  badge: string;
  desc: string;
  startAt: string;
}

export interface KPIRecord {
  label: string;
  value: string;
  sub: string;
  trend?: "up" | "down" | "flat";
  color?: string;
}

// ─── Industry Definitions ─────────────────────────────────────────────────────

export const INDUSTRIES: IndustryInfo[] = [
  {
    slug: "utilities",
    title: "Utilities",
    color: "text-amber-700",
    border: "border-amber-200",
    bg: "from-amber-50",
    description: "Electricity distribution and transmission asset operations.",
    assets: ["Substations", "Transformers", "Smart meters", "Distribution lines"],
    workTypes: ["Preventive PM", "Corrective", "Inspection", "Emergency dispatch"],
    integrations: ["SCADA", "GIS", "SAP", "Meter data systems"],
    insights: ["Upgrade risk scoring", "Regression coverage", "AppPoints analysis", "Drift alerts"],
  },
  {
    slug: "transport",
    title: "Transport",
    color: "text-blue-700",
    border: "border-blue-200",
    bg: "from-blue-50",
    description: "Road transport fleet and depot asset operations.",
    assets: ["Fleet vehicles", "Depots", "Road infrastructure", "Signalling"],
    workTypes: ["Scheduled maintenance", "Breakdown response", "Compliance inspection"],
    integrations: ["Fleet telemetry", "GIS", "Finance", "IoT sensors"],
    insights: ["MAS 9 readiness", "Integration gap analysis", "Skill pack coverage", "Governance checklist"],
  },
  {
    slug: "government",
    title: "Government",
    color: "text-indigo-700",
    border: "border-indigo-200",
    bg: "from-indigo-50",
    description: "Local and state government infrastructure asset management.",
    assets: ["Public buildings", "Parks", "Roads", "Utilities infrastructure"],
    workTypes: ["Statutory inspection", "Corrective", "Capital works", "Compliance"],
    integrations: ["Finance system", "Document management", "GIS", "Citizen portals"],
    insights: ["Compliance readiness", "Audit trail review", "Licensing analysis", "Environment fingerprint"],
  },
  {
    slug: "mining",
    title: "Mining",
    color: "text-orange-700",
    border: "border-orange-200",
    bg: "from-orange-50",
    description: "Heavy mining equipment, plant, and site infrastructure.",
    assets: ["Heavy equipment", "Processing plant", "Conveyors", "Site infrastructure"],
    workTypes: ["Condition-based PM", "Safety inspection", "Shutdown planning", "Corrective"],
    integrations: ["SAP", "PLC/SCADA", "Safety systems", "Procurement"],
    insights: ["Shutdown readiness", "Regression packs", "AI skill pack answers", "Drift findings"],
  },
  {
    slug: "facilities",
    title: "Facilities",
    color: "text-emerald-700",
    border: "border-emerald-200",
    bg: "from-emerald-50",
    description: "Commercial and institutional building services management.",
    assets: ["HVAC", "Elevators", "Electrical systems", "Building fabric"],
    workTypes: ["Planned PM", "Reactive", "Contract compliance", "Statutory"],
    integrations: ["BMS", "Energy management", "Finance", "Contract portals"],
    insights: ["Contract readiness", "Compliance scoring", "AppPoints utilisation", "Upgrade risk"],
  },
  {
    slug: "power",
    title: "Power Generation",
    color: "text-red-700",
    border: "border-red-200",
    bg: "from-red-50",
    description: "Power station and generation asset lifecycle management.",
    assets: ["Turbines", "Generators", "Cooling systems", "Control rooms"],
    workTypes: ["Outage planning", "Predictive maintenance", "Regulatory compliance", "Emergency response"],
    integrations: ["DCS", "SCADA", "Energy trading", "Safety systems"],
    insights: ["Outage readiness", "Regression coverage", "Trust boundary review", "Skill pack gaps"],
  },
  {
    slug: "water",
    title: "Water",
    color: "text-cyan-700",
    border: "border-cyan-200",
    bg: "from-cyan-50",
    description: "Water and wastewater infrastructure asset operations.",
    assets: ["Pump stations", "Treatment plants", "Pipelines", "Reservoirs"],
    workTypes: ["Field maintenance", "Compliance inspection", "Reactive repair", "Scheduled PM"],
    integrations: ["SCADA", "GIS", "Laboratory", "Customer billing"],
    insights: ["Compliance readiness", "Upgrade risk scoring", "Regression packs", "Environment fingerprint"],
  },
  {
    slug: "rail",
    title: "Rail",
    color: "text-violet-700",
    border: "border-violet-200",
    bg: "from-violet-50",
    description: "Rolling stock, trackside, depot, and station asset management.",
    assets: ["Rolling stock", "Trackside assets", "Depots", "Stations"],
    workTypes: ["PM scheduling", "Corrective maintenance", "Mobility workflows", "Safety compliance"],
    integrations: ["Fleet management", "Signalling", "Crew management", "Safety systems"],
    insights: ["MAS 9 readiness scoring", "Regression packs", "Drift findings", "Skill pack coverage"],
  },
  {
    slug: "roads",
    title: "Roads",
    color: "text-amber-800",
    border: "border-amber-200",
    bg: "from-yellow-50",
    description: "Road network, bridge, tunnel, and traffic infrastructure management.",
    assets: ["Road network", "Bridges", "Tunnels", "Traffic systems"],
    workTypes: ["Routine maintenance", "Capital renewal", "Inspection", "Emergency response"],
    integrations: ["GIS", "Traffic management", "Finance", "Contractor portals"],
    insights: ["Asset readiness", "Upgrade risk", "Governance checklist", "Licensing analysis"],
  },
  {
    slug: "airports",
    title: "Airports",
    color: "text-sky-700",
    border: "border-sky-200",
    bg: "from-sky-50",
    description: "Airport airside, terminal systems, and ground equipment management.",
    assets: ["Runways", "Terminal systems", "Ground equipment", "Airside infrastructure"],
    workTypes: ["Airside compliance", "Planned PM", "Emergency response", "Lifecycle management"],
    integrations: ["AODB", "Safety management", "Finance", "Procurement"],
    insights: ["Compliance readiness", "Regression coverage", "AI skill pack answers", "Environment fingerprint"],
  },
];

export function getIndustry(slug: string): IndustryInfo | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

// ─── Synthetic Snapshots ──────────────────────────────────────────────────────

const SNAPSHOTS: Record<string, SyntheticSnapshot> = {
  utilities: {
    assetCount: 4218, locationCount: 89, openWOs: 347, criticalWOs: 12, activeUsers: 64,
    currentVersion: "Maximo 7.6.1.3", targetVersion: "MAS 9.0", customObjects: 31, automationScripts: 8, integrationCount: 4,
    driftFindings: 4, regressionScenarios: 198, regressionCoverage: 82,
    sampleAssets: [
      { id: "SUB-0041", description: "Zone 4 Distribution Substation", type: "Substation", status: "OPERATING", priority: "1" },
      { id: "TRF-0183", description: "132kV Power Transformer #3", type: "Transformer", status: "OPERATING", priority: "1" },
      { id: "MTR-1047", description: "Smart Meter Cluster — Block D", type: "Smart Meter", status: "ACTIVE", priority: "3" },
      { id: "DL-0029", description: "Distribution Line — South Corridor", type: "Distribution Line", status: "OPERATING", priority: "2" },
    ],
    sampleWOs: [
      { woNum: "WO-084312", description: "Quarterly substation thermal inspection", status: "INPRG", priority: "2", type: "PM" },
      { woNum: "WO-084401", description: "Transformer fault investigation — Zone 4", status: "WAPPR", priority: "1", type: "CM" },
      { woNum: "WO-084298", description: "Smart meter data discrepancy — Block D", status: "COMP", priority: "3", type: "INS" },
    ],
    driftItems: [
      { severity: "medium", description: "SCADA integration endpoint URL has changed since baseline capture" },
      { severity: "medium", description: "2 automation scripts modified outside change management" },
      { severity: "low", description: "PM frequency for Transformer class reduced from 90 to 120 days" },
      { severity: "low", description: "User group 'Field Tech' has 3 additional application permissions vs baseline" },
    ],
    skillPackQuestions: [
      { q: "What AppPoint types are consumed by field technicians in Maximo 7.6?", a: "Field technicians typically consume Base User or Limited User AppPoints. In 7.6.1.x, named users with mobile app access consume Base + Manage AppPoints. Review your current user type assignments before migration." },
      { q: "How does SCADA integration change between 7.6 and MAS 9?", a: "MAS 9 uses RESTful API connectors and Maximo Application Framework. Legacy SCADA adapters using Maximo Integration Framework (MIF) need to be reviewed and may require re-implementation using the MAS Integration Service." },
      { q: "What is the recommended regression approach for substation PM workflows?", a: "Fingerprint your existing PM workflow automation, then generate Playwright scenarios covering: PM generation triggers, field technician assignment, work completion capture, and SCADA update confirmation." },
    ],
    recommendations: [
      "Review SCADA integration adapter compatibility with MAS 9 Integration Service before upgrade",
      "Conduct AppPoints licence audit — 3 users appear to have incorrectly assigned Base User type",
      "Investigate 2 automation scripts modified outside change management — regression risk",
      "Run full environment fingerprint and compare against last baseline to confirm drift scope",
    ],
  },
  rail: {
    assetCount: 2847, locationCount: 34, openWOs: 234, criticalWOs: 8, activeUsers: 112,
    currentVersion: "Maximo 7.6.1.2", targetVersion: "MAS 9.0", customObjects: 23, automationScripts: 4, integrationCount: 4,
    driftFindings: 3, regressionScenarios: 127, regressionCoverage: 78,
    sampleAssets: [
      { id: "RS-0441", description: "Electric Multiple Unit — Set 14", type: "Rolling Stock", status: "OPERATING", priority: "1" },
      { id: "TS-0083", description: "Platform 3 Track Circuit Assembly", type: "Trackside", status: "OPERATING", priority: "2" },
      { id: "DP-0012", description: "Northern Depot — Fleet Maintenance Bay", type: "Depot", status: "ACTIVE", priority: "1" },
      { id: "SG-0217", description: "Signal Gantry — Junction 7", type: "Signalling", status: "OPERATING", priority: "1" },
    ],
    sampleWOs: [
      { woNum: "WO-041823", description: "6-month rolling stock PM — Set 14", status: "INPRG", priority: "2", type: "PM" },
      { woNum: "WO-041901", description: "Track circuit fault investigation — Platform 3", status: "WAPPR", priority: "1", type: "CM" },
      { woNum: "WO-041788", description: "Depot safety inspection — Bay 4", status: "COMP", priority: "2", type: "INS" },
    ],
    driftItems: [
      { severity: "medium", description: "Fleet management integration endpoint changed — MIF adapter not updated" },
      { severity: "medium", description: "Rolling stock PM frequency reduced from 180 to 150 days in 4 job plans" },
      { severity: "low", description: "Safety systems integration heartbeat timeout increased from 30s to 60s" },
    ],
    skillPackQuestions: [
      { q: "How should rolling stock PM workflows be migrated to MAS 9?", a: "Rolling stock PM workflows using legacy job plans and sequences need to be fingerprinted first. MAS 9 supports workflow automation via Maximo Manage but the activation and approval flows differ. Review your existing escalation scripts." },
      { q: "What changes affect Maximo Mobile for field technicians on MAS 9?", a: "Maximo Mobile replaces the legacy Work Centers and Anywhere apps. Existing work order flows, attachments, meter readings, and labour reporting workflows should all be validated with Playwright regression scenarios before go-live." },
      { q: "How does signalling system integration change in MAS 9?", a: "OSLC and REST APIs are the preferred integration patterns in MAS 9. Any legacy signalling integrations using flat-file or batch-mode MIF adapters should be reviewed and planned for re-architecture." },
    ],
    recommendations: [
      "Update MIF adapter for fleet management integration — current version incompatible with MAS 9",
      "Review 4 job plans with reduced PM frequency — confirm these are approved operational changes",
      "Generate Playwright regression pack for mobile work order completion flow before MAS 9 go-live",
      "Validate safety systems integration heartbeat behaviour under MAS 9 Integration Service",
    ],
  },
  water: {
    assetCount: 5631, locationCount: 127, openWOs: 412, criticalWOs: 19, activeUsers: 78,
    currentVersion: "Maximo 7.6.1.1", targetVersion: "MAS 9.0", customObjects: 27, automationScripts: 6, integrationCount: 4,
    driftFindings: 5, regressionScenarios: 156, regressionCoverage: 74,
    sampleAssets: [
      { id: "PS-0034", description: "Pump Station — West Catchment", type: "Pump Station", status: "OPERATING", priority: "1" },
      { id: "TP-0008", description: "Water Treatment Plant — Zone 2", type: "Treatment Plant", status: "OPERATING", priority: "1" },
      { id: "PL-1092", description: "DN500 Water Main — North Corridor", type: "Pipeline", status: "ACTIVE", priority: "2" },
      { id: "RS-0071", description: "Hilltop Reservoir — 5ML Capacity", type: "Reservoir", status: "OPERATING", priority: "1" },
    ],
    sampleWOs: [
      { woNum: "WO-072341", description: "Pump station monthly compliance check", status: "INPRG", priority: "2", type: "INS" },
      { woNum: "WO-072508", description: "Water main leak repair — North Corridor", status: "WAPPR", priority: "1", type: "CM" },
      { woNum: "WO-072290", description: "Treatment plant chemical dosing PM", status: "COMP", priority: "2", type: "PM" },
    ],
    driftItems: [
      { severity: "high", description: "SCADA connectivity to West Catchment pump station not confirmed since last fingerprint" },
      { severity: "medium", description: "Laboratory LIMS integration credentials rotated — Maximo config not updated" },
      { severity: "low", description: "Compliance inspection frequency for reservoirs changed in 3 job plans" },
      { severity: "low", description: "GIS layer mapping for pipeline assets has 2 new attributes not reflected in Maximo" },
      { severity: "low", description: "Customer billing integration nightly batch schedule shifted by 30 minutes" },
    ],
    skillPackQuestions: [
      { q: "What regulatory compliance considerations apply to water asset migration to MAS 9?", a: "Water utilities typically have strict compliance obligations around asset condition records, inspection histories, and audit trails. Ensure immutable audit logging is enabled and test all compliance inspection workflows before go-live." },
      { q: "How does SCADA integration work in MAS 9 for pump station telemetry?", a: "MAS 9 uses the Maximo Application Framework REST APIs. Legacy SCADA-to-Maximo adapters using MIF or direct DB connections must be re-evaluated. Plan a proof-of-concept integration test early." },
    ],
    recommendations: [
      "Urgent: Confirm SCADA connectivity to West Catchment pump station before proceeding",
      "Update LIMS integration credentials in Maximo configuration — current connection likely failing",
      "Review 3 job plans with modified inspection frequencies against regulatory obligations",
      "Conduct AppPoints review — 78 active users, validate licence allocation before MAS 9 migration",
    ],
  },
  mining: {
    assetCount: 1893, locationCount: 22, openWOs: 189, criticalWOs: 14, activeUsers: 94,
    currentVersion: "Maximo 7.6.0.9", targetVersion: "MAS 9.0", customObjects: 44, automationScripts: 11, integrationCount: 4,
    driftFindings: 6, regressionScenarios: 214, regressionCoverage: 69,
    sampleAssets: [
      { id: "HE-0012", description: "CAT 793F Mining Truck #12", type: "Heavy Equipment", status: "OPERATING", priority: "1" },
      { id: "PP-0003", description: "Primary Processing Plant — Crusher Circuit", type: "Processing Plant", status: "OPERATING", priority: "1" },
      { id: "CV-0047", description: "Main Ore Conveyor — 4.2km Belt", type: "Conveyor", status: "ACTIVE", priority: "1" },
      { id: "SI-0089", description: "Site Services — Electrical Substation 3", type: "Site Infrastructure", status: "OPERATING", priority: "2" },
    ],
    sampleWOs: [
      { woNum: "WO-098234", description: "CAT 793F 500hr preventive maintenance", status: "INPRG", priority: "1", type: "PM" },
      { woNum: "WO-098301", description: "Crusher circuit shutdown inspection", status: "WAPPR", priority: "1", type: "INS" },
      { woNum: "WO-098188", description: "Conveyor belt tension adjustment — Belt 4", status: "COMP", priority: "2", type: "CM" },
    ],
    driftItems: [
      { severity: "high", description: "SAP materials integration has not been reconciled since last major cutover" },
      { severity: "high", description: "6 automation scripts modified during emergency shutdown — not version controlled" },
      { severity: "medium", description: "Safety systems integration — 2 new permit types added outside Maximo workflow" },
      { severity: "medium", description: "Procurement approval thresholds changed in Maximo but not matched to SAP" },
      { severity: "low", description: "PLC/SCADA heartbeat monitoring script rewritten — regression test needed" },
      { severity: "low", description: "Heavy equipment PM frequency reduced for 3 asset types during low-production period" },
    ],
    skillPackQuestions: [
      { q: "What is the recommended approach for SAP integration in MAS 9 for mining?", a: "MAS 9 integrates with SAP via REST APIs and the Maximo Integration Framework. Review existing ERP integration adapters and plan for regression testing of materials, purchasing, and cost centre flows." },
      { q: "How should mining-specific custom objects be handled in MAS 9 migration?", a: "With 44 custom objects detected, conduct an impact assessment against MAS 9 base objects before migration. Some customisations can be replaced by MAS 9 native functionality." },
    ],
    recommendations: [
      "Critical: Reconcile SAP materials integration before MAS 9 migration — significant drift risk",
      "Version control and regression-test 6 automation scripts modified during emergency shutdown",
      "Validate permit management integration with safety systems — 2 new types not in Maximo",
      "Custom object count (44) is high — plan detailed compatibility assessment for MAS 9",
    ],
  },
};

const DEFAULT_SNAPSHOT = (slug: string): SyntheticSnapshot => ({
  assetCount: 1200 + Math.floor(slug.length * 300), locationCount: 28, openWOs: 180, criticalWOs: 9, activeUsers: 55,
  currentVersion: "Maximo 7.6.1.2", targetVersion: "MAS 9.0", customObjects: 18, automationScripts: 5, integrationCount: 3,
  driftFindings: 3, regressionScenarios: 110, regressionCoverage: 75,
  sampleAssets: [
    { id: "AST-0101", description: "Primary Asset Type A — Location 1", type: "Primary", status: "OPERATING", priority: "1" },
    { id: "AST-0202", description: "Secondary Asset Type B — Location 2", type: "Secondary", status: "ACTIVE", priority: "2" },
    { id: "AST-0303", description: "Support Asset Type C — Location 3", type: "Support", status: "OPERATING", priority: "3" },
  ],
  sampleWOs: [
    { woNum: "WO-010001", description: "Scheduled preventive maintenance", status: "INPRG", priority: "2", type: "PM" },
    { woNum: "WO-010002", description: "Compliance inspection — statutory", status: "WAPPR", priority: "2", type: "INS" },
    { woNum: "WO-010003", description: "Corrective maintenance — fault identified", status: "COMP", priority: "1", type: "CM" },
  ],
  driftItems: [
    { severity: "medium", description: "Integration endpoint changed since last baseline capture" },
    { severity: "low", description: "PM frequency modified for 2 asset classes" },
    { severity: "low", description: "User group permissions updated — not reflected in baseline" },
  ],
  skillPackQuestions: [
    { q: "What is the first step in assessing MAS 9 readiness?", a: "Start with an environment fingerprint to capture installed objects, customisations, integrations, add-ons, and user counts. This baseline drives the rest of the readiness assessment." },
    { q: "How does regression testing change in MAS 9?", a: "MAS 9 moves to a container-based deployment. Existing regression suites built against on-premise or traditional hosting need to be validated against the MAS container platform behaviour." },
  ],
  recommendations: [
    "Complete environment fingerprint before scheduling MAS 9 migration",
    "Review integration endpoints for MAS 9 compatibility",
    "Validate current AppPoints licence allocation against active user count",
    "Generate regression pack from fingerprint before any upgrade activity",
  ],
});

export function getSyntheticSnapshot(slug: string): SyntheticSnapshot {
  return SNAPSHOTS[slug] ?? DEFAULT_SNAPSHOT(slug);
}

export const INDUSTRY_MAXIMO_VERSIONS = [
  "Maximo 7.6.0.6", "Maximo 7.6.0.9", "Maximo 7.6.1.0", "Maximo 7.6.1.1",
  "Maximo 7.6.1.2", "Maximo 7.6.1.3", "MAS 8.9", "MAS 8.10", "MAS 8.11",
];

export const MAS_TARGET_VERSIONS = [
  "MAS 8.11", "MAS 9.0", "MAS 9.1",
];

export const COMMON_ADDONS = [
  "Maximo for Nuclear Power", "Maximo Asset Health Insights", "Maximo Visual Inspection",
  "Maximo Spatial", "Maximo Scheduler", "IBM MAS Monitor", "IBM MAS Health",
  "IBM MAS Assist", "IBM MAS Predict", "IBM Maximo Mobile",
];

export const MOBILITY_TOOLS = [
  "IBM Maximo Mobile", "Maximo Anywhere (legacy)", "Work Centers", "Custom mobile app", "None",
];

// ─── Deterministic pseudo-hash ────────────────────────────────────────────────

function dh(s: string, n: number): number {
  let v = (n + 1) * 2654435761;
  for (let i = 0; i < s.length; i++) v = ((v << 5) - v + s.charCodeAt(i)) | 0;
  return Math.abs(v);
}

// ─── Work Order Generator ─────────────────────────────────────────────────────

const WO_BASES: Record<string, number> = {
  utilities: 84310, transport: 53200, government: 61450, mining: 98220,
  facilities: 33100, power: 110400, water: 72280, rail: 41800,
  roads: 21150, airports: 11050,
};

const WO_STATUSES: WorkOrderRecord["status"][] = [
  "OPEN", "INPRG", "WAPPR", "OPEN", "COMP", "WSCH", "OPEN", "INPRG", "OPEN", "WAPPR",
];
const WO_PRIORITIES: WorkOrderRecord["priority"][] = [
  "2", "1", "2", "3", "3", "2", "1", "2", "4", "3",
];
const WO_TYPES: WorkOrderRecord["type"][] = [
  "PM", "CM", "INS", "PM", "SAFE", "CM", "CAP", "PM", "INS", "CM",
];
const WO_OVERDUE = [false, true, false, false, false, false, true, false, false, false];
const WO_REPORTED = [
  "2025-10-15", "2025-10-22", "2025-11-01", "2025-10-18", "2025-11-05",
  "2025-10-29", "2025-11-08", "2025-10-12", "2025-11-02", "2025-10-25",
];
const WO_TARGET = [
  "2025-11-30", "2025-11-15", "2025-11-08", "2025-12-15", "2025-12-20",
  "2025-11-30", "2025-11-25", "2025-11-22", "2025-12-10", "2025-11-22",
];
const TECHNICIANS = [
  "Jordan Lee", "Sam Patel", "Alex Kim", "Chris Morgan", "Taylor Brown",
  "Morgan Davis", "Riley Chen", "Cameron White", "Quinn Hall", "Blake Foster",
];

const WO_CLASS_MAP: Record<WorkOrderRecord["type"], string> = {
  PM: "Planned", CM: "Unplanned", INS: "Inspection", SAFE: "Safety", CAP: "Capital",
};

export function getWorkOrders(slug: string): WorkOrderRecord[] {
  const industry = getIndustry(slug);
  if (!industry) return [];
  const { title, workTypes, assets } = industry;
  const base = WO_BASES[slug] ?? 10000 + slug.length * 1000;

  const siteNames = [
    `${title} — Operations Centre`,
    `${title} — ${assets[0]} Complex`,
    `${title} — ${assets[Math.min(1, assets.length - 1)]} Hub`,
    `${title} — South Operations`,
    `${title} — North Depot`,
  ];

  return Array.from({ length: 10 }, (_, i) => {
    const assetType = assets[i % assets.length];
    const workType  = workTypes[i % workTypes.length];
    const type      = WO_TYPES[i];
    const prefix    = assetType.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase();
    const assetNum  = String(100 + (dh(slug, i) % 900)).padStart(4, "0");

    const descMap: Record<WorkOrderRecord["type"], string> = {
      PM:   `Scheduled PM — ${assetType}`,
      CM:   `Corrective repair — ${assetType} fault identified`,
      INS:  `${workType} — ${assetType}`,
      SAFE: `Safety inspection — ${assetType} access review`,
      CAP:  `Capital renewal — ${assetType} programme`,
    };

    return {
      id: `WO-${String(base + i).padStart(6, "0")}`,
      description: descMap[type],
      status: WO_STATUSES[i],
      priority: WO_PRIORITIES[i],
      type,
      woClass: WO_CLASS_MAP[type],
      site: siteNames[i % siteNames.length],
      asset: `${prefix}-${assetNum}`,
      assignedTo: TECHNICIANS[i % TECHNICIANS.length],
      reportedDate: WO_REPORTED[i],
      targetDate: WO_TARGET[i],
      overdue: WO_OVERDUE[i],
    };
  });
}

// ─── Asset Register Generator ─────────────────────────────────────────────────

const ASSET_STATUSES: AssetRecord["status"][] = [
  "OPERATING", "OPERATING", "OPERATING", "NOT READY", "OPERATING", "INACTIVE", "OPERATING", "OPERATING",
];
const ASSET_CRITS: AssetRecord["criticality"][] = [
  "HIGH", "HIGH", "MED", "HIGH", "MED", "LOW", "MED", "LOW",
];
const ASSET_CONDITIONS: AssetRecord["condition"][] = [
  "GOOD", "GOOD", "FAIR", "POOR", "GOOD", "FAIR", "GOOD", "FAIR",
];
const ASSET_LAST_PM = [
  "2025-09-15", "2025-10-02", "2025-08-28", "2025-10-18",
  "2025-09-22", "2025-07-15", "2025-10-08", "2025-09-30",
];
const ASSET_NEXT_PM = [
  "2025-12-15", "2026-01-02", "2025-11-28", "2026-01-18",
  "2025-12-22", "2025-10-15", "2026-01-08", "2025-12-30",
];
const INSTALL_YEARS = ["2011", "2014", "2009", "2016", "2013", "2008", "2015", "2012"];
const REGIONS = ["North", "South", "East", "West", "Central", "CBD", "Northwest", "Southeast"];

export function getAssetRegister(slug: string): AssetRecord[] {
  const industry = getIndustry(slug);
  if (!industry) return [];
  const { title, assets } = industry;

  return Array.from({ length: 8 }, (_, i) => {
    const assetType = assets[i % assets.length];
    const prefix    = assetType.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase();
    const num       = String(10 + (dh(slug, i + 20) % 490)).padStart(4, "0");
    const region    = REGIONS[i % REGIONS.length];

    return {
      id: `${prefix}-${num}`,
      description: `${assetType} — ${region} ${title} ${i % 2 === 0 ? "Hub" : "Complex"}`,
      assetType,
      status: ASSET_STATUSES[i],
      location: `${region} ${title} Operations`,
      criticality: ASSET_CRITS[i],
      condition: ASSET_CONDITIONS[i],
      lastPM: ASSET_LAST_PM[i],
      nextPM: ASSET_NEXT_PM[i],
      installDate: INSTALL_YEARS[i],
    };
  });
}

// ─── PM Record Generator ──────────────────────────────────────────────────────

const PM_BASES: Record<string, number> = {
  utilities: 8200, transport: 5100, government: 6100, mining: 9800,
  facilities: 3100, power: 11000, water: 7200, rail: 4100,
  roads: 2100, airports: 1100,
};
const PM_FREQS: PMRecord["frequency"][] = [
  "Monthly", "Quarterly", "6-Monthly", "Annual", "Monthly", "Quarterly", "Annual", "6-Monthly",
];
const PM_LAST = [
  "2025-10-01", "2025-09-01", "2025-07-01", "2025-04-01",
  "2025-10-15", "2025-09-15", "2025-04-15", "2025-07-15",
];
const PM_NEXT = [
  "2025-11-01", "2025-12-01", "2026-01-01", "2026-04-01",
  "2025-11-15", "2025-12-15", "2026-04-15", "2026-01-15",
];
const PM_STATUSES: PMRecord["status"][] = [
  "COMPLIANT", "COMPLIANT", "DUE SOON", "SCHEDULED", "OVERDUE", "COMPLIANT", "SCHEDULED", "DUE SOON",
];

export function getPMRecords(slug: string): PMRecord[] {
  const industry = getIndustry(slug);
  if (!industry) return [];
  const assets = getAssetRegister(slug);
  const base   = PM_BASES[slug] ?? 1000 + slug.length * 100;

  return Array.from({ length: 8 }, (_, i) => {
    const asset = assets[i % assets.length];
    const freq  = PM_FREQS[i];
    return {
      id: `PM-${String(base + i).padStart(5, "0")}`,
      description: `${freq} ${asset.assetType} maintenance`,
      assetId: asset.id,
      assetDescription: asset.description,
      frequency: freq,
      lastCompleted: PM_LAST[i],
      nextDue: PM_NEXT[i],
      status: PM_STATUSES[i],
      assignedTo: TECHNICIANS[i % TECHNICIANS.length],
    };
  });
}

// ─── SLA Record Generator ─────────────────────────────────────────────────────

const SLA_TEMPLATE = [
  { desc: "Priority 1 — Emergency Response",    cat: "Response" as const,      target: "2h",     actual: "1h 47m", status: "ON TRACK" as const, compliance: 94 },
  { desc: "Priority 2 — Urgent Work Orders",    cat: "Response" as const,      target: "4h",     actual: "4h 23m", status: "AT RISK"  as const, compliance: 81 },
  { desc: "Priority 3 — Standard Work Orders",  cat: "Resolution" as const,    target: "5 days", actual: "4.2d",   status: "ON TRACK" as const, compliance: 91 },
  { desc: "PM Completion Rate — Planned Works", cat: "PM Completion" as const, target: "95%",    actual: "88%",    status: "AT RISK"  as const, compliance: 88 },
  { desc: "Statutory Compliance Inspections",   cat: "Compliance" as const,    target: "100%",   actual: "97%",    status: "BREACHED" as const, compliance: 97 },
  { desc: "Asset Condition Assessment",         cat: "Compliance" as const,    target: "Annual", actual: "Current",status: "ON TRACK" as const, compliance: 100 },
];

export function getSLARecords(slug: string): SLARecord[] {
  const base = PM_BASES[slug] ?? 1000;
  return SLA_TEMPLATE.map((t, i) => ({
    id: `SLA-${String(base + i + 10).padStart(5, "0")}`,
    description: t.desc,
    category: t.cat,
    target: t.target,
    actual: t.actual,
    status: t.status,
    compliance: t.compliance,
  }));
}

// ─── Integration Record Generator ─────────────────────────────────────────────

const INT_STATUSES: IntegrationRecord["status"][] = ["CONNECTED", "CONNECTED", "CONNECTED", "DEGRADED"];
const INT_SYNCS = ["2025-11-15 06:14", "2025-11-15 06:02", "2025-11-15 05:58", "2025-11-14 18:30"];

export function getIntegrationRecords(slug: string): IntegrationRecord[] {
  const industry = getIndustry(slug);
  if (!industry) return [];

  return industry.integrations.map((name, i) => ({
    name: `${name} (Read-only)`,
    system: name,
    endpoint: `https://api.demo.${name.toLowerCase().replace(/[\s/]+/g, "-")}.local/v2`,
    scopes: `mbo.read · ${name.toLowerCase().replace(/\s+/g, ".")}.read · audit.read`,
    status: INT_STATUSES[i % INT_STATUSES.length],
    lastSync: INT_SYNCS[i % INT_SYNCS.length],
  }));
}

// ─── Persona Records ──────────────────────────────────────────────────────────

const PERSONA_LIST: PersonaRecord[] = [
  { name: "Alex Chen",     role: "Platform Administrator", badge: "PLATFORM ADMIN",    desc: "Full platform access — configure integrations, manage platform settings, review the Trust Centre, and access all MASReady modules.",            startAt: "Delivery Intelligence dashboard → Trust Centre → Integrations" },
  { name: "Priya Nair",    role: "Customer Admin",         badge: "CUSTOMER ADMIN",     desc: "Customer environment management — view the delivery programme, environment health, organisational settings, and user access.",                   startAt: "Home dashboard → Environment Profile → Licence Planning" },
  { name: "Ethan Brooks",  role: "Solution Architect",     badge: "SOLUTION ARCHITECT", desc: "Upgrade architecture view — review the customisation inventory, patch impacts, integration design, and technical upgrade path.",                startAt: "Maximo Fingerprint → Patch Impact Analysis → Architecture" },
  { name: "Maya Kelly",    role: "Maximo Developer",       badge: "DEVELOPER",          desc: "Developer deep-dive — inspect automation scripts, custom objects, screen changes, and the full environment fingerprint detail.",                  startAt: "Maximo Inventory → Skill Packs → Automation Script detail" },
  { name: "Oliver Grant",  role: "Release Manager",        badge: "RELEASE MANAGER",    desc: "Delivery oversight — track the delivery confidence score, patch remediation progress, regression coverage, and release readiness gates.",        startAt: "Delivery Intelligence → Patch Impact → Adaptive Regression" },
  { name: "Sofia Rivera",  role: "Work Requester",         badge: "REQUESTER",          desc: "End-user perspective — raise work requests, view asset records, and access operational dashboards with limited module scope.",                     startAt: "Home dashboard → Work Order view → Asset records" },
  { name: "Hannah Wright", role: "Viewer / Auditor",       badge: "VIEWER / AUDITOR",   desc: "Governance read-only — review audit trails, trust boundary reports, compliance evidence, and delivery assurance across all modules.",             startAt: "Trust Centre → Audit Log → Delivery Intelligence (read-only)" },
];

export function getPersonas(): PersonaRecord[] {
  return PERSONA_LIST;
}
