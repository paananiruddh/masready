interface DemoBannerProps {
  variant?: "seed" | "planning";
  className?: string;
}

export function DemoBanner({ variant = "seed", className = "" }: DemoBannerProps) {
  if (variant === "planning") {
    return (
      <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm font-medium mb-6 ${className}`}>
        <span className="flex-shrink-0 text-yellow-400">⚠</span>
        <span>
          <strong>Planning visibility only.</strong> Figures shown are fictional demo data.
          Not legal, contractual, IBM-certified, or compliance advice.
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-6 ${className}`}>
      <span className="flex-shrink-0 text-blue-400">ℹ</span>
      <span>
        <strong>Demo data — MAS9 Power fictional tenant.</strong> All figures are seeded demo data,
        not connected to any real Maximo environment.
      </span>
    </div>
  );
}
