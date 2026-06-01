import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Zap, Truck, Building2, Pickaxe, Building, Flame, Droplets, Train, Navigation, PlaneTakeoff, Info } from "lucide-react";

const INDUSTRIES = [
  {
    icon: Zap,
    title: "Utilities",
    slug: "utilities",
    color: "text-yellow-400",
    border: "border-yellow-400/25",
    bg: "from-yellow-400/10",
    assets: ["Substations", "Transformers", "Smart meters", "Distribution lines"],
    workTypes: ["Preventive PM", "Corrective", "Inspection", "Emergency dispatch"],
    integrations: ["SCADA", "GIS", "SAP", "Meter data systems"],
    insights: ["Upgrade risk scoring", "Regression coverage", "AppPoints analysis", "Drift alerts"],
  },
  {
    icon: Truck,
    title: "Transport",
    slug: "transport",
    color: "text-blue-400",
    border: "border-blue-400/25",
    bg: "from-blue-400/10",
    assets: ["Fleet vehicles", "Depots", "Road infrastructure", "Signalling"],
    workTypes: ["Scheduled maintenance", "Breakdown response", "Compliance inspection"],
    integrations: ["Fleet telemetry", "GIS", "Finance", "IoT sensors"],
    insights: ["MAS 9 readiness", "Integration gap analysis", "Skill pack coverage", "Governance checklist"],
  },
  {
    icon: Building2,
    title: "Government",
    slug: "government",
    color: "text-indigo-400",
    border: "border-indigo-400/25",
    bg: "from-indigo-400/10",
    assets: ["Public buildings", "Parks", "Roads", "Utilities infrastructure"],
    workTypes: ["Statutory inspection", "Corrective", "Capital works", "Compliance"],
    integrations: ["Finance system", "Document management", "GIS", "Citizen portals"],
    insights: ["Compliance readiness", "Audit trail review", "Licensing analysis", "Environment fingerprint"],
  },
  {
    icon: Pickaxe,
    title: "Mining",
    slug: "mining",
    color: "text-orange-400",
    border: "border-orange-400/25",
    bg: "from-orange-400/10",
    assets: ["Heavy equipment", "Processing plant", "Conveyors", "Site infrastructure"],
    workTypes: ["Condition-based PM", "Safety inspection", "Shutdown planning", "Corrective"],
    integrations: ["SAP", "PLC/SCADA", "Safety systems", "Procurement"],
    insights: ["Shutdown readiness", "Regression packs", "AI skill pack answers", "Drift findings"],
  },
  {
    icon: Building,
    title: "Facilities",
    slug: "facilities",
    color: "text-green-400",
    border: "border-green-400/25",
    bg: "from-green-400/10",
    assets: ["HVAC", "Elevators", "Electrical systems", "Building fabric"],
    workTypes: ["Planned PM", "Reactive", "Contract compliance", "Statutory"],
    integrations: ["BMS", "Energy management", "Finance", "Contract portals"],
    insights: ["Contract readiness", "Compliance scoring", "AppPoints utilisation", "Upgrade risk"],
  },
  {
    icon: Flame,
    title: "Power Generation",
    slug: "power",
    color: "text-red-400",
    border: "border-red-400/25",
    bg: "from-red-400/10",
    assets: ["Turbines", "Generators", "Cooling systems", "Control rooms"],
    workTypes: ["Outage planning", "Predictive maintenance", "Regulatory compliance", "Emergency response"],
    integrations: ["DCS", "SCADA", "Energy trading", "Safety systems"],
    insights: ["Outage readiness", "Regression coverage", "Trust boundary review", "Skill pack gaps"],
  },
  {
    icon: Droplets,
    title: "Water",
    slug: "water",
    color: "text-cyan-400",
    border: "border-cyan-400/25",
    bg: "from-cyan-400/10",
    assets: ["Pump stations", "Treatment plants", "Pipelines", "Reservoirs"],
    workTypes: ["Field maintenance", "Compliance inspection", "Reactive repair", "Scheduled PM"],
    integrations: ["SCADA", "GIS", "Laboratory", "Customer billing"],
    insights: ["Compliance readiness", "Upgrade risk scoring", "Regression packs", "Environment fingerprint"],
  },
  {
    icon: Train,
    title: "Rail",
    slug: "rail",
    color: "text-violet-400",
    border: "border-violet-400/25",
    bg: "from-violet-400/10",
    assets: ["Rolling stock", "Trackside assets", "Depots", "Stations"],
    workTypes: ["PM scheduling", "Corrective maintenance", "Mobility workflows", "Safety compliance"],
    integrations: ["Fleet management", "Signalling", "Crew management", "Safety systems"],
    insights: ["MAS 9 readiness scoring", "Regression packs", "Drift findings", "Skill pack coverage"],
  },
  {
    icon: Navigation,
    title: "Roads",
    slug: "roads",
    color: "text-amber-400",
    border: "border-amber-400/25",
    bg: "from-amber-400/10",
    assets: ["Road network", "Bridges", "Tunnels", "Traffic systems"],
    workTypes: ["Routine maintenance", "Capital renewal", "Inspection", "Emergency response"],
    integrations: ["GIS", "Traffic management", "Finance", "Contractor portals"],
    insights: ["Asset readiness", "Upgrade risk", "Governance checklist", "Licensing analysis"],
  },
  {
    icon: PlaneTakeoff,
    title: "Airports",
    slug: "airports",
    color: "text-sky-400",
    border: "border-sky-400/25",
    bg: "from-sky-400/10",
    assets: ["Runways", "Terminal systems", "Ground equipment", "Airside infrastructure"],
    workTypes: ["Airside compliance", "Planned PM", "Emergency response", "Lifecycle management"],
    integrations: ["AODB", "Safety management", "Finance", "Procurement"],
    insights: ["Compliance readiness", "Regression coverage", "AI skill pack answers", "Environment fingerprint"],
  },
];

