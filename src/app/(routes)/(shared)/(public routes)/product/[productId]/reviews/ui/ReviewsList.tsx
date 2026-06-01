import type { ProductReview } from '@/entities/product-review';

import ReviewCard from './ReviewCard';
import ReviewsEmptyState from './ReviewsEmptyState';

type ReviewsListProps = {
  reviews: ProductReview[];
};

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  if (!reviews.length) {
    return <ReviewsEmptyState />;
  }

  return (
    <ul className="flex flex-col gap-space-20">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default ReviewsList;
