import { useEffect, useState } from "react";
import type { Hymn } from "@/types/hymn";

let cache: Hymn[] | null = null;

export function useHymns() {
  const [hymns, setHymns] = useState<Hymn[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) return;
    fetch("/hymns.json")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load hymns");
        return r.json();
      })
      .then((data: Hymn[]) => {
        cache = data;
        setHymns(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { hymns, loading, error };
}
