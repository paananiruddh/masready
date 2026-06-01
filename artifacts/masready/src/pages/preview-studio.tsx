import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  Zap, Lock, Info, RotateCcw, Copy, Check, ExternalLink,
  AlertTriangle, RefreshCw, Clock
} from "lucide-react";
import { createPreviewSession, type PreviewSession } from "@/lib/previewSession";
import { writeAuditEvent } from "@/lib/previewAudit";
import { INDUSTRIES, INDUSTRY_MAXIMO_VERSIONS, MAS_TARGET_VERSIONS, MOBILITY_TOOLS } from "@/lib/industryData";

interface GeneratedResult {
  session: PreviewSession;
  previewUrl: string;
  popupBlocked: boolean;
}

function SuccessPanel({ result, onStartAnother }: { result: GeneratedResult; onStartAnother: () => void }) {
  const [copied, setCopied] = useState(false);

  function handleOpen() {
    // NEW WINDOW URL, NEW WINDOW URL, NEW WINDOW URL
    window.open(result.previewUrl, "_blank", "noopener,noreferrer");
    writeAuditEvent("preview_link_opened_new_window", result.session.id, {
      industry: result.session.industry,
      route: "/preview-studio",
    });
  }

  function handleCopy() {
    navigator.clipboard.writeText(result.previewUrl).catch(() => {
      // Fallback: select text in input
      const el = document.getElementById("preview-url-display") as HTMLInputElement;
      if (el) { el.select(); document.execCommand("copy"); }
    });
    setCopied(true);
    writeAuditEvent("preview_link_copy_clicked", result.session.id, { industry: result.session.industry });
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-green-400/25 bg-card/90 backdrop-blur-xl shadow-2xl shadow-black/30 p-7 space-y-5"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-green-400/15 border border-green-400/20 shrink-0 mt-0.5">
          <Zap className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Your MASReady preview link is ready</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {result.popupBlocked
              ? "Your browser blocked the new tab — use the Open Preview Link button below."
              : "A new tab has been opened with your 2-hour synthetic preview."}
          </p>
        </div>
      </div>

      {/* Popup blocked warning */}
      {result.popupBlocked && (
        <div className="flex items-start gap-2.5 rounded-xl border border-yellow-400/25 bg-yellow-400/8 px-4 py-3 text-sm">
          <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <span className="text-yellow-200">
            Your browser blocked the new preview tab. Click <strong>Open Preview Link</strong> below — it will open directly.
          </span>
        </div>
      )}

      {/* Visible URL — the spec requires this to be clearly visible on the page */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Your 2-hour preview link
        </label>
        <div className="flex items-center gap-2">
          <input
            id="preview-url-display"
            type="text"
            readOnly
            value={result.previewUrl}
            className="flex-1 rounded-lg border border-white/15 bg-background/70 px-3.5 py-2.5 text-sm font-mono text-accent focus:outline-none focus:ring-2 focus:ring-primary select-all"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <button
            onClick={handleCopy}
            title="Copy preview link"
            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/6 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/12 transition-colors shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Expiry notice */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-3.5 h-3.5 text-accent" />
        <span>
          This link expires at{" "}
          <strong className="text-white">{new Date(result.session.expiresAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</strong>
          {" "}(2 hours from now). Public preview links are browser-session scoped.
        </span>
      </div>

      {/* Primary action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          onClick={handleOpen}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
        >
          <ExternalLink className="w-4 h-4" /> Open Preview Link
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all hover:-translate-y-0.5"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          {copied ? "Link Copied!" : "Copy Preview Link"}
        </button>
      </div>

      {/* Secondary actions */}
      <div className="flex flex-wrap gap-3 pt-1 border-t border-white/8">
        <button
          onClick={onStartAnother}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Start Another Preview
        </button>
        <Link
          href="/launch?mode=persisted#demo-form"
          onClick={() => writeAuditEvent("persisted_demo_clicked", result.session.id, { section: "studio-success" })}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <Lock className="w-3.5 h-3.5" /> Request Persisted Demo
        </Link>
      </div>

      {/* Session info */}
      <p className="text-xs text-muted-foreground">
        Session <span className="font-mono text-white/50">#{result.session.id.slice(0, 8)}</span>
        {" · "}{INDUSTRIES.find((i) => i.slug === result.session.industry)?.title ?? result.session.industry} industry baseline
      </p>
    </motion.div>
  );
}

export default function PreviewStudio() {
  const [industry, setIndustry] = useState("");
  const [companyLabel, setCompanyLabel] = useState("");
  const [currentVersion, setCurrentVersion] = useState("");
  const [targetVersion, setTargetVersion] = useState("");
  const [addOns, setAddOns] = useState("");
  const [mobilityTool, setMobilityTool] = useState("");
  const [mainConcern, setConcern] = useState("");
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState<GeneratedResult | null>(null);

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
        mobilityTool: mobilityTool || undefined,
        mainConcern: mainConcern || undefined,
      },
      source: "preview-studio",
    });

    // Build the public-facing preview URL
    const previewUrl = `${window.location.origin}/preview-session/${session.id}`;

    writeAuditEvent("preview_session_created", session.id, { industry, source: "preview-studio", route: "/preview-studio" });
    writeAuditEvent("industry_selected", session.id, { industry });
    writeAuditEvent("preview_link_generated", session.id, { industry, route: "/preview-studio" });

    // NEW WINDOW URL, NEW WINDOW URL, NEW WINDOW URL
    const opened = window.open(previewUrl, "_blank", "noopener,noreferrer");
    if (opened) {
      writeAuditEvent("preview_link_opened_new_window", session.id, { industry });
    }

    setGenerated({ session, previewUrl, popupBlocked: !opened });
  }

  function handleClearOverlay() {
    setCompanyLabel("");
    setCurrentVersion("");
    setTargetVersion("");
    setAddOns("");
    setMobilityTool("");
    setConcern("");
    writeAuditEvent("preview_data_cleared", "studio", { source: "preview-studio" });
  }

  function handleStartAnother() {
    setGenerated(null);
    setIndustry("");
    setCompanyLabel("");
    setCurrentVersion("");
    setTargetVersion("");
    setAddOns("");
    setMobilityTool("");
    setConcern("");
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
            Create a time-limited synthetic Maximo preview link. Public preview links expire after 2 hours.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {generated ? (
            <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <SuccessPanel result={generated} onStartAnother={handleStartAnother} />
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Privacy banner */}
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-3.5 mb-6 text-sm text-muted-foreground">
                <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>
                  Your answers personalise this preview in your browser session only.{" "}
                  <strong className="text-white">Public preview links expire after 2 hours.</strong>{" "}
                  No production data is required or stored. Runtime-only personalisation is not transmitted.
                </span>
              </div>

              {/* Form card */}
              <div className="rounded-2xl border border-white/12 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/30 p-7">
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

                  {/* Optional personalisation */}
                  <div className="border-t border-white/8 pt-5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Runtime-only personalisation <span className="text-white/30 font-normal">(optional — browser session only)</span>
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
                      <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Add-ons or industry solutions</label>
                      <input
                        type="text"
                        value={addOns}
                        onChange={(e) => setAddOns(e.target.value)}
                        placeholder="e.g. Maximo Spatial, IBM MAS Monitor"
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
              </div>

              <p className="text-center text-xs text-muted-foreground mt-5 leading-relaxed">
                Public previews use fixed synthetic baseline data and runtime-only personalisation.
                Preview links expire after 2 hours. Persisted private demos are available by request.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
