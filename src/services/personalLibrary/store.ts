/**
 * Personal library store — the single owner of per-device user state
 * (favourites, recently viewed, reading preferences).
 * Backed by localStorage today; swappable for a cloud backend later.
 */

const KEYS = {
  favorites: "luo-hymn-favorites",
  recent: "luo-hymn-recent",
  fontSize: "luo-hymn-font-size",
} as const;

type Key = keyof typeof KEYS;

const RECENT_LIMIT = 20;

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key && Object.values(KEYS).includes(e.key as never)) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function readJSON<T>(key: Key, fallback: T): T {
  try {
    const raw = localStorage.getItem(KEYS[key]);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: Key, value: unknown) {
  try {
    localStorage.setItem(KEYS[key], JSON.stringify(value));
  } catch {
    /* storage unavailable — state stays in memory for this session */
  }
  emit();
}

/* ---------- favourites ---------- */

export function getFavorites(): number[] {
  const value = readJSON<number[]>("favorites", []);
  return Array.isArray(value) ? value.filter((n) => typeof n === "number") : [];
}

export function toggleFavorite(number: number): number[] {
  const prev = getFavorites();
  const next = prev.includes(number)
    ? prev.filter((n) => n !== number)
    : [...prev, number];
  writeJSON("favorites", next);
  return next;
}

/* ---------- recently viewed ---------- */

export function getRecent(): number[] {
  const value = readJSON<number[]>("recent", []);
  return Array.isArray(value) ? value.filter((n) => typeof n === "number") : [];
}

export function recordView(number: number): number[] {
  const next = [number, ...getRecent().filter((n) => n !== number)].slice(
    0,
    RECENT_LIMIT,
  );
  writeJSON("recent", next);
  return next;
}

export function clearRecent() {
  writeJSON("recent", []);
}

/* ---------- reading preferences ---------- */

export const FONT_MIN = 16;
export const FONT_MAX = 30;
export const FONT_DEFAULT = 19;

export function getFontSize(): number {
  const stored = Number(localStorage.getItem(KEYS.fontSize));
  return stored >= FONT_MIN && stored <= FONT_MAX ? stored : FONT_DEFAULT;
}

export function setFontSize(size: number) {
  const clamped = Math.min(FONT_MAX, Math.max(FONT_MIN, size));
  try {
    localStorage.setItem(KEYS.fontSize, String(clamped));
  } catch {
    /* ignore */
  }
  emit();
}
