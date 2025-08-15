// Типы аккаунта

export type Order = {
  id: string;
  date: string;
  price: number;
  status: "completed" | "in_transit" | "cancelled";
};

export type Stats = {
  ordersMade: number;
  ordersChangePct: number;
  reviewsAdded: number;
  reviewsChangePct: number;
  favoritesAdded: number;
  favoritesChangePct: number;
  returns: number;
  returnsChangePct: number;
};

export type UserProfile = {
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  homeAddress?: string;
  deliveryAddress?: string;
  country?: string | null;
  city?: string | null;
};

export type ProductSummary = {
  id: number | string;
  name: string;
  price: number;
  image?: string;
};

export type MyComment = {
  id: number | string;
  productId: number | string;
  text: string;
  createdAt: string;
};

/** Отзыв о компании в личном кабинете — БЕЗ рейтинга */
export type MyCompanyReview = {
  id: number;
  text: string;
  createdAt: string;
  /** если бэк шлёт — покажем «На модерации» */
  isApproved?: boolean;
};
