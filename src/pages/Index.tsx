import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import CelestialBackground from "@/components/CelestialBackground";
import HymnCard from "@/components/HymnCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHymns } from "@/hooks/useHymns";
import { searchHymns } from "@/services/search/hymnSearch";

const ENTRY_SESSION_KEY = "luo-hymnal-entry-seen";

const hymnSections = [
  { title: "Fak gi Dend", start: 1, end: 37 },
  { title: "Wuodh Ja-Kristo", start: 38, end: 80 },
  { title: "Jip gi Geno", start: 81, end: 109 },
  { title: "Lamo", start: 110, end: 137 },
  { title: "Nyual Yesu (Kristmas)", start: 138, end: 148 },
  { title: "Wende Sawo", start: 149, end: 164 },
  { title: "Chier", start: 165, end: 166 },
  { title: "Polo", start: 167, end: 186 },
  { title: "Warrnok", start: 187, end: 213 },
  { title: "Luong", start: 214, end: 227 },
  { title: "Lando Wach", start: 228, end: 236 },
  { title: "Wiro mar Ruodhwa", start: 237, end: 245 },
  { title: "Wende Nyithindo", start: 246, end: 263 },
  { title: "Kend Maier", start: 264, end: 266 },
  { title: "Wimbo wa Taifa", start: 267, end: 267 },
];

const hasEnteredThisSession = () => {
  try {
    return window.sessionStorage.getItem(ENTRY_SESSION_KEY) === "true";
  } catch {
    return false;
  }
};