export default function IndustryPreviews() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-accent/8" />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.14) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6"
          >
            <Zap className="w-3 h-3" /> Synthetic Preview Studio
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-[1.1]"
          >
            Explore MASReady Through{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Your Industry
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Start with a curated synthetic Maximo-style environment shaped for your sector. Add optional
            runtime-only details to make the preview feel closer to your world — with no production data required.
          </motion.p>

          {/* Privacy notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-start gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>Your answers personalise this preview in memory only. MASReady does not store your company details, screenshots, or environment information in the public preview.</span>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/launch" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5">
              Request Persisted Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all hover:-translate-y-0.5">
              Contact MASReady
            </Link>
          </div>
        </div>
      </section>

      {/* Industry cards */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {INDUSTRIES.map((industry, i) => (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border ${industry.border} bg-gradient-to-b ${industry.bg} to-card/70 p-6 flex flex-col gap-5 hover:-translate-y-1 transition-all duration-200`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-card border ${industry.border}`}>
                    <industry.icon className={`w-5 h-5 ${industry.color}`} />
                  </div>
                  <h3 className={`text-lg font-bold ${industry.color}`}>{industry.title}</h3>
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Typical Assets</div>
                    <div className="flex flex-wrap gap-1.5">
                      {industry.assets.map(a => (
                        <span key={a} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">{a}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Work Types</div>
                    <div className="flex flex-wrap gap-1.5">
                      {industry.workTypes.map(w => (
                        <span key={w} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">{w}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">MASReady Insights</div>
                    <div className="flex flex-wrap gap-1.5">
                      {industry.insights.map(ins => (
                        <span key={ins} className={`text-xs px-2 py-0.5 rounded-full border ${industry.border} ${industry.color} bg-current/5`}>{ins}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/launch"
                  className={`mt-auto flex items-center justify-center gap-2 rounded-lg border ${industry.border} bg-card px-4 py-2.5 text-sm font-semibold ${industry.color} hover:bg-white/5 transition-colors`}
                >
                  Open {industry.title} Preview <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Persisted demo note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-8 md:p-10 max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-3">Need a persisted demo or private environment?</h3>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              For saved previews, private demo workspaces, real environment analysis, or secure customer-specific
              synthetic datasets, contact MASReady. Public previews are session-only and do not store your information.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/launch" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:-translate-y-0.5">
                Request Persisted Demo
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all hover:-translate-y-0.5">
                Book Secure Assessment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
