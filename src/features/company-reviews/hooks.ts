// src/features/company-reviews/hooks.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchCompanyReviews, fetchCompanyStats } from "./api";
import type { CompanyReview, CompanyStats, Paged } from "./types";
import type { ListParams } from "./api";

/** Стабилизация объекта параметров (чтобы не триггерить эффект на каждый рендер) */
function useStableParams<T extends object>(params: T): T {
  const json = useMemo(() => JSON.stringify(params ?? {}), [params]);
  // возвращаем новый, но детерминированный объект

  return useMemo(() => JSON.parse(json) as T, [json]);
}

/** Список отзывов компании */
export function useCompanyReviews(params: ListParams) {
  const stable = useStableParams(params);

  const [data, setData] = useState<Paged<CompanyReview> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => setTick((x) => x + 1), []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetchCompanyReviews(stable);
        if (!mounted) return;
        setData(res);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : `Unexpected error: ${String(err)}`;
        if (!mounted) return;
        setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [stable, tick]);

  return { data, loading, error, reload };
}

/** Статистика отзывов компании (средняя оценка и количество) */
export function useCompanyReviewsStats() {
  const [data, setData] = useState<CompanyStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => setTick((x) => x + 1), []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const res = await fetchCompanyStats();
        if (!mounted) return;
        setData(res);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : `Unexpected error: ${String(err)}`;
        if (!mounted) return;
        setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [tick]);

  return { data, loading, error, reload };
}

export type { CompanyReview, CompanyStats, Paged, ListParams };
