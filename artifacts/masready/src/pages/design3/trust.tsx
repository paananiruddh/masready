import { ShieldAlert, Database, ServerCrash, Trello, GitMerge, Lock } from "lucide-react";

export default function Design3Trust() {
  return (
    <div className="max-w-5xl mx-auto font-mono py-12 flex flex-col gap-12">
      
      <div className="border border-[#ffb800]/30 bg-[#1a1505] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-[#ffb800] text-black text-[10px] font-bold px-2 py-1 uppercase">Restricted Clearance</div>
        <h1 className="text-4xl font-bold text-[#ffb800] mb-4 uppercase tracking-wider flex items-center gap-4">
          <ShieldAlert className="w-10 h-10" />
          Security Audit Report
        </h1>
        <p className="text-[#8b95a7] max-w-2xl leading-relaxed text-sm">
          &gt; Enterprise software isn't just about what it does. It's about what it guarantees it will never do.<br/>
          &gt; The following immutable invariants govern all operations within the MASReady environment.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "REVIEW_ONLY_DESIGN", icon: ShieldAlert, desc: "Generates outputs and insights only. The workbench contains zero execution capabilities.", color: "#00ff88" },
          { title: "NO_SQL_EXECUTION", icon: Database, desc: "Architecturally restricted from executing write operations against any database.", color: "#00ff88" },
          { title: "NO_MAXIMO_MUTATION", icon: ServerCrash, desc: "Integrates with Maximo via read-only APIs exclusively. Changes are impossible.", color: "#00ff88" },
          { title: "NO_JIRA_MUTATION", icon: Trello, desc: "Extracts requirements and evidence via read-only connections.", color: "#00d4ff" },
          { title: "NO_ADO_MUTATION", icon: GitMerge, desc: "Connects to Azure DevOps purely to map pipeline status, never to trigger builds.", color: "#00d4ff" },
          { title: "DATA_BOUNDARY", icon: Lock, desc: "Customer-hosted data models ensure zero exfiltration of proprietary information.", color: "#ffb800" },
        ].map((pillar, i) => (
          <div 
            key={i}
            className="border bg-[#0a1520] p-6 relative group transition-all"
            style={{ borderColor: `${pillar.color}40` }}
          >
            <div className="absolute top-0 left-0 w-full h-1 opacity-20 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: pillar.color }}></div>
            <pillar.icon className="w-8 h-8 mb-4" style={{ color: pillar.color }} />
            <h3 className="text-sm font-bold mb-2 text-white uppercase tracking-wider">{pillar.title}</h3>
            <p className="text-[#8b95a7] text-xs leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>

      <div className="border border-red-500/30 bg-red-950/20 p-6">
        <h2 className="text-red-500 font-bold mb-2 text-sm uppercase">! License Usage Disclaimer</h2>
        <p className="text-red-400/70 text-xs leading-relaxed">
          License usage planning features are provided for internal planning and visibility purposes only. 
          MASReady outputs do not constitute legal, contractual, IBM-certified, or formal compliance advice.
        </p>
      </div>

    </div>
  );
}
