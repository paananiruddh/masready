import { Link } from "wouter";
import { ArrowRight, ClipboardCheck, Lock, Shield } from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const FEATURES = [
  {
    icon: "⚡",
    title: "Delivery Intelligence",
    desc: "A unified confidence score across every dimension of your Maximo project — aggregated from evidence, not assembled from gut feel.",
    href: "/features",
  },
  {
    icon: "🔍",
    title: "Environment Fingerprint",
    desc: "Automated discovery of installed objects, customisations, and version data. Know exactly what you're working with before you touch anything.",
    href: "/features",
  },
  {
    icon: "🔄",
    title: "Adaptive Regression",
    desc: "Fingerprint your environment and generate the regression tests it actually needs. Not a generic checklist — a living one, shaped by your Maximo.",
    href: "/adaptive-regression",
  },
  {
    icon: "📊",
    title: "Licence Planning",
    desc: "AppPoint trends, named users, mobile pool analysis. Surface your licence exposure before the IBM invoice does.",
    href: "/features",
  },
  {
    icon: "🔒",
    title: "Trust Centre",
    desc: "Zero production mutations. Read-only always. Every evidence ingestion event, approval, and export is logged in an auditable chain of custody.",
    href: "/trust",
  },
  {
    icon: "🚀",
    title: "MAS Readiness",
    desc: "53 checks across 7 domains — from patch impact and customisation fingerprinting through to AppPoints planning and post-migration validation.",
    href: "/audit-checklist",
  },
];

const DOMAINS = [
  { label: "Delivery Intelligence", count: 7, status: "pass" },
  { label: "Trust Centre Compliance", count: 8, status: "warn" },
  { label: "Patch & iFix Impact", count: 8, status: "fail" },
  { label: "Licence Planning Readiness", count: 9, status: "pass" },
  { label: "OpenShift & Infrastructure", count: 7, status: "warn" },
  { label: "Integration & API Readiness", count: 6, status: "pass" },
  { label: "Post-Migration Validation", count: 7, status: "na" },
];

