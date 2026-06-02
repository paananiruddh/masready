import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowRight, Lock, Zap, CheckCircle2 } from "lucide-react";
import { getIndustry } from "@/lib/industryData";
import { cn } from "@/lib/utils";

export default function PreviewGate() {
  const { industry: industrySlug } = useParams<{ industry: string }>();
  const industry = getIndustry(industrySlug ?? "");

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-3">Industry preview not found</h1>
          <p className="text-muted-foreground mb-6">That industry preview does not exist. Choose from the available previews below.</p>
          <Link href="/industry-previews" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
            View All Industry Previews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const titleStr = `${industry.title} MASReady Synthetic Preview`;
  const descStr = `Explore a time-limited synthetic IBM Maximo preview for ${industry.title.toLowerCase()} operations, including assets, work management, regression intelligence, environment fingerprinting, and MAS readiness insights.`;

  return (
    <div className="min-h-screen">
      {/* SEO metadata (client-side title update) */}
      {typeof document !== "undefined" && (() => {
        document.title = `${titleStr} | Maximo Delivery Automation Workbench`;
        return null;
      })()}

      {/* Hero gate */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link href="/industry-previews" className="hover:text-foreground transition-colors">Industry Previews</Link>
              <span>/</span>
              <span className={industry.color}>{industry.title}</span>
            </div>

            {/* Title */}
            <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-4", industry.border, industry.color, "bg-card")}>
              {industry.title} Industry Preview
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              {titleStr}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {descStr}
            </p>

            {/* Gate explanation */}
            <div className="rounded-xl border border-border bg-card p-6 mb-8">
              <h2 className="text-base font-bold mb-2">Start a time-limited MASReady preview</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Synthetic previews require a 2-hour preview session so MASReady can keep public demo access controlled and auditable.
                Preview sessions are browser-scoped and expire automatically — no data is stored after your session ends.
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Public previews use fixed synthetic baseline data and runtime-only personalisation. Preview links expire after 2 hours.
                Persisted private demos and secure connected assessments are available by request.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/preview-studio?industry=${industry.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4" /> Start {industry.title} Preview
              </Link>
              <Link
                href="/launch?mode=persisted#demo-form"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all hover:-translate-y-0.5"
              >
                <Lock className="w-4 h-4" /> Request Persisted Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEO teaser content */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Typical assets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn("rounded-2xl border p-6", industry.border, `bg-gradient-to-b ${industry.bg} to-card/70`)}
            >
              <h3 className={cn("text-sm font-bold uppercase tracking-wider mb-4", industry.color)}>Typical Assets</h3>
              <ul className="space-y-2">
                {industry.assets.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className={cn("w-3.5 h-3.5 shrink-0", industry.color)} />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Work types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-muted-foreground">Work Types in Preview</h3>
              <ul className="space-y-2">
                {industry.workTypes.map((w) => (
                  <li key={w} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* MASReady insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-muted-foreground">What the Preview Includes</h3>
              <ul className="space-y-2">
                {industry.insights.map((ins) => (
                  <li key={ins} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                    {ins}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Integration types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-muted-foreground">Integration Context</h3>
              <ul className="space-y-2">
                {industry.integrations.map((int) => (
                  <li key={int} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    {int}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/8 to-accent/5 p-8 text-center"
          >
            <h3 className="text-xl font-bold mb-3">Ready to explore the {industry.title} preview?</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-lg mx-auto leading-relaxed">
              Start a 2-hour session-scoped preview from the Preview Studio. Your session is browser-scoped, runtime-only, and includes no production data.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={`/preview-studio?industry=${industry.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4" /> Start {industry.title} Preview Studio <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/industry-previews"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all hover:-translate-y-0.5"
              >
                All Industry Previews
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
