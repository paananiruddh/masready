export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "hr" }
  | { type: "callout"; text: string };

export interface NewsArticle {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  displayDate: string;
  category: string;
  readTime: string;
  summary: string;
  content: ContentBlock[];
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "maximo-security-profiles-mas-9",
    title: "Your Maximo security groups are lying to you. Here's how we fix that.",
    subtitle: "A read-only way to understand Maximo security groups, baseline roles, and MAS 9 access complexity before it becomes upgrade risk.",
    date: "2026-06-05",
    displayDate: "5 June 2026",
    category: "Product Update",
    readTime: "5 min read",
    summary: "MASReady is adding Security Profiles — a read-only governance module that turns raw Maximo security group data into role-based clarity before the complexity carries into MAS 9.",
    content: [
      {
        type: "paragraph",
        text: "I've been inside enough Maximo environments to spot the pattern immediately. Open MAXGROUP. There are 60, 70, sometimes over 100 groups. Half of them have names like MXGRP_WO_CREATE_PROD_COPY_FINAL_v2. Nobody remembers who created them, what project they came from, or whether they're still needed. And the wildest part? Nobody knows if removing them would break anything.",
      },
      {
        type: "paragraph",
        text: "This is security sprawl. And it's almost universal in mature Maximo estates.",
      },
      { type: "hr" },
      {
        type: "heading",
        text: "Why it happens",
      },
      {
        type: "paragraph",
        text: "Nobody sets out to build a chaotic security model. It accumulates. A project needs a slightly different permission set, so someone clones a group instead of extending it. A DR environment gets stood up and the groups come with it. A temporary exception from 2019 never gets cleaned up. Multiply that across four years and three environments and you end up with a security estate nobody can describe confidently — not even the people who built it.",
      },
      {
        type: "paragraph",
        text: "The downstream effects are real and expensive:",
      },
      {
        type: "list",
        items: [
          "Audits take longer because nobody can explain why a reporting role has edit access",
          "Onboarding is harder because there's no clear baseline to point new users at",
          "MAS 9 migrations carry the complexity forward when it could have been rationalised first",
          "Licence planning becomes guesswork because broad-access groups hide what people actually need",
        ],
      },
      { type: "hr" },
      {
        type: "heading",
        text: "We built something about it",
      },
      {
        type: "paragraph",
        text: "At MASReady, we've been building tooling that takes the grunt work out of Maximo upgrade preparation. Our latest feature is Security Profiles — a read-only planning and governance module that turns raw security group data into role-based clarity.",
      },
      {
        type: "paragraph",
        text: "It connects to your Maximo environment via the REST/JSON API (or OSLC, or a sanitised file extract if you're in a locked-down environment), ingests MAXGROUP, APPLICATIONAUTH, GROUPUSER, and optional SIGOPTION, and runs the data through a set of scoring and clustering algorithms.",
      },
      {
        type: "callout",
        text: "No write-back. No changes to Maximo. Nothing moves unless you decide it should.",
      },
      { type: "hr" },
      {
        type: "heading",
        text: "What you actually see",
      },
      {
        type: "heading",
        text: "Screen 1 — Security Overview",
      },
      {
        type: "image",
        src: "/news/screen1_overview.jpg",
        alt: "Security Overview dashboard showing KPI tiles: 66 groups, 200 users, 5 baseline roles, 4 merge candidates, 2 waste flags, 76 estimated AppPoint saving",
        caption: "The Security Overview dashboard — total groups, users, baseline roles detected, merge candidates, waste flags, and an AppPoint saving estimate.",
      },
      {
        type: "paragraph",
        text: "The moment analysis completes you get a live dashboard — total groups, users covered, baseline roles detected, merge candidates, waste flags, and an assumption-based AppPoint saving estimate. Not a spreadsheet. A living view updated every time you run an analysis.",
      },
      { type: "hr" },
      {
        type: "heading",
        text: "Screen 2 — Baseline Roles",
      },
      {
        type: "image",
        src: "/news/screen2_baseline_roles.jpg",
        alt: "Baseline Roles screen showing five role cards: Planner/Scheduler, Maintenance Supervisor, Mobile Technician, Report-only User, Integration Operator — each with confidence scores and permission pills",
        caption: "Five baseline roles inferred from 66 groups — each with confidence score, user count, and source group mapping.",
      },
      {
        type: "paragraph",
        text: "Instead of showing you 66 groups, the tool identifies the underlying access patterns: Planner/Scheduler, Maintenance Supervisor, Mobile Technician, Report-only User, Integration Operator. Each role card shows user count, confidence score, core permissions, optional overlays, and which source groups it was inferred from. For the first time, your Maximo admin can explain the estate in five sentences rather than a spreadsheet tour.",
      },
      { type: "hr" },
      {
        type: "heading",
        text: "Screen 3 — Group Sprawl",
      },
      {
        type: "image",
        src: "/news/screen3_group_sprawl.jpg",
        alt: "Group Sprawl screen showing four clusters — Planner (merge candidate), Supervisor (merge candidate), Report Users (waste flag), Mobile (well-formed) — with a detail panel showing scores for MAINT_SUPERVISOR_C",
        caption: "Groups clustered by similarity. Merge candidates and waste flags surfaced with full source evidence.",
      },
      {
        type: "paragraph",
        text: "This is where the tool earns its keep. Groups are clustered by similarity. A supervisor group with 4 users that's 97% identical to one with 19 users gets flagged immediately. A report-only group with WOTRACK:SAVE in it gets a red badge. Every flag has source evidence attached so you can verify it yourself.",
      },
      { type: "hr" },
      {
        type: "heading",
        text: "Screen 4 — Scenario Simulator",
      },
      {
        type: "image",
        src: "/news/screen4_scenarios.jpg",
        alt: "Scenario Simulator showing a merge of MAINT_SUPERVISOR_B and C with before/after comparison: groups 2→1, permissions 10→8, AppPoints 184→176, and an export to review pack",
        caption: "What-if previews with before/after comparison — output is a review pack, not a change script.",
      },
      {
        type: "paragraph",
        text: "Before anyone touches anything in Maximo, admins and architects can run what-if previews. Merge these two groups. Move this cohort to a baseline role. The output is a before/after comparison and an exportable review pack — not a change script.",
      },
      { type: "hr" },
      {
        type: "heading",
        text: "Screen 5 — Evidence",
      },
      {
        type: "image",
        src: "/news/screen5_evidence.jpg",
        alt: "Evidence drawer showing source rows from APPLICATIONAUTH, GROUPUSER and MAXGROUP, plus score breakdown, assumptions, and rule hits for recommendation rec-001",
        caption: "Every recommendation traces to specific rows in APPLICATIONAUTH, GROUPUSER, and MAXGROUP. Nothing is a black box.",
      },
      {
        type: "paragraph",
        text: "Every recommendation traces back to specific rows in APPLICATIONAUTH, GROUPUSER, and MAXGROUP. Every score shows the factor breakdown. Every assumption is visible and configurable. Nothing is a black box.",
      },
      { type: "hr" },
      {
        type: "heading",
        text: "Why read-only matters",
      },
      {
        type: "paragraph",
        text: "We made a deliberate decision that Security Profiles would never write back to Maximo and never trigger changes automatically. In enterprise environments — especially regulated ones, managed service contracts, or customers with strict production access controls — you need a tool that can be used safely without a governance approval for every run.",
      },
      {
        type: "paragraph",
        text: "The value is the insight and the review pack, not the automation.",
      },
      { type: "hr" },
      {
        type: "heading",
        text: "Who this is built for",
      },
      {
        type: "paragraph",
        text: "If you're heading into a MAS 8 or MAS 9 migration and security group rationalisation is on the scope, this was built for you. Also if you've ever had to explain your Maximo security design to an auditor and found yourself saying \"it's complicated.\"",
      },
      {
        type: "paragraph",
        text: "Security Profiles is live on MASReady now. The goal is simple: arrive at MAS 9 with a security design you can actually explain.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
