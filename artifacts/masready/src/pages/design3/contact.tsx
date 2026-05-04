export default function Design3Contact() {
  return (
    <div className="max-w-3xl mx-auto font-mono py-12">
      <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-6 border-b border-[#00ff88]/30 pb-4">OPEN_COMMS_CHANNEL</h1>
      <form className="border border-[#00ff88]/30 bg-[#0a1520] p-8 space-y-6">
        <div>
          <label className="block text-[#00ff88] text-xs font-bold mb-2">IDENTIFIER</label>
          <input type="text" className="w-full bg-[#050a0f] border border-[#00ff88]/30 text-white p-3 outline-none focus:border-[#00ff88] transition-colors" placeholder="Name or Callsign" />
        </div>
        <div>
          <label className="block text-[#00ff88] text-xs font-bold mb-2">ROUTING_ADDRESS</label>
          <input type="email" className="w-full bg-[#050a0f] border border-[#00ff88]/30 text-white p-3 outline-none focus:border-[#00ff88] transition-colors" placeholder="Email" />
        </div>
        <div>
          <label className="block text-[#00ff88] text-xs font-bold mb-2">PAYLOAD</label>
          <textarea rows={5} className="w-full bg-[#050a0f] border border-[#00ff88]/30 text-white p-3 outline-none focus:border-[#00ff88] transition-colors" placeholder="Message content..."></textarea>
        </div>
        <button type="button" className="w-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/50 p-4 font-bold uppercase tracking-widest hover:bg-[#00ff88]/20 transition-all shadow-[0_0_10px_rgba(0,255,136,0.1)] hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]">
          TRANSMIT
        </button>
      </form>
    </div>
  );
}
