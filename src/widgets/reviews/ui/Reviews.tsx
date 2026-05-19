import { getCustomerReviews } from '@/entities/customer-review';
import SectionHeader from '@/shared/ui/SectionHeader';

import ReviewsCarousel from './ReviewsCarousel';

const Reviews = async () => {
  const reviews = await getCustomerReviews();

  if (!reviews.length) {
    return null;
  }

  return (
    <section className="bg-surface-muted py-space-80 md:py-space-120">
      <div className="container | lg:[--container-max:1202px]">
        <SectionHeader
          title="Reviews"
          description="Search for Medicine, Filter by your location"
        />

        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
};

export default Reviews;
