import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import CelestialBackground from "@/components/CelestialBackground";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <CelestialBackground />
      <AppHeader />
      <main className="container flex min-h-[60dvh] items-center justify-center py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand">✦ 404 ✦</p>
          <h1 className="mt-3 font-display text-2xl font-semibold text-foreground">
            Page not found
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            That page isn't part of the hymnal.
          </p>
          <Button asChild className="mt-6 h-11 rounded-full px-6">
            <Link to="/">Back to hymns</Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default NotFound;
