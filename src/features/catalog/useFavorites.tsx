import * as React from "react";
import { getFavorites, type ProductRow } from "@/features/catalog";

/** Ключ в localStorage */
const LS_KEY = "fav:v1";

/** Прочитать/записать set<number> из/в LS */
const loadFromLS = (): Set<number> => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as unknown;
    if (Array.isArray(arr))
      return new Set(arr.map((x) => Number(x)).filter(Number.isFinite));
    return new Set();
  } catch {
    return new Set();
  }
};

const saveToLS = (ids: Set<number>) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    /* ignore */
  }
};

type Ctx = {
  likedIds: Set<number>;
  /** отметить локально как лайкнутый (и сохранить в LS) */
  markLiked: (id: number) => void;
  /** снять локально лайк (и сохранить в LS) */
  markUnliked: (id: number) => void;
  /** попробовать подтянуть лайки из API, если доступно */
  refresh: () => Promise<void>;
};

const FavoritesCtx = React.createContext<Ctx | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [likedIds, setLikedIds] = React.useState<Set<number>>(() =>
    loadFromLS()
  );

  const setAndPersist = React.useCallback(
    (updater: (prev: Set<number>) => Set<number>) => {
      setLikedIds((prev) => {
        const next = updater(prev);
        saveToLS(next);
        return next;
      });
    },
    []
  );

  const refresh = React.useCallback(async () => {
    try {
      // если есть авторизация/visitorId – подтянем список «избранного» с сервера
      const items: ProductRow[] = await getFavorites();
      const serverIds = new Set(items.map((p) => p.product_id));
      // объединим с локальными (чтобы не потерять клиентские лайки, сделанные оффлайн)
      setAndPersist((prev) => {
        const union = new Set(prev);
        serverIds.forEach((id) => union.add(id));
        return union;
      });
    } catch {
      // гость без visitorId, проблемы с cookies/CORS и т.п. – просто оставим локальные лайки
    }
  }, [setAndPersist]);

  React.useEffect(() => {
    // при первом рендере пытаемся синхронизироваться с сервером
    refresh();
  }, [refresh]);

  const markLiked = React.useCallback(
    (id: number) => {
      setAndPersist((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    },
    [setAndPersist]
  );

  const markUnliked = React.useCallback(
    (id: number) => {
      setAndPersist((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
    [setAndPersist]
  );

  return (
    <FavoritesCtx.Provider
      value={{ likedIds, markLiked, markUnliked, refresh }}>
      {children}
    </FavoritesCtx.Provider>
  );
};

export const useFavorites = (): Ctx => {
  const ctx = React.useContext(FavoritesCtx);
  if (!ctx)
    throw new Error("useFavorites must be used within <FavoritesProvider>");
  return ctx;
};
