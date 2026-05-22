const MedicineEmptyState = () => (
  <div className="rounded-[27px] border border-border bg-surface-muted p-space-32 text-center">
    <h2 className="mb-space-8 text-20 font-semibold leading-space-28 text-text">
      Nothing was found for your request
    </h2>
    <p className="text-14 leading-space-18 text-text-muted">
      Try another search term or clear the active filters.
    </p>
  </div>
);

export default MedicineEmptyState;
