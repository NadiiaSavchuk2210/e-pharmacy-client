import { getCustomerReviews } from '@/entities/customer-review';

import ReviewsCarousel from './ReviewsCarousel';

const Reviews = async () => {
  const reviews = await getCustomerReviews();

  if (!reviews.length) {
    return null;
  }

  return (
    <section className="bg-surface-muted py-space-80 md:py-space-120">
      <div className="container | lg:[--container-max:1202px]">
        <div className="mb-space-40 flex flex-col gap-space-14 text-center md:mb-space-64">
          <h2 className="font-semibold text-28 leading-space-32 text-text md:text-40 md:leading-space-48">
            Reviews
          </h2>
          <p className="text-14 leading-space-18 text-text-subtle md:text-16 md:leading-space-20">
            Search for Medicine, Filter by your location
          </p>
        </div>

        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
};

export default Reviews;
