import { Link, useLocation } from "react-router-dom";
import { BookOpen, Heart, History } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Hymns", Icon: BookOpen },
  { to: "/favorites", label: "Favourites", Icon: Heart },
  { to: "/recent", label: "Recent", Icon: History },
];

const AppHeader = () => {
  const { pathname } = useLocation();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl py-1 pr-2 transition-opacity hover:opacity-90"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-primary-foreground shadow-glow">
              <BrandMark className="h-6 w-6" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-base font-semibold tracking-wide text-foreground">
                Luo Hymnal
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                AIC Digital Hymnal
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
            {items.map(({ to, label, Icon }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md sm:hidden"
      >
        <div className="flex items-stretch">
          {items.map(({ to, label, Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-brand" : "text-muted-foreground",
                )}
              >
                <Icon className={cn("h-5 w-5", active && "fill-current/0")} aria-hidden />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default AppHeader;
