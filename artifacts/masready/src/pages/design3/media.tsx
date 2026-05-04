export default function Design3Media() {
  return (
    <div className="max-w-5xl mx-auto font-mono py-12 text-center text-[#8b95a7]">
      <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-6 border-b border-[#00d4ff]/30 pb-4 inline-block">TELEMETRY_VIEWER</h1>
      <div className="border border-[#00d4ff]/20 bg-[#0a1520] p-12">
        <p className="mb-4">Connecting to telemetry streams...</p>
        <div className="w-16 h-16 border-4 border-[#00d4ff]/20 border-t-[#00d4ff] rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
