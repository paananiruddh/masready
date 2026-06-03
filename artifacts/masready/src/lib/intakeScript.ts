export type StepType = "welcome" | "text" | "chips" | "multi-chips" | "textarea" | "summary";

export interface IntakeStep {
  id: string;
  type: StepType;
  question: string;
  fields?: { key: string; placeholder: string }[];
  options?: string[];
  optional?: boolean;
}

export interface IntakeAnswers {
  name?: string;
  org?: string;
  industry?: string;
  platform?: string;
  scale?: string;
  focusAreas?: string[];
  painPoint?: string;
  timeline?: string;
}

export const INTAKE_STEPS: IntakeStep[] = [
  {
    id: "welcome",
    type: "welcome",
    question:
      "Hi, I'm the MASReady intake assistant. I'll ask you a few quick questions about your Maximo environment so we can prepare the right conversation.",
  },
  {
    id: "name-org",
    type: "text",
    question: "What's your name and organisation?",
    fields: [
      { key: "name", placeholder: "Your name" },
      { key: "org", placeholder: "Organisation" },
    ],
  },
  {
    id: "industry",
    type: "chips",
    question: "Which industry are you in?",
    options: [
      "Utilities",
      "Transport",
      "Government",
      "Mining",
      "Facilities Management",
      "Power Generation",
      "Water & Wastewater",
      "Rail",
      "Roads & Highways",
      "Airports",
      "Other",
    ],
  },
  {
    id: "platform",
    type: "chips",
    question: "Which IBM Maximo platform are you currently on?",
    options: [
      "Maximo 7.x (on-prem)",
      "MAS 8 (SaaS/cloud)",
      "MAS 9 (latest)",
      "Multiple / mixed",
      "Not sure yet",
    ],
  },
  {
    id: "scale",
    type: "chips",
    question: "Roughly how many Maximo users do you have?",
    options: ["Under 50", "50–200", "200–500", "500–1,000", "Over 1,000"],
  },
  {
    id: "focusAreas",
    type: "multi-chips",
    question: "Which areas are you looking to improve? Select all that apply.",
    options: [
      "Work Orders & Scheduling",
      "Asset Management",
      "Preventive Maintenance",
      "Licensing & Cost Optimisation",
      "MAS 9 Upgrade",
      "Environment Fingerprinting",
      "Reporting & Analytics",
      "Integrations",
      "Training & Adoption",
      "Other",
    ],
  },
  {
    id: "painPoint",
    type: "textarea",
    question: "What's your biggest pain point right now?",
    optional: true,
  },
  {
    id: "timeline",
    type: "chips",
    question: "What's your timeline for moving forward?",
    options: [
      "Within 3 months",
      "3–6 months",
      "6–12 months",
      "Just exploring",
    ],
  },
  {
    id: "summary",
    type: "summary",
    question: "Here's your requirements summary.",
  },
];

export function buildSummaryText(answers: IntakeAnswers): string {
  const now = new Date();
  const date = now.toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const lines = [
    "MASReady — Requirement Intake Summary",
    "======================================",
    `Name:         ${answers.name || "Not provided"}`,
    `Organisation: ${answers.org || "Not provided"}`,
    `Industry:     ${answers.industry || "Not provided"}`,
    `Platform:     ${answers.platform || "Not provided"}`,
    `Scale:        ${answers.scale || "Not provided"}`,
    `Focus areas:  ${answers.focusAreas?.length ? answers.focusAreas.join(", ") : "Not provided"}`,
    `Pain point:   ${answers.painPoint?.trim() || "Not specified"}`,
    `Timeline:     ${answers.timeline || "Not provided"}`,
    `Generated:    ${date}`,
  ];

  return lines.join("\n");
}

export const STORAGE_KEY = "masready_intake_v1";

export interface IntakeState {
  stepIndex: number;
  answers: IntakeAnswers;
  isOpen: boolean;
}

export function loadIntakeState(): IntakeState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as IntakeState;
  } catch {
    return null;
  }
}

export function saveIntakeState(state: IntakeState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

export function clearIntakeState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
