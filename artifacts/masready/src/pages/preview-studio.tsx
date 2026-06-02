import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  Zap, Lock, Info, RotateCcw, Copy, Check, ExternalLink, Clock
} from "lucide-react";
import { createPreviewSession, type PreviewSession } from "@/lib/previewSession";
import { writeAuditEvent } from "@/lib/previewAudit";
import { INDUSTRIES, INDUSTRY_MAXIMO_VERSIONS, MAS_TARGET_VERSIONS, MOBILITY_TOOLS } from "@/lib/industryData";

interface GeneratedResult {
  session: PreviewSession;
  previewUrl: string;
}

function SuccessPanel({ result, onStartAnother }: { result: GeneratedResult; onStartAnother: () => void }) {
  const [copied, setCopied] = useState(false);
  const [, navigate] = useLocation();

  function handleOpen() {
    writeAuditEvent("preview_link_opened", result.session.id, {
      industry: result.session.industry,
    });
    navigate(`/preview-session/${result.session.id}`);
  }

  function handleCopy() {
    navigator.clipboard.writeText(result.previewUrl).catch(() => {
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
      className="border border-emerald-200 bg-emerald-50 p-7 space-y-5"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-200 shrink-0 mt-0.5">
          <Zap className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Your MASReady preview link is ready</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Your synthetic preview session has been created. Click below to open it.
          </p>
        </div>
      </div>

      {/* Visible URL */}
      <div>
        <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Your preview link
        </label>
        <div className="flex items-center gap-2">
          <input
            id="preview-url-display"
            type="text"
            readOnly
            value={result.previewUrl}
            className="flex-1 border border-border bg-background px-3.5 py-2.5 text-sm font-mono text-primary focus:outline-none focus:ring-2 focus:ring-primary select-all"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <button
            onClick={handleCopy}
            title="Copy preview link"
            className="flex items-center gap-1.5 border border-border bg-background px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card transition-colors shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      {/* Expiry notice */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-3.5 h-3.5 text-primary" />
        <span>
          Session active.
        </span>
      </div>

      {/* Primary action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          onClick={handleOpen}
          className="flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
        >
          <ExternalLink className="w-4 h-4" /> Open Preview
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-card transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          {copied ? "Link Copied!" : "Copy Preview Link"}
        </button>
      </div>

      {/* Secondary actions */}
      <div className="flex flex-wrap gap-3 pt-1 border-t border-emerald-200">
        <button
          onClick={onStartAnother}
          className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ↩ Start Another Preview
        </button>
        <Link
          href="/launch?mode=persisted#demo-form"
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <Lock className="w-3.5 h-3.5" /> Request Persisted Demo
        </Link>
      </div>

      <p className="text-xs text-muted-foreground">
        Session <span className="font-mono">#{result.session.id.slice(0, 8)}</span>
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

    const previewUrl = `${window.location.origin}/preview-session/${session.id}`;

    writeAuditEvent("preview_session_created", session.id, { industry, source: "preview-studio" });
    writeAuditEvent("preview_link_generated", session.id, { industry });

    setGenerated({ session, previewUrl });
  }

  function handleClearOverlay() {
    setCompanyLabel("");
    setCurrentVersion("");
    setTargetVersion("");
    setAddOns("");
    setMobilityTool("");
    setConcern("");
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

  const inputClass = "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary";
  const selectClass = "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary";
  const smallInputClass = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">Synthetic Preview Studio</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            MASReady Synthetic Preview Studio
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Create a synthetic Maximo preview personalised to your industry and environment profile.
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
              <div className="flex items-start gap-3 border border-border bg-card px-4 py-3.5 mb-6 text-sm text-muted-foreground">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Your answers personalise this preview in your browser session only.
                  No production data is required or stored.
                </span>
              </div>

              {/* Form card */}
              <div className="border border-border bg-card p-7">
                <div className="space-y-5">
                  {/* Industry — required */}
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      Industry <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => { setIndustry(e.target.value); setError(""); }}
                      className={selectClass}
                    >
                      <option value="">Select your industry…</option>
                      {INDUSTRIES.map((i) => (
                        <option key={i.slug} value={i.slug}>{i.title}</option>
                      ))}
                    </select>
                    {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
                  </div>

                  {/* Optional personalisation */}
                  <div className="border-t border-border pt-5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      Runtime-only personalisation <span className="text-muted-foreground/50 font-normal">(optional — browser session only)</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Company or team label</label>
                        <input
                          type="text"
                          value={companyLabel}
                          onChange={(e) => setCompanyLabel(e.target.value)}
                          placeholder="e.g. Sydney Rail Demo"
                          className={smallInputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Current Maximo version</label>
                        <select value={currentVersion} onChange={(e) => setCurrentVersion(e.target.value)} className={smallInputClass}>
                          <option value="">Select version…</option>
                          {INDUSTRY_MAXIMO_VERSIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Target MAS version</label>
                        <select value={targetVersion} onChange={(e) => setTargetVersion(e.target.value)} className={smallInputClass}>
                          <option value="">Select target…</option>
                          {MAS_TARGET_VERSIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Mobility tool in use</label>
                        <select value={mobilityTool} onChange={(e) => setMobilityTool(e.target.value)} className={smallInputClass}>
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
                        className={smallInputClass}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Main upgrade concern</label>
                      <select value={mainConcern} onChange={(e) => setConcern(e.target.value)} className={smallInputClass}>
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
                      className="w-full flex items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                    >
                      <Zap className="w-4 h-4" /> Generate Preview Link
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/launch?mode=persisted#demo-form"
                        className="flex items-center justify-center gap-2 border border-border bg-card px-4 py-2.5 text-sm font-medium text-primary hover:bg-muted transition-colors"
                      >
                        <Lock className="w-3.5 h-3.5" /> Request Persisted Demo
                      </Link>
                      <button
                        onClick={handleClearOverlay}
                        className="flex items-center justify-center gap-2 border border-border bg-card px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Clear Preview Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-5 leading-relaxed">
                Public previews use fixed synthetic baseline data and runtime-only personalisation.
                Persisted private demos are available by request.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
