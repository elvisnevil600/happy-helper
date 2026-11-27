import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import coverImage from "@/assets/luo-hymnal-cover.jpg.asset.json";
import AppHeader from "@/components/AppHeader";
import CelestialBackground from "@/components/CelestialBackground";
import HymnCard from "@/components/HymnCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHymns } from "@/hooks/useHymns";
import { searchHymns } from "@/services/search/hymnSearch";

const ENTRY_SESSION_KEY = "luo-hymnal-entry-seen";

const hymnSections = [
  { title: "Fak gi Dend", start: 1, end: 37 },
  { title: "Wuodh Ja-Kristo", start: 38, end: 80 },
  { title: "Jip gi Geno", start: 81, end: 109 },
  { title: "Lamo", start: 110, end: 137 },
  { title: "Nyual Yesu (Kristmas)", start: 138, end: 148 },
  { title: "Wende Sawo", start: 149, end: 164 },
  { title: "Chier", start: 165, end: 166 },
  { title: "Polo", start: 167, end: 186 },
  { title: "Warrok", start: 187, end: 213 },
  { title: "Luong", start: 214, end: 227 },
  { title: "Lando Wach", start: 228, end: 236 },
  { title: "Wiro mar Ruodhwa", start: 237, end: 245 },
  { title: "Wende Nyithindo", start: 246, end: 263 },
  { title: "Kend Maier", start: 264, end: 266 },
  { title: "Wimbo wa Taifa", start: 267, end: 267 },
];

const hasEnteredThisSession = () => {
  try {
    return window.sessionStorage.getItem(ENTRY_SESSION_KEY) === "true";
  } catch {
    return false;
  }
};

const Index = () => {
  const { hymns, loading, error } = useHymns();
  const [query, setQuery] = useState("");
  const [showCover, setShowCover] = useState(() => !hasEnteredThisSession());
  const [showContents, setShowContents] = useState(false);

  const filtered = useMemo(
    () => searchHymns(hymns, query).map((r) => r.hymn),
    [hymns, query],
  );

  const enterHymnal = () => {
    try {
      window.sessionStorage.setItem(ENTRY_SESSION_KEY, "true");
    } catch {
      // Keep the current visit usable even if browser storage is unavailable.
    }
    setShowCover(false);
    setShowContents(true);
  };

  if (showCover) {
    return (
      <main className="relative flex min-h-[100svh] flex-col items-center justify-between overflow-hidden bg-night px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 text-center">
        <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand" />
        <div className="relative z-10 flex w-full max-w-md items-center justify-center gap-3 text-[11px] font-semibold uppercase text-muted-foreground">
          <span aria-hidden className="h-px w-8 bg-primary/70" />
          AIC Digital Hymnal
          <span aria-hidden className="h-px w-8 bg-primary/70" />
        </div>

        <section className="relative z-10 flex w-full max-w-md flex-1 flex-col items-center justify-center py-6 md:py-10">
          <img
            src={coverImage.url}
            alt="Green cover of Kitap Wend Nyasaye Molos Manyien, the Dholuo hymnal"
            className="h-[40svh] min-h-48 max-h-80 w-auto max-w-[70vw] rounded-sm border border-border/40 object-cover shadow-elevated"
          />
          <p className="mt-5 text-xs font-semibold uppercase text-brand">
            Sing · Worship · Grow
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Luo Hymnal
          </h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {hymns.length || 267} Dholuo hymns for worship, wherever you gather.
          </p>
        </section>

        <div className="relative z-10 w-full max-w-sm">
          <Button
            type="button"
            onClick={enterHymnal}
            className="h-14 w-full rounded-full text-base font-semibold shadow-glow"
          >
            Open hymnal <ArrowRight className="h-5 w-5" aria-hidden />
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            A Ministry of the African Inland Church
          </p>
        </div>
      </main>
    );
  }

  if (showContents) {
    return (
      <main className="min-h-[100svh] bg-background px-4 pb-10 pt-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-brand">Kitap Wend Nyasaye</p>
              <h1 className="mt-1 font-display text-3xl font-semibold text-foreground">Weche Mantie e Buk</h1>
              <p className="mt-1 text-sm text-muted-foreground">Choose a section to open its first hymn.</p>
            </div>
            <BookOpen className="h-8 w-8 shrink-0 text-brand" aria-hidden />
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
            {hymnSections.map((section) => {
              const firstHymn = hymns.find((h) => h.number === section.start);
              return (
                <Link
                  key={section.title}
                  to={"/hymn/" + section.start}
                  className="flex min-h-14 items-center justify-between gap-4 border-b border-border/50 px-4 py-3 last:border-b-0 transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-foreground">{section.title}</span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {firstHymn ? firstHymn.title : "Hymn " + section.start}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 text-sm tabular-nums text-muted-foreground">
                    {section.start === section.end ? section.start : section.start + "–" + section.end}
                    <ArrowRight className="h-4 w-4 text-brand" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
          <Button type="button" variant="outline" onClick={() => setShowContents(false)} className="mt-6 h-12 w-full rounded-full">
            Browse all 267 hymns
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Select a section above to begin reading, then use the previous and next controls to move through the hymns.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <CelestialBackground />
      <AppHeader />
      <main className="container pb-28 pt-8 md:pt-12">
        <section className="mx-auto max-w-2xl text-center animate-fade-in">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
            Sing · Worship · Grow
          </p>
          <h1 className="mt-3 font-display text-[1.9rem] font-semibold leading-tight text-foreground md:text-5xl rule">
            Luo Hymnal
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Digital Luo Christian hymns — {hymns.length || 267} hymns to browse,
            search and treasure.
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
            A Ministry of the African Inland Church (AIC)
          </p>
        </section>


        <div className="sticky top-16 z-30 -mx-6 mt-6 bg-background/85 px-6 py-3 backdrop-blur-md md:static md:mx-0 md:mt-8 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
          <div className="relative mx-auto max-w-2xl">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <label htmlFor="hymn-search" className="sr-only">
              Search hymns
            </label>
            <Input
              id="hymn-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by number, title, or lyrics…"
              className="h-12 rounded-full border-border/70 bg-card/90 pl-11 pr-12 text-base shadow-soft focus-visible:ring-primary/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <section className="mt-6 md:mt-10">
          {loading && (
            <div
              aria-live="polite"
              className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
            >
              <span className="sr-only">Loading hymns…</span>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[104px] animate-pulse rounded-2xl border border-border/50 bg-card/60"
                />
              ))}
            </div>
          )}
          {error && (
            <p className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center text-destructive">
              {error}
            </p>
          )}
          {!loading && !error && (
            <>
              <p
                aria-live="polite"
                className="mb-4 text-sm text-muted-foreground"
              >
                {filtered.length} hymn{filtered.length === 1 ? "" : "s"}
                {query && ` matching “${query}”`}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((h) => (
                  <HymnCard key={h.number} hymn={h} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
                  <Search className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
                  <h2 className="mt-4 font-display text-lg text-foreground">
                    No hymns found
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Try a different word, or search by hymn number.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Index;
