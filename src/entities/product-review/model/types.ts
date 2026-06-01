export type ApiProductReview = {
  id: string;
  productId: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type ProductReview = ApiProductReview;

export type ProductReviewsPageMeta = {
  totalItems: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
};

export type ApiProductReviewsPage = {
  items: ApiProductReview[];
  meta: ProductReviewsPageMeta;
};

export type ProductReviewsPage = {
  items: ProductReview[];
  meta: ProductReviewsPageMeta;
};

export type ProductReviewsSearchParams = {
  limit?: number;
  page?: number;
};
