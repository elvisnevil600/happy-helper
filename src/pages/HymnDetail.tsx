import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AppHeader from "@/components/AppHeader";
import CelestialBackground from "@/components/CelestialBackground";
import { Button } from "@/components/ui/button";
import { useHymns } from "@/hooks/useHymns";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const FONT_KEY = "luo-hymn-font-size";

const HymnDetail = () => {
  const { number } = useParams();
  const navigate = useNavigate();
  const { hymns, loading } = useHymns();
  const { isFavorite, toggle } = useFavorites();
  const [fontSize, setFontSize] = useState(() => {
    const stored = Number(localStorage.getItem(FONT_KEY));
    return stored >= 16 && stored <= 30 ? stored : 19;
  });

  useEffect(() => {
    localStorage.setItem(FONT_KEY, String(fontSize));
  }, [fontSize]);

  const num = Number(number);
  const hymn = hymns.find((h) => h.number === num);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [num]);

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
  const truncate = (t: string) => (t.length > 20 ? t.slice(0, 20) + "…" : t);

  return (
    <>
      <CelestialBackground />
      <AppHeader />
      <main className="container pb-28 pt-4 md:pt-8 animate-fade-in">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full pr-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back
          </button>

          <article className="mt-2 rounded-3xl border border-border/60 bg-card/95 px-5 py-8 shadow-elevated backdrop-blur md:px-12 md:py-12">
            <header className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand shadow-glow md:h-16 md:w-16">
                <span className="font-display text-xl font-semibold text-primary-foreground md:text-2xl">
                  {hymn.number}
                </span>
              </span>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-brand">
                Hymn
              </p>
              <h1 className="mt-3 font-display text-2xl font-semibold leading-snug text-foreground md:text-4xl">
                {hymn.title}
              </h1>
            </header>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-y border-border/50 py-4">
              <Button
                variant={fav ? "default" : "outline"}
                onClick={() => toggle(hymn.number)}
                aria-pressed={fav}
                className={cn(
                  "h-11 rounded-full px-5",
                  fav && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                )}
              >
                <Heart className={cn("mr-2 h-4 w-4", fav && "fill-current")} aria-hidden />
                {fav ? "Saved" : "Save"}
              </Button>
              <div className="flex items-center gap-1 rounded-full border border-border/60 bg-background/60 p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={() => setFontSize((s) => Math.max(16, s - 2))}
                  aria-label="Decrease text size"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-xs text-muted-foreground">
                  {fontSize}px
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={() => setFontSize((s) => Math.min(30, s + 2))}
                  aria-label="Increase text size"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              className="mx-auto mt-8 max-w-xl space-y-7 text-foreground md:mt-10"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
            >
              {stanzas.map((stanza, i) => {
                const lines = stanza.split("\n");
                const firstLine = lines[0];
                const numMatch = firstLine.match(/^(\d+)\.\s*(.*)/);
                const stanzaNum = numMatch ? numMatch[1] : null;
                const rest = numMatch ? [numMatch[2], ...lines.slice(1)] : lines;
                const isChorus = /^(chorus|refrain|dwoko)/i.test(firstLine.trim());
                return (
                  <div
                    key={i}
                    className={cn(
                      "relative pl-8",
                      isChorus &&
                        "rounded-xl border-l-2 border-primary/50 bg-secondary/60 py-3 pr-4",
                    )}
                  >
                    {stanzaNum && (
                      <span className="absolute left-0 top-0 font-display text-sm font-semibold text-brand">
                        {stanzaNum}.
                      </span>
                    )}
                    <p className="whitespace-pre-line font-body tracking-[0.005em]">
                      {rest.join("\n")}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex items-center justify-center text-brand/70">
              <span className="h-px w-24 rounded-full bg-brand" aria-hidden />
            </div>
          </article>

          <nav
            aria-label="Hymn navigation"
            className="mt-6 grid grid-cols-2 gap-3"
          >
            {prev ? (
              <Button
                asChild
                variant="outline"
                className="h-12 justify-start rounded-full bg-card/80 px-4"
              >
                <Link to={`/hymn/${prev.number}`}>
                  <ChevronLeft className="mr-1 h-4 w-4 shrink-0" aria-hidden />
                  <span className="truncate text-sm">
                    {prev.number}. {truncate(prev.title)}
                  </span>
                </Link>
              </Button>
            ) : (
              <span />
            )}
            {next ? (
              <Button
                asChild
                variant="outline"
                className="col-start-2 h-12 justify-end rounded-full bg-card/80 px-4"
              >
                <Link to={`/hymn/${next.number}`}>
                  <span className="truncate text-sm">
                    {next.number}. {truncate(next.title)}
                  </span>
                  <ChevronRight className="ml-1 h-4 w-4 shrink-0" aria-hidden />
                </Link>
              </Button>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </main>
    </>
  );
};

export default HymnDetail;
