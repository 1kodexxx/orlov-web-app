// Общие типы для страницы аккаунта

export type OrderStatus = "in_transit" | "cancelled" | "completed";

export type Order = {
  id: string;
  date: string; // ISO или YYYY-MM-DD
  price: number;
  status: OrderStatus;
};

export type PaymentMethod = {
  brand: string; // 'visa', 'mc' и т.п.
  last4: string; // последние 4 цифры
  expiry: string; // '12/27'
};

export type UserProfile = {
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string | null;
  homeAddress?: string | null;
  deliveryAddress?: string | null;
  birthDate?: string | null;
  pickupPoint?: string | null;
  city?: string | null;
  country?: string | null;
  paymentMethods?: PaymentMethod[]; // для бейджей оплаты
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

export type ProductSummary = {
  id: string | number;
  sku?: string;
  name: string;
  price: number;
  thumbnail?: string;
};

export type MyComment = {
  id: string | number;
  productId?: string | number;
  text: string;
  rating?: number;
  createdAt: string; // ISO
};

export type MyCompanyReview = {
  id: string | number;
  text: string;
  createdAt: string; // ISO
  isApproved?: boolean; // для вывода статуса
};

export type AccountCallbacks = {
  onOrderDetails?: (id: string) => void;
  onOrderRepeat?: (id: string) => void;
  onOrderCancel?: (id: string) => Promise<void> | void;

  // из AccountPage пробрасываются сюда:
  onSaveProfile?: (data: Partial<UserProfile>) => Promise<void> | void;
  onUploadAvatar?: (file: File) => Promise<void> | void;
};
