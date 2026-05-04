import { motion } from "framer-motion";

const STEPS = [
  { title: "Login + Customer Switch", role: "Admin", time: "1 min", desc: "Proves multi-tenant auth, customer scoping" },
  { title: "Delivery Intelligence Dashboard", role: "Delivery Lead", time: "2 min", desc: "Proves unified confidence score, top-level posture" },
  { title: "Trust Center", role: "Admin", time: "1 min", desc: "Proves read-only design, no mutation confirmation" },
  { title: "Integration Settings", role: "Admin", time: "1 min", desc: "Proves Jira read-only mode, no ADO/Maximo write" },
  { title: "Requirement Uploads", role: "Delivery Lead", time: "1 min", desc: "Proves structured intake, evidence linking" },
  { title: "Maximo Fingerprint", role: "Asset Manager", time: "1 min", desc: "Proves 46 customisations scanned, environment profile" },
  { title: "Patch Impact Analysis", role: "Delivery Lead", time: "1 min", desc: "Proves 7 impacted items, 2 high severity" },
  { title: "License Usage Planning", role: "Finance", time: "1 min", desc: "Proves AppPoint trend, 77% utilisation, planning only" },
  { title: "Skill Coverage", role: "Delivery Lead", time: "1 min", desc: "Proves 82% coverage, gap identification" },
  { title: "No Contract Mobilisation", role: "Admin", time: "30s", desc: "Proves PFM disabled, feature flag respected" },
  { title: "Audit Log", role: "Auditor", time: "30s", desc: "Proves immutable trace, full activity history" },
  { title: "Help Center", role: "Any", time: "30s", desc: "Proves offline skill packs, guided onboarding" },
];

export default function DemoWalkthrough() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6">The 12-Minute Demo</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A perfectly paced walkthrough of the MAS9 Power tenant.
        </p>
      </div>

      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
        
        <div className="space-y-8">
          {STEPS.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-20"
            >
              <div className="absolute left-[29px] top-6 w-3 h-3 rounded-full bg-primary border-4 border-background" />
              
              <div className="rounded-xl border border-white/10 bg-card p-6 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-medium">{step.role}</span>
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">{step.time}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
