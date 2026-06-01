const ReviewsEmptyState = () => {
  return (
    <div className="rounded-[20px] border border-border-muted bg-surface-muted p-space-24 text-center">
      <p className="text-16 font-semibold leading-space-22 text-text">
        No reviews yet
      </p>
      <p className="mt-space-8 text-14 leading-space-20 text-text-muted">
        Customer reviews for this product will appear here.
      </p>
    </div>
  );
};

export default ReviewsEmptyState;
