import { motion } from "framer-motion";
import { ShieldAlert, Database, ServerCrash, Trello, GitMerge, Lock } from "lucide-react";
import { DemoBanner } from "@/components/DemoBanner";

export default function Trust() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
          Built for trust.<br />
          <span className="text-accent">Designed for scrutiny.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Enterprise software isn't just about what it does. It's about what it guarantees it will never do.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 max-w-6xl mx-auto">
        {[
          { title: "Review-Only Design", icon: ShieldAlert, desc: "Generates outputs and insights only. The workbench contains zero execution capabilities." },
          { title: "No SQL Execution", icon: Database, desc: "Architecturally restricted from executing write operations against any database." },
          { title: "No Maximo Mutation", icon: ServerCrash, desc: "Integrates with Maximo via read-only APIs exclusively. Changes are impossible." },
          { title: "No Jira Mutation", icon: Trello, desc: "Extracts requirements and evidence via read-only connections." },
          { title: "No ADO Mutation", icon: GitMerge, desc: "Connects to Azure DevOps purely to map pipeline status, never to trigger builds." },
          { title: "Data Boundary", icon: Lock, desc: "Customer-hosted data models ensure zero exfiltration of proprietary information." },
        ].map((pillar, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <pillar.icon className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <DemoBanner variant="planning" />
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">License Usage Disclaimer</h2>
          <p className="text-destructive-foreground/90">
            License usage planning features are provided for internal planning and visibility purposes only. 
            MASReady outputs do not constitute legal, contractual, IBM-certified, or formal compliance advice.
          </p>
        </div>
      </div>
    </div>
  );
}
