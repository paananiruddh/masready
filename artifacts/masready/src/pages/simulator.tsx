import SimulatorPanel from "@/components/SimulatorPanel";

export default function Simulator() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Maximo Scenario Simulator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a Maximo delivery scenario and watch the workbench synthesise evidence, match skill packs, and generate a review-ready output.
          </p>
          <p className="text-sm text-amber-500 mt-2 font-medium">Static guided simulation — no real customer systems connected.</p>
        </div>
        <div className="max-w-5xl mx-auto">
          <SimulatorPanel variant="standalone" />
        </div>
      </div>
    </div>
  );
}
