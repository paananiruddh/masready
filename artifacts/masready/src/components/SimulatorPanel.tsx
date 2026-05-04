import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { CheckCircle, Shield, AlertCircle, FileText, Cpu, Server, Activity, ArrowRight, Play, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

type ScenarioId = "mas9-power" | "legacy-upgrade" | "contract-mobilisation";

interface Scenario {
  id: ScenarioId;
  title: string;
  desc: string;
  version: string;
  industry: string;
  files: number;
  customisations: number;
  score: number;
}

const SCENARIOS: Scenario[] = [
  {
    id: "mas9-power",
    title: "MAS 9 Energy & Utilities",
    desc: "MAS9 Power demo",
    version: "MAS 9.x",
    industry: "Energy & Utilities",
    files: 23,
    customisations: 46,
    score: 87
  },
  {
    id: "legacy-upgrade",
    title: "Maximo 7.6.x Upgrade Readiness",
    desc: "Legacy upgrade demo",
    version: "Maximo 7.6.1.3",
    industry: "Manufacturing",
    files: 18,
    customisations: 38,
    score: 72
  },
  {
    id: "contract-mobilisation",
    title: "MAS 9 Contract Mobilisation",
    desc: "Contract mobilisation demo",
    version: "MAS 9.x",
    industry: "Facilities Management",
    files: 15,
    customisations: 22,
    score: 88
  }
];

const SKILL_DOMAINS = [
  "Automation Scripts", "Relationships", "Workflow", "Escalation", 
  "Integration Framework", "Patch Impact", "License Planning", "Mobilisation"
];

export default function SimulatorPanel({ variant = "standalone" }: { variant?: "design1" | "design2" | "design3" | "standalone" }) {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(0); // 0 means not started, 1-7 are stages
  
  const [events, setEvents] = useState<string[]>([]);
  const eventEndRef = useRef<HTMLDivElement>(null);
  
  const [fileCount, setFileCount] = useState(0);
  const [custCount, setCustomisationsCount] = useState(0);
  const [skillsMatched, setSkillsMatched] = useState<string[]>([]);
  const [trustChecks, setTrustChecks] = useState<string[]>([]);
  const [meterScore, setMeterScore] = useState(0);

  const scenario = SCENARIOS.find(s => s.id === selectedScenario);

  // Auto scroll events
  useEffect(() => {
    if (eventEndRef.current) {
      eventEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events]);

  const addEvent = (text: string) => {
    setEvents(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0,-1)}] ${text}`]);
  };

  const runSimulation = () => {
    if (!scenario) return;
    setIsRunning(true);
    setCurrentStage(1);
    setEvents([]);
    setFileCount(0);
    setCustomisationsCount(0);
    setSkillsMatched([]);
    setTrustChecks([]);
    setMeterScore(0);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setCurrentStage(0);
    setSelectedScenario(null);
  };

  // Stage Machine
  useEffect(() => {
    if (!isRunning || currentStage === 0 || currentStage > 7) return;

    let timer: any;
    let intervals: any[] = [];

    const clearAll = () => {
      clearTimeout(timer);
      intervals.forEach(clearInterval);
    };

    if (currentStage === 1) {
      addEvent("Loading scenario config...");
      timer = setTimeout(() => {
        addEvent("Verifying data mode: fictional demo fixture");
        timer = setTimeout(() => {
          addEvent("Checking feature flags: [OK]");
          timer = setTimeout(() => setCurrentStage(2), 500);
        }, 700);
      }, 800);
    } 
    else if (currentStage === 2) {
      addEvent(scenario?.id === "mas9-power" ? "Reading requirements.json" : 
               scenario?.id === "legacy-upgrade" ? "Reading legacy_config.json" : "Reading mobilisation_brief.json");
      
      timer = setTimeout(() => {
        addEvent(scenario?.id === "mas9-power" ? "Connecting Jira read-only" : 
                 scenario?.id === "legacy-upgrade" ? "Loading upgrade baseline" : "Connecting ADO read-only");
        
        let files = 0;
        const targetFiles = scenario?.files || 0;
        const fileInt = setInterval(() => {
          files++;
          setFileCount(files);
          if (files >= targetFiles) {
            clearInterval(fileInt);
            addEvent(`Loaded ${targetFiles} files`);
            timer = setTimeout(() => {
              addEvent("Evidence validated");
              timer = setTimeout(() => setCurrentStage(3), 500);
            }, 500);
          }
        }, 50);
        intervals.push(fileInt);
      }, 800);
    }
    else if (currentStage === 3) {
      addEvent("Scanning Maximo objects...");
      timer = setTimeout(() => {
        addEvent("Cataloguing customisations...");
        let custs = 0;
        const targetCusts = scenario?.customisations || 0;
        const custInt = setInterval(() => {
          custs++;
          setCustomisationsCount(custs);
          if (custs >= targetCusts) {
            clearInterval(custInt);
            addEvent(`Found ${targetCusts} customisations`);
            timer = setTimeout(() => {
              addEvent("Version detection complete");
              timer = setTimeout(() => setCurrentStage(4), 500);
            }, 500);
          }
        }, 30);
        intervals.push(custInt);
      }, 800);
    }
    else if (currentStage === 4) {
      addEvent("Matching required skill packs...");
      let i = 0;
      const int = setInterval(() => {
        if (i < SKILL_DOMAINS.length) {
          setSkillsMatched(prev => [...prev, SKILL_DOMAINS[i]]);
          i++;
        } else {
          clearInterval(int);
          timer = setTimeout(() => setCurrentStage(5), 500);
        }
      }, 200);
      intervals.push(int);
    }
    else if (currentStage === 5) {
      addEvent("Running scenario analysis engine...");
      timer = setTimeout(() => {
        if (scenario?.id === "mas9-power") {
          addEvent("7 impacted items found");
          addEvent("0 critical · 2 high · 3 medium · 2 low");
          addEvent("AppPoints: 1847/2400 (77%)");
          addEvent("Skill coverage: 82%");
        } else if (scenario?.id === "legacy-upgrade") {
          addEvent("11 impacted objects");
          addEvent("3 high risk");
          addEvent("EOS active — action required");
          addEvent("Upgrade readiness: 72/100");
        } else {
          addEvent("12 onboarding modules");
          addEvent("36 validation checks");
          addEvent("4 blocked assumptions");
          addEvent("Readiness: 88/100");
        }
        timer = setTimeout(() => setCurrentStage(6), 1000);
      }, 1000);
    }
    else if (currentStage === 6) {
      const checks = [
        "No SQL execution", "No Maximo mutation", "No Jira mutation", 
        "No Azure DevOps mutation", "Review-only output", "Demo fixture data only"
      ];
      let i = 0;
      const int = setInterval(() => {
        if (i < checks.length) {
          setTrustChecks(prev => [...prev, checks[i]]);
          addEvent(`Verified: ${checks[i]}`);
          i++;
        } else {
          clearInterval(int);
          timer = setTimeout(() => setCurrentStage(7), 500);
        }
      }, 300);
      intervals.push(int);
    }
    else if (currentStage === 7) {
      addEvent("Generating review-ready output...");
      let s = 0;
      const targetScore = scenario?.score || 0;
      const int = setInterval(() => {
        s += 2;
        if (s >= targetScore) {
          s = targetScore;
          clearInterval(int);
        }
        setMeterScore(s);
      }, 20);
      intervals.push(int);
      timer = setTimeout(() => {
        addEvent("Simulation complete.");
        setCurrentStage(8); // Done
      }, 1500);
    }

    return clearAll;
  }, [currentStage, isRunning, scenario]);

  // STYLES
  const isD3 = variant === "design3" || variant === "standalone";
  const bgClass = isD3 ? "bg-[#050a0f] text-[#c8d8e8] font-mono border-[#00ff88]/30" : "bg-card text-card-foreground border-border";
  const cardClass = isD3 ? "bg-[#0a1520] border-[#00ff88]/20 hover:border-[#00ff88]/50" : "bg-background border-border hover:border-primary";
  const activeCardClass = isD3 ? "border-[#00ff88] bg-[#00ff88]/10" : "border-primary bg-primary/5";
  const accentClass = isD3 ? "text-[#00ff88]" : "text-primary";
  const btnClass = isD3 ? "bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30 hover:bg-[#00ff88]/20" : "bg-primary text-primary-foreground hover:bg-primary/90";
  const progressBg = isD3 ? "bg-[#050a0f] border-[#00ff88]/20" : "bg-muted border-transparent";
  const progressActive = isD3 ? "bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.3)]" : "bg-primary/20 border-primary text-primary";
  const progressComplete = isD3 ? "bg-[#00ff88]/10 text-[#00ff88]" : "bg-primary/10 text-primary";

  if (!isRunning) {
    return (
      <div className={cn("border rounded-xl p-6", bgClass)}>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-current/10">
          <Activity className={cn("w-6 h-6", accentClass)} />
          <h2 className="text-xl font-bold uppercase tracking-widest">Select Simulation Scenario</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {SCENARIOS.map(s => (
            <button
              key={s.id}
              data-testid={`simulator-scenario-card-${s.id}`}
              onClick={() => setSelectedScenario(s.id)}
              className={cn(
                "p-4 rounded-lg border text-left transition-all duration-300",
                cardClass,
                selectedScenario === s.id && activeCardClass
              )}
            >
              <h3 className={cn("font-bold mb-1", isD3 && "tracking-wide")}>{s.title}</h3>
              <p className="text-sm opacity-70 mb-3">{s.desc}</p>
              <div className="flex items-center gap-2 text-xs opacity-60">
                <Server className="w-3 h-3" /> {s.version}
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-current/10">
          <p className="text-sm opacity-60 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Static guided simulation — no real customer systems connected.
          </p>
          <button
            data-testid="simulator-run-btn"
            disabled={!selectedScenario}
            onClick={runSimulation}
            className={cn("px-6 py-2 rounded-lg border font-bold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed", btnClass)}
          >
            <Play className="w-4 h-4" /> RUN_SIMULATION
          </button>
        </div>
      </div>
    );
  }

  const STAGES = [
    "Customer Context", "Evidence Intake", "Environment Fingerprint",
    "Skill Match", "Scenario Analysis", "Trust Boundary", "Review-ready Output"
  ];

  return (
    <div className={cn("border rounded-xl p-6 flex flex-col h-[600px]", bgClass)}>
      
      {/* PROGRESS RAIL */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 border-b border-current/10 hide-scrollbar">
        {STAGES.map((name, idx) => {
          const num = idx + 1;
          const active = currentStage === num;
          const complete = currentStage > num;
          return (
            <div 
              key={num}
              data-testid={`simulator-progress-stage-${num}`}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap flex items-center gap-2 transition-all duration-500",
                active ? progressActive : complete ? progressComplete : progressBg
              )}
            >
              {complete ? <CheckCircle className="w-3 h-3" /> : <span>{num}</span>}
              {name}
            </div>
          );
        })}
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-6 overflow-hidden">
        
        {/* LEFT: VISUALIZATIONS */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          
          {currentStage >= 1 && (
            <div className={cn("p-4 rounded-lg border animate-in fade-in slide-in-from-bottom-2", cardClass)}>
              <div className="text-xs opacity-60 mb-2">SCENARIO CONTEXT</div>
              <div className="font-bold text-lg">{scenario?.title}</div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div><span className="opacity-50">VER:</span> {scenario?.version}</div>
                <div><span className="opacity-50">IND:</span> {scenario?.industry}</div>
                <div><span className="opacity-50">MODE:</span> Demo Fixture</div>
              </div>
            </div>
          )}

          {currentStage >= 2 && (
            <div className="grid grid-cols-2 gap-4">
              <div className={cn("p-4 rounded-lg border text-center animate-in fade-in", cardClass)}>
                <div className="text-xs opacity-60 mb-1">FILES PROCESSED</div>
                <div className={cn("text-3xl font-bold", accentClass)}>{fileCount}</div>
              </div>
              {currentStage >= 3 && (
                <div className={cn("p-4 rounded-lg border text-center animate-in fade-in", cardClass)}>
                  <div className="text-xs opacity-60 mb-1">CUSTOMISATIONS</div>
                  <div className={cn("text-3xl font-bold", accentClass)}>{custCount}</div>
                </div>
              )}
            </div>
          )}

          {currentStage >= 4 && (
            <div className={cn("p-4 rounded-lg border animate-in fade-in", cardClass)}>
              <div className="text-xs opacity-60 mb-2">SKILL PACKS REQUIRED</div>
              <div className="flex flex-wrap gap-2">
                {skillsMatched.map(skill => (
                  <span key={skill} className={cn("px-2 py-1 text-xs rounded border flex items-center gap-1", activeCardClass)}>
                    <CheckCircle className="w-3 h-3" /> {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {currentStage >= 6 && (
            <div className={cn("p-4 rounded-lg border animate-in fade-in", cardClass)}>
              <div className="text-xs opacity-60 mb-2">TRUST BOUNDARY</div>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                {trustChecks.map(check => (
                  <div key={check} className="flex items-center gap-2">
                    <Shield className={cn("w-3 h-3", accentClass)} /> {check}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStage >= 7 && (
            <div data-testid="simulator-result-card" className={cn("p-6 rounded-lg border text-center animate-in fade-in zoom-in-95", cardClass, activeCardClass)}>
              <div className="text-sm font-bold tracking-widest mb-4">READINESS SCORE</div>
              
              <div className="relative w-32 h-32 mx-auto mb-4" data-testid="simulator-score-meter">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="opacity-20" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray={`${(meterScore / 100) * 251.2} 251.2`} 
                    className="transition-all duration-75" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                  {meterScore}
                </div>
              </div>

              <div className="text-sm mb-4 space-y-1 text-left inline-block">
                {scenario?.id === "mas9-power" ? (
                  <><div>• Patch impact report</div><div>• Licence planning summary</div><div>• UAT retest list</div></>
                ) : scenario?.id === "legacy-upgrade" ? (
                  <><div>• Upgrade readiness report</div><div>• iFix impact summary</div><div>• Remediation backlog</div></>
                ) : (
                  <><div>• Mobilisation runbook</div><div>• Environment checklist</div><div>• Role/task matrix</div></>
                )}
              </div>
              
              {currentStage >= 8 && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-current/20">
                  <Link href="/trust" className={cn("px-4 py-2 rounded text-xs border text-center", btnClass)}>View Trust Model</Link>
                  <button onClick={resetSimulation} className="px-4 py-2 text-xs hover:underline opacity-70">Run another scenario</button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT: EVENT STREAM */}
        <div className={cn("flex flex-col rounded-lg border overflow-hidden", isD3 ? "bg-[#000000] border-[#00ff88]/30" : "bg-zinc-950 text-zinc-300")}>
          <div className="px-3 py-2 text-xs font-mono border-b border-current/20 flex items-center gap-2 opacity-70">
            <ScrollText className="w-3 h-3" /> SYSTEM_LOG
          </div>
          <div 
            data-testid="simulator-event-stream"
            className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1"
          >
            {events.map((ev, i) => (
              <div key={i} className={cn("animate-in fade-in", isD3 ? "text-[#00ff88]" : "text-green-400")}>{ev}</div>
            ))}
            <div ref={eventEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
}
