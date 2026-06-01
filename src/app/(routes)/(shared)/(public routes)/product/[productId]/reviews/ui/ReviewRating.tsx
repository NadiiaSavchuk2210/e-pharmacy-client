import { Icon } from '@/shared/ui/Icon';

type ReviewRatingProps = {
  rating: number;
  maxRating?: number;
};

const ReviewRating = ({ rating, maxRating = 5 }: ReviewRatingProps) => {
  return (
    <div
      className="ml-auto flex justify-center"
      aria-label={`Rating: ${rating} out of ${maxRating}`}
    >
      <div className="flex h-[18px] items-center gap-[6px] md:hidden">
        <Icon name="star" className="size-4 text-warning-500 dark:text-warning" />
        <span className="text-14 font-medium leading-space-18 text-text">
          {rating}
        </span>
      </div>
      <div className="hidden items-center gap-space-8 md:flex">
        <div className="flex items-center gap-[2px]">
          {Array.from({ length: maxRating }).map((_, index) => (
            <Icon
              key={index}
              name="star"
              className={`size-4 ${
                index < rating
                  ? 'text-warning-500 dark:text-warning'
                  : 'text-neutral-100 dark:text-border-muted'
              }`}
            />
          ))}
        </div>
        <span className="text-18 font-semibold leading-space-25 text-text">
          {rating}
        </span>
      </div>
    </div>
  );
};

export default ReviewRating;
