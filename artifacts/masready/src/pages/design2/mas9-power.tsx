import { Shield, BadgeCheck, Zap } from "lucide-react";

export default function Design2MAS9Power() {
  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0c1220]/90 backdrop-blur-md border-b border-[#2a3650]">
        <h1 className="text-xl font-bold px-4 py-3">MAS9 Power</h1>
      </div>

      {/* Profile Cover & Info */}
      <div className="w-full">
        <div className="h-32 sm:h-48 bg-gradient-to-r from-[#1d9bf0] to-[#833ab4]"></div>
        <div className="px-4 pb-4 border-b border-[#2a3650]">
          <div className="flex justify-between items-end relative -mt-16 sm:-mt-20 mb-4">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#0c1220] bg-black flex items-center justify-center shrink-0">
              <Zap className="w-16 h-16 text-[#1d9bf0]" />
            </div>
            <button className="bg-white text-black font-bold py-1.5 px-4 rounded-full hover:bg-white/90 transition-colors">
              Follow
            </button>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h2 className="text-xl font-extrabold">MAS9 Power Demo</h2>
              <BadgeCheck className="w-5 h-5 text-[#1d9bf0]" />
            </div>
            <span className="text-[#71767b] text-[15px]">@mas9_power_demo</span>
          </div>
          
          <div className="mt-3 text-[15px] text-[#e7e9ea] leading-relaxed">
            Fictional energy/utilities company running IBM Maximo Application Suite Manage 9.x. See how MASReady handles complex environments safely.
          </div>
          
          <div className="flex gap-4 mt-3 text-[15px]">
            <div className="flex gap-1 hover:underline cursor-pointer"><span className="font-bold text-white">1,847</span> <span className="text-[#71767b]">AppPoints Used</span></div>
            <div className="flex gap-1 hover:underline cursor-pointer"><span className="font-bold text-white">2,400</span> <span className="text-[#71767b]">Entitled</span></div>
            <div className="flex gap-1 hover:underline cursor-pointer"><span className="font-bold text-white">94</span> <span className="text-[#71767b]">Named Users</span></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2a3650]">
        {["Posts", "Replies", "Media", "Likes"].map((tab, i) => (
          <button key={i} className="flex-1 hover:bg-[#1a2235] transition-colors relative">
            <div className={`py-4 text-[15px] ${i === 0 ? "font-bold text-white" : "font-medium text-[#71767b]"}`}>
              {tab}
              {i === 0 && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1d9bf0] rounded-full"></div>}
            </div>
          </button>
        ))}
      </div>

      {/* Posts */}
      <article className="border-b border-[#2a3650] p-4 hover:bg-[#1a2235]/50 transition-colors cursor-pointer">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-[#2a3650] shrink-0">
            <Zap className="w-5 h-5 text-[#1d9bf0]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[15px] truncate">
                <span className="font-bold text-[#e7e9ea] hover:underline truncate">MAS9 Power Demo</span>
                <BadgeCheck className="w-4 h-4 text-[#1d9bf0] shrink-0" />
                <span className="text-[#71767b] truncate">@mas9_power_demo · 1h</span>
              </div>
            </div>
            <div className="mt-1 text-[15px] leading-normal text-[#e7e9ea]">
              Just ran a patch impact analysis against our MAS 9.0 environment. Identified 7 potential impacts before we even touched a sandbox. The Delivery Intelligence score is a game changer.
            </div>
          </div>
        </div>
      </article>

    </div>
  );
}
