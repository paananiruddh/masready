import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, ArrowRight, Activity, FileText, Fingerprint, RefreshCcw, Lock, Box, Users, Settings } from "lucide-react";
import { DEMO_METRICS } from "@/lib/constants";
import { useEffect, useState, useRef } from "react";

function CountUp({ end, suffix = "" }: { end: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden flex items-center min-h-[90vh]">
        <div className="absolute inset-0 bg-background z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_50%)] z-0" />
        
        {/* Animated Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
            >
              Maximo delivery intelligence, without the chaos.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Evidence-backed delivery automation for IBM Maximo teams — combining requirements, environment fingerprints, patch impact, license planning, skill coverage, and trust boundaries into one review-ready workbench.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <Link href="/mas9-power" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Explore MAS9 Power
              </Link>
              <Link href="/trust" className="inline-flex items-center justify-center rounded-md border border-white/10 bg-background/50 backdrop-blur-md px-8 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/5 hover:border-white/20">
                See Trust Model
              </Link>
              <Link href="/compare" className="inline-flex items-center justify-center rounded-md border border-accent/30 bg-accent/10 px-8 py-3 text-sm font-medium text-accent shadow-sm transition-colors hover:bg-accent/20">
                Compare Designs
              </Link>
              <Link href="/simulator" className="inline-flex items-center justify-center rounded-md border border-primary/30 bg-primary/10 px-8 py-3 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/20">
                Run Simulator
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center items-center gap-4 text-sm text-muted-foreground"
            >
              <span>Design variants:</span>
              <Link href="/" className="hover:text-primary transition-colors">Design 1 (current)</Link>
              <Link href="/design2" className="hover:text-primary transition-colors">Design 2 (social)</Link>
              <Link href="/design3" className="hover:text-primary transition-colors">Design 3 (command center)</Link>
            </motion.div>
          </div>

          {/* Mock Dashboard */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 mx-auto max-w-5xl rounded-xl border border-white/10 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10 bg-background/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="mx-auto text-xs font-medium text-muted-foreground">MASReady Workbench — MAS9 Power</div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-1 md:col-span-1 space-y-6">
                <div className="rounded-lg border border-white/5 bg-background/30 p-4">
                  <div className="text-sm text-muted-foreground mb-1">Intelligence Score</div>
                  <div className="text-4xl font-bold text-accent">87<span className="text-xl text-muted-foreground">/100</span></div>
                </div>
                <div className="rounded-lg border border-white/5 bg-background/30 p-4">
                  <div className="text-sm text-muted-foreground mb-1">Trust Boundary</div>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-accent/20 text-accent text-xs font-bold mt-1">
                    <Shield className="w-3 h-3" />
                    REVIEW ONLY
                  </div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-3 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/5 bg-background/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <div className="text-sm font-medium">Patch Impact</div>
                  </div>
                  <div className="text-2xl font-bold">{DEMO_METRICS.patchImpacts} Items</div>
                </div>
                <div className="rounded-lg border border-white/5 bg-background/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <div className="text-sm font-medium">Skill Coverage</div>
                  </div>
                  <div className="text-2xl font-bold">{DEMO_METRICS.skillCoverage}%</div>
                </div>
                <div className="col-span-2 rounded-lg border border-white/5 bg-background/30 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Zero Production Mutations</div>
                      <div className="text-xs text-muted-foreground">Read-only integrations active</div>
                    </div>
                  </div>
                  <div className="text-primary font-mono text-sm bg-primary/10 px-3 py-1 rounded">SAFE</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metric Strip */}
      <section className="border-y border-white/10 bg-background/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 text-center">
            {[
              { label: "Seed Files", value: DEMO_METRICS.seedFiles },
              { label: "SVG Charts", value: DEMO_METRICS.svgCharts },
              { label: "Diagrams", value: DEMO_METRICS.diagrams },
              { label: "Customisations", value: DEMO_METRICS.customisationsScanned },
              { label: "Patch Impacts", value: DEMO_METRICS.patchImpacts },
              { label: "AppPoint Trend", value: 12, suffix: "mo" },
              { label: "Named Users", value: DEMO_METRICS.namedUsers },
              { label: "Mutations", value: 0 }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-2xl font-bold text-white mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What the Workbench Does</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A unified approach to Maximo delivery, combining disjointed processes into a single source of truth.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Delivery Intelligence", icon: Activity, desc: "Unified delivery confidence score across all project dimensions." },
              { title: "Maximo Fingerprint", icon: Fingerprint, desc: "Automated scan of installed objects, customisations, and version data." },
              { title: "License Planning", icon: FileText, desc: "AppPoint trends, named users, and mobile pool analysis for capacity planning." },
              { title: "Trust Center", icon: Shield, desc: "Audit-first, read-only design with comprehensive trace capture." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-background/50 p-6 flex flex-col items-start gap-4 transition-colors hover:bg-white/5"
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Spotlight */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-card to-background p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
                <Box className="w-3 h-3" /> Demo Tenant Active
              </div>
              <h2 className="text-4xl font-bold mb-6">MAS9 Power Spotlight</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Step into a fully populated fictional energy/utilities company running IBM Maximo Application Suite Manage 9.x. See how MASReady handles complex environments without touching production data.
              </p>
              <Link href="/mas9-power" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                Explore the Demo Scenario <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-primary/10 text-center border-t border-primary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to see MASReady in action?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Experience the precision of the Maximo Delivery Automation Workbench.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo-walkthrough" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Take the 12-Minute Walkthrough
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-md border border-white/10 bg-background px-8 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/5">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function AlertCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
