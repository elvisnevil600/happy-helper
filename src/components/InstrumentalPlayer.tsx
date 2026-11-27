import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Add a hymn number here only when its correctly matched instrumental recording
// has been added to public/audio/hymns/.
const instrumentalTunes: Record<number, string> = {};

type InstrumentalPlayerProps = {
  hymnNumber: number;
};

export function InstrumentalPlayer({ hymnNumber }: InstrumentalPlayerProps) {
  const source = instrumentalTunes[hymnNumber];

  return (
    <section
      aria-label="Instrumental hymn tune"
      className={cn(
        "mt-7 rounded-2xl border border-border/60 bg-background/55 p-4 md:p-5",
        "text-left",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
          <Music2 className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-base font-semibold text-foreground">
            Instrumental tune
          </h2>
          <p className="text-xs text-muted-foreground">
            {source
              ? "Listen while following the hymn lyrics"
              : "The matching instrumental recording is not available yet"}
          </p>
        </div>
      </div>

      {source ? (
        <audio
          className="mt-4 block w-full"
          controls
          preload="none"
          src={source}
          aria-label={`Instrumental tune for hymn ${hymnNumber}`}
        >
          Your browser does not support audio playback.
        </audio>
      ) : (
        <p className="mt-3 rounded-xl bg-secondary/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          This hymn's tune will appear here once its correct instrumental
          recording has been added.
        </p>
      )}
    </section>
  );
}
