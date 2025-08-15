import { apiFetch } from "@/shared/apiClient";
import type { CompanyReview, Paged, CompanyStats } from "./types";

/** Параметры выборки */
export type ListParams = {
  approved?: boolean; // по умолчанию true
  page?: number; // по умолчанию 1
  limit?: number; // по умолчанию 20/на UI можно 9
};

/** Сборка query-строки из примитивов (стабильная для useMemo/useEffect) */
export function makeQuery(params: ListParams = {}): string {
  const approved = params.approved ?? true;
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const qs = new URLSearchParams({
    approved: String(approved),
    page: String(page),
    limit: String(limit),
  });
  return qs.toString();
}

/** Список отзывов (публично) */
export async function fetchCompanyReviews(
  params: ListParams = {}
): Promise<Paged<CompanyReview>> {
  const query = makeQuery(params);
  return apiFetch<Paged<CompanyReview>>(`/company-reviews?${query}`);
}

/** Статистика компании */
export async function fetchCompanyStats(): Promise<CompanyStats> {
  return apiFetch<CompanyStats>("/company-reviews/stats");
}

/** Минимальный ответ создания отзыва — ровно то, что нужно для личного кабинета */
export type CreatedCompanyReview = {
  id: string | number;
  text: string;
  createdAt?: string;
  isApproved?: boolean;
};

/** Создание отзыва текущим пользователем */
export async function createCompanyReview(payload: {
  text: string;
  /** опционально — чтобы совместить со старым бэком; новый может игнорировать */
  rating?: number;
}): Promise<CreatedCompanyReview> {
  return apiFetch<CreatedCompanyReview>("/company-reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** Удаление отзыва (владелец или админ; см. правила на бэке) */
export async function deleteCompanyReview(
  id: string | number
): Promise<{ success: true }> {
  return apiFetch<{ success: true }>(`/company-reviews/${id}`, {
    method: "DELETE",
  });
}
