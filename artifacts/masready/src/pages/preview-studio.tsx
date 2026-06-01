import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Zap, Lock, ArrowRight, Info, RotateCcw, CheckCircle2 } from "lucide-react";
import { createPreviewSession } from "@/lib/previewSession";
import { writeAuditEvent } from "@/lib/previewAudit";
import { INDUSTRIES, INDUSTRY_MAXIMO_VERSIONS, MAS_TARGET_VERSIONS, MOBILITY_TOOLS, COMMON_ADDONS } from "@/lib/industryData";

export default function PreviewStudio() {
  const [, navigate] = useLocation();
  const [industry, setIndustry] = useState("");
  const [companyLabel, setCompanyLabel] = useState("");
  const [currentVersion, setCurrentVersion] = useState("");
  const [targetVersion, setTargetVersion] = useState("");
  const [addOns, setAddOns] = useState("");
  const [industrySolutions, setIndustrySolutions] = useState("");
  const [mobilityTool, setMobilityTool] = useState("");
  const [mainConcern, setConcern] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pre = params.get("industry");
    if (pre && INDUSTRIES.find((i) => i.slug === pre)) {
      setIndustry(pre);
    }
  }, []);

  function handleGenerate() {
    if (!industry) {
      setError("Please select an industry to continue.");
      return;
    }
    setError("");
    const session = createPreviewSession({
      industry,
      overlay: {
        companyLabel: companyLabel || undefined,
        currentMaximoVersion: currentVersion || undefined,
        targetMasVersion: targetVersion || undefined,
        addOns: addOns || undefined,
        industrySolutions: industrySolutions || undefined,
        mobilityTool: mobilityTool || undefined,
        mainConcern: mainConcern || undefined,
      },
      source: "preview-studio",
    });
    writeAuditEvent("preview_session_created", session.id, {
      industry,
      source: "preview-studio",
      route: "/preview-studio",
    });
    writeAuditEvent("industry_selected", session.id, { industry });
    navigate("/preview-session/" + session.id);
  }

  function handleClearOverlay() {
    setCompanyLabel("");
    setCurrentVersion("");
    setTargetVersion("");
    setAddOns("");
    setIndustrySolutions("");
    setMobilityTool("");
    setConcern("");
    writeAuditEvent("preview_data_cleared", "studio", { source: "preview-studio" });
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/6" />
      <div className="pointer-events-none absolute top-0 left-1/3 w-[700px] h-[500px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-2xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-5">
            <Zap className="w-3 h-3" /> Synthetic Preview Studio
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            MASReady Synthetic Preview Studio
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Create a time-limited, session-scoped synthetic Maximo preview. Public preview links expire after 2 hours.
          </p>
        </motion.div>

        {/* Privacy banner */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-3.5 mb-8 text-sm text-muted-foreground"
        >
          <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
          <span>
            Your answers personalise this preview in your browser session only.{" "}
            <strong className="text-white">Public preview links expire after 2 hours.</strong>{" "}
            No production data is required or stored. Runtime-only personalisation is not transmitted.
          </span>
        </motion.div>

        {/* Form card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/12 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/30 p-7"
        >
          <div className="space-y-5">
            {/* Industry — required */}
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                Industry <span className="text-red-400">*</span>
              </label>
              <select
                value={industry}
                onChange={(e) => { setIndustry(e.target.value); setError(""); }}
                className="w-full rounded-lg border border-white/15 bg-background/80 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select your industry…</option>
                {INDUSTRIES.map((i) => (
                  <option key={i.slug} value={i.slug}>{i.title}</option>
                ))}
              </select>
              {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
            </div>

            {/* Optional runtime personalisation */}
            <div className="border-t border-white/8 pt-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Runtime-only personalisation <span className="text-white/30 font-normal">(optional — stored in browser only)</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Company or team label</label>
                  <input
                    type="text"
                    value={companyLabel}
                    onChange={(e) => setCompanyLabel(e.target.value)}
                    placeholder="e.g. Sydney Rail Demo"
                    className="w-full rounded-lg border border-white/10 bg-background/60 px-3 py-2 text-sm placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Current Maximo version</label>
                  <select
                    value={currentVersion}
                    onChange={(e) => setCurrentVersion(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-background/60 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  >
                    <option value="">Select version…</option>
                    {INDUSTRY_MAXIMO_VERSIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Target MAS version</label>
                  <select
                    value={targetVersion}
                    onChange={(e) => setTargetVersion(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-background/60 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  >
                    <option value="">Select target…</option>
                    {MAS_TARGET_VERSIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Mobility tool in use</label>
                  <select
                    value={mobilityTool}
                    onChange={(e) => setMobilityTool(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-background/60 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  >
                    <option value="">Select tool…</option>
                    {MOBILITY_TOOLS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Add-ons or industry solutions in use</label>
                <input
                  type="text"
                  value={addOns}
                  onChange={(e) => setAddOns(e.target.value)}
                  placeholder="e.g. Maximo Spatial, IBM MAS Monitor, Maximo Scheduler"
                  className="w-full rounded-lg border border-white/10 bg-background/60 px-3 py-2 text-sm placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Main upgrade concern</label>
                <select
                  value={mainConcern}
                  onChange={(e) => setConcern(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-background/60 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                >
                  <option value="">Select main concern…</option>
                  <option>Integration compatibility</option>
                  <option>Custom object migration</option>
                  <option>AppPoints licensing cost</option>
                  <option>Regression and testing coverage</option>
                  <option>Mobile workflow continuity</option>
                  <option>Data migration and integrity</option>
                  <option>Timeline and resource planning</option>
                  <option>Security and compliance</option>
                </select>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleGenerate}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
              >
                <Zap className="w-4 h-4" /> Generate 2-Hour Preview Link
              </button>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/launch?mode=persisted#demo-form"
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" /> Request Persisted Demo
                </Link>
                <button
                  onClick={handleClearOverlay}
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/8 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear Preview Data
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info footer */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-center text-xs text-muted-foreground mt-6 leading-relaxed"
        >
          Public previews use fixed synthetic baseline data and runtime-only personalisation.
          Preview links expire after 2 hours. Persisted private demos and connected assessments are available by request.
        </motion.p>
      </div>
    </div>
  );
}
