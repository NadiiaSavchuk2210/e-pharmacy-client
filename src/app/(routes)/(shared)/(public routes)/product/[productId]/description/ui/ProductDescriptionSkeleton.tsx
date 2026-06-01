import { Skeleton } from '@/components/ui/skeleton';

const ProductDescriptionSkeleton = () => {
  return (
    <section
      aria-label="Loading product description"
      className="text-14 leading-space-18 md:text-16 md:leading-space-25"
    >
      <div className="mb-space-20 space-y-space-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full max-w-[92%]" />
        <Skeleton className="h-4 w-full max-w-[76%]" />
      </div>

      <div className="mb-space-24 grid gap-space-12 rounded-[20px] border border-border-muted bg-surface-muted p-space-16 md:grid-cols-3 md:p-space-20">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="mb-space-8 h-4 w-[82px]" />
            <Skeleton className="h-5 w-full max-w-[128px]" />
          </div>
        ))}
      </div>

      <Skeleton className="h-[18px] w-full max-w-[188px]" />
    </section>
  );
};

export default ProductDescriptionSkeleton;
