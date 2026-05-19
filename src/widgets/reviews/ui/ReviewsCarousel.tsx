'use client';

import Image from 'next/image';
import { useRef, useState, type PointerEvent } from 'react';

import type { CustomerReview } from '@/entities/customer-review';

import { getReviewImage } from '../lib/reviewImages';

type ReviewsCarouselProps = {
  reviews: CustomerReview[];
};

const ReviewsCarousel = ({ reviews }: ReviewsCarouselProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const dragStateRef = useRef({ scrollLeft: 0, startX: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLUListElement>) => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    list.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      scrollLeft: list.scrollLeft,
      startX: event.clientX,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLUListElement>) => {
    const list = listRef.current;

    if (!isDragging || !list) {
      return;
    }

    event.preventDefault();
    const distance = event.clientX - dragStateRef.current.startX;
    list.scrollLeft = dragStateRef.current.scrollLeft - distance;
  };

  const stopDragging = (event: PointerEvent<HTMLUListElement>) => {
    const list = listRef.current;

    if (list?.hasPointerCapture(event.pointerId)) {
      list.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  };

  return (
    <div className="-mx-container-padding overflow-hidden px-container-padding md:mx-0 md:px-0">
      <ul
        ref={listRef}
        aria-label="Customer reviews"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
        className="grid auto-cols-[100%] grid-flow-col snap-x snap-mandatory gap-space-20 overflow-x-auto scroll-smooth pt-[30px] cursor-grab touch-pan-x select-none active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] md:auto-cols-[calc((100%_-_var(--space-16))_/_2)] md:gap-space-16 lg:auto-cols-[calc((100%_-_56px)_/_3)] lg:gap-[28px] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <li
            key={review.id}
            className="relative min-h-[232px] max-h-[232px] snap-start rounded-[27px] border border-surface-subtle bg-surface px-space-16 pb-space-32 pt-[54px] text-center shadow-sm md:px-space-28 lg:pb-space-40"
          >
            <Image
              src={getReviewImage(review)}
              alt={`${review.name}'s photo`}
              width={64}
              height={64}
              draggable={false}
              className="absolute left-1/2 top-0 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
            />
            <h3 className="mb-space-16 text-20 font-semibold leading-space-30 text-text">
              {review.name}
            </h3>
            <p className="text-16 font-normal leading-space-20 text-text-subtle">
              {review.testimonial}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsCarousel;
