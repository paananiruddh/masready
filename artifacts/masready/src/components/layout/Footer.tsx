import { Shield } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-12 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-tight text-white text-lg">MASReady</span>
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
      <div className="border-t border-white/5 mt-6 pt-4">
        <p className="text-center text-xs text-muted-foreground/50">
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
