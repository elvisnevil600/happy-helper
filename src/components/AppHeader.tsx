import { Link, useLocation } from "react-router-dom";
import { BookOpen, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const AppHeader = () => {
  const { pathname } = useLocation();

  const link = (to: string, label: string, Icon: typeof BookOpen) => {
    const active = pathname === to;
    return (
      <Link
        key={to}
        to={to}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
          active
            ? "bg-primary text-primary-foreground shadow-soft"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        )}
      >
        <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
        <span className="hidden sm:inline">{label}</span>
        <span className="sr-only sm:hidden">{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl py-1 pr-2 transition-opacity hover:opacity-90"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold shadow-glow">
            <span className="font-display text-lg font-semibold text-primary">L</span>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold tracking-wide text-foreground">
              Luo Hymnal
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Wende Nyasaye
            </span>
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          {link("/", "Hymns", BookOpen)}
          {link("/favorites", "Favorites", Heart)}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
