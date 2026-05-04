import { DEMO_METRICS } from "@/lib/constants";
import { Users, Server, HardDrive, Activity, Zap } from "lucide-react";

export default function Design3MAS9Power() {
  return (
    <div className="max-w-5xl mx-auto font-mono py-8 flex flex-col gap-8">
      
      <div className="flex items-center justify-between border-b border-[#00ff88]/30 pb-4">
        <h1 className="text-2xl font-bold text-[#00ff88] uppercase tracking-wider flex items-center gap-3">
          <Zap className="w-6 h-6" /> TENANT_PROFILE: MAS9_POWER
        </h1>
        <div className="px-3 py-1 border border-[#00ff88]/50 bg-[#00ff88]/10 text-[#00ff88] text-xs font-bold animate-pulse">
          LIVE
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Col: Specs */}
        <div className="col-span-1 border border-[#00d4ff]/30 bg-[#0a1520] p-6">
          <h2 className="text-xs text-[#00d4ff] font-bold mb-4 border-b border-[#00d4ff]/30 pb-2">ENVIRONMENT_SPECS</h2>
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-[#8b95a7] block mb-1">INDUSTRY_VERTICAL</span>
              <span className="text-white">Energy & Utilities</span>
            </div>
            <div>
              <span className="text-[#8b95a7] block mb-1">MAS_VERSION</span>
              <span className="text-white">9.x Managed</span>
            </div>
            <div>
              <span className="text-[#8b95a7] block mb-1">FIXTURE_SIZE</span>
              <span className="text-white">{DEMO_METRICS.seedFiles} Seed Files</span>
            </div>
            <div>
              <span className="text-[#8b95a7] block mb-1">INTEGRATIONS</span>
              <span className="text-[#00ff88] flex items-center gap-2"><div className="w-1 h-1 bg-[#00ff88] rounded-full"></div> Jira (Read-Only)</span>
            </div>
          </div>
        </div>

        {/* Right Col: Diagnostics */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="border border-[#ffb800]/30 bg-[#1a1505] p-6">
            <h3 className="text-[10px] text-[#ffb800] uppercase mb-2">Impacted Customisations</h3>
            <div className="text-4xl font-bold text-[#ffb800] mb-2">{DEMO_METRICS.patchImpacts}</div>
            <div className="text-xs text-[#8b95a7]">Out of {DEMO_METRICS.customisationsScanned} scanned</div>
          </div>

          <div className="border border-[#00ff88]/30 bg-[#001a0d] p-6">
            <h3 className="text-[10px] text-[#00ff88] uppercase mb-2">Skill Coverage</h3>
            <div className="text-4xl font-bold text-[#00ff88] mb-2">{DEMO_METRICS.skillCoverage}%</div>
            <div className="text-xs text-[#8b95a7]">Based on available packs</div>
          </div>

          <div className="col-span-2 border border-[#00d4ff]/30 bg-[#0a1520] p-6">
            <h3 className="text-[10px] text-[#00d4ff] uppercase mb-4">Capacity Load</h3>
            <div className="flex items-end gap-4 mb-2">
              <div className="text-4xl font-bold text-[#00d4ff]">{DEMO_METRICS.appPointsUsed}</div>
              <div className="text-sm text-[#8b95a7] mb-1">/ {DEMO_METRICS.appPointsEntitled} AppPoints</div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-[#050a0f] border border-[#00d4ff]/30 mt-4 overflow-hidden relative">
              <div className="h-full bg-[#00d4ff] opacity-80" style={{ width: `${DEMO_METRICS.utilisation}%` }}></div>
              {/* Peak marker */}
              <div className="absolute top-0 bottom-0 w-1 bg-white z-10" style={{ left: `${DEMO_METRICS.peakUtilisation}%` }}></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-[#8b95a7]">
              <span>Current: {DEMO_METRICS.utilisation}%</span>
              <span>Peak: {DEMO_METRICS.peakUtilisation}%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
