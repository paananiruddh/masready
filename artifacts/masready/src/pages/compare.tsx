import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Copy, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Compare() {
  const [vote, setVote] = useState<string | null>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({ design1: 0, design2: 0, design3: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedVote = localStorage.getItem("masready_vote");
    if (savedVote) setVote(savedVote);
    
    const savedCounts = localStorage.getItem("masready_vote_counts");
    if (savedCounts) {
      setCounts(JSON.parse(savedCounts));
    } else {
      // Initialize with some mock data for effect
      const init = { design1: 42, design2: 128, design3: 89 };
      setCounts(init);
      localStorage.setItem("masready_vote_counts", JSON.stringify(init));
    }
  }, []);

  const handleVote = (designId: string) => {
    if (vote) return;
    setVote(designId);
    localStorage.setItem("masready_vote", designId);
    
    const newCounts = { ...counts, [designId]: counts[designId] + 1 };
    setCounts(newCounts);
    localStorage.setItem("masready_vote_counts", JSON.stringify(newCounts));
  };

  const resetVote = () => {
    if (!vote) return;
    const newCounts = { ...counts, [vote]: Math.max(0, counts[vote] - 1) };
    setCounts(newCounts);
    localStorage.setItem("masready_vote_counts", JSON.stringify(newCounts));
    
    setVote(null);
    localStorage.removeItem("masready_vote");
  };

  const copyPoll = () => {
    const text = `Which MASReady design direction should we ship?\n\n1. Design 1: Clean & Professional\n2. Design 2: Social Feed Style\n3. Design 3: Command Center Cockpit\n\nVote here: https://masready.com/compare`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Which design direction should we ship?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We built three entirely different visual paradigms for the MASReady platform. 
            Help us choose the one that resonates best.
          </p>
        </div>

        {vote && (
          <div className="mb-12 p-4 bg-primary/10 border border-primary/30 rounded-xl text-center flex items-center justify-center gap-3">
            <CheckCircle className="text-primary w-5 h-5" />
            <span className="font-medium">You voted for {
              vote === "design1" ? "Design 1 (Clean)" : 
              vote === "design2" ? "Design 2 (Social)" : 
              "Design 3 (Command Center)"
            }</span>
            <button onClick={resetVote} className="ml-4 text-sm text-muted-foreground hover:text-foreground underline">Change vote</button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Design 1 */}
          <div data-testid="vote-card-design1" className={cn("rounded-2xl border p-6 flex flex-col transition-all", vote === "design1" ? "border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]" : "border-border hover:border-muted-foreground")}>
            <div className="h-40 rounded-xl mb-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-2">
              <div className="w-1/2 h-4 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
              <div className="w-3/4 h-3 bg-zinc-200 dark:bg-zinc-800 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 bg-white dark:bg-zinc-950 rounded shadow-sm border border-zinc-100 dark:border-zinc-800"></div>
                <div className="h-12 bg-white dark:bg-zinc-950 rounded shadow-sm border border-zinc-100 dark:border-zinc-800"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Design 1</h2>
            <p className="font-medium mb-2 text-primary">Clean & Professional</p>
            <p className="text-sm text-muted-foreground mb-4 flex-1">Standard enterprise SaaS aesthetic. Familiar, trustworthy, and content-focused with generous whitespace.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 text-xs rounded bg-muted">Best for: Enterprise</span>
              <span className="px-2 py-1 text-xs rounded bg-muted">Executives</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                data-testid="vote-btn-design1"
                onClick={() => handleVote("design1")}
                disabled={!!vote}
                className={cn("flex-1 py-2 rounded-lg font-medium transition-colors", vote === "design1" ? "bg-primary text-primary-foreground" : vote ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90")}
              >
                {vote === "design1" ? "Voted" : "Vote for this"}
              </button>
              <Link href="/" className="px-4 py-2 border rounded-lg text-sm hover:bg-muted font-medium">View</Link>
            </div>
            <div data-testid="vote-count-design1" className="mt-4 text-center text-sm text-muted-foreground">{counts.design1} votes</div>
          </div>

          {/* Design 2 */}
          <div data-testid="vote-card-design2" className={cn("rounded-2xl border p-6 flex flex-col transition-all", vote === "design2" ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]" : "border-border hover:border-muted-foreground")}>
            <div className="h-40 rounded-xl mb-6 bg-[#0c1220] border border-[#2a3650] p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                <div className="w-24 h-3 bg-[#1a2235] rounded"></div>
              </div>
              <div className="w-full h-16 rounded-lg border border-[#2a3650] bg-[#1a2235]"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Design 2</h2>
            <p className="font-medium mb-2 text-blue-500">Social Feed Style</p>
            <p className="text-sm text-muted-foreground mb-4 flex-1">Radically different engagement model mirroring social media patterns. Infinite scroll, high density, dark mode only.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 text-xs rounded bg-muted">Best for: Engineers</span>
              <span className="px-2 py-1 text-xs rounded bg-muted">Daily users</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                data-testid="vote-btn-design2"
                onClick={() => handleVote("design2")}
                disabled={!!vote}
                className={cn("flex-1 py-2 rounded-lg font-medium transition-colors", vote === "design2" ? "bg-blue-600 text-white" : vote ? "bg-muted text-muted-foreground" : "bg-blue-600 text-white hover:bg-blue-700")}
              >
                {vote === "design2" ? "Voted" : "Vote for this"}
              </button>
              <Link href="/design2" className="px-4 py-2 border rounded-lg text-sm hover:bg-muted font-medium">View</Link>
            </div>
            <div data-testid="vote-count-design2" className="mt-4 text-center text-sm text-muted-foreground">{counts.design2} votes</div>
          </div>

          {/* Design 3 */}
          <div data-testid="vote-card-design3" className={cn("rounded-2xl border p-6 flex flex-col transition-all", vote === "design3" ? "border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.2)]" : "border-border hover:border-muted-foreground")}>
            <div className="h-40 rounded-xl mb-6 bg-[#050a0f] border border-[#00ff88]/30 p-4 flex gap-3">
              <div className="w-12 border-r border-[#00ff88]/20 flex flex-col gap-2">
                <div className="w-6 h-6 rounded bg-[#00ff88]/20 border border-[#00ff88]/50"></div>
                <div className="w-6 h-6 rounded bg-[#00ff88]/5"></div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="w-1/2 h-2 bg-[#00ff88] opacity-50"></div>
                <div className="flex-1 bg-[#0a1520] border border-[#00ff88]/20 p-2">
                  <div className="w-full h-1 bg-[#00ff88]/30 mb-1"></div>
                  <div className="w-3/4 h-1 bg-[#00ff88]/30"></div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 font-mono">Design 3</h2>
            <p className="font-medium mb-2 text-[#10b981]">Command Center</p>
            <p className="text-sm text-muted-foreground mb-4 flex-1 font-mono">Dark cockpit aesthetic with glowing neon accents. Feels like a technical diagnostic workbench or terminal.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 text-xs rounded bg-muted font-mono">Best for: Technicians</span>
              <span className="px-2 py-1 text-xs rounded bg-muted font-mono">Auditors</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                data-testid="vote-btn-design3"
                onClick={() => handleVote("design3")}
                disabled={!!vote}
                className={cn("flex-1 py-2 rounded-lg font-medium transition-colors font-mono uppercase", vote === "design3" ? "bg-[#10b981] text-white" : vote ? "bg-muted text-muted-foreground" : "bg-[#10b981] text-white hover:bg-[#059669]")}
              >
                {vote === "design3" ? "Voted" : "Vote for this"}
              </button>
              <Link href="/design3" className="px-4 py-2 border rounded-lg text-sm hover:bg-muted font-medium font-mono uppercase">View</Link>
            </div>
            <div data-testid="vote-count-design3" className="mt-4 text-center text-sm text-muted-foreground font-mono">{counts.design3} votes</div>
          </div>
        </div>

        {/* Social Share */}
        <div className="max-w-2xl mx-auto rounded-xl border p-6 bg-muted/30">
          <h3 className="font-bold text-lg mb-4">Share this poll</h3>
          <div className="bg-background rounded-lg border p-4 relative mb-2">
            <pre className="text-sm whitespace-pre-wrap font-sans">
              Which MASReady design direction should we ship?{'\n\n'}
              1. Design 1: Clean & Professional{'\n'}
              2. Design 2: Social Feed Style{'\n'}
              3. Design 3: Command Center Cockpit{'\n\n'}
              Vote here: https://masready.com/compare
            </pre>
            <button 
              onClick={copyPoll}
              className="absolute top-2 right-2 p-2 rounded-md hover:bg-muted transition-colors flex items-center gap-2 text-sm"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">Votes are stored locally in your browser only.</p>
        </div>
      </div>
    </div>
  );
}
