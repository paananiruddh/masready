export function DeepTeal() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", minHeight: "100vh", color: "#0f172a" }}>
      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "#0f766e", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 14, height: 14, background: "#5eead4", borderRadius: 3 }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px" }}>MASReady</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14, color: "#475569" }}>
          <span>Platform</span><span>MAS 9</span><span>Audit</span><span>Pricing</span>
        </div>
        <button style={{ background: "#0f766e", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          Request Demo
        </button>
      </nav>

      {/* Hero — teal to emerald gradient */}
      <section style={{ background: "linear-gradient(135deg, #042f2e 0%, #0f766e 50%, #059669 100%)", padding: "100px 48px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -50, width: 500, height: 500, background: "rgba(94, 234, 212, 0.15)", borderRadius: "50%", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: -80, left: 100, width: 350, height: 350, background: "rgba(52, 211, 153, 0.1)", borderRadius: "50%", filter: "blur(60px)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(94,234,212,0.15)", border: "1px solid rgba(94,234,212,0.3)", borderRadius: 100, padding: "4px 14px", marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, background: "#5eead4", borderRadius: "50%" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#5eead4", letterSpacing: "0.05em", textTransform: "uppercase" }}>IBM Maximo · MAS 9 Delivery Intelligence</span>
          </div>
          <h1 style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 28, maxWidth: 780, color: "#fff" }}>
            Understand your<br />
            Maximo.<br />
            <span style={{ color: "#5eead4" }}>Deliver with certainty.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 520, marginBottom: 40 }}>
            MASReady helps delivery teams understand, validate, and govern Maximo and MAS environments — using evidence, not estimates.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ background: "#5eead4", color: "#042f2e", border: "none", borderRadius: 8, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Explore Industry Previews →
            </button>
            <button style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "14px 28px", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
              Request a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: "#0f172a", padding: "40px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {[
            { v: "52", l: "Environment audit checks" },
            { v: "100%", l: "Read-only — zero mutations" },
            { v: "7", l: "Delivery domains covered" },
            { v: "0", l: "External tools required" },
          ].map((s, i) => (
            <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none", paddingLeft: i > 0 ? 32 : 0 }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: "#5eead4", letterSpacing: "-1px", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 6, lineHeight: 1.4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section style={{ padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0f766e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Capabilities</div>
          <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-1px", margin: 0 }}>What the Workbench does.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { icon: "⚡", title: "MAS 9 Intelligence Score", desc: "Real-time environment score across 52 checks, seven domains, all evidence-backed." },
            { icon: "🔍", title: "Customisation Fingerprint", desc: "Map every customisation — 46+ artefacts across scripts, workflows, and integrations." },
            { icon: "📋", title: "Environment Audit", desc: "Structured readiness checklist with SQL hints and domain-level scoring." },
            { icon: "📊", title: "Licence Planning", desc: "AppPoints modelling across 7 industries, 23 roles, and real consumption data." },
            { icon: "🔒", title: "Trust Centre", desc: "Zero production mutations. Read-only always. Governed by design." },
            { icon: "🚀", title: "Delivery Intelligence", desc: "Patch impact analysis, regression planning, and migration sequencing." },
          ].map((f, i) => (
            <div key={i} style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: 12, padding: "28px 24px", cursor: "pointer" }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.3px" }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: "#f1f5f9", padding: "16px 48px", textAlign: "center", fontSize: 12, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Option D — Deep Teal (teal → emerald gradient hero, white body)
      </div>
    </div>
  );
}
