import { BadgeCheck, AlertTriangle } from "lucide-react";

export default function Design2Trust() {
  return (
    <div className="w-full flex flex-col">
      <div className="sticky top-0 z-10 bg-[#0c1220]/90 backdrop-blur-md border-b border-[#2a3650]">
        <h1 className="text-xl font-bold px-4 py-3">Trust</h1>
      </div>

      <div className="p-8 border-b border-[#2a3650] flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#0a66c2]/20 to-black">
        <BadgeCheck className="w-20 h-20 text-[#1d9bf0] mb-4" />
        <h2 className="text-4xl font-extrabold text-white mb-2">6 trust pillars.</h2>
        <h2 className="text-4xl font-extrabold text-[#00ba7c] mb-4">Zero mutations.</h2>
        <p className="text-[#71767b] text-lg">By design.</p>
      </div>

      <article className="border-b border-[#2a3650] p-4 bg-[#ff9800]/10 border-l-4 border-l-[#ff9800]">
        <div className="flex items-center gap-2 font-bold text-[#ff9800] mb-2">
          <AlertTriangle className="w-5 h-5" />
          Important notice
        </div>
        <p className="text-[#e7e9ea] text-[15px]">
          License usage planning features are provided for internal planning and visibility purposes only. MASReady outputs do not constitute legal, contractual, IBM-certified, or formal compliance advice.
        </p>
      </article>

      <div className="p-4 border-b border-[#2a3650]">
        <h3 className="font-bold text-xl mb-4">How MASReady handles your data — a thread 🧵</h3>
        {[
          "Review-Only Design: Generates outputs and insights only. The workbench contains zero execution capabilities.",
          "No SQL Execution: Architecturally restricted from executing write operations against any database.",
          "No Maximo Mutation: Integrates with Maximo via read-only APIs exclusively. Changes are impossible.",
          "No Jira Mutation: Extracts requirements and evidence via read-only connections.",
          "No ADO Mutation: Connects to Azure DevOps purely to map pipeline status, never to trigger builds.",
          "Data Boundary: Customer-hosted data models ensure zero exfiltration of proprietary information."
        ].map((item, i) => (
          <div key={i} className="flex gap-3 mb-4 relative">
            {i !== 5 && <div className="absolute top-10 bottom-[-16px] left-5 w-0.5 bg-[#2f3336]"></div>}
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border border-[#2a3650] shrink-0 z-10">
              <BadgeCheck className="w-5 h-5 text-[#00ba7c]" />
            </div>
            <div className="flex-1 pt-1.5 pb-2">
              <div className="text-[15px] leading-normal text-[#e7e9ea]">
                {item}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
