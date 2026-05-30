import SimulatorPanel from "@/components/SimulatorPanel";
import { DemoBanner } from "@/components/DemoBanner";

export default function Simulator() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DemoBanner variant="seed-data" />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Maximo Scenario Simulator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a Maximo delivery scenario and watch the workbench synthesise evidence, match skill packs, and generate a review-ready output.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <SimulatorPanel variant="standalone" />
        </div>
      </div>
    </div>
  );
}
