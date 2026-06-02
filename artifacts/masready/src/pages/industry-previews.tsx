import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Zap, Truck, Building2, Pickaxe, Building, Flame, Droplets, Train, Navigation, PlaneTakeoff, Info } from "lucide-react";

const INDUSTRIES = [
  {
    icon: Zap,
    title: "Utilities",
    slug: "utilities",
    color: "text-amber-700",
    border: "border-amber-200",
    bg: "from-amber-50",
    badgeBg: "bg-amber-50",
    assets: ["Substations", "Transformers", "Smart meters", "Distribution lines"],
    workTypes: ["Preventive PM", "Corrective", "Inspection", "Emergency dispatch"],
    integrations: ["SCADA", "GIS", "SAP", "Meter data systems"],
    insights: ["Upgrade risk scoring", "Regression coverage", "AppPoints analysis", "Drift alerts"],
  },
  {
    icon: Truck,
    title: "Transport",
    slug: "transport",
    color: "text-blue-700",
    border: "border-blue-200",
    bg: "from-blue-50",
    badgeBg: "bg-blue-50",
    assets: ["Fleet vehicles", "Depots", "Road infrastructure", "Signalling"],
    workTypes: ["Scheduled maintenance", "Breakdown response", "Compliance inspection"],
    integrations: ["Fleet telemetry", "GIS", "Finance", "IoT sensors"],
    insights: ["MAS 9 readiness", "Integration gap analysis", "Skill pack coverage", "Governance checklist"],
  },
  {
    icon: Building2,
    title: "Government",
    slug: "government",
    color: "text-indigo-700",
    border: "border-indigo-200",
    bg: "from-indigo-50",
    badgeBg: "bg-indigo-50",
    assets: ["Public buildings", "Parks", "Roads", "Utilities infrastructure"],
    workTypes: ["Statutory inspection", "Corrective", "Capital works", "Compliance"],
    integrations: ["Finance system", "Document management", "GIS", "Citizen portals"],
    insights: ["Compliance readiness", "Audit trail review", "Licensing analysis", "Environment fingerprint"],
  },
  {
    icon: Pickaxe,
    title: "Mining",
    slug: "mining",
    color: "text-orange-700",
    border: "border-orange-200",
    bg: "from-orange-50",
    badgeBg: "bg-orange-50",
    assets: ["Heavy equipment", "Processing plant", "Conveyors", "Site infrastructure"],
    workTypes: ["Condition-based PM", "Safety inspection", "Shutdown planning", "Corrective"],
    integrations: ["SAP", "PLC/SCADA", "Safety systems", "Procurement"],
    insights: ["Shutdown readiness", "Regression packs", "AI skill pack answers", "Drift findings"],
  },
  {
    icon: Building,
    title: "Facilities",
    slug: "facilities",
    color: "text-emerald-700",
    border: "border-emerald-200",
    bg: "from-emerald-50",
    badgeBg: "bg-emerald-50",
    assets: ["HVAC", "Elevators", "Electrical systems", "Building fabric"],
    workTypes: ["Planned PM", "Reactive", "Contract compliance", "Statutory"],
    integrations: ["BMS", "Energy management", "Finance", "Contract portals"],
    insights: ["Contract readiness", "Compliance scoring", "AppPoints utilisation", "Upgrade risk"],
  },
  {
    icon: Flame,
    title: "Power Generation",
    slug: "power",
    color: "text-red-700",
    border: "border-red-200",
    bg: "from-red-50",
    badgeBg: "bg-red-50",
    assets: ["Turbines", "Generators", "Cooling systems", "Control rooms"],
    workTypes: ["Outage planning", "Predictive maintenance", "Regulatory compliance", "Emergency response"],
    integrations: ["DCS", "SCADA", "Energy trading", "Safety systems"],
    insights: ["Outage readiness", "Regression coverage", "Trust boundary review", "Skill pack gaps"],
  },
  {
    icon: Droplets,
    title: "Water",
    slug: "water",
    color: "text-cyan-700",
    border: "border-cyan-200",
    bg: "from-cyan-50",
    badgeBg: "bg-cyan-50",
    assets: ["Pump stations", "Treatment plants", "Pipelines", "Reservoirs"],
    workTypes: ["Field maintenance", "Compliance inspection", "Reactive repair", "Scheduled PM"],
    integrations: ["SCADA", "GIS", "Laboratory", "Customer billing"],
    insights: ["Compliance readiness", "Upgrade risk scoring", "Regression packs", "Environment fingerprint"],
  },
  {
    icon: Train,
    title: "Rail",
    slug: "rail",
    color: "text-violet-700",
    border: "border-violet-200",
    bg: "from-violet-50",
    badgeBg: "bg-violet-50",
    assets: ["Rolling stock", "Trackside assets", "Depots", "Stations"],
    workTypes: ["PM scheduling", "Corrective maintenance", "Mobility workflows", "Safety compliance"],
    integrations: ["Fleet management", "Signalling", "Crew management", "Safety systems"],
    insights: ["MAS 9 readiness scoring", "Regression packs", "Drift findings", "Skill pack coverage"],
  },
  {
    icon: Navigation,
    title: "Roads",
    slug: "roads",
    color: "text-amber-800",
    border: "border-amber-200",
    bg: "from-yellow-50",
    badgeBg: "bg-yellow-50",
    assets: ["Road network", "Bridges", "Tunnels", "Traffic systems"],
    workTypes: ["Routine maintenance", "Capital renewal", "Inspection", "Emergency response"],
    integrations: ["GIS", "Traffic management", "Finance", "Contractor portals"],
    insights: ["Asset readiness", "Upgrade risk", "Governance checklist", "Licensing analysis"],
  },
  {
    icon: PlaneTakeoff,
    title: "Airports",
    slug: "airports",
    color: "text-sky-700",
    border: "border-sky-200",
    bg: "from-sky-50",
    badgeBg: "bg-sky-50",
    assets: ["Runways", "Terminal systems", "Ground equipment", "Airside infrastructure"],
    workTypes: ["Airside compliance", "Planned PM", "Emergency response", "Lifecycle management"],
    integrations: ["AODB", "Safety management", "Finance", "Procurement"],
    insights: ["Compliance readiness", "Regression coverage", "AI skill pack answers", "Environment fingerprint"],
  },
];

