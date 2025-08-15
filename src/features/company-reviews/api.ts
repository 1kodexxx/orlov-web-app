import { API_BASE, getAccessToken } from "@/shared/apiClient";
import type { CompanyReview, CompanyReviewStats, Paged } from "./types";

// Тип ответа от POST /company-reviews
export type CreatedCompanyReview = {
  id: number | string;
  text: string;
  createdAt: string;
  isApproved?: boolean;
};

// универсальный fetch с обработкой ошибок
async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAccessToken();
  const resp = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...init,
    headers: {
      ...(init?.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });

  if (!resp.ok) {
    let msg = `HTTP ${resp.status}`;
    try {
      const ct = resp.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        const j = (await resp.json()) as { message?: string | string[] };
        msg = Array.isArray(j.message)
          ? j.message.join(", ")
          : j.message ?? msg;
      } else {
        msg = (await resp.text()) || msg;
      }
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  if (resp.status === 204) return undefined as T;
  const ct = resp.headers.get("content-type") ?? "";
  return (
    ct.includes("application/json") ? resp.json() : resp.text()
  ) as Promise<T>;
}

/** Получить отзывы (пагинация) */
export async function fetchCompanyReviews(params: {
  approved?: boolean;
  page?: number;
  limit?: number;
}): Promise<Paged<CompanyReview>> {
  const q = new URLSearchParams();
  if (typeof params.approved === "boolean")
    q.set("approved", String(params.approved));
  q.set("page", String(params.page ?? 1));
  q.set("limit", String(params.limit ?? 9));
  return api<Paged<CompanyReview>>(`/company-reviews?${q.toString()}`);
}

/** Статистика по отзывам */
export async function fetchCompanyReviewsStats(): Promise<CompanyReviewStats> {
  return api<CompanyReviewStats>("/company-reviews/stats");
}

/** Создать отзыв о компании (без рейтинга) */
export async function createCompanyReview(body: {
  text: string;
}): Promise<CreatedCompanyReview> {
  // На бек не отправляем rating, чтобы не ловить «property rating should not exist»
  return api(`/company-reviews`, {
    method: "POST",
    body: JSON.stringify({ text: body.text }),
  });
}

/** Удалить мой отзыв о компании */
export async function deleteCompanyReview(
  id: string | number
): Promise<{ success: true }> {
  return api<{ success: true }>(`/company-reviews/${id}`, { method: "DELETE" });
}
