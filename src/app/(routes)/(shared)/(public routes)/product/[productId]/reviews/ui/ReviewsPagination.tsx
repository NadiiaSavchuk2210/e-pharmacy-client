import SharedPagination from '@/shared/ui/Pagination';

import { getProductReviewsPageHref } from '../lib/reviewsPagination';

type ReviewsPaginationProps = {
  productId: string;
  currentPage: number;
  totalPages: number;
};

const ReviewsPagination = ({
  productId,
  currentPage,
  totalPages,
}: ReviewsPaginationProps) => (
  <SharedPagination
    currentPage={currentPage}
    totalPages={totalPages}
    getPageHref={(page) => getProductReviewsPageHref(productId, page)}
    ariaLabel="Product reviews pagination"
    className="mt-space-40"
    labelPrefix="reviews"
  />
);

export default ReviewsPagination;
