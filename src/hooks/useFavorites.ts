import { useCallback, useEffect, useState } from "react";
import {
  getFavorites,
  subscribe,
  toggleFavorite,
} from "@/services/personalLibrary/store";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
    return subscribe(() => setFavorites(getFavorites()));
  }, []);

  const toggle = useCallback((number: number) => {
    setFavorites(toggleFavorite(number));
  }, []);

  const isFavorite = useCallback(
    (number: number) => favorites.includes(number),
    [favorites],
  );

  return { favorites, toggle, isFavorite };
}
