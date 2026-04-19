import { useMemo, useState } from "react";
import { Search, Loader2 } from "lucide-react";
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
      <main className="container py-10 md:py-14">
        <section className="mx-auto max-w-2xl text-center animate-fade-in">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">
            ✦ Wer mag Lemo ✦
          </p>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-semibold leading-tight text-foreground">
            Luo Hymn Book
          </h1>
          <p className="mt-4 text-muted-foreground">
            A sacred collection of {hymns.length || 267} hymns — sung in
            worship, treasured in heart.
          </p>

          <div className="relative mt-8">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by number, title, or lyrics…"
              className="h-12 rounded-full border-border/70 bg-card/80 pl-11 pr-5 text-base shadow-soft focus-visible:ring-gold/40"
            />
          </div>
        </section>

        <section className="mt-12">
          {loading && (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading hymns…
            </div>
          )}
          {error && (
            <p className="text-center text-destructive">{error}</p>
          )}
          {!loading && !error && (
            <>
              <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {filtered.length} hymn{filtered.length === 1 ? "" : "s"}
                  {query && ` matching “${query}”`}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((h) => (
                  <HymnCard key={h.number} hymn={h} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="py-16 text-center text-muted-foreground">
                  No hymns found. Try another search.
                </p>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Index;
