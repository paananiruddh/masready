import { Activity, UploadCloud, Fingerprint, Crosshair, PieChart, PackageCheck, Target, ShieldCheck, History, BookOpen, Database, ToggleLeft } from "lucide-react";

const FEATURES = [
  { title: "DELIVERY_INTELLIGENCE", icon: Activity, desc: "Unified delivery confidence score across all project dimensions to assess readiness instantly." },
  { title: "REQUIREMENT_INTAKE", icon: UploadCloud, desc: "Structured intake of customer requirements with auditable evidence links." },
  { title: "MAXIMO_FINGERPRINT", icon: Fingerprint, desc: "Automated scan of installed objects, customisations, and detailed versioning." },
  { title: "PATCH_IMPACT", icon: Crosshair, desc: "Cross-reference patch/iFix content against your environment fingerprint for targeted risk assessment." },
  { title: "LICENSE_PLANNING", icon: PieChart, desc: "AppPoint trends, named user tracking, and mobile pool analysis for capacity visibility." },
  { title: "OFFLINE_SKILL_PACKS", icon: PackageCheck, desc: "Downloadable, air-gapped, self-contained skill modules for secure environments." },
  { title: "BOT_SKILL_PACK_COVERAGE", icon: Target, desc: "Map installed bot skill packs against Maximo delivery domains — showing what has been assessed and what hasn't." },
  { title: "TRUST_CENTER", icon: ShieldCheck, desc: "Audit-first, read-only design with comprehensive immutable trace capture." },
  { title: "AUDIT_TRAIL", icon: History, desc: "Immutable cryptographic log of all workbench activity for compliance." },
  { title: "CONTROLLED_LEARNING", icon: BookOpen, desc: "Curated, version-locked training paths aligned to actual environment needs." },
  { title: "DATA_BOUNDARY", icon: Database, desc: "Customer-hosted data model where no data leaves the physical or logical boundary." },
  { title: "FEATURE_FLAGS", icon: ToggleLeft, desc: "Per-tenant configuration of enabled/disabled features for strict scope control." },
];

export default function Design3Features() {
  return (
    <div className="max-w-6xl mx-auto font-mono py-12">
      <div className="mb-12 border-b border-[#00ff88]/20 pb-6">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">CAPABILITY_MATRIX</h1>
        <p className="text-[#8b95a7] text-sm">
          &gt; Loading available system modules... [12 found]<br/>
          &gt; All modules operating within defined trust boundaries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => (
          <div 
            key={i}
            className="border border-[#00d4ff]/20 bg-[#0a1520] p-5 flex flex-col hover:border-[#00d4ff]/60 hover:bg-[#00d4ff]/5 transition-all group"
          >
            <div className="flex items-center gap-3 mb-4 border-b border-[#00d4ff]/20 pb-3">
              <f.icon className="w-5 h-5 text-[#00d4ff] group-hover:animate-pulse" />
              <h3 className="font-bold text-xs text-[#00d4ff] uppercase tracking-wider">{f.title}</h3>
            </div>
            <p className="text-[11px] text-[#8b95a7] leading-relaxed flex-1">{f.desc}</p>
            <div className="mt-4 text-[9px] text-[#00d4ff]/40">MOD_{i.toString().padStart(3, '0')} // ACTIVE</div>
          </div>
        ))}
      </div>
    </div>
  );
}
