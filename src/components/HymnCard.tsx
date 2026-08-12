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
        className="flex h-full items-start gap-4 rounded-2xl border border-border/70 bg-surface p-4 pr-14 shadow-soft transition-all hover:border-primary/60 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand font-display text-sm font-semibold text-primary-foreground">
          {hymn.number}
        </span>
        <span className="min-w-0 flex-1">
          <h3 className="font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
            {hymn.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {preview}
          </p>
        </span>
      </Link>
      <button
        type="button"
        aria-label={
          fav
            ? `Remove hymn ${hymn.number} from favourites`
            : `Save hymn ${hymn.number} to favourites`
        }
        aria-pressed={fav}
        onClick={() => toggle(hymn.number)}
        className={cn(
          "absolute right-1 top-1 flex h-11 w-11 items-center justify-center rounded-full transition-colors",
          fav ? "text-primary" : "text-muted-foreground hover:text-primary",
        )}
      >
        <Heart className={cn("h-[1.15rem] w-[1.15rem]", fav && "fill-current")} />
      </button>
    </article>
  );
};

export default HymnCard;
