import { Link } from "wouter";
import { newsArticles } from "@/lib/newsArticles";
import { ArrowRight, Clock, Tag } from "lucide-react";

export default function News() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase mb-4">
            <span className="w-4 h-px bg-primary" />
            MASReady News
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Insights & Updates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Product updates, upgrade insights, and practical Maximo / MAS 9 readiness notes from MASReady.
          </p>
        </div>
      </div>

      {/* Article list */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {newsArticles.length === 0 ? (
          <p className="text-muted-foreground">No articles yet.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {newsArticles.map((article) => (
              <article
                key={article.slug}
                className="border border-border bg-card p-8 group hover:border-primary/40 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1">
                    <Tag className="w-3 h-3" />
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.displayDate}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-3 leading-snug">
                  {article.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {article.summary}
                </p>

                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Read article <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
