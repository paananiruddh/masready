import { useState, useId } from "react";

const INTERESTS = [
  "MASReady demo",
  "Maximo environment proof",
  "Licensing report",
  "Regression test suite",
  "General inquiry",
] as const;

const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

function fireGA4(email: string) {
  try {
    const w = window as any;
    if (typeof w.gtag === "function") {
      w.gtag("event", "lead_capture_submitted", {
        event_category: "engagement",
        event_label: "lead_form",
        value: 1,
      });
    }
  } catch {
    // GA4 unavailable — non-fatal
  }
}

export default function LeadCaptureForm() {
  const honeypotId = useId();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          name: name.trim(),
          company: company.trim(),
          interest,
          website: honeypot,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      fireGA4(trimmedEmail);
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center max-w-xl mx-auto">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="text-xl font-bold mb-2">You're on the list.</h3>
        <p className="text-muted-foreground text-sm">
          We'll send the MASReady demo link to <strong>{email}</strong> shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur p-8 max-w-xl mx-auto">
      <h3 className="text-xl font-bold mb-1 text-center">Get the MASReady demo link</h3>
      <p className="text-muted-foreground text-sm text-center mb-6">
        Access the full product walkthrough — no sales pressure.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Honeypot — hidden from humans */}
        <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
          <label htmlFor={honeypotId}>Leave blank</label>
          <input
            id={honeypotId}
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="lc-email">
            Work email <span className="text-destructive">*</span>
          </label>
          <input
            id="lc-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            disabled={status === "sending"}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="lc-name">
              Name
            </label>
            <input
              id="lc-name"
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              disabled={status === "sending"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="lc-company">
              Company
            </label>
            <input
              id="lc-company"
              type="text"
              autoComplete="organization"
              placeholder="Acme Corp"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              disabled={status === "sending"}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="lc-interest">
            I'm interested in
          </label>
          <select
            id="lc-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-background px-3.5 py-2.5 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            disabled={status === "sending"}
          >
            <option value="">Select an area of interest…</option>
            {INTERESTS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        {status === "error" && (
          <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3.5 py-2.5">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending…" : "Get the MASReady demo link"}
        </button>

        <p className="text-center text-xs text-muted-foreground pt-1">
          Or{" "}
          <a
            href="mailto:ani@assetize.com.au"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            email us directly
          </a>
        </p>
      </form>
    </div>
  );
}
