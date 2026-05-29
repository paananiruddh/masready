export default function Design3Architecture() {
  return (
    <div className="max-w-5xl mx-auto font-mono py-12">
      <div className="mb-12 border-b border-[#00ff88]/20 pb-6">
        <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">SYSTEM_ARCHITECTURE</h1>
        <p className="text-[#8b95a7] text-sm">
          &gt; Secure, modular pipeline.<br/>
          &gt; Immutable trace capture enabled.<br/>
          &gt; Rendering logical topology...
        </p>
      </div>

      <div className="space-y-6">
        {[
          { id: "01", name: "CUSTOMER_CONFIG", color: "#00d4ff", desc: "Per-tenant configuration defining data mode and credentials." },
          { id: "02", name: "EVIDENCE_SERVICES", color: "#ffb800", desc: "Read-only connectors pulling data without mutating systems." },
          { id: "03", name: "SKILL_PACKS", color: "#00ff88", desc: "Offline, version-locked modules covering delivery domains." },
          { id: "04", name: "DELIVERY_ENGINE", color: "#00ff88", desc: "Core analysis layer crossing fingerprints and patch content." },
          { id: "05", name: "REPORTS_MEDIA", color: "#c8d8e8", desc: "Review-ready outputs and cryptographic logs." }
        ].map((node, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center border font-bold text-lg" style={{ borderColor: `${node.color}50`, color: node.color, backgroundColor: `${node.color}10` }}>
                {node.id}
              </div>
              {i < 4 && <div className="w-px h-12 bg-gradient-to-b from-current to-transparent my-1 opacity-30" style={{ color: node.color }}></div>}
            </div>
            <div className="border bg-[#0a1520] p-4 flex-1 self-start" style={{ borderColor: `${node.color}30` }}>
              <h3 className="font-bold text-sm mb-1 uppercase" style={{ color: node.color }}>{node.name}</h3>
              <p className="text-[#8b95a7] text-xs">{node.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
