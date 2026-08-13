/**
 * Worship service store — owns service playlists (an ordered list of hymn
 * numbers plus a title/date). Backed by localStorage; swappable later.
 */

export interface WorshipService {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  hymns: number[];
  createdAt: number;
}

const KEY = "luo-hymn-services";

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribeServices(listener: Listener): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function read(): WorshipService[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (s): s is WorshipService =>
        s && typeof s.id === "string" && Array.isArray(s.hymns),
    );
  } catch {
    return [];
  }
}

function write(services: WorshipService[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(services));
  } catch {
    /* storage unavailable */
  }
  emit();
}

export function getServices(): WorshipService[] {
  return read().sort((a, b) => b.createdAt - a.createdAt);
}

export function getService(id: string): WorshipService | undefined {
  return read().find((s) => s.id === id);
}

export function createService(title: string, date: string): WorshipService {
  const service: WorshipService = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now()),
    title: title.trim() || "Untitled service",
    date,
    hymns: [],
    createdAt: Date.now(),
  };
  write([service, ...read()]);
  return service;
}

export function updateService(id: string, patch: Partial<WorshipService>) {
  write(read().map((s) => (s.id === id ? { ...s, ...patch, id } : s)));
}

export function deleteService(id: string) {
  write(read().filter((s) => s.id !== id));
}

export function addHymnToService(id: string, number: number) {
  write(
    read().map((s) =>
      s.id === id && !s.hymns.includes(number)
        ? { ...s, hymns: [...s.hymns, number] }
        : s,
    ),
  );
}

export function removeHymnFromService(id: string, number: number) {
  write(
    read().map((s) =>
      s.id === id ? { ...s, hymns: s.hymns.filter((n) => n !== number) } : s,
    ),
  );
}

export function moveHymnInService(id: string, from: number, to: number) {
  write(
    read().map((s) => {
      if (s.id !== id) return s;
      if (to < 0 || to >= s.hymns.length) return s;
      const hymns = [...s.hymns];
      const [moved] = hymns.splice(from, 1);
      hymns.splice(to, 0, moved);
      return { ...s, hymns };
    }),
  );
}
