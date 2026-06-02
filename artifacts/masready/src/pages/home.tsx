import { Link } from "wouter";
import { ArrowRight, ClipboardCheck, Lock } from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const STATS = [
  { value: "52", label: "Audit Checks" },
  { value: "0", label: "Production Mutations" },
  { value: "100%", label: "Read-Only" },
  { value: "7", label: "Maximo Domains" },
];

const FEATURES = [
  { num: "01", title: "Delivery Intelligence", desc: "A single, evidence-backed confidence score across every dimension of your Maximo project. No gut feel. No guesswork.", href: "/features" },
  { num: "02", title: "Environment Fingerprint", desc: "Automated scan of installed objects, customisations, and version data — so you know exactly what you're working with.", href: "/features" },
  { num: "03", title: "Adaptive Regression", desc: "Fingerprint your environment, generate the regression tests it actually needs. Not a generic checklist — your checklist.", href: "/adaptive-regression" },
  { num: "04", title: "License Planning", desc: "AppPoint trends, named users, mobile pool analysis. Know your licence exposure before the IBM invoice does.", href: "/features" },
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
  { role: "Delivery Manager", question: "How confident am I in this delivery?", answer: "MASReady aggregates delivery intelligence into a single review-ready view — walk into your steering committee with evidence, not estimates.", href: "/mas9-power" },
  { role: "Maximo Administrator", question: "Which parts of the config have we validated?", answer: "MASReady maps installed skill packs against your Maximo fingerprint, showing exactly what has been assessed and what hasn't.", href: "/features" },
  { role: "Solution Architect", question: "Where are the integration gaps for MAS 9?", answer: "Cross-references your as-is configuration against the upgrade target, surfacing gaps the bot has evidence for and flagging what still needs assessment.", href: "/features" },
  { role: "Security Lead", question: "Can I prove no unapproved data left the boundary?", answer: "MASReady's zero-trust log records every evidence ingestion event, approval action, and export — auditable chain of custody.", href: "/trust" },
  { role: "Business Analyst", question: "What functional areas are in scope?", answer: "Skill-pack coverage maps directly to Maximo functional domains so scope decisions are grounded in what the bot has actually assessed.", href: "/architecture" },
  { role: "IT Asset Manager", question: "What's our licence exposure going into MAS 9?", answer: "Licence planning view surfaces consumption patterns from available evidence — for planning purposes, not IBM-certified advice.", href: "/mas9-power" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">

      {/* ── Hero ── */}
      <section className="border-b border-border pt-28 pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-px bg-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">MAS 9 Delivery Intelligence</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Know your<br />Maximo.<br />
              <span className="text-primary">Ship with<br />confidence.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12 max-w-lg leading-relaxed">
              MASReady helps teams understand, validate, and govern Maximo and MAS environments — using evidence, not estimates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/industry-previews"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
              >
                Explore Industry Previews <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/launch"
                className="inline-flex items-center gap-2 border border-border px-7 py-4 text-sm font-bold uppercase tracking-widest hover:border-foreground transition-colors"
              >
                Request Enterprise Demo
              </Link>
              <Link
                href="/mas9-power"
                className="inline-flex items-center gap-2 border border-primary/40 text-primary px-7 py-4 text-sm font-bold uppercase tracking-widest hover:border-primary transition-colors"
              >
                MAS9 Power Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat Strip ── */}
      <section className="border-b border-border py-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
            {STATS.map((s, i) => (
              <div key={i} className="px-8 py-4 first:pl-0">
                <div className="text-4xl lg:text-5xl font-black text-primary mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="border-b border-border py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-start justify-between mb-16 flex-wrap gap-8">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What the<br />Workbench does.
            </h2>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed self-end">
              One platform. Every Maximo delivery question answered from a single source of truth.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 border border-border">
            {FEATURES.map((f, i) => (
              <a
                key={i}
                href={f.href}
                className={`group p-10 hover:bg-card transition-colors ${
                  i === 0 ? "border-b border-r border-border" :
                  i === 1 ? "border-b border-border" :
                  i === 2 ? "border-r border-border" : ""
                }`}
              >
                <div className="text-xs font-black text-primary uppercase tracking-widest mb-6">{f.num}</div>
                <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">{f.desc}</p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audit Checklist ── */}
      <section className="border-b border-border py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">New · MAS 9 Environment Audit</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                52 checks.<br />
                Is your Maximo<br />
                <span className="text-primary">ready for MAS 9?</span>
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed text-sm">
                The MASReady Environment Audit Checklist walks you through 7 domains — from delivery intelligence and trust centre compliance through to AppPoints licence planning and post-migration validation. Fully owned. No external tools.
              </p>
              <Link
                href="/audit-checklist"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-4 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
              >
                <ClipboardCheck className="w-4 h-4" />
                Run the Environment Audit
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-border">
                {[
                  { value: "52", label: "Audit Checks" },
                  { value: "7", label: "Domains" },
                  { value: "23", label: "SQL Hints" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-4xl font-black text-primary mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border">
              {DOMAINS.map((d, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-background/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    d.status === "pass" ? "bg-green-500" :
                    d.status === "warn" ? "bg-amber-400" :
                    d.status === "fail" ? "bg-red-500" : "bg-muted-foreground/40"
                  }`} />
                  <span className="text-sm font-semibold flex-1">{d.label}</span>
                  <span className="text-xs text-muted-foreground font-medium">{d.count} checks</span>
                  <span className={`text-xs font-black uppercase tracking-wide ${
                    d.status === "pass" ? "text-green-500" :
                    d.status === "warn" ? "text-amber-400" :
                    d.status === "fail" ? "text-red-500" : "text-muted-foreground"
                  }`}>
                    {d.status === "pass" ? "Pass" : d.status === "warn" ? "Review" : d.status === "fail" ? "Fail" : "N/A"}
                  </span>
                </div>
              ))}
              <div className="px-6 py-3 bg-background/30">
                <p className="text-xs text-muted-foreground">Sample audit — your results depend on your environment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Signal ── */}
      <section className="border-b border-border py-10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-8 flex-wrap justify-between">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 border-2 border-primary flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-widest">Zero Production Mutations</div>
                <div className="text-xs text-muted-foreground mt-0.5">No SQL exec · No Jira write · No Maximo write</div>
              </div>
            </div>
            <Link
              href="/mas9-power"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:underline"
            >
              See the MAS9 Power Demo <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who is this for ── */}
      <section className="border-b border-border py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Built for your team.
          </h2>
          <p className="text-muted-foreground mb-16 max-w-lg text-sm leading-relaxed">
            Each role asks a different question. MASReady answers all of them from one platform.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-border">
            {ROLES.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className={`group p-7 hover:bg-card transition-colors border-border ${
                  i < 3 ? "border-b" : ""
                } ${
                  i % 3 !== 2 ? "border-r" : ""
                }`}
              >
                <div className="text-xs font-black text-primary uppercase tracking-widest mb-4">{item.role}</div>
                <div className="font-bold text-sm mb-3 leading-snug">"{item.question}"</div>
                <div className="text-muted-foreground text-xs leading-relaxed">{item.answer}</div>
                <div className="mt-4 text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Capture ── */}
      <section className="border-b border-border py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-8">
          <LeadCaptureForm />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 bg-primary">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-7xl font-black tracking-tight mb-6 text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to see<br />MASReady in action?
          </h2>
          <p className="text-white/70 mb-14 text-lg max-w-xl mx-auto">
            Experience the precision of the Maximo Delivery Automation Workbench.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo-walkthrough"
              className="inline-flex items-center gap-2 bg-white text-primary px-9 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-colors"
            >
              Take the 12-Minute Walkthrough
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/40 text-white px-9 py-4 text-sm font-bold uppercase tracking-widest hover:border-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
