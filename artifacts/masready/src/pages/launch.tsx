import { motion } from "framer-motion";
import { Link } from "wouter";
import { Rocket, ShieldCheck, Activity } from "lucide-react";

export default function Launch() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="text-center max-w-4xl mx-auto mb-24">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary font-bold tracking-wider uppercase mb-8"
        >
          <Rocket className="w-5 h-5" /> Official Release
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter">MASReady is Live.</h1>
        <p className="text-2xl text-muted-foreground leading-relaxed">
          The industry's first true Delivery Automation Workbench for IBM Maximo Application Suite. 
          Evidence-backed. Read-only. Built for enterprise scrutiny.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-background/50">
                <th className="p-4 font-semibold text-muted-foreground">Feature</th>
                <th className="p-4 font-bold text-primary text-center">MASReady</th>
                <th className="p-4 font-semibold text-muted-foreground text-center">Generic Project Finance Tool</th>
                <th className="p-4 font-semibold text-muted-foreground text-center">Generic Reporting Tool</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                "License Planning",
                "Patch Impact",
                "Delivery Intelligence",
                "Read-Only Safety",
                "Customisation Scan",
                "Bot Skill-Pack Coverage",
                "Adaptive Regression Suite",
                "Audit Trail",
                "Multi-Tenant"
              ].map((feature, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{feature}</td>
                  <td className="p-4 text-center text-primary font-bold">Yes</td>
                  <td className="p-4 text-center text-muted-foreground">Limited</td>
                  <td className="p-4 text-center text-muted-foreground">No</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
