// src/features/catalog/index.ts
export type {
  SortKey,
  ProductRow,
  Paged,
  CommentRow,
  RatingResult,
  LikeResult,
} from "./api";

export {
  getCatalog,
  getProduct,
  fetchProductAndView,
  getMeta,
  postView,
  like,
  unlike,
  setRating,
  deleteRating,
  listComments,
  addComment,
  deleteComment,
} from "./api";
