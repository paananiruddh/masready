import { Shield } from "lucide-react";
import { Link, useLocation } from "wouter";

function DebugBanner() {
  const [location] = useLocation();
  const isDebug = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("debug") === "1";
  if (!isDebug) return null;

  const buildTime = import.meta.env.VITE_BUILD_TIME ?? "dev";
  const commitSha  = import.meta.env.VITE_COMMIT_SHA  ?? "unknown";
  const demoMode   = "true";

  return (
    <div className="border-t border-amber-400/30 bg-amber-950/30 px-4 py-3 text-xs font-mono">
      <div className="container mx-auto flex flex-wrap gap-x-6 gap-y-1 text-amber-400/80">
        <span>Build source: <strong className="text-amber-300">React SPA</strong> (artifacts/masready/src)</span>
        <span>Route: <strong className="text-amber-300">{location}</strong></span>
        <span>Build time: <strong className="text-amber-300">{buildTime}</strong></span>
        <span>Commit: <strong className="text-amber-300">{commitSha}</strong></span>
        <span>PUBLIC_DEMO_MODE: <strong className="text-amber-300">{demoMode}</strong></span>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <Shield className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold tracking-tight text-foreground text-lg">MASReady</span>
        </div>

        <p className="text-sm text-muted-foreground text-center md:text-left">
          The Maximo Delivery Automation Workbench. Designed for IBM MAS 9.
        </p>

        <div className="flex gap-4">
          <Link href="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            News
          </Link>
          <Link href="/trust" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Trust Center
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
      <div className="border-t border-border mt-6 pt-4">
        <p className="text-center text-xs text-muted-foreground/60">
          Powered by{" "}
          <a
            href="https://overpayingforai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors underline underline-offset-2"
          >
            OverPayingforAI.com
          </a>
        </p>
      </div>
      <DebugBanner />
    </footer>
  );
}
