import { Send } from "lucide-react";

export default function Design2Contact() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-[#0c1220]/90 backdrop-blur-md border-b border-[#2a3650]">
        <h1 className="text-xl font-bold px-4 py-3">Contact</h1>
      </div>

      <div className="p-6 border-b border-[#2a3650]">
        <h2 className="text-3xl font-extrabold mb-2">Slide into our DMs</h2>
        <p className="text-[#71767b] mb-6">Drop us a message. We usually respond within a few hours.</p>

        <div className="bg-[#1a2235] border border-[#2a3650] rounded-2xl p-4">
          <textarea 
            placeholder="What's happening?" 
            className="w-full bg-transparent outline-none resize-none text-xl text-white placeholder:text-[#71767b] min-h-[120px]"
          ></textarea>
          <div className="flex justify-between items-center border-t border-[#2a3650] pt-3 mt-2">
            <span className="text-[#1d9bf0] text-sm font-bold">Everyone can reply</span>
            <button className="bg-[#1d9bf0] text-white font-bold py-1.5 px-4 rounded-full flex items-center gap-2 hover:bg-[#1a8cd8] transition-colors">
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1">
        <h3 className="font-bold text-xl mb-4">Direct Channels</h3>
        <div className="grid gap-3">
          {[
            { name: "Demo Walkthrough", handle: "@schedule_demo", desc: "Book a guided tour of the MAS9 Power environment." },
            { name: "Technical Assessment", handle: "@tech_eval", desc: "Discuss how MASReady fits into your architecture." },
            { name: "General Inquiry", handle: "@hello", desc: "Everything else." },
          ].map((channel, i) => (
            <div key={i} className="p-4 rounded-xl border border-[#2a3650] bg-[#1a2235] hover:bg-[#1a2235]/80 transition-colors cursor-pointer flex justify-between items-center">
              <div>
                <h4 className="font-bold text-white text-[15px]">{channel.name}</h4>
                <p className="text-[#1d9bf0] text-[15px]">{channel.handle}</p>
                <p className="text-[#71767b] text-sm mt-1">{channel.desc}</p>
              </div>
              <button className="bg-white text-black font-bold py-1.5 px-4 rounded-full text-sm">Message</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
