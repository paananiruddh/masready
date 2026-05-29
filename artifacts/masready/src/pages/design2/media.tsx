import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

export default function Design2Media() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const charts = [
    { title: "License Usage", bg: "bg-[#1d9bf0]" },
    { title: "Patch Impact", bg: "bg-[#fe2c55]" },
    { title: "Skill Coverage", bg: "bg-[#00ba7c]" },
    { title: "Delivery Score", bg: "bg-[#833ab4]" },
    { title: "Environment Map", bg: "bg-[#fcb045]" },
    { title: "User Activity", bg: "bg-[#25f4ee]" },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="sticky top-0 z-10 bg-[#0c1220]/90 backdrop-blur-md border-b border-[#2a3650]">
        <h1 className="text-xl font-bold px-4 py-3">Media</h1>
      </div>

      <div className="flex justify-around p-4 border-b border-[#2a3650]">
        <div className="font-bold border-b-2 border-white pb-1">Charts</div>
        <div className="text-[#71767b]">Diagrams</div>
        <div className="text-[#71767b]">Videos</div>
      </div>

      <div className="grid grid-cols-3 gap-0.5 bg-[#2f3336]">
        {charts.map((chart, i) => (
          <div 
            key={i} 
            onClick={() => setExpanded(expanded === i ? null : i)}
            className={`${chart.bg} aspect-square flex items-center justify-center cursor-pointer relative group transition-all`}
            style={{ gridColumn: expanded === i ? 'span 3' : 'span 1' }}
          >
            {expanded === i ? (
              <div className="text-center p-4 bg-black/50 w-full h-full flex flex-col items-center justify-center backdrop-blur-sm">
                <ImageIcon className="w-12 h-12 text-white mb-2" />
                <h3 className="font-bold text-2xl text-white">{chart.title}</h3>
                <p className="text-white/80 mt-2">Click to collapse</p>
              </div>
            ) : (
              <h3 className="font-bold text-white text-center px-2 group-hover:scale-110 transition-transform">{chart.title}</h3>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
