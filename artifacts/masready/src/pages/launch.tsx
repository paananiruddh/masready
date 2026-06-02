import { motion } from "framer-motion";
import { Link } from "wouter";
import { Rocket, Globe, Lock, CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const WEB3FORMS_KEY = "e3f95161-8759-43a2-90a6-707479beed4b";

const INTERESTS = [
  "Synthetic industry preview",
  "MAS 9 readiness",
  "Environment fingerprinting",
  "Adaptive regression",
  "AI skill packs",
  "Licensing report",
  "Secure persisted demo",
  "Architecture discussion",
] as const;

function DemoRequestForm({ defaultInterest }: { defaultInterest?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [interest, setInterest] = useState(defaultInterest ?? "");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (defaultInterest) setInterest(defaultInterest);
  }, [defaultInterest]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = formRef.current!;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid work email address.");
      setStatus("error");
      return;
    }
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const company = (form.elements.namedItem("company") as HTMLInputElement).value.trim();
    const interest = (form.elements.namedItem("interest") as HTMLSelectElement).value;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `MASReady demo request — ${name || email}`,
          from_name: "MASReady Launch Form",
          email,
          name: name || "(not provided)",
          company: company || "(not provided)",
          interest: interest || "(not provided)",
          botcheck: "",
        }),
      });
      const json = await res.json();
      if (json.success) { setStatus("success"); }
      else { setErrorMsg(json.message || "Something went wrong. Please try again."); setStatus("error"); }
    } catch {
      setErrorMsg("Network error — please try again or email aniruddh@assetize.com.au.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8 space-y-5">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 mb-2">
          <CheckCircle2 className="w-7 h-7 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Request received.</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
            Thanks — MASReady will contact you about your request. We typically respond within one business day.
          </p>
        </div>
        <div className="border-t border-border pt-5">
          <p className="text-xs text-muted-foreground mb-3">
            While you wait, you can explore a public synthetic preview instantly:
          </p>
          <Link
            href="/preview-studio"
            className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent/20 transition-colors"
          >
            <Globe className="w-4 h-4" /> Open Public Synthetic Preview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
      <input type="hidden" name="botcheck" value="" />

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="launch-email">
          Work email <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          id="launch-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          disabled={status === "sending"}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="launch-name">Name</label>
          <input
            id="launch-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Jane Smith"
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            disabled={status === "sending"}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="launch-company">Company</label>
          <input
            id="launch-company"
            type="text"
            name="company"
            autoComplete="organization"
            placeholder="Acme Corp"
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            disabled={status === "sending"}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="launch-interest">Area of interest</label>
        <select
          id="launch-interest"
          name="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          disabled={status === "sending"}
        >
          <option value="">Select an area of interest…</option>
          {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-destructive bg-destructive/10 rounded-lg px-3.5 py-2.5">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Request Persisted Demo"}
      </button>

      <p className="text-center text-xs text-muted-foreground pt-1">
        Public previews are session-only. Persisted private demo environments are available by request.
      </p>
    </form>
  );
}

export default function Launch() {
  const [defaultInterest, setDefaultInterest] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "persisted") {
      setDefaultInterest("Secure persisted demo");
      setTimeout(() => {
        document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/6" />
      <div className="pointer-events-none absolute top-0 left-0 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,220,255,0.07) 0%, transparent 70%)" }} />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Rocket className="w-3 h-3" /> MASReady Preview Studio
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              Launch a MASReady{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Preview
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Explore MASReady through a synthetic, industry-shaped Maximo environment. No production data required.
            </p>

            {/* Two CTA choices */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
              <Link
                href="/preview-studio"
                className="flex items-center gap-3 rounded-xl border border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 p-4 hover:border-accent/50 transition-all hover:-translate-y-0.5 group text-left"
              >
                <div className="p-2.5 rounded-lg bg-accent/15 border border-accent/20 shrink-0">
                  <Globe className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Open Public Synthetic Preview</div>
                  <div className="text-xs text-muted-foreground mt-0.5">2-hour session link · 10 industries</div>
                </div>
              </Link>
              <button
                onClick={() => document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-3 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-4 hover:border-primary/50 transition-all hover:-translate-y-0.5 group text-left w-full"
              >
                <div className="p-2.5 rounded-lg bg-primary/15 border border-primary/20 shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Request Persisted Demo</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Private · Sales-assisted</div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            id="demo-form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-border bg-card shadow-lg p-8 max-w-[720px] mx-auto"
          >
            <div className="mb-7">
              <h2 className="text-xl font-bold mb-1">Request a Persisted Private Demo</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Public synthetic previews open through 2-hour session-scoped links and do not require a contact form.
                Use this form only if you want a <strong className="text-foreground">persisted private demo</strong>, secure assessment, or enterprise walkthrough.
              </p>
            </div>
            <DemoRequestForm defaultInterest={defaultInterest} />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
