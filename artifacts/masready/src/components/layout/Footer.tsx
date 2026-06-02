import { Shield } from "lucide-react";
import { Link } from "wouter";

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
    </footer>
  );
}
