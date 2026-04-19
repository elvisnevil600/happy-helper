import { useCallback, useEffect, useState } from "react";

const KEY = "luo-hymn-favorites";

function read(): number[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setFavorites(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((number: number) => {
    setFavorites((prev) => {
      const next = prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (number: number) => favorites.includes(number),
    [favorites],
  );

  return { favorites, toggle, isFavorite };
}
