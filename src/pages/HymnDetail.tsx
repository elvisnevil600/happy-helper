import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import AppHeader from "@/components/AppHeader";
import CelestialBackground from "@/components/CelestialBackground";
import { Button } from "@/components/ui/button";
import { useHymns } from "@/hooks/useHymns";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const HymnDetail = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const { hymns, loading } = useHymns();
  const { isFavorite, toggle } = useFavorites();
  const [fontSize, setFontSize] = useState(18);

  const num = Number(number);
  const hymn = hymns.find((h) => h.number === num);

  const stanzas = useMemo(() => {
    if (!hymn) return [];
    return hymn.lyrics
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [hymn]);

  if (loading) {
    return (
      <>
        <CelestialBackground />
        <AppHeader />
        <main className="container py-20 text-center text-muted-foreground">
          Loading…
        </main>
      </>
    );
  }

  if (!hymn) {
    return (
      <>
        <CelestialBackground />
        <AppHeader />
        <main className="container py-20 text-center">
          <p className="text-muted-foreground">Hymn not found.</p>
          <Button asChild variant="link" className="mt-4">
            <Link to="/">Back to all hymns</Link>
          </Button>
        </main>
      </>
    );
  }

  const fav = isFavorite(hymn.number);
  const prev = hymns.find((h) => h.number === num - 1);
  const next = hymns.find((h) => h.number === num + 1);

  return (
    <>
      <CelestialBackground />
      <AppHeader />
      <main className="container py-8 md:py-12 animate-fade-in">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <article className="mt-6 rounded-3xl border border-border/60 bg-card/90 p-6 md:p-12 shadow-sacred backdrop-blur">
            <header className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold shadow-glow">
                <span className="font-display text-2xl font-semibold text-primary">
                  {hymn.number}
                </span>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold ornament">
                Hymn
              </p>
              <h1 className="mt-3 font-display text-2xl md:text-4xl font-semibold leading-tight text-foreground">
                {hymn.title}
              </h1>
            </header>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Button
                variant={fav ? "default" : "outline"}
                size="sm"
                onClick={() => toggle(hymn.number)}
                className={cn("rounded-full", fav && "bg-destructive hover:bg-destructive/90")}
              >
                <Heart className={cn("mr-2 h-4 w-4", fav && "fill-current")} />
                {fav ? "Saved" : "Save"}
              </Button>
              <div className="flex items-center gap-1 rounded-full border border-border/60 bg-background/60 p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                  aria-label="Decrease text"
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="px-2 text-xs text-muted-foreground">{fontSize}px</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-full"
                  onClick={() => setFontSize((s) => Math.min(28, s + 2))}
                  aria-label="Increase text"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <div
              className="mx-auto mt-10 max-w-xl space-y-8 text-foreground"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
            >
              {stanzas.map((stanza, i) => {
                const lines = stanza.split("\n");
                const firstLine = lines[0];
                const numMatch = firstLine.match(/^(\d+)\.\s*(.*)/);
                const stanzaNum = numMatch ? numMatch[1] : null;
                const rest = numMatch ? [numMatch[2], ...lines.slice(1)] : lines;
                return (
                  <div key={i} className="relative pl-8">
                    {stanzaNum && (
                      <span className="absolute left-0 top-0 font-display text-sm font-semibold text-gold">
                        {stanzaNum}.
                      </span>
                    )}
                    <p className="whitespace-pre-line font-body italic">
                      {rest.join("\n")}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex items-center justify-center text-gold/70">
              <span className="font-display text-lg">✦ ✦ ✦</span>
            </div>
          </article>

          <nav className="mt-8 flex items-center justify-between gap-3">
            {prev ? (
              <Button asChild variant="outline" className="rounded-full">
                <Link to={`/hymn/${prev.number}`}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  {prev.number}. {prev.title.length > 22 ? prev.title.slice(0, 22) + "…" : prev.title}
                </Link>
              </Button>
            ) : <span />}
            {next ? (
              <Button asChild variant="outline" className="rounded-full">
                <Link to={`/hymn/${next.number}`}>
                  {next.number}. {next.title.length > 22 ? next.title.slice(0, 22) + "…" : next.title}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            ) : <span />}
          </nav>
        </div>
      </main>
    </>
  );
};

export default HymnDetail;
