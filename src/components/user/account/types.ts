// дополнил профиль полями, которые сохраняем в ЛК

export type OrderStatus = "in_transit" | "cancelled" | "completed";

export type Order = {
  id: string;
  date: string;
  price: number;
  status: OrderStatus;
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

export type PaymentMethod = {
  brand: string;
  last4: string;
  expiry: string;
};

export type CompanyMini = { name: string; info?: string };

export type ProductSummary = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

export type MyComment = {
  id: number;
  productId: number;
  productName: string;
  text: string;
  createdAt: string;
};

export type MyCompanyReview = {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  isApproved: boolean;
};

export type UserProfile = {
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  country?: string | null;
  city?: string | null;
  homeAddress?: string | null;
  deliveryAddress?: string | null;
  pickupPoint?: string | null;

  // не обязательные «витринные» поля — UI их рендерит, но мы тут не меняем
  tierBadge?: string;
  companies?: CompanyMini[];
  paymentMethods?: PaymentMethod[];
};

export type AccountCallbacks = {
  onOrderDetails?: (orderId: string) => void;
  onOrderRepeat?: (orderId: string) => void;
  onOrderCancel?: (orderId: string) => Promise<void> | void;

  onSaveProfile?: (data: Partial<UserProfile>) => Promise<void> | void;
  onUploadAvatar?: (file: File) => Promise<void> | void;
};

// src/types/api.ts
export interface MeResponse {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  role: "admin" | "manager" | "customer";
  registeredAt: string;
}
