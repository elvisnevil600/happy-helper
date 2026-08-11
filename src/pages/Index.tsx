import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import CelestialBackground from "@/components/CelestialBackground";
import HymnCard from "@/components/HymnCard";
import { Input } from "@/components/ui/input";
import { useHymns } from "@/hooks/useHymns";

const Index = () => {
  const { hymns, loading, error } = useHymns();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hymns;
    const asNum = Number(q);
    return hymns.filter((h) => {
      if (!Number.isNaN(asNum) && h.number === asNum) return true;
      return (
        h.title.toLowerCase().includes(q) ||
        h.lyrics.toLowerCase().includes(q) ||
        String(h.number).includes(q)
      );
    });
  }, [hymns, query]);

  return (
    <>
      <CelestialBackground />
      <AppHeader />
      <main className="container pb-16 pt-8 md:pt-12">
        <section className="mx-auto max-w-2xl text-center animate-fade-in">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">
            ✦ Wer mag Lemo ✦
          </p>
          <h1 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight text-foreground md:text-5xl">
            Luo Hymnal
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            A sacred collection of {hymns.length || 267} hymns — sung in
            worship, treasured in heart.
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
              className="h-12 rounded-full border-border/70 bg-card/90 pl-11 pr-12 text-base shadow-soft focus-visible:ring-gold/40"
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
