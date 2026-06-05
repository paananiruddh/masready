import { Link } from "wouter";
import { getArticleBySlug } from "@/lib/newsArticles";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import type { ContentBlock } from "@/lib/newsArticles";

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-2">
          {block.text}
        </h2>
      );

    case "list":
      return (
        <ul className="space-y-2 pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground/85">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "image":
      return (
        <figure className="my-2">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full border border-border"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="mt-3 text-sm text-muted-foreground text-center italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "callout":
      return (
        <div className="border-l-4 border-primary bg-primary/5 px-6 py-4">
          <p className="text-base font-semibold text-foreground italic">{block.text}</p>
        </div>
      );

    case "hr":
      return <hr className="border-border" />;

    default:
      return null;
  }
}

interface NewsArticlePageProps {
  params: { slug: string };
}

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Article not found</h1>
        <Link href="/news" className="text-primary hover:underline">
          ← Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          {/* Breadcrumb */}
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> News
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
            <span className="text-sm text-muted-foreground">{article.displayDate}</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.subtitle}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="flex flex-col gap-6">
          {article.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 border border-border bg-card p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Planning your move to MAS 9?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed">
            MASReady helps teams understand upgrade readiness, security complexity,
            licensing implications, and environment risk before the move becomes expensive.
          </p>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Explore MASReady <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All articles
          </Link>
        </div>
      </div>
    </div>
  );
}