export default function IndustryPreviews() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-24 pb-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent border border-accent-foreground/20 text-primary text-xs font-semibold mb-6">
            <Zap className="w-3 h-3" /> Synthetic Preview Studio
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 leading-[1.1]">
            Explore MASReady Through{" "}
            <span className="text-primary">Your Industry</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Start with a curated synthetic Maximo-style environment shaped for your sector. Add optional
            runtime-only details to make the preview feel closer to your world — with no production data required.
          </p>

          {/* Privacy notice */}
          <div className="inline-flex items-start gap-2.5 px-4 py-3 rounded-xl bg-card border border-border text-sm text-muted-foreground max-w-2xl mx-auto mb-10">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>Your answers personalise this preview in memory only. MASReady does not store your company details, screenshots, or environment information in the public preview.</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/launch" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-all">
              Request Persisted Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all">
              Contact MASReady
            </Link>
          </div>
        </div>
      </section>

      {/* Industry cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {INDUSTRIES.map((industry, i) => (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border ${industry.border} bg-gradient-to-b ${industry.bg} to-white p-6 flex flex-col gap-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-white border ${industry.border}`}>
                    <industry.icon className={`w-5 h-5 ${industry.color}`} />
                  </div>
                  <h3 className={`text-lg font-bold ${industry.color}`}>{industry.title}</h3>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Typical Assets</div>
                    <div className="flex flex-wrap gap-1.5">
                      {industry.assets.map(a => (
                        <span key={a} className={`text-xs px-2 py-0.5 rounded-full ${industry.badgeBg} border ${industry.border} text-slate-700 font-medium`}>{a}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Work Types</div>
                    <div className="flex flex-wrap gap-1.5">
                      {industry.workTypes.map(w => (
                        <span key={w} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-medium">{w}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">MASReady Insights</div>
                    <div className="flex flex-wrap gap-1.5">
                      {industry.insights.map(ins => (
                        <span key={ins} className={`text-xs px-2 py-0.5 rounded-full border ${industry.border} ${industry.color} ${industry.badgeBg} font-medium`}>{ins}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/preview-studio?industry=${industry.slug}`}
                  className={`mt-auto flex items-center justify-center gap-2 rounded-lg border ${industry.border} bg-white px-4 py-2.5 text-sm font-semibold ${industry.color} hover:${industry.badgeBg} transition-colors`}
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
            className="mt-16 rounded-2xl border border-primary/25 bg-gradient-to-br from-accent to-background p-8 md:p-10 max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-3">Need a persisted demo or private environment?</h3>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              For saved previews, private demo workspaces, real environment analysis, or secure customer-specific
              synthetic datasets, contact MASReady. Public previews are session-only and do not store your information.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/launch" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition-all">
                Request Persisted Demo
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all">
                Book Secure Assessment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
