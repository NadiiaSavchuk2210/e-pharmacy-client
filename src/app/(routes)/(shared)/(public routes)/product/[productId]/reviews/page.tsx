import { redirect } from 'next/navigation';

import { getProductReviews } from '@/entities/product-review';

import {
  getCurrentReviewPage,
  getProductReviewsPageHref,
  REVIEWS_PER_PAGE,
  type ReviewsSearchParams,
} from './lib/reviewsPagination';
import ReviewsList from './ui/ReviewsList';
import ReviewsPagination from './ui/ReviewsPagination';

type Props = {
  params: Promise<{ productId: string }>;
  searchParams: ReviewsSearchParams;
};

const ProductReviewsPage = async ({ params, searchParams }: Props) => {
  const { productId } = await params;
  const resolvedSearchParams = await searchParams;
  const page = getCurrentReviewPage(resolvedSearchParams);
  const { items: reviews, meta } = await getProductReviews(productId, {
    limit: REVIEWS_PER_PAGE,
    page,
  });
  const totalPages = meta.totalPages;
  const currentPage = meta.totalItems > 0 ? meta.currentPage : 1;

  if (meta.totalItems > 0 && page > totalPages) {
    redirect(getProductReviewsPageHref(productId, totalPages));
  }

  return (
    <section aria-labelledby="product-reviews-title">
      <h2 id="product-reviews-title" className="visually-hidden">
        Reviews
      </h2>

      <ReviewsList reviews={reviews} />
      <ReviewsPagination
        productId={productId}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
};

export default ProductReviewsPage;
