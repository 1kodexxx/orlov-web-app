// src/features/catalog/api.ts

/* =========================================
 * Типы
 * ======================================= */

export type SortKey =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "rating_desc"
  | "rating_asc"
  | "views_desc"
  | "likes_desc"
  | "newest"
  | "name_asc"
  | "name_desc";

export type ProductRow = {
  product_id: number;
  sku: string;
  name: string;
  description: string | null;
  price: number;

  view_count: number;
  like_count: number;
  avg_rating: number;

  // Ниже — поля для фильтров/метаданных (если приходят из VIEW)
  material?: "Кожа" | "Металл" | "Силикон";
  popularity?: "hit" | "new" | "recommended";
  collection?: "business" | "limited" | "premium" | "autumn2025";

  created_at: string;
  updated_at: string;

  categories: string[];
  materials?: string[];
  collections?: string[];
  popularity_arr?: string[];

  // Изображения могут приходить как массив URL или как массив объектов с позицией
  images?: string[] | Array<{ url: string; position: number }>;
};

export type Paged<T> = {
  items: T[];
  page: number;
  pages: number;
  limit: number;
  total: number;
};

export type CommentRow = {
  id: number;
  text: string;
  created_at: string;
  userId: number;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
};

export type RatingResult = {
  avgRating: number;
  myRating: number;
};

export type LikeResult = {
  liked: boolean;
  likeCount: number;
};

/* =========================================
 * Базовый URL API (без any)
 * ======================================= */

type EnvLike = { VITE_API_URL?: string };
const API_BASE: string =
  (import.meta as unknown as { env?: EnvLike }).env?.VITE_API_URL ??
  "http://localhost:3000";

/* =========================================
 * Вспомогательные утилиты
 * ======================================= */

type QueryPrimitive = string | number | boolean | null | undefined;
type QueryValue = QueryPrimitive | QueryPrimitive[];
type QueryParams = Record<string, QueryValue>;

const isDefined = (v: QueryPrimitive): v is string | number | boolean =>
  v !== null && v !== undefined;

const toQuery = (params: QueryParams): string => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      const arr = v.filter(isDefined).map(String).filter(Boolean);
      if (arr.length) sp.set(k, arr.join(","));
    } else if (isDefined(v)) {
      const s = String(v);
      if (s !== "") sp.set(k, s);
    }
  });
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
};

const ensureOk = async (res: Response, context: string) => {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `${context}: ${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`
    );
  }
  return res;
};

/* =========================================
 * Каталог
 * ======================================= */

export async function getCatalog(params: {
  page?: number;
  limit?: number;
  q?: string;
  categories?: string[];
  materials?: string[];
  collections?: string[];
  popularity?: string[];
  priceMin?: number;
  priceMax?: number;
  sort?: SortKey;
}): Promise<Paged<ProductRow>> {
  const qs = toQuery(params);
  const res = await fetch(`${API_BASE}/catalog${qs}`, {
    credentials: "include",
  });
  await ensureOk(res, "Failed to load catalog");
  return res.json();
}

export async function getProduct(id: number): Promise<ProductRow> {
  const res = await fetch(`${API_BASE}/catalog/${id}`, {
    credentials: "include",
  });
  await ensureOk(res, `Failed to load product ${id}`);
  return res.json();
}

/** Получить карточку и параллельно отправить просмотр (не блокирует UI) */
export async function fetchProductAndView(id: number): Promise<ProductRow> {
  const product = await getProduct(id);
  // Отправляем просмотр "в фоне"
  postView(id).catch(() => void 0);
  return product;
}

export async function getMeta(): Promise<{
  categories: string[];
  materials: string[];
  collections: string[];
  popularity: string[];
}> {
  const res = await fetch(`${API_BASE}/catalog/meta`, {
    credentials: "include",
  });
  await ensureOk(res, "Failed to load meta");
  return res.json();
}

/* =========================================
 * Просмотры
 * ======================================= */

export async function postView(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/catalog/${id}/view`, {
    method: "POST",
    credentials: "include",
  });
  await ensureOk(res, `Failed to post view for product ${id}`);
}

/* =========================================
 * Лайки
 * ======================================= */

export async function like(id: number): Promise<LikeResult> {
  const res = await fetch(`${API_BASE}/catalog/${id}/like`, {
    method: "POST",
    credentials: "include",
  });
  await ensureOk(res, `Failed to like product ${id}`);
  return res.json();
}

export async function unlike(id: number): Promise<LikeResult> {
  const res = await fetch(`${API_BASE}/catalog/${id}/like`, {
    method: "DELETE",
    credentials: "include",
  });
  await ensureOk(res, `Failed to unlike product ${id}`);
  return res.json();
}

/* =========================================
 * Рейтинг (user || visitor)
 * ======================================= */

export async function setRating(
  id: number,
  rating: number,
  comment?: string
): Promise<RatingResult> {
  const res = await fetch(`${API_BASE}/catalog/${id}/rating`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating, comment: comment ?? "" }),
  });
  await ensureOk(res, `Failed to set rating for product ${id}`);
  // { avgRating: number; myRating: number }
  return res.json() as Promise<RatingResult>;
}

export async function deleteRating(id: number): Promise<RatingResult> {
  const res = await fetch(`${API_BASE}/catalog/${id}/rating`, {
    method: "DELETE",
    credentials: "include",
  });
  await ensureOk(res, `Failed to delete rating for product ${id}`);
  return res.json() as Promise<RatingResult>;
}

/* =========================================
 * Комментарии
 * ======================================= */

export async function listComments(
  productId: number,
  page = 1,
  limit = 20
): Promise<{
  items: CommentRow[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}> {
  const qs = toQuery({ page, limit });
  const res = await fetch(`${API_BASE}/catalog/${productId}/comments${qs}`, {
    credentials: "include",
  });
  await ensureOk(res, `Failed to load comments for product ${productId}`);
  return res.json();
}

export async function addComment(
  productId: number,
  text: string
): Promise<CommentRow> {
  const res = await fetch(`${API_BASE}/catalog/${productId}/comments`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  await ensureOk(res, `Failed to add comment for product ${productId}`);
  return res.json();
}

export async function deleteComment(commentId: number): Promise<{ ok: true }> {
  const res = await fetch(`${API_BASE}/catalog/comments/${commentId}`, {
    method: "DELETE",
    credentials: "include",
  });
  await ensureOk(res, `Failed to delete comment ${commentId}`);
  return res.json();
}

/* =========================================
 * Barrel-экспорт: чтобы можно было импортировать из "@/features/catalog"
 * ======================================= */

export // types already exported above
 {};