const ROLES = [
  {
    role: "Delivery Manager",
    question: "How confident am I in this delivery? What evidence do I have?",
    answer: "MASReady aggregates bot-generated delivery intelligence into a single review-ready view — so you can walk into a steering committee with evidence, not estimates.",
    href: "/mas9-power",
  },
  {
    role: "Maximo Administrator",
    question: "Which parts of the Maximo configuration have we actually validated?",
    answer: "MASReady maps installed bot skill packs against your Maximo configuration fingerprint, showing exactly what has been assessed and what hasn't.",
    href: "/features",
  },
  {
    role: "Solution Architect",
    question: "Where are the integration gaps in our MAS environment?",
    answer: "MASReady's layered skill-pack model cross-references your as-is configuration against the target state, surfacing gaps the bot has evidence for.",
    href: "/features",
  },
  {
    role: "Security & Governance Lead",
    question: "Can I prove that no unapproved data left the customer boundary?",
    answer: "MASReady's zero-trust governance log records every evidence ingestion event, approval action, and export — an auditable chain of custody.",
    href: "/trust",
  },
  {
    role: "Business Analyst",
    question: "What Maximo functional areas are covered by the current delivery scope?",
    answer: "MASReady skill-pack coverage maps directly to Maximo functional domains — so scope decisions are grounded in what the bot has actually assessed.",
    href: "/architecture",
  },
  {
    role: "IT Asset Manager",
    question: "What is our licence exposure going into the MAS upgrade or governance programme?",
    answer: "MASReady's licence planning view surfaces Maximo licence consumption patterns from available evidence — for planning, not IBM-certified advice.",
    href: "/mas9-power",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      {/* ── Hero ── */}
      <section className="pt-24 pb-20 border-b border-border">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent border border-accent-foreground/20 rounded-full px-4 py-1.5 mb-10">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span className="text-xs font-700 text-primary uppercase tracking-widest font-semibold">
              IBM Maximo · MAS Delivery Intelligence
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            {/* Headline */}
            <div className="lg:col-span-7">
              <h1 className="text-6xl lg:text-7xl font-extrabold leading-[1.03] tracking-tight mb-0">
                Understand your<br />
                Maximo.<br />
                <span className="text-primary">Deliver with certainty.</span>
              </h1>
            </div>

            {/* Copy + CTAs */}
            <div className="lg:col-span-5 pb-2">
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                MASReady helps delivery teams understand, validate, and govern Maximo and MAS environments — using evidence, not estimates. From pre-migration readiness to ongoing operational governance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/industry-previews"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Explore Industry Previews <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/launch"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium rounded-lg hover:bg-card transition-colors"
                >
                  Request a Demo
                </Link>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                Zero production mutations — read-only, always.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/20">
            {[
              { value: "52", label: "Environment audit checks" },
              { value: "100%", label: "Read-only — zero mutations" },
              { value: "7", label: "Maximo delivery domains" },
              { value: "0", label: "External tools required" },
            ].map((s, i) => (
              <div key={i} className="lg:px-8 first:pl-0 last:pr-0">
                <div className="text-4xl font-extrabold text-white tracking-tight mb-1">{s.value}</div>
                <div className="text-xs text-white/70 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial intro ── */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">The Platform</p>
              <h2 className="text-3xl font-extrabold leading-snug tracking-tight">
                A workbench built for Maximo delivery teams.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Most Maximo delivery programmes rely on spreadsheets, tribal knowledge, and best guesses. MASReady replaces that with a single, evidence-backed platform — combining environment fingerprinting, delivery intelligence, adaptive regression testing, and licence planning into one governed workbench.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Entirely read-only. No SQL execution. No Jira writes. No Maximo mutations. Every insight is derived from evidence your team already holds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities grid ── */}
      <section className="py-24 border-b border-border bg-card">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Capabilities</p>
            <h2 className="text-3xl font-extrabold tracking-tight">What the Workbench does.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <a
                key={i}
                href={f.href}
                className="group block bg-background border border-border rounded-xl p-7 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <span className="mt-4 text-xs font-semibold text-primary flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audit Checklist ── */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">MAS Environment Readiness</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-8">
                52 checks.<br />
                7 domains.<br />
                <span className="text-primary">Is your Maximo ready?</span>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-10">
                The MASReady Environment Audit Checklist walks your team through seven domains — from delivery intelligence and trust centre compliance through to AppPoints licence planning and post-migration validation. Fully owned. No external tools required.
              </p>
              <Link
                href="/audit-checklist"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ClipboardCheck className="w-4 h-4" />
                Run the Environment Audit
              </Link>

              <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-border">
                {[
                  { value: "52", label: "Audit checks" },
                  { value: "7", label: "Domains" },
                  { value: "23", label: "SQL hints" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-3xl font-extrabold text-primary tracking-tight mb-1">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain list */}
            <div className="lg:col-span-7 border-t border-border">
              {DOMAINS.map((d, i) => (
                <div key={i} className="flex items-center gap-5 py-5 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    d.status === "pass" ? "bg-emerald-500" :
                    d.status === "warn" ? "bg-amber-500" :
                    d.status === "fail" ? "bg-red-500" : "bg-border"
                  }`} />
                  <span className="text-sm flex-1 font-medium">{d.label}</span>
                  <span className="text-xs text-muted-foreground">{d.count} checks</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    d.status === "pass" ? "text-emerald-700 bg-emerald-50" :
                    d.status === "warn" ? "text-amber-700 bg-amber-50" :
                    d.status === "fail" ? "text-red-700 bg-red-50" : "text-muted-foreground bg-muted"
                  }`}>
                    {d.status === "pass" ? "Pass" : d.status === "warn" ? "Review" : d.status === "fail" ? "Fail" : "—"}
                  </span>
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-5 italic">Sample audit — your results depend on your environment.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-2xl lg:text-3xl font-bold text-white leading-relaxed">
              "Walk into your steering committee with evidence, not estimates. MASReady gives every role in your programme the answer they actually need."
            </p>
            <div className="mt-8">
              <Link
                href="/mas9-power"
                className="inline-flex items-center gap-2 text-white/80 text-sm font-semibold hover:text-white transition-colors"
              >
                See the MAS9 Power Demo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who is this for ── */}
      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Built for your team</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Every role. One platform.</h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed">
              Each role in a Maximo delivery programme asks a different question. MASReady answers all of them from the same source of truth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROLES.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="group block bg-card border border-border rounded-xl p-7 hover:border-primary hover:shadow-md transition-all"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">{item.role}</p>
                <p className="text-sm font-semibold mb-3 leading-snug text-foreground">
                  "{item.question}"
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.answer}</p>
                <span className="mt-5 text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Capture ── */}
      <section className="py-24 border-b border-border bg-card">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <LeadCaptureForm />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28">
        <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">Get started</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                Ready to see MASReady<br />
                <span className="text-primary">in action?</span>
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4">
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                Experience the precision of the Maximo Delivery Automation Workbench in a fully populated demo environment.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/demo-walkthrough"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Take the 12-Minute Walkthrough
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium rounded-lg hover:bg-card transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
