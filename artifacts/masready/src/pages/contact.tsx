import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const WEB3FORMS_KEY = "e3f95161-8759-43a2-90a6-707479beed4b";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = formRef.current!;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const org = (form.elements.namedItem("org") as HTMLInputElement).value.trim();
    const version = (form.elements.namedItem("version") as HTMLSelectElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `MASReady walkthrough request — ${name || email}`,
          from_name: "MASReady Contact Form",
          email,
          name: name || "(not provided)",
          organisation: org || "(not provided)",
          maximo_version: version,
          message: message || "(not provided)",
          botcheck: "",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
      } else {
        setErrorMsg(json.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error — please email aniruddh@assetize.com.au directly.");
      setStatus("error");
    }
  }

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Request a Walkthrough</h1>
          <p className="text-xl text-muted-foreground">
            Experience the precision of MASReady on your schedule.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-card p-8 shadow-2xl">
          {status === "success" ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold">Request Received</h2>
              <p className="text-muted-foreground">
                We'll be in touch shortly to schedule your walkthrough.
              </p>
              <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
                Submit Another
              </Button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Name</label>
                  <input name="name" required type="text" className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Organisation</label>
                  <input name="org" required type="text" className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email <span className="text-red-400">*</span></label>
                <input name="email" required type="email" className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Maximo Version</label>
                <select name="version" className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>MAS Manage 9.x</option>
                  <option>MAS Manage 8.x</option>
                  <option>Maximo 7.6.1.x</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Message</label>
                <textarea name="message" rows={4} className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tell us about your Maximo environment and what you're trying to achieve." />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-2">{errorMsg}</p>
              )}

              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Request Walkthrough"}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Or email us directly at{" "}
                <a href="mailto:aniruddh@assetize.com.au" className="underline underline-offset-2 hover:text-white transition-colors">
                  aniruddh@assetize.com.au
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
