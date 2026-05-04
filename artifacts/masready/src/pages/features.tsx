import { motion } from "framer-motion";
import { Activity, UploadCloud, Fingerprint, Crosshair, PieChart, PackageCheck, Target, ShieldCheck, History, BookOpen, Database, ToggleLeft } from "lucide-react";

const FEATURES = [
  { title: "Delivery Intelligence", icon: Activity, desc: "Unified delivery confidence score across all project dimensions to assess readiness instantly." },
  { title: "Requirement Intake", icon: UploadCloud, desc: "Structured intake of customer requirements with auditable evidence links." },
  { title: "Maximo Fingerprint", icon: Fingerprint, desc: "Automated scan of installed objects, customisations, and detailed versioning." },
  { title: "Patch Impact", icon: Crosshair, desc: "Cross-reference patch/iFix content against your environment fingerprint for targeted risk assessment." },
  { title: "License Planning", icon: PieChart, desc: "AppPoint trends, named user tracking, and mobile pool analysis for capacity visibility." },
  { title: "Offline Skill Packs", icon: PackageCheck, desc: "Downloadable, air-gapped, self-contained skill modules for secure environments." },
  { title: "Skill Coverage", icon: Target, desc: "Map available delivery team skills against specific requirement gaps." },
  { title: "Trust Center", icon: ShieldCheck, desc: "Audit-first, read-only design with comprehensive immutable trace capture." },
  { title: "Audit Trail", icon: History, desc: "Immutable cryptographic log of all workbench activity for compliance." },
  { title: "Controlled Learning", icon: BookOpen, desc: "Curated, version-locked training paths aligned to actual environment needs." },
  { title: "Data Boundary", icon: Database, desc: "Customer-hosted data model where no data leaves the physical or logical boundary." },
  { title: "Feature Flags", icon: ToggleLeft, desc: "Per-tenant configuration of enabled/disabled features for strict scope control." },
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {FEATURES.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-white/10 bg-card p-6 flex flex-col hover:bg-white/5 transition-colors group"
          >
            <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-6 group-hover:scale-110 transition-transform">
              <f.icon className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-3">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
