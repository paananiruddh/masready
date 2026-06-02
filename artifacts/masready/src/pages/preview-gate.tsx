import { useParams, Redirect } from "wouter";
import { getIndustry } from "@/lib/industryData";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function PreviewGate() {
  const { industry: industrySlug } = useParams<{ industry: string }>();
  const industry = getIndustry(industrySlug ?? "");

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-3">Industry preview not found</h1>
          <p className="text-muted-foreground mb-6">That industry preview does not exist. Choose from the available previews below.</p>
          <Link href="/industry-previews" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
            View All Industry Previews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return <Redirect to={`/industry/${industrySlug}`} />;
}
