import { motion } from "framer-motion";
import { Link } from "wouter";
import { Activity, UploadCloud, Fingerprint, Crosshair, PieChart, PackageCheck, Target, ShieldCheck, History, BookOpen, Database, ToggleLeft, CheckCircle2, AlertTriangle, Code2, ArrowRight, ClipboardCheck } from "lucide-react";

const FEATURES = [
  { title: "Delivery Intelligence", icon: Activity, desc: "Unified delivery confidence score across all project dimensions to assess readiness instantly." },
  { title: "Requirement Intake", icon: UploadCloud, desc: "Structured intake of customer requirements with auditable evidence links." },
  { title: "Maximo Fingerprint", icon: Fingerprint, desc: "Automated scan of installed objects, customisations, and detailed versioning." },
  { title: "Patch Impact", icon: Crosshair, desc: "Cross-reference patch/iFix content against your environment fingerprint for targeted risk assessment." },
  { title: "License Planning", icon: PieChart, desc: "AppPoint trends, named user tracking, and mobile pool analysis for capacity visibility." },
  { title: "Offline Skill Packs", icon: PackageCheck, desc: "Downloadable, air-gapped, self-contained skill modules for secure environments." },
  { title: "Bot Skill-Pack Coverage", icon: Target, desc: "Map installed bot skill packs against Maximo delivery domains — showing what has been assessed and what hasn't." },
  { title: "Trust Center", icon: ShieldCheck, desc: "Audit-first, read-only design with comprehensive immutable trace capture." },
  { title: "Audit Trail", icon: History, desc: "Immutable cryptographic log of all workbench activity for compliance." },
  { title: "Controlled Learning", icon: BookOpen, desc: "Curated, version-locked training paths aligned to actual environment needs." },
  { title: "Data Boundary", icon: Database, desc: "Customer-hosted data model where no data leaves the physical or logical boundary." },
  { title: "Feature Flags", icon: ToggleLeft, desc: "Per-tenant configuration of enabled/disabled features for strict scope control." },
  { title: "Adaptive Regression Intelligence", icon: Code2, desc: "Generate and maintain a customer-specific Playwright regression suite from the Maximo environment fingerprint. Coverage grows and shrinks as components, add-ons, and integrations change." },
  { title: "Environment Audit Checklist", icon: ClipboardCheck, desc: "52-point pre-migration assessment covering delivery intelligence, trust center compliance, patch impact, and AppPoints license planning for Maximo 7.6.x to MAS 9 transitions." },
];

