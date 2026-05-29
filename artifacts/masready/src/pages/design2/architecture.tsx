export default function Design2Architecture() {
  return (
    <div className="w-full flex flex-col">
      <div className="sticky top-0 z-10 bg-[#0c1220]/90 backdrop-blur-md border-b border-[#2a3650]">
        <h1 className="text-xl font-bold px-4 py-3">Architecture</h1>
      </div>

      <div className="p-4 border-b border-[#2a3650] flex gap-4 overflow-x-auto no-scrollbar">
        {["Extract", "Transform", "Load", "Analyze", "Report"].map((stage, i) => (
          <div key={i} className="flex flex-col items-center gap-1 shrink-0">
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-[#1d9bf0] to-[#00ba7c]">
              <div className="w-[60px] h-[60px] rounded-full bg-[#0c1220] border-2 border-[#0c1220] flex items-center justify-center text-white font-bold text-sm">
                0{i+1}
              </div>
            </div>
            <span className="text-xs text-[#71767b]">{stage}</span>
          </div>
        ))}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Pipeline Layers</h2>
        <div className="grid gap-4">
          {[
            { title: "Integration Layer", desc: "Read-only connections to Maximo, Jira, and Azure DevOps." },
            { title: "Data Processing", desc: "Normalizes raw JSON/XML into structured intelligence models." },
            { title: "Storage", desc: "Customer-hosted immutable storage." },
            { title: "Presentation", desc: "React-based UI for review and sign-off." }
          ].map((layer, i) => (
            <div key={i} className="p-4 rounded-xl border border-[#2a3650] bg-[#1a2235]">
              <h3 className="font-bold text-lg text-white mb-2">{layer.title}</h3>
              <p className="text-[#71767b] text-[15px]">{layer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
