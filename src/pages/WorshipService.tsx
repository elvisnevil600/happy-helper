import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
  Play,
  Search,
  Trash2,
  X,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import CelestialBackground from "@/components/CelestialBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHymns } from "@/hooks/useHymns";
import { useWorshipService } from "@/hooks/useWorshipServices";
import { searchHymns } from "@/services/search/hymnSearch";
import { getFontSize } from "@/services/personalLibrary/store";
import { cn } from "@/lib/utils";

const WorshipService = () => {
  const { id } = useParams();
  const { hymns, loading } = useHymns();
  const { service, addHymn, removeHymn, move } = useWorshipService(id);
  const [query, setQuery] = useState("");
  const [presenting, setPresenting] = useState(false);
  const [index, setIndex] = useState(0);

  const ordered = useMemo(
    () =>
      (service?.hymns ?? [])
        .map((n) => hymns.find((h) => h.number === n))
        .filter(Boolean) as typeof hymns,
    [service?.hymns, hymns],
  );

  const results = useMemo(
    () => (query ? searchHymns(hymns, query).slice(0, 8).map((r) => r.hymn) : []),
    [hymns, query],
  );

  if (!service) {
    return (
      <>
        <CelestialBackground />
        <AppHeader />
        <main className="container py-20 text-center">
          <p className="text-muted-foreground">
            {loading ? "Loading…" : "Service not found."}
          </p>
          <Button asChild variant="link" className="mt-4">
            <Link to="/worship">Back to services</Link>
          </Button>
        </main>
      </>
    );
  }

  if (presenting && ordered.length > 0) {
    const hymn = ordered[Math.min(index, ordered.length - 1)];
    const fontSize = getFontSize();
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-background">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <span className="text-sm text-muted-foreground">
            {index + 1} of {ordered.length}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-full"
            onClick={() => setPresenting(false)}
            aria-label="Exit worship mode"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-center font-display text-2xl font-semibold text-foreground md:text-4xl">
              {hymn.number}. {hymn.title}
            </h1>
            <div
              className="mt-8 space-y-6 whitespace-pre-line text-foreground"
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
            >
              {hymn.lyrics}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-border/60 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <Button
            variant="outline"
            className="h-14 rounded-2xl text-base"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
          >
            <ChevronLeft className="mr-1 h-5 w-5" aria-hidden /> Previous
          </Button>
          <Button
            className="h-14 rounded-2xl text-base"
            disabled={index >= ordered.length - 1}
            onClick={() => setIndex((i) => Math.min(ordered.length - 1, i + 1))}
          >
            Next <ChevronRight className="ml-1 h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <CelestialBackground />
      <AppHeader />
      <main className="container pb-28 pt-4 md:pt-8">
        <div className="mx-auto max-w-2xl">
          <Link
            to="/worship"
            className="inline-flex min-h-11 items-center gap-2 rounded-full pr-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> Services
          </Link>

          <header className="mt-2">
            <h1 className="font-display text-2xl font-semibold text-foreground md:text-4xl">
              {service.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {service.date} · {ordered.length} hymn
              {ordered.length === 1 ? "" : "s"}
            </p>
          </header>

          <Button
            className="mt-4 h-14 w-full rounded-2xl text-base"
            disabled={ordered.length === 0}
            onClick={() => {
              setIndex(0);
              setPresenting(true);
            }}
          >
            <Play className="mr-2 h-5 w-5" aria-hidden /> Start worship
          </Button>

          <section className="mt-8">
            <h2 className="font-display text-lg text-foreground">Order of hymns</h2>
            {ordered.length === 0 ? (
              <p className="mt-3 rounded-2xl border border-dashed border-border bg-card/60 px-5 py-8 text-center text-sm text-muted-foreground">
                No hymns yet — search below to add them.
              </p>
            ) : (
              <ol className="mt-3 space-y-2">
                {ordered.map((h, i) => (
                  <li
                    key={h.number}
                    className="flex items-center gap-3 rounded-2xl border border-border/70 bg-surface p-3 shadow-soft"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand font-display text-sm font-semibold text-primary-foreground">
                      {h.number}
                    </span>
                    <Link
                      to={`/hymn/${h.number}`}
                      className="min-w-0 flex-1 truncate text-sm font-medium text-foreground hover:text-brand"
                    >
                      {h.title}
                    </Link>
                    <div className="flex shrink-0 items-center">
                      <button
                        type="button"
                        aria-label={`Move ${h.title} up`}
                        disabled={i === 0}
                        onClick={() => move(i, i - 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Move ${h.title} down`}
                        disabled={i === ordered.length - 1}
                        onClick={() => move(i, i + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Remove ${h.title}`}
                        onClick={() => removeHymn(h.number)}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section className="mt-8">
            <h2 className="font-display text-lg text-foreground">Add hymns</h2>
            <div className="relative mt-3">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <label htmlFor="worship-search" className="sr-only">
                Search hymns to add
              </label>
              <Input
                id="worship-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by number, title, or lyrics…"
                className="h-12 rounded-full border-border/70 bg-card/90 pl-11 pr-5 text-base shadow-soft"
              />
            </div>
            {results.length > 0 && (
              <ul className="mt-3 space-y-2">
                {results.map((h) => {
                  const added = service.hymns.includes(h.number);
                  return (
                    <li
                      key={h.number}
                      className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/80 p-3"
                    >
                      <span className="w-10 shrink-0 text-center font-display text-sm font-semibold text-brand">
                        {h.number}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                        {h.title}
                      </span>
                      <Button
                        size="sm"
                        variant={added ? "secondary" : "default"}
                        className={cn("h-10 shrink-0 rounded-full px-4")}
                        disabled={added}
                        onClick={() => addHymn(h.number)}
                      >
                        <Plus className="mr-1 h-4 w-4" aria-hidden />
                        {added ? "Added" : "Add"}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default WorshipService;
