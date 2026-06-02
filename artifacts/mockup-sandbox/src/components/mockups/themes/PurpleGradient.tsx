export function PurpleGradient() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff", minHeight: "100vh", color: "#0f172a" }}>
      {/* Nav */}
      <nav style={{ background: "transparent", padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "rgba(255,255,255,0.25)", borderRadius: 6, backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 14, height: 14, background: "#fff", borderRadius: 3 }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#fff", letterSpacing: "-0.3px" }}>MASReady</span>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
          <span>Platform</span><span>MAS 9</span><span>Audit</span><span>Pricing</span>
        </div>
        <button style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)" }}>
          Request Demo
        </button>
      </nav>

      {/* Hero with gradient */}
      <section style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #9333ea 100%)", padding: "148px 48px 100px", position: "relative", overflow: "hidden" }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: "rgba(167, 139, 250, 0.3)", borderRadius: "50%", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: -60, left: 200, width: 300, height: 300, background: "rgba(216, 180, 254, 0.2)", borderRadius: "50%", filter: "blur(60px)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100, padding: "4px 14px", marginBottom: 32, backdropFilter: "blur(8px)" }}>
            <div style={{ width: 6, height: 6, background: "#c4b5fd", borderRadius: "50%" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#e9d5ff", letterSpacing: "0.05em", textTransform: "uppercase" }}>IBM Maximo · MAS 9 Delivery Intelligence</span>
          </div>
          <h1 style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 28, maxWidth: 780, color: "#fff" }}>
            Understand your<br />
            Maximo.<br />
            <span style={{ color: "#e9d5ff" }}>Deliver with certainty.</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, maxWidth: 520, marginBottom: 40 }}>
            MASReady helps delivery teams understand, validate, and govern Maximo and MAS environments — using evidence, not estimates.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ background: "#fff", color: "#4f46e5", border: "none", borderRadius: 8, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Explore Industry Previews →
            </button>
            <button style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "14px 28px", fontSize: 15, fontWeight: 500, cursor: "pointer", backdropFilter: "blur(8px)" }}>
              Request a Demo
            </button>
          </div>

          {/* Stats row inside hero */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginTop: 72, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
            {[
              { v: "52", l: "Audit checks" },
              { v: "100%", l: "Read-only always" },
              { v: "7", l: "Delivery domains" },
              { v: "0", l: "Tools required" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 40, fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards — light body */}
      <section style={{ padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Capabilities</div>
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
            <div key={i} style={{ background: "#faf5ff", border: "1px solid #ede9fe", borderRadius: 12, padding: "28px 24px", cursor: "pointer" }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.3px" }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div style={{ background: "#f1f5f9", padding: "16px 48px", textAlign: "center", fontSize: 12, color: "#94a3b8", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        Option B — Purple Gradient (Linear / Vercel style)
      </div>
    </div>
  );
}
