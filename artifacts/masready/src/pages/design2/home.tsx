import { Shield, BadgeCheck, MessageCircle, Repeat2, Heart, Bookmark, BarChart3, MoreHorizontal, Pin } from "lucide-react";
import { Link } from "wouter";

export default function Design2Home() {
  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0c1220]/90 backdrop-blur-md border-b border-[#2a3650]">
        <h1 className="text-xl font-bold p-4">Home</h1>
        <div className="flex border-b border-[#2a3650]">
          <button className="flex-1 hover:bg-[#1a2235] transition-colors relative">
            <div className="py-4 text-[15px] font-bold text-white">
              For You
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1d9bf0] rounded-full"></div>
            </div>
          </button>
          <button className="flex-1 hover:bg-[#1a2235] transition-colors">
            <div className="py-4 text-[15px] font-medium text-[#71767b]">Following</div>
          </button>
        </div>
      </div>

      {/* Story Circles (Instagram style) */}
      <div className="p-4 border-b border-[#2a3650] flex gap-4 overflow-x-auto no-scrollbar">
        {[
          { label: "Home", initials: "HO" },
          { label: "MAS9 Power", initials: "M9" },
          { label: "Features", initials: "FE" },
          { label: "Trust", initials: "TR" },
          { label: "Architecture", initials: "AR" },
          { label: "Media", initials: "ME" },
        ].map((story, i) => (
          <div key={i} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group">
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-[#fcb045] via-[#fd1d1d] to-[#833ab4]">
              <div className="w-[60px] h-[60px] rounded-full bg-[#0c1220] border-2 border-[#0c1220] flex items-center justify-center text-white font-bold text-xl group-hover:scale-95 transition-transform">
                {story.initials}
              </div>
            </div>
            <span className="text-xs text-[#71767b]">{story.label}</span>
          </div>
        ))}
      </div>

      {/* Pinned Post (Twitter style) */}
      <article className="border-b border-[#2a3650] p-4 hover:bg-[#1a2235]/50 transition-colors cursor-pointer">
        <div className="flex items-center gap-2 text-[#71767b] text-[13px] font-bold mb-1 ml-10">
          <Pin className="w-3.5 h-3.5" />
          Pinned
        </div>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1d9bf0] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[15px] truncate">
                <span className="font-bold text-[#e7e9ea] hover:underline truncate">MASReady</span>
                <BadgeCheck className="w-4 h-4 text-[#1d9bf0] shrink-0" />
                <span className="text-[#71767b] truncate">@masready · masready.com.au · 2h</span>
              </div>
              <MoreHorizontal className="w-5 h-5 text-[#71767b]" />
            </div>
            
            <div className="mt-1 text-[15px] leading-normal whitespace-pre-wrap text-[#e7e9ea]">
              <p className="font-bold text-xl mb-2">Maximo delivery intelligence, without the chaos.</p>
              <p>Evidence-backed delivery automation for IBM Maximo teams. Combining requirements, environment fingerprints, patch impact, license planning, bot skill-pack coverage, and trust boundaries into one review-ready workbench.</p>
            </div>

            <div className="mt-3 rounded-2xl border border-[#2a3650] overflow-hidden flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#2f3336]">
              <Link href="/design2/mas9-power" className="flex-1 p-4 hover:bg-white/[0.03] transition-colors text-center font-bold text-[#1d9bf0]">
                Explore MAS9 Power →
              </Link>
              <Link href="/design2/trust" className="flex-1 p-4 hover:bg-white/[0.03] transition-colors text-center font-bold text-[#e7e9ea]">
                See Trust Model →
              </Link>
            </div>

            <div className="flex justify-between text-[#71767b] mt-3 max-w-md">
              <div className="flex items-center gap-2 hover:text-[#1d9bf0] group"><MessageCircle className="w-4 h-4" /><span className="text-[13px]">124</span></div>
              <div className="flex items-center gap-2 hover:text-[#00ba7c] group"><Repeat2 className="w-4 h-4" /><span className="text-[13px]">247</span></div>
              <div className="flex items-center gap-2 hover:text-[#f91880] group"><Heart className="w-4 h-4" /><span className="text-[13px]">1.4K</span></div>
              <div className="flex items-center gap-2 hover:text-[#1d9bf0] group"><BarChart3 className="w-4 h-4" /><span className="text-[13px]">12.3K</span></div>
              <div className="flex items-center gap-2 hover:text-[#1d9bf0] group"><Bookmark className="w-4 h-4" /></div>
            </div>
          </div>
        </div>
      </article>

      {/* Metric Tiles (LinkedIn style stats) */}
      <div className="border-b border-[#2a3650] p-4 bg-[#111111]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "23", label: "Seed Files" },
            { value: "46", label: "Customisations" },
            { value: "94", label: "Named Users" },
            { value: "0", label: "Mutations", highlight: true },
          ].map((stat, i) => (
            <div key={i} className="bg-[#1a2235] p-3 rounded-lg border border-[#2a3650] flex flex-col items-center text-center">
              <div className={`text-2xl font-bold ${stat.highlight ? 'text-[#00ba7c]' : 'text-[#e7e9ea]'}`}>
                {stat.value}
                {stat.highlight && <BadgeCheck className="w-4 h-4 inline-block ml-1 -mt-1" />}
              </div>
              <div className="text-[11px] text-[#71767b] uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feed Cards */}
      <article className="border-b border-[#2a3650] p-4 hover:bg-[#1a2235]/50 transition-colors">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded bg-[#0a66c2] flex items-center justify-center shrink-0">
            <span className="text-white font-bold">in</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 text-[15px]">
              <span className="font-bold hover:underline">MASReady</span>
              <span className="text-[#71767b]">· 1st</span>
            </div>
            <div className="text-[#71767b] text-xs mb-2">Promoted</div>
            <div className="bg-[#1a2235] border border-[#2a3650] rounded-xl overflow-hidden mt-2">
              <div className="p-4 border-b border-[#2a3650] bg-[#0c1220]">
                <h3 className="font-bold text-lg mb-2">What the Workbench Does</h3>
                <ul className="text-[15px] space-y-2 text-[#e7e9ea] list-disc list-inside">
                  <li>Delivery Intelligence scoring</li>
                  <li>Maximo Fingerprint scanning</li>
                  <li>License Planning visibility</li>
                  <li>Trust Center read-only audit</li>
                </ul>
              </div>
              <div className="p-3 bg-[#111111] flex justify-between items-center text-[13px] font-bold hover:bg-white/[0.03] cursor-pointer">
                <span>Read more on LinkedIn</span>
                <span className="text-[#0a66c2]">View article →</span>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="border-b border-[#2a3650] p-0 hover:bg-[#1a2235]/50 transition-colors relative h-[400px] flex flex-col justify-end overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#25f4ee] to-black opacity-20"></div>
        <div className="p-6 relative z-10 flex flex-col">
          <div className="text-[120px] leading-none font-black text-[#25f4ee] tracking-tighter mix-blend-screen">0</div>
          <div className="text-4xl font-bold text-white mt-[-10px] mb-4">Production Mutations. Ever.</div>
          <div className="flex gap-2 items-center">
            <span className="bg-[#fe2c55] text-white px-2 py-1 rounded text-xs font-bold">#Trust</span>
            <span className="bg-black/50 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur">@masready</span>
          </div>
        </div>
      </article>

    </div>
  );
}
