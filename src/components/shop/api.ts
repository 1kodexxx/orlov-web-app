// src/components/shop/api.ts

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
  created_at: string;
  updated_at: string;
  categories: string[];
  materials: string[];
  collections: string[];
  popularity: string[];
  images?: Array<{ url: string; position: number }> | string[];
};

export type Paged<T> = {
  items: T[];
  page: number;
  pages: number;
  limit: number;
  total: number;
};

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

/* ---------- types for query builder ---------- */
type QueryPrimitive = string | number | boolean | null | undefined;
type QueryValue = QueryPrimitive | QueryPrimitive[];
type QueryParams = Record<string, QueryValue>;

const isDefined = (v: QueryPrimitive): v is string | number | boolean =>
  v !== null && v !== undefined;

/** Собираем строку query без any */
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
  return sp.toString();
};

/* ---------- API ---------- */
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
  const res = await fetch(`${API_BASE}/catalog${qs ? `?${qs}` : ""}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to load catalog: ${res.status}`);
  return res.json();
}

export async function getProduct(id: number): Promise<ProductRow> {
  const res = await fetch(`${API_BASE}/catalog/${id}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to load product ${id}`);
  return res.json();
}

/** Получить товар и параллельно/асинхронно отправить событие просмотра */
export async function fetchProductAndView(id: number): Promise<ProductRow> {
  // Грузим карточку
  const product = await getProduct(id);
  // Отправляем просмотр, но не блокируем UI
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
  if (!res.ok) throw new Error("Failed to load meta");
  return res.json();
}

export async function postView(id: number): Promise<void> {
  await fetch(`${API_BASE}/catalog/${id}/view`, {
    method: "POST",
    credentials: "include",
  });
}

export async function likeProduct(id: number): Promise<void> {
  await fetch(`${API_BASE}/catalog/${id}/like`, {
    method: "POST",
    credentials: "include",
  });
}

export async function unlikeProduct(id: number): Promise<void> {
  await fetch(`${API_BASE}/catalog/${id}/like`, {
    method: "DELETE",
    credentials: "include",
  });
}
