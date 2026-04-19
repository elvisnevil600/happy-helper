import { Link, useLocation } from "react-router-dom";
import { BookOpen, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const AppHeader = () => {
  const { pathname } = useLocation();

  const link = (to: string, label: string, Icon: typeof BookOpen) => {
    const active = pathname === to;
    return (
      <Link
        to={to}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all",
          active
            ? "bg-primary text-primary-foreground shadow-soft"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary",
        )}
      >
        <Icon className="h-4 w-4" />
        <span className="hidden sm:inline">{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold shadow-glow transition-transform group-hover:scale-105">
            <span className="font-display text-lg text-primary">L</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold text-foreground">
              Wende Nyasaye
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Luo Hymn Book
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          {link("/", "Hymns", BookOpen)}
          {link("/favorites", "Favorites", Heart)}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
