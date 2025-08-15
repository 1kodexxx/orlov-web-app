import { useEffect, useMemo, useRef, useState } from "react";
import { fetchCompanyReviews, fetchCompanyReviewsStats } from "./api";
import type { CompanyReview, CompanyReviewStats, Paged } from "./types";

/** Хук для списка отзывов (с пагинацией) */
export function useCompanyReviews(opts: {
  approved?: boolean;
  page?: number;
  limit?: number;
}) {
  const options = useMemo(
    () => ({
      approved: opts.approved,
      page: opts.page ?? 1,
      limit: opts.limit ?? 9,
    }),
    [opts.approved, opts.page, opts.limit]
  );

  const [data, setData] = useState<Paged<CompanyReview> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const acRef = useRef<AbortController | null>(null);

  // базовая загрузка при монтировании/смене опций
  useEffect(() => {
    let ignore = false;

    (async () => {
      acRef.current?.abort();
      const ac = new AbortController();
      acRef.current = ac;
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCompanyReviews(options);
        if (!ac.signal.aborted && !ignore) setData(res);
      } catch (e) {
        if (!ac.signal.aborted && !ignore)
          setError(
            e instanceof Error ? e.message : "Не удалось загрузить отзывы"
          );
      } finally {
        if (!ac.signal.aborted && !ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
      acRef.current?.abort();
    };
  }, [options.approved, options.page, options.limit]);

  // умный reload: гарантирует, что limit >= уже показанному числу элементов
  async function reload(override?: { page?: number; limit?: number }) {
    acRef.current?.abort();
    const ac = new AbortController();
    acRef.current = ac;
    setLoading(true);
    setError(null);
    try {
      const currentLen = data?.items?.length ?? 0;
      const res = await fetchCompanyReviews({
        approved: options.approved,
        page: override?.page ?? options.page,
        limit: Math.max(override?.limit ?? options.limit, currentLen || 0),
      });
      if (!ac.signal.aborted) setData(res);
    } catch (e) {
      if (!ac.signal.aborted)
        setError(
          e instanceof Error ? e.message : "Не удалось загрузить отзывы"
        );
    } finally {
      if (!ac.signal.aborted) setLoading(false);
    }
  }

  return {
    data,
    loading,
    error,
    reload,
  };
}

/** Хук для статистики отзывов */
export function useCompanyReviewsStats() {
  const [data, setData] = useState<CompanyReviewStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCompanyReviewsStats();
        if (mounted) setData(res);
      } catch (e) {
        if (mounted)
          setError(
            e instanceof Error ? e.message : "Не удалось загрузить статистику"
          );
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error, reload: () => {} };
}
