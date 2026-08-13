import { useCallback, useEffect, useState } from "react";
import {
  clearRecent,
  getRecent,
  recordView,
  subscribe,
} from "@/services/personalLibrary/store";

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<number[]>([]);

  useEffect(() => {
    setRecent(getRecent());
    return subscribe(() => setRecent(getRecent()));
  }, []);

  return {
    recent,
    record: useCallback((n: number) => setRecent(recordView(n)), []),
    clear: useCallback(() => {
      clearRecent();
      setRecent([]);
    }, []),
  };
}
