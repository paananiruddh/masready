/* MASReady — Scenario data for the animated simulator */
var MASREADY_SCENARIOS = [
  {
    id: "mas9-power",
    title: "MAS 9 Energy & Utilities",
    demoName: "MAS9 Power",
    version: "IBM Maximo Application Suite Manage 9.x",
    industry: "Energy & Utilities",
    dataMode: "customer_hosted demo fixture",
    integration: "Jira read-only",
    enabledFeatures: [
      "Delivery Intelligence",
      "Patch Impact",
      "License Usage Planning",
      "Environment Fingerprint",
      "Skill Coverage",
      "Trust Center"
    ],
    metrics: {
      customisations: 46,
      impactedItems: 7,
      critical: 0,
      high: 2,
      medium: 3,
      low: 2,
      appPointsUsed: 1847,
      appPointsEntitled: 2400,
      utilisation: 77,
      namedUsers: 94,
      activeUsers: 71,
      readinessScore: 87
    },
    results: [
      "Patch impact report ready",
      "Licence planning summary ready",
      "UAT retest required",
      "Review-only output"
    ]
  },
  {
    id: "legacy-upgrade",
    title: "Maximo 7.6.x Upgrade Readiness",
    demoName: "Legacy Upgrade Readiness",
    version: "Maximo 7.6.x",
    industry: "Government / Asset Intensive",
    dataMode: "demo / assetize_managed fixture",
    integration: "Jira read-only",
    enabledFeatures: [
      "EOS Awareness",
      "Patch Impact",
      "Upgrade Readiness",
      "Environment Drift",
      "Skill Coverage"
    ],
    metrics: {
      customisations: 38,
      impactedItems: 11,
      critical: 0,
      high: 3,
      medium: 5,
      low: 3,
      readinessScore: 72
    },
    results: [
      "Upgrade readiness report ready",
      "iFix impact summary ready",
      "Technical remediation backlog ready",
      "Executive warning banner generated"
    ]
  },
  {
    id: "contract-mobilisation",
    title: "MAS 9 Contract Mobilisation",
    demoName: "Contract Mobilisation",
    version: "MAS 9 / Manage 9.x",
    industry: "Facilities / Services",
    dataMode: "customer_hosted demo fixture",
    integration: "Azure DevOps read-only",
    enabledFeatures: [
      "Requirement Intake",
      "Contract/Site Onboarding",
      "Generated Runbook",
      "Skill Coverage",
      "Audit Trail"
    ],
    metrics: {
      onboardingModules: 12,
      validationChecks: 36,
      runbookSections: 9,
      blockedAssumptions: 4,
      readinessScore: 88
    },
    results: [
      "Mobilisation runbook ready",
      "Environment checklist ready",
      "Role/task matrix ready",
      "Review package ready"
    ]
  }
];
