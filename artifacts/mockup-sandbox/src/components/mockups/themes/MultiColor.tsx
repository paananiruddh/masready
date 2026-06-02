export function MultiColor() {
  const cards = [
    { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", icon: "⚡", title: "MAS 9 Intelligence Score", desc: "Real-time environment score across 52 checks, seven domains, all evidence-backed." },
    { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", icon: "🔍", title: "Customisation Fingerprint", desc: "Map every customisation — 46+ artefacts across scripts, workflows, and integrations." },
    { color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", icon: "📋", title: "Environment Audit", desc: "Structured readiness checklist with SQL hints and domain-level scoring." },
    { color: "#d97706", bg: "#fffbeb", border: "#fde68a", icon: "📊", title: "Licence Planning", desc: "AppPoints modelling across 7 industries, 23 roles, and real consumption data." },
    { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", icon: "🔒", title: "Trust Centre", desc: "Zero production mutations. Read-only always. Governed by design." },
    { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", icon: "🚀", title: "Delivery Intelligence", desc: "Patch impact analysis, regression planning, and migration sequencing." },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", minHeight: "100vh", color: "#0f172a" }}>
      {/* Nav */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 6 }} />
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px" }}>MASReady</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14, color: "#475569" }}>
          <span>Platform</span><span>MAS 9</span><span>Audit</span><span>Pricing</span>
        </div>
        <button style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          Request Demo
        </button>
      </nav>

      {/* Hero — clean white with color accent text */}
      <section style={{ padding: "96px 48px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #eff6ff, #f5f3ff)", border: "1px solid #c4b5fd", borderRadius: 100, padding: "4px 14px", marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: "50%" }} />
          <span style={{ fontSize: 12, fontWeight: 600, background: "linear-gradient(135deg, #2563eb, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.05em", textTransform: "uppercase" }}>IBM Maximo · MAS 9 Delivery Intelligence</span>
        </div>
        <h1 style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 28, maxWidth: 780 }}>
          Understand your<br />
          Maximo.<br />
          <span style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed, #9333ea)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Deliver with certainty.</span>
        </h1>
        <p style={{ fontSize: 18, color: "#475569", lineHeight: 1.7, maxWidth: 520, marginBottom: 40 }}>
          MASReady helps delivery teams understand, validate, and govern Maximo and MAS environments — using evidence, not estimates.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "#fff", border: "none", borderRadius: 8, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            Explore Industry Previews →
          </button>
          <button style={{ background: "#fff", color: "#0f172a", border: "1px solid #e2e8f0", borderRadius: 8, padding: "14px 28px", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
            Request a Demo
          </button>
        </div>
      </section>

      {/* Stats — colorful pills */}
      <section style={{ padding: "0 48px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { v: "52", l: "Audit checks", c: "#2563eb", bg: "#eff6ff" },
            { v: "100%", l: "Read-only always", c: "#7c3aed", bg: "#f5f3ff" },
            { v: "7", l: "Delivery domains", c: "#059669", bg: "#ecfdf5" },
            { v: "0", l: "Tools required", c: "#d97706", bg: "#fffbeb" },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, borderRadius: 12, padding: "24px 20px" }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: s.c, letterSpacing: "-1px", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Colorful feature cards */}
      <section style={{ padding: "0 48px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#2563eb", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Capabilities</div>
          <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-1px", margin: 0 }}>What the Workbench does.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {cards.map((f, i) => (
            <div key={i} style={{ background: f.bg, border: `1px solid ${f.border}`, borderRadius: 12, padding: "28px 24px", cursor: "pointer", borderTop: `3px solid ${f.color}` }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.3px", color: f.color }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: "#f1f5f9", padding: "16px 48px", textAlign: "center", fontSize: 12, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Option C — Multi-Color (bold colorful cards on white)
      </div>
    </div>
  );
}
