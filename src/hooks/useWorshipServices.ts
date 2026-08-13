import { useCallback, useEffect, useState } from "react";
import {
  type WorshipService,
  addHymnToService,
  createService,
  deleteService,
  getService,
  getServices,
  moveHymnInService,
  removeHymnFromService,
  subscribeServices,
  updateService,
} from "@/services/worship/store";

export function useWorshipServices() {
  const [services, setServices] = useState<WorshipService[]>([]);

  useEffect(() => {
    setServices(getServices());
    return subscribeServices(() => setServices(getServices()));
  }, []);

  return {
    services,
    create: useCallback(
      (title: string, date: string) => createService(title, date),
      [],
    ),
    remove: useCallback((id: string) => deleteService(id), []),
  };
}

export function useWorshipService(id: string | undefined) {
  const [service, setService] = useState<WorshipService | undefined>(() =>
    id ? getService(id) : undefined,
  );

  useEffect(() => {
    if (!id) return;
    setService(getService(id));
    return subscribeServices(() => setService(getService(id)));
  }, [id]);

  return {
    service,
    rename: useCallback(
      (patch: { title?: string; date?: string }) =>
        id && updateService(id, patch),
      [id],
    ),
    addHymn: useCallback((n: number) => id && addHymnToService(id, n), [id]),
    removeHymn: useCallback(
      (n: number) => id && removeHymnFromService(id, n),
      [id],
    ),
    move: useCallback(
      (from: number, to: number) => id && moveHymnInService(id, from, to),
      [id],
    ),
  };
}
