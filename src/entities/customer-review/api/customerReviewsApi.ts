import { fetchApiData } from '@/shared/api/apiFetch';

import type { ApiCustomerReview, CustomerReview } from '../model/types';

const getCustomerReviewImage = (review: ApiCustomerReview) =>
  review.image ??
  review.imageUrl ??
  review.photo ??
  review.avatar ??
  review.userPhoto;

const normalizeCustomerReview = (
  review: ApiCustomerReview,
  index: number,
): CustomerReview => ({
  id: review.id ?? review._id ?? `${review.name}-${index}`,
  image: getCustomerReviewImage(review),
  name: review.name,
  testimonial: review.testimonial,
});

export const getCustomerReviews = async () => {
  const reviews = await fetchApiData<ApiCustomerReview[]>({
    path: '/customer-reviews',
    revalidate: 300,
    errorMessage: 'Failed to fetch customer reviews',
  });

  return reviews.map(normalizeCustomerReview);
};
