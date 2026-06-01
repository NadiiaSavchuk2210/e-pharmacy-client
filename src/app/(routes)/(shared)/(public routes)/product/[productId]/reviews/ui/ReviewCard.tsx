import Image from 'next/image';

import {
  formatProductReviewDate,
  type ProductReview,
} from '@/entities/product-review';

import ReviewRating from './ReviewRating';

type ReviewCardProps = {
  review: ProductReview;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const createdAtLabel = formatProductReviewDate(review.createdAt);

  return (
    <li className="py-space-14 px-space-28 border border-solid border-neutral-100 rounded-[20px] dark:border-card-border">
      <div className="mb-space-14 flex gap-space-20">
        <Image
          src={review.authorAvatar}
          alt={`${review.authorName}'s avatar`}
          width={44}
          height={44}
          className="size-11 rounded-[30px]"
        />
        <div className="flex flex-col gap-space-4">
          <h3 className="font-semibold text-16 leading-space-22 text-text md:text-18 md:leading-space-25">
            {review.authorName}
          </h3>
          {createdAtLabel && (
            <p className="text-12 leading-space-18 text-secondary-text">
              {createdAtLabel}
            </p>
          )}
        </div>
        <ReviewRating rating={review.rating} />
      </div>
      <p className="text-14 leading-space-18 text-neutral-500 md:text-16 md:leading-space-24">
        {review.comment}
      </p>
    </li>
  );
};

export default ReviewCard;
