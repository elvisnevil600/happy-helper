import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Hymn } from "@/types/hymn";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface Props {
  hymn: Hymn;
}

const HymnCard = ({ hymn }: Props) => {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(hymn.number);

  // Show first non-empty stanza line as preview
  const preview =
    hymn.lyrics
      .split("\n")
      .map((l) => l.trim())
      .find((l) => l && !/^\d+\.?$/.test(l))
      ?.replace(/^\d+\.\s*/, "") ?? "";

  return (
    <article className="group relative">
      <Link
        to={`/hymn/${hymn.number}`}
        className="block h-full rounded-2xl border border-border/60 bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-sacred"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-parchment border border-gold/40 font-display text-sm font-semibold text-gold">
            {hymn.number}
          </div>
          <button
            type="button"
            aria-label={fav ? "Remove favorite" : "Add favorite"}
            onClick={(e) => {
              e.preventDefault();
              toggle(hymn.number);
            }}
            className={cn(
              "rounded-full p-2 transition-colors",
              fav
                ? "text-destructive"
                : "text-muted-foreground hover:text-destructive",
            )}
          >
            <Heart className={cn("h-4 w-4", fav && "fill-current")} />
          </button>
        </div>
        <h3 className="mt-4 font-display text-base font-semibold leading-snug text-foreground group-hover:text-gold transition-colors">
          {hymn.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm italic text-muted-foreground">
          {preview}
        </p>
      </Link>
    </article>
  );
};

export default HymnCard;
