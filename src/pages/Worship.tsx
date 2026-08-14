import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ListMusic, Plus, Trash2 } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import CelestialBackground from "@/components/CelestialBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorshipServices } from "@/hooks/useWorshipServices";

const today = () => new Date().toISOString().slice(0, 10);

const Worship = () => {
  const { services, create, remove } = useWorshipServices();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(today);

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
    create(title, date);
    setTitle("");
  };

  return (
    <>
      <CelestialBackground />
      <AppHeader />
      <main className="container pb-28 pt-8 md:pt-12">
        <header className="mx-auto max-w-2xl text-center animate-fade-in">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand">
            Worship Mode
          </p>
          <h1 className="mt-3 font-display text-[1.75rem] font-semibold leading-tight text-foreground md:text-5xl">
            Service Playlists
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Plan a service, arrange your hymns, and lead worship without
            fumbling for page numbers.
          </p>
        </header>

        <form
          onSubmit={onCreate}
          className="mx-auto mt-8 max-w-2xl space-y-3 rounded-3xl border border-border/70 bg-card/90 p-4 shadow-soft md:p-5"
        >
          <div>
            <label htmlFor="service-title" className="sr-only">
              Service name
            </label>
            <Input
              id="service-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sunday Morning Service"
              className="h-12 rounded-full bg-background/70 px-5 text-base"
            />
          </div>
          <div className="flex gap-3">
            <label htmlFor="service-date" className="sr-only">
              Service date
            </label>
            <Input
              id="service-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 flex-1 rounded-full bg-background/70 px-5 text-base"
            />
            <Button type="submit" className="h-12 shrink-0 rounded-full px-5">
              <Plus className="mr-1.5 h-4 w-4" aria-hidden /> Create
            </Button>
          </div>
        </form>

        <section className="mx-auto mt-8 max-w-2xl">
          {services.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
              <ListMusic className="mx-auto h-9 w-9 text-muted-foreground" aria-hidden />
              <h2 className="mt-4 font-display text-lg text-foreground">
                No services yet
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Create your first service above to start building an order of
                worship.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id} className="relative">
                  <Link
                    to={`/worship/${s.id}`}
                    className="flex items-center gap-4 rounded-2xl border border-border/70 bg-surface p-4 pr-14 shadow-soft transition-all hover:border-primary/60 hover:shadow-elevated"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-primary-foreground">
                      <ListMusic className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-base font-semibold text-foreground">
                        {s.title}
                      </span>
                      <span className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                        {s.date} · {s.hymns.length} hymn
                        {s.hymns.length === 1 ? "" : "s"}
                      </span>
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(s.id)}
                    aria-label={`Delete ${s.title}`}
                    className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
};

export default Worship;
