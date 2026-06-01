const Loading = () => {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-surface-muted px-space-24"
      role="status"
      aria-live="polite"
    >
      <span className="size-10 animate-spin rounded-full border-[0.1875rem] border-brand-100 border-t-brand-700" />
      <span className="visually-hidden">Loading page</span>
    </div>
  );
};

export default Loading;
