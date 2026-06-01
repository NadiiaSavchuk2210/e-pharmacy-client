const MedicineStoreDetailsLoading = () => {
  return (
    <section className="container | py-space-40 md:py-space-60 lg:[--container-max:1184px]">
      <div className="mb-space-32 h-[18px] w-[126px] animate-pulse rounded-full bg-surface-subtle" />

      <div className="overflow-hidden rounded-[27px] border border-card-border bg-card-bg p-space-24 shadow-sm md:p-space-40">
        <div className="mb-space-32 flex flex-col gap-space-20 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[520px] flex-1">
            <div className="mb-space-14 h-[32px] w-3/4 animate-pulse rounded-full bg-surface-subtle md:h-[48px]" />
            <div className="h-[18px] w-full animate-pulse rounded-full bg-surface-subtle md:h-[20px]" />
          </div>

          <div className="flex items-center gap-space-14">
            <div className="h-[18px] w-[52px] animate-pulse rounded-full bg-surface-subtle" />
            <div className="h-[28px] w-[86px] animate-pulse rounded-full bg-surface-subtle" />
          </div>
        </div>

        <div className="grid gap-space-20 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[58px] animate-pulse rounded-[16px] bg-surface-subtle"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MedicineStoreDetailsLoading;
