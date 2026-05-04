import { BadgeCheck } from "lucide-react";

export default function Design2Features() {
  const features = [
    { title: "Delivery Intelligence", desc: "Unified delivery confidence score across all project dimensions to assess readiness instantly.", likes: "2.8K" },
    { title: "Requirement Intake", desc: "Structured intake of customer requirements with auditable evidence links.", likes: "1.2K" },
    { title: "Maximo Fingerprint", desc: "Automated scan of installed objects, customisations, and detailed versioning.", likes: "1.9K" },
    { title: "Trust Center", desc: "Audit-first, read-only design with comprehensive immutable trace capture.", likes: "3.2K" },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="sticky top-0 z-10 bg-[#0c1220]/90 backdrop-blur-md border-b border-[#2a3650]">
        <h1 className="text-xl font-bold px-4 py-3">Features</h1>
      </div>

      <article className="border-b border-[#2a3650] p-4 bg-[#0a66c2]/10">
        <div className="flex items-center gap-2 mb-2 text-[#0a66c2] text-[13px] font-bold">
          Introducing the Maximo Delivery Automation Workbench
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Complete Delivery Arsenal</h2>
        <p className="text-[#e7e9ea]">Every tool required to analyze, plan, and execute IBM Maximo delivery with total confidence and zero guesswork.</p>
      </article>

      {features.map((f, i) => (
        <article key={i} className="border-b border-[#2a3650] p-4 hover:bg-[#1a2235]/50 transition-colors cursor-pointer">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1d9bf0] to-[#833ab4] flex items-center justify-center text-white font-bold shrink-0">
              MR
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-[15px] truncate">
                <span className="font-bold text-[#e7e9ea] hover:underline truncate">MASReady</span>
                <BadgeCheck className="w-4 h-4 text-[#1d9bf0] shrink-0" />
                <span className="text-[#71767b] truncate">@masready</span>
              </div>
              <div className="mt-1 text-[15px] leading-normal text-[#e7e9ea]">
                <span className="font-bold">{f.title}:</span> {f.desc}
              </div>
              <div className="mt-2 text-[#71767b] text-[13px]">
                ❤️ {f.likes} likes
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
