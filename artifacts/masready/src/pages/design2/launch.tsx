export default function Design2Launch() {
  return (
    <div className="w-full flex flex-col">
      <div className="sticky top-0 z-10 bg-[#0c1220]/90 backdrop-blur-md border-b border-[#2a3650]">
        <h1 className="text-xl font-bold px-4 py-3">Launch</h1>
      </div>

      <article className="border-b border-[#2a3650] p-4 bg-[#0a66c2]/10">
        <h2 className="text-3xl font-bold text-white mb-4">MASReady is officially live 🎉</h2>
        <p className="text-[#e7e9ea] text-[15px] mb-4 leading-relaxed">
          After months of development and rigorous testing against complex Maximo environments, we're thrilled to announce the launch of MASReady — the Delivery Automation Workbench built specifically for IBM MAS 9.
        </p>
        <div className="flex gap-4 border-t border-[#2a3650]/50 pt-4">
          <div className="flex items-center gap-1 text-[#0a66c2]"><span className="text-xl">👍</span> 1.2K</div>
          <div className="flex items-center gap-1 text-[#00ba7c]"><span className="text-xl">👏</span> 856</div>
          <div className="flex items-center gap-1 text-[#fcb045]"><span className="text-xl">💡</span> 432</div>
        </div>
      </article>

      <div className="p-4 border-b border-[#2a3650]">
        <h3 className="font-bold text-xl mb-4">What's new</h3>
        <div className="bg-[#1a2235] rounded-xl border border-[#2a3650] overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-[#16181c] to-[#2f3336]">
            <h4 className="font-bold text-lg text-white">v1.0.0 Release Notes</h4>
          </div>
          <div className="p-4 text-[15px] text-[#e7e9ea] space-y-3">
            <p>✅ Full support for MAS Manage 9.x</p>
            <p>✅ Delivery Intelligence Scoring engine</p>
            <p>✅ AppPoint utilization forecasting</p>
            <p>✅ Zero-mutation guarantee certified</p>
          </div>
        </div>
      </div>
    </div>
  );
}
