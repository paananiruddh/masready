import { useState, useRef, useEffect } from "react";

const BREVO_ACTION: string =
  (import.meta.env.VITE_BREVO_FORM_ACTION as string | undefined) ??
  "https://75232578.sibforms.com/serve/MUIFAHtIRt-B7-A2JWAVSXzXbsIyZmDLOE2TzmbffSn476swcFcWsGucu6KrllQW9qtONrnIMrGqAIP4Iq1SG6Ghtq8_JVp355My8vdANM4HG_oQtQiEwg4q8EhbhYoTy8QgQ7CRWIu65dArnwRq2urrxvTIsHzWd90UvT56Xo6aQeI1-HLT7alAYabVkxvSKwHNxX0PfMKCGzRXwg==";

const INTERESTS = [
  "MASReady demo",
  "Maximo environment proof",
  "Licensing report",
  "Regression test suite",
  "General inquiry",
] as const;

function fireGA4(eventName: string) {
  try {
    const w = window as any;
    if (typeof w.gtag === "function") {
      w.gtag("event", eventName, {
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
  // Detect return from Brevo redirect (?submitted=1)
  const [status, setStatus] = useState<"idle" | "error" | "success">(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      if (p.get("submitted") === "1") return "success";
    }
    return "idle";
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [started, setStarted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Clean ?submitted=1 from URL so refreshing doesn't re-show success
  useEffect(() => {
    if (status === "success") {
      const p = new URLSearchParams(window.location.search);
      if (p.get("submitted") === "1") {
        p.delete("submitted");
        const q = p.toString();
        window.history.replaceState({}, "", window.location.pathname + (q ? "?" + q : ""));
      }
    }
  }, [status]);

  function handleFirstInteraction() {
    if (!started) {
      setStarted(true);
      fireGA4("lead_capture_started");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current!;
    const email = (form.elements.namedItem("EMAIL") as HTMLInputElement).value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setErrorMsg("");

    // Inject redirectionUrl so Brevo sends the user back here with ?submitted=1
    let redir = form.querySelector<HTMLInputElement>('input[name="redirectionUrl"]');
    if (!redir) {
      redir = document.createElement("input");
      redir.type = "hidden";
      redir.name = "redirectionUrl";
      form.appendChild(redir);
    }
    redir.value = `${window.location.origin}${window.location.pathname}?submitted=1`;

    // Fire GA4 before the page navigates away
    fireGA4("lead_capture_submitted");

    // Native POST directly to Brevo — zero CORS, zero JS fetch, always works
    form.submit();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center max-w-xl mx-auto">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-xl font-bold mb-2">You're on the list.</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We'll send the MASReady demo link to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur p-8 max-w-xl mx-auto">
      <h3 className="text-xl font-bold mb-1 text-center">Get the MASReady demo link</h3>
      <p className="text-muted-foreground text-sm text-center mb-6">
        Full product walkthrough. No sales pressure.
      </p>

      <form
        ref={formRef}
        action={BREVO_ACTION}
        method="post"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >
        {/* Brevo honeypot — must stay empty */}
        <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
          <input type="text" name="email_address_check" defaultValue="" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="locale" value="en" />

        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="lcr-email">
            Work email <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            id="lcr-email"
            type="email"
            name="EMAIL"
            required
            autoComplete="email"
            placeholder="you@company.com"
            onFocus={handleFirstInteraction}
            className="w-full rounded-lg border border-white/15 bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="lcr-name">
              Name
            </label>
            <input
              id="lcr-name"
              type="text"
              name="FIRSTNAME"
              autoComplete="given-name"
              placeholder="Jane"
              onFocus={handleFirstInteraction}
              className="w-full rounded-lg border border-white/15 bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="lcr-company">
              Company
            </label>
            <input
              id="lcr-company"
              type="text"
              name="COMPANY"
              autoComplete="organization"
              placeholder="Acme Corp"
              onFocus={handleFirstInteraction}
              className="w-full rounded-lg border border-white/15 bg-background px-3.5 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="lcr-interest">
            I'm interested in
          </label>
          <select
            id="lcr-interest"
            name="INTEREST"
            onFocus={handleFirstInteraction}
            className="w-full rounded-lg border border-white/15 bg-background px-3.5 py-2.5 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select an area of interest…</option>
            {INTERESTS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        {status === "error" && (
          <p role="alert" className="text-sm text-destructive bg-destructive/10 rounded-lg px-3.5 py-2.5">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
        >
          Get the MASReady demo link
        </button>

        <p className="text-center text-xs text-muted-foreground pt-1">
          Or email us directly at{" "}
          <a
            href="mailto:aniruddh@assetize.com.au"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            aniruddh@assetize.com.au
          </a>
        </p>
      </form>
    </div>
  );
}
