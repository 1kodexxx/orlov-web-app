// Общие типы для публичных отзывов (секция "Почему выбирают нас?")

export type Paged<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export type Author = {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  headline: string | null;
  organization: string | null;
};

export type CompanyReview = {
  id: string;
  text: string;
  /** рейтинг теперь опциональный на фронте (в UI мы его не показываем) */
  rating?: number;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

export type CompanyStats = {
  avg_company_rating: number;
  reviews_count: number;
};

export type QueryCompanyReviews = {
  approved?: boolean; // по умолчанию true на уровне хука
  page?: number; // по умолчанию 1
  limit?: number; // по умолчанию 20
};
