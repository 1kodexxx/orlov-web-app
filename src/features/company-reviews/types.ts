// Типы данных для отзывов о компании

export type ReviewAuthor = {
  fullName?: string | null;
  email: string;
  avatarUrl?: string | null;
  headline?: string | null;
  organization?: string | null;
};

export type CompanyReview = {
  id: number | string;
  text: string;
  rating?: number | null;
  createdAt: string; // ISO
  updatedAt?: string | null; // ISO
  isApproved?: boolean | null;
  author: ReviewAuthor;
};

export type CompanyReviewStats = {
  avg_company_rating: number; // средняя оценка
  reviews_count: number; // количество отзывов
};

export type Paged<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};
