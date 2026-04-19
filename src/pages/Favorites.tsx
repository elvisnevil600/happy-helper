import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import CelestialBackground from "@/components/CelestialBackground";
import HymnCard from "@/components/HymnCard";
import { Button } from "@/components/ui/button";
import { useHymns } from "@/hooks/useHymns";
import { useFavorites } from "@/hooks/useFavorites";

const Favorites = () => {
  const { hymns, loading } = useHymns();
  const { favorites } = useFavorites();

  const list = hymns
    .filter((h) => favorites.includes(h.number))
    .sort((a, b) => a.number - b.number);

  return (
    <>
      <CelestialBackground />
      <AppHeader />
      <main className="container py-10 md:py-14">
        <header className="mx-auto max-w-2xl text-center animate-fade-in">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">✦ Treasured ✦</p>
          <h1 className="mt-3 font-display text-3xl md:text-5xl font-semibold text-foreground">
            Your Favorites
          </h1>
          <p className="mt-4 text-muted-foreground">
            Hymns you've saved to return to in worship.
          </p>
        </header>

        <section className="mt-12">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading…</p>
          ) : list.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-card/60 p-12 text-center">
              <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
              <h2 className="mt-4 font-display text-xl text-foreground">
                No favorites yet
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tap the heart on any hymn to save it here.
              </p>
              <Button asChild className="mt-6 rounded-full">
                <Link to="/">Browse hymns</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((h) => (
                <HymnCard key={h.number} hymn={h} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Favorites;