const Index = () => {
  const { hymns, loading, error } = useHymns();
  const [query, setQuery] = useState("");
  const [openingPage, setOpeningPage] = useState<number | null>(() => hasEnteredThisSession() ? null : 0);

  const filtered = useMemo(
    () => searchHymns(hymns, query).map((r) => r.hymn),
    [hymns, query],
  );

  const finishOpeningPages = () => {
    try {
      window.sessionStorage.setItem(ENTRY_SESSION_KEY, "true");
    } catch {
      // Keep the current visit usable even if browser storage is unavailable.
    }
    setOpeningPage(null);
  };

  const paper = "relative mx-auto flex min-h-[min(78svh,48rem)] w-full max-w-[34rem] flex-col overflow-hidden border border-stone-300 bg-[#fffdf7] px-7 py-9 text-stone-900 shadow-[0_18px_50px_rgba(45,35,20,0.22)] sm:px-12 sm:py-12";
  const pageNav = "flex h-11 items-center justify-center rounded-full border border-stone-400 bg-[#fffdf7] px-5 text-sm font-medium text-stone-800 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40";

  if (openingPage !== null) {
    return (
      <main className="min-h-[100svh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-100 via-stone-200 to-stone-300 px-4 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto flex max-w-[42rem] flex-col items-center">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-600">AIC Digital Hymnal</p>

          {openingPage === 0 && (
            <section className={paper + " items-center justify-between bg-[#164b36] text-center text-[#f8f0d8] border-[#bda978]"}>
              <div className="absolute inset-3 border border-[#c9b783]/60" aria-hidden />
              <p className="relative mt-4 text-[10px] uppercase tracking-[0.35em] text-[#d8c99f]">African Inland Church</p>
              <div className="relative flex flex-1 flex-col items-center justify-center">
                <BookOpen className="mb-8 h-16 w-16 stroke-[1.1] text-[#e8d9ad]" aria-hidden />
                <h1 className="font-serif text-3xl font-bold leading-tight tracking-wide sm:text-4xl">DHOLUO HYMNS</h1>
                <p className="mt-5 font-serif text-xl tracking-wide text-[#e8d9ad]">KITAP WEND NYASAYE</p>
                <p className="mt-2 font-serif text-sm tracking-[0.22em] text-[#e8d9ad]">MOLOS MANYIEN</p>
              </div>
              <p className="relative mb-4 text-[10px] uppercase tracking-[0.28em] text-[#d8c99f]">Sing · Worship · Grow</p>
            </section>
          )}

          {openingPage === 1 && (
            <section className={paper + " items-center justify-between text-center"}>
              <div className="mt-8 flex flex-1 flex-col items-center justify-center">
                <BookOpen className="mb-10 h-16 w-16 stroke-[1.1] text-stone-800" aria-hidden />
                <h1 className="font-serif text-3xl font-bold leading-tight tracking-wide sm:text-4xl">DHOLUO HYMNS</h1>
                <p className="mt-6 font-serif text-xl tracking-wide">KITAP WEND NYASAYE</p>
                <p className="mt-2 font-serif text-sm tracking-[0.22em]">MOLOS MANYIEN</p>
              </div>
              <p className="mb-4 font-serif text-xs tracking-[0.18em] text-stone-500">AFRICAN INLAND CHURCH</p>
            </section>
          )}

          {openingPage === 2 && (
            <section className={paper}>
              <header className="mb-6 text-center">
                <p className="font-serif text-[10px] uppercase tracking-[0.2em] text-stone-500">Kitap Wend Nyasaye · Molos Manyien</p>
                <h1 className="mt-3 font-serif text-2xl font-bold">Weche Mantie e Buk</h1>
              </header>
              <div className="flex-1">
                {hymnSections.map((section) => {
                  const firstHymn = hymns.find((h) => h.number === section.start);
                  return (
                    <Link key={section.title} to={"/hymn/" + section.start} className="flex min-h-9 items-center justify-between gap-3 border-b border-stone-200 py-2 font-serif text-[13px] transition-colors hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800">
                      <span className="min-w-0">
                        <span className="block font-semibold">{section.title}</span>
                        <span className="block truncate text-[10px] text-stone-500">{firstHymn ? firstHymn.title : "Wende " + section.start}</span>
                      </span>
                      <span className="shrink-0 tabular-nums text-stone-600">{section.start === section.end ? section.start : section.start + "–" + section.end}</span>
                    </Link>
                  );
                })}
              </div>
              <p className="mt-5 text-center font-serif text-[10px] text-stone-500">267 Wende</p>
            </section>
          )}

          {openingPage === 3 && (
            <section className={paper + " gap-5"}>
              <header className="text-center">
                <h1 className="font-serif text-xl font-bold">Ayie mar Joote</h1>
                <p className="mt-1 font-serif text-xs italic text-stone-500">Apostles’ Creed</p>
              </header>
              <p className="font-serif text-[13px] leading-[1.8]">Ayie kuom Nyasaye Wuonwa, manyalo gik moko duto. Jacheuech polo gi piny, kendo kuom Yesu Kristo Wuode ma Miderma, Ruodhwa, ka min nomako ich gi teko mar Roho Maler, nyako Mariam ema nonyuole, ne oneno masira kuom Pontio Pilato, nogure, notho, noike, nolor kuom joma otho, chieng’ mar adek, nochier, noa kuom joma otho, noidho epolo, mober ebar korachwieh mar Nyasaye Wuonwa manyalo gik moko duto, chieng’ noa kuno nobi mondo ong’ad bura kuom joma ngima gi joma otho, Ayie kuom Roho Maler, kanisa maler mar piny ngima, lalruok mar jomaler, werruok mar rieho, chier mar ringruok, kendo ngima mar higni gi higni. Amen.</p>
              <div className="border-t border-stone-200 pt-4 text-center">
                <h2 className="font-serif text-lg font-bold">Lamo mar Ruoth</h2>
                <p className="mt-1 font-serif text-xs italic text-stone-500">Lord’s Prayer</p>
              </div>
              <p className="font-serif text-[13px] leading-[1.8]">Wuonwa manie polo, Nyingi mondo obed maler. Piny Ruoth mari obi, Gima idwaro mondo otimre epiny, kaka timore epolo. Imiwa tinende chiembwa mar tinende, iwenwa eriehowa, kaka wawe yo ni joma timonwa marach, kik iterwa kar tem to konywa erieho, nikech piny Ruoth, gi teko, gi duong’, ni kuomi higni gi higni. Amen.</p>
              <div className="border-t border-stone-200 pt-4 text-center">
                <h2 className="font-serif text-lg font-bold">Ng’wono</h2>
                <p className="mt-1 font-serif text-xs italic text-stone-500">The Grace</p>
              </div>
              <p className="font-serif text-[13px] leading-[1.8]">Ng’wono mar Ruodhwa Yesu Kristo, gi hera mar Nyasaye Wuoro, gi lalruok mar Roho Maler, obed kodwa duto nyaka chieng’. Amen.</p>
            </section>
          )}

          <div className="mt-5 flex w-full max-w-[34rem] items-center justify-between gap-3">
            <button type="button" className={pageNav} disabled={openingPage === 0} onClick={() => setOpeningPage((p) => p === null ? 0 : Math.max(0, p - 1))}>Previous</button>
            <span className="text-xs tabular-nums text-stone-600">{openingPage + 1} / 4</span>
            {openingPage < 3 ? (
              <button type="button" className={pageNav} onClick={() => setOpeningPage((p) => p === null ? 0 : Math.min(3, p + 1))}>Next</button>
            ) : (
              <button type="button" className={pageNav + " border-emerald-800 bg-emerald-800 text-white hover:bg-emerald-900"} onClick={finishOpeningPages}>Begin hymns</button>
            )}
          </div>
          <p className="mt-4 text-center text-[10px] text-stone-500">Tap a section in the contents page to open its hymns directly.</p>
        </div>
      </main>
    );
  }


  return (
    <>
      <CelestialBackground />
      <AppHeader />
      <main className="container pb-28 pt-8 md:pt-12">
        <section className="mx-auto max-w-2xl text-center animate-fade-in">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brand">
            Sing · Worship · Grow
          </p>
          <h1 className="mt-3 font-display text-[1.9rem] font-semibold leading-tight text-foreground md:text-5xl rule">
            Luo Hymnal
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Digital Luo Christian hymns — {hymns.length || 267} hymns to browse,
            search and treasure.
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
            A Ministry of the African Inland Church (AIC)
          </p>
        </section>


        <div className="sticky top-16 z-30 -mx-6 mt-6 bg-background/85 px-6 py-3 backdrop-blur-md md:static md:mx-0 md:mt-8 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
          <div className="relative mx-auto max-w-2xl">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <label htmlFor="hymn-search" className="sr-only">
              Search hymns
            </label>
            <Input
              id="hymn-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by number, title, or lyrics…"
              className="h-12 rounded-full border-border/70 bg-card/90 pl-11 pr-12 text-base shadow-soft focus-visible:ring-primary/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <section className="mt-6 md:mt-10">
          {loading && (
            <div
              aria-live="polite"
              className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
            >
              <span className="sr-only">Loading hymns…</span>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[104px] animate-pulse rounded-2xl border border-border/50 bg-card/60"
                />
              ))}
            </div>
          )}
          {error && (
            <p className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center text-destructive">
              {error}
            </p>
          )}
          {!loading && !error && (
            <>
              <p
                aria-live="polite"
                className="mb-4 text-sm text-muted-foreground"
              >
                {filtered.length} hymn{filtered.length === 1 ? "" : "s"}
                {query && ` matching “${query}”`}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((h) => (
                  <HymnCard key={h.number} hymn={h} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
                  <Search className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
                  <h2 className="mt-4 font-display text-lg text-foreground">
                    No hymns found
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Try a different word, or search by hymn number.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Index;