const SEED_CHECKLIST = [
  "23 seed data files covering users, assets, work orders, customisations, and integrations",
  "All data is fictional — no real customer, site, or asset information is present",
  "Seed data drives the simulator, charts, patch impact analysis, and license planning outputs",
  "7 demo user roles seeded: Admin, Delivery Lead, Asset Manager, Scheduler, Field Tech, Finance, Auditor",
  "Energy & Utilities asset classes: substations, transformers, transmission lines, smart meters, control systems",
  "Seed data is version-locked per demo tenant — updates are explicit and auditable",
];

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6">Complete Delivery Arsenal</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Every tool required to analyze, plan, and execute IBM Maximo delivery with total confidence and zero guesswork.
        </p>
      </div>

      {/* Seed Data Stage Card — Stage 2 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 overflow-hidden"
      >
        {/* Stage header */}
        <div className="flex items-center gap-4 px-8 py-5 border-b border-accent/20 bg-accent/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-accent/70 mb-0.5">Stage 2</div>
              <div className="text-xl font-bold text-white">Seed Data</div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-400">Active — MAS9 Power</span>
          </div>
        </div>

        <div className="px-8 py-7 grid md:grid-cols-2 gap-8">
          {/* Left — description + checklist */}
          <div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              23 structured JSON seed files defining the fictional demo tenant environment, users, assets, and work orders. All data is fictional — no real customer, site, or asset information is present.
            </p>
            <ul className="space-y-3">
              {SEED_CHECKLIST.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-snug">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right — stats grid */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "23", label: "Seed Files" },
                { value: "7", label: "User Roles" },
                { value: "5", label: "Asset Classes" },
                { value: "46", label: "Customisations" },
                { value: "7", label: "Patch Impacts" },
                { value: "0", label: "Real Records" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-background/40 p-3 text-center">
                  <div className="text-2xl font-bold text-white mb-0.5">{s.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Safety callout */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="text-amber-400 font-semibold">Fictional data only.</span>
                <span className="text-muted-foreground"> All emails use <code className="text-amber-300/70 text-xs">@mas9power.demo</code>. No real customer, site, or asset data is included in the seed files.</span>
              </div>
            </div>

            {/* Footer badge */}
            <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-accent font-semibold">MAS9 Power</span>
              <span className="text-white/20">→</span>
              <span className="text-muted-foreground">23 files</span>
              <span className="text-white/20">·</span>
              <span className="text-muted-foreground">7 users</span>
              <span className="text-white/20">·</span>
              <span className="text-muted-foreground">5 asset classes</span>
              <span className="text-white/20">·</span>
              <span className="text-muted-foreground">fictional MAS9 Power energy tenant</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Feature cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-white/10 bg-card p-6 flex flex-col hover:bg-white/5 transition-all hover:-translate-y-1 hover:border-white/20 group cursor-default"
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-6 group-hover:scale-110 transition-transform">
              <f.icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-3">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Adaptive Regression Intelligence spotlight */}
      <section className="mt-24 pt-16 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-primary/5 overflow-hidden"
        >
          <div className="flex items-center gap-4 px-8 py-5 border-b border-violet-500/15 bg-violet-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-violet-400/70 mb-0.5">New Feature</div>
                <div className="text-xl font-bold text-white">Adaptive Regression Intelligence</div>
              </div>
            </div>
          </div>

          <div className="px-8 py-7 grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                MASReady uses the Maximo environment fingerprint to produce a customer-specific Playwright regression pack. As new add-ons, industry solutions, scripts, integrations, workflows, and UI changes are detected, MASReady reviews the impact and recommends test additions, removals, or updates — always with human review before any test reaches a pipeline.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                <strong className="text-white">Your Maximo environment changes. Your regression suite should change with it.</strong>
              </p>
              <Link href="/adaptive-regression" className="inline-flex items-center gap-2 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300 px-5 py-2.5 text-sm font-semibold hover:bg-violet-500/30 transition-all hover:-translate-y-0.5">
                Explore Adaptive Regression Intelligence <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {[
                "Generated from environment fingerprint — not manually authored",
                "Coverage grows or shrinks as installed components change",
                "Drift detection triggers targeted test recommendations",
                "Human review required before any test reaches CI/CD",
                "Exported as standard TypeScript Playwright files",
                "Read-only fingerprinting — no Maximo mutation at any stage",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-snug">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Data ingestion paths */}
      <section className="mt-24 pt-16 border-t border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Two paths in. Same intelligence out.</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not every customer can open a live API connection on day one. MASReady works either way.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-xl border border-white/10 bg-card p-8">
            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Path A — Live API</div>
            <h3 className="text-xl font-bold mb-4">Read-only connector</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">→</span> Maximo OSLC / REST endpoint</li>
              <li className="flex gap-2"><span className="text-primary">→</span> Read-only API token (never stored in browser)</li>
              <li className="flex gap-2"><span className="text-primary">→</span> Real-time environment fingerprint</li>
              <li className="flex gap-2"><span className="text-primary">→</span> Live customisation scan</li>
              <li className="flex gap-2"><span className="text-primary">→</span> Zero mutations — read scope only</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-card p-8">
            <div className="text-xs font-bold uppercase tracking-wider text-accent mb-3">Path B — Customer Extracts</div>
            <h3 className="text-xl font-bold mb-4">File upload — no API needed</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-accent">→</span> CSV / JSON export from Maximo admin</li>
              <li className="flex gap-2"><span className="text-accent">→</span> Upload via secure intake</li>
              <li className="flex gap-2"><span className="text-accent">→</span> Same patch impact, licence planning, and fingerprint outputs</li>
              <li className="flex gap-2"><span className="text-accent">→</span> Fully anonymisable before upload</li>
              <li className="flex gap-2"><span className="text-accent">→</span> No live connection to customer systems required</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
