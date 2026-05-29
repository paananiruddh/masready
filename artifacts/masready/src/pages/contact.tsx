import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Request a Walkthrough</h1>
          <p className="text-xl text-muted-foreground">
            Experience the precision of MASReady on your schedule.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-card p-8 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold">Request Received</h2>
              <p className="text-muted-foreground">
                We'll be in touch shortly to schedule your walkthrough.
              </p>
              <Button variant="outline" className="mt-8" onClick={() => setSubmitted(false)}>
                Submit Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Name</label>
                  <input required type="text" className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Organisation</label>
                  <input required type="text" className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <input required type="email" className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Maximo Version</label>
                <select className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>MAS Manage 9.x</option>
                  <option>MAS Manage 8.x</option>
                  <option>Maximo 7.6.1.x</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Message</label>
                <textarea rows={4} className="w-full bg-background border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg">
                Request Walkthrough
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
