import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, User, Tag } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Login + Customer Switch",
    route: "/login & /switch",
    role: "Admin",
    duration: "1 min",
    tag: "Auth",
    tagColor: "#1d9bf0",
    proves: "Multi-tenant authentication and customer scoping. Demonstrates how the workbench isolates data per customer without sharing environment state.",
    detail: "The admin logs in via the standard auth flow and uses the customer switcher to activate the MAS9 Power demo tenant. All subsequent data is scoped to this customer context."
  },
  {
    num: "02",
    title: "Delivery Intelligence Dashboard",
    route: "/dashboard",
    role: "Delivery Lead",
    duration: "2 min",
    tag: "Intelligence",
    tagColor: "#fe2c55",
    proves: "Unified confidence score across all delivery dimensions. Shows top-level delivery posture at a glance before diving into any specific module.",
    detail: "Score: 87/100. The dashboard aggregates patch impact, bot skill-pack coverage, license health, and requirement completeness into a single delivery confidence metric. No external calls made."
  },
  {
    num: "03",
    title: "Trust Center",
    route: "/trust",
    role: "Admin",
    duration: "1 min",
    tag: "Safety",
    tagColor: "#25f4ee",
    proves: "Read-only design confirmation. Shows the trust boundary screen that lists every integration in read-only mode and confirms no production mutations have occurred.",
    detail: "All integrations display READ-ONLY status. SQL execution: disabled. Maximo mutations: 0. Jira mutations: 0. ADO mutations: 0. Trace capture: active."
  },
  {
    num: "04",
    title: "Integration Settings",
    route: "/settings/integrations",
    role: "Admin",
    duration: "1 min",
    tag: "Config",
    tagColor: "#833ab4",
    proves: "Jira read-only mode is enforced at the config level. ADO and Maximo write permissions are absent from the integration setup — not just disabled, never configured.",
    detail: "Jira connection shows mode: jira_only / read-only. Maximo connection shows API read access only — no update/create/delete scopes. Azure DevOps: read-only, no pipeline triggers."
  },
  {
    num: "05",
    title: "Requirement Upload Intake",
    route: "/requirements",
    role: "Delivery Lead",
    duration: "1 min",
    tag: "Requirements",
    tagColor: "#fcb045",
    proves: "Structured intake of customer requirements with Jira evidence linking. Requirements are captured without any mutation to Jira — evidence is pulled, not pushed.",
    detail: "Upload a requirements CSV or link Jira epics. The workbench enriches requirements with Jira ticket data (read-only) and stores the intake locally for the review package."
  },
  {
    num: "06",
    title: "Maximo Environment Fingerprint",
    route: "/fingerprint",
    role: "Asset Manager",
    duration: "1 min",
    tag: "Fingerprint",
    tagColor: "#1d9bf0",
    proves: "46 customisations scanned across the MAS9 Power environment. Shows installed objects, version profile, and configuration deltas without any write operations.",
    detail: "Fingerprint scan result: 46 customisations detected. Platform: IBM MAS Manage 9.x. Data mode: customer_hosted. Scan reads Maximo API — no writes, no schema changes."
  },
  {
    num: "07",
    title: "Patch / iFix Impact Analysis",
    route: "/patch-impact",
    role: "Delivery Lead",
    duration: "1 min",
    tag: "Patch",
    tagColor: "#fe2c55",
    proves: "7 impacted items across the MAS9 Power environment. Impact distributed as 0 Critical, 2 High, 3 Medium, 2 Low — all cross-referenced against the fingerprint.",
    detail: "Each impact record shows the affected object, patch reference, severity classification, and recommended review action. No patch is applied — this is an impact forecast only."
  },
  {
    num: "08",
    title: "License Usage Planning",
    route: "/license",
    role: "Finance",
    duration: "1 min",
    tag: "License",
    tagColor: "#25f4ee",
    proves: "AppPoint trend showing 1847 used / 2400 entitled (77% utilisation, 84% peak). 94 named users: 71 active, 23 inactive. Mobile pool at 89% peak. Planning only — not compliance advice.",
    detail: "12-month AppPoint trend rendered. User activity breakdown by role. Mobile pool utilisation alert at 89%. Disclaimer: this is planning and visibility data only, not legal or IBM-certified compliance output."
  },
  {
    num: "09",
    title: "Bot Skill-Pack Coverage",
    route: "/skills",
    role: "Delivery Lead",
    duration: "1 min",
    tag: "Skills",
    tagColor: "#fcb045",
    proves: "82% bot skill-pack coverage across Maximo delivery domains (system-defined — base packs). Gap areas identified for remediation before go-live.",
    detail: "Coverage breakdown: Requirements 91%, Maximo Core 87%, Integration 74%, Mobile 68%, Reporting 79%. Gaps in Integration and Mobile are flagged for skill-pack assignment."
  },
  {
    num: "10",
    title: "No Contract Mobilisation",
    route: "/pfm",
    role: "Admin",
    duration: "30 sec",
    tag: "Flags",
    tagColor: "#833ab4",
    proves: "Contract mobilisation module is disabled at the feature flag level for MAS9 Power. The route exists but the feature is gated off — demonstrating per-tenant feature control.",
    detail: "Feature flag: contract_mobilisation = disabled. The page renders a disabled state with a clear explanation. This proves the customer feature flag system works as intended."
  },
  {
    num: "11",
    title: "Audit Log",
    route: "/audit",
    role: "Auditor",
    duration: "30 sec",
    tag: "Audit",
    tagColor: "#1d9bf0",
    proves: "Immutable activity log covering every workbench action in the session. Demonstrates full traceability for review-only compliance.",
    detail: "Every scan, upload, integration pull, and navigation event is recorded with timestamp, user role, and action type. No events are editable or deletable by any role including Admin."
  },
  {
    num: "12",
    title: "Help Center",
    route: "/help",
    role: "Any role",
    duration: "30 sec",
    tag: "Help",
    tagColor: "#25f4ee",
    proves: "Offline skill packs are available for guided onboarding. The Help Center contains version-locked, curated training paths that work without internet access.",
    detail: "Skill packs are self-contained ZIP modules. No call-home required. Each pack covers a delivery module with worked examples, validation checklists, and role-specific guides."
  }
];

