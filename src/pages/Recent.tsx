import { Link } from "react-router-dom";
import { History } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import CelestialBackground from "@/components/CelestialBackground";
import HymnCard from "@/components/HymnCard";
import { Button } from "@/components/ui/button";
import { useHymns } from "@/hooks/useHymns";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

const Recent = () => {
  const { hymns, loading } = useHymns();
  const { recent, clear } = useRecentlyViewed();

  const list = recent
    .map((n) => hymns.find((h) => h.number === n))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  return (
    <>
      <CelestialBackground />
      <AppHeader />
      <main className="container pb-28 pt-8 md:pt-12">
        <header className="mx-auto max-w-2xl text-center animate-fade-in">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand">
            Continue worship
          </p>
          <h1 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight text-foreground md:text-5xl">
            Recently Viewed
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            The hymns you opened most recently on this device.
          </p>
        </header>

        <section className="mt-8 md:mt-12">
          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              <span className="sr-only">Loading…</span>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[104px] animate-pulse rounded-2xl border border-border/50 bg-card/60"
                />
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
              <History className="mx-auto h-9 w-9 text-muted-foreground" aria-hidden />
              <h2 className="mt-4 font-display text-lg text-foreground">
                Nothing here yet
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Open a hymn and it will appear here for quick return.
              </p>
              <Button asChild className="mt-6 h-11 rounded-full px-6">
                <Link to="/">Browse hymns</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {list.length} hymn{list.length === 1 ? "" : "s"}
                </p>
                <Button
                  variant="ghost"
                  onClick={clear}
                  className="h-11 rounded-full px-4 text-sm text-muted-foreground"
                >
                  Clear history
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {list.map((h) => (
                  <HymnCard key={h.number} hymn={h} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Recent;
