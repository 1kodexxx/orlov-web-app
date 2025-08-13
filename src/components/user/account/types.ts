// Общие типы для страницы аккаунта

export type OrderStatus = "in_transit" | "cancelled" | "completed";

export type Order = {
  id: string;
  date: string; // ISO или dd.mm.yyyy
  price: number; // в валюте магазина
  status: OrderStatus;
};

export type PaymentMethod = {
  brand: "visa" | "mc" | "amex" | "mir" | string;
  last4: string;
  expiry: string; // MM/YYYY
};

export type Company = {
  name: string;
  info?: string;
};

export type UserProfile = {
  avatarUrl?: string;
  name: string;
  email: string;
  homeAddress?: string;
  deliveryAddress?: string;
  phone?: string;
  pickupPoint?: string;
  favouritePickupPoint?: string;
  companies?: Company[];
  paymentMethods?: PaymentMethod[];
  tierBadge?: string; // например: "PRO"
};

export type Stats = {
  ordersMade: number;
  ordersChangePct?: number; // +/- в %
  reviewsAdded: number;
  reviewsChangePct?: number;
  favoritesAdded: number;
  favoritesChangePct?: number;
  returns: number;
  returnsChangePct?: number;
};

export type AccountCallbacks = {
  onOrderDetails?: (orderId: string) => void;
  onOrderRepeat?: (orderId: string) => void;
  onOrderCancel?: (orderId: string) => Promise<void> | void;
  onSaveProfile?: (profile: Partial<UserProfile>) => Promise<void> | void;
};