export default function Design2DemoWalkthrough() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col" style={{ backgroundColor: "#0c1220" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-md border-b" style={{ backgroundColor: "rgba(12,18,32,0.9)", borderColor: "#2a3650" }}>
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-[#e7e9ea]">12-Minute Walkthrough</h1>
          <p className="text-sm mt-0.5" style={{ color: "#8b95a7" }}>The MAS9 Power demo — step by step</p>
        </div>
        <div className="flex border-b" style={{ borderColor: "#2a3650" }}>
          <div className="flex-1 relative">
            <div className="py-3 text-[15px] font-bold text-white text-center">
              All Steps
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1d9bf0] rounded-full" />
            </div>
          </div>
          <div className="flex-1">
            <div className="py-3 text-[15px] font-medium text-center" style={{ color: "#8b95a7" }}>12 min total</div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col">
        {STEPS.map((step, i) => {
          const isExpanded = expanded === i;
          return (
            <article
              key={i}
              className="border-b transition-colors cursor-pointer"
              style={{ borderColor: "#2a3650", backgroundColor: isExpanded ? "#1a2235" : "transparent" }}
              onClick={() => setExpanded(isExpanded ? null : i)}
              data-testid={`step-card-${i}`}
            >
              <div className="p-4">
                {/* Step number + title row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-4xl font-black leading-none shrink-0" style={{ color: "#fe2c55" }}>
                      {step.num}
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-bold text-[#e7e9ea] text-[17px] leading-tight">{step.title}</h2>
                      <code className="text-xs mt-0.5 block" style={{ color: "#8b95a7" }}>{step.route}</code>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    {isExpanded
                      ? <ChevronUp className="w-5 h-5" style={{ color: "#8b95a7" }} />
                      : <ChevronDown className="w-5 h-5" style={{ color: "#8b95a7" }} />
                    }
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#1a2235", color: "#e7e9ea", border: "1px solid #2a3650" }}>
                    <User className="w-3 h-3" />
                    {step.role}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: "#1a2235", color: "#e7e9ea", border: "1px solid #2a3650" }}>
                    <Clock className="w-3 h-3" />
                    {step.duration}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: step.tagColor, border: `1px solid ${step.tagColor}40`, backgroundColor: `${step.tagColor}15` }}>
                    <Tag className="w-3 h-3" />
                    {step.tag}
                  </span>
                </div>

                {/* Proves line */}
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#8b95a7" }}>
                  <span className="font-semibold text-[#e7e9ea]">Proves: </span>
                  {step.proves}
                </p>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t text-sm leading-relaxed text-[#e7e9ea]" style={{ borderColor: "#2a3650" }}>
                    {step.detail}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="px-4 py-6 text-xs text-center" style={{ color: "#8b95a7" }}>
        All MAS9 Power data is fictional. No production mutations occur during this walkthrough.
      </div>
    </div>
  );
}
