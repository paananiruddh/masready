import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Home, Zap, List, Shield, GitMerge, Image, MonitorPlay, Rocket, Mail, 
  Terminal, Activity, Server, Database
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "OVERVIEW", icon: Home },
  { href: "/mas9-power", label: "MAS9_POWER", icon: Zap },
  { href: "/features", label: "CAPABILITIES", icon: List },
  { href: "/trust", label: "TRUST_MODEL", icon: Shield },
  { href: "/architecture", label: "ARCHITECTURE", icon: GitMerge },
  { href: "/media", label: "TELEMETRY", icon: Image },
  { href: "/demo-walkthrough", label: "MISSION_BRIEF", icon: MonitorPlay },
  { href: "/launch", label: "SYSTEM_LAUNCH", icon: Rocket },
  { href: "/contact", label: "OPEN_COMMS", icon: Mail },
];

export default function Design3Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location === "/design3" || location === "/design3/";
    const target = "/design3" + href;
    return location === target || location.startsWith(target + "/");
  };

  return (
    <div className="min-h-screen text-[#c8d8e8] font-mono selection:bg-[#00ff88]/30 flex justify-center bg-[#050a0f]">
      <div className="w-full max-w-[1400px] flex justify-between relative">
        
        {/* CRT Scanline Overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, #00ff88 1px, #00ff88 2px)" }}></div>

        {/* LEFT SIDEBAR */}
        <header className="hidden sm:flex flex-col w-[88px] xl:w-[280px] h-screen sticky top-0 pt-6 pb-4 px-2 xl:px-6 justify-between bg-[#0a1520] border-r border-[#00ff88]/20" style={{ boxShadow: "1px 0 20px rgba(0, 255, 136, 0.05)" }}>
          <div className="flex flex-col gap-6 w-full items-center xl:items-start">
            <Link href="/design3" className="flex items-center gap-3 px-2 mb-4 group cursor-pointer">
              <Terminal className="w-8 h-8 text-[#00ff88] group-hover:animate-pulse" />
              <div className="hidden xl:flex font-bold text-xl tracking-widest text-[#00ff88]">
                MASReady<span className="animate-pulse">_</span>
              </div>
            </Link>
            
            <nav className="flex flex-col gap-2 w-full">
              {NAV_LINKS.map(link => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={`/design3${link.href === "/" ? "" : link.href}`}
                    data-testid={`nav-${link.label.toLowerCase().replace(/_/g, "-")}`}
                    className="group flex w-fit xl:w-full items-center"
                  >
                    <div className={cn(
                      "flex items-center gap-4 py-3 px-4 xl:w-full transition-all duration-300 border-l-2",
                      active
                        ? "border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88]"
                        : "border-transparent text-[#8b95a7] hover:border-[#00ff88]/50 hover:bg-[#00ff88]/5 hover:text-[#c8d8e8]",
                    )}
                    style={active ? { boxShadow: "inset 10px 0 20px -10px rgba(0, 255, 136, 0.3)" } : {}}
                    >
                      <link.icon className="w-5 h-5 shrink-0" />
                      <span className="hidden xl:inline text-sm tracking-widest uppercase">{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="hidden xl:flex flex-col px-4 text-xs gap-2 text-[#8b95a7] border-t border-[#00ff88]/20 pt-4">
              <div>STATUS: <span className="text-[#00ff88]">ONLINE</span></div>
              <span>
                POWERED_BY: <a href="https://overpayingforai.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff88] transition-colors border-b border-transparent hover:border-[#00ff88]">OverPayingforAI.com</a>
              </span>
            </div>
          </div>
        </header>

        {/* MOBILE BOTTOM NAV */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-[60px] border-t border-[#00ff88]/20 flex items-center justify-around px-2 z-40 bg-[#0a1520]" style={{ boxShadow: "0 -5px 20px rgba(0, 255, 136, 0.1)" }}>
          <Link href="/design3" className="p-3 text-[#00ff88]"><Home className="w-6 h-6" /></Link>
          <Link href="/design3/features" className="p-3 text-[#8b95a7] hover:text-[#00ff88]"><List className="w-6 h-6" /></Link>
          <Link href="/design3/trust" className="p-3 text-[#8b95a7] hover:text-[#00ff88]"><Shield className="w-6 h-6" /></Link>
          <Link href="/design3/contact" className="p-3 text-[#8b95a7] hover:text-[#00ff88]"><Mail className="w-6 h-6" /></Link>
        </nav>

        {/* CENTER FEED */}
        <main className="w-full min-h-screen pb-[60px] sm:pb-0 flex-1 px-4 lg:px-8 py-8 relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#00ff88]/5 to-transparent pointer-events-none"></div>
          {children}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-[320px] shrink-0 border-l border-[#00ff88]/20 bg-[#0a1520] h-screen sticky top-0 p-6 gap-6" style={{ boxShadow: "-1px 0 20px rgba(0, 255, 136, 0.05)" }}>
          
          <div className="p-4 border border-[#00ff88]/30 bg-[#050a0f] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h2 className="text-xs text-[#00ff88] font-bold tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> SYSTEM_STATUS
            </h2>
            
            <div className="space-y-3 text-xs">
              {[
                { name: "CORE_ENGINE", status: "NOMINAL" },
                { name: "EVIDENCE_API", status: "SYNCED" },
                { name: "TRUST_PROXY", status: "ACTIVE" },
                { name: "SKILL_MATRIX", status: "LOADED" }
              ].map((sys, i) => (
                <div key={i} className="flex justify-between items-center border-b border-[#00ff88]/10 pb-2">
                  <span className="text-[#8b95a7]">{sys.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#c8d8e8]">{sys.status}</span>
                    <div className="w-2 h-2 bg-[#00ff88] rounded-full shadow-[0_0_8px_#00ff88] animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border border-[#00d4ff]/30 bg-[#050a0f] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h2 className="text-xs text-[#00d4ff] font-bold tracking-widest mb-4 flex items-center gap-2">
              <Server className="w-4 h-4" /> LIVE_METRICS
            </h2>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#0a1520] p-2 border border-[#00d4ff]/20 text-center">
                <div className="text-[#8b95a7] mb-1 text-[10px]">SCANNED</div>
                <div className="text-xl text-[#00d4ff]">46</div>
              </div>
              <div className="bg-[#0a1520] p-2 border border-[#00d4ff]/20 text-center">
                <div className="text-[#8b95a7] mb-1 text-[10px]">IMPACTS</div>
                <div className="text-xl text-[#00d4ff]">7</div>
              </div>
              <div className="bg-[#0a1520] p-2 border border-[#00d4ff]/20 text-center">
                <div className="text-[#8b95a7] mb-1 text-[10px]">APP_PTS</div>
                <div className="text-xl text-[#00d4ff]">77%</div>
              </div>
              <div className="bg-[#0a1520] p-2 border border-[#00d4ff]/20 text-center">
                <div className="text-[#8b95a7] mb-1 text-[10px]">READINESS</div>
                <div className="text-xl text-[#00ff88]">87</div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-[#00ff88]/20 flex flex-col gap-2 text-[10px] text-[#8b95a7]">
            <div className="flex items-center gap-2">
              <Database className="w-3 h-3" /> DB_CONN: ISOLATED
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3" /> MUTATION_LOCK: ON
            </div>
            <div className="mt-2 opacity-50">v9.2.4 // BUILD_8472</div>
          </div>

        </aside>

      </div>
    </div>
  );
}
