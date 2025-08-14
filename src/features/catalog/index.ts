// src/features/catalog/index.ts
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
  getFavorites, // <— важно
  type SortKey,
  type ProductRow,
  type Paged,
  type CommentRow,
  type RatingResult,
  type LikeResult,
} from "./api";
