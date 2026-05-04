import { Link } from "wouter";
import { Terminal, Activity, AlertTriangle, Cpu } from "lucide-react";
import SimulatorPanel from "@/components/SimulatorPanel";
import { DEMO_METRICS } from "@/lib/constants";

export default function Design3Home() {
  return (
    <div className="flex flex-col gap-12 font-mono">
      
      {/* HUD Header */}
      <section className="relative pt-12 pb-8 border-b border-[#00ff88]/20">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/5 text-[#00ff88] text-xs font-bold tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping"></span>
            INITIALIZING MAXIMO WORKBENCH...
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-white uppercase">
            Delivery <span className="text-[#00ff88] bg-[#00ff88]/10 px-2 border border-[#00ff88]/30">Intelligence</span><br />
            Without Chaos_
          </h1>
          
          <p className="text-xl text-[#8b95a7] mb-10 max-w-3xl leading-relaxed">
            &gt; Evidence-backed delivery automation for IBM Maximo teams.<br/>
            &gt; Synthesizing requirements, patch impact, and trust boundaries.<br/>
            &gt; Review-ready output generation enabled.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/design3/mas9-power" className="inline-flex items-center justify-center border border-[#00ff88] bg-[#00ff88]/10 px-8 py-3 text-sm font-bold text-[#00ff88] uppercase tracking-widest hover:bg-[#00ff88]/20 transition-all hover:shadow-[0_0_15px_rgba(0,255,136,0.3)]">
              INITIALIZE_MAS9
            </Link>
            <Link href="/design3/trust" className="inline-flex items-center justify-center border border-[#c8d8e8]/30 bg-transparent px-8 py-3 text-sm font-bold text-[#c8d8e8] uppercase tracking-widest hover:border-[#c8d8e8] transition-colors">
              AUDIT_TRUST
            </Link>
          </div>
        </div>
      </section>

      {/* Terminal Output & Metrics */}
      <section className="max-w-5xl mx-auto w-full grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-[#00d4ff]/30 bg-[#0a1520] p-6 relative">
          <div className="absolute top-0 right-0 p-2 text-[10px] text-[#00d4ff]/50">SYS.TERMINAL.01</div>
          <div className="flex items-center gap-2 mb-6 text-[#00d4ff] text-sm font-bold border-b border-[#00d4ff]/20 pb-2">
            <Terminal className="w-4 h-4" /> OUTPUT_STREAM
          </div>
          <div className="space-y-2 text-xs text-[#8b95a7]">
            <div><span className="text-[#00ff88]">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span> [INFO] Booting engine... OK</div>
            <div><span className="text-[#00ff88]">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span> [INFO] Loading demo fixtures... 23 files found</div>
            <div><span className="text-[#00ff88]">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span> [WARN] Environment scan indicates 46 customisations</div>
            <div><span className="text-[#00ff88]">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span> [INFO] Matching skill packs: 82% coverage achieved</div>
            <div className="text-[#00d4ff] mt-4">_ AWAITING COMMAND _</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-[#ffb800]/30 bg-[#1a1505] p-4 text-[#ffb800]">
            <div className="flex justify-between items-start mb-2">
              <AlertTriangle className="w-5 h-5" />
              <div className="text-[10px] uppercase">Patch Risk</div>
            </div>
            <div className="text-3xl font-bold">{DEMO_METRICS.patchImpacts}</div>
            <div className="text-xs opacity-70 mt-1 uppercase">Impacted Items</div>
          </div>
          
          <div className="border border-[#00ff88]/30 bg-[#001a0d] p-4 text-[#00ff88]">
            <div className="flex justify-between items-start mb-2">
              <Cpu className="w-5 h-5" />
              <div className="text-[10px] uppercase">AppPoints</div>
            </div>
            <div className="text-3xl font-bold">{DEMO_METRICS.utilisation}%</div>
            <div className="text-xs opacity-70 mt-1 uppercase">Peak Utilisation</div>
          </div>
        </div>
      </section>

      {/* Simulator Embedded */}
      <section className="max-w-5xl mx-auto w-full mb-20">
        <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-[#00ff88] pl-4 uppercase">Scenario_Simulator</h2>
        <SimulatorPanel variant="design3" />
      </section>

    </div>
  );
}
