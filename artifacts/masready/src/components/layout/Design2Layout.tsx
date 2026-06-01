import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Home, Zap, List, Shield, GitMerge, Image, Presentation, Rocket, Mail, 
  Search, Bell, BadgeCheck, MoreHorizontal, ClipboardCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/mas9-power", label: "MAS9 Power", icon: Zap },
  { href: "/features", label: "Features", icon: List },
  { href: "/trust", label: "Trust", icon: Shield },
  { href: "/audit-checklist", label: "Audit Checklist", icon: ClipboardCheck },
  { href: "/architecture", label: "Architecture", icon: GitMerge },
  { href: "/media", label: "Media", icon: Image },
  { href: "/demo-walkthrough", label: "Walkthrough", icon: Presentation },
  { href: "/launch", label: "Launch", icon: Rocket },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Design2Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location === "/" || location === "";
    return location === href || location.startsWith(href + "/");
  };

  return (
    <div className="min-h-screen text-[#e7e9ea] font-sans selection:bg-[#1d9bf0]/30 flex justify-center" style={{ backgroundColor: "#0c1220" }}>
      <div className="w-full max-w-[1265px] flex justify-between">
        
        {/* LEFT SIDEBAR */}
        <header className="hidden sm:flex flex-col w-[88px] xl:w-[275px] h-screen sticky top-0 pt-2 pb-4 px-2 xl:px-4 justify-between" style={{ borderRight: "1px solid #2a3650" }}>
          <div className="flex flex-col gap-2 w-full items-center xl:items-start">
            <Link href="/" className="p-3 w-fit rounded-full transition-colors mb-2 flex items-center justify-center hover:bg-white/10">
              <Shield className="w-8 h-8 text-[#e7e9ea]" />
            </Link>
            
            <nav className="flex flex-col gap-1 w-full">
              {NAV_LINKS.map(link => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group flex w-fit xl:w-full items-center"
                  >
                    <div className={cn(
                      "flex items-center gap-4 p-3 rounded-full xl:w-fit transition-colors",
                      active
                        ? "font-bold text-white"
                        : "font-medium text-[#e7e9ea] hover:bg-white/10",
                    )}>
                      <link.icon className={cn("w-7 h-7", active ? "text-white" : "text-[#e7e9ea]")} />
                      <span className="hidden xl:inline text-xl mr-4">{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center p-3 rounded-full transition-colors cursor-pointer w-full justify-center xl:justify-start hover:bg-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1d9bf0] to-[#833ab4] flex items-center justify-center text-white font-bold shrink-0">
                MR
              </div>
              <div className="hidden xl:flex flex-col ml-3 mr-auto overflow-hidden">
                <div className="flex items-center gap-1">
                  <span className="font-bold truncate text-sm">MASReady</span>
                  <BadgeCheck className="w-4 h-4 text-[#1d9bf0] shrink-0" />
                </div>
                <span className="text-sm truncate" style={{ color: "#8b95a7" }}>@masready</span>
              </div>
              <MoreHorizontal className="hidden xl:block w-5 h-5 text-[#e7e9ea] shrink-0" />
            </div>
            
            <div className="hidden xl:flex flex-col px-4 text-[13px] gap-1" style={{ color: "#8b95a7" }}>
              <span>
                Powered by{" "}
                <a href="https://overpayingforai.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#1d9bf0]">
                  OverPayingforAI.com
                </a>
              </span>
              <div className="flex gap-2 flex-wrap">
                <Link href="/trust" className="hover:underline">Trust</Link>
                <Link href="/architecture" className="hover:underline">Architecture</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </div>
            </div>
          </div>
        </header>

        {/* MOBILE BOTTOM NAV */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-[60px] border-t flex items-center justify-around px-2 z-50" style={{ backgroundColor: "#0c1220", borderColor: "#2a3650" }}>
          <Link href="/" className="p-3" data-testid="mobile-nav-home"><Home className="w-6 h-6" /></Link>
          <Link href="/features" className="p-3" data-testid="mobile-nav-features"><Search className="w-6 h-6" /></Link>
          <Link href="/trust" className="p-3" data-testid="mobile-nav-trust"><Bell className="w-6 h-6" /></Link>
          <Link href="/contact" className="p-3" data-testid="mobile-nav-contact"><Mail className="w-6 h-6" /></Link>
        </nav>

        {/* CENTER FEED */}
        <main className="w-full sm:max-w-[600px] min-h-screen pb-[60px] sm:pb-0" style={{ borderLeft: "1px solid #2a3650", borderRight: "1px solid #2a3650" }}>
          {children}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-[350px] pl-8 py-2 sticky top-0 h-screen overflow-y-auto">
          <div className="sticky top-0 pb-2 z-10" style={{ backgroundColor: "#0c1220" }}>
            <div className="relative group">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#8b95a7" }} />
              <input 
                type="text" 
                placeholder="Search MASReady"
                data-testid="search-input"
                className="w-full rounded-full py-3 pl-12 pr-4 outline-none text-[#e7e9ea] transition-colors focus:border-[#1d9bf0]"
                style={{ backgroundColor: "#1a2235", border: "1px solid transparent" }}
              />
            </div>
          </div>

          <div className="rounded-2xl mb-4 pt-3 flex flex-col" style={{ backgroundColor: "#1a2235", border: "1px solid #2a3650" }}>
            <h2 className="text-xl font-extrabold px-4 pb-3">What&apos;s trending</h2>
            {[
              { category: "Delivery · Trending", topic: "Zero Production Mutations", posts: "12.5K posts" },
              { category: "Technology · Trending", topic: "Maximo AppPoints", posts: "8,241 posts" },
              { category: "Security · Trending", topic: "Review-Only Design", posts: "5,102 posts" },
            ].map((trend, i) => (
              <div key={i} className="px-4 py-3 transition-colors cursor-pointer hover:bg-white/5">
                <div className="text-[13px] flex justify-between" style={{ color: "#8b95a7" }}>
                  <span>{trend.category}</span>
                  <MoreHorizontal className="w-4 h-4" />
                </div>
                <div className="font-bold mt-0.5">{trend.topic}</div>
                <div className="text-[13px] mt-0.5" style={{ color: "#8b95a7" }}>{trend.posts}</div>
              </div>
            ))}
            <div className="px-4 py-4 text-[#1d9bf0] rounded-b-2xl transition-colors cursor-pointer text-[15px] hover:bg-white/5">
              Show more
            </div>
          </div>

          <div className="rounded-2xl flex flex-col" style={{ backgroundColor: "#1a2235", border: "1px solid #2a3650" }}>
            <h2 className="text-xl font-extrabold px-4 py-3">Who to follow</h2>
            {[
              { name: "Delivery Bot", handle: "@mas_delivery", initials: "DB", color: "from-[#fe2c55] to-[#25f4ee]" },
              { name: "Trust Updates", handle: "@maximo_trust", initials: "TU", color: "from-[#833ab4] to-[#fd1d1d]" },
              { name: "MAS9 Demo", handle: "@mas9_power", initials: "M9", color: "from-[#1d9bf0] to-[#0a66c2]" },
            ].map((profile, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between transition-colors cursor-pointer hover:bg-white/5">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${profile.color} flex items-center justify-center text-white font-bold shrink-0`}>
                    {profile.initials}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-[15px] truncate hover:underline">{profile.name}</span>
                    <span className="text-[15px] truncate" style={{ color: "#8b95a7" }}>{profile.handle}</span>
                  </div>
                </div>
                <button className="bg-white text-black font-bold text-sm px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors ml-2 shrink-0">
                  Follow
                </button>
              </div>
            ))}
            <div className="px-4 py-4 text-[#1d9bf0] rounded-b-2xl transition-colors cursor-pointer text-[15px] hover:bg-white/5">
              Show more
            </div>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-1 px-4 py-4 text-[13px]" style={{ color: "#8b95a7" }}>
            <a href="https://overpayingforai.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#1d9bf0]">OverPayingforAI.com</a>
            <Link href="/trust" className="hover:underline">Trust</Link>
            <Link href="/architecture" className="hover:underline">Architecture</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <span>© 2025 MASReady.</span>
          </div>
        </aside>

      </div>
    </div>
  );
}
